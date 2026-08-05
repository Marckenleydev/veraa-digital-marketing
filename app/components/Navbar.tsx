import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { T } from "../data";

/* ─────────────────────────── DATA ─────────────────────────── */
export const NAV = [
  {label:"Home",href:"/"},
  {label:"Services",href:"/services"},
  {label:"Work",href:"/work"},
  {label:"About",href:"/about"},
  {label:"Contact",href:"/contact"},
];

export function Navbar() {
  const ease = [0.22, 1, 0.36, 1];
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const [activeLink,setActiveLink] = useState("/");
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY>50);
    window.addEventListener("scroll",h);
    
    // Set active link based on current path
    setActiveLink(window.location.pathname);
    
    return () => window.removeEventListener("scroll",h);
  },[]);
  
  return (<>
    <motion.header initial={{y:-90}} animate={{y:0}} transition={{duration:1,ease:[0.22, 1, 0.36, 1]}}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(245,240,232,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(184,170,146,0.25)` : "none",
        paddingTop: scrolled ? "14px" : "24px",
        paddingBottom: scrolled ? "14px" : "24px",
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" data-h className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
            style={{backgroundColor:T.ink}}>
            <span style={{color:T.cream,fontFamily:"Georgia,serif",fontWeight:900,fontSize:13}}>V</span>
          </div>
          <span style={{fontFamily:"'Syne',system-ui,sans-serif",fontWeight:800,fontSize:13,letterSpacing:"0.22em",color:T.ink,textTransform:"uppercase"}}>
            VERAA<span style={{color:T.amber}}>.</span>DIGITAL
          </span>
        </a>
        
        {/* Desktop Navigation with underline */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map(l => {
            const isActive = activeLink === l.href;
            return (
              <a 
                key={l.label} 
                href={l.href} 
                data-h
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: isActive ? T.ink : `${T.ink}80`,
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "4px",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={e => {
                  e.target.style.color = T.ink;
                  // Show underline on hover
                  // const underline = e.target.querySelector('.nav-underline');
                  // if (underline) underline.style.width = '100%';
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.target.style.color = `${T.ink}80`;
                  }
                  // Hide underline on hover out if not active
                  const underline = e.target.querySelector('.nav-underline');
                  if (underline && !isActive) underline.style.width = '0%';
                }}>
                {l.label}
                <motion.span 
                  className="nav-underline"
                  initial={{width: isActive ? '100%' : '0%'}}
                  animate={{width: isActive ? '100%' : '0%'}}
                  transition={{duration: 0.3}}
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: -1,
                    height: "1px",
                    background: T.amber,
                    pointerEvents: "none"
                  }} 
                />
              </a>
            );
          })}
        </nav>
        
        <a href="#contact" data-h
          style={{
            display: "none",
            background: T.ink,
            color: T.cream,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "12px 24px",
            textDecoration: "none",
            position: "relative",
            overflow: "hidden"
          }}
          className="md:block"
          onMouseEnter={e => {
            e.currentTarget.style.background = T.amber;
            // Add underline effect to button
            const underline = e.currentTarget.querySelector('.button-underline');
            if (underline) underline.style.width = '100%';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = T.ink;
            const underline = e.currentTarget.querySelector('.button-underline');
            if (underline) underline.style.width = '0%';
          }}>
          Start Project
          <motion.span 
            className="button-underline"
            initial={{width: '0%'}}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "1px",
              background: T.cream,
              pointerEvents: "none"
            }} 
          />
        </a>
        
        {/* Mobile menu button */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} data-h>
          <motion.span animate={{rotate:open?45:0, y:open?7:0}} style={{display:"block", width:22, height:2, backgroundColor:T.ink}} />
          <motion.span animate={{opacity:open?0:1}} style={{display:"block", width:22, height:2, backgroundColor:T.ink}} />
          <motion.span animate={{rotate:open?-45:0, y:open?-9:0}} style={{display:"block", width:22, height:2, backgroundColor:T.ink}} />
        </button>
      </div>
    </motion.header>
    
    {/* Mobile Menu with underline */}
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{opacity:0, clipPath:"inset(0 0 100% 0)"}} 
          animate={{opacity:1, clipPath:"inset(0 0 0% 0)"}} 
          exit={{opacity:0, clipPath:"inset(0 0 100% 0)"}}
          transition={{duration:0.6, ease}}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: T.ink,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36
          }}>
          {NAV.map((l,i) => {
            const isActive = activeLink === l.href;
            return (
              <motion.a 
                key={l.label} 
                href={l.href}
                initial={{opacity:0, y:24}} 
                animate={{opacity:1, y:0}} 
                transition={{delay:i*0.08+0.2}}
                onClick={() => {
                  setOpen(false);
                  setActiveLink(l.href);
                }} 
                data-h
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: "clamp(2.5rem,6vw,3.5rem)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: isActive ? T.amber : T.cream,
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "8px"
                }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = T.amber}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = T.cream;
                  }
                }}>
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="mobileActiveUnderline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: T.amber
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  </>);
}