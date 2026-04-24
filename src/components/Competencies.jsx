const competencies = [
  "Information Security Risk",
  "Emerging Technology Governance",
  "NIST AI RMF",
  "NIST CSF / SP 800-53",
  "GLBA Compliance",
  "Regulatory Policy Development",
  "IT Risk Examination",
  "Board-Level Advisory",
  "Workforce Development",
  "Cross-Agency Program Leadership",
];

export default function Competencies({ sectionNumber }) {
  return (
    <section className="site-panel site-border p-6">
      <div className="flex items-center gap-3 mb-5">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-xl site-ink">Core Competencies</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {competencies.map((item, i) => (
          <span key={i} className="site-inset site-border font-sans text-sm site-ink px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
