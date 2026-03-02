// SVG icons for each slider thumb
  const SLIDER_ICONS = {
    drvDist: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Driver head: modern rounded club head -->
      <ellipse cx="16" cy="20" rx="13" ry="8" fill="#1a7a4a" stroke="#2db36a" stroke-width="1.2"/>
      <ellipse cx="16" cy="19.5" rx="11" ry="6" fill="#0d3d26"/>
      <rect x="14.5" y="8" width="3" height="12" rx="1.5" fill="#2db36a"/>
      <rect x="13" y="6" width="6" height="3" rx="1.5" fill="#c9a84c"/>
      <line x1="8" y1="20" x2="24" y2="20" stroke="#2db36a" stroke-width="0.8" opacity="0.4"/>
    </svg>`,

    drvAcc: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Bullseye: three rings + center dot -->
      <circle cx="16" cy="16" r="13" stroke="#2db36a" stroke-width="1.2" fill="#0d3d26"/>
      <circle cx="16" cy="16" r="9" stroke="#2db36a" stroke-width="1.2" fill="#1a7a4a"/>
      <circle cx="16" cy="16" r="5" stroke="#2db36a" stroke-width="1.2" fill="#0d3d26"/>
      <circle cx="16" cy="16" r="2.5" fill="#c9a84c"/>
    </svg>`,

    gir: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Iron head: angular blade shape -->
      <path d="M6 22 L10 10 L22 10 L26 22 Z" fill="#1a7a4a" stroke="#2db36a" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M8 22 L11 13 L21 13 L24 22 Z" fill="#0d3d26"/>
      <line x1="10" y1="10" x2="14" y2="7" stroke="#2db36a" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="13" y="4" width="2.5" height="4" rx="1.2" fill="#c9a84c"/>
      <!-- Grooves -->
      <line x1="11" y1="15" x2="21" y2="15" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
      <line x1="10.5" y1="17" x2="21.5" y2="17" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
      <line x1="10" y1="19" x2="22" y2="19" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
    </svg>`,

    prox: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Putter head: blade with long flat sole -->
      <rect x="5" y="18" width="22" height="7" rx="1.5" fill="#1a7a4a" stroke="#2db36a" stroke-width="1.2"/>
      <rect x="7" y="20" width="18" height="3" fill="#0d3d26"/>
      <rect x="14.5" y="7" width="3" height="12" rx="1.5" fill="#2db36a"/>
      <rect x="13" y="5" width="6" height="3" rx="1.5" fill="#c9a84c"/>
      <!-- Face lines -->
      <line x1="8" y1="21.5" x2="24" y2="21.5" stroke="#2db36a" stroke-width="0.5" opacity="0.5"/>
      <line x1="8" y1="23" x2="24" y2="23" stroke="#2db36a" stroke-width="0.5" opacity="0.5"/>
    </svg>`,

    scr: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Wedge head: wide sole, high loft face -->
      <path d="M6 24 L12 8 L20 10 L26 24 Z" fill="#1a7a4a" stroke="#2db36a" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M8 24 L13 11 L19 12.5 L24 24 Z" fill="#0d3d26"/>
      <line x1="12" y1="8" x2="15" y2="5" stroke="#2db36a" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="14" y="3" width="2.5" height="3.5" rx="1.2" fill="#c9a84c"/>
      <!-- Grooves -->
      <line x1="10" y1="15" x2="22" y2="16.5" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
      <line x1="9.5" y1="17.5" x2="22.5" y2="18.5" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
      <line x1="9" y1="20" x2="23" y2="21" stroke="#2db36a" stroke-width="0.6" opacity="0.5"/>
    </svg>`,

    putt: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Golf tee: circle on top of a thin spike -->
      <circle cx="16" cy="9" r="5.5" fill="#1a7a4a" stroke="#2db36a" stroke-width="1.2"/>
      <circle cx="16" cy="9" r="3" fill="#0d3d26"/>
      <circle cx="16" cy="9" r="1.2" fill="#c9a84c"/>
      <path d="M14 14 L16 28 L18 14 Z" fill="#2db36a" stroke="#2db36a" stroke-width="0.5" stroke-linejoin="round"/>
    </svg>`,
  };

  // Position a custom SVG thumb icon over each slider
  function initSliderIcons() {
    document.querySelectorAll('input[type=range]').forEach(slider => {
      const key  = slider.dataset.key;
      const icon = SLIDER_ICONS[key];
      if (!icon) return;

      const wrap = document.createElement('div');
      wrap.className = 'slider-thumb-wrap';
      wrap.style.position = 'relative';

      const thumb = document.createElement('div');
      thumb.className = 'slider-thumb-icon';
      thumb.id = 'thumb-' + key;
      thumb.innerHTML = icon;
      wrap.appendChild(thumb);

      // Insert wrap after slider
      slider.parentNode.insertBefore(wrap, slider.nextSibling);

      // Position thumb
      function positionThumb() {
        const min   = parseFloat(slider.min);
        const max   = parseFloat(slider.max);
        const val   = parseFloat(slider.value);
        const pct   = (val - min) / (max - min);
        const sliderWidth = slider.offsetWidth;
        const thumbWidth  = 32;
        const offset = pct * (sliderWidth - thumbWidth) + thumbWidth / 2;
        thumb.style.left = offset + 'px';
      }

      positionThumb();
      slider.addEventListener('input', positionThumb);
      window.addEventListener('resize', positionThumb);
    });
  }

// Tour averages — used as center reference on sliders (real 2025-26 PGA Tour data)
  const TOUR_AVG = { drvDist:305.0, drvAcc:59.69, gir:69.38, prox:0.0, scr:61.07, putt:0.0 }; // keys match slider DOM ids
  // Keith Mitchell's actual 2025-26 stats (real PGA Tour data)
  const BASE = { drvDist:313.8, drvAcc:58.93, gir:73.61, sgPutt:-0.524, scr:63.16, sgOtt:0.738 };
  const SG0  = { ott:0.738, app:0.076, atg:0.000, put:-0.524 };  // real 2025-26 values

  // PLAYER_BASE tracks the current player's real baseline stats for update() calculations
  const PLAYER_BASE = {
    score:   70.967,
    sgTotal: 0.214,
    rank:    74,
    earn:    3.1e6,
    fedex:   720,
  };
  const INVERSE = { sgPutt: false, sgOtt: false };  // higher SG = better for all

  // Ranking interpolation curves: [statValue, tourRank]
  // Approximate 2024-25 PGA Tour distributions (~200 players)
  // INVERSE stats: lower value = better rank
  // Real 2025-26 PGA Tour ranking curves from live API data (172 players)
  const RANK_CURVES = {
    drvDist: [[272.9,172],[294.9,151],[299.8,125],[302.8,101],[306.0,75],[310.0,51],[313.6,26],[330.2,1]],
    drvAcc:  [[35.71,172],[51.90,151],[55.84,126],[58.10,101],[60.71,72],[63.16,51],[64.88,26],[79.76,1]],
    gir:     [[55.56,172],[64.44,151],[66.67,124],[68.25,101],[69.84,75],[71.67,51],[74.07,26],[77.78,1]],
    sgPutt:  [[-2.135,172],[-0.836,151],[-0.458,126],[-0.169,101],[0.092,76],[0.369,51],[0.656,26],[1.901,1]],
    scr:     [[38.98,172],[52.94,150],[56.52,126],[59.72,101],[62.50,75],[64.86,51],[67.74,26],[78.76,1]],
    sgOtt:   [[-3.503,172],[-1.285,151],[-0.796,126],[-0.303,101],[0.060,76],[0.421,51],[0.906,26],[2.254,1]],
  };

  function interpolateRank(key, val) {
    const curve = RANK_CURVES[key] || RANK_CURVES[BASE_KEY_TO_SLIDER?.[key]];
    if (!curve) return null;
    if (val <= curve[0][0]) return curve[0][1];
    if (val >= curve[curve.length-1][0]) return curve[curve.length-1][1];
    for (let i = 0; i < curve.length - 1; i++) {
      const [v0, r0] = curve[i], [v1, r1] = curve[i+1];
      if (val >= v0 && val <= v1) {
        const t = (val - v0) / (v1 - v0);
        return Math.round(r0 + t * (r1 - r0));
      }
    }
    return null;
  }

  function rankClass(r) {
    if (r <= 10) return 'top10';
    if (r <= 25) return 'top25';
    if (r <= 75) return 'top50';
    return 'bottom';
  }

  const BASE_RANKS = {};
  for (const k in BASE) BASE_RANKS[k] = interpolateRank(k, BASE[k]);
  // Also init slider-key aliases
  BASE_RANKS['prox'] = BASE_RANKS['sgPutt'];
  BASE_RANKS['putt'] = BASE_RANKS['sgOtt'];

  // SG weights: how each stat delta maps to SG categories
  // Based on Broadie research — 1 unit change in stat = X change in SG category
  const W = {
    drvDist: { ott: 0.006, app: 0.003  },  // per yard: +10 yds ≈ +0.06 SG:OTT
    drvAcc:  { ott: 0.008, app: 0.002  },  // per 1% fairway hit
    gir:     { app: 0.018, atg: 0.004  },  // per 1% GIR
    sgPutt:  { put: 1.0                },  // direct: sgPutt IS the putting SG delta
    scr:     { atg: 0.010              },  // per 1% scrambling
    sgOtt:   { ott: 1.0                },  // direct: sgOtt IS the off-the-tee SG delta
  };

  // Slider DOM IDs → BASE keys mapping
  const SLIDER_KEY_MAP = {
    drvDist: 'drvDist',
    drvAcc:  'drvAcc',
    gir:     'gir',
    prox:    'sgPutt',   // slider id 'prox' maps to sgPutt
    scr:     'scr',
    putt:    'sgOtt',    // slider id 'putt' maps to sgOtt
  };

  function deltas() {
    const d = {};
    document.querySelectorAll('input[type=range]').forEach(sl => {
      const sliderId = sl.id.replace('sl-', '');
      const baseKey  = SLIDER_KEY_MAP[sliderId] || sliderId;
      // Round to 4 decimal places to avoid floating point drift showing false deltas
      d[baseKey] = Math.round((parseFloat(sl.value) - BASE[baseKey]) * 10000) / 10000;
    });
    return d;
  }

  // Position the tour avg tick mark based on TOUR_AVG within slider range
  function positionTourAvgTicks() {
    document.querySelectorAll('input[type=range]').forEach(slider => {
      const key = slider.dataset.key;
      if (!key || TOUR_AVG[key] === undefined) return;  // fix: 0 is valid, only skip undefined
      const min = parseFloat(slider.min);
      const max = parseFloat(slider.max);
      const avg = TOUR_AVG[key];
      const pct = ((avg - min) / (max - min)) * 100;
      const tick = slider.parentElement.querySelector('.center-tick');
      if (tick) tick.style.left = pct + '%';
    });
  }

  function computeSG(d) {
    const s = { ...SG0 };
    for (const key in W) for (const cat in W[key]) s[cat] += d[key] * W[key][cat];
    return s;
  }

  function fmt(n, dec=2) { return (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(dec); }
  function pct(val, min, max) { return Math.max(2, Math.min(98, ((val - min) / (max - min)) * 100)); }

  function updateBar(id, val) {
    const fill = document.getElementById('bar-' + id);
    const num  = document.getElementById('num-' + id);
    fill.style.width = pct(val, -1.5, 1.5) + '%';
    fill.classList.toggle('neg', val < 0);
    num.textContent = fmt(val);
    num.className = 'sg-num' + (val > 0.01 ? ' pos' : val < -0.01 ? ' neg' : '');
  }

  function setStatRow(id, value, change, dir) {
    document.getElementById('rv-' + id).textContent = value;
    document.getElementById('rv-' + id).className = 'stat-value' + (dir > 0 ? ' pos' : dir < 0 ? ' neg' : '');
    const chEl = document.getElementById('rc-' + id);
    chEl.textContent = change || '—';
    chEl.className = 'stat-change' + (dir > 0 ? ' pos' : dir < 0 ? ' neg' : '');
  }

  function updateFillStyle(slider) {
    const min = parseFloat(slider.min), max = parseFloat(slider.max), val = parseFloat(slider.value);
    slider.style.setProperty('--fill-pct', ((val - min) / (max - min)) * 100 + '%');
  }

  // Map base keys back to slider DOM ids for element lookup
  const BASE_KEY_TO_SLIDER = { sgPutt: 'prox', sgOtt: 'putt' };

  function updateRankDisplay(key, newRank) {
    const domKey = BASE_KEY_TO_SLIDER[key] || key;  // resolve to slider DOM id
    const baseRank = BASE_RANKS[key] || BASE_RANKS[domKey];
    const rnkEl  = document.getElementById('rnk-' + domKey);
    const newEl  = document.getElementById('rarr-' + domKey);
    const iconEl = document.getElementById('rarr-icon-' + domKey);
    const numEl  = document.getElementById('rarr-num-' + domKey);
    if (!rnkEl || !newEl || newRank === null) return;

    rnkEl.textContent = '#' + baseRank;
    rnkEl.className = 'rank-value ' + rankClass(baseRank);

    const diff = baseRank - newRank; // positive = improved (lower rank number = better)
    if (Math.abs(diff) < 1) {
      newEl.className = 'rank-new';
    } else {
      const dir = diff > 0 ? 'up' : 'down';
      iconEl.textContent = diff > 0 ? '▲' : '▼';
      iconEl.className = 'rank-new-arrow ' + dir;
      numEl.textContent = '#' + newRank;
      numEl.className = 'rank-new-num ' + dir;
      newEl.className = 'rank-new show';
    }
  }

  function update() {
    const d = deltas();
    const sg = computeSG(d);
    const sgTotal = sg.ott + sg.app + sg.atg + sg.put;
    const sg0Total = SG0.ott + SG0.app + SG0.atg + SG0.put;  // = 0.214 real total
    const sgDelta = sgTotal - sg0Total;
    const scoreDelta = -sgDelta;
    const newScore = PLAYER_BASE.score + scoreDelta;
    const rankDelta = Math.round(-sgDelta * 40);
    const newRank = Math.max(1, PLAYER_BASE.rank + rankDelta);
    const earningsDelta = sgDelta * 1.2e6;
    const newEarnings = Math.max(0, PLAYER_BASE.earn + earningsDelta);
    const fedexDelta = Math.round(sgDelta * 500);
    const newFedex = Math.max(0, PLAYER_BASE.fedex + fedexDelta);

    const impEl = document.getElementById('impact-num');
    const scoreStr = Math.abs(scoreDelta) < 0.005 ? '±0.00'
      : (scoreDelta > 0 ? '+' : '−') + Math.abs(scoreDelta).toFixed(2);
    impEl.textContent = scoreStr;
    impEl.className = 'impact-number' + (scoreDelta < -0.005 ? ' pos' : scoreDelta > 0.005 ? ' neg' : '');

    updateBar('ott', sg.ott); updateBar('app', sg.app);
    updateBar('atg', sg.atg); updateBar('put', sg.put);

    const dir = sgDelta;
    setStatRow('sg',    fmt(sgTotal),  Math.abs(sgDelta)>0.005 ? fmt(sgDelta)+' SG' : null, dir);
    setStatRow('score', newScore.toFixed(2), Math.abs(scoreDelta)>0.005 ? (scoreDelta>0?'+':'')+scoreDelta.toFixed(2)+' strokes' : null, -scoreDelta);
    // Clamp rank: can't go above #1, and don't show improvement if already #1
    const clampedRank  = Math.max(1, newRank);
    const canImprove   = PLAYER_BASE.rank > 1;
    const rankDeltaAdj = clampedRank - PLAYER_BASE.rank;
    const rankLabel    = rankDeltaAdj === 0 || (!canImprove && rankDeltaAdj <= 0)
      ? null
      : rankDeltaAdj < 0
        ? '▲ ' + Math.abs(rankDeltaAdj) + ' spots'
        : '▼ ' + rankDeltaAdj + ' spots';
    setStatRow('rank', '#' + clampedRank, rankLabel, -rankDeltaAdj);
    setStatRow('earn',  '$'+(newEarnings/1e6).toFixed(1)+'M', Math.abs(earningsDelta)>5000 ? fmt(earningsDelta/1e6,1)+'M' : null, earningsDelta);
    setStatRow('fedex', newFedex, fedexDelta!==0 ? fmt(fedexDelta,0)+' pts' : null, fedexDelta);
  }

  document.querySelectorAll('input[type=range]').forEach(slider => {
    const key = slider.dataset.key;
    const baseKey = SLIDER_KEY_MAP[key] || key;
    const playerStat = BASE[baseKey];  // player's actual stat
    const STAT_DEC = { drvDist: 1, drvAcc: 2, gir: 2, scr: 2, sgPutt: 3, sgOtt: 3 };
    const dec = STAT_DEC[baseKey] ?? (Math.abs(playerStat) < 10 ? 3 : playerStat < 100 ? 2 : 1);
    const valEl = document.getElementById('val-' + key);
    const dltEl = document.getElementById('dlt-' + key);
    const card  = document.getElementById('card-' + key);
    const isInv = INVERSE[key];

    updateFillStyle(slider);
    updateRankDisplay(baseKey, interpolateRank(baseKey, playerStat));
    // Set initial display value with correct decimal precision
    if (valEl) valEl.textContent = playerStat.toFixed(dec);

    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value);
      const currentBase = BASE[baseKey];  // always read live from BASE, not closure
      const dec2 = STAT_DEC[baseKey] ?? (Math.abs(currentBase) < 10 ? 3 : currentBase < 100 ? 2 : 1);
      const delta = Math.round((v - currentBase) * 10000) / 10000;
      const improved = isInv ? delta < 0 : delta > 0;

      valEl.textContent = v.toFixed(dec2);
      valEl.className = 'slider-val' + (Math.abs(delta) > 0.05 ? (improved ? ' pos' : ' neg') : '');

      if (Math.abs(delta) > 0.05) {
        dltEl.textContent = (delta > 0 ? '+' : '') + delta.toFixed(dec2);
        dltEl.className = 'slider-delta-tag show ' + (improved ? 'pos' : 'neg');
        card.className = 'slider-card active' + (improved ? '' : ' active-neg');
      } else {
        dltEl.className = 'slider-delta-tag';
        valEl.className = 'slider-val';
        card.className = 'slider-card';
      }

      updateFillStyle(slider);
      updateRankDisplay(baseKey, interpolateRank(baseKey, v));
      update();
    });
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    document.querySelectorAll('input[type=range]').forEach(s => {
      const key = s.dataset.key;
      const bk = SLIDER_KEY_MAP[key] || key;
      s.value = BASE[bk];  // reset to player's own stat
      s.dispatchEvent(new Event('input'));
    });
  });

  document.getElementById('share-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).catch(()=>{});
    const b = document.getElementById('share-btn');
    b.textContent = 'COPIED!';
    setTimeout(() => b.textContent = 'COPY LINK', 2000);
  });

  // Fire input event on all sliders so display values, colors, and ranks initialize correctly
  document.querySelectorAll('input[type=range]').forEach(s => s.dispatchEvent(new Event('input')));
  positionTourAvgTicks();
  initSliderIcons();
  update();
  // ── Season data for Keith Mitchell (mock historical stats) ──
  const SEASON_DATA = {
    2025: { drvDist:313.8, drvAcc:58.93, gir:73.61, sgPutt:-0.524, scr:63.16, sgOtt:0.738, sg:0.214, score:70.967, rank:74, earn:3.1, fedex:720 },
    2024: { drvDist:297, drvAcc:61.2, gir:65.8, prox:33.4, scr:56.8, putt:29.3, sg:0.61, score:70.94, rank:104, earn:2.7, fedex:690  },
    2023: { drvDist:302, drvAcc:57.9, gir:68.1, prox:31.8, scr:59.3, putt:28.9, sg:1.12, score:70.55, rank:62,  earn:4.1, fedex:1020 },
    2022: { drvDist:298, drvAcc:59.6, gir:64.4, prox:34.2, scr:54.9, putt:29.6, sg:0.38, score:71.10, rank:128, earn:2.1, fedex:540  },
    2021: { drvDist:295, drvAcc:60.1, gir:63.7, prox:35.1, scr:53.2, putt:29.8, sg:0.22, score:71.28, rank:145, earn:1.6, fedex:410  },
  };

  const SEASON_LABEL = {
    2025: '2024–25', 2024: '2023–24', 2023: '2022–23', 2022: '2021–22', 2021: '2020–21'
  };

  function loadSeason(year) {
    const s = SEASON_DATA[year];
    if (!s) return;

    // Update BASE to new season
    for (const k in BASE) if (s[k] !== undefined) BASE[k] = s[k];

    // Update SG0
    // Recompute approximate per-category split from total (simplified mock)
    SG0.ott = parseFloat((s.sg * 0.35).toFixed(2));
    SG0.app = parseFloat((s.sg * 0.45).toFixed(2));
    SG0.atg = parseFloat((s.sg * -0.08).toFixed(2));
    SG0.put = parseFloat((s.sg * 0.28).toFixed(2));

    // Update BASE_RANKS
    for (const k in BASE) BASE_RANKS[k] = interpolateRank(k, BASE[k]);

    // Update player card baseline stats
    document.querySelector('[data-stat="score"]').textContent  = s.score.toFixed(2);
    document.querySelector('[data-stat="sg"]').textContent     = (s.sg >= 0 ? '+' : '') + s.sg.toFixed(2);
    document.querySelector('[data-stat="earn"]').textContent   = '$' + s.earn.toFixed(1) + 'M';
    document.querySelector('[data-stat="rank"]').textContent   = '#' + s.rank;
    document.querySelector('[data-stat="fedex"]').textContent  = s.fedex;

    // Update player photo rank badge
    document.querySelector('.player-rank').textContent = 'WR #' + s.rank;

    // Reset all sliders to new season stats
    document.querySelectorAll('input[type=range]').forEach(sl => {
      const key = sl.dataset.key;
      if (BASE[key] !== undefined) {
        sl.value = BASE[key];
        sl.dispatchEvent(new Event('input'));
      }
    });

    // Update result panel baseline values
    document.getElementById('rv-score').textContent = s.score.toFixed(2);
    document.getElementById('rv-sg').textContent    = (s.sg >= 0 ? '+' : '') + s.sg.toFixed(2);
    document.getElementById('rv-rank').textContent  = '#' + s.rank;
    document.getElementById('rv-earn').textContent  = '$' + s.earn.toFixed(1) + 'M';
    document.getElementById('rv-fedex').textContent = s.fedex;

    positionTourAvgTicks();
    update();
  }

  const STAT_LABELS = {
    drvDist: 'Driving Dist', drvAcc: 'Accuracy',
    gir: 'GIR', prox: 'SG: Putting', scr: 'Scrambling', putt: 'SG: Off Tee'
  };
  const STAT_UNITS = {
    drvDist: 'yds', drvAcc: '%', gir: '%', prox: '', scr: '%', putt: ''
  };

  let pendingSeasonYear = null;
  let pendingDeltas = {};

  function getCurrentSliderDeltas() {
    const d = {};
    document.querySelectorAll('input[type=range]').forEach(sl => {
      const key = sl.dataset.key;
      const delta = parseFloat(sl.value) - BASE[key];
      if (Math.abs(delta) > 0.05) d[key] = delta;
    });
    return d;
  }

  function hasActiveAdjustments() {
    return Object.keys(getCurrentSliderDeltas()).length > 0;
  }

  function showModal(year) {
    pendingSeasonYear = year;
    pendingDeltas = getCurrentSliderDeltas();

    const label = SEASON_LABEL[year] || year;
    document.getElementById('modal-title').textContent = 'Switch to ' + label + '?';

    // Build delta preview rows
    const preview = document.getElementById('modal-deltas-preview');
    const rows = document.getElementById('modal-delta-rows');
    rows.innerHTML = '';

    const keys = Object.keys(pendingDeltas);
    if (keys.length > 0) {
      keys.forEach(key => {
        const d = pendingDeltas[key];
        const isInv = INVERSE[key];
        const improved = isInv ? d < 0 : d > 0;
        const dec = BASE[key] < 100 ? 1 : 0;
        const unit = STAT_UNITS[key] || '';
        const row = document.createElement('div');
        row.className = 'modal-delta-row';
        row.innerHTML = `<span>${STAT_LABELS[key]}</span><span class="modal-delta-val ${improved ? 'pos' : 'neg'}">${d > 0 ? '+' : ''}${d.toFixed(dec)}${unit}</span>`;
        rows.appendChild(row);
      });
      preview.className = 'modal-deltas-preview has-changes';
    } else {
      preview.className = 'modal-deltas-preview';
    }

    document.getElementById('season-modal').classList.add('show');
  }

  function closeModal() {
    document.getElementById('season-modal').classList.remove('show');
    // Revert select back to current season if cancelled
    document.getElementById('season-select').value = '2026';
  }

  // Keep changes: load new season stats but re-apply the same deltas on top
  document.getElementById('modal-keep').addEventListener('click', () => {
    document.getElementById('season-modal').classList.remove('show');
    const saved = { ...pendingDeltas };
    loadSeason(pendingSeasonYear);
    // Re-apply saved deltas on top of new season baseline
    document.querySelectorAll('input[type=range]').forEach(sl => {
      const key = sl.dataset.key;
      if (saved[key] !== undefined) {
        sl.value = parseFloat(sl.value) + saved[key];
        sl.dispatchEvent(new Event('input'));
      }
    });
  });

  // Reset: load new season cleanly
  document.getElementById('modal-reset').addEventListener('click', () => {
    document.getElementById('season-modal').classList.remove('show');
    loadSeason(pendingSeasonYear);
  });

  // Cancel: revert dropdown and do nothing
  document.getElementById('modal-cancel').addEventListener('click', () => {
    // Find which year was previously active by matching current BASE stats
    const prevYear = Object.keys(SEASON_DATA).find(y => {
      const s = SEASON_DATA[y];
      return Math.abs(s.drvDist - BASE.drvDist) < 1;
    });
    if (prevYear) document.getElementById('season-select').value = prevYear;
    document.getElementById('season-modal').classList.remove('show');
  });

  // Click outside modal to cancel
  document.getElementById('season-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      document.getElementById('modal-cancel').click();
    }
  });

  document.getElementById('season-select').addEventListener('change', function() {
    const year = parseInt(this.value);
    if (hasActiveAdjustments()) {
      showModal(year);
    } else {
      loadSeason(year);
    }
  });


  // ── Player Search ─────────────────────────────────────────────
  const PGA_API = '/api/pga';
  const PGA_APIKEY = '';
  const PGA_HEADERS = { 'Content-Type': 'application/json' };

  async function pgaGql(operationName, query, variables = {}) {
    const res = await fetch('/api/pga', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ operationName, query, variables }) });
    return res.json();
  }

  // Static player list — top active PGA Tour players
  // Embedded to avoid CORS issues when running locally
  // In production Next.js app this would be fetched server-side
  const STATIC_PLAYERS = [
    {id:"46046",displayName:"Scottie Scheffler",country:"United States"},
    {id:"29478",displayName:"Rory McIlroy",country:"Northern Ireland"},
    {id:"39977",displayName:"Xander Schauffele",country:"United States"},
    {id:"33948",displayName:"Collin Morikawa",country:"United States"},
    {id:"47959",displayName:"Ludvig Åberg",country:"Sweden"},
    {id:"49771",displayName:"Bryson DeChambeau",country:"United States"},
    {id:"34466",displayName:"Jon Rahm",country:"Spain"},
    {id:"32791",displayName:"Viktor Hovland",country:"Norway"},
    {id:"40098",displayName:"Patrick Cantlay",country:"United States"},
    {id:"29221",displayName:"Justin Thomas",country:"United States"},
    {id:"34363",displayName:"Jordan Spieth",country:"United States"},
    {id:"27349",displayName:"Dustin Johnson",country:"United States"},
    {id:"30925",displayName:"Brooks Koepka",country:"United States"},
    {id:"27644",displayName:"Tiger Woods",country:"United States"},
    {id:"33560",displayName:"Tony Finau",country:"United States"},
    {id:"39546",displayName:"Keith Mitchell",country:"United States"},
    {id:"35891",displayName:"Max Homa",country:"United States"},
    {id:"36689",displayName:"Sam Burns",country:"United States"},
    {id:"34360",displayName:"Hideki Matsuyama",country:"Japan"},
    {id:"40026",displayName:"Daniel Berger",country:"United States"},
    {id:"45522",displayName:"Christiaan Bezuidenhout",country:"South Africa"},
    {id:"33399",displayName:"Tommy Fleetwood",country:"England"},
    {id:"33204",displayName:"Shane Lowry",country:"Ireland"},
    {id:"25493",displayName:"Matt Fitzpatrick",country:"England"},
    {id:"24502",displayName:"Francesco Molinari",country:"Italy"},
    {id:"29564",displayName:"Jason Day",country:"Australia"},
    {id:"24361",displayName:"Adam Scott",country:"Australia"},
    {id:"27095",displayName:"Phil Mickelson",country:"United States"},
    {id:"20229",displayName:"Ernie Els",country:"South Africa"},
    {id:"47548",displayName:"Tom Kim",country:"South Korea"},
    {id:"51766",displayName:"Akshay Bhatia",country:"United States"},
    {id:"52955",displayName:"Ludvig Åberg",country:"Sweden"},
    {id:"48081",displayName:"Wyndham Clark",country:"United States"},
    {id:"35564",displayName:"Keegan Bradley",country:"United States"},
    {id:"37326",displayName:"Rickie Fowler",country:"United States"},
    {id:"33503",displayName:"Webb Simpson",country:"United States"},
    {id:"27987",displayName:"Bubba Watson",country:"United States"},
    {id:"32150",displayName:"Byeong Hun An",country:"South Korea"},
    {id:"30978",displayName:"Harris English",country:"United States"},
    {id:"35007",displayName:"Billy Horschel",country:"United States"},
    {id:"34431",displayName:"Russell Henley",country:"United States"},
    {id:"40115",displayName:"Seamus Power",country:"Ireland"},
    {id:"29467",displayName:"Kevin Kisner",country:"United States"},
    {id:"36871",displayName:"Denny McCarthy",country:"United States"},
    {id:"34394",displayName:"Joel Dahmen",country:"United States"},
    {id:"33836",displayName:"Kevin Streelman",country:"United States"},
    {id:"27213",displayName:"Charley Hoffman",country:"United States"},
    {id:"22371",displayName:"Aaron Baddeley",country:"Australia"},
    {id:"40058",displayName:"Zac Blair",country:"United States"},
    {id:"29956",displayName:"Scott Stallings",country:"United States"},
    {id:"36699",displayName:"Andrew Putnam",country:"United States"},
    {id:"32839",displayName:"Peter Malnati",country:"United States"},
    {id:"47282",displayName:"Sahith Theegala",country:"United States"},
    {id:"39971",displayName:"Taylor Moore",country:"United States"},
    {id:"49960",displayName:"Austin Eckroat",country:"United States"},
    {id:"46717",displayName:"Taylor Pendrith",country:"Canada"},
    {id:"48081",displayName:"Wyndham Clark",country:"United States"},
    {id:"40115",displayName:"Seamus Power",country:"Ireland"},
    {id:"47347",displayName:"Min Woo Lee",country:"Australia"},
    {id:"45526",displayName:"Cameron Young",country:"United States"},
    {id:"50525",displayName:"Davis Thompson",country:"United States"},
    {id:"52372",displayName:"Jake Knapp",country:"United States"},
    {id:"46407",displayName:"Adam Hadwin",country:"Canada"},
    {id:"33419",displayName:"Ian Poulter",country:"England"},
    {id:"29478",displayName:"Rory McIlroy",country:"Northern Ireland"},
    {id:"34166",displayName:"Tyrrell Hatton",country:"England"},
    {id:"35564",displayName:"Keegan Bradley",country:"United States"},
    {id:"27349",displayName:"Dustin Johnson",country:"United States"},
    {id:"34017",displayName:"Gary Woodland",country:"United States"},
    {id:"30911",displayName:"Zach Johnson",country:"United States"},
    {id:"24925",displayName:"Jim Furyk",country:"United States"},
    {id:"34046",displayName:"Danny Willett",country:"England"},
    {id:"32791",displayName:"Viktor Hovland",country:"Norway"},
    {id:"37455",displayName:"Sungjae Im",country:"South Korea"},
    {id:"48240",displayName:"Ben Griffin",country:"United States"},
    {id:"52372",displayName:"Jake Knapp",country:"United States"},
    {id:"50359",displayName:"Neal Shipley",country:"United States"},
    {id:"33141",displayName:"Keegan Bradley",country:"United States"},
    {id:"35532",displayName:"Kurt Kitayama",country:"United States"},
    {id:"40515",displayName:"Nicolai Højgaard",country:"Denmark"},
    {id:"34255",displayName:"Mackenzie Hughes",country:"Canada"},
    {id:"46454",displayName:"S.H. Kim",country:"South Korea"},
    {id:"39972",displayName:"Maverick McNealy",country:"United States"},
    {id:"34360",displayName:"Hideki Matsuyama",country:"Japan"},
    {id:"36689",displayName:"Sam Burns",country:"United States"},
    {id:"50456",displayName:"Matthieu Pavon",country:"France"},
    {id:"47959",displayName:"Bryson DeChambeau",country:"United States"},
    {id:"33399",displayName:"Tommy Fleetwood",country:"England"},
    {id:"39977",displayName:"Xander Schauffele",country:"United States"},
    {id:"29221",displayName:"Justin Thomas",country:"United States"},
    {id:"34363",displayName:"Jordan Spieth",country:"United States"},
    {id:"46046",displayName:"Scottie Scheffler",country:"United States"},
  ];

  // Deduplicate by id
  const seen = new Set();
  const PLAYERS = STATIC_PLAYERS.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  let playerListCache = null;

  async function fetchPlayerList() {
    if (playerListCache) return playerListCache;
    // Try live API first, fall back to static list
    try {
      const data = await pgaGql(
        'PlayerDirectory',
        `query PlayerDirectory($tourCode: TourCode!) {
          playerDirectory(tourCode: $tourCode) {
            players { id displayName country isActive }
          }
        }`,
        { tourCode: 'R' }
      );
      const live = data?.data?.playerDirectory?.players ?? [];
      if (live.length > 0) {
        playerListCache = live;
        allPlayers = live;
        return live;
      }
    } catch(e) {}
    // Fall back to static list
    playerListCache = PLAYERS;
    return PLAYERS;
  }

  // Initialize with static list immediately so search works right away
  let allPlayers = PLAYERS;

  // Fetch available seasons for a player by checking yearPills on a known stat
  async function fetchPlayerSeasons(playerId) {
    const data = await pgaGql(
      'StatDetails',
      `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
        statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
          yearPills { year displaySeason }
          rows {
            ... on StatDetailsPlayer { playerId playerName rank stats { statName statValue } }
          }
        }
      }`,
      { tourCode: 'R', statId: '101', year: null, eventQuery: null }
    );
    // Find years where this player appears in the rows
    // We'll fetch a few key years to check
    const allYears = [2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015];
    const available = [];

    // Use yearPills as the base list of all possible seasons
    const yearPills = data?.data?.statDetails?.yearPills ?? [];

    // Check each year for player presence (batch check top years)
    const checkYears = yearPills.slice(0, 12); // check up to 12 seasons
    for (const pill of checkYears) {
      const d = await pgaGql(
        'StatDetails',
        `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
          statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
            rows { ... on StatDetailsPlayer { playerId } }
          }
        }`,
        { tourCode: 'R', statId: '101', year: pill.year, eventQuery: null }
      );
      const rows = d?.data?.statDetails?.rows ?? [];
      if (rows.some(r => r.playerId === playerId)) {
        available.push(pill);
      }
    }
    return available;
  }

  // Fetch real stats for a player for a given year
  async function fetchPlayerStats(playerId, year) {
    const STAT_IDS = [
      { id: '101',   key: 'drvDist', sgKey: null },
      { id: '102',   key: 'drvAcc',  sgKey: null },
      { id: '103',   key: 'gir',     sgKey: null },
      { id: '130',   key: 'scr',     sgKey: null },
      { id: '02564', key: null,      sgKey: 'sgPutt', sliderKey: 'prox' },
      { id: '02674', key: null,      sgKey: 'sgOtt',  sliderKey: 'putt' },
      { id: '02675', key: 'sgTotal', sgKey: null },
      { id: '120',   key: 'score',   sgKey: null },
    ];

    const results = { playerId, year };

    for (const stat of STAT_IDS) {
      const data = await pgaGql(
        'StatDetails',
        `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
          statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
            tourAvg
            rows { ... on StatDetailsPlayer { playerId rank stats { statName statValue } } }
          }
        }`,
        { tourCode: 'R', statId: stat.id, year, eventQuery: null }
      );
      const rows  = data?.data?.statDetails?.rows ?? [];
      const player = rows.find(r => r.playerId === playerId);
      if (player) {
        const val = parseFloat(player.stats?.[0]?.statValue);
        const outKey = stat.sgKey || stat.key;
        results[outKey] = val;
        results[outKey + '_rank'] = parseInt(player.rank);
        if (stat.sliderKey) results[stat.sliderKey + '_val'] = val;
      }
    }

    return results;
  }

  // Pending player load
  let pendingPlayer = null;

  // Load a player into the simulator
  async function loadPlayer(player, year) {
    const yearInt = parseInt(year);

    // Show loading state
    document.querySelector('.player-name').innerHTML = '<span style="color:var(--text3);font-size:24px">LOADING...</span>';

    const stats = await fetchPlayerStats(player.id, yearInt);

    // Update BASE with real fetched stats
    if (stats.drvDist  !== undefined) BASE.drvDist = stats.drvDist;
    if (stats.drvAcc   !== undefined) BASE.drvAcc  = stats.drvAcc;
    if (stats.gir      !== undefined) BASE.gir      = stats.gir;
    if (stats.scr      !== undefined) BASE.scr      = stats.scr;
    if (stats.sgPutt   !== undefined) BASE.sgPutt   = stats.sgPutt;
    if (stats.sgOtt    !== undefined) BASE.sgOtt    = stats.sgOtt;

    // Update SG0
    SG0.ott = stats.sgOtt  ?? 0;
    SG0.app = 0;
    SG0.atg = 0;
    SG0.put = stats.sgPutt ?? 0;

    // Update BASE_RANKS
    for (const k in BASE) BASE_RANKS[k] = interpolateRank(k, BASE[k]);
    BASE_RANKS['prox'] = BASE_RANKS['sgPutt'];
    BASE_RANKS['putt'] = BASE_RANKS['sgOtt'];

    // Update player card
    const names = player.displayName.split(' ');
    const firstName = names.slice(0, -1).join(' ');
    const lastName  = names[names.length - 1];
    document.querySelector('.player-name').innerHTML = firstName + '<br>' + lastName;

    // Update photo
    const photoUrl = `/api/headshot/${player.id}`;
    const photoEl  = document.querySelector('.player-photo');
    const imgEl    = photoEl.querySelector('img');
    const initials = names.map(n => n[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join('');
    const initSpan = photoEl.querySelector('.player-initials');

    if (imgEl) {
      imgEl.src = photoUrl;
      imgEl.alt = player.displayName;
    }
    if (initSpan) {
      initSpan.textContent = initials;
    }

    // Update PLAYER_BASE so update() uses this player's numbers
    const sgForEarn  = stats.sgTotal ?? 0;
    const estEarn    = Math.max(0.1e6, (1.5 + sgForEarn * 0.7) * 1e6);
    const estFedex   = Math.max(50, Math.round(200 + sgForEarn * 350));
    PLAYER_BASE.score   = stats.score   ?? 70.0;
    PLAYER_BASE.sgTotal = stats.sgTotal ?? 0;
    PLAYER_BASE.earn    = estEarn;
    PLAYER_BASE.fedex   = estFedex;
    // Use real OWGR rank — set after OWGR cache loads below

    // Update baseline stats in player card
    const setStat = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
    if (stats.score    !== undefined) setStat('[data-stat="score"]', stats.score.toFixed(3));
    if (stats.sgTotal  !== undefined) setStat('[data-stat="sg"]', (stats.sgTotal >= 0 ? '+' : '') + stats.sgTotal.toFixed(3));
    setStat('[data-stat="earn"]',  '$' + (estEarn / 1e6).toFixed(1) + 'M');
    setStat('[data-stat="fedex"]', estFedex);

    // Update world rank display — use live rank for 2026, EOY for 2025, PGA stat for older
    await getOWGRCache();
    const owgrData = lookupOWGR(player.displayName);
    let wrNum = null;

    if (yearInt >= 2026) {
      // Current live OWGR ranking
      wrNum = owgrData?.rank ?? null;
    } else if (yearInt === 2025) {
      // End of last year ranking
      wrNum = owgrData?.endLastYearRank ?? null;
    } else {
      // Historical: pull from PGA Tour world ranking stat by year
      try {
        const wrData = await pgaGql('StatDetails',
          `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
            statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
              rows { ... on StatDetailsPlayer { playerId rank } }
            }
          }`,
          { tourCode: 'R', statId: '186', year: yearInt, eventQuery: null }
        );
        const wrRow = (wrData?.data?.statDetails?.rows ?? []).find(r => r.playerId === player.id);
        wrNum = wrRow ? parseInt(wrRow.rank) : null;
      } catch(e) { wrNum = null; }
    }

    const wrBadge = document.querySelector('.player-rank');
    const wrLeft  = document.querySelector('[data-stat="rank"]');
    const wrLabel = document.querySelector('.bs-label[data-label="wr"]');
    if (wrBadge) wrBadge.textContent = wrNum ? 'WR #' + wrNum : 'WR —';
    if (wrLeft)  wrLeft.textContent  = wrNum ? '#' + wrNum    : '—';
    const wrLabelText = yearInt >= 2026 ? 'Current World Rank' : 'Season-End World Rank';
    const wrLeftLabel = document.querySelector('.bs-label[data-label="wr"]');
    if (wrLeftLabel) wrLeftLabel.textContent = wrLabelText;
    // Use real rank as baseline for projection
    PLAYER_BASE.rank = wrNum ?? Math.max(1, Math.round(125 - (stats.sgTotal ?? 0) * 40));

    // Update baseline label to show correct season
    const seasonLabel = document.querySelector('.baseline-label');
    if (seasonLabel) seasonLabel.textContent = yearInt + ' Baseline';

    // Reset sliders to new player stats — set ALL values first, then update once
    document.querySelectorAll('input[type=range]').forEach(sl => {
      const key = sl.dataset.key;
      const bk  = SLIDER_KEY_MAP[key] || key;
      if (BASE[bk] !== undefined) {
        sl.value = BASE[bk];  // set position only, no event
      }
    });

    // Now update all display labels without triggering delta recalculation
    document.querySelectorAll('input[type=range]').forEach(sl => {
      sl.dispatchEvent(new Event('input'));
    });

    positionTourAvgTicks();
    update();  // single update call after all sliders are in place
  }

  // Search logic
  let searchTimeout = null;
  let focusedIndex  = -1;

  const searchInput    = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchClear    = document.getElementById('search-clear');

  // Pre-load player list on page ready
  fetchPlayerList().then(players => { allPlayers = players; });

  function getInitials(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
  }

  function highlightMatch(name, query) {
    if (!query) return name;
    const idx = name.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return name;
    return name.slice(0, idx) +
      '<strong style="color:var(--text)">' + name.slice(idx, idx + query.length) + '</strong>' +
      name.slice(idx + query.length);
  }

  // ── OWGR Data cache ───────────────────────────────────────────
  const OWGR_BASE = '';
  const OWGR_HEADERS = {};

  let owgrCache     = null;  // keyed by owgrId
  let owgrNameCache = null;  // keyed by lowercase full name

  let owgrCachePromise = null;
  async function getOWGRCache() {
    if (owgrCachePromise) return owgrCachePromise;
    owgrCachePromise = (async () => {
      const cache = {};
      const nameCache = {};
      const pages = 5;
      await Promise.all(
        Array.from({ length: pages }, (_, i) => i + 1).map(async page => {
          try {
            const res  = await fetch(
              `/api/owgr?regionId=0&pageSize=2000&pageNumber=${page}&countryId=0&sortString=Rank+ASC`,
              { headers: OWGR_HEADERS }
            );
            const data = await res.json();
            (data.rankingsList ?? []).forEach(entry => {
              const key = entry.player?.fullName?.toLowerCase().trim();
              const obj = {
                owgrId:          entry.id,
                rank:            entry.rank,
                lastWeekRank:    entry.lastWeekRank,
                endLastYearRank: entry.endLastYearRank,
                fullName:        entry.player?.fullName,
                country:         entry.player?.country?.name,
              };
              cache[entry.id] = obj;
              if (key) nameCache[key] = obj;
            });
          } catch(e) { /* silently ignore */ }
        })
      );
      owgrCache     = cache;
      owgrNameCache = nameCache;
      return owgrCache;
    })();
    return owgrCachePromise;
  }

  function lookupOWGR(displayName) {
    if (!owgrNameCache) return null;
    return owgrNameCache[displayName?.toLowerCase().trim()] ?? null;
  }

  // PGA Tour season pills cache
  let pillsCache = null;
  async function getPillsCache() {
    if (pillsCache) return pillsCache;
    const data = await pgaGql('StatDetails',
      `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
        statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
          yearPills { year displaySeason }
        }
      }`,
      { tourCode: 'R', statId: '120', year: null, eventQuery: null }
    );
    pillsCache = data?.data?.statDetails?.yearPills ?? [];
    return pillsCache;
  }

  // Pre-fetch on page load
  getOWGRCache();
  getPillsCache();

  
  // Compute "hot" players: biggest risers in world rank (top 100 only)
  // Uses endLastYearRank vs current rank from OWGR cache
  async function getHotPlayers(limit = 3) {
    await getOWGRCache();
    if (!owgrCache) return [];

    const risers = Object.values(owgrCache)
      .filter(p =>
        p.rank <= 100 &&                    // currently top 100
        p.endLastYearRank > 0 &&            // has prior year data
        p.endLastYearRank > p.rank          // has improved (lower rank = better)
      )
      .map(p => ({
        ...p,
        rise: p.endLastYearRank - p.rank    // how many spots gained
      }))
      .sort((a, b) => b.rise - a.rise)
      .slice(0, limit);

    // Match to allPlayers list to get PGA Tour id
    return risers.map(owgr => {
      const match = allPlayers.find(p =>
        p.displayName.toLowerCase().trim() === owgr.fullName?.toLowerCase().trim()
      );
      return match ? { ...match, owgrData: owgr } : null;
    }).filter(Boolean);
  }

  // Show hot players in dropdown when search is focused with no query
  async function showHotPlayers() {
    searchDropdown.innerHTML = '<div class="search-section-label">🔥 TRENDING</div>';
    searchDropdown.classList.add('show');

    const hot = await getHotPlayers(3);
    if (hot.length === 0) {
      searchDropdown.innerHTML += '<div class="search-no-results">Loading...</div>';
      return;
    }

    hot.forEach((p, i) => {
      const photoUrl = `/api/headshot/${p.id}`;
      const initials = getInitials(p.displayName);
      const rise     = p.owgrData.rise;
      const rank     = p.owgrData.rank;
      const div = document.createElement('div');
      div.className = 'search-result';
      div.dataset.idx  = i;
      div.dataset.id   = p.id;
      div.dataset.name = p.displayName;
      div.innerHTML = `
        <div class="search-result-photo">
          <img src="${photoUrl}" alt="${p.displayName}" style="width:100%;height:100%;object-fit:cover;object-position:top;"
            onerror="this.style.display='none';var fb=this.parentElement.querySelector('.photo-fallback');if(fb)fb.style.display='flex';">
          <span class="photo-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--green-light);background:var(--surface2);">${initials}</span>
        </div>
        <div class="search-result-info">
          <div class="search-result-name">${p.displayName}</div>
          <div class="search-result-meta">
            <span class="search-result-rank">WR #${rank}</span>
            <span class="search-result-seasons" style="color:var(--green-light);">· ▲ ${rise} spots</span>
          </div>
        </div>`;
      // click handled by searchDropdown delegation
      searchDropdown.appendChild(div);
    });
  }

function showDropdown(players, query) {
    focusedIndex = -1;
    if (players.length === 0) {
      searchDropdown.innerHTML = '<div class="search-no-results">No players found</div>';
    } else {
      searchDropdown.innerHTML = players.slice(0, 12).map((p, i) => {
        const photoUrl = `/api/headshot/${p.id}`;
        const initials = getInitials(p.displayName);
        return `<div class="search-result" data-idx="${i}" data-id="${p.id}" data-name="${p.displayName}">
          <div class="search-result-photo">
            <img src="${photoUrl}" alt="${p.displayName}" style="width:100%;height:100%;object-fit:cover;object-position:top;" onerror="this.style.display='none';var fb=this.parentElement.querySelector('.photo-fallback');if(fb)fb.style.display='flex';">
            <span class="photo-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;position:absolute;inset:0;">${initials}</span>
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightMatch(p.displayName, query)}</div>
            <div class="search-result-meta">
              <span class="search-result-rank" id="sr-wr-${p.id}">WR —</span>
              <span class="search-result-seasons" id="sr-yrs-${p.id}">· Active years loading...</span>
            </div>
          </div>
        </div>`;
      }).join('');

      // Populate OWGR data and active years async per result
      players.slice(0, 12).forEach(async (p) => {
        const wrEl  = document.getElementById(`sr-wr-${p.id}`);
        const yrsEl = document.getElementById(`sr-yrs-${p.id}`);

        // ── OWGR rankings ──────────────────────────────────────
        await getOWGRCache();
        const owgr = lookupOWGR(p.displayName);

        if (wrEl) {
          if (owgr) {
            const curStr      = `WR #${owgr.rank}`;
            const lastYearStr = owgr.endLastYearRank ? `EOY #${owgr.endLastYearRank}` : '';
            const trendDir    = owgr.rank < owgr.endLastYearRank ? '▲' : owgr.rank > owgr.endLastYearRank ? '▼' : '';
            const trendColor  = owgr.rank < owgr.endLastYearRank ? 'var(--green-light)' : owgr.rank > owgr.endLastYearRank ? 'var(--red)' : 'var(--text3)';
            wrEl.innerHTML =
              `<span style="color:var(--gold);font-family:'DM Mono',monospace">${curStr}</span>` +
              (lastYearStr ? `<span style="color:${trendColor};font-size:9px;margin-left:5px;">${trendDir} ${lastYearStr}</span>` : '');
          } else {
            wrEl.textContent = 'WR —';
          }
        }

        // ── Active PGA Tour seasons ────────────────────────────
        if (!yrsEl) return;
        const pills = await getPillsCache();
        const recentPills = pills.filter(p2 => p2.year >= 2005);
        const activeSeasons = [];

        await Promise.all(recentPills.map(async pill => {
          const data = await pgaGql('StatDetails',
            `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
              statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
                rows { ... on StatDetailsPlayer { playerId } }
              }
            }`,
            { tourCode: 'R', statId: '120', year: pill.year, eventQuery: null }
          );
          const rows = data?.data?.statDetails?.rows ?? [];
          if (rows.some(r => r.playerId === p.id)) activeSeasons.push(pill);
        }));

        if (activeSeasons.length === 0) {
          yrsEl.textContent = '· No PGA Tour data';
        } else {
          activeSeasons.sort((a, b) => b.year - a.year);
          const newestYr = activeSeasons[0].year;
          const oldestYr = activeSeasons[activeSeasons.length - 1].year;
          yrsEl.textContent = oldestYr === newestYr ? `· ${newestYr}` : `· ${oldestYr}–${newestYr}`;
        }
      });
    }
    searchDropdown.classList.add('show');
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim();
    searchClear.classList.toggle('show', q.length > 0);
    clearTimeout(searchTimeout);

    if (q.length < 2) {
      searchDropdown.classList.remove('show');
      return;
    }

    searchTimeout = setTimeout(() => {
      const matches = allPlayers.filter(p =>
        p.displayName.toLowerCase().includes(q.toLowerCase())
      );
      showDropdown(matches, q);
    }, 200);
  });

  // Show hot players on focus if search is empty
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length === 0) {
      showHotPlayers();
    }
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.remove('show');
    searchDropdown.classList.remove('show');
    searchInput.focus();
  });

  // Keyboard nav
  searchInput.addEventListener('keydown', e => {
    const items = searchDropdown.querySelectorAll('.search-result');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('focused', i === focusedIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0);
      items.forEach((el, i) => el.classList.toggle('focused', i === focusedIndex));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      items[focusedIndex]?.click();
    } else if (e.key === 'Escape') {
      searchDropdown.classList.remove('show');
    }
  });

  // Click a result
  searchDropdown.addEventListener('click', async e => {
    const result = e.target.closest('.search-result');
    if (!result) return;

    const playerId   = result.dataset.id;
    const playerName = result.dataset.name;
    const player     = allPlayers.find(p => p.id === playerId);
    if (!player) return;

    searchInput.value = playerName;
    searchClear.classList.add('show');
    searchDropdown.classList.remove('show');

    const currentYear = parseInt(document.getElementById('season-select').value);

    // Check if player has data for current season
    searchDropdown.innerHTML = '';
    const checkData = await pgaGql(
      'StatDetails',
      `query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
        statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
          yearPills { year displaySeason }
          rows { ... on StatDetailsPlayer { playerId } }
        }
      }`,
      { tourCode: 'R', statId: '101', year: currentYear, eventQuery: null }
    );

    const rows      = checkData?.data?.statDetails?.rows ?? [];
    const hasData   = rows.some(r => r.playerId === playerId);
    const yearPills = checkData?.data?.statDetails?.yearPills ?? [];

    if (hasData) {
      await loadPlayer(player, currentYear);
    } else {
      // Find most recent year with data
      pendingPlayer = player;
      showNoDataModal(player, yearPills, currentYear);
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!document.getElementById('search-wrap').contains(e.target)) {
      searchDropdown.classList.remove('show');
    }
  });

  // ── No Data Modal ──────────────────────────────────────────────
  function showNoDataModal(player, yearPills, currentYear) {
    const currentYearVal = document.getElementById('season-select').value;
    document.getElementById('nodata-title').textContent =
      `No ${currentYearVal} season data for ${player.displayName}`;
    document.getElementById('nodata-body').textContent =
      `${player.displayName} doesn't have stats for the currently selected season. Choose an available season:`;

    // Find available seasons by checking rows
    // Show all yearPills as options, mark the most recent as recommended
    const list = document.getElementById('nodata-season-list');
    list.innerHTML = '';

    // Just show selectable season buttons from recent years
    const recentPills = yearPills.slice(0, 10);
    recentPills.forEach((pill, i) => {
      const btn = document.createElement('button');
      btn.className = 'nodata-season-btn' + (i === 0 ? ' recommended' : '');
      btn.textContent = pill.displaySeason + (i === 0 ? ' ★' : '');
      btn.addEventListener('click', async () => {
        document.getElementById('nodata-overlay').classList.remove('show');
        // Update season dropdown
        document.getElementById('season-select').value = pill.year;
        await loadPlayer(player, pill.year);
      });
      list.appendChild(btn);
    });

    document.getElementById('nodata-overlay').classList.add('show');
  }

  document.getElementById('nodata-cancel').addEventListener('click', () => {
    document.getElementById('nodata-overlay').classList.remove('show');
    searchInput.value = '';
    searchClear.classList.remove('show');
    pendingPlayer = null;
  });

  document.getElementById('nodata-overlay').addEventListener('click', function(e) {
    if (e.target === this) document.getElementById('nodata-cancel').click();
  });


  // ── Welcome Modal ─────────────────────────────────────────
  (function() {
    const overlay = document.getElementById('welcome-overlay');
    const btn     = document.getElementById('welcome-btn');
    if (!overlay || !btn) return;

    // Check if user has seen it before using localStorage
    const seen = localStorage.getItem('fairway-welcome-seen');
    if (seen) {
      overlay.classList.add('hidden');
    }

    btn.addEventListener('click', () => {
      overlay.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => overlay.classList.add('hidden'), 280);
      localStorage.setItem('fairway-welcome-seen', '1');
    });

    // Also close on backdrop click
    overlay.addEventListener('click', e => {
      if (e.target === overlay) btn.click();
    });
  })();

  // Auto-load the current world #1 player on startup
  (async () => {
    try {
      await getOWGRCache();
      // Find rank #1 in OWGR cache
      const world1 = Object.values(owgrCache).find(p => p.rank === 1);
      if (!world1) return;
      // Match to PGA Tour player list
      const match = allPlayers.find(p =>
        p.displayName.toLowerCase().trim() === world1.fullName?.toLowerCase().trim()
      );
      if (!match) return;
      // Update name display immediately
      const names = match.displayName.split(' ');
      document.querySelector('.player-name').innerHTML =
        names.slice(0, -1).join(' ') + '<br>' + names[names.length - 1];
      // Load full stats
      await loadPlayer(match, 2026);
    } catch(e) {
      console.warn('Could not auto-load world #1:', e);
    }
  })();
