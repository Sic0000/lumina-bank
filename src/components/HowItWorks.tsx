import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Calculator, FileText, Zap, CreditCard } from 'lucide-react';

const icons = [Calculator, FileText, Zap, CreditCard];

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [1, 2, 3, 4].map(i => ({
    title: t(`how.step${i}.title`),
    desc: t(`how.step${i}.desc`),
    Icon: icons[i - 1],
  }));

  return (
    <section id="comment" className="py-24 lg:py-32 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-lavender mb-4">
            {t('how.title')}
          </h2>
          <p className="text-mist text-lg">{t('how.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-8 h-full hover:-translate-y-2 transition-all duration-300 hover:border-glow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:glow-indigo transition-all duration-300">
                  <step.Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-mono text-sm text-primary/60 mb-2">0{i + 1}</div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-mist text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
