export default function Profile() {
  return (
    <section id="profile" style={{ borderBottom: '3px solid #1e2d40' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Portrait + caption — left */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="site-panel site-border w-full overflow-hidden" style={{ flex: 1, borderBottom: 'none', borderRadius: '4px 4px 0 0' }}>
            <img src="/IMG_0491.png" alt="Jeremiah M. Rivas" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          </div>
          <div style={{ background: '#1e2d40', padding: '0.85rem 1rem', borderRadius: '0 0 4px 4px' }}>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.95rem', color: '#e8ebe4', letterSpacing: '0.01em', lineHeight: '1.5', fontWeight: '600' }}>
              Open to Director-level roles in AI Governance &amp; Information Security Risk — remote or international.
            </p>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.88rem', color: '#b0bec5', letterSpacing: '0.01em', lineHeight: '1.5', marginTop: '0.4rem' }}>
              Collaborative, process-driven leader who builds frameworks, sets the pace, and rolls up his sleeves when the work demands it.
            </p>
          </div>
        </div>

        {/* Tagline + short bio — center */}
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-3xl font-bold site-ink leading-snug">
            Cybersecurity, Information Systems Risk &amp; Emerging Technology Governance
          </h1>
          <p className="font-display mt-4 text-lg site-muted leading-snug">
            Equally fluent in the language of the regulator, the technologist, and the
            boardroom — translating complex risk findings into action across the enterprise.
          </p>
          <p className="font-sans mt-4 text-sm site-muted leading-relaxed">
            15 years progressing from safety-and-soundness examination at the FDIC to leading
            information systems security and emerging technology governance at the national level.
            CISSP and CNDA credentialed. Combat veteran.
          </p>
          <p className="font-display mt-4 text-sm font-semibold" style={{ color: '#1e2d40' }}>
            FDIC · NCUA · NIST AI RMF · NIST CSF · CISSP · CNDA · USMC · OIF
          </p>
        </div>

        {/* At a Glance — right */}
        <div className="site-panel site-border p-5" style={{ borderTop: '3px solid #1e2d40' }}>
          <h2 className="font-display text-xs tracking-widest uppercase site-sage mb-4">
            At a Glance
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Location</dt>
              <dd className="font-sans text-sm site-ink">San Diego, CA</dd>
            </div>
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Current Role</dt>
              <dd className="font-sans text-sm site-ink">National Information Systems Officer, NCUA</dd>
            </div>
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Credentials</dt>
              <dd className="font-sans text-sm site-ink">CISSP · CNDA</dd>
            </div>
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Federal Service</dt>
              <dd className="font-sans text-sm site-ink">FDIC 2010 – NCUA Present</dd>
            </div>
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Military</dt>
              <dd className="font-sans text-sm site-ink">USMC Veteran · OIF</dd>
            </div>
            <div>
              <dt className="font-sans text-xs site-muted uppercase tracking-wide mb-0.5">Language</dt>
              <dd className="font-sans text-sm site-ink">Spanish — Professional Fluency</dd>
            </div>
          </dl>
        </div>

      </div>
    </section>
  );
}
