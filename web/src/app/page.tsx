'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Activity, Shield, Zap, BarChart3, Cpu, Database, Globe, Github, 
  ChevronRight, RefreshCcw, Lock, LineChart, Layers, Search, CheckCircle2, 
  AlertTriangle, Code, Terminal, Server, ExternalLink, Mail, 
  BookOpen, Gauge, Braces, Workflow, Play, Compass, Waves, Anchor
} from 'lucide-react';

// --- Loading Component ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      style={{ 
        position: 'fixed', inset: 0, zIndex: 1000, background: '#020617', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
      }}
    >
      <div style={{ position: 'relative', width: '200px', height: '1px', background: 'rgba(144, 224, 239, 0.1)', marginBottom: '2rem' }}>
        <motion.div 
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#FF7438', width: `${progress}%` }} 
        />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#90E0EF', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
        Syncing Engine Assets: {progress}%
      </div>
    </motion.div>
  );
};

// --- Navigation ---

const Navbar = () => (
  <nav style={{ 
    padding: '1.5rem 3rem', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
    background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.8), transparent)',
    backdropFilter: 'blur(8px)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Compass size={24} color="#FF7438" />
      <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.2em', color: '#fff' }}>PRED_EXPLORER</span>
    </div>
    
    <div style={{ display: 'flex', gap: '3rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
      <a href="#vision" className="nav-link">The Mission</a>
      <a href="#strategy" className="nav-link">Architecture</a>
      <a href="#impact" className="nav-link">Metrics</a>
    </div>

    <button className="button button-primary" style={{ padding: '0.5rem 1rem' }}>
      <Anchor size={16} /> Enter Base L2
    </button>
  </nav>
);

// --- Chapters ---

const ChapterHeader = ({ num, title }: { num: string, title: string }) => (
  <div style={{ marginBottom: '2rem' }}>
    <div className="chapter-marker" style={{ marginBottom: '0.5rem' }}>
      <div style={{ width: '20px', height: '1px', background: 'var(--accent)' }} />
      <span>Chapter {num}</span>
    </div>
    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9 }}>{title}</h2>
  </div>
);

// --- Main Page ---

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Depth Transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.8]);
  const heroZ = useTransform(smoothProgress, [0, 0.1], [0, -500]);

  // Horizontal Movement simulation via scroll
  const xTranslate = useTransform(smoothProgress, [0.15, 0.9], ['0%', '-300%']);

  return (
    <main style={{ background: '#020617', color: '#f8fafc', position: 'relative', minHeight: '500vh' }}>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="bg-particles" />
      <div className="bg-grid" />
      
      <Navbar />

      {/* Chapter 00: The Descent (Hero) */}
      <motion.section 
        style={{ 
          opacity: heroOpacity, 
          scale: heroScale, 
          translateZ: heroZ,
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          zIndex: 10
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Compass size={64} color="#FF7438" style={{ marginBottom: '2rem' }} />
          <h1 style={{ fontSize: 'clamp(3rem, 12vw, 8rem)', marginBottom: '1.5rem', fontWeight: 900 }}>
            <span className="text-gradient-cyan">PRED</span>
            <span style={{ color: 'var(--accent)' }}>.2026</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            A Cinematic Exploration of High-Performance Liquidity on Base L2.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
              <Waves size={16} color="#90E0EF" /> Scroll to Descend
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Horizontal Timeline Journey */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '400%', height: '100vh', display: 'flex', alignItems: 'center', zIndex: 5 }}>
        <motion.div 
          style={{ 
            display: 'flex', 
            width: '100%', 
            height: '100%', 
            x: xTranslate,
            paddingLeft: '100vw' 
          }}
        >
          {/* Chapter 01: The Problem Space */}
          <section id="vision" style={{ width: '100vw', flexShrink: 0, padding: '0 10vw', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '800px' }}>
              <ChapterHeader num="01" title="Navigating the Abyss" />
              <p style={{ fontSize: '1.5rem', lineHeight: 1.4, color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Traditional prediction markets suffer from <span style={{ color: '#fff' }}>fragmented liquidity</span> and <span style={{ color: '#fff' }}>asymmetric risk</span>. We dive deep to bridge the gap.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                <div className="card">
                  <AlertTriangle size={24} color="#FF7438" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>The Spread Void</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Manual makers can't sustain tight spreads during high volatility. We automate the response.</p>
                </div>
                <div className="card">
                  <Activity size={24} color="#90E0EF" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Adverse Selection</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engineered to detect toxic flow before it impacts the book depth.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 02: Architecture */}
          <section id="strategy" style={{ width: '100vw', flexShrink: 0, padding: '0 10vw', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
              <div>
                <ChapterHeader num="02" title="The High-Frequency Engine" />
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  A decoupled architecture built with Python AsyncIO and Base L2, ensuring sub-200ms execution across global markets.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['Inventory Skewing', 'Adverse Selection Protection', 'Async Market Monitoring'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)' }}>
                      <CheckCircle2 size={16} color="#FF7438" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Braces size={16} color="#90E0EF" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>core_engine.py</span>
                  </div>
                </div>
                <pre style={{ padding: '2rem', fontSize: '0.8rem', color: '#90E0EF', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>
                  {`async def update_quotes(self, book):
    mid = book.mid_price()
    skew = self.inventory * 0.05
    
    # Calculate adjusted bid/ask
    adj_mid = mid - skew
    bid = adj_mid - self.base_spread
    ask = adj_mid + self.base_spread
    
    await self.execution.place_atomic(bid, ask)`}
                </pre>
              </div>
            </div>
          </section>

          {/* Chapter 03: Performance */}
          <section id="impact" style={{ width: '100vw', flexShrink: 0, padding: '0 10vw', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <ChapterHeader num="03" title="Oceanic Impact" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
                {[
                  { label: 'Avg Latency', val: '142ms', color: '#90E0EF' },
                  { label: 'Uptime', val: '99.98%', color: '#FF7438' },
                  { label: 'Spread Comp.', val: '72%', color: '#90E0EF' },
                  { label: 'Fill Rate', val: '86%', color: '#FF7438' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05 }}
                    className="card" 
                    style={{ textAlign: 'center', borderColor: stat.color }}
                  >
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: stat.color }}>{stat.val}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact / Final Node */}
          <section style={{ width: '100vw', flexShrink: 0, padding: '0 10vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Ready to <span className="text-gradient-coral">Dive?</span></h2>
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                <button className="button button-primary" style={{ padding: '1.5rem 3rem', fontSize: '1rem' }}>
                   View Full Case Study
                </button>
                <button className="button button-outline" style={{ padding: '1.5rem 3rem', fontSize: '1rem' }}>
                   Join Expedition
                </button>
              </div>
              <div style={{ marginTop: '6rem', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                RAHIL_BHAVAN &copy; 2026 // BASE_EXPLORER
              </div>
            </div>
          </section>
        </motion.div>
      </div>
      
      {/* Progress Indicator */}
      <div style={{ position: 'fixed', bottom: '3rem', left: '3rem', zIndex: 100, display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '100px', height: '1px', background: 'rgba(255,255,255,0.1)' }}>
          <motion.div style={{ height: '100%', background: '#FF7438', width: scrollYProgress, scaleX: 1, transformOrigin: 'left' }} />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#FF7438' }}>MISSION_PROGRESS</span>
      </div>
    </main>
  );
}
