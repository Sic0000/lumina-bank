import { useLanguage } from '@/i18n/LanguageContext';
import { Shield } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-midnight border-t border-border/30 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">NEXUS FINANCE</span>
            </div>
            <p className="text-sm text-mist leading-relaxed max-w-xs">{t('footer.description')}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm mb-4">Legal</h4>
            <a href="#" className="block text-sm text-mist hover:text-foreground transition-colors">{t('footer.legal')}</a>
            <a href="#" className="block text-sm text-mist hover:text-foreground transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="block text-sm text-mist hover:text-foreground transition-colors">{t('footer.terms')}</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm mb-4">{t('footer.contact')}</h4>
            <p className="text-sm text-mist">contact@nexus-finance.eu</p>
            <p className="text-sm text-mist">+33 1 XX XX XX XX</p>
          </div>
        </div>
        <div className="border-t border-border/30 pt-8">
          <p className="text-xs text-mist text-center">{t('footer.rights')}</p>
          <p className="text-xs text-mist/60 text-center mt-2">{t('footer.acpr')}</p>
        </div>
      </div>
    </footer>
  );
}
