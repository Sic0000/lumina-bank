import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Calendar, TrendingUp, FileText, Plus, CreditCard,
  Download, Mail, Clock, ChevronRight, Lock, Upload, CheckCircle2, ArrowLeft, ArrowRight, Shield
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
  const color = score >= 700 ? 'hsl(160 84% 39%)' : score >= 500 ? 'hsl(38 92% 50%)' : 'hsl(0 72% 51%)';
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="none" stroke="hsl(220 14% 91%)" strokeWidth="6" />
        <motion.circle
          cx="64" cy="64" r="60" fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-semibold text-2xl" style={{ color }}>{score}</span>
        <span className="text-[10px] text-muted-foreground">/1000</span>
      </div>
    </div>
  );
}

type Tab = 'overview' | 'documents' | 'newloan';

export default function Dashboard() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              {t('dash.welcome')}, {mockData.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Espace client sécurisé</p>
          </motion.div>

          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {[
              { key: 'overview' as Tab, icon: Wallet, label: t('dash.balance').split(' ')[0] },
              { key: 'documents' as Tab, icon: FileText, label: t('dash.documents') },
              { key: 'newloan' as Tab, icon: Plus, label: t('dash.newloan') },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  tab === item.key
                    ? 'bg-primary text-primary-foreground shadow-[0_2px_12px_hsla(0,78%,52%,0.2)]'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="grid lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 card-elevated rounded-2xl p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t('dash.balance')}</div>
          </div>
        </div>
        <div className="font-mono font-semibold text-[clamp(2rem,4vw,3.5rem)] text-foreground leading-none mb-10">
          {formatCurrency(mockData.balance)}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] text-muted-foreground uppercase tracking-wider">
            <span>Remboursé : 56%</span>
            <span>Capital initial : {formatCurrency(53200)}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '56%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        <div className="mt-10 p-6 rounded-xl bg-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">{t('dash.next')}</div>
              <div className="text-xs text-muted-foreground">{mockData.nextPayment.date} — dans {mockData.nextPayment.daysLeft} jours</div>
            </div>
          </div>
          <div className="font-mono font-semibold text-xl text-foreground">
            {formatCurrency(mockData.nextPayment.amount)}
          </div>
        </div>
      </div>

      <div className="card-elevated rounded-2xl p-10 flex flex-col items-center justify-center">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-8">{t('dash.score')}</div>
        <ScoreGauge score={mockData.score} />
        <div className="mt-5 px-3 py-1.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="max-w-3xl"
    >
      <div className="space-y-3">
        {mockData.documents.map((doc, i) => (
          <div key={i} className="card-elevated rounded-xl p-6 flex items-center justify-between hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{doc.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{doc.date} — {doc.type}</div>
              </div>
            </div>
            <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/8 transition-colors">
              <Download className="w-4 h-4 text-muted-foreground" />
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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-20"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-3">{t('dash.submitted')}</h2>
        <p className="text-sm text-muted-foreground mb-8">Référence : PF-2026-{Math.floor(Math.random() * 90000 + 10000)}</p>
        <div className="card-elevated rounded-xl p-6">
          <div className="flex items-center gap-3 text-left">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <p className="text-muted-foreground text-sm">{t('dash.contact')}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
              i === step ? 'bg-primary/15 text-primary' :
              i < step ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i < step ? 'bg-accent text-primary-foreground' :
                i === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>{i < step ? '✓' : i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-primary" />
          <span>AES-256 encrypted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-primary" />
          <span>{t('form.secure')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{t('form.estimated_time')}</span>
        </div>
      </div>

      <div className="card-elevated rounded-2xl p-8 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
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

        <div className="flex justify-between mt-10 pt-6 border-t border-border">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('form.prev')}
            </button>
          ) : <div />}
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_2px_12px_hsla(0,78%,52%,0.2)]">
              {t('form.next')} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)} className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-[0_2px_12px_hsla(160,84%,39%,0.2)]">
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
      <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
      <input
        type={type}
        value={data?.[name] || ''}
        onChange={e => update?.(name, e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none text-sm"
      />
    </div>
  );
}

function SelectField({ label, name, options, data, update }: { label: string; name: string; options: { value: string; label: string }[]; data?: Record<string, string>; update?: (k: string, v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
      <select
        value={data?.[name] || ''}
        onChange={e => update?.(name, e.target.value)}
        className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none text-sm appearance-none"
      >
        <option value="">—</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function StepIdentity({ t, data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.step1')}</h3>
      <SelectField label={t('form.civility')} name="civility" data={data} update={update} options={[{ value: 'mr', label: t('form.mr') }, { value: 'mrs', label: t('form.mrs') }]} />
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.firstname')} name="firstname" data={data} update={update} />
        <InputField label={t('form.lastname')} name="lastname" data={data} update={update} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.birthdate')} name="birthdate" type="date" data={data} update={update} />
        <InputField label={t('form.nationality')} name="nationality" data={data} update={update} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.phone')} name="phone" type="tel" data={data} update={update} />
        <InputField label={t('form.email')} name="email" type="email" data={data} update={update} />
      </div>
      <InputField label={t('form.address')} name="address" data={data} update={update} />
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.city')} name="city" data={data} update={update} />
        <InputField label={t('form.zipcode')} name="zipcode" data={data} update={update} />
      </div>
    </div>
  );
}

function StepSituation({ t, data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.step2')}</h3>
      <SelectField label={t('form.status')} name="status" data={data} update={update} options={[
        { value: 'cdi', label: t('form.cdi') },
        { value: 'cdd', label: t('form.cdd') },
        { value: 'freelance', label: t('form.freelance') },
        { value: 'retired', label: t('form.retired') },
      ]} />
      <InputField label={t('form.employer')} name="employer" data={data} update={update} />
      <div className="grid sm:grid-cols-2 gap-5">
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
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.step3')}</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.income')} name="income" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.other_income')} name="other_income" type="number" data={data} update={update} placeholder="€" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.rent')} name="rent" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.credits')} name="credits" type="number" data={data} update={update} placeholder="€" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label={t('form.alimony')} name="alimony" type="number" data={data} update={update} placeholder="€" />
        <InputField label={t('form.savings')} name="savings" type="number" data={data} update={update} placeholder="€" />
      </div>
    </div>
  );
}

function StepProject({ t, data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.step4')}</h3>
      <div className="grid sm:grid-cols-2 gap-5">
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
        <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{t('form.description')}</label>
        <textarea
          value={data?.description || ''}
          onChange={e => update?.('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none text-sm resize-none"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
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
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.step5')}</h3>
      {docs.map((doc, i) => (
        <div key={i}>
          <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{doc}</label>
          <div className="border border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{t('form.upload')}</p>
            <p className="text-[10px] text-muted-foreground/50 mt-1">{t('form.formats')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepValidation({ t, data }: StepProps) {
  const [consent, setConsent] = useState(false);
  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-lg text-foreground">{t('form.summary')}</h3>
      <div className="space-y-0">
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
          <div key={i} className="flex justify-between py-3 border-b border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <label className="flex items-start gap-3 mt-8 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary/20"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">{t('form.consent')}</span>
      </label>
    </div>
  );
}
