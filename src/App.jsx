import Header from './components/Header';
import Profile from './components/Profile';
import Competencies from './components/Competencies';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import QRCode from './components/QRCode';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Profile />
      <Competencies />
      <Experience />
      <Education />
      <ContactForm />
      <QRCode />
    </div>
  );
}