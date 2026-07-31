import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, WORKS } from "../data";

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};
const stag = (d = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: d } },
});

export function Work() {
  const [r, v] = useRev();

  return (
    <section id="work" style={{ background: T.creamDark, padding: "clamp(40px, 8vh, 120px) 16px" }}>
      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .work-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          ref={r}
          variants={stag()}
          initial="hidden"
          animate={v ? "visible" : "hidden"}
          style={{ marginBottom: 40 }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase"
            }}>
              Selected Work
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 8vw, 5.5rem)",
            fontWeight: 900,
            color: T.ink,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0
          }}>
            Selected Work & <br />
            <span style={{ fontStyle: "italic", color: T.amber }}>Case Studies.</span>
          </motion.h2>
        </motion.div>

        <div className="work-grid gap-2">
          {WORKS.map((w, i) => <WorkCard key={w.id} w={w} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function WorkCard({w,i}) {
  const [hov,setHov] = useState(false);
  const [r,v] = useRev("-60px");
  return (
    <motion.div ref={r} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}}
      transition={{duration:0.75,delay:(i%2)*0.12,ease}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      data-h style={{background:w.bg,minHeight:340,padding:36,display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"none",position:"relative",overflow:"hidden"}}>
      {/* Glow */}
      <motion.div animate={{opacity:hov?0.14:0.05}} style={{position:"absolute",inset:0,background:`radial-gradient(circle at 30% 50%, ${w.acc}, transparent 70%)`,filter:"blur(50px)",transition:"opacity 0.4s"}} />
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:`${w.acc}70`,letterSpacing:"0.18em"}}>{w.id}</span>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {w.tags.map(t=>(
              <span key={t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,padding:"4px 10px",border:`1px solid ${w.acc}30`,color:`${w.acc}80`,letterSpacing:"0.12em",textTransform:"uppercase"}}>{t}</span>
            ))}
          </div>
        </div>
        <h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:T.cream,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:4}}>{w.title}</h3>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:12,color:`${w.acc}B0`,marginBottom:12,letterSpacing:"0.08em"}}>{w.sub}</p>
        <motion.p animate={{opacity:hov?1:0,y:hov?0:8}} transition={{duration:0.3}}
          style={{fontFamily:"'Syne',sans-serif",fontSize:13,color:`${T.cream}55`,lineHeight:1.65,maxWidth:280}}>{w.desc}</motion.p>
      </div>
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:20,marginTop:16,borderTop:`1px solid ${w.acc}20`}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:`${w.acc}60`}}>{w.year}</span>
        <motion.span animate={{x:hov?0:-8,opacity:hov?1:0}} style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,color:w.acc}}>
       <a href={w.link} style={{textDecoration:"none"}}>   Case Study → </a> 
        </motion.span>
      </div>
      <motion.div animate={{scaleX:hov?1:0}} style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:w.acc,transformOrigin:"left"}} transition={{duration:0.4}} />
    </motion.div>
  );
}