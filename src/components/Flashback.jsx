import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Flashback = () => {
    const sectionRef = useRef(null);
    const stripRef = useRef(null);
    const row1Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header Reveal
            const headerLine = sectionRef.current.querySelector('.header-reveal .text-reveal-line');
            if (headerLine) {
                gsap.to(headerLine, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out"
                });
            }

            // Continuous Marquee Animation - Paused when off-screen
            const width = row1Ref.current.scrollWidth;
            const marqueeTween = gsap.to(row1Ref.current, {
                xPercent: -50,
                ease: "none",
                duration: 40,
                repeat: -1,
                paused: true // Start paused
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => marqueeTween.play(),
                onLeave: () => marqueeTween.pause(),
                onEnterBack: () => marqueeTween.play(),
                onLeaveBack: () => marqueeTween.pause()
            });

            // Reveal items inside the marquee as the section comes into view
            const cards = row1Ref.current.querySelectorAll('.flash-item');
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                },
                y: 100,
                opacity: 0,
                rotateX: -20,
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // CHANGE YOUR IMAGE PATHS HERE
    const memories = [
        { 
            year: "2022", 
            title: "Level 1", 
            color: "#FFD700",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFja2VyfGVufDB8fDB8fHww"  // <- CHANGE THIS PATH
        },
        { 
            year: "2023", 
            title: "Level 2", 
            color: "#00D9FF",
            image: "https://plus.unsplash.com/premium_photo-1714618835760-5b2175ad3249?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFja2VyfGVufDB8fDB8fHww"  // <- CHANGE THIS PATH
        },
        { 
            year: "2024", 
            title: "Level 3", 
            color: "#FF0080",
            image: "https://images.unsplash.com/photo-1592609930961-219235eded71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxoYWNrZXJ8ZW58MHx8MHx8fDA%3D"  // <- CHANGE THIS PATH
        },
        { 
            year: "2025", 
            title: "Level 4", 
            color: "#7B61FF",
            image: "https://images.unsplash.com/photo-1532522750741-628fde798c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhY2tlcnxlbnwwfHwwfHx8MA%3D%3D"  // <- CHANGE THIS PATH
        },
        { 
            year: "Legacy", 
            title: "Level 5", 
            color: "#00FF88",
            image: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhY2tlcnxlbnwwfHwwfHx8MA%3D%3D"  // <- CHANGE THIS PATH
        }
    ];

    const marqueeItems = [...memories, ...memories];

    return (
        <section id="flashback" ref={sectionRef} style={{
            minHeight: '60vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '100px 0',
        }}>

            <div style={{ paddingLeft: '5vw', marginBottom: '2rem' }}>
                <h2 className="glow-text header-reveal text-reveal-mask" style={{ fontSize: '3rem', color: 'var(--text-main)' }}>
                    <span className="text-reveal-line">Archive</span>
                </h2>
            </div>

            {/* Moving Strip Wrapper */}
            <div ref={stripRef} style={{ width: '100%', overflow: 'hidden' }}>
                <div ref={row1Ref} style={{
                    display: 'flex',
                    gap: '20px',
                    width: 'max-content',
                    paddingLeft: '20px'
                }}>
                    {marqueeItems.map((mem, i) => (
                        <div key={i} className="flash-item glass-panel" style={{
                            width: '350px',
                            height: '250px',
                            flexShrink: 0,
                            position: 'relative',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: `1px solid ${mem.color}40`,
                            background: 'var(--glass-bg)',
                            boxShadow: `0 0 20px ${mem.color}20`
                        }}>
                            {/* Background Image */}
                            {mem.image && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${mem.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(0.4)',
                                    zIndex: 0
                                }}></div>
                            )}

                            {/* Dark Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                                zIndex: 1
                            }}></div>

                            {/* Year Number BG */}
                            <h3 style={{ 
                                fontSize: '4rem', 
                                fontWeight: 900, 
                                color: `${mem.color}15`, 
                                position: 'absolute',
                                zIndex: 2
                            }}>
                                {mem.year}
                            </h3>

                            {/* Title */}
                            <p style={{ 
                                zIndex: 3, 
                                fontSize: '1.5rem', 
                                color: mem.color, 
                                fontWeight: 700,
                                textShadow: `0 0 20px ${mem.color}80`,
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                {mem.title}
                            </p>

                            {/* Accent Border Glow */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '3px',
                                background: `linear-gradient(90deg, transparent, ${mem.color}, transparent)`,
                                zIndex: 4
                            }}></div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Flashback;