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

export default function Competencies() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Core Competencies
        </h2>
        <div className="flex flex-wrap gap-2">
          {competencies.map((item, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}