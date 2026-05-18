export default function Projects({ onOpenSecurityLab }) {
  const projects = [
    { id: '01', title: 'jeremiahrivas.com', category: 'Live Platform', description: 'This site — a governed AI deployment with layered security, a professional AI assistant grounded in published methodology, and a platform risk assessment. Built solo using AI-assisted development.', stack: 'React · Vite · Tailwind CSS · Cloudflare Pages · Anthropic API', status: 'Live', statusColor: '#4a5e3f', link: 'https://jeremiahrivas.com', linkLabel: 'Visit site', action: null },
    { id: '02', title: 'Platform Risk Assessment', category: 'Governance Artifact', description: 'Semi-quantitative personal risk assessment of this platform — 22-threat register scored against NIST CSF 2.0 and SP 800-30 Rev. 1. Three impact domains, traceable scoring, two-version deliverable.', stack: 'NIST CSF 2.0 · SP 800-30 Rev. 1 · Excel · PDF', status: 'Complete', statusColor: '#4b5563', link: '/Rivas_Platform_RiskAssessment_PublicSummary_v1.1.pdf', linkLabel: 'Download Executive Summary', action: null },
    { id: '03', title: 'Security Lab', category: 'Security Demonstration', description: 'Live security event monitoring tied to the risk register — prompt injection detection, WAF triggers, rate limiting, and attempt logging surfaced in a public SIEM-style dashboard.', stack: 'Supabase · Cloudflare Workers · React', status: 'Live', statusColor: '#1e2d40', link: null, linkLabel: null, action: 'openLab' }
  ];
  return (
    <div id="projects" style={{ borderBottom: '3px solid #1e2d40', background: '#f5f5f0' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '0.85rem', borderBottom: '3px solid #1e2d40' }}>
          <h2 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '2rem', fontWeight: '800', color: '#1a2310' }}>Projects</h2>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1rem', color: '#1e2d40', fontWeight: '600', fontStyle: 'italic' }}>Vibe coded solo — React, Vite, Tailwind CSS, Cloudflare Pages, Anthropic API</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="site-panel site-border p-5 flex flex-col" style={{ borderTop: '3px solid #1e2d40' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '700', color: '#4a5e3f' }}>{p.id}</span>
                <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '3px', background: p.statusColor, color: '#fff' }}>{p.status}</span>
              </div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a5e3f', marginBottom: '0.4rem' }}>{p.category}</p>
              <h3 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.15rem', fontWeight: '700', color: '#1a2310', marginBottom: '0.6rem', lineHeight: '1.3' }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6', flex: 1 }}>{p.description}</p>
              {p.action === 'openLab' ? (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0d1117', borderRadius: '4px', border: '1px solid #30363d' }}>
                  <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a9eff', marginBottom: '0.5rem' }}>Live Event Feed</p>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem' }}>
                    {[{id:'TR-001',label:'Injection'},{id:'TR-003',label:'Jailbreak'},{id:'TR-002',label:'Sys Prompt'},{id:'TR-016',label:'PII'}].map(t => (
                      <div key={t.id} style={{ flex: 1, background: '#161b22', borderRadius: '3px', padding: '4px', textAlign: 'center' }}>
                        <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '0.6rem', color: '#4a9eff', fontWeight: '700' }}>{t.id}</div>
                        <div style={{ fontSize: '0.55rem', color: '#6e7681', marginTop: '1px' }}>{t.label}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={onOpenSecurityLab} style={{ width: '100%', padding: '0.55rem 1rem', background: '#1e2d40', color: '#e8ebe4', border: '1px solid #4a9eff', borderRadius: '3px', cursor: 'pointer', fontFamily: '"Times New Roman", Times, serif', fontSize: '0.85rem', fontWeight: '700' }}>
                    Open Security Lab Dashboard &rarr;
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e0e0d8' }}>
                  <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>{p.stack}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.82rem', color: '#4a5e3f', fontFamily: '"Times New Roman", Times, serif', textDecoration: 'none', fontWeight: '700' }}>{p.linkLabel} &rarr;</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
