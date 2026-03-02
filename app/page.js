'use client';

import { useEffect, useState } from 'react';

export default function SimulatorPage() {
  const [mounted, setMounted] = useState(false);
  const [html, setHtml]       = useState('');
  const [css, setCss]         = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/simulator-body.html').then(r => r.text()),
      fetch('/simulator.css').then(r => r.text()),
    ]).then(([htmlContent, cssContent]) => {
      setHtml(htmlContent);
      setCss(cssContent);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (document.getElementById('simulator-script')) return;
    setTimeout(() => {
      if (document.getElementById('simulator-script')) return;
      const script = document.createElement('script');
      script.id  = 'simulator-script';
      script.src = '/simulator.js';
      document.body.appendChild(script);
    }, 100);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
