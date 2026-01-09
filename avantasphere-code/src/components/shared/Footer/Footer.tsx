"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import "./footer.css";

export default function Footer() {
  const menuSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Careers', path: '#' },
        { label: 'News', path: '#' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Categories', path: '/categories' },
        { label: 'All Products', path: '/products' },
        { label: 'Request Quote', path: '/quote' },
        { label: 'Bulk Orders', path: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '#' },
        { label: 'Documentation', path: '#' },
        { label: 'Terms of Service', path: '#' },
        { label: 'Privacy Policy', path: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="footer-glass">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <img
                src="/images/logos/AvantaSphere_Logo_2.png"
                alt="AventaSphere Logo"
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">
              Your trusted partner for industrial equipment and manufacturing solutions. Quality products, competitive prices, and exceptional service.
            </p>

            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="social-link"
                  >
                    <Icon size={18} className="social-icon" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-menus">
            <div className="footer-menu-grid">
              {menuSections.map((section) => (
                <div key={section.title} className="footer-menu-section">
                  <h6 className="footer-menu-title">
                    {section.title}
                  </h6>
                  <ul className="footer-menu-list">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.path}
                          className="footer-menu-link"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} AventaSphere. All rights reserved.
            </p>
            <div className="footer-contact-links">
              <a
                href="mailto:info@aventasphere.com"
                className="footer-contact-item"
              >
                <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>info@aventasphere.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="footer-contact-item"
              >
                <svg className="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}