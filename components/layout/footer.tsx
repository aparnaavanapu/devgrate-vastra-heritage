'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { TempleBorder, OrnamentalDivider } from '@/components/ornaments';

const footerLinks = {
  Shop: [
    { label: 'Silk Sarees', href: '/shop?category=Silk' },
    { label: 'Banarasi Sarees', href: '/shop?category=Banarasi' },
    { label: 'Kanjivaram Sarees', href: '/shop?category=Kanjivaram' },
    { label: 'Bridal Collection', href: '/shop?category=Bridal' },
    { label: 'New Arrivals', href: '/shop?sort=new' },
    { label: 'Bestsellers', href: '/shop?sort=popular' },
  ],
  Help: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Exchange', href: '/returns' },
    { label: 'Size & Care Guide', href: '/care-guide' },
    { label: 'FAQs', href: '/contact' },
  ],
  Company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-maroon-dark text-ivory mt-20">
      <div className="text-gold/30 h-2">
        <TempleBorder className="w-full h-2" />
      </div>

      {/* Newsletter strip */}
      <div className="border-b border-gold/20">
        <div className="container mx-auto px-4 py-10 text-center">
          <h3 className="font-serif text-2xl md:text-3xl mb-2">Join Our Heritage Circle</h3>
          <p className="text-ivory/70 text-sm mb-6 max-w-md mx-auto">
            Subscribe for early access to new collections, weaving stories, and exclusive offers.
          </p>
          <form
            className="flex max-w-md mx-auto gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = new FormData(form).get('email') as string;
              if (!email) return;
              await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
              });
              form.reset();
              alert('Thank you for subscribing!');
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 bg-ivory/10 border border-gold/30 rounded-md text-ivory placeholder:text-ivory/50 text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-gold text-maroon rounded-md font-medium text-sm hover:bg-gold-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="font-serif text-xl text-gold mb-3">{siteConfig.name}</h4>
            <p className="text-ivory/60 text-sm leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-gold transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-lg text-gold mb-4 small-caps tracking-wide">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ivory/60 hover:text-gold text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-4 small-caps tracking-wide">Visit Us</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city}, {siteConfig.address.country}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <OrnamentalDivider className="my-8 opacity-50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="small-caps tracking-wide">Handcrafted with love in India</p>
        </div>
      </div>
    </footer>
  );
}
