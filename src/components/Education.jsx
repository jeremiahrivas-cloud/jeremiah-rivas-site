const degrees = [
  {
    degree: "M.S. Administration",
    school: "Central Michigan University",
    year: "2014",
    note: "Minor: Leadership & Public Administration",
  },
  {
    degree: "B.S. Management / Marketing, Cum Laude",
    school: "Park University",
    year: "2009",
  },
];

const certs = [
  "CISSP — ISC2 #614610",
  "Certified Network Defense Architect (CNDA) — EC-Council",
];

export default function Education({ sectionNumber }) {
  return (
    <section className="site-panel site-border p-5">
      <div className="flex items-center gap-3 mb-4">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-base site-ink">Education &amp; Certifications</h2>
      </div>

      <div className="site-divide">
        {degrees.map((item, i) => (
          <div key={i} className="py-3 first:pt-0">
            <h3 className="font-display text-sm site-ink">{item.degree}</h3>
            <p className="font-sans text-xs site-muted mt-0.5">
              {item.school} · {item.year}
            </p>
            {item.note && (
              <p className="font-sans text-xs site-muted mt-0.5">{item.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 site-border-t">
        <h3 className="font-display text-xs site-muted uppercase tracking-widest mb-2">
          Certifications
        </h3>
        <ul className="space-y-1">
          {certs.map((cert, i) => (
            <li key={i} className="font-sans text-sm site-ink flex gap-2">
              <span className="site-sage shrink-0">–</span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-sans text-xs site-muted mt-4 pt-4 site-border-t">
        Spanish — Professional fluency, spoken and written
      </p>
    </section>
  );
}
