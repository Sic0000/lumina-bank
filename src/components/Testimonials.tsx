import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Marie D.', role: 'Cadre, Paris', rating: 5, key: 'Réponse en 3 minutes, fonds reçus le jour même. Impressionnant.' },
  { name: 'Thomas L.', role: 'Artisan, Lyon', rating: 5, key: 'Interface claire, taux compétitif. Je recommande sans hésiter.' },
  { name: 'Sarah K.', role: 'Médecin, Bordeaux', rating: 5, key: 'Processus entièrement digital, aucun papier à envoyer par courrier.' },
  { name: 'Jean-Pierre M.', role: 'Retraité, Nice', rating: 4, key: 'Même à mon âge, tout était simple et bien expliqué.' },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-lavender mb-4 tracking-tight">
            {t('test.title')}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">{t('test.subtitle')}</p>
          <div className="flex items-center justify-center gap-1 mt-5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-4 h-4 fill-amber text-amber" />
            ))}
            <span className="ml-2 font-mono font-semibold text-sm text-foreground">4.9/5</span>
            <span className="text-muted-foreground text-xs ml-2">Trustpilot</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-elevated rounded-xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6">"{t.key}"</p>
              <div>
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
