import { useState, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const RATES: Record<string, number> = {
  personal: 0.039,
  auto: 0.035,
  works: 0.042,
  conso: 0.049,
  pro: 0.045,
};

export default function LoanSimulator() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [purpose, setPurpose] = useState('personal');
  const [showAmortization, setShowAmortization] = useState(false);

  const rate = RATES[purpose] || 0.039;

  const { monthly, totalCost, taeg, schedule } = useMemo(() => {
    const monthlyRate = rate / 12;
    const n = duration;
    const m = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const total = m * n - amount;
    const sched = [];
    let remaining = amount;
    for (let i = 1; i <= n; i++) {
      const interest = remaining * monthlyRate;
      const capital = m - interest;
      remaining -= capital;
      sched.push({ month: i, capital, interest, remaining: Math.max(0, remaining), payment: m });
    }
    return { monthly: m, totalCost: total, taeg: rate * 100, schedule: sched };
  }, [amount, duration, rate]);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(v);

  const purposeKeys = ['personal', 'auto', 'works', 'conso', 'pro'] as const;

  return (
    <section id="simulateur" className="py-24 lg:py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(252 100% 69%) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-lavender mb-4">
            {t('sim.title')}
          </h2>
          <p className="text-mist text-lg">{t('sim.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Controls */}
              <div className="space-y-8">
                {/* Amount */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="text-sm font-medium text-mist">{t('sim.amount')}</label>
                    <span className="font-mono font-bold text-2xl text-lavender">{formatCurrency(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={75000}
                    step={amount < 5000 ? 100 : amount < 20000 ? 500 : 1000}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, hsl(252 100% 69%) ${((amount - 500) / 74500) * 100}%, hsl(240 25% 18%) ${((amount - 500) / 74500) * 100}%)`,
                      height: '6px',
                      borderRadius: '3px',
                    }}
                  />
                  <div className="flex justify-between text-xs text-mist mt-2">
                    <span>500 €</span>
                    <span>75 000 €</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="text-sm font-medium text-mist">{t('sim.duration')}</label>
                    <span className="font-mono font-bold text-2xl text-lavender">{duration} {t('sim.months')}</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={84}
                    step={6}
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, hsl(252 100% 69%) ${((duration - 6) / 78) * 100}%, hsl(240 25% 18%) ${((duration - 6) / 78) * 100}%)`,
                      height: '6px',
                      borderRadius: '3px',
                    }}
                  />
                  <div className="flex justify-between text-xs text-mist mt-2">
                    <span>6 {t('sim.months')}</span>
                    <span>84 {t('sim.months')}</span>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="text-sm font-medium text-mist mb-3 block">{t('sim.purpose')}</label>
                  <div className="flex flex-wrap gap-2">
                    {purposeKeys.map(key => (
                      <button
                        key={key}
                        onClick={() => setPurpose(key)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          purpose === key
                            ? 'bg-primary text-primary-foreground shadow-[0_4px_16px_hsla(252,100%,69%,0.3)]'
                            : 'bg-surface text-mist hover:text-foreground border border-border/30'
                        }`}
                      >
                        {t(`sim.purpose.${key}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="glass-card rounded-2xl p-6 text-center border-glow">
                    <div className="text-sm text-mist mb-2">{t('sim.monthly')}</div>
                    <div className="font-mono font-bold text-4xl sm:text-5xl text-gradient-indigo">
                      {formatCurrency(monthly)}
                    </div>
                    <div className="text-xs text-mist mt-2">/ {t('sim.months').replace(/s$/, '')}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4 text-center">
                      <div className="text-xs text-mist mb-1">{t('sim.rate')}</div>
                      <div className="font-mono font-bold text-xl text-amber">{taeg.toFixed(2)}%</div>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center">
                      <div className="text-xs text-mist mb-1">{t('sim.total')}</div>
                      <div className="font-mono font-bold text-xl text-teal">{formatCurrency(totalCost)}</div>
                    </div>
                  </div>

                  <a
                    href="/dashboard"
                    className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_32px_hsla(252,100%,69%,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t('sim.apply')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Amortization */}
            <div className="mt-10">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="flex items-center gap-2 text-sm font-medium text-mist hover:text-foreground transition-colors"
              >
                {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {t('sim.amortization')}
              </button>
              {showAmortization && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-auto max-h-80 rounded-xl border border-border/30"
                >
                  <table className="w-full text-sm">
                    <thead className="bg-surface sticky top-0">
                      <tr className="text-mist text-xs">
                        <th className="py-3 px-4 text-left">{t('sim.month')}</th>
                        <th className="py-3 px-4 text-right">{t('sim.capital')}</th>
                        <th className="py-3 px-4 text-right">{t('sim.interest')}</th>
                        <th className="py-3 px-4 text-right">{t('sim.remaining')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map(row => (
                        <tr key={row.month} className="border-t border-border/20 hover:bg-surface/50">
                          <td className="py-2.5 px-4 font-mono text-mist">{row.month}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-foreground">{formatCurrency(row.capital)}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-amber">{formatCurrency(row.interest)}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-mist">{formatCurrency(row.remaining)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
