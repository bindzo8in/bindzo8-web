'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Methodology.module.css';

// Import your assets. In Next.js, these imports return objects.
// We will use the standard <img> tag instead of next/image for the animated ball 
// to ensure GSAP can directly manipulate the transform properties without Next.js wrappers interfering.
// import trackPath from '@/public/home/Vector 1 2.svg';
// import redBall from '@/public/home/Red-Ball-Shining-3D-Transparent-PNG.svg';
// import knotLogo from '@/public/home/Untitled-1 1.svg';
// import spiral3D from '@/public/home/file_84354604-6d6d-4ca6-8124-d1ac888c7893_690332fe8d6285.85986215 2.svg';
// import blackHole from '@/public/home/methodology/black-hole 1.svg';

const trackPath = "/home/methodology/step.svg";
const redBall = "/home/methodology/red_ball.svg";
const knotLogo = "/home/methodology/logo.svg";
const spiral3D = "/home/methodology/role.svg";
const blackHole = "/home/methodology/ellipse.svg";

// Register plugin safely for Next.js SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Methodology = () => {
  // Add TypeScript definitions for the refs
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // gsap.context handles animation cleanup automatically on unmount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, 
        },
      });

      // --- Animation Timeline ---
      tl.to(ballRef.current, {
        x: '35vw',
        y: '32vh',
        ease: 'power1.inOut',
      })
      .to(ballRef.current, {
        rotation: 360,
        duration: 0.5,
        ease: 'none',
      })
      .to(ballRef.current, {
        x: '-5vw',
        y: '65vh',
        ease: 'power1.inOut',
      })
      .to(ballRef.current, {
        x: '15vw',
        y: '88vh',
        ease: 'power2.in',
      })
      .to(ballRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.methodologyContainer} ref={containerRef}>
      <h1 className={styles.mainTitle}>Our Methodology</h1>

      {/* The Animating Red Ball (using .src for Next.js image imports) */}
      <img
        src={redBall}
        alt="Red Ball"
        className={styles.animatedBall}
        ref={ballRef}
      />

      {/* SECTION 01: BRANDING */}
      <section className={`${styles.row} ${styles.section01}`}>
        <div className={`${styles.contentBlock} ${styles.leftAlign}`}>
          <div className={styles.number}>01</div>
          <p>
            Branding gives your business a unique identity that builds trust, attracts
            customers, and sets you apart. We help you create a powerful brand that
            connects, inspires, and drives growth.
          </p>
        </div>
        <div className={`${styles.visualBlock} ${styles.trackVisual}`}>
          <img src={trackPath} alt="Track" className={styles.trackImg} />
        </div>
        <div className={`${styles.label} ${styles.rightAlign}`}>
          <h3>BRANDING</h3>
        </div>
      </section>

      {/* SECTION 02: MARKETING */}
      <section className={`${styles.row} ${styles.section02}`}>
        <div className={`${styles.label} ${styles.leftAlign}`}>
          <h3>MARKETING</h3>
        </div>
        <div className={`${styles.visualBlock} ${styles.centerVisual}`}>
          <img src={knotLogo} alt="Knot Logo" className={styles.knotImg} />
        </div>
        <div className={`${styles.contentBlock} ${styles.rightAlign}`}>
          <div className={styles.number}>02</div>
          <p>
            Marketing connects your brand with the right audience, builds awareness,
            and drives sales. We help you create impact strategies that attract,
            engage, and grow your business.
          </p>
        </div>
      </section>

      {/* SECTION 03: DEVELOPMENT */}
      <section className={`${styles.row} ${styles.section03}`}>
        <div className={`${styles.contentBlock} ${styles.leftAlign}`}>
          <div className={styles.number}>03</div>
          <p>
            Development drives growth, innovation, and success in business. We help
            you build strong strategies and solutions to move your business forward.
          </p>
        </div>
        <div className={`${styles.visualBlock} ${styles.centerVisual}`}>
          <img src={spiral3D} alt="Spiral" className={styles.spiralImg} />
        </div>
        <div className={`${styles.label} ${styles.rightAlign}`}>
          <h3>DEVELOPMENT</h3>
        </div>
      </section>

      {/* BLACK HOLE ENDPOINT */}
      <section className={styles.blackHoleSection}>
        <img src={blackHole} alt="Black Hole" className={styles.blackHoleImg} />
      </section>
    </div>
  );
};

export default Methodology;