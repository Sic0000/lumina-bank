import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary border-t border-border py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-display font-extrabold text-xs text-primary">PF</span>
              </div>
              <span className="font-display font-bold text-foreground">Prime<span className="text-primary">Finance</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t('footer.description')}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-5">Legal</h4>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.legal')}</a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.terms')}</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-5">{t('footer.contact')}</h4>
            <p className="text-sm text-muted-foreground">contact@primefinance.eu</p>
            <p className="text-sm text-muted-foreground">+33 1 XX XX XX XX</p>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">{t('footer.rights')}</p>
          <p className="text-xs text-muted-foreground/50 text-center mt-2">{t('footer.acpr')}</p>
        </div>
      </div>
    </footer>
  );
}
