import os
import sys
import json
import re
import time
import datetime
from pathlib import Path

WORKSPACE_ROOT = Path(r"c:\Users\Dange\OneDrive\Desktop\8x")
LOGS_DIR = WORKSPACE_ROOT / ".agent-logs"
BRAIN_DIR = Path(r"C:\Users\Dange\.gemini\antigravity-ide\brain")

AUTHOR = "Supriyo Chowdhury"
MODEL_NAME = "Gemini 3.8 Flash (High)"
TOOL_NAME = "antigravity-ide"
PROJECT_NAME = "amazon-clone"

def clean_prompt(raw_text: str) -> str:
    if not raw_text:
        return ""
    m = re.search(r"<USER_REQUEST>\s*(.*?)\s*</USER_REQUEST>", raw_text, re.DOTALL)
    if m:
        return m.group(1).strip()
    return raw_text.strip()

def clean_response(raw_text: str) -> str:
    if not raw_text:
        return ""
    return raw_text.strip()

def format_timestamp(ts_str: str) -> str:
    if not ts_str:
        return datetime.datetime.now(datetime.timezone.utc).isoformat()
    if ts_str.endswith("Z"):
        return ts_str
    try:
        dt = datetime.datetime.fromisoformat(ts_str)
        return dt.astimezone(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
    except Exception:
        return ts_str

def parse_transcript(transcript_path: Path):
    if not transcript_path.exists():
        return []
    
    steps = []
    with open(transcript_path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                steps.append(json.loads(line))
            except Exception:
                continue

    exchanges = []
    curr_prompt = None
    curr_response = None

    for step in steps:
        stype = step.get("type")
        if stype == "USER_INPUT" and step.get("source") == "USER_EXPLICIT":
            if curr_prompt is not None:
                exchanges.append((curr_prompt, curr_response))
                curr_response = None
            curr_prompt = step
        elif stype == "PLANNER_RESPONSE" and step.get("content"):
            curr_response = step

    if curr_prompt is not None:
        exchanges.append((curr_prompt, curr_response))

    return exchanges

def belongs_to_workspace(transcript_path: Path) -> bool:
    try:
        with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
            first_line = f.readline()
            m = re.search(r"<USER_REQUEST>\s*(.*?)\s*</USER_REQUEST>", first_line, re.DOTALL)
            if m:
                prompt = m.group(1).lower()
                if "esp-website" in prompt:
                    return False
                if "amazon" in prompt or "8x" in prompt or "capture test" in prompt or "rebuild" in prompt:
                    return True
            for line in f:
                if "esp-website" in line.lower():
                    return False
                if "onedrive\\\\desktop\\\\8x" in line.lower() or "onedrive/desktop/8x" in line.lower():
                    return True
        return False
    except Exception:
        return False


def process_session(session_id: str):
    sess_dir = BRAIN_DIR / session_id
    full_transcript = sess_dir / ".system_generated" / "logs" / "transcript_full.jsonl"
    lite_transcript = sess_dir / ".system_generated" / "logs" / "transcript.jsonl"
    
    transcript_path = full_transcript if full_transcript.exists() else lite_transcript
    if not transcript_path.exists():
        return None

    if not belongs_to_workspace(transcript_path):
        return None

    exchanges = parse_transcript(transcript_path)
    if not exchanges:
        return None


    first_prompt_time = None
    last_prompt_time = None
    short_session = session_id[:8]

    for p, _ in exchanges:
        pts = format_timestamp(p.get("created_at"))
        if first_prompt_time is None:
            first_prompt_time = pts
        last_prompt_time = pts

    # Determine filename from first prompt time or session creation
    try:
        dt = datetime.datetime.fromisoformat(first_prompt_time.replace("Z", "+00:00"))
    except Exception:
        dt = datetime.datetime.now(datetime.timezone.utc)
    
    file_prefix = dt.strftime("%Y-%m-%d_%H-%M-%S")
    log_filename = f"{file_prefix}_{short_session}.md"
    target_file = LOGS_DIR / log_filename
    date_str = dt.strftime("%Y-%m-%d")

    # Build markdown
    lines = [
        "---",
        f"session_id: {session_id}",
        f"date: {date_str}",
        f"author: {AUTHOR}",
        f"model: {MODEL_NAME}",
        f"tool: {TOOL_NAME}",
        f"project: {PROJECT_NAME}",
        f"total_exchanges: {len(exchanges)}",
        f"first_prompt_time: {first_prompt_time}",
        f"last_prompt_time: {last_prompt_time}",
        "---",
        "",
        f"# Session Log - {date_str}",
        "",
        f"Session: `{short_session}` | Project: `{PROJECT_NAME}` | Author: `{AUTHOR}`",
        "",
        "---",
        ""
    ]

    for num, (p, r) in enumerate(exchanges, 1):
        p_ts = format_timestamp(p.get("created_at"))
        p_content = clean_prompt(p.get("content", ""))
        lines.append(f"[LOG_ENTRY type=PROMPT num={num} session={short_session}]")
        lines.append(f"timestamp: {p_ts}")
        lines.append(f"model: {MODEL_NAME}")
        lines.append("")
        lines.append(p_content)
        lines.append("")

        if r and r.get("content"):
            r_ts = format_timestamp(r.get("created_at"))
            r_content = clean_response(r.get("content", ""))
            lines.append(f"[LOG_ENTRY type=RESPONSE num={num} session={short_session}]")
            lines.append(f"timestamp: {r_ts}")
            lines.append(f"model: {MODEL_NAME}")
            lines.append("")
            lines.append(r_content)
            lines.append("")

    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    target_file.write_text("\n".join(lines), encoding="utf-8")
    return target_file

def run_once():
    # Find active sessions today
    if not BRAIN_DIR.exists():
        return
    
    # Process current session specifically
    curr_sess = os.environ.get("ANTIGRAVITY_CONVERSATION_ID", "7ca059bb-5f8e-4bc2-96ea-701e71be2b49")
    process_session(curr_sess)

    # Also scan recent sessions in BRAIN_DIR
    now = time.time()
    for child in BRAIN_DIR.iterdir():
        if child.is_dir() and len(child.name) == 36 and "-" in child.name:
            mtime = child.stat().st_mtime
            # Modified in last 24 hours
            if now - mtime < 86400:
                try:
                    process_session(child.name)
                except Exception as e:
                    pass

def daemon_loop():
    print("Capture daemon started. Watching brain transcripts...", flush=True)
    while True:
        try:
            run_once()
        except Exception as e:
            pass
        time.sleep(2)

if __name__ == "__main__":
    if "--daemon" in sys.argv:
        daemon_loop()
    else:
        if "--hook" in sys.argv:
            try:
                stdin_data = sys.stdin.read()
                if stdin_data:
                    payload = json.loads(stdin_data)
                    conv_id = payload.get("conversationId")
                    if conv_id:
                        process_session(conv_id)
            except Exception:
                pass
        run_once()
        print(json.dumps({}))

