import Header from './components/Header';
import Profile from './components/Profile';
import Competencies from './components/Competencies';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import QRCode from './components/QRCode';

export default function App() {
  return (
    <div className="min-h-screen font-sans">

      <Header />

      <main>
        {/* Hero row */}
        <Profile />

        {/* Mid row — Selected Work | Competencies */}
        <div id="work" className="site-border-b">
          <div className="max-w-screen-xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Selected Work */}
            <section className="site-panel site-border p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-display text-xs tracking-widest font-bold site-sage">01</span>
                <h2 className="font-display text-xl site-ink">Selected Work</h2>
              </div>

              <div className="site-inset site-border p-5">
                <p className="font-sans text-xs tracking-widest uppercase site-sage mb-3">
                  Risk Assessment Artifact
                </p>
                <h3 className="font-display text-base site-ink mb-3 leading-snug">
                  Generative AI Governance Review Program
                </h3>
                <p className="font-sans text-sm site-muted leading-relaxed">
                  Built a repeatable AI governance review program before formal NCUA guidance
                  existed — grounded in NIST AI RMF, applied across multiple large-institution
                  examinations. This was a self-initiated methodology developed to fill a
                  regulatory gap, not an assigned task. It has since informed agency-level
                  thinking on AI examination.
                </p>
                <div className="mt-5 pt-4 site-border-t grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-sans text-xs site-muted uppercase tracking-wide mb-1">Framework</p>
                    <p className="font-sans text-sm site-ink">NIST AI RMF</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs site-muted uppercase tracking-wide mb-1">Scope</p>
                    <p className="font-sans text-sm site-ink">Large Institution (&gt;$10B)</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs site-muted uppercase tracking-wide mb-1">Status</p>
                    <p className="font-sans text-sm site-ink">Adopted Pre-Guidance</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs site-muted uppercase tracking-wide mb-1">Agency</p>
                    <p className="font-sans text-sm site-ink">NCUA</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Competencies */}
            <Competencies sectionNumber="02" />
          </div>
        </div>

        {/* Bottom row — Experience | (Education + Contact + QR) */}
        <div id="experience" className="max-w-screen-xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Experience sectionNumber="03" />

          <div id="contact" className="flex flex-col gap-4">
            <Education sectionNumber="04" />
            <ContactForm sectionNumber="05" />
            <QRCode sectionNumber="06" />
          </div>
        </div>
      </main>

    </div>
  );
}
