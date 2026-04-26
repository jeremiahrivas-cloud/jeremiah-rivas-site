import { QRCodeSVG } from 'qrcode.react';

export default function QRcodes({ sectionNumber }) {
  return (
    <section className="site-panel site-border p-5">
      <div className="flex items-center gap-3 mb-4">
        {sectionNumber && (
          <span className="font-display text-xs tracking-widest font-bold site-sage">{sectionNumber}</span>
        )}
        <h2 className="font-display text-base site-ink">Scan to View Online</h2>
      </div>
      <div className="flex items-center gap-5">
        <QRCodeSVG
          value="https://jeremiahrivas.com"
          size={90}
          bgColor="#ffffff"
          fgColor="#1a1a1a"
          level="M"
        />
        <div>
          <p className="font-sans text-sm site-ink font-medium">jeremiahrivas.com</p>
          <p className="font-sans text-xs site-muted mt-1">Scan to open on any device</p>
        </div>
      </div>
    </section>
  );
}
