export default function QRCode({ sectionNumber }) {
  return (
    <section className="site-panel site-border p-5">
      <div className="flex items-center gap-3 mb-3">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-base site-ink">Scan to View Online</h2>
      </div>
      <p className="font-sans text-sm site-muted">jeremiahrivas.com</p>
    </section>
  );
}
