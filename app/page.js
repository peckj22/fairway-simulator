"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:           #09100d;
          --surface:      #0f1a15;
          --surface2:     #162110;
          --border:       #1e3028;
          --green:        #1a7a4a;
          --green-light:  #2db36a;
          --green-dim:    #1a4a32;
          --gold:         #c9a84c;
          --text:         #e8f0eb;
          --text2:        #8aab96;
          --text3:        #4a6655;
        }

        html, body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Nav ── */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 56px;
          background: rgba(9,16,13,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 4px;
          color: var(--green-light);
        }
        .nav-tagline {
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--text3);
          font-family: 'DM Mono', monospace;
          text-transform: uppercase;
        }

        /* ── Hero ── */
        .hero {
          padding: 160px 40px 80px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--green-light);
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--green-light);
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 10vw, 120px);
          letter-spacing: 6px;
          line-height: 0.9;
          color: var(--text);
          margin-bottom: 28px;
        }
        .hero-title span {
          color: var(--green-light);
        }
        .hero-sub {
          font-size: 16px;
          color: var(--text2);
          max-width: 480px;
          line-height: 1.7;
          font-weight: 300;
        }

        /* ── Grid ── */
        .apps-section {
          padding: 40px 40px 120px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: var(--text3);
          text-transform: uppercase;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 32px;
        }
        .apps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2px;
        }

        /* ── App Tile ── */
        .app-tile {
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .app-tile:hover {
          border-color: var(--green);
          transform: translateY(-2px);
        }
        .app-tile:hover .tile-arrow {
          transform: translateX(4px);
          color: var(--green-light);
        }
        .app-tile:hover .tile-preview-overlay {
          opacity: 0.6;
        }

        /* Preview image area */
        .tile-preview {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--surface2);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .tile-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top left;
          display: block;
          opacity: 0.85;
          transition: opacity 0.3s, transform 0.4s;
        }
        .app-tile:hover .tile-preview img {
          opacity: 1;
          transform: scale(1.02);
        }
        .tile-preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, var(--surface) 100%);
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .tile-preview-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: repeating-linear-gradient(
            45deg,
            var(--surface2) 0px,
            var(--surface2) 10px,
            var(--bg) 10px,
            var(--bg) 20px
          );
        }
        .tile-preview-placeholder-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: var(--border);
          letter-spacing: 4px;
        }

        /* Tile badge */
        .tile-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--green);
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          padding: 3px 8px;
          text-transform: uppercase;
        }

        /* Tile content */
        .tile-content {
          padding: 20px 24px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .tile-category {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--green-light);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .tile-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: var(--text);
          line-height: 1;
          margin-bottom: 10px;
        }
        .tile-desc {
          font-size: 12px;
          color: var(--text2);
          line-height: 1.6;
          flex: 1;
        }
        .tile-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .tile-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--text3);
        }
        .tile-arrow {
          font-size: 14px;
          color: var(--text3);
          transition: transform 0.2s, color 0.2s;
        }

        /* ── Coming soon tile ── */
        .app-tile.coming-soon {
          opacity: 0.45;
          pointer-events: none;
        }
        .coming-soon-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text3);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          padding: 3px 8px;
          text-transform: uppercase;
        }

        /* ── Footer ── */
        footer {
          border-top: 1px solid var(--border);
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
        }
        .footer-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 4px;
          color: var(--text3);
        }
        .footer-note {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--text3);
        }

        /* ── Scan line texture ── */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 9999;
        }

        @media (max-width: 600px) {
          nav { padding: 0 20px; }
          .hero { padding: 120px 20px 60px; }
          .apps-section { padding: 20px 20px 80px; }
          footer { padding: 24px 20px; flex-direction: column; gap: 8px; }
        }
      `}</style>

      {/* Nav */}
      <nav>
        <div className="nav-logo">FAIRWAY</div>
        <div className="nav-tagline">Golf Intelligence Tools</div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">Golf Intelligence</div>
        <h1 className="hero-title">
          THE<br />
          <span>FAIRWAY</span><br />
          SUITE
        </h1>
        <p className="hero-sub">
          A collection of data-driven tools for golf fans who want to go deeper than the leaderboard.
        </p>
      </section>

      {/* Apps */}
      <section className="apps-section">
        <div className="section-label">Available Tools — 1 of more to come</div>
        <div className="apps-grid">

          {/* What-If Simulator */}
          <a className="app-tile" href="/simulator">
            <div className="tile-preview">
              <img
                src="/preview-simulator.png"
                alt="What-If Simulator preview"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="tile-preview-overlay" />
              <div className="tile-badge">Live</div>
            </div>
            <div className="tile-content">
              <div className="tile-category">Player Analysis</div>
              <div className="tile-title">WHAT-IF SIMULATOR</div>
              <div className="tile-desc">
                Adjust any PGA Tour player's stats and see the projected impact on their scoring average, world ranking, and earnings — in real time.
              </div>
              <div className="tile-footer">
                <span className="tile-tag">PGA TOUR · OWGR · 2019–2026</span>
                <span className="tile-arrow">→</span>
              </div>
            </div>
          </a>

          {/* Coming Soon 1 */}
          <div className="app-tile coming-soon">
            <div className="tile-preview">
              <div className="tile-preview-placeholder">
                <div className="tile-preview-placeholder-icon">?</div>
              </div>
              <div className="coming-soon-badge">Coming Soon</div>
            </div>
            <div className="tile-content">
              <div className="tile-category">Tournament</div>
              <div className="tile-title">FIELD ANALYZER</div>
              <div className="tile-desc">
                Break down any tournament field by strokes gained category and identify statistical edges before the first tee shot.
              </div>
              <div className="tile-footer">
                <span className="tile-tag">In Development</span>
                <span className="tile-arrow">→</span>
              </div>
            </div>
          </div>

          {/* Coming Soon 2 */}
          <div className="app-tile coming-soon">
            <div className="tile-preview">
              <div className="tile-preview-placeholder">
                <div className="tile-preview-placeholder-icon">?</div>
              </div>
              <div className="coming-soon-badge">Coming Soon</div>
            </div>
            <div className="tile-content">
              <div className="tile-category">Rankings</div>
              <div className="tile-title">RANK TRACKER</div>
              <div className="tile-desc">
                Follow world ranking movement over time. Spot the risers, fallers, and players on the bubble for major championships.
              </div>
              <div className="tile-footer">
                <span className="tile-tag">In Development</span>
                <span className="tile-arrow">→</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <footer>
        <div className="footer-logo">FAIRWAY</div>
        <div className="footer-note">Data: PGA Tour · OWGR · Updated live</div>
      </footer>
    </>
  );
}
