export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Jeremiah M. Rivas</h1>
        <p className="text-lg text-gray-600 mt-1">
          Cybersecurity, Information Systems Risk &amp; Emerging Technology Governance
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>San Diego, CA</span>
          <span>·</span>
          <a href="mailto:jerrymrivas@protonmail.com" className="text-blue-600 hover:underline">
            jerrymrivas@protonmail.com
          </a>
        </div>
      </div>
    </header>
  );
}