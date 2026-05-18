import { useState, useEffect, useCallback } from 'react';

const SUPABASE_URL = 'https://chremzjufpsdvxtwthpn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nla4PYtTQL0ZMLaCp4rxiA_2hq_87eu';

const RATING_STYLES = {
  LOW:      { bg: 'var(--sl-low-bg)',      text: 'var(--sl-low-text)',      border: 'var(--sl-low-border)' },
  MODERATE: { bg: 'var(--sl-mod-bg)',      text: 'var(--sl-mod-text)',      border: 'var(--sl-mod-border)' },
  HIGH:     { bg: 'var(--sl-high-bg)',     text: 'var(--sl-high-text)',     border: 'var(--sl-high-border)' },
  CRITICAL: { bg: 'var(--sl-crit-bg)',     text: 'var(--sl-crit-text)',     border: 'var(--sl-crit-border)' },
};

function Badge({ rating }) {
  const s = RATING_STYLES[rating] || RATING_STYLES.LOW;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      padding: '2px 7px',
      borderRadius: '3px',
      background: s.bg,
      color: s.text,
      border: `1px solid ${s.border}`,
    }}>{rating}</span>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
      {data.map((val, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${Math.max((val / max) * 100, val > 0 ? 15 : 4)}%`,
          background: val > 0 ? 'var(--sl-accent)' : 'var(--sl-bar-empty)',
          borderRadius: '2px 2px 0 0',
          transition: 'height 0.3s ease',
        }} />
      ))}
    </div>
  );
}

function ThreatPanel({ threat, events24h, events7d, dailyCounts, onClose }) {
  if (!threat) return null;
  const s = RATING_STYLES[threat.residual_rating] || RATING_STYLES.LOW;
  return (
    <div style={{
      background: 'var(--sl-panel-bg)',
      border: '1px solid var(--sl-panel-border)',
      borderRadius: '6px',
      padding: '16px',
      position: 'relative',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: '12px', right: '12px',
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--sl-muted)', fontSize: '16px', lineHeight: 1, padding: '2px 6px',
      }}>×</button>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'var(--sl-mono)', fontSize: '11px', color: 'var(--sl-accent)', fontWeight: 600 }}>{threat.id}</span>
          <Badge rating={threat.residual_rating} />
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sl-text-primary)', lineHeight: 1.4 }}>{threat.description}</div>
        <div style={{ fontSize: '11px', color: 'var(--sl-muted)', marginTop: '3px' }}>Surface: {threat.surface}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {[
          { label: '24h events', val: events24h },
          { label: '7d events', val: events7d },
          { label: 'Residual score', val: threat.residual_score },
        ].map(({ label, val }) => (
          <div key={label} style={{ background: 'var(--sl-chip-bg)', borderRadius: '4px', padding: '8px 10px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sl-text-primary)' }}>{val}</div>
            <div style={{ fontSize: '10px', color: 'var(--sl-muted)', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: 'var(--sl-muted)', marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>7-day trend</div>
        <MiniChart data={dailyCounts} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div key={d} style={{ flex: 1, textAlign: 'center', fontSize: '9px', color: 'var(--sl-muted)' }}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--sl-rule)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '11px', color: 'var(--sl-muted)' }}>
          <span style={{ color: 'var(--sl-text-secondary)', fontWeight: 500 }}>Controls: </span>{threat.controls}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--sl-muted)' }}>
          <span style={{ color: 'var(--sl-text-secondary)', fontWeight: 500 }}>NIST functions: </span>
          {threat.nist_functions?.join(' · ')}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--sl-muted)' }}>
          <span style={{ color: 'var(--sl-text-secondary)', fontWeight: 500 }}>Source: </span>{threat.citation}
        </div>
      </div>
    </div>
  );
}

export default function SecurityLab({ isOpen, onClose }) {
  const [events, setEvents] = useState([]);
  const [riskRegister, setRiskRegister] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [eventsRes, rrRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/security_logs?select=*&order=timestamp.desc&limit=200`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        }),
        fetch('/risk-register.json')
      ]);
      if (!eventsRes.ok) throw new Error('Failed to fetch events');
      const [eventsData, rrData] = await Promise.all([eventsRes.json(), rrRes.json()]);
      setEvents(eventsData);
      setRiskRegister(rrData.threats || []);
      setLastRefresh(new Date());
      setError(null);
    } catch (e) {
      setError('Could not load security data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen, fetchData]);

  if (!isOpen) return null;

  const now = new Date();
  const h24ago = new Date(now - 24 * 60 * 60 * 1000);
  const d7ago = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const events24h = events.filter(e => new Date(e.timestamp) >= h24ago);
  const events7d  = events.filter(e => new Date(e.timestamp) >= d7ago);

  // Group by threat_id for summary
  const threatCounts = {};
  events7d.forEach(e => {
    if (!e.threat_id) return;
    if (!threatCounts[e.threat_id]) threatCounts[e.threat_id] = { total7d: 0, total24h: 0 };
    threatCounts[e.threat_id].total7d++;
    if (new Date(e.timestamp) >= h24ago) threatCounts[e.threat_id].total24h++;
  });

  // Daily counts for chart (last 7 days, Mon-Sun aligned to calendar)
  function getDailyCounts(threatId) {
    const days = Array(7).fill(0);
    events7d.forEach(e => {
      if (e.threat_id !== threatId) return;
      const dayIdx = Math.floor((now - new Date(e.timestamp)) / (24 * 60 * 60 * 1000));
      if (dayIdx >= 0 && dayIdx < 7) days[6 - dayIdx]++;
    });
    return days;
  }

  const getThreat = id => riskRegister.find(t => t.id === id);

  const activeThreats = Object.keys(threatCounts)
    .map(id => ({ id, ...threatCounts[id], threat: getThreat(id) }))
    .filter(t => t.threat)
    .sort((a, b) => b.total7d - a.total7d);

  const formatTime = ts => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  const formatDate = ts => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      <style>{`
        .sl-root {
          --sl-bg: #0d1117;
          --sl-panel-bg: #161b22;
          --sl-chip-bg: #1c2128;
          --sl-panel-border: #30363d;
          --sl-rule: #21262d;
          --sl-text-primary: #e6edf3;
          --sl-text-secondary: #8b949e;
          --sl-muted: #6e7681;
          --sl-accent: #4a9eff;
          --sl-bar-empty: #21262d;
          --sl-mono: 'Courier New', monospace;
          --sl-low-bg: #0d2818; --sl-low-text: #3fb950; --sl-low-border: #1a4f2a;
          --sl-mod-bg: #2d1f00; --sl-mod-text: #e3b341; --sl-mod-border: #5a3e00;
          --sl-high-bg: #3d1a00; --sl-high-text: #f0883e; --sl-high-border: #6e3000;
          --sl-crit-bg: #3d0000; --sl-crit-text: #f85149; --sl-crit-border: #6e0000;
          --sl-row-hover: #1c2128;
          --sl-selected-row: #1c2f4a;
        }
        .sl-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.75);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .sl-modal {
          background: var(--sl-bg);
          border: 1px solid var(--sl-panel-border);
          border-radius: 8px;
          width: 100%; max-width: 1000px;
          max-height: 90vh;
          overflow: hidden;
          display: flex; flex-direction: column;
          font-family: -apple-system, 'Segoe UI', sans-serif;
        }
        .sl-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--sl-rule);
          flex-shrink: 0;
        }
        .sl-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 0;
          overflow: hidden;
          flex: 1;
        }
        .sl-left {
          overflow-y: auto;
          border-right: 1px solid var(--sl-rule);
          display: flex; flex-direction: column;
        }
        .sl-right {
          overflow-y: auto;
          padding: 16px;
        }
        .sl-event-table { width: 100%; border-collapse: collapse; }
        .sl-event-table th {
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          color: var(--sl-muted); text-align: left;
          padding: 8px 16px; border-bottom: 1px solid var(--sl-rule);
          position: sticky; top: 0; background: var(--sl-bg);
          text-transform: uppercase;
        }
        .sl-event-table td {
          padding: 7px 16px; font-size: 12px;
          border-bottom: 1px solid var(--sl-rule);
          color: var(--sl-text-secondary);
          cursor: pointer;
        }
        .sl-event-table tr:hover td { background: var(--sl-row-hover); }
        .sl-event-table tr.selected td { background: var(--sl-selected-row); }
        .sl-kri-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 8px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--sl-rule);
          flex-shrink: 0;
        }
        .sl-kri-chip {
          background: var(--sl-chip-bg);
          border: 1px solid var(--sl-panel-border);
          border-radius: 5px;
          padding: 10px 12px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .sl-kri-chip:hover { border-color: var(--sl-accent); }
        .sl-kri-chip.active { border-color: var(--sl-accent); background: #1c2f4a; }
        .sl-close-btn {
          background: none; border: 1px solid var(--sl-panel-border);
          color: var(--sl-text-secondary); cursor: pointer;
          border-radius: 4px; padding: 4px 10px; font-size: 12px;
          transition: border-color 0.15s;
        }
        .sl-close-btn:hover { border-color: var(--sl-accent); color: var(--sl-text-primary); }
        .sl-type-pill {
          font-family: var(--sl-mono);
          font-size: 10px; padding: 2px 6px; border-radius: 3px;
          background: var(--sl-chip-bg); color: var(--sl-text-secondary);
          border: 1px solid var(--sl-panel-border);
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--sl-panel-border); border-radius: 3px; }
      `}</style>

      <div className="sl-overlay sl-root" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="sl-modal">

          {/* Header */}
          <div className="sl-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 6px #3fb950' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sl-text-primary)', letterSpacing: '0.02em' }}>Security Lab</span>
              </div>
              {lastRefresh && (
                <span style={{ fontSize: '11px', color: 'var(--sl-muted)' }}>
                  Updated {lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="sl-close-btn" onClick={fetchData}>↻ Refresh</button>
              <button className="sl-close-btn" onClick={onClose}>Close</button>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--sl-muted)', fontSize: '13px' }}>
              Loading security events…
            </div>
          ) : error ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--sl-high-text)', fontSize: '13px' }}>{error}</div>
          ) : (
            <div className="sl-body">

              {/* Left — KRI chips + event log */}
              <div className="sl-left">

                {/* KRI summary chips */}
                <div className="sl-kri-grid">
                  {activeThreats.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', fontSize: '12px', color: 'var(--sl-muted)' }}>No events in last 7 days</div>
                  ) : activeThreats.map(({ id, total7d, total24h, threat }) => (
                    <div
                      key={id}
                      className={`sl-kri-chip${selectedThreat?.id === id ? ' active' : ''}`}
                      onClick={() => setSelectedThreat(selectedThreat?.id === id ? null : threat)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--sl-mono)', fontSize: '10px', color: 'var(--sl-accent)', fontWeight: 600 }}>{id}</span>
                        <Badge rating={threat.residual_rating} />
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sl-text-primary)', lineHeight: 1 }}>{total7d}</div>
                      <div style={{ fontSize: '10px', color: 'var(--sl-muted)', marginTop: '3px' }}>
                        {total24h > 0 ? <span style={{ color: 'var(--sl-mod-text)' }}>{total24h} today</span> : 'none today'} · 7d
                      </div>
                      <MiniChart data={getDailyCounts(id)} />
                    </div>
                  ))}
                </div>

                {/* Event log table */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <table className="sl-event-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Threat</th>
                        <th>Country</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 50).map(event => {
                        const threat = getThreat(event.threat_id);
                        const isSelected = selectedThreat?.id === event.threat_id;
                        return (
                          <tr
                            key={event.id}
                            className={isSelected ? 'selected' : ''}
                            onClick={() => threat && setSelectedThreat(selectedThreat?.id === event.threat_id ? null : threat)}
                          >
                            <td style={{ color: 'var(--sl-muted)' }}>{formatDate(event.timestamp)}</td>
                            <td style={{ fontFamily: 'var(--sl-mono)', fontSize: '11px' }}>{formatTime(event.timestamp)}</td>
                            <td><span className="sl-type-pill">{event.attempt_type}</span></td>
                            <td style={{ fontFamily: 'var(--sl-mono)', fontSize: '11px', color: 'var(--sl-accent)' }}>{event.threat_id || '—'}</td>
                            <td style={{ color: 'var(--sl-muted)' }}>{event.geo_country || '—'}</td>
                            <td>{threat ? <Badge rating={threat.residual_rating} /> : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Right — threat detail panel */}
              <div className="sl-right">
                {selectedThreat ? (
                  <ThreatPanel
                    threat={selectedThreat}
                    events24h={threatCounts[selectedThreat.id]?.total24h || 0}
                    events7d={threatCounts[selectedThreat.id]?.total7d || 0}
                    dailyCounts={getDailyCounts(selectedThreat.id)}
                    onClose={() => setSelectedThreat(null)}
                  />
                ) : (
                  <div style={{ paddingTop: '32px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--sl-muted)', lineHeight: 1.7 }}>
                      Click a KRI card or event row to view threat details, trend data, and risk register entry.
                    </div>
                    <div style={{ marginTop: '24px', padding: '14px', background: 'var(--sl-chip-bg)', borderRadius: '6px', border: '1px solid var(--sl-panel-border)', textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: 'var(--sl-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Platform summary</div>
                      {[
                        { label: 'Total events logged', val: events.length },
                        { label: 'Events last 24h', val: events24h.length },
                        { label: 'Events last 7d', val: events7d.length },
                        { label: 'Threat IDs active (7d)', val: activeThreats.length },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--sl-rule)', fontSize: '12px' }}>
                          <span style={{ color: 'var(--sl-muted)' }}>{label}</span>
                          <span style={{ color: 'var(--sl-text-primary)', fontWeight: 600 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}
