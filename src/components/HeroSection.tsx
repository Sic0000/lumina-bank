import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock } from 'lucide-react';
import CountUp from './CountUp';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(0 78% 52%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      
      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[150px]" />

      <div className="container mx-auto px-6 lg:px-10 pt-32 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/[0.06] mb-10"
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">PrimeFinance — Crédit Digital Premium</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-foreground">{t('hero.title1')}</span>
            <br />
            <span className="text-gradient-primary">{t('hero.title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#simulateur"
              className="group px-8 py-4 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_4px_24px_hsla(0,78%,52%,0.2)] hover:shadow-[0_8px_32px_hsla(0,78%,52%,0.3)] flex items-center gap-2.5"
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#comment"
              className="px-8 py-4 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
            >
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-4xl mx-auto"
        >
          {[
            { value: 12847, label: t('hero.stat1'), suffix: '+', prefix: '' },
            { value: 4.2, label: t('hero.stat2'), suffix: 'M€', prefix: '' },
            { value: 2.9, label: t('hero.stat3'), suffix: '%', prefix: '' },
            { value: null, label: t('hero.stat4'), display: t('hero.stat4val') },
          ].map((stat, i) => (
            <div key={i} className="card-elevated rounded-xl p-6 text-center">
              <div className="font-mono font-semibold text-[clamp(1.5rem,3vw,2rem)] text-foreground mb-1.5">
                {stat.value !== null ? (
                  <CountUp end={stat.value} suffix={stat.suffix || ''} />
                ) : (
                  stat.display
                )}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground"
        >
          {[
            { key: 'trust.ssl', icon: Lock },
            { key: 'trust.acpr', icon: Shield },
            { key: 'trust.rgpd', icon: Shield },
            { key: 'trust.encrypted', icon: Lock },
          ].map(({ key, icon: Icon }) => (
            <div key={key} className="flex items-center gap-2">
              <Icon className="w-3 h-3 text-primary" />
              <span className="tracking-wide">{t(key)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
