import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { T } from "../data";

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({target:ref,offset:["start start","end start"]});
  const y    = useTransform(scrollYProgress,[0,1],["0%","18%"]);
  const opac = useTransform(scrollYProgress,[0,0.6],[1,0]);

  const words = [
    {text:"WE CRAFT",   italic:false},
    {text:"DIGITAL",    italic:true},
    {text:"Excellence.",italic:false},
  ];

 const STATS = [
  {v:"100+", label:"DIGITAL PROJECTS"},
  {v:"10+", label:"INDUSTRIES SERVED"},
  {v:"24/7", label:"TECHNICAL SUPPORT"},
  {v:"98%", label:"CLIENT SATISFACTION"},
];

  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      background: T.cream,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingBottom: "clamp(40px, 8vh, 80px)",
      overflow: "hidden"
    }}>
      {/* Dot grid - responsive background size */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.055,
        backgroundImage: `radial-gradient(circle, ${T.inkSoft} 1px, transparent 1px)`,
        backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)"
      }} />
      
      {/* Circle outlines - responsive sizing and positioning */}
      <motion.div 
        initial={{scale:0.7, opacity:0}} 
        animate={{scale:1, opacity:1}} 
        transition={{duration:1.8, ease}}
        style={{
          position: "absolute",
          top: "clamp(-25%, -15vw, -15%)",
          right: "clamp(-20%, -15vw, -10%)",
          width: "min(680px, 80vw)",
          height: "min(680px, 80vw)",
          borderRadius: "50%",
          border: `1px solid ${T.sand}50`,
          pointerEvents: "none"
        }} 
      />
      <motion.div 
        initial={{scale:0.7, opacity:0}} 
        animate={{scale:1, opacity:1}} 
        transition={{duration:1.8, delay:0.15, ease}}
        style={{
          position: "absolute",
          top: "clamp(-15%, -10vw, -7%)",
          right: "clamp(-10%, -8vw, -4%)",
          width: "min(480px, 60vw)",
          height: "min(480px, 60vw)",
          borderRadius: "50%",
          border: `1px solid ${T.sand}30`,
          pointerEvents: "none"
        }} 
      />
      
      {/* Vertical accent line - responsive height and position */}
      <motion.div 
        initial={{scaleY:0}} 
        animate={{scaleY:1}} 
        transition={{duration:1.2, delay:0.4, ease}} 
        style={{
          transformOrigin: "top",
          position: "absolute",
          top: 0,
          right: "clamp(5%, 10%, 13%)",
          width: 1,
          height: "clamp(20vh, 35vh, 44vh)",
          background: `linear-gradient(to bottom, ${T.amber}90, transparent)`
        }} 
      />
      
      {/* Amber blob - responsive size and position */}
      <div style={{
        position: "absolute",
        top: "clamp(10%, 15%, 18%)",
        right: "clamp(2%, 5%, 8%)",
        width: "min(380px, 50vw)",
        height: "min(380px, 50vw)",
        borderRadius: "50%",
        background: `${T.amber}09`,
        filter: "blur(clamp(40px, 8vw, 90px))",
        pointerEvents: "none"
      }} />

      <motion.div style={{
        y,
        opacity: opac,
        position: "relative",
        zIndex: 10,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(60px, 12vh, 128px) clamp(16px, 5vw, 24px) 0",
        width: "100%"
      }}>
        {/* Eyebrow - responsive gap */}
        <motion.div 
          initial={{opacity:0, x:-20}} 
          animate={{opacity:1, x:0}} 
          transition={{duration:0.8, delay:0.2}}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(20px, 4vh, 36px)",
            flexWrap: "wrap"
          }}>
          <span style={{
            width: "clamp(32px, 6vw, 48px)",
            height: 1,
            background: T.amber,
            display: "block"
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(9px, 2vw, 11px)",
            color: T.amber,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            whiteSpace: "nowrap"
          }}>
            Premium Digital Agency · Est. 2022
          </span>
        </motion.div>

        {/* Heading - responsive text */}
        <h1 style={{
          fontFamily: "Georgia,'Playfair Display',serif",
          fontSize: "clamp(2.5rem, 12vw, 8.5rem)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "0.03em",
          color: T.ink,
          marginBottom: "clamp(16px, 3vh, 28px)",
          maxWidth: "min(900px, 100%)"
        }}>
          {words.map((w,wi)=>(
            <span key={wi} style={{display:"block"}}>
              {w.text.split(" ").map((wd,i)=>(
                <span key={i} style={{
                  overflow:"hidden",
                  display:"inline-block",
                  marginRight:"0.22em"
                }}>
                  <motion.span 
                    initial={{y:"115%", rotate:2}} 
                    animate={{y:"0%", rotate:0}}
                    transition={{duration:1, delay:0.3+wi*0.18+i*0.07, ease}}
                    style={{
                      display:"inline-block",
                      fontStyle:w.italic?"italic":"normal",
                      color:w.italic?T.amber:T.ink,
                      fontSize: "inherit"
                    }}>
                    {wd}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Sub + CTA - responsive layout */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(16px, 4vw, 32px)",
          marginTop: "clamp(16px, 3vh, 32px)"
        }}>
          <motion.p 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{duration:0.8, delay:0.9}}
            style={{
              fontFamily: "'Syne',sans-serif",
              color: `${T.ink}70`,
              fontSize: "clamp(15px, 3vw, 17px)",
              maxWidth: "min(400px, 100%)",
              lineHeight: 1.7,
              flex: "1 1 300px"
            }}>
           Web platforms, marketing systems, and content — meticulously crafted to help ambitious brands grow, compete, and lead.
          </motion.p>
          
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{duration:0.8, delay:1.05}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 3vw, 20px)",
              flexWrap: "wrap",
              flex: "1 1 auto",
              justifyContent: "flex-start"
            }}>
            <a href="#work" data-h
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 14px)",
                background: T.ink,
                color: T.cream,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "clamp(12px, 2vh, 18px) clamp(20px, 4vw, 32px)",
                textDecoration: "none",
                transition: "background 0.3s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e=>e.currentTarget.style.background=T.amber}
              onMouseLeave={e=>e.currentTarget.style.background=T.ink}>
              See Our Work <span style={{fontSize: "clamp(16px, 3vw, 18px)"}}>→</span>
            </a>
            
            <a href="#contact" data-h
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(11px, 2vw, 13px)",
                fontWeight: 600,
                color: `${T.ink}60`,
                textDecoration: "none",
                borderBottom: `1px solid transparent`,
                transition: "all 0.3s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e=>{e.target.style.color=T.ink; e.target.style.borderBottomColor=`${T.ink}40`}}
              onMouseLeave={e=>{e.target.style.color=`${T.ink}60`; e.target.style.borderBottomColor="transparent"}}>
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Stats - responsive grid */}
        <motion.div 
          initial={{opacity:0, y:30}} 
          animate={{opacity:1, y:0}} 
          transition={{duration:0.9, delay:1.2}}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            marginTop: "clamp(32px, 6vh, 72px)",
            border: `1px solid ${T.sand}40`,
            gap: 1,
            background: `${T.sand}30`
          }}>
          {STATS.map(s=>(
            <div key={s.label} style={{
              background: T.cream,
              padding: "clamp(16px, 3vh, 28px) clamp(12px, 2vw, 20px)",
              textAlign: "center"
            }}>
              <div style={{
                fontFamily: "Georgia,serif",
                fontSize: "clamp(1.2rem, 5vw, 2.4rem)",
                fontWeight: 900,
                color: T.ink,
                marginBottom: "clamp(2px, 1vh, 4px)"
              }}>{s.v}</div>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(8px, 2vw, 10px)",
                color: `${T.ink}40`,
                letterSpacing: "0.26em",
                textTransform: "uppercase"
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint - responsive positioning */}
      <motion.div 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        transition={{delay:2}}
        style={{
          position: "absolute",
          bottom: "clamp(12px, 3vh, 24px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(4px, 1vh, 6px)"
        }}>
        <motion.div 
          animate={{y:[0,8,0]}} 
          transition={{duration:2, repeat:Infinity, ease:"easeInOut"}}
          style={{
            width: 1,
            height: "clamp(24px, 5vh, 40px)",
            background: `linear-gradient(to bottom, ${T.amber}80, transparent)`
          }} />
      </motion.div>
    </section>
  );
}