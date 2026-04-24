export default function Header() {
  return (
    <header className="sticky top-0 z-50 site-panel site-border-b">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center gap-6">

        {/* Name — left */}
        <span className="font-display font-bold site-ink whitespace-nowrap shrink-0">
          Jeremiah M. Rivas
        </span>

        {/* Nav links — center */}
        <nav className="flex-1 flex justify-center gap-8">
          <a href="#profile" className="site-nav-link font-sans text-sm">Profile</a>
          <a href="#work"    className="site-nav-link font-sans text-sm">Work</a>
          <a href="#experience" className="site-nav-link font-sans text-sm">Experience</a>
          <a href="#contact" className="site-nav-link font-sans text-sm">Contact</a>
        </nav>

        {/* Email + location — right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href="mailto:jerrymrivas@protonmail.com" className="site-sage-link font-sans text-sm">
            jerrymrivas@protonmail.com
          </a>
          <span className="site-dot w-1.5 h-1.5 rounded-full inline-block" aria-hidden="true" />
          <span className="site-muted font-sans text-xs">San Diego, CA</span>
        </div>

      </div>
    </header>
  );
}
