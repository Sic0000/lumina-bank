import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/#simulateur', label: t('nav.simulator') },
    { href: '/#faq', label: t('nav.faq') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
            <span className="font-display font-extrabold text-sm text-primary">PF</span>
          </div>
          <span className="font-display font-bold text-base tracking-tight text-foreground">
            Prime<span className="text-primary">Finance</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          {isLoggedIn ? (
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.logout')}
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_2px_12px_hsla(217,91%,60%,0.25)]"
              >
                {t('nav.signup')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/20 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border/20" />
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-5 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
