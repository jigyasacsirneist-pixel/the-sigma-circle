import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-sm">CSIR</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">CSIR-NEIST</h3>
                <p className="text-primary-foreground/70 text-sm">
                  North East Institute of Science & Technology
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-6 leading-relaxed">
              The Sigma Circle is a Maths Club initiative under the Jigyasa program, 
              fostering scientific temperament and mathematical thinking among students.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-science-gold hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {["About Jigyasa", "Activities", "Gallery", "Resources", "FAQs"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-science-gold transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-science-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  CSIR-NEIST, Jorhat, Assam - 785006, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-science-gold flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  +91 376 2370121
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-science-gold flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  jigyasa@neist.res.in
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} CSIR-NEIST. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Jigyasa Nodal Officer:</span>
              <span className="text-primary-foreground">Dr. Scientist Name</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
