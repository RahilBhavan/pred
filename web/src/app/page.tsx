'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  Cpu, 
  Database, 
  Globe,
  Github
} from 'lucide-react';

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
    background: 'rgba(10, 10, 11, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--card-border)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        background: 'var(--primary)', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Zap size={20} color="white" />
      </div>
      <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>PRED</span>
    </div>
    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
      <a href="#how-it-works" style={{ transition: 'color 0.2s' }}>How it Works</a>
      <a href="#demo" style={{ transition: 'color 0.2s' }}>Demo</a>
      <a href="#tech" style={{ transition: 'color 0.2s' }}>Tech Stack</a>
    </div>
    <a href="https://github.com" target="_blank" className="button button-outline" style={{ padding: '0.5rem 1rem' }}>
      <Github size={18} />
      <span>GitHub</span>
    </a>
  </nav>
);

const OrderBookDemo = () => {
  const [orders, setOrders] = useState<{ price: number; size: number; side: 'buy' | 'sell' }[]>([]);
  
  useEffect(() => {
    // Simulate live order book
    const generateOrders = () => {
      const mid = 50.5;
      const newOrders = [];
      for (let i = 0; i < 5; i++) {
        newOrders.push({ price: mid + (i + 1) * 0.1, size: Math.random() * 1000, side: 'sell' as const });
        newOrders.push({ price: mid - (i + 1) * 0.1, size: Math.random() * 1000, side: 'buy' as const });
      }
      setOrders(newOrders.sort((a, b) => b.price - a.price));
    };

    generateOrders();
    const interval = setInterval(generateOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" style={{ flex: 1, minWidth: '300px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Live Order Book</h3>
        <div style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} />
          Live
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
        {orders.map((order, i) => (
          <div key={i} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            padding: '4px 8px',
            background: order.side === 'sell' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              right: 0, 
              top: 0, 
              bottom: 0, 
              width: `${(order.size / 1000) * 100}%`, 
              background: order.side === 'sell' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              zIndex: 0
            }} />
            <span style={{ color: order.side === 'sell' ? 'var(--error)' : 'var(--success)', zIndex: 1 }}>{order.price.toFixed(2)}</span>
            <span style={{ textAlign: 'right', color: 'var(--foreground)', zIndex: 1 }}>{order.size.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  return (
    <main>
      <div className="bg-grid" />
      <div className="glow-circle" style={{ top: '10%', left: '20%' }} />
      <div className="glow-circle" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)' }} />
      
      <Navbar />

      {/* Hero Section */}
      <section className="section container" style={{ paddingTop: '12rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            background: 'var(--card-bg)', 
            border: '1px solid var(--card-border)',
            borderRadius: '100px',
            fontSize: '0.875rem',
            marginBottom: '2rem',
            color: 'var(--primary)'
          }}>
            <Activity size={16} />
            <span>Non-Custodial Liquidity Engine</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Liquidity for the <br />
            <span className="title-gradient">Future of Prediction</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
            A high-performance market making bot for the Pred CLOB on Base. 
            Narrowing spreads and deepening books through algorithmic precision.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="button button-primary">
              View Documentation <ArrowRight size={20} />
            </button>
            <button className="button button-outline">
              Explore Markets
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Preview */}
      <section className="container">
        <div className="stats-grid">
          <div className="card">
            <div className="stat-label">Response Time</div>
            <div className="stat-value">&lt;200ms</div>
          </div>
          <div className="card">
            <div className="stat-label">Active Markets</div>
            <div className="stat-value">24/7</div>
          </div>
          <div className="card">
            <div className="stat-label">Chain</div>
            <div className="stat-value">Base</div>
          </div>
          <div className="card">
            <div className="stat-label">Architecture</div>
            <div className="stat-value">CLOB</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Engineering Excellence</h2>
          <p style={{ color: 'var(--text-muted)' }}>Three layers of sophisticated logic working in harmony.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div whileHover={{ y: -5 }} className="card">
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Cpu size={32} /></div>
            <h3 style={{ marginBottom: '1rem' }}>Strategy Engine</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Implements dynamic quoting strategies like Avellaneda-Stoikov. 
              Manages inventory risk and bid-ask spreads in real-time.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="card">
            <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}><Zap size={32} /></div>
            <h3 style={{ marginBottom: '1rem' }}>Execution Layer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Asynchronous order management via Pred CLOB API. 
              Sub-200ms synchronization with matching engine state.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="card">
            <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}><BarChart3 size={32} /></div>
            <h3 style={{ marginBottom: '1rem' }}>Telemetry</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Real-time PnL tracking, fill rate analysis, and structured logging 
              for every trade decision made by the bot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Demo */}
      <section id="demo" className="section container" style={{ background: 'rgba(59, 130, 246, 0.02)', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Live Market Pulse</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Experience the precision of algorithmic liquidity. Our bot maintains balanced order books even in volatile environments.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Shield size={20} />, text: 'Non-custodial: Private keys stay local' },
                { icon: <Activity size={20} />, text: 'Dynamic rebalancing every 500ms' },
                { icon: <Database size={20} />, text: 'Integrated with Base L2 for low fees' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--foreground)' }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <OrderBookDemo />
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Built for Speed</h2>
          <p style={{ color: 'var(--text-muted)' }}>Leveraging the best in modern distributed systems.</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', opacity: 0.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Globe size={24} /> <span style={{ fontWeight: 600 }}>Base L2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cpu size={24} /> <span style={{ fontWeight: 600 }}>Python Asyncio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Database size={24} /> <span style={{ fontWeight: 600 }}>PostgreSQL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={24} /> <span style={{ fontWeight: 600 }}>Next.js 15</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Zap size={24} color="var(--primary)" />
          <span style={{ fontWeight: 800 }}>PRED</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          &copy; 2026 Pred Liquidity Engine. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
