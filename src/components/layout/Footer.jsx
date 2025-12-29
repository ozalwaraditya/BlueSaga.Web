import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0a3d62',
      color: '#ffffff',
      padding: '40px 20px',
      borderTop: '4px solid #f39c12'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Company */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#f39c12'
            }}>
              BlueSaga
            </h3>
            <p style={{
              color: '#dff9fb',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Quality products at amazing prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#ffffff'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Shop', 'About Us', 'Contact', 'Track Order'].map((link, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a
                    href="#"
                    style={{
                      color: '#dff9fb',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#f39c12'}
                    onMouseLeave={(e) => e.target.style.color = '#dff9fb'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#ffffff'
            }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f39c12';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#dff9fb',
            fontSize: '0.9rem',
            margin: 0
          }}>
            © {new Date().getFullYear()} BlueSaga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;