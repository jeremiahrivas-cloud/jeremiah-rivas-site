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

export default function Education() {
  return (
    <section className="py-8 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Education &amp; Certifications
        </h2>
        {degrees.map((item, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-semibold text-gray-900">{item.degree}</h3>
            <p className="text-sm text-gray-600">{item.school} · {item.year}</p>
            {item.note && <p className="text-sm text-gray-500">{item.note}</p>}
          </div>
        ))}
        <h3 className="font-semibold text-gray-800 mt-4 mb-2">Certifications</h3>
        <ul className="space-y-1">
          {certs.map((cert, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-gray-400">•</span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mt-4">Spanish — Professional fluency, spoken and written</p>
      </div>
    </section>
  );
}