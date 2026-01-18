import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { useSiteSettings, SocialSettings, ContactSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: socialSettings } = useSiteSettings<SocialSettings>('social');
  const { data: contactSettings } = useSiteSettings<ContactSettings>('contact');

  const socialLinks = [
    { icon: Github, href: socialSettings?.github || "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: socialSettings?.linkedin || "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: socialSettings?.twitter || "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: socialSettings?.instagram || "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: `mailto:${contactSettings?.email || "hello@example.com"}`, label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-gradient mb-2">
              Portfolio
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Creating digital experiences that inspire
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
