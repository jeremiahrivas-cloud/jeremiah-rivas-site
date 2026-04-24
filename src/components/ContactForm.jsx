export default function ContactForm({ sectionNumber }) {
  return (
    <section className="site-panel site-border p-5">
      <div className="flex items-center gap-3 mb-4">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-base site-ink">Contact</h2>
      </div>
      <p className="font-sans text-sm site-muted mb-4">
        For professional inquiries, reach out directly:
      </p>
      <a
        href="mailto:jerrymrivas@protonmail.com"
        className="site-cta font-sans text-sm px-5 py-2.5"
      >
        jerrymrivas@protonmail.com
      </a>
    </section>
  );
}
