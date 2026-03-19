import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import CountUp from './CountUp';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Particle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(252 100% 69%) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal/5 blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nexus Finance — Crédit Digital Premium</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-lavender">{t('hero.title1')}</span>
            <br />
            <span className="text-gradient-indigo">{t('hero.title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-mist max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#simulateur"
              className="group px-8 py-4 rounded-2xl text-base font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_32px_hsla(252,100%,69%,0.35)] transition-all duration-300 hover:-translate-y-0.5 animate-pulse-glow flex items-center gap-2"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#comment"
              className="px-8 py-4 rounded-2xl text-base font-medium border border-primary/30 text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: 12847, label: t('hero.stat1'), suffix: '+', prefix: '' },
            { value: 4.2, label: t('hero.stat2'), suffix: 'M€', prefix: '' },
            { value: 2.9, label: t('hero.stat3'), suffix: '%', prefix: '' },
            { value: null, label: t('hero.stat4'), display: t('hero.stat4val') },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="font-mono font-bold text-2xl sm:text-3xl text-lavender mb-1">
                {stat.value !== null ? (
                  <CountUp end={stat.value} suffix={stat.suffix || ''} />
                ) : (
                  stat.display
                )}
              </div>
              <div className="text-sm text-mist">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-mist"
        >
          {['trust.ssl', 'trust.acpr', 'trust.rgpd', 'trust.encrypted'].map(key => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal" />
              {t(key)}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
