import { useState, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Lock } from 'lucide-react';

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
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-lavender mb-4 tracking-tight">
            {t('sim.title')}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">{t('sim.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Security bar */}
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Lock className="w-3 h-3 text-accent" />
            <span>AES-256 encrypted · RGPD</span>
          </div>

          <div className="card-elevated rounded-2xl p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Controls */}
              <div className="space-y-10">
                {/* Amount */}
                <div>
                  <div className="flex justify-between items-baseline mb-5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('sim.amount')}</label>
                    <span className="font-mono font-semibold text-2xl text-foreground">{formatCurrency(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={500} max={75000}
                    step={amount < 5000 ? 100 : amount < 20000 ? 500 : 1000}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, hsl(217 91% 60%) ${((amount - 500) / 74500) * 100}%, hsl(220 15% 15%) ${((amount - 500) / 74500) * 100}%)`,
                      height: '4px', borderRadius: '2px',
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                    <span>500 €</span><span>75 000 €</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-baseline mb-5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('sim.duration')}</label>
                    <span className="font-mono font-semibold text-2xl text-foreground">{duration} {t('sim.months')}</span>
                  </div>
                  <input
                    type="range"
                    min={6} max={84} step={6}
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, hsl(217 91% 60%) ${((duration - 6) / 78) * 100}%, hsl(220 15% 15%) ${((duration - 6) / 78) * 100}%)`,
                      height: '4px', borderRadius: '2px',
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                    <span>6 {t('sim.months')}</span><span>84 {t('sim.months')}</span>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 block">{t('sim.purpose')}</label>
                  <div className="flex flex-wrap gap-2">
                    {purposeKeys.map(key => (
                      <button
                        key={key}
                        onClick={() => setPurpose(key)}
                        className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          purpose === key
                            ? 'bg-primary text-primary-foreground shadow-[0_2px_12px_hsla(217,91%,60%,0.25)]'
                            : 'bg-surface text-muted-foreground hover:text-foreground border border-border/30'
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
                  {/* Monthly — THE dominant number */}
                  <div className="card-elevated rounded-xl p-8 text-center">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('sim.monthly')}</div>
                    <div className="font-mono font-semibold text-[clamp(2rem,4vw,3.25rem)] text-foreground leading-none">
                      {formatCurrency(monthly)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-3">/ {t('sim.months').replace(/s$/, '')}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-elevated rounded-lg p-5 text-center">
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5">{t('sim.rate')}</div>
                      <div className="font-mono font-semibold text-lg text-foreground">{taeg.toFixed(2)}%</div>
                    </div>
                    <div className="card-elevated rounded-lg p-5 text-center">
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5">{t('sim.total')}</div>
                      <div className="font-mono font-semibold text-lg text-foreground">{formatCurrency(totalCost)}</div>
                    </div>
                  </div>

                  <a
                    href="/dashboard"
                    className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_4px_24px_hsla(217,91%,60%,0.25)]"
                  >
                    {t('sim.apply')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Amortization */}
            <div className="mt-10 pt-8 border-t border-border/20">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {t('sim.amortization')}
              </button>
              {showAmortization && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-auto max-h-80 rounded-lg border border-border/20"
                >
                  <table className="w-full text-sm">
                    <thead className="bg-surface sticky top-0">
                      <tr className="text-muted-foreground text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4 text-left font-medium">{t('sim.month')}</th>
                        <th className="py-3 px-4 text-right font-medium">{t('sim.capital')}</th>
                        <th className="py-3 px-4 text-right font-medium">{t('sim.interest')}</th>
                        <th className="py-3 px-4 text-right font-medium">{t('sim.remaining')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map(row => (
                        <tr key={row.month} className="border-t border-border/10 hover:bg-surface/50">
                          <td className="py-2.5 px-4 font-mono text-muted-foreground text-xs">{row.month}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-foreground text-xs">{formatCurrency(row.capital)}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-muted-foreground text-xs">{formatCurrency(row.interest)}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-muted-foreground text-xs">{formatCurrency(row.remaining)}</td>
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
