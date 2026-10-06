# 8x Assignment — Agent Capture Verification Test

## 1. Tool and Model
- **Tool**: **Antigravity IDE** (Google DeepMind)
- **Model**: **Gemini 3.8 Flash (High)** (handling both planning and execution)

## 2. Mechanism & Configuration
- **Mechanism**:
  Antigravity IDE provides native lifecycle hooks configured via [`.agents/hooks.json`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agents/hooks.json) supporting `Stop`, `PostInvocation`, `PreInvocation`, `PreToolUse`, and `PostToolUse`. Furthermore, Antigravity records live structured transcripts to `brain/<session-id>/.system_generated/logs/transcript_full.jsonl`.
- **Configuration Files**:
  - [`.agents/hooks.json`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agents/hooks.json) — Hook triggers calling the capture script.
  - [`.agents/capture.py`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agents/capture.py) — Parser and markdown emitter running continuously as a background daemon (`IsDaemon: true`) to stream turns into [`.agent-logs/`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agent-logs/) formatted per 8x specs.

## 3. Log File Path
- Log file: [`.agent-logs/2026-10-06_07-30-42_7ca059bb.md`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agent-logs/2026-10-06_07-30-42_7ca059bb.md)

## 4. Canary Entries (Pasted Raw from Log)

### Canary Entry 1 (Turn 1 Verification)
```markdown
[LOG_ENTRY type=PROMPT num=1 session=7ca059bb]
timestamp: 2026-10-06T07:30:42Z
model: Gemini 3.8 Flash (High)

Clone Amazon.com
For Software Engineer.
In progressIn progress.
Assignment clock
Time left 23:58:54
Deadline
Due 7 Oct 2026, 07:26 UTC.
A note on this assignment
You’re competing with exceptional talent from around the world, including San Francisco and top universities. This is your opportunity to stand out—bring your best thinking, care, and effort to the assignment.
Brief
Rebuild a live product in 24 hours. Better than the original if you want.
That window is deliberately generous and we do not expect you to use all of it. The clock is tracked, never enforced.
The product
[amazon.com](https://amazon.com/)
Start by using it. Sign up and go through the flows properly, every one of them, end to end. Take screenshots as you go. Understand the product fully before you write any code.
Then rebuild it.
Before you write anything
Run through this so your agent captures its prompts and responses into the repository: [8x agent capture setup](https://8x-internal.com/p/8x-agent-capture-setup)
It takes about ten minutes. Do not start building until the capture test passes, and commit the `.agent-logs/` directory as you go rather than in one lump at the end.
What you hand in
A live link. Deployed and open, not a localhost recording.
A public repository. With `.agent-logs/` committed in it.
A walkthrough. Loom or anything similar, five minutes at most, camera on.
Put it in the walkthrough field.
Paste the live link and the repository into the links field, and label each one.
How it is judged
Speed. How much working product you got to in the time.
Product judgement. What you chose to build first, and what you left out.
UX and UI. Whether the thing you shipped is good to use.
Before you send it
The live link opens for somebody who is not signed in as you.
The repository is public, and `.agent-logs/` is in it.
Your camera is on in the walkthrough, and it is under five minutes.


this is our assignment
let make a plan first

[LOG_ENTRY type=RESPONSE num=1 session=7ca059bb]
timestamp: 2026-10-06T07:44:22Z
model: Gemini 3.8 Flash (High)

### 1. Setup Identification (8x Step 1)

* **Tool**: **Antigravity IDE** (Google DeepMind)
* **Model**: **Gemini 3.8 Flash (High)** (handling both planning and execution)
* **Lifecycle Mechanism**: Antigravity IDE natively provides a lifecycle hook mechanism configured via .agents/hooks.json...
```

### Canary Entry 2 (Turn 2 Verification)
```markdown
[LOG_ENTRY type=PROMPT num=2 session=7ca059bb]
timestamp: 2026-10-06T08:35:15Z
model: Gemini 3.8 Flash (High)

Make it your own
Use the product as your reference, not your blueprint. A pixel-for-pixel copy tells us very little. Show us what you would change, what you would cut and how you would make it better to use. We want to see how you take inspiration and make product decisions.


this is the point to get to the top how are we doing this

[LOG_ENTRY type=RESPONSE num=2 session=7ca059bb]
timestamp: 2026-10-06T08:36:45Z
model: Gemini 3.8 Flash (High)

To stand out and compete with top global talent, copying Amazon’s 15-year-old interface line-for-line is the easiest way to look like a junior engineer...
```

## 5. Anything Tried First That Did Not Work
1. **Initial Hook Discovery without Git Root**: Antigravity's customization discovery traverses upwards searching for `.git`. Because the workspace was initially uninitialized, `git init` was required before `.agents/hooks.json` could be indexed.
2. **Synchronous Stdin Blocking in Subprocess**: Initial `capture.py` attempted `sys.stdin.read()` unconditionally on Windows, which blocked on EOF during non-hook execution. Fixed by gating stdin reading behind `--hook` flag.
3. **Multi-Workspace Session Bleed**: `brain/` directory contains active sessions across multiple projects. A strict workspace filter was implemented in `capture.py` to ensure only sessions originating from the `8x` workspace are captured.
