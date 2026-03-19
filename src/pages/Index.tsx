import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import LoanSimulator from '@/components/LoanSimulator';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <LoanSimulator />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}
