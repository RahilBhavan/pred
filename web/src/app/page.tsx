'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  Cpu, 
  Database, 
  Globe,
  Github,
  ChevronRight,
  RefreshCcw,
  Lock,
  LineChart,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Code
} from 'lucide-react';

// --- Constants & Types ---

const BOT_LOGS = [
  "Fetching mid-price from Sportmonks oracle...",
  "Order book imbalance detected (Bid/Ask: 5.2x). Widening spread.",
  "Inventory skew active: Position is +450 units. Shifting mid-price down.",
  "New quotes calculated: Bid 0.4850 / Ask 0.5150",
  "Updating limit orders on Base L2... Success (142ms)",
  "Monitoring for toxic flow on market ID: EPL-2024-03-05",
  "PnL checkpoint: +0.024 ETH today. Fill rate: 82%.",
  "Risk check passed. Delta exposure: 0.12.",
];

// --- Components ---

const Navbar = () => (
  <nav style={{ 
    padding: '1.5rem 2rem', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
    background: 'rgba(10, 10, 11, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--card-border)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 15px var(--primary-glow)'
      }}>
        <Zap size={18} color="white" fill="white" />
      </div>
      <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PRED</span>
    </div>
    <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
      <a href="#vision" className="nav-link">Vision</a>
      <a href="#strategy" className="nav-link">Strategy</a>
      <a href="#engine" className="nav-link">Engine</a>
      <a href="#demo" className="nav-link">Live View</a>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <a href="https://github.com" target="_blank" className="button button-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
        <Github size={16} />
        <span>Source</span>
      </a>
      <button className="button button-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
        Get Started
      </button>
    </div>
  </nav>
);

const BotDecisionLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, BOT_LOGS[i % BOT_LOGS.length]].slice(-6));
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" style={{ padding: '1.25rem', flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', height: '320px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Execution Logs</span>
        </div>
        <div className="status-badge success">Active</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
        <AnimatePresence mode="popLayout">
          {logs.map((log, idx) => (
            <motion.div
              key={log + idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ color: log.includes('Success') ? 'var(--success)' : log.includes('imbalance') ? 'var(--error)' : 'var(--text-muted)', borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: '0.75rem' }}
            >
              <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const OrderBookDemo = () => {
  const [orders, setOrders] = useState<{ price: number; size: number; side: 'buy' | 'sell' }[]>([]);
  
  useEffect(() => {
    const generateOrders = () => {
      const mid = 50.5;
      const newOrders = [];
      for (let i = 0; i < 6; i++) {
        newOrders.push({ price: mid + (i + 1) * 0.1, size: 200 + Math.random() * 800, side: 'sell' as const });
        newOrders.push({ price: mid - (i + 1) * 0.1, size: 200 + Math.random() * 800, side: 'buy' as const });
      }
      setOrders(newOrders.sort((a, b) => b.price - a.price));
    };

    generateOrders();
    const interval = setInterval(generateOrders, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.25rem', height: '320px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={16} color="var(--secondary)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Live Order Book</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Market: EPL-2026-ARSNL</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0 8px 8px', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>
          <span>Price (USD)</span>
          <span style={{ textAlign: 'right' }}>Size</span>
        </div>
        {orders.map((order, i) => (
          <div key={i} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            padding: '6px 8px',
            background: order.side === 'sell' ? 'rgba(239, 68, 68, 0.03)' : 'rgba(16, 185, 129, 0.03)',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            border: order.side === 'sell' && i === 5 ? '1px solid var(--error)' : order.side === 'buy' && i === 6 ? '1px solid var(--success)' : 'none'
          }}>
            <div style={{ 
              position: 'absolute', 
              right: 0, 
              top: 0, 
              bottom: 0, 
              width: `${(order.size / 1000) * 100}%`, 
              background: order.side === 'sell' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
              zIndex: 0
            }} />
            <span style={{ color: order.side === 'sell' ? 'var(--error)' : 'var(--success)', zIndex: 1, fontWeight: 600 }}>{order.price.toFixed(2)}</span>
            <span style={{ textAlign: 'right', color: 'var(--foreground)', zIndex: 1 }}>{order.size.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -8, borderColor: color }} 
    className="card" 
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ 
      position: 'absolute', 
      top: '-20%', 
      right: '-10%', 
      width: '100px', 
      height: '100px', 
      background: color, 
      filter: 'blur(60px)', 
      opacity: 0.1,
      zIndex: 0
    }} />
    <div style={{ color: color, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}><Icon size={32} /></div>
    <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', position: 'relative', zIndex: 1 }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
      {description}
    </p>
  </motion.div>
);

// --- Main Page ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main style={{ position: 'relative' }}>
      <style jsx global>{`
        .nav-link {
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .nav-link:hover {
          color: var(--primary);
          transform: translateY(-1px);
        }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-badge.success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }
        .status-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 8px currentColor;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          background: var(--card-bg);
          color: var(--primary);
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="bg-grid" />
      <div className="glow-circle" style={{ top: '5%', left: '10%', opacity: 0.4 }} />
      <div className="glow-circle" style={{ bottom: '20%', right: '5%', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.2 }} />
      
      <Navbar />

      {/* Hero Section */}
      <section className="section container" style={{ paddingTop: '14rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          style={{ opacity, scale, textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            padding: '0.6rem 1.2rem', 
            background: 'rgba(20, 20, 23, 0.6)', 
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--card-border)',
            borderRadius: '100px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            marginBottom: '2.5rem',
            color: 'var(--primary)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <Activity size={14} className="text-glow" />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>High-Frequency Liquidity Protocol</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', lineHeight: 0.95, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
            Algorithmic <br />
            <span className="title-gradient text-glow">Market Making</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
            Empowering the Pred Central Limit Order Book on Base with professional-grade liquidity, sub-200ms execution, and sophisticated inventory management.
          </p>
          
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="button button-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              Explore Architecture <ChevronRight size={20} />
            </button>
            <button className="button button-outline" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              <Github size={20} /> View Github
            </button>
          </div>

          <div style={{ marginTop: '6rem', display: 'flex', gap: '4rem', justifyContent: 'center', opacity: 0.6 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>&lt;200ms</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Latency</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>99.9%</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Uptime</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>NON-CUSTODIAL</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Design</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem & Solution (Why it Works) */}
      <section id="vision" className="section container" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Solving the <br /><span style={{ color: 'var(--error)' }}>Liquidity Gap</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Prediction markets often suffer from wide spreads and thin order books, leading to high slippage and poor user experience.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: "Wide Spreads", desc: "Traditional markets often have 5-10% bid-ask spreads.", icon: <AlertTriangle size={20} color="var(--error)" /> },
                { title: "Fragmented Depth", desc: "Large trades cause significant price impact.", icon: <AlertTriangle size={20} color="var(--error)" /> },
                { title: "Adverse Selection", desc: "Manual market makers are often 'picked off' by news.", icon: <AlertTriangle size={20} color="var(--error)" /> }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{ marginTop: '0.25rem' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, var(--card-bg) 0%, #1a1a20 100%)', borderColor: 'var(--primary-glow)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--success)' }}>The Pred Solution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { title: "Algorithmic Precision", desc: "Automated quoting maintains consistent <2% spreads.", icon: <CheckCircle2 size={24} color="var(--success)" /> },
                { title: "Inventory Skewing", desc: "Dynamic mid-price shifting to maintain delta neutrality.", icon: <CheckCircle2 size={24} color="var(--success)" /> },
                { title: "Toxic Flow Protection", desc: "Real-time imbalance detection to widen spreads during volatility.", icon: <CheckCircle2 size={24} color="var(--success)" /> }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ marginTop: '0.25rem' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Deep Dive (How it Works) */}
      <section id="strategy" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The Strategy Loop</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            A continuous execution cycle that transforms market data into profitable liquidity.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { step: "01", icon: Search, title: "Ingestion", desc: "Polling order book state and external oracles every 200ms.", color: "var(--accent)" },
            { step: "02", icon: RefreshCcw, title: "Normalization", desc: "Calculating mid-price and current inventory-adjusted delta.", color: "var(--primary)" },
            { step: "03", icon: LineChart, title: "Pricing", desc: "Applying Avellaneda-Stoikov quoting logic with volatility skews.", color: "var(--secondary)" },
            { step: "04", icon: Layers, title: "Execution", desc: "Atomic order updates on Base via asynchronous API calls.", color: "var(--success)" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="step-number">{item.step}</div>
              <FeatureCard icon={item.icon} title={item.title} description={item.desc} color={item.color} />
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Engine */}
      <section id="engine" className="section" style={{ background: 'rgba(59, 130, 246, 0.02)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Architecture</div>
              <h2 style={{ fontSize: '3rem', lineHeight: 1.1 }}>High-Performance <br />Python Stack</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>
                Built with a focus on asynchronous execution and type safety, the engine ensures every order is placed with sub-millisecond local latency.
              </p>
              
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><Lock size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Non-Custodial Keys</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Local signing via Web3.py. No keys ever leave memory.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}><Zap size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 700 }}>AsyncIO Event Loop</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Concurrent market monitoring and execution.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><Shield size={20} /></div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Risk Management</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hard limits on drawdown and max position size.</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>24/7</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Autonomous Liquidity</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>142ms</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Execution</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>On-Chain Base</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="section container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Live Market Pulse</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Observe the real-time interaction between the strategy engine and the Pred matching engine. The bot dynamically shifts orders to maintain a balanced book.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Current Inventory</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>+452.2 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>UNITS</span></div>
                <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.5rem' }}>Skew: -0.012 (Adjusting)</div>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Market Spread</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1.85%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem' }}>Target: &lt; 2.0%</div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <OrderBookDemo />
              <BotDecisionLogs />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '6rem 0 4rem', borderTop: '1px solid var(--card-border)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem', textAlign: 'left' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={22} color="white" fill="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>PRED</span>
              </div>
              <p style={{ color: 'var(--text-muted)', maxWidth: '300px', lineHeight: 1.6 }}>
                The liquidity backbone for high-performance prediction markets on Base. Built for speed, security, and precision.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Product</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <a href="#vision">Vision</a>
                <a href="#strategy">Strategy</a>
                <a href="#engine">Architecture</a>
                <a href="#demo">Live Demo</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <a href="https://github.com">GitHub</a>
                <a href="#">Documentation</a>
                <a href="#">Base Explorer</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <span>&copy; 2026 Pred Liquidity Engine. Open Source under MIT.</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="https://twitter.com" target="_blank"><Globe size={20} /></a>
              <a href="https://github.com" target="_blank"><Github size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
