import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Calendar, TrendingUp, FileText, Plus, CreditCard,
  Download, Mail, Clock, ChevronRight, Lock, Upload, CheckCircle2, ArrowLeft, ArrowRight
} from 'lucide-react';

const mockData = {
  name: 'Alexandre',
  balance: 23450.80,
  nextPayment: { amount: 487.32, date: '15 Avr. 2026', daysLeft: 27 },
  score: 782,
  documents: [
    { name: 'Offre de crédit — Prêt Personnel', date: '01/03/2026', type: 'PDF' },
    { name: 'Tableau d\'amortissement', date: '01/03/2026', type: 'PDF' },
    { name: 'Attestation assurance emprunteur', date: '15/02/2026', type: 'PDF' },
    { name: 'Quittance Mars 2026', date: '05/03/2026', type: 'PDF' },
  ],
};

function ScoreGauge({ score }: { score: number }) {
  const pct = (score / 1000) * 100;
  const color = score >= 700 ? 'hsl(166 100% 42%)' : score >= 500 ? 'hsl(33 100% 64%)' : 'hsl(348 100% 69%)';
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="none" stroke="hsl(240 25% 18%)" strokeWidth="8" />
        <motion.circle
          cx="64" cy="64" r="60" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold text-3xl" style={{ color }}>{score}</span>
        <span className="text-xs text-mist">/1000</span>
      </div>
    </div>
  );
}

type Tab = 'overview' | 'documents' | 'newloan';

export default function Dashboard() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-lavender">
              {t('dash.welcome')}, {mockData.name} 👋
            </h1>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { key: 'overview' as Tab, icon: Wallet, label: t('dash.balance').split(' ')[0] },
              { key: 'documents' as Tab, icon: FileText, label: t('dash.documents') },
              { key: 'newloan' as Tab, icon: Plus, label: t('dash.newloan') },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  tab === item.key
                    ? 'bg-primary text-primary-foreground shadow-[0_4px_16px_hsla(252,100%,69%,0.3)]'
                    : 'bg-surface text-mist hover:text-foreground border border-border/30'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'overview' && <OverviewTab key="overview" />}
            {tab === 'documents' && <DocumentsTab key="documents" />}
            {tab === 'newloan' && <LoanFormTab key="newloan" />}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function OverviewTab() {
  const { t } = useLanguage();
  const formatCurrency = (v: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid lg:grid-cols-3 gap-6"
    >
      {/* Balance */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-8 border-glow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div className="text-sm text-mist">{t('dash.balance')}</div>
        </div>
        <div className="font-mono font-bold text-4xl sm:text-5xl text-gradient-indigo mb-8">
          {formatCurrency(mockData.balance)}
        </div>
        
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-mist">
            <span>Remboursé : 56%</span>
            <span>Capital initial : {formatCurrency(53200)}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '56%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(166 100% 42%), hsl(252 100% 69%))' }}
            />
          </div>
        </div>

        {/* Next payment */}
        <div className="mt-8 p-5 rounded-xl bg-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-amber" />
            <div>
              <div className="text-sm font-medium text-foreground">{t('dash.next')}</div>
              <div className="text-xs text-mist">{mockData.nextPayment.date} — dans {mockData.nextPayment.daysLeft} jours</div>
            </div>
          </div>
          <div className="font-mono font-bold text-xl text-foreground">
            {formatCurrency(mockData.nextPayment.amount)}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center">
        <div className="text-sm text-mist mb-6">{t('dash.score')}</div>
        <ScoreGauge score={mockData.score} />
        <div className="mt-4 px-3 py-1.5 rounded-full bg-teal/10 text-teal text-xs font-medium">
          Excellent
        </div>
      </div>
    </motion.div>
  );
}

function DocumentsTab() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl"
    >
      <div className="space-y-3">
        {mockData.documents.map((doc, i) => (
          <div key={i} className="glass-card rounded-xl p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{doc.name}</div>
                <div className="text-xs text-mist">{doc.date} — {doc.type}</div>
              </div>
            </div>
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Download className="w-4 h-4 text-mist" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LoanFormTab() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const update = (key: string, val: string) => setFormData(prev => ({ ...prev, [key]: val }));

  const steps = [
    t('form.step1'), t('form.step2'), t('form.step3'),
    t('form.step4'), t('form.step5'), t('form.step6'),
  ];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-teal" />
        </div>
        <h2 className="font-display font-bold text-2xl text-lavender mb-4">{t('dash.submitted')}</h2>
        <div className="glass-card rounded-2xl p-6 mt-8">
          <div className="flex items-center gap-3 text-left">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <p className="text-mist text-sm">{t('dash.contact')}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      {/* Stepper */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              i === step ? 'bg-primary/20 text-primary' :
              i < step ? 'bg-teal/10 text-teal' : 'bg-surface text-mist'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i < step ? 'bg-teal text-primary-foreground' :
                i === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-mist'
              }`}>{i < step ? '✓' : i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-border shrink-0" />}
          </div>
        ))}
      </div>

      {/* Security bar */}
      <div className="flex items-center gap-2 mb-6 text-xs text-mist">
        <Lock className="w-3.5 h-3.5 text-teal" />
        <span>{t('form.secure')}</span>
        <span className="mx-2">•</span>
        <Clock className="w-3.5 h-3.5" />
        <span>{t('form.estimated_time')}</span>
      </div>

      {/* Form content */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <StepIdentity t={t} data={formData} update={update} />}
            {step === 1 && <StepSituation t={t} data={formData} update={update} />}
            {step === 2 && <StepIncome t={t} data={formData} update={update} />}
            {step === 3 && <StepProject t={t} data={formData} update={update} />}
            {step === 4 && <StepDocuments t={t} />}
            {step === 5 && <StepValidation t={t} data={formData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-surface text-mist hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('form.prev')}
            </button>
          ) : <div />}
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:shadow-[0_8px_32px_hsla(252,100%,69%,0.35)] transition-all">
              {t('form.next')} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-teal text-primary-foreground hover:shadow-[0_8px_32px_hsla(166,100%,42%,0.35)] transition-all">
              {t('form.submit')} <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface StepProps {
  t: (key: string) => string;
  data?: Record<string, string>;
  update?: (key: string, val: string) => void;
}

function InputField({ label, name, type = 'text', data, update, placeholder }: { label: string; name: string; type?: string; data?: Record<string, string>; update?: (k: string, v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-mist mb-2">{label}</label>
      <input
        type={type}
        value={data?.[name] || ''}
        onChange={e => update?.(name, e.target.value)}
        placeholder={placeholder}
        className="w-full h-[52px] px-4 rounded-xl bg-surface border border-border/30 text-foreground placeholder:text-mist/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-body text-sm"
      />
    </div>
  );
}

function SelectField({ label, name, options, data, update }: { label: string; name: string; options: { value: string; label: string }[]; data?: Record<string, string>; update?: (k: string, v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-mist mb-2">{label}</label>
      <select
        value={data?.[name] || ''}
        onChange={e => update?.(name, e.target.value)}
        className="w-full h-[52px] px-4 rounded-xl bg-surface border border-border/30 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-body text-sm appearance-none"
      >
        <option value="" className="bg-surface">—</option>
        {options.map(o => <option key={o.value} value={o.value} className="bg-surface">{o.label}</option>)}
      </select>
    </div>
  );
}

function StepIdentity({ t, data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.step1')}</h3>
      <SelectField label={t('form.civility')} name="civility" data={data} update={update} options={[{ value: 'mr', label: t('form.mr') }, { value: 'mrs', label: t('form.mrs') }]} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.firstname')} name="firstname" data={data} update={update} />
        <InputField label={t('form.lastname')} name="lastname" data={data} update={update} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.birthdate')} name="birthdate" type="date" data={data} update={update} />
        <InputField label={t('form.nationality')} name="nationality" data={data} update={update} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.phone')} name="phone" type="tel" data={data} update={update} />
        <InputField label={t('form.email')} name="email" type="email" data={data} update={update} />
      </div>
      <InputField label={t('form.address')} name="address" data={data} update={update} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.city')} name="city" data={data} update={update} />
        <InputField label={t('form.zipcode')} name="zipcode" data={data} update={update} />
      </div>
    </div>
  );
}

function StepSituation({ t, data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.step2')}</h3>
      <SelectField label={t('form.status')} name="status" data={data} update={update} options={[
        { value: 'cdi', label: t('form.cdi') },
        { value: 'cdd', label: t('form.cdd') },
        { value: 'freelance', label: t('form.freelance') },
        { value: 'retired', label: t('form.retired') },
      ]} />
      <InputField label={t('form.employer')} name="employer" data={data} update={update} />
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.seniority')} name="seniority" type="number" data={data} update={update} />
        <InputField label={t('form.sector')} name="sector" data={data} update={update} />
      </div>
      <SelectField label={t('form.housing')} name="housing" data={data} update={update} options={[
        { value: 'tenant', label: t('form.tenant') },
        { value: 'owner', label: t('form.owner') },
      ]} />
    </div>
  );
}

function StepIncome({ t, data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.step3')}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.income')} name="income" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.other_income')} name="other_income" type="number" data={data} update={update} placeholder="€" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.rent')} name="rent" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.credits')} name="credits" type="number" data={data} update={update} placeholder="€" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.alimony')} name="alimony" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.savings')} name="savings" type="number" data={data} update={update} placeholder="€" />
      </div>
    </div>
  );
}

function StepProject({ t, data, update }: StepProps) {
  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.step4')}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.amount')} name="loan_amount" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.duration')} name="loan_duration" type="number" data={data} update={update} />
      </div>
      <SelectField label={t('form.purpose')} name="purpose" data={data} update={update} options={[
        { value: 'personal', label: 'Projet personnel' },
        { value: 'auto', label: 'Automobile' },
        { value: 'works', label: 'Travaux' },
        { value: 'conso', label: 'Consommation' },
        { value: 'pro', label: 'Professionnel' },
      ]} />
      <div>
        <label className="block text-sm font-medium text-mist mb-2">{t('form.description')}</label>
        <textarea
          value={data?.description || ''}
          onChange={e => update?.('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border/30 text-foreground placeholder:text-mist/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-body text-sm resize-none"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label={t('form.bank')} name="bank" data={data} update={update} />
        <InputField label={t('form.iban')} name="iban" data={data} update={update} placeholder="FR76 XXXX..." />
      </div>
    </div>
  );
}

function StepDocuments({ t }: StepProps) {
  const docs = [
    t('form.id_doc'),
    t('form.proof_address'),
    t('form.payslips'),
    t('form.bank_statements'),
    t('form.tax_notice'),
  ];

  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.step5')}</h3>
      {docs.map((doc, i) => (
        <div key={i}>
          <label className="block text-sm font-medium text-mist mb-2">{doc}</label>
          <div className="border-2 border-dashed border-border/40 rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-mist mx-auto mb-2" />
            <p className="text-sm text-mist">{t('form.upload')}</p>
            <p className="text-xs text-mist/60 mt-1">{t('form.formats')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepValidation({ t, data }: StepProps) {
  const [consent, setConsent] = useState(false);
  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('form.summary')}</h3>
      <div className="space-y-3">
        {[
          [t('form.firstname'), data?.firstname],
          [t('form.lastname'), data?.lastname],
          [t('form.email'), data?.email],
          [t('form.phone'), data?.phone],
          [t('form.status'), data?.status],
          [t('form.income'), data?.income ? `${data.income} €` : ''],
          [t('form.amount'), data?.loan_amount ? `${data.loan_amount} €` : ''],
          [t('form.duration'), data?.loan_duration ? `${data.loan_duration} mois` : ''],
        ].filter(([, v]) => v).map(([label, value], i) => (
          <div key={i} className="flex justify-between py-2 border-b border-border/20">
            <span className="text-sm text-mist">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <label className="flex items-start gap-3 mt-6 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-border/30 bg-surface text-primary focus:ring-primary/20"
        />
        <span className="text-sm text-mist leading-relaxed">{t('form.consent')}</span>
      </label>
    </div>
  );
}
