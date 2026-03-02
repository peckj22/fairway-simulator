// lib/api.js
// All API calls go through our own Next.js routes (no CORS, no exposed keys)

// ── PGA Tour GraphQL ──────────────────────────────────────────
export async function pgaGql(operationName, query, variables = {}) {
  const res = await fetch('/api/pga', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ operationName, query, variables }),
  });
  if (!res.ok) throw new Error(`PGA API error: ${res.status}`);
  return res.json();
}

const STAT_DETAILS_QUERY = `
  query StatDetails($tourCode: TourCode!, $statId: String!, $year: Int, $eventQuery: StatDetailEventQuery) {
    statDetails(tourCode: $tourCode, statId: $statId, year: $year, eventQuery: $eventQuery) {
      statId statTitle tourAvg year displaySeason
      yearPills { year displaySeason }
      rows {
        ... on StatDetailsPlayer {
          playerId playerName country rank rankDiff rankChangeTendency
          stats { statName statValue color }
        }
        ... on StatDetailTourAvg {
          displayName value
        }
      }
    }
  }
`;

export async function getStatDetails(statId, year = null) {
  return pgaGql('StatDetails', STAT_DETAILS_QUERY, {
    tourCode: 'R', statId, year, eventQuery: null,
  });
}

export async function getPlayerList() {
  const data = await pgaGql('PlayerDirectory',
    `query PlayerDirectory($tourCode: TourCode!) {
      playerDirectory(tourCode: $tourCode) {
        players { id displayName country isActive }
      }
    }`,
    { tourCode: 'R' }
  );
  return data?.data?.playerDirectory?.players ?? [];
}

// ── OWGR ──────────────────────────────────────────────────────
export async function getOWGRPage(page = 1, pageSize = 2000) {
  const params = new URLSearchParams({
    regionId:   0,
    pageSize,
    pageNumber: page,
    countryId:  0,
    sortString: 'Rank+ASC',
  });
  const res  = await fetch(`/api/owgr?${params}`);
  if (!res.ok) throw new Error(`OWGR error: ${res.status}`);
  return res.json();
}

// Fetch all OWGR players and return a name-keyed map
export async function getAllOWGRPlayers() {
  const map   = {};
  const pages = 5; // covers all ~9300 ranked players
  const all   = await Promise.all(
    Array.from({ length: pages }, (_, i) =>
      getOWGRPage(i + 1).catch(() => ({ rankingsList: [] }))
    )
  );
  all.forEach(data => {
    (data.rankingsList ?? []).forEach(entry => {
      const key = entry.player?.fullName?.toLowerCase().trim();
      if (key) {
        map[key] = {
          owgrId:          entry.id,
          rank:            entry.rank,
          lastWeekRank:    entry.lastWeekRank,
          endLastYearRank: entry.endLastYearRank,
          fullName:        entry.player?.fullName,
          country:         entry.player?.country?.name,
        };
      }
    });
  });
  return map;
}

// ── Player headshots ──────────────────────────────────────────
export function headshotUrl(playerId) {
  return `/api/headshot/${playerId}`;
}

// ── Key stat IDs ──────────────────────────────────────────────
export const STAT_IDS = {
  scoringAvg:    '120',
  drivingDist:   '101',
  drivingAcc:    '102',
  gir:           '103',
  scrambling:    '130',
  puttingAvg:    '04',
  sgOtt:         '02674',
  sgApproach:    '02568',
  sgAroundGreen: '02676',
  sgPutting:     '02564',
  sgTotal:       '02675',
  owgr:          '186',
};

// Fetch all key stats for a single player in a given year
export async function getPlayerStats(playerId, year = null) {
  const statList = [
    { id: STAT_IDS.drivingDist,   key: 'drvDist' },
    { id: STAT_IDS.drivingAcc,    key: 'drvAcc'  },
    { id: STAT_IDS.gir,           key: 'gir'     },
    { id: STAT_IDS.scrambling,    key: 'scr'     },
    { id: STAT_IDS.sgPutting,     key: 'sgPutt'  },
    { id: STAT_IDS.sgOtt,         key: 'sgOtt'   },
    { id: STAT_IDS.sgApproach,    key: 'sgApp'   },
    { id: STAT_IDS.sgAroundGreen, key: 'sgAtg'   },
    { id: STAT_IDS.sgTotal,       key: 'sgTotal' },
    { id: STAT_IDS.scoringAvg,    key: 'score'   },
  ];

  const results = { playerId, year };

  await Promise.all(statList.map(async stat => {
    try {
      const data   = await getStatDetails(stat.id, year);
      const detail = data?.data?.statDetails;
      const player = detail?.rows?.find(r => r.playerId === playerId);
      if (player) {
        results[stat.key]           = parseFloat(player.stats?.[0]?.statValue);
        results[stat.key + '_rank'] = parseInt(player.rank);
        results[stat.key + '_avg']  = detail.tourAvg;
      }
      // Save yearPills from first stat that has them
      if (!results.yearPills && detail?.yearPills?.length) {
        results.yearPills = detail.yearPills;
      }
    } catch(e) { /* stat not available for this year/player */ }
  }));

  return results;
}

// Check which seasons a player has data for
export async function getPlayerActiveSeasons(playerId) {
  const data = await getStatDetails(STAT_IDS.scoringAvg, null);
  const pills = data?.data?.statDetails?.yearPills ?? [];

  const activeSeasons = [];
  await Promise.all(
    pills.slice(0, 15).map(async pill => {
      try {
        const d    = await getStatDetails(STAT_IDS.scoringAvg, pill.year);
        const rows = d?.data?.statDetails?.rows ?? [];
        if (rows.some(r => r.playerId === playerId)) {
          activeSeasons.push(pill);
        }
      } catch(e) {}
    })
  );

  activeSeasons.sort((a, b) => b.year - a.year);
  return activeSeasons;
}
