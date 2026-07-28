"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PROJECTS,CATEGORIES , T } from "../data";
import { Cursor } from "../components/Cursor";
import { CaseModal } from "../components/CaseModal";


const ease=[0.22,1,0.36,1];


function useRev(m="-60px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}



/* ── PROJECT CARD ── */
function ProjectCard({w,i,onClick}){
  const [hov,setHov]=useState(false);
  const [r,v]=useRev("-60px");
  return(
    <motion.div ref={r} layout initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{opacity:0}} transition={{duration:0.75,delay:(i%3)*0.1,ease}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={onClick} data-h
      style={{background:w.bg,minHeight:360,padding:36,display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"none",position:"relative",overflow:"hidden"}}>
      <motion.div animate={{opacity:hov?0.14:0.05}} style={{position:"absolute",inset:0,background:`radial-gradient(circle at 30% 50%,${w.acc},transparent 70%)`,filter:"blur(50px)"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:`${w.acc}70`,letterSpacing:"0.18em"}}>{w.id}</span>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {w.tags.map(t=>(<span key={t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,padding:"4px 10px",border:`1px solid ${w.acc}30`,color:`${w.acc}80`,letterSpacing:"0.12em",textTransform:"uppercase"}}>{t}</span>))}
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
          Case Study →
        </motion.span>
      </div>
      <motion.div animate={{scaleX:hov?1:0}} style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:w.acc,transformOrigin:"left"}} transition={{duration:0.4}}/>
    </motion.div>
  );
}

/* ── PAGE ── */
export default function WorkPage(){
  const [filter,setFilter]=useState("All");
  const [selected,setSelected]=useState(null);
  const [r,v]=useRev();
  const filtered=filter==="All"?PROJECTS:PROJECTS.filter(p=>p.cat===filter);

  return(
    <div style={{fontFamily:"'Syne','DM Sans',system-ui,sans-serif",background:T.cream,minHeight:"100vh",cursor:"none"}}>
      <Cursor/>
      <Navbar />

      {/* Hero */}
      <section style={{background:T.cream,padding:"160px 24px 80px",position:"relative",overflow:"hidden"}}>
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
        <div ref={r} style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,x:-20}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:0.1}} style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            <span style={{width:48,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Selected Work</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2,ease}}
            style={{fontFamily:"Georgia,'Playfair Display',serif",fontSize:"clamp(3rem,8vw,8rem)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.03em",color:T.ink,marginBottom:28,maxWidth:800}}>
            Projects That<br/><span style={{fontStyle:"italic",color:T.amber}}>Define Us.</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.45}}
            style={{fontFamily:"'Syne',sans-serif",color:`${T.ink}65`,fontSize:17,maxWidth:440,lineHeight:1.75}}>
            A curated selection of products we're proud of. Every project is a partnership built on trust.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{background:T.creamDark,borderTop:`1px solid ${T.sand}30`,borderBottom:`1px solid ${T.sand}30`,padding:"16px 24px",position:"sticky",top:0,zIndex:10,backdropFilter:"blur(16px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:8,flexWrap:"wrap"}}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setFilter(cat)} data-h
              style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,padding:"8px 16px",letterSpacing:"0.16em",textTransform:"uppercase",border:`1px solid ${filter===cat?T.amber:`${T.sand}60`}`,background:filter===cat?`${T.amber}15`:T.creamDark,color:filter===cat?T.amber:`${T.ink}45`,cursor:"none",transition:"all 0.2s"}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section style={{background:T.creamDark,padding:"4px 24px 120px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <LayoutGroup>
            <motion.div layout style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:2,background:`${T.sand}30`,marginTop:4}}>
              <AnimatePresence mode="popLayout">
                {filtered.map((w,i)=>(
                  <ProjectCard key={w.id} w={w} i={i} onClick={()=>setSelected(w)}/>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:T.cream,borderTop:`1px solid ${T.sand}30`,padding:"120px 24px"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,ease}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:24}}>
              <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Your Turn</span>
              <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            </div>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,color:T.ink,letterSpacing:"-0.03em",lineHeight:1.05,marginBottom:20}}>
              Your Project<br/><span style={{fontStyle:"italic",color:T.amber}}>Could Be Next.</span>
            </h2>
            <p style={{fontFamily:"'Syne',sans-serif",color:`${T.ink}55`,fontSize:16,lineHeight:1.75,marginBottom:40}}>
              Free discovery call to kick things off. No commitment — just a conversation.
            </p>
            <a href="/contact" data-h
              style={{display:"inline-flex",alignItems:"center",gap:14,background:T.ink,color:T.cream,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,letterSpacing:"0.22em",textTransform:"uppercase",padding:"20px 40px",textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=T.amber}
              onMouseLeave={e=>e.currentTarget.style.background=T.ink}>
              Start a Project →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer/>

      <AnimatePresence>
        {selected&&<CaseModal project={selected} onClose={()=>setSelected(null)}/>}
      </AnimatePresence>
    </div>
  );
}