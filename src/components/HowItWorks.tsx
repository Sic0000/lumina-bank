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
    <section id="comment" className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
            {t('how.title')}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-lg mx-auto">{t('how.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="card-elevated rounded-xl p-8 h-full hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/12 transition-colors">
                  <step.Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-mono text-xs text-primary/50 mb-2 tracking-wider">0{i + 1}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
