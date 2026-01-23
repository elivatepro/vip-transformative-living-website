import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { BookCallLink } from "@/components/book-call-button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/logo-gold-texture.png" 
                alt="VIP Transformative Living" 
                width={180} 
                height={50} 
                className="w-auto h-12 mb-2"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformative life coaching for men navigating pivotal crossroads. 
              Align your values, identity, and purpose to achieve breakthrough.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com/VIPTLcoach" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold-hover transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com/coachwayne.vip" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold-hover transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com/in/wayne-dawson-tranformational-coach" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold-hover transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com/WayneDVIP" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold-hover transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-serif font-semibold text-gold-gradient mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-gold-hover transition-colors">About Coach Wayne</Link></li>
              <li><Link href="/coaching" className="text-muted-foreground hover:text-gold-hover transition-colors">Coaching Programs</Link></li>
              <li><Link href="/speaking" className="text-muted-foreground hover:text-gold-hover transition-colors">Speaking Services</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-gold-hover transition-colors">Events & Workshops</Link></li>
              <li><Link href="/resources" className="text-muted-foreground hover:text-gold-hover transition-colors">Free Resources</Link></li>
              <li><Link href="/newsletter" className="text-muted-foreground hover:text-gold-hover transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          {/* Legal/Quick Links Column */}
          <div>
            <h4 className="font-serif font-semibold text-gold-gradient mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-gold-hover transition-colors">Contact Us</Link></li>
              <li><BookCallLink className="text-muted-foreground hover:text-gold-hover transition-colors font-sans text-sm">Book a Discovery Call</BookCallLink></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-gold-hover transition-colors">Admin Login</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-gold-hover transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-gold-hover transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif font-semibold text-gold-gradient mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                <span>
                  1451 W. Cypress Creek Road,<br />
                  Suite 300,<br />
                  Fort Lauderdale, FL 33309
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href="tel:+19547999860" className="hover:text-gold-hover transition-colors">(954) 799-9860</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a href="mailto:waynedawson@viptransformativeliving.com" className="hover:text-gold-hover transition-colors">waynedawson@viptransformativeliving.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} VIP Transformative Living LLC. All rights reserved.</p>
          <p>Designed & Developed by Boko.</p>
        </div>
      </div>
    </footer>
  );
}
