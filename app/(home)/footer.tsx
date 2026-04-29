import React from 'react'

const Footer = () => {
  return (
    <footer style={{ background: '#fdf4f6', fontFamily: 'sans-serif', position: 'relative', zIndex: 10 }}>
      <div style={{ padding: '36px 40px 32px' }}>

        {/* Top row: Brand + Icons + Follow Us label */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '36px' }}>
          <div style={{ minWidth: '160px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '6px',
                background: '#1f2937', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 800,
              }}>B</div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937', letterSpacing: '0.04em' }}>BINDZO 8</span>
            </div>
            <p style={{ fontSize: '10px', color: '#9ca3af', margin: '0 0 4px', letterSpacing: '0.08em' }}>TECHNO SOLUTIONS</p>
            <p style={{ fontSize: '12px', color: '#e05a8a', margin: 0, fontWeight: 500 }}>Bindzo 8 Techno Solutions</p>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: '18px', alignItems: 'center', paddingTop: '4px' }}>
            {['💡', '📋', '✅', '💬', '📱', '🎯'].map((icon, i) => (
              <span key={i} style={{ fontSize: '28px' }}>{icon}</span>
            ))}
          </div>

          <div style={{ width: '80px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', margin: 0 }}>Follow Us</p>
          </div>
        </div>

        {/* Main content row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Quick Links */}
          <div style={{ flex: '0 0 140px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', margin: '0 0 14px' }}>Quick Links</p>
            {['Home', 'About', 'Services', 'Products', 'Career', 'Contact'].map(link => (
              <p key={link} style={{ fontSize: '12px', color: '#6b7280', margin: '7px 0', cursor: 'pointer' }}>{link}</p>
            ))}
          </div>

          {/* Our Features */}
          <div style={{ flex: '0 0 160px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', margin: '0 0 14px' }}>Our Features</p>
            {['Why Choose Us', 'Who We Work', 'What We do', 'Our Achievements', 'Terms Of Services', 'Privacy Policy'].map(link => (
              <p key={link} style={{ fontSize: '12px', color: '#6b7280', margin: '7px 0', cursor: 'pointer' }}>{link}</p>
            ))}
          </div>

          {/* Get Newsletter */}
          <div style={{ flex: '0 0 190px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', margin: '0 0 6px' }}>Get Newsletter</p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 14px', lineHeight: 1.6 }}>
              Never miss a deal or update.<br />Stay connected with us!
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              border: '1px solid #e5d5dc', borderRadius: '8px',
              padding: '6px 10px', background: '#fff',
            }}>
              <span style={{ fontSize: '12px' }}>✉️</span>
              <input
                placeholder="example@gmail.com"
                style={{
                  border: 'none', outline: 'none', fontSize: '11px',
                  color: '#9ca3af', background: 'transparent', width: '100%',
                }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div style={{  paddingLeft: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>📍</span>
              <span style={{ fontSize: '12px', color: '#374151' }}>Coimbatore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>📞</span>
              <span style={{ fontSize: '12px', color: '#374151' }}>+91 98843 44503</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', marginTop: '1px' }}>✉️</span>
              <div>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0' }}>bindzo8in@gmail.com</p>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '3px 0' }}>info@bindzo8.com</p>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0' }}>contact@bindzo8.com</p>
              </div>
            </div>
            <button style={{
              padding: '6px 16px',
              background: 'transparent',
              color: '#374151',
              fontSize: '11px',
              fontWeight: 600,
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
            }}>
              Get a Quote
            </button>
          </div>

          {/* Social icons — aligned under "Follow Us" label */}
          <div style={{ width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {[
              { icon: 'f', color: '#1877f2' },
              { icon: 'X', color: '#1f2937' },
              { icon: 'G', color: '#ea4335' },
              { icon: 'in', color: '#0a66c2' },
              { icon: 'P', color: '#e60023' },
              { icon: '◎', color: '#c13584' },
            ].map(({ icon, color }) => (
              <div key={icon} style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1.5px solid #e5d5dc', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700, color,
                cursor: 'pointer',
              }}>
                {icon}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: '#e05a8a',
        textAlign: 'center',
        padding: '13px',
        fontSize: '12px',
        color: '#fff',
        letterSpacing: '0.01em',
      }}>
        Copyright © 2025. Bindzo 8 IT Solutions All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer