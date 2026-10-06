import React, { useState, useEffect } from 'react';
import { Product, AIReviewDigest as AIDigestType } from '../../types';
import { geminiService } from '../../services/gemini';
import { Sparkles, Check, AlertTriangle, UserCheck, ThumbsUp, ThumbsDown, Activity, ArrowRight, Zap, Layers, Tag } from 'lucide-react';

interface AIReviewDigestProps {
  digest: AIDigestType;
  productTitle: string;
  product?: Product;
}

type LensType = 'general' | 'power_user' | 'value' | 'durability';

const LENSES: { id: LensType; label: string; icon: any }[] = [
  { id: 'general', label: 'Balanced Consensus', icon: Sparkles },
  { id: 'power_user', label: 'Engineer & Power User', icon: Zap },
  { id: 'value', label: 'Value & MSRP Ratio', icon: Tag },
  { id: 'durability', label: 'Durability & Teardown', icon: Layers }
];

export const AIReviewDigest: React.FC<AIReviewDigestProps> = ({ digest, productTitle, product }) => {
  const [currentDigest, setCurrentDigest] = useState<AIDigestType>(digest);
  const [activeLens, setActiveLens] = useState<LensType>('general');
  const [isResynthesizing, setIsResynthesizing] = useState(false);
  const [lastGeneratedTime, setLastGeneratedTime] = useState<string>('Live on page load');
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  // Automatically trigger live Gemini 1.5 Flash synthesis on product mount
  useEffect(() => {
    let isMounted = true;
    if (product) {
      setIsResynthesizing(true);
      geminiService.synthesizeVerdict(product, 'general').then((fresh) => {
        if (isMounted && fresh) {
          setCurrentDigest(fresh);
          setLastGeneratedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }).catch(err => {
        console.warn('Initial live synthesis error:', err);
      }).finally(() => {
        if (isMounted) setIsResynthesizing(false);
      });
    }
    return () => { isMounted = false; };
  }, [product?.id]);

  const handleLensChange = async (lens: LensType) => {
    setActiveLens(lens);
    if (!product) return;

    setIsResynthesizing(true);
    try {
      const fresh = await geminiService.synthesizeVerdict(product, lens);
      setCurrentDigest(fresh);
      setLastGeneratedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn('Lens re-synthesis error:', err);
    } finally {
      setIsResynthesizing(false);
    }
  };

  const handleResynthesizeClick = async () => {
    if (!product) return;
    setIsResynthesizing(true);
    try {
      const fresh = await geminiService.synthesizeVerdict(product, activeLens);
      setCurrentDigest(fresh);
      setLastGeneratedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn('Re-synthesis error:', err);
    } finally {
      setIsResynthesizing(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || !product) return;

    setIsLoadingAnswer(true);
    setAiAnswer(null);

    try {
      const answer = await geminiService.askProductQuestion(product, userQuestion);
      setAiAnswer(answer);
    } catch {
      setAiAnswer('Unable to generate response at this time. Please try again.');
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fdf4ff 0%, #faf5ff 50%, #f5f3ff 100%)',
        border: '1.5px solid #d8b4fe',
        borderRadius: '14px',
        padding: '1.6rem',
        marginTop: '1.75rem',
        marginBottom: '1.75rem',
        boxShadow: '0 8px 24px rgba(168, 85, 247, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ambient glow */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-40px', 
          right: '-40px', 
          width: '120px', 
          height: '120px', 
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} 
      />

      {/* Top Banner */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem',
          marginBottom: '1.25rem',
          borderBottom: '1px solid rgba(216, 180, 254, 0.5)',
          paddingBottom: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)', 
              color: '#ffffff', 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(124, 58, 237, 0.4)'
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#581c87', letterSpacing: '-0.02em', margin: 0 }}>
                The Verdict — Live AI Review Synthesis
              </h3>
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', 
                  color: '#ffffff', 
                  fontSize: '0.65rem', 
                  fontWeight: 900, 
                  padding: '2px 7px', 
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Gemini 1.5 Flash • Live API
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#7e22ce' }}>
              Synthesized live across specs, verified hardware teardowns & user reviews
            </span>
          </div>
        </div>

        {/* Dynamic Re-Synthesize Trigger & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={handleResynthesizeClick}
            disabled={isResynthesizing}
            style={{
              backgroundColor: isResynthesizing ? '#ede9fe' : '#7c3aed',
              color: isResynthesizing ? '#7c3aed' : '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: isResynthesizing ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(124, 58, 237, 0.2)'
            }}
            title="Re-run Gemini AI synthesis on this product"
          >
            <Sparkles size={13} className={isResynthesizing ? 'loading-spinner' : ''} />
            <span>{isResynthesizing ? 'Synthesizing with Gemini...' : 'Re-Synthesize'}</span>
          </button>

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              backgroundColor: '#ffffff', 
              padding: '4px 10px', 
              borderRadius: '9999px',
              border: '1px solid #e9d5ff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: isResynthesizing ? '#f59e0b' : '#16a34a', display: 'inline-block' }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6b21a8' }}>
              {isResynthesizing ? 'Gemini Live Fetch...' : `Live (${lastGeneratedTime})`}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Perspective Lens Switcher */}
      <div style={{ marginBottom: '1.1rem' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#7e22ce', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
          AI Evaluation Perspective Lens:
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {LENSES.map(lens => {
            const Icon = lens.icon;
            const isSelected = activeLens === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => handleLensChange(lens.id)}
                disabled={isResynthesizing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 800 : 600,
                  backgroundColor: isSelected ? '#7c3aed' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#6b21a8',
                  border: isSelected ? '1px solid #7c3aed' : '1px solid #d8b4fe',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={12} />
                <span>{lens.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Executive Consensus */}
      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '10px', 
          padding: '1.1rem', 
          border: '1px solid rgba(233, 213, 255, 0.8)',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 6px rgba(124, 58, 237, 0.04)',
          opacity: isResynthesizing ? 0.6 : 1,
          transition: 'opacity 0.2s ease'
        }}
      >
        <p 
          style={{ 
            fontSize: '0.94rem', 
            color: '#3b0764', 
            lineHeight: 1.65, 
            margin: 0,
            fontWeight: 500
          }}
        >
          {currentDigest.verdict}
        </p>
      </div>

      {/* Pros & Cons Columns */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.25rem',
          opacity: isResynthesizing ? 0.6 : 1,
          transition: 'opacity 0.2s ease'
        }}
      >
        {/* Pros */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '10px', 
            padding: '1.1rem', 
            border: '1px solid #bbf7d0',
            boxShadow: '0 2px 4px rgba(34, 197, 94, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <div style={{ background: '#22c55e', color: '#ffffff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={14} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#15803d' }}>Consensus Strengths</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {currentDigest.pros.map((pro, idx) => (
              <li key={idx} style={{ fontSize: '0.84rem', color: '#1f2937', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                <span style={{ color: '#16a34a', fontWeight: 800 }}>✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons / Trade-offs */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '10px', 
            padding: '1.1rem', 
            border: '1px solid #fde68a',
            boxShadow: '0 2px 4px rgba(245, 158, 11, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <div style={{ background: '#f59e0b', color: '#ffffff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={13} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b45309' }}>Known Trade-offs</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {currentDigest.cons.map((con, idx) => (
              <li key={idx} style={{ fontSize: '0.84rem', color: '#1f2937', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                <span style={{ color: '#d97706', fontWeight: 800 }}>⚠</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buyer Persona Recommendation */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)', 
          borderRadius: '10px', 
          padding: '0.85rem 1.15rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          border: '1px solid #d8b4fe',
          marginBottom: '1.25rem',
          opacity: isResynthesizing ? 0.6 : 1,
          transition: 'opacity 0.2s ease'
        }}
      >
        <UserCheck size={20} color="#7c3aed" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.86rem', color: '#581c87', lineHeight: 1.4 }}>
          <strong>Best Suited For:</strong> {currentDigest.bestFor}
        </span>
      </div>

      {/* Interactive Live Gemini Assistant Chat */}
      {product && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '1.1rem',
            border: '1px solid #e9d5ff',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
            <Sparkles size={16} color="#7c3aed" />
            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#581c87' }}>
              Ask Gemini AI About This Product
            </span>
          </div>

          <form onSubmit={handleAskQuestion} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder={`e.g., Is the ${product.brand} good for software development or travel?`}
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #d8b4fe',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isLoadingAnswer || !userQuestion.trim()}
              className="btn-press"
              style={{
                backgroundColor: '#7c3aed',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.55rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: isLoadingAnswer ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isLoadingAnswer ? <Sparkles size={16} className="badge-bounce" /> : <ArrowRight size={15} />}
              <span>{isLoadingAnswer ? 'Synthesizing...' : 'Ask AI'}</span>
            </button>
          </form>

          {aiAnswer && (
            <div
              style={{
                marginTop: '0.85rem',
                padding: '0.85rem',
                backgroundColor: '#faf5ff',
                borderRadius: '8px',
                borderLeft: '3px solid #9333ea',
                fontSize: '0.85rem',
                color: '#3b0764',
                lineHeight: 1.55
              }}
              className="view-fade-in"
            >
              <strong>Gemini AI Answer:</strong> {aiAnswer}
            </div>
          )}
        </div>
      )}

      {/* Feedback Micro-action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6b21a8' }}>
        <span>Did this AI synthesis save you time reading 50+ reviews?</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFeedbackGiven('yes')}
            disabled={feedbackGiven !== null}
            style={{
              background: feedbackGiven === 'yes' ? '#7c3aed' : '#ffffff',
              color: feedbackGiven === 'yes' ? '#ffffff' : '#6b21a8',
              border: '1px solid #d8b4fe',
              borderRadius: '6px',
              padding: '3px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            <ThumbsUp size={13} />
            <span>Yes, helpful</span>
          </button>
          <button
            onClick={() => setFeedbackGiven('no')}
            disabled={feedbackGiven !== null}
            style={{
              background: feedbackGiven === 'no' ? '#7c3aed' : '#ffffff',
              color: feedbackGiven === 'no' ? '#ffffff' : '#6b21a8',
              border: '1px solid #d8b4fe',
              borderRadius: '6px',
              padding: '3px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            <ThumbsDown size={13} />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
};
