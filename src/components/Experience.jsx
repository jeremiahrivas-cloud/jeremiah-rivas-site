const jobs = [
  {
    title: "National Information Systems Officer",
    org: "National Credit Union Administration (NCUA) — Alexandria, VA",
    period: "2019 – Present",
    bullets: [
      "Analyzes information security risk and emerging technology governance at federally insured financial institutions exceeding $10B in assets; leads examination teams assessing governance structures, risk management frameworks, and operational controls.",
      "Built a repeatable generative AI governance review program ahead of formal NCUA guidance, grounded in NIST AI RMF; applied across multiple large-institution examinations.",
      "During a routine examination, identified active cryptolocker ransomware and a banking Trojan — both undetected by institution staff — and directed containment before data loss or disruption occurred.",
      "Functions as regional and national subject matter expert on cybersecurity, IS examination methodology, and emerging technology risk.",
    ],
  },
  {
    title: "Earlier NCUA Roles — Regional ISO (CU-14) | Principal Examiner | SME",
    org: "National Credit Union Administration (NCUA)",
    period: "2012 – 2019",
    bullets: [
      "Progressed through successive examination and leadership roles; developed regional IS examination programs and authored policy adopted at the national level.",
      "Selected for NCUA's competitive Management Development Program; led agency-wide project to modernize the credit union chartering process — recommendations briefed to the Deputy Executive Director and adopted across three divisions.",
    ],
  },
  {
    title: "Financial Institution Specialist",
    org: "Federal Deposit Insurance Corporation (FDIC) — New York, NY",
    period: "2010 – 2012",
    bullets: [
      "Safety and soundness examinations, CAMELS analysis, and participation in nine institution closings including one exceeding $11B in assets.",
    ],
  },
  {
    title: "Administrative Non-Commissioned Officer",
    org: "United States Marine Corps — Camp Pendleton, CA / Fallujah, Iraq (OIF)",
    period: "2004 – 2008",
    bullets: [
      "Performed administrative duties including casualty reporting and awards processing for seven infantry battalions and 13 separate companies across Al-Anbar Province while fulfilling convoy and security responsibilities in an active combat environment.",
    ],
  },
];

export default function Experience({ sectionNumber }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-xl site-ink">Experience</h2>
      </div>

      <div className="site-divide">
        {jobs.map((job, i) => (
          <div key={i} className="py-4 first:pt-0">
            <div className="flex justify-between items-start gap-4 mb-1">
              <h3 className="font-display text-sm font-bold site-ink leading-snug">
                {job.title}
              </h3>
              <span className="font-sans text-xs site-sage whitespace-nowrap shrink-0">
                {job.period}
              </span>
            </div>
            <p className="font-sans text-xs site-muted mb-3">{job.org}</p>
            <ul className="space-y-2">
              {job.bullets.map((b, j) => (
                <li key={j} className="font-sans text-sm site-muted flex gap-2 leading-relaxed">
                  <span className="site-sage shrink-0 mt-0.5">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
