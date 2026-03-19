import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ═══ THEME ═══ */
const themes = {
  dark: { bg: "#0A0A0A", text: "#F5F0E8", muted: "#A8A39A", subtle: "rgba(245,240,232,0.78)", card: "rgba(245,240,232,0.025)", border: "rgba(245,240,232,0.06)", navBg: "rgba(10,10,10,0.8)", accent: "#E8FF47" },
  light: { bg: "#FAF8F4", text: "#1A1A1A", muted: "#595450", subtle: "rgba(26,26,26,0.72)", card: "rgba(0,0,0,0.025)", border: "rgba(0,0,0,0.08)", navBg: "rgba(250,248,244,0.85)", accent: "#B8CC00" },
};
const ThemeCtx = createContext();
function useTheme() { return useContext(ThemeCtx); }
function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const t = themes[mode];
  const toggle = () => setMode(p => p === "dark" ? "light" : "dark");
  return <ThemeCtx.Provider value={{ mode, t, toggle }}>{children}</ThemeCtx.Provider>;
}

function useIsMobile(bp = 768) { const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false); useEffect(() => { const h = () => setM(window.innerWidth < bp); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, [bp]); return m; }

const BLUE = "#156CEF", GREEN = "#22C55E", AMBER = "#F59E0B";
const FD = "'Playfair Display', serif", FB = "'DM Sans', sans-serif";

const experience = [{ company: "ZZAZZ Terminal", subtitle: "Content pricing & ecosystem startup", roles: [{ title: "Designer · UX Architect · Product Architect", period: "~6 Months", highlights: ["Architected 7 interconnected verticals for a new content economy.", "Collaborated with Founder, Product Lead & AI team for scoping.", "Redesigned Exchange from table-first to query-led AI-native interaction.", "Created Moments vertical — defined IA, wireframes, delegated execution.", "Designed TimePay's three-path access model for India's market."] }] }, { company: "Clear (ClearTax)", subtitle: "India's largest tax & compliance platform", roles: [{ title: "Senior Product Designer", period: "Jan 2024 – Present", highlights: ["Leading design for GST products serving 1.4Cr+ businesses.", "Driving design system evolution and cross-team design ops."] }, { title: "Product Designer", period: "Jun 2022 – Dec 2023", highlights: ["Redesigned GSTR-3B filing — 87% time reduction.", "Built Mint V8 design system with PCS logic — 80% variant reduction.", "Led 50+ user interviews with MSMEs and enterprises."] }, { title: "Associate Product Designer", period: "Jun 2021 – May 2022", highlights: ["Contributed to GST product UI improvements.", "Component library foundations with engineering."] }] }];

const projects = [
  { id: "zzazz", title: "ZZAZZ Terminal", subtitle: "Architecting a New Content Economy", category: "Product Architecture", date: "~6 Mo", role: "Designer · UX/Product Architect", team: "Founder · Product Lead · AI · 2 Designers", overview: "Reframed disconnected POCs into a coherent 7-vertical ecosystem that makes priced content believable.", results: [{ m: "7", l: "Verticals" }, { m: "1", l: "Ecosystem" }, { m: "∞", l: "Content priced" }, { m: "3", l: "Access paths" }], color: AMBER },
  { id: "gstr-3b", title: "GSTR-3B Filing Redesign", subtitle: "Simplifying GST Filing at Scale", category: "B2B · Enterprise UX", date: "2022–24", role: "UX Design · Research", team: "4 Designers · 1 PM · 3 Devs", overview: "Redesigned filing for 1.4Cr+ businesses — 1hr to 8min per GSTIN, tripling adoption.", results: [{ m: "87%", l: "Time cut" }, { m: "53%", l: "Adoption ↑" }, { m: "94%", l: "Accuracy" }, { m: "73%", l: "Escalation ↓" }], color: GREEN },
  { id: "mint-v8", title: "Mint V8 Design System", subtitle: "Token-Based System with PCS Logic", category: "Design System", date: "2023", role: "Design System Lead", team: "1 Dev · 4 Designers · Manager", overview: "Created Clear's design system — invented PCS Logic reducing 760 button variants to 32.", results: [{ m: "80%", l: "Variant ↓" }, { m: "70%", l: "Dev effort ↓" }, { m: "2", l: "Themes" }, { m: "32", l: "Buttons" }], color: BLUE },
];

function scrollTo(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

/* ═══ PRIMITIVES ═══ */
function FadeIn({ children, delay = 0 }) { const ref = useRef(null); const [v, setV] = useState(false); useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>{children}</div>; }

function SL({ color, children }) { const { t } = useTheme(); return <div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 10, color: color || t.accent }}>{children}</div>; }
function Divider() { const { t } = useTheme(); return <div style={{ height: 1, background: t.border, margin: "56px 0" }} />; }
function Wrap({ children, style = {} }) { const m = useIsMobile(); return <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: m ? "0 20px" : "0 48px", ...style }}>{children}</div>; }
function MC({ metric, label, color }) { const { t } = useTheme(); return <div style={{ background: t.card, border: `1px solid ${t.border}`, padding: "28px 20px", textAlign: "center" }}><div style={{ fontFamily: FD, fontSize: 34, color, fontWeight: 700, lineHeight: 1 }}>{metric}</div><div style={{ fontFamily: FB, fontSize: 11, color: t.muted, letterSpacing: "0.5px", marginTop: 10 }}>{label}</div></div>; }

function Img({ label, aspect = "16/9", color = AMBER, caption }) { const { t } = useTheme(); return (<FadeIn><div style={{ margin: "32px 0" }}><div style={{ aspectRatio: aspect, background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)`, border: `1px dashed ${color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${color}06 1px, transparent 1px), linear-gradient(90deg, ${color}06 1px, transparent 1px)`, backgroundSize: "20px 20px", pointerEvents: "none" }} /><div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg></div><div style={{ fontFamily: FB, fontSize: 11, color: `${color}`, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, textAlign: "center", padding: "0 20px", position: "relative", zIndex: 1 }}>{label}</div></div>{caption && <div style={{ fontFamily: FB, fontSize: 12, color: t.muted, marginTop: 10, fontStyle: "italic", textAlign: "center" }}>{caption}</div>}</div></FadeIn>); }
function BA({ beforeLabel, afterLabel }) { const m = useIsMobile(); return (<FadeIn><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 16, margin: "32px 0" }}>{[{ l: beforeLabel, tag: "BEFORE", c: "#F55050" }, { l: afterLabel, tag: "AFTER", c: GREEN }].map((x, i) => (<div key={i} style={{ aspectRatio: "4/3", background: `linear-gradient(135deg, ${x.c}06 0%, transparent 100%)`, border: `1px dashed ${x.c}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative" }}><div style={{ position: "absolute", top: 12, left: 12, fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: x.c, background: `${x.c}15`, padding: "4px 10px" }}>{x.tag}</div><div style={{ fontFamily: FB, fontSize: 11, color: "#8A8578", textAlign: "center", padding: "0 16px" }}>{x.l}</div></div>))}</div></FadeIn>); }
function Vid({ label, color = AMBER }) { return (<FadeIn><div style={{ margin: "32px 0", aspectRatio: "16/9", background: `linear-gradient(135deg, ${color}06 0%, ${color}02 100%)`, border: `1px dashed ${color}25`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill={color}><polygon points="9.5,7.5 16.5,12 9.5,16.5" /></svg></div><div style={{ fontFamily: FB, fontSize: 12, color, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>{label}</div></div></FadeIn>); }

function DC({ title, context, options, reasoning, color }) { const { t } = useTheme(); const m = useIsMobile(); return (<FadeIn><div style={{ background: `${color}08`, border: `1px solid ${color}20`, padding: m ? 24 : 32, margin: "32px 0", borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color, marginBottom: 14 }}>⬡ Design Decision</div><div style={{ fontFamily: FD, fontSize: m ? 20 : 24, color: t.text, fontWeight: 400, marginBottom: 12, lineHeight: 1.3 }}>{title}</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.8, color: t.subtle, marginBottom: 16 }}>{context}</p>{options && <div style={{ marginBottom: 16 }}>{options.map((o, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}><span style={{ fontFamily: FB, fontSize: 13, color: o.chosen ? color : t.muted, fontWeight: o.chosen ? 700 : 400, minWidth: 16 }}>{o.chosen ? "✓" : "○"}</span><span style={{ fontFamily: FB, fontSize: 14, color: o.chosen ? t.text : t.muted }}>{o.text}</span></div>)}</div>}<div style={{ borderTop: `1px solid ${color}15`, paddingTop: 14 }}><div style={{ fontFamily: FB, fontSize: 11, color, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Why I Chose This</div><p style={{ fontFamily: FB, fontSize: 14, color: t.subtle, lineHeight: 1.7 }}>{reasoning}</p></div></div></FadeIn>); }

function Hero2({ title, subtitle, category, date, role, team, color, overview, myRole }) { const { t } = useTheme(); const [ld, setLd] = useState(false); const m = useIsMobile(); useEffect(() => { setTimeout(() => setLd(true), 100); }, []); return (<section style={{ minHeight: m ? "auto" : "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: m ? 100 : 120, paddingBottom: m ? 48 : 80, position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 0, right: "-10%", width: m ? 250 : 500, height: m ? 250 : 500, borderRadius: "50%", background: `radial-gradient(circle, ${color}12 0%, transparent 60%)`, filter: "blur(80px)", pointerEvents: "none" }} /><div style={{ position: "relative", zIndex: 1, maxWidth: 860, width: "100%", opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s" }}><div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color, marginBottom: 16 }}>{category}</div><h1 style={{ fontFamily: FD, fontSize: m ? 28 : "clamp(38px,5.5vw,64px)", lineHeight: 1.08, color: t.text, margin: 0, fontWeight: 400 }}>{title}</h1><p style={{ fontFamily: FB, fontSize: m ? 14 : 18, color: t.muted, fontStyle: "italic", marginTop: 12 }}>{subtitle}</p><p style={{ fontFamily: FB, fontSize: m ? 14 : 16, lineHeight: 1.8, color: t.subtle, maxWidth: 640, marginTop: m ? 16 : 28 }}>{overview}</p>{myRole && <div style={{ marginTop: 24, padding: "20px 24px", background: `${color}08`, border: `1px solid ${color}15`, borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color, marginBottom: 8 }}>My Specific Role</div><p style={{ fontFamily: FB, fontSize: 14, color: t.subtle, lineHeight: 1.6, margin: 0 }}>{myRole}</p></div>}<div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>{[role, team, date].map((x, i) => <span key={i} style={{ fontFamily: FB, fontSize: 11, color: t.muted, background: t.card, padding: "5px 14px", border: `1px solid ${t.border}` }}>{x}</span>)}</div></div></section>); }

function CS({ label, labelColor, title, children }) { const { t } = useTheme(); return <FadeIn><div style={{ marginBottom: 56 }}><SL color={labelColor}>{label}</SL>{title && <h3 style={{ fontFamily: FD, fontSize: 28, color: t.text, margin: "0 0 20px 0", fontWeight: 400, lineHeight: 1.2 }}>{title}</h3>}{children}</div></FadeIn>; }
function CT({ headers, rows }) { const { t } = useTheme(); const m = useIsMobile(); return (<div style={{ overflowX: "auto", marginTop: 20, WebkitOverflowScrolling: "touch", margin: "20px -20px 0", padding: "0 20px" }}><table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FB, fontSize: m ? 12 : 14, minWidth: 420 }}><thead><tr>{headers.map((h, i) => <th key={i} style={{ textAlign: "left", padding: m ? "10px 12px" : "14px 18px", borderBottom: `2px solid ${t.border}`, color: t.accent, fontWeight: 600, fontSize: m ? 10 : 11, letterSpacing: "1.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead><tbody>{rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{ padding: m ? "10px 12px" : "14px 18px", borderBottom: `1px solid ${t.border}`, color: ci === 0 ? t.text : t.subtle, fontWeight: ci === 0 ? 500 : 400, fontSize: m ? 12 : 14 }}>{c}</td>)}</tr>)}</tbody></table></div>); }
function PS({ number, title, description, color }) { const { t } = useTheme(); return <FadeIn delay={number * 0.06}><div style={{ display: "flex", gap: 24, marginBottom: 28, alignItems: "flex-start" }}><div style={{ minWidth: 42, height: 42, borderRadius: "50%", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: 17, color, fontWeight: 600, flexShrink: 0 }}>{number}</div><div><div style={{ fontFamily: FB, fontSize: 15, color: t.text, fontWeight: 600, marginBottom: 4 }}>{title}</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, margin: 0 }}>{description}</p></div></div></FadeIn>; }
function QB({ text, author, color }) { const { t } = useTheme(); return <FadeIn><div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 24, margin: "28px 0" }}><p style={{ fontFamily: FD, fontSize: 19, color: t.text, fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>"{text}"</p>{author && <div style={{ fontFamily: FB, fontSize: 13, color: t.muted, marginTop: 8 }}>— {author}</div>}</div></FadeIn>; }
function KF({ icon, title, problem, example, data, color }) { const { t } = useTheme(); return <FadeIn><div style={{ background: t.card, border: `1px solid ${t.border}`, padding: 24, marginBottom: 14, borderRadius: 4 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><span style={{ fontSize: 18 }}>{icon}</span><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600 }}>{title}</div></div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, marginBottom: 8 }}>{problem}</p>{example && <p style={{ fontFamily: FB, fontSize: 13, color, fontStyle: "italic" }}>{example}</p>}{data && <div style={{ fontFamily: FB, fontSize: 12, color: t.accent, marginTop: 6, fontWeight: 600 }}>{data}</div>}</div></FadeIn>; }
function Bk({ onClick, label = "← Back to Portfolio" }) { const { t } = useTheme(); return (<div style={{ padding: "48px 0 100px" }}><button onClick={onClick} style={{ background: "none", border: `1px solid ${t.border}`, color: t.text, fontFamily: FB, fontSize: 13, padding: "10px 22px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.25s", borderRadius: 4 }} onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}>{label}</button></div>); }
function VC({ emoji, title, status, problem, whatIDid, outcome, color, onDeepDive }) { const { t } = useTheme(); const [h, setH] = useState(false); const m = useIsMobile(); return (<FadeIn><div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: t.card, border: `1px solid ${t.border}`, padding: m ? 24 : 32, position: "relative", overflow: "hidden", transition: "all 0.35s", transform: h ? "translateY(-3px)" : "none", borderRadius: 4 }}><div style={{ position: "absolute", top: 0, left: 0, width: h ? "100%" : "0%", height: 2, background: color, transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)" }} /><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}><span style={{ fontSize: 22 }}>{emoji}</span><div><h4 style={{ fontFamily: FD, fontSize: m ? 20 : 24, color: t.text, margin: 0, fontWeight: 400 }}>{title}</h4><div style={{ fontFamily: FB, fontSize: 11, color, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginTop: 3 }}>{status}</div></div></div><div style={{ marginBottom: 14 }}><div style={{ fontFamily: FB, fontSize: 10, color: "#F55050", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Problem</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle }}>{problem}</p></div><div style={{ marginBottom: 14 }}><div style={{ fontFamily: FB, fontSize: 10, color, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>What I Did</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle }}>{whatIDid}</p></div>{outcome && <div style={{ marginBottom: 14 }}><div style={{ fontFamily: FB, fontSize: 10, color: GREEN, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Outcome</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle }}>{outcome}</p></div>}{onDeepDive && <button onClick={onDeepDive} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FB, fontSize: 13, color, fontWeight: 600, display: "flex", alignItems: "center", gap: h ? 12 : 8, transition: "gap 0.3s", padding: 0, marginTop: 6 }}>Read Deep Dive <span style={{ transition: "transform 0.3s", transform: h ? "translateX(4px)" : "none" }}>→</span></button>}</div></FadeIn>); }

/* ═══ THEME TOGGLE ═══ */
function ThemeToggle() {
  const { mode, toggle, t } = useTheme();
  return (
    <button onClick={toggle} aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`} style={{ background: "none", border: "none", cursor: "pointer", padding: "9px 2px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 44, minHeight: 44, flexShrink: 0 }}>
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, width: 44, height: 26, position: "relative", transition: "all 0.3s", pointerEvents: "none" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.accent, position: "absolute", top: 2, left: mode === "dark" ? 2 : 21, transition: "left 0.3s cubic-bezier(0.22,1,0.36,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{mode === "dark" ? "🌙" : "☀️"}</div>
      </div>
    </button>
  );
}

/* ═══ NAV ═══ */
function Nav({ activeSection, currentPage, goBack, goHome, goTo }) {
  const { t } = useTheme(); const links = ["About", "Work", "Experience", "Skills", "Contact"]; const m = useIsMobile();
  const [drawer, setDrawer] = useState(false);
  const jump = (id) => { scrollTo(id); setDrawer(false); };
  const caseStudies = [
    { id: "zzazz", label: "ZZAZZ Terminal", color: AMBER },
    { id: "gstr-3b", label: "GSTR-3B Filing", color: GREEN },
    { id: "mint-v8", label: "Mint V8 Design System", color: BLUE },
  ];
  return (<>
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
    <nav aria-label="Primary navigation" style={{ backdropFilter: "blur(20px)", background: t.navBg, borderBottom: `1px solid ${t.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: m ? "10px 20px" : "12px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: m ? 10 : 18 }}>
          <button onClick={goHome} aria-label="Go to homepage" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: FD, fontSize: 22, color: t.accent, fontWeight: 700 }}>AK<span style={{ color: t.text }}>.</span></button>
          {currentPage === "detail" && goBack && (<><div style={{ width: 1, height: 18, background: t.border }} /><button onClick={goBack} aria-label="Back to portfolio" style={{ background: "none", border: "none", color: t.muted, fontFamily: FB, fontSize: m ? 12 : 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "color 0.25s", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.muted}><span style={{ fontSize: 14 }} aria-hidden="true">←</span> Back</button></>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: m ? 12 : 24 }}>
          {currentPage === "home" && !m && links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === l.toLowerCase() ? t.accent : t.muted, fontSize: 12, fontFamily: FB, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500, transition: "color 0.3s", padding: "0 0 2px 0", borderBottom: activeSection === l.toLowerCase() ? `1px solid ${t.accent}` : "1px solid transparent" }}>{l}</button>
          ))}
          <ThemeToggle />
          {currentPage === "home" && (
            <button className="mobile-menu-btn" onClick={() => setDrawer(true)} aria-label="Open navigation menu" aria-expanded={drawer} aria-controls="mobile-drawer" style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 8px", flexDirection: "column", gap: 4, minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 20, height: 2, background: t.text, borderRadius: 1 }} />
              <div style={{ width: 14, height: 2, background: t.accent, borderRadius: 1 }} />
              <div style={{ width: 20, height: 2, background: t.text, borderRadius: 1 }} />
            </button>
          )}
        </div>
      </div>
    </nav>
    </header>
    {/* Mobile Drawer Overlay */}
    <div className="mobile-overlay" onClick={() => setDrawer(false)} aria-hidden="true" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, opacity: drawer ? 1 : 0, pointerEvents: drawer ? "auto" : "none", transition: "opacity 0.3s ease" }} />
    {/* Mobile Drawer */}
    <div id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 280, zIndex: 201, background: t.navBg, backdropFilter: "blur(24px)", borderLeft: `1px solid ${t.border}`, transform: drawer ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)", display: "flex", flexDirection: "column", padding: "0 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, paddingBottom: 20, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: t.accent }}>Jump to</div>
        <button onClick={() => setDrawer(false)} aria-label="Close navigation menu" style={{ background: "none", border: "none", cursor: "pointer", color: t.muted, fontSize: 22, lineHeight: 1, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 12px" }}>×</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
        {links.map(l => (
          <React.Fragment key={l}>
            <button onClick={() => jump(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "16px 0", minHeight: 44, borderBottom: l === "Work" ? "none" : `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: FB, fontSize: 15, color: activeSection === l.toLowerCase() ? t.accent : t.text, fontWeight: activeSection === l.toLowerCase() ? 600 : 400, letterSpacing: "0.5px", transition: "color 0.2s" }}>{l}</span>
              {activeSection === l.toLowerCase() && <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent }} aria-hidden="true" />}
            </button>
            {l === "Work" && (
              <div style={{ paddingLeft: 12, paddingBottom: 12, borderBottom: `1px solid ${t.border}` }} role="group" aria-label="Case studies">
                <div style={{ fontFamily: FB, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: t.muted, marginBottom: 6 }} aria-hidden="true">Case Studies</div>
                {caseStudies.map(cs => (
                  <button key={cs.id} onClick={() => { goTo && goTo(cs.id); setDrawer(false); }} aria-label={`Open ${cs.label} case study`} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "12px 0", minHeight: 44, display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: cs.color, flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: FB, fontSize: 13, color: t.subtle, letterSpacing: "0.3px", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = cs.color} onMouseLeave={e => e.currentTarget.style.color = t.subtle}>{cs.label}</span>
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: "auto", paddingBottom: 32, paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
        <div style={{ fontFamily: FB, fontSize: 12, color: t.muted, lineHeight: 1.6 }}>Ashish Khoshya</div>
        <div style={{ fontFamily: FB, fontSize: 11, color: t.muted, opacity: 0.6 }}>Senior Product Designer</div>
      </div>
    </div>
  </>);
}

/* ═══ AVATAR ═══ */
const AVATAR_SRC = "data:image/jpeg;base64,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";
function Avatar({ size = 88 }) {
  const { t } = useTheme();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", border: `2px solid ${t.accent}30`, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <img src={AVATAR_SRC} alt="Ashish Khoshya" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: `inset 0 0 20px ${t.accent}15` }} />
    </div>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const { t } = useTheme(); const [ld, setLd] = useState(false); const m = useIsMobile();
  useEffect(() => { setTimeout(() => setLd(true), 100); }, []);
  return (<section id="about" aria-label="About Ashish Khoshya" style={{ minHeight: m ? "auto" : "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: m ? 100 : 140, paddingBottom: m ? 48 : 80, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.accent}04 1px, transparent 1px), linear-gradient(90deg, ${t.accent}04 1px, transparent 1px)`, backgroundSize: "80px 80px", pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: "10%", right: "5%", width: m ? 200 : 400, height: m ? 200 : 400, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}10 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
    <Wrap style={{ position: "relative", zIndex: 1 }}>
      <div style={{ opacity: ld ? 1 : 0, transition: "all 0.8s ease 0.1s", marginBottom: 24 }}><Avatar size={m ? 72 : 88} /></div>
      <div style={{ opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}>
        <div style={{ fontFamily: FB, fontSize: m ? 11 : 13, letterSpacing: "3px", textTransform: "uppercase", color: t.accent, marginBottom: 14, fontWeight: 500 }}>Senior Product Designer</div>
      </div>
      <h1 style={{ fontFamily: FD, fontSize: m ? "clamp(36px,10vw,48px)" : "clamp(48px,7vw,84px)", lineHeight: 1.05, color: t.text, margin: 0, fontWeight: 400, opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.35s" }}>Ashish<br /><span style={{ fontStyle: "italic", color: t.accent }}>Khoshya</span></h1>
      <p style={{ fontFamily: FB, fontSize: m ? 15 : 17, lineHeight: 1.75, color: t.muted, maxWidth: 580, marginTop: m ? 20 : 28, opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.5s" }}>I'm drawn to the intersection of complex systems and human psychology — problems where a good interface isn't enough, and you need to rethink the entire product logic. 4+ years making enterprise software approachable, building design systems that scale, and architecting ecosystems from the ground up.</p>
      <div style={{ opacity: ld ? 1 : 0, transform: ld ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.6s", marginTop: 20, padding: "16px 0 16px 20px", borderLeft: `3px solid ${t.accent}` }}>
        <p style={{ fontFamily: FD, fontSize: m ? 16 : 19, color: t.text, fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>Structure enables creativity. Tokens before components. Patterns before pixels. Systems before screens.</p>
      </div>
      <p style={{ fontFamily: FB, fontSize: m ? 13 : 14, lineHeight: 1.7, color: t.muted, maxWidth: 540, marginTop: 14, opacity: ld ? 1 : 0, transition: "all 0.8s ease 0.7s" }}>Currently looking for roles involving complex product problems at scale — design systems, ecosystem architecture, or 0-to-1 products requiring strategic and craft depth.</p>
      <div style={{ display: "flex", gap: m ? 10 : 16, marginTop: m ? 24 : 32, flexWrap: "wrap", opacity: ld ? 1 : 0, transition: "all 0.8s ease 0.8s" }}>
        <button onClick={() => scrollTo("work")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: m ? "12px 20px" : "13px 28px", background: t.accent, color: "#0A0A0A", fontFamily: FB, fontSize: m ? 13 : 14, fontWeight: 600, border: "none", cursor: "pointer", borderRadius: 4 }}>View Case Studies ↓</button>
        <button onClick={() => scrollTo("contact")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: m ? "12px 20px" : "13px 28px", background: "transparent", color: t.text, fontFamily: FB, fontSize: m ? 13 : 14, fontWeight: 500, border: `1px solid ${t.border}`, cursor: "pointer", borderRadius: 4 }}>Get in Touch</button>
      </div>
      <div style={{ marginTop: m ? 36 : 56, display: "flex", gap: m ? 24 : 48, flexWrap: "wrap", borderTop: `1px solid ${t.border}`, paddingTop: m ? 20 : 24, opacity: ld ? 1 : 0, transition: "opacity 1s ease 1s" }}>{[{ n: "4+", l: "Years Experience" }, { n: "7", l: "Verticals Architected" }, { n: "87%", l: "Filing Time Reduced" }, { n: "IIT", l: "Guwahati Alumnus" }].map((s, i) => <div key={i}><div style={{ fontFamily: FD, fontSize: m ? 22 : 28, color: t.text, fontWeight: 700 }}>{s.n}</div><div style={{ fontFamily: FB, fontSize: m ? 10 : 12, color: t.muted, letterSpacing: "1px", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div></div>)}</div>
    </Wrap>
  </section>);
}

/* ═══ PROJECT CARD ═══ */
function ProjectCard({ project, onOpen }) { const { t } = useTheme(); const [h, setH] = useState(false); const m = useIsMobile(); return (<FadeIn><div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => onOpen(project.id)} role="button" tabIndex="0" aria-label={`Open ${project.title} case study`} onKeyDown={e => (e.key === "Enter" || e.key === " ") && onOpen(project.id)} style={{ background: t.card, border: `1px solid ${t.border}`, padding: m ? 24 : 44, position: "relative", overflow: "hidden", cursor: "pointer", transition: "all 0.4s", transform: h ? "translateY(-4px)" : "none", borderRadius: 4 }}><div style={{ position: "absolute", top: 0, left: 0, width: h ? "100%" : "0%", height: 2, background: project.color, transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} /><div style={{ display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, gap: m ? 4 : 0 }}><div><div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: project.color, marginBottom: 10 }}>{project.category}</div><h3 style={{ fontFamily: FD, fontSize: m ? 24 : 28, color: t.text, margin: 0, fontWeight: 400, lineHeight: 1.2 }}>{project.title}</h3><p style={{ fontFamily: FB, fontSize: m ? 13 : 14, color: t.muted, marginTop: 6, fontStyle: "italic" }}>{project.subtitle}</p></div><div style={{ fontFamily: FB, fontSize: 12, color: t.muted }}>{project.date}</div></div><div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>{[project.role, project.team].map((x, i) => <span key={i} style={{ fontFamily: FB, fontSize: 11, color: t.muted, background: t.card, padding: "4px 12px", border: `1px solid ${t.border}` }}>{x}</span>)}</div><p style={{ fontFamily: FB, fontSize: m ? 14 : 15, lineHeight: 1.7, color: t.subtle, marginBottom: 24 }}>{project.overview}</p><div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 1, background: t.border, borderRadius: 4, overflow: "hidden" }}>{project.results.map((r, i) => <div key={i} style={{ background: t.bg, padding: m ? "16px 10px" : "18px 12px", textAlign: "center" }}><div style={{ fontFamily: FD, fontSize: m ? 22 : 26, color: project.color, fontWeight: 700 }}>{r.m}</div><div style={{ fontFamily: FB, fontSize: m ? 10 : 11, color: t.muted, marginTop: 5 }}>{r.l}</div></div>)}</div><div style={{ marginTop: 22, fontFamily: FB, fontSize: 13, color: project.color, fontWeight: 600, display: "flex", alignItems: "center", gap: h ? 14 : 8, transition: "gap 0.3s" }}>Read Case Study <span style={{ transition: "transform 0.3s", transform: h ? "translateX(4px)" : "none" }}>→</span></div></div></FadeIn>); }

/* ═══ EXPERIENCE ═══ */
function ExperienceTimeline() { const { t } = useTheme(); const m = useIsMobile(); return (<section id="experience" aria-label="Experience and Education" style={{ paddingTop: m ? 60 : 100, paddingBottom: m ? 60 : 100 }}><Wrap><FadeIn><SL>Career</SL><h2 style={{ fontFamily: FD, fontSize: m ? 28 : 42, color: t.text, margin: "0 0 44px 0", fontWeight: 400, lineHeight: 1.15 }}>Experience & <span style={{ fontStyle: "italic" }}>Education</span></h2></FadeIn><div style={{ maxWidth: 720, width: "100%", position: "relative" }}><div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: t.border }} />{experience.map((exp, i) => (<FadeIn key={i}><div style={{ marginBottom: 44 }}><div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}><div style={{ width: 15, height: 15, borderRadius: "50%", background: t.accent, flexShrink: 0, boxShadow: `0 0 12px ${t.accent}40` }} /><div><h3 style={{ fontFamily: FD, fontSize: 24, color: t.text, margin: 0, fontWeight: 400 }}>{exp.company}</h3><span style={{ fontFamily: FB, fontSize: 13, color: t.muted, fontStyle: "italic" }}>{exp.subtitle}</span></div></div>{exp.roles.map((r, j) => <div key={j} style={{ marginLeft: 33, marginBottom: 24, paddingLeft: 18, borderLeft: `1px solid ${t.border}` }}><div style={{ fontFamily: FB, fontSize: 15, color: t.text, fontWeight: 600 }}>{r.title}</div><div style={{ fontFamily: FB, fontSize: 12, color: t.muted, marginTop: 3, marginBottom: 10 }}>{r.period}</div>{r.highlights.map((h, k) => <p key={k} style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, marginBottom: 6 }}>{h}</p>)}</div>)}</div></FadeIn>))}<FadeIn delay={0.3}><div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${t.accent}`, background: t.bg, flexShrink: 0 }} /><div><h3 style={{ fontFamily: FD, fontSize: 24, color: t.text, margin: 0, fontWeight: 400 }}>IIT Guwahati</h3><div style={{ fontFamily: FB, fontSize: 13, color: t.muted, marginTop: 3 }}>B.Tech · 7.08 CGPA · 2017–2021</div></div></div></FadeIn></div></Wrap></section>); }

/* ═══ SKILLS — proof-based ═══ */
function SkillsSection() { const { t } = useTheme(); const m = useIsMobile();
  const proofs = [
    { skill: "Design Systems", proof: "Built Mint V8 from scratch — 80% variant reduction via PCS Logic, 2 themes, 100% adoption in 6 weeks.", color: BLUE },
    { skill: "Product Architecture", proof: "Architected 7-vertical ecosystem at ZZAZZ, scoping with Founder and AI team.", color: AMBER },
    { skill: "UX Research", proof: "50+ interviews for GSTR-3B. Discovered 'adoption ≠ proficiency' flaw through field shadowing.", color: GREEN },
    { skill: "Interaction Design", proof: "GSTR-3B: 1hr → 8min. Exchange: table-first → query-led AI interaction.", color: GREEN },
    { skill: "Information Architecture", proof: "Full IA for Moments and GSTR-3B's 6-step filing workflow.", color: AMBER },
    { skill: "Accessibility", proof: "GSTR-3B: keyboard nav, WCAG AA contrast, screen-reader forms, multi-cue error states for India's diverse MSME population.", color: "#F55050" },
  ];
  return (<section id="skills" aria-label="Skills" style={{ paddingTop: m ? 60 : 100, paddingBottom: m ? 60 : 100 }}>
    <Wrap>
    <FadeIn><SL>What I Bring</SL><h2 style={{ fontFamily: FD, fontSize: m ? 28 : 42, color: t.text, margin: "0 0 12px 0", fontWeight: 400 }}>Skills, <span style={{ fontStyle: "italic" }}>Proven</span></h2><p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, maxWidth: 600, marginBottom: 36 }}>I don't self-rate skills in percentages. Here's what I bring and the shipped work behind each.</p></FadeIn>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 800 }}>
      {proofs.map((p, i) => <FadeIn key={i} delay={i * 0.06}><div style={{ padding: m ? 20 : 26, background: t.card, border: `1px solid ${t.border}`, borderRadius: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} /><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600 }}>{p.skill}</div></div>
        <p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, margin: 0 }}>{p.proof}</p>
      </div></FadeIn>)}
    </div>
    <div style={{ marginTop: 40 }}><FadeIn><SL>Tools</SL><div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>{["Figma", "Framer", "Miro / FigJam", "Storybook", "Notion", "Jira / Linear", "Principle"].map((x, i) => <span key={i} style={{ fontFamily: FB, fontSize: 13, color: t.muted, background: t.card, padding: "8px 16px", border: `1px solid ${t.border}`, borderRadius: 4 }}>{x}</span>)}</div></FadeIn></div>
    </Wrap></section>);
}

/* ═══ CONTACT ═══ */
function ContactSection() { const { t } = useTheme(); const m = useIsMobile(); return (<section id="contact" aria-label="Contact" style={{ paddingTop: m ? 60 : 100, paddingBottom: m ? 60 : 100, position: "relative" }}><div style={{ position: "absolute", bottom: "10%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}08 0%, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} aria-hidden="true" /><Wrap><FadeIn><SL>Connect</SL><h2 style={{ fontFamily: FD, fontSize: m ? 28 : "clamp(36px,5vw,60px)", color: t.text, margin: "0 0 16px 0", fontWeight: 400, lineHeight: 1.1 }}>Have a project?<br /><span style={{ fontStyle: "italic", color: t.accent }}>Let's talk.</span></h2></FadeIn><FadeIn delay={0.2}><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2,1fr)", gap: m ? 12 : 16, marginTop: 32 }}>{[{ l: "Email", v: "ashish.khoshya1998@gmail.com", h: "mailto:ashish.khoshya1998@gmail.com" }, { l: "Phone", v: "+91 7988721132", h: "tel:+917988721132" }, { l: "LinkedIn", v: "Connect on LinkedIn", h: "https://linkedin.com/in/ashish-khoshya" }, { l: "Medium", v: "Read my articles", h: "https://medium.com/@ashish.khoshya1998" }].map((c, i) => <div key={i} style={{ padding: m ? "16px 20px" : "22px 28px", background: t.card, border: `1px solid ${t.border}`, borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: t.accent, marginBottom: 8 }}>{c.l}</div>{c.h ? <a href={c.h} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FB, fontSize: m ? 13 : 15, color: t.text, textDecoration: "none", borderBottom: `1px solid ${t.border}`, display: "inline-block", minHeight: 44, paddingTop: 10, paddingBottom: 2, wordBreak: "break-all" }}>{c.v}</a> : <div style={{ fontFamily: FB, fontSize: m ? 13 : 15, color: t.text }}>{c.v}</div>}</div>)}</div></FadeIn><footer style={{ marginTop: m ? 48 : 80, paddingTop: 24, borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: FB, color: t.muted }}><span>© 2025 Ashish Khoshya</span><span>Bengaluru, India</span></footer></Wrap></section>); }

/* ═══ ZZAZZ MAIN ═══ */
function ZZAZZDetail({ goBack, goTo }) { const { t } = useTheme(); const C = AMBER, m = useIsMobile(); useEffect(() => { window.scrollTo(0, 0); }, []); return (<Wrap>
  <Hero2 title="ZZAZZ Terminal" subtitle="Architecting a New Content Economy" category="Product Architecture · Ecosystem Design" date="~6 Months" role="Designer · UX Architect · Product Architect" team="Founder · Product Lead · AI Team · 2 Designers" color={C} overview="I joined a company with a working Large Pricing Model but no path to market. I reframed disconnected POCs into one coherent ecosystem." myRole="I closely collaborated with the Founder, Product Lead, and AI team for scoping — understanding what could be solved and what couldn't. I designed the end-to-end journey, architected each vertical, conducted user research, and designed interaction models, working alongside 2 fellow designers." />
  <CS label="Turning Point" labelColor={C} title="From POCs to Ecosystem"><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>The AI team had a working LPM. Exchange existed as tables. Publish existed for publishers. TimePay was a concept. Nothing connected. I realized: <strong style={{ color: t.text }}>pricing alone would never work.</strong></p><QB text="I moved the conversation from 'Which POC do we show?' to 'What ecosystem will make any one POC believable?'" color={C} /></CS>
  <Divider />
  <CS label="Scoping" labelColor={C} title="Working with Founder, Product Lead & AI Team"><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>Before designing anything, I needed to understand technical constraints. I worked with the Founder on thesis, the Product Lead on capabilities, and the AI team on LPM limits.</p><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3,1fr)", gap: 14, marginTop: 24 }}>{[{ e: "🎯", title: "Can the LPM support this?", d: "AI team helped me understand which content types could be priced reliably." }, { e: "📈", title: "Does this move the thesis?", d: "Founder helped prioritize by investor credibility." }, { e: "🔧", title: "Can we build in time?", d: "Product Lead scoped to achievable timelines." }].map((p, i) => <FadeIn key={i} delay={i * 0.1}><div style={{ padding: 22, background: t.card, border: `1px solid ${t.border}`, borderRadius: 4 }}><div style={{ fontSize: 20, marginBottom: 8 }}>{p.e}</div><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 4 }}>{p.title}</div><p style={{ fontFamily: FB, fontSize: 13, lineHeight: 1.7, color: t.subtle, margin: 0 }}>{p.d}</p></div></FadeIn>)}</div></CS>
  <Divider />
  <CS label="User Research" labelColor={C} title="What Users Told Me"><KF icon="💬" title="Questions, Not Filters" color={C} problem="Users wanted to ask questions — not apply 5 filters." data="Drove Exchange redesign" /><KF icon="💰" title="Price = Value When Free, Fear When Paid" color={C} problem="Price was a quality signal — until payment entered." data="Made TimePay essential" /><KF icon="🚫" title="'Buy Content' Felt Wrong" color={C} problem="I changed language to 'access' and 'unlock'." /><KF icon="📱" title="Nobody Wants Another Platform" color={C} problem="Users have workflows. They won't switch." data="Led to plugin strategy" /></CS>
  <Divider />
  <CS label="Journey" labelColor={C} title="Content Lifecycle"><PS number={1} title="Enters via Publish or Moments" description="Publishers or creators." color={C} /><PS number={2} title="LPM prices dynamically" description="Intrinsic + extrinsic signals." color={C} /><PS number={3} title="DOTS adds protection" description="Cryptographic identity." color={C} /><PS number={4} title="Exchange makes discoverable" description="Query-led discovery." color={C} /><PS number={5} title="TimePay handles access" description="Cash, credits, or sponsorship." color={C} /><PS number={6} title="Ad Exchange powers sponsorship" description="Content-intent matching." color={C} /><PS number={7} title="Earnings flow back" description="Revenue to creators." color={C} /><Img label="Ecosystem architecture — circular economy" color={C} /></CS>
  <Divider />
  <FadeIn><SL color={C}>The Verticals</SL><h3 style={{ fontFamily: FD, fontSize: m ? 24 : 34, color: t.text, margin: "0 0 10px 0", fontWeight: 400 }}>Six Verticals I Architected</h3><p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, marginBottom: 32, maxWidth: 600 }}>Each solves an adoption barrier. Skim below — click any deep dive for details.</p></FadeIn>
  <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 56 }}>
    <VC emoji="📊" title="Exchange" status="Existed → Redesigned" color={C} problem="Table-heavy, overwhelming." whatIDid="Query-led AI-native interaction — ask questions, get curated results." outcome="Natural language insights instead of filters." onDeepDive={() => goTo("zzazz-exchange")} />
    <VC emoji="📰" title="Publish" status="Existed → Expanded" color={C} problem="Basic metrics only." whatIDid="Flexible workspace for internal pricing. Modular dashboards per publisher." outcome="Publishers adopted pricing as internal decision tool." onDeepDive={() => goTo("zzazz-publish")} />
    <VC emoji="✨" title="Moments" status="New — I Created" color={C} problem="No creator monetization from day one." whatIDid="Set the base, defined full IA + wireframes, delegated UI to team member." outcome="Content quality > follower count for monetization." onDeepDive={() => goTo("zzazz-moments")} />
    <VC emoji="⏱" title="TimePay" status="Concept → Developed" color={C} problem="Cash-per-article fails in India." whatIDid="Three paths: cash, credits, sponsored attention ('Get sponsored by')." outcome="Captured 80-98% who'd never subscribe." onDeepDive={() => goTo("zzazz-timepay")} />
    <VC emoji="📣" title="Ad Exchange" status="Discovered Need" color={C} problem="Cookie targeting dying." whatIDid="Content-intent contextual ads. Cricket article → cricket equipment ad." outcome="50% higher CTR, 30% higher conversion." onDeepDive={() => goTo("zzazz-adexchange")} />
    <VC emoji="🔗" title="DOTS Protocol" status="New — I Introduced" color={C} problem="Copying breaks revenue." whatIDid="Cryptographic lineage. Derivatives link to originals. Revenue splits." outcome="Creators participate in downstream value chain." onDeepDive={() => goTo("zzazz-dots")} />
  </div>
  <Divider />
  <CS label="Signals" labelColor={C} title="What We Observed"><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 14 }}>{["Publishers adopted pricing internally before showing users — validating standalone value.", "Users interpreted price as value signal when informational — confirming core thesis.", "Payment hesitation confirmed adoption is psychological — validating TimePay.", "Investors responded positively to conversational interface — matched AI patterns."].map((s, i) => <FadeIn key={i} delay={i * 0.08}><div style={{ padding: 22, background: t.card, border: `1px solid ${t.border}`, borderRadius: 4 }}><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, margin: 0 }}>{s}</p></div></FadeIn>)}</div></CS>
  <Divider />
  <CS label="Reflection" labelColor={C}><PS number={1} title="Ecosystem coherence is the product" description="The moat was how pieces reinforced each other." color={C} /><PS number={2} title="Psychology before technology" description="Adoption required solving fear of paying, not proving pricing." color={C} /><PS number={3} title="Meet users where they are" description="Plugin strategy from accepting users won't adopt new platforms." color={C} /></CS>
  <Bk onClick={goBack} />
</Wrap>); }
function ZSub({ goBack, title, subtitle, color, children }) { const { t } = useTheme(); const m = useIsMobile(); useEffect(() => { window.scrollTo(0, 0); }, []); return (<Wrap><div style={{ paddingTop: m ? 100 : 120, paddingBottom: m ? 36 : 52 }}><button onClick={goBack} style={{ background: "none", border: "none", color: AMBER, fontFamily: FB, fontSize: 12, cursor: "pointer", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, padding: 0, marginBottom: 20 }} onMouseEnter={e => e.currentTarget.style.opacity = "0.7"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>← Back to ZZAZZ</button><div style={{ fontFamily: FB, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color, marginBottom: 12 }}>ZZAZZ · Deep Dive</div><h1 style={{ fontFamily: FD, fontSize: m ? 28 : "clamp(36px,5vw,52px)", lineHeight: 1.1, color: t.text, margin: 0, fontWeight: 400 }}>{title}</h1><p style={{ fontFamily: FB, fontSize: m ? 14 : 16, color: t.muted, fontStyle: "italic", marginTop: 8 }}>{subtitle}</p></div>{children}<Bk onClick={goBack} label="← Back to ZZAZZ" /></Wrap>); }

function ZExchange({ goBack }) { const { t } = useTheme(); const C = AMBER; return (<ZSub goBack={goBack} title="Exchange" subtitle="Table-Heavy → Query-Led Discovery" color={C}><CS label="What Existed" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>Tables, price movement, trust factors. Users had to learn the data model first.</p><Img label="Old Exchange" color={C} /></CS><Divider /><CS label="Insight" labelColor={C} title="Users Think in Questions"><QB text="I want to know what's trending — without drowning in rows." author="Priya, Content Researcher" color={C} /></CS><Divider /><CS label="Redesign" labelColor={C} title="Query-Led, AI-Native"><DC color={C} title="Module vs Hybrid vs Chat" context="How should Exchange work?" options={[{ text: "Better filters", chosen: false }, { text: "Hybrid — chat + structured views on demand", chosen: true }, { text: "Full chat only", chosen: false }]} reasoning="Hybrid lets users ask questions and call structured views when needed." /><BA beforeLabel="Old: Table-first" afterLabel="New: Query-led" /><Vid label="Exchange prototype" color={C} /></CS></ZSub>); }
function ZPublish({ goBack }) { const { t } = useTheme(); const C = AMBER; return (<ZSub goBack={goBack} title="Publish" subtitle="Building Publisher Confidence" color={C}><CS label="Existed" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>Basic metrics. No pricing intelligence.</p></CS><Divider /><CS label="Redesign" labelColor={C}><DC color={C} title="Universal vs Modular" context="One dashboard or adaptive?" options={[{ text: "Universal", chosen: false }, { text: "Modular per workflow", chosen: true }]} reasoning="Publishers operate differently. Modular components + consistent pricing logic." /><Img label="Publish — modular workspace" color={C} /></CS></ZSub>); }
function ZMoments({ goBack }) { const { t } = useTheme(); const C = AMBER; return (<ZSub goBack={goBack} title="Moments" subtitle="Content = Monetizable Unit" color={C}><CS label="Why" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>50%+ creators earn under $15K/year. Good content stays weakly monetized.</p></CS><Divider /><CS label="My Role" labelColor={C} title="Foundation → Delegation"><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>I set the base, designed <strong style={{ color: t.text }}>full IA and wireframes</strong>, then delegated detailed UI to a team member.</p></CS><Divider /><CS label="IA" labelColor={C}><PS number={1} title="Create content" description="Text, audio, video." color={C} /><PS number={2} title="Pre-pub pricing" description="Improve before going live." color={C} /><PS number={3} title="Choose rights" description="View-only, transferable, editorial, derivative." color={C} /><PS number={4} title="Publish to Exchange" description="Enters the market." color={C} /><Img label="Moments — IA and wireframes" color={C} /></CS></ZSub>); }
function ZTimePay({ goBack }) { const { t } = useTheme(); const C = AMBER; const m = useIsMobile(); return (<ZSub goBack={goBack} title="TimePay" subtitle="Making Priced Content Adoptable" color={C}><CS label="Problem" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>1.9% subscription penetration. 57% leave at paywalls.</p></CS><Divider /><CS label="Three Paths" labelColor={C}><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3,1fr)", gap: 14, margin: "24px 0" }}>{[{ e: "💵", t: "Cash", d: "Direct payment" }, { e: "🪙", t: "Credits", d: "Earned, redeemed" }, { e: "👀", t: "Attention", d: "'Get sponsored by'" }].map((p, i) => <FadeIn key={i} delay={i * 0.1}><div style={{ padding: 22, background: `${C}08`, border: `1px solid ${C}15`, textAlign: "center", borderRadius: 4 }}><div style={{ fontSize: 26, marginBottom: 10 }}>{p.e}</div><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 4 }}>{p.t}</div><p style={{ fontFamily: FB, fontSize: 13, lineHeight: 1.6, color: t.subtle, margin: 0 }}>{p.d}</p></div></FadeIn>)}</div><Img label="TimePay — three paths" color={C} /></CS></ZSub>); }
function ZAdExchange({ goBack }) { const { t } = useTheme(); const C = AMBER; return (<ZSub goBack={goBack} title="Ad Exchange" subtitle="Content-Intent, Not Cookies" color={C}><CS label="Why" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>Cookie disabling drops revenue 27-34%.</p></CS><Divider /><CS label="Logic" labelColor={C}><KF icon="🏏" title="Cricket Example" color={C} problem="Kohli's century → cricket equipment ad converts. Not random banners." data="50% higher CTR, 30% higher conversion" /><Img label="Ad Exchange — intent matching" color={C} /></CS></ZSub>); }
function ZDOTS({ goBack }) { const { t } = useTheme(); const C = AMBER; return (<ZSub goBack={goBack} title="DOTS Protocol" subtitle="Visible Lineage, Not Impossible Copying" color={C}><CS label="Why" labelColor={C}><p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>50K bot scrapes/day vs 20 humans. Ownership vanishes.</p></CS><Divider /><CS label="How" labelColor={C}><PS number={1} title="DOT identity" description="Cryptographic hash." color={C} /><PS number={2} title="Derivatives link" description="Linked DOT IDs." color={C} /><PS number={3} title="Revenue splits" description="20% use = 20% back." color={C} /><Img label="DOTS — lineage" color={C} /></CS><FadeIn><div style={{ background: `${AMBER}08`, border: `1px solid ${AMBER}18`, padding: 24, marginBottom: 56, borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 13, color: AMBER, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>Honest Limitation</div><p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle }}>Written content is trickier than audio/video. DOTS evolves for text.</p></div></FadeIn></ZSub>); }

/* ═══ GSTR-3B — FULL DEPTH ═══ */
function GSTR3BDetail({ goBack }) { const { t } = useTheme(); const C = GREEN, m = useIsMobile(); useEffect(() => { window.scrollTo(0, 0); }, []); return (<Wrap>
  <Hero2 title="Enhancing GSTR-3B Filing for Businesses" subtitle="Simplifying GST Compliance at Scale" category="B2B · Enterprise UX" date="Jun 2022 – Feb 2024" role="UX Design · UI Design · Research" team="4 Product Designers · 1 PM · 3 Developers" color={C} overview="India's GST regime requires over 1.4 crore businesses to file GSTR-3B returns monthly. The GSTN portal and Clear GST 1.0 limited users to one GSTIN at a time — creating massive inefficiencies. I redesigned the end-to-end experience, reducing filing time from 1 hour to under 8 minutes per GSTIN and tripling adoption." myRole="Led end-to-end UX: conducted 50+ user interviews, defined IA, designed all screens, and drove post-launch iteration. Uncovered the critical 'adoption ≠ proficiency' flaw through field shadowing that changed our entire post-launch strategy." />

  <CS label="The Problem" labelColor={C} title="What We Were Up Against">
    <QB text="My team of 6 spends 5 full days every month filing for 120 GSTINs. We make mistakes because the process creates mistakes." author="CFO, Manufacturing Firm" color={C} />
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle, margin: "20px 0 16px" }}>Five core challenges drove our design mandate:</p>
    <PS number={1} title="High Cognitive Load" description="Manual tracking and verification of data across GSTINs increased mental burden exponentially with scale." color={C} />
    <PS number={2} title="Limited Automation" description="Restrictions on copy-pasting led to manual data entry errors — 82% of users copied from Excel." color={C} />
    <PS number={3} title="Reconciliation Complexities" description="Matching GSTR-2B with purchase registers was cumbersome, affecting ITC claims — 65% of tickets were ITC mismatches." color={C} />
    <PS number={4} title="Filing Flow Abandonment" description="Users frequently abandoned the process due to unclear data requirements and a standalone data source step." color={C} />
    <PS number={5} title="Excel Dependency" description="Users were forced to rely on Excel for filtering, pivot tables, and bulk actions the platform should have provided." color={C} />
  </CS>
  <Divider />

  <CS label="Research" labelColor={C} title="50+ Interviews · 500+ Tickets · 3 Usability Tests">
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>{[{ n: "50+", l: "User Interviews", s: "MSMEs, enterprises, CAs" }, { n: "500+", l: "Support Tickets Analysed", s: "Pattern identification" }, { n: "3", l: "Usability Tests", s: "GSTN portal & Clear 1.0" }].map((r, i) => <FadeIn key={i} delay={i * 0.08}><div style={{ padding: 22, background: t.card, border: `1px solid ${t.border}`, textAlign: "center", borderRadius: 4 }}><div style={{ fontFamily: FD, fontSize: 30, color: C, fontWeight: 700 }}>{r.n}</div><div style={{ fontFamily: FB, fontSize: 13, color: t.text, fontWeight: 600, marginTop: 6 }}>{r.l}</div><div style={{ fontFamily: FB, fontSize: 12, color: t.muted, marginTop: 3 }}>{r.s}</div></div></FadeIn>)}</div>
    <KF icon="📋" title="Multi-GSTIN Burden" color={C} problem="Businesses spent 40–50 hours monthly on 3B filing, one GSTIN at a time. An FMCG enterprise's finance team dedicated 5 full days/month to file for 120 GSTINs." data="78% of enterprises with 10+ GSTINs cited multi-filing as their #1 pain point" />
    <KF icon="📊" title="Excel Dependency" color={C} problem="Users needed Excel for reconciliation, filtering, and bulk actions. A tax consultant managing 30 clients relied entirely on pivot tables for data sorting." data="82% of users copied data from Excel to the portal — increasing error rates by 25%" />
    <KF icon="😰" title="Reconciliation Anxiety" color={C} problem="Users struggled with mismatched ITC claims due to incorrect vendor filings. An MSME owner feared ITC blockages from vendor errors in GSTR-1." data="65% of support tickets were ITC mismatches in Clear GST 1.0" />
    <KF icon="❓" title="Table-4 Confusion" color={C} problem="Users lacked clarity on ITC claims, ineligible amounts, and reversals. A CA rechecked Table-4 entries 3–4 times before submitting every month." data="89% reverted to Excel, leading to mismatches and CSM escalations" />
  </CS>
  <Divider />

  <CS label="Design Goals" labelColor={C} title="Five Core Design Mandates">
    <PS number={1} title="Enable Bulk Filing for Multiple GSTINs" description="Design centralised screens to manage all GSTINs in one place with batch actions — eliminating repetitive work for enterprises." color={C} />
    <PS number={2} title="Automate Reconciliation Between PR and GSTR-2B" description="Build a pre-filing reconciliation engine with smart suggestions to take ITC actions — minimising manual effort and errors." color={C} />
    <PS number={3} title="Data Source Flexibility" description="Let users choose datasets (e.g., PR, GSTR-2B) to auto-populate tables, with table-wise mapping and smart defaults." color={C} />
    <PS number={4} title="Replicate Excel-Like Flexibility In-Platform" description="Introduce filtering, sorting, grouping, and bulk actions natively — eliminating back-and-forth between Excel and the portal." color={C} />
    <PS number={5} title="Generate Table-4 Directly from 2B vs PR Recon" description="Auto-populate Table-4 based on reconciliation outcomes — simplifying ITC computation and building user confidence." color={C} />
  </CS>
  <Divider />

  <CS label="Information Architecture" labelColor={C} title="6-Step Filing Workflow">
    <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, marginBottom: 24 }}>I designed the IA with a clear focus on the objective of each page — balancing compliance requirements with user efficiency.</p>
    {[
      { step: "1", label: "GST Landing Page", items: ["GSTR-3B Filing", "Other Filings (GSTR-1, 6, 8, 9, 9C, ITC-04)"] },
      { step: "2", label: "Pre-Preparation — Data Source Setup", items: ["Select Business Unit (PAN or GSTINs)", "Select Return Period", "Activate GSTN Connection for All GSTINs", "Confirm & Review Data Sources"] },
      { step: "3", label: "Data Preparation (Step 1/4)", items: ["GSTIN Activation to Download Latest GSTN Data", "Import Latest PR & SR Data", "Check Availability of Sales & Purchase Data", "Run 2B vs PR Reconciliation for ITC (Table-4)"] },
      { step: "4", label: "Review Tax Calculation & Offset (Step 2/4)", items: ["Review Detailed Tax Calculation", "Review Summary of Liabilities", "Tax Calculator (Government vs. Clear GST)", "Apply Rule 86B if applicable", "Create Challans"] },
      { step: "5", label: "Upload to GSTN (Step 3/4)", items: ["Upload Data to GSTN", "Post Credit to Ledger", "Multi-Challan Creation for 100+ GSTINs"] },
      { step: "6", label: "Filing & Status Review (Step 4/4)", items: ["Review Upload Status & Tax Payable", "Select Filing Method (EVC / DSC)", "Unified Status Dashboard across GSTINs"] },
    ].map((s, i) => <FadeIn key={i} delay={i * 0.06}><div style={{ display: "flex", gap: 20, marginBottom: 20 }}><div style={{ minWidth: 36, height: 36, borderRadius: "50%", border: `2px solid ${C}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: 15, color: C, fontWeight: 600, flexShrink: 0 }}>{s.step}</div><div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 4, padding: "16px 20px", flex: 1 }}><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 8 }}>{s.label}</div>{s.items.map((item, j) => <div key={j} style={{ fontFamily: FB, fontSize: 13, color: t.subtle, lineHeight: 1.7 }}>· {item}</div>)}</div></div></FadeIn>)}
  </CS>
  <Divider />

  <CS label="Design Solutions" labelColor={C} title="What I Built">
    <h4 style={{ fontFamily: FB, fontSize: 17, color: t.text, fontWeight: 600, marginBottom: 8 }}>A. Data Source Selection Interface</h4>
    <p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, marginBottom: 16 }}>Table-specific mapping with dropdown menus (e.g., "Table-4: GSTR-2B + PR"), smart auto-suggested defaults for SMEs, and a preview mode to validate auto-filled values before proceeding.</p>
    <Img label="Data Source Selection — table-wise mapping with smart defaults" color={C} />
    <Divider />
    <h4 style={{ fontFamily: FB, fontSize: 17, color: t.text, fontWeight: 600, marginBottom: 8, marginTop: 28 }}>B. Multi-GSTIN Filing Dashboard</h4>
    <p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, marginBottom: 16 }}>Centralised status overview tracking pending filings, tax liabilities, and ITC statuses. Batch filing for 10+ GSTINs in one click. Enterprises activated 20+ GSTINs in under 10 minutes.</p>
    <QB text="I need to see which GSTINs are due at a glance." author="Sunita, CFO — Manufacturing Firm" color={C} />
    <Img label="Multi-GSTIN Dashboard — batch filing and status overview" color={C} />
    <Divider />
    <h4 style={{ fontFamily: FB, fontSize: 17, color: t.text, fontWeight: 600, marginBottom: 8, marginTop: 28 }}>C. Pre-Filing Reconciliation Engine</h4>
    <p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle, marginBottom: 16 }}>Split-view comparison of GSTR-2B vs Purchase Register with mismatches highlighted. Bulk approve/reject for 100+ invoices in one click. Vendor grouping and partial invoice matching added post-launch.</p>
    <Img label="Reconciliation Engine — split-view with live Table-4 impact" color={C} />
    <Divider />
    <h4 style={{ fontFamily: FB, fontSize: 17, color: t.text, fontWeight: 600, marginBottom: 8, marginTop: 28 }}>D. Table-4 Live Preview</h4>
    <DC color={C} title="How to Surface Table-4 Impact" context="Users didn't trust auto-generated values and couldn't see how reconciliation decisions affected their ITC computations." options={[{ text: "Tooltip per cell", chosen: false }, { text: "Side panel with live preview as decisions are made", chosen: true }, { text: "Post-fill summary only", chosen: false }]} reasoning="Live side panel shows cause-and-effect in real time. Each reconciliation action immediately updates Table-4 — turning a black box into a transparent, trustworthy system." />
  </CS>
  <Divider />

  <CS label="Accessibility" labelColor={C} title="Designing for India's Diverse MSMEs">
    <PS number={1} title="Keyboard-Navigable Filing" description="Every step keyboard-accessible — critical for CAs processing dozens of returns daily without leaving the keyboard." color={C} />
    <PS number={2} title="High-Contrast Tax Tables" description="WCAG AA for complex numerical data — ensuring readability for users in variable lighting conditions across India." color={C} />
    <PS number={3} title="Screen-Reader Forms" description="Proper labels, fieldsets, and ARIA attributes for the multi-step filing flow." color={C} />
    <PS number={4} title="Multi-Cue Error States" description="Color + icon + text — never color alone. Ensures error clarity for users with colour vision deficiencies." color={C} />
  </CS>
  <Divider />

  <CS label="Post-Launch · The 90-90-90 Drive" labelColor={C} title="When Good Metrics Lied">
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle }}>Post-launch, we initiated a customer adoption drive where CSMs were incentivised to ensure users adopted critical features and filed GSTR-3B independently. Monthly retros revealed a critical flaw.</p>
    <QB text="Adoption ≠ Proficiency. CSMs were doing tasks for users to hit targets. Users were filing but not mastering the platform." color="#F55050" />
    <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, margin: "16px 0" }}>We shifted from CSM-led metrics to direct user shadowing — asking open-ended questions like <em style={{ color: t.text }}>"How would you solve this without the platform?"</em></p>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 14, margin: "24px 0" }}>
      {[{ n: "47%", l: "Drop-off at Data Source step" }, { n: "89%", l: "Recon → Table-4 abandonment" }].map((x, i) => <FadeIn key={i} delay={i * 0.1}><div style={{ padding: 22, background: "rgba(245,80,80,0.04)", border: "1px solid rgba(245,80,80,0.1)", textAlign: "center", borderRadius: 4 }}><div style={{ fontFamily: FD, fontSize: 34, color: "#F55050", fontWeight: 700 }}>{x.n}</div><div style={{ fontFamily: FB, fontSize: 13, color: t.muted, marginTop: 5 }}>{x.l}</div></div></FadeIn>)}
    </div>
    <KF icon="🚧" title="Data Source Page as a Barrier" color="#F55050" problem="Users saw the standalone data source setup as a gatekeeper step, not a workflow enabler. Why can I not adjust sources directly in the GSTR-3B form? — MSME Owner" data="47% dropped off or called CSMs to bypass this step" />
    <KF icon="🔲" title="Table-4 Opaqueness" color="#F55050" problem="I download the recon to Excel, create pivot tables, and cross-check. Your platform logic is a black box. — Tax Consultant. Users needed to see how each reconciliation action impacted Table-4." data="89% reverted to Excel — mismatches and CSM escalations followed" />
    <KF icon="📑" title="Excel Dependency Persisted" color="#F55050" problem="Lack of native filtering, grouping, and bulk actions forced users to download data even after launch." />
  </CS>
  <Divider />

  <CS label="Iterations" labelColor={C} title="How I Fixed It">
    <PS number={1} title="Data Source: Contextual Integration" description="Moved data source configuration inside the GSTR-3B form itself. Users could now adjust sources while reviewing Table-4 — eliminating the standalone 'gatekeeper' step. Drop-off: 47% → near-zero." color={C} />
    <BA beforeLabel="Standalone data source page (47% abandoned)" afterLabel="Inline source controls inside filing form" />
    <PS number={2} title="Transparent Table-4 Workflow" description="Introduced real-time Table-4 impact previews in the reconciliation table. Each row shows live impact on ITC — turning a black box into a transparent flow users could trust." color={C} />
    <Img label="Table-4 live preview — reconciliation drives real-time ITC updates" color={C} />
    <PS number={3} title="Excel-Free In-Platform Grouping" description="Introduced grouping and subgrouping capabilities to enable efficient bulk actions — replacing the need for Excel pivot tables natively." color={C} />
    <PS number={4} title="Multi-GSTIN Auto OTP Capture" description="Streamlined the upload process with automated OTP capture for multiple GSTINs (with user consent). Filing time: 30 min → 2 min per GSTIN batch." color={C} />
    <QB text="Finally, I can adjust sources right where I need them!" author="Deepak, MSME Owner" color={C} />
    <QB text="The live previews made Table-4 feel less like a mystery." author="Meera, Tax Consultant" color={C} />
  </CS>
  <Divider />

  <CS label="Impact" labelColor={C} title="Results Across Three Phases">
    <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
      <MC metric="87%" label="Filing time ↓" color={C} /><MC metric="53%" label="3B Adoption" color={C} /><MC metric="94%" label="Recon Accuracy" color={C} /><MC metric="73%" label="Escalations ↓" color={C} />
    </div>
    <CT headers={["Metric", "Clear GST 1.0", "2.0 Launch", "2.0 Post-Launch", "Impact"]} rows={[
      ["GST Adoption", "12%", "45%", "51%", "Significant adoption increase"],
      ["Revenue", "₹60cr", "₹100cr", "₹108cr", "Revenue growth across Clear GST"],
      ["GSTR-3B Adoption", "18%", "42%", "53%", "3B filing adoption tripled"],
      ["CSM Tickets/Customer/Mo", "2.7", "2.4", "1.8", "33% reduction in support load"],
      ["Speed per GSTIN", "1 hour", "<10 min", "<8 min", "87% filing time reduction"],
      ["Avg GSTINs per Customer", "4–5", "12–15", "12–15", "3x capacity increase"],
      ["Reconciliation Accuracy", "80%", "80–92%", "94%", "UX bucketing drove +14% accuracy"],
      ["Automation", "10%", "30%", "60%", "6x automation increase"],
      ["Table-4 Automation", "Manual", "20%", "33%", "Growing automated reconciliation"],
      ["CSM Escalations/Week", "92", "80", "25", "−73% escalation reduction"],
    ]} />
  </CS>
  <Divider />

  <CS label="Reflection" labelColor={C}>
    <PS number={1} title="Adoption ≠ Proficiency" description="Incentivising usage without ensuring understanding backfires. Field shadowing revealed what dashboards couldn't — users were filing but not mastering." color={C} />
    <PS number={2} title="Context > Isolation" description="Integrating data source configuration inline was a small structural change with massive UX impact. The context of the task matters more than the feature itself." color={C} />
    <PS number={3} title="Transparency Builds Trust" description="Users need to see how their actions impact outcomes. Live Table-4 previews transformed anxiety into confidence — and drove adoption where mandates couldn't." color={C} />
  </CS>
  <Bk onClick={goBack} />
</Wrap>); }

/* ═══ MINT V8 — FULL DEPTH ═══ */
function MintV8Detail({ goBack }) { const { t } = useTheme(); const C = BLUE, m = useIsMobile(); useEffect(() => { window.scrollTo(0, 0); }, []); return (<Wrap>
  <Hero2 title="Mint V8 Design System" subtitle="Token-Based, Theme-Ready System with PCS Logic" category="Design System" date="Mar 2023" role="Design System Lead" team="1 Frontend Dev · 4 Product Designers · Design Manager" color={C} overview="At Clear, we faced a growing design crisis: fragmented systems across Finance Cloud and Supply Chain Cloud, engineers hardcoding UI because they couldn't trust Figma, and 700+ button variants with zero docs. I led Mint V8 from scratch — inventing PCS Logic that reduced component variants by over 80% and achieved 100% team adoption in 6 weeks." myRole="Led the entire initiative from ideation to implementation. Conducted research on token systems and atomic design, created the foundational token structure, designed core components, authored PCS logic, collaborated with developers to align system in Figma and code, and trained cross-functional teams." />

  <CS label="The Challenge" labelColor={C} title="Five Reasons We Needed to Start Over">
    <PS number={1} title="Fragmented Systems" description="Products under Clear Finance Cloud and Supply Chain Cloud lacked a consistent UI — some used outdated Basil, others a barebones Mint library with no shared logic." color={C} />
    <PS number={2} title="Engineers Hardcoding UI" description="Without a reliable system, engineers frequently hardcoded visual decisions — diverging further from design intent with every sprint." color={C} />
    <PS number={3} title="Impossible Theming" description="Regional theming for global expansion was impossible without duplicating components entirely. Each new theme meant multiplying the maintenance burden." color={C} />
    <PS number={4} title="Component Variant Explosion" description="Buttons alone had 760+ variants. Badges: 624+. Inputs: 113+. Maintenance was a nightmare and no designer could keep up." color={C} />
    <PS number={5} title="Zero Documentation" description="5 designers, 5 different answers to the same question. There was no single source of truth — design decisions were tribal knowledge." color={C} />
    <QB text="I don't trust the Figma components. I just hardcode CSS." author="Amit, Frontend Engineer" color={C} />
  </CS>
  <Divider />

  <CS label="Phase 1 · Foundation" labelColor={C} title="Tokens Before Everything">
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle, marginBottom: 20 }}>I had never led a full design system build. I started by studying Material Design, Carbon, and atomic design principles. One insight stood out: <strong style={{ color: t.text }}>everything scalable starts with a token system.</strong> Tokens abstract the complexity of visual attributes into manageable, code-friendly constants.</p>
    <DC color={C} title="Token-First vs Component-First" context="The team wanted quick wins — ship some components now. But without tokens, we'd be painting over the same cracks." options={[{ text: "Components first — faster visible progress", chosen: false }, { text: "Tokens first — components inherit theming automatically", chosen: true }]} reasoning="'Paint the walls now, or fix the plumbing first.' A 3-week token foundation was approved. Every component built after would be theme-ready by default." />
    <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, margin: "20px 0 12px" }}>We structured tokens into four categories:</p>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2,1fr)", gap: 14, marginBottom: 24 }}>{[
      { icon: "Aa", title: "Typography Tokens", desc: "Type scale, font weights, line heights, letter spacing — semantically named by usage context (Display L, Body M, Label S, etc.)" },
      { icon: "⬜", title: "Spacing Tokens", desc: "Base-4 scale: 4px, 8px, 16px, 24px... Tokenised as S0–S10. Kept spacing consistent across all surfaces." },
      { icon: "🎨", title: "Colour Tokens", desc: "Functional names (primary, on-primary, container) not appearance names (blue, grey). Tokens mapped to different values per theme." },
      { icon: "◻", title: "Radius, Elevation & Shadows", desc: "Standardised corner radii (radius/sm, radius/md) and elevation levels — unifying UI depth and shape across products." },
    ].map((item, i) => <FadeIn key={i} delay={i * 0.08}><div style={{ padding: 22, background: t.card, border: `1px solid ${t.border}`, borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 20, marginBottom: 10 }}>{item.icon}</div><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 6 }}>{item.title}</div><p style={{ fontFamily: FB, fontSize: 13, lineHeight: 1.7, color: t.subtle, margin: 0 }}>{item.desc}</p></div></FadeIn>)}</div>
    <CT headers={["Role", "System Token", "Reference Token", "Raw Value"]} rows={[
      ["Primary", "mint.cfc.sys.color.primary", "mint.cfc.ref.color.blue-600", "#156CEF"],
      ["On Primary", "mint.cfc.sys.color.on-primary", "mint.cfc.ref.color.base-white", "#FFFFFF"],
      ["Primary Container", "mint.cfc.sys.color.primary-container", "mint.cfc.ref.color.blue-50", "#EFF8FF"],
    ]} />
  </CS>
  <Divider />

  <CS label="Phase 2 · Components" labelColor={C} title="Atomic Design — Atoms to Organisms">
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle, marginBottom: 20 }}>We followed an atomic design approach to structure the system into three logical layers. This ensured we never rebuilt the wheel — every molecule and organism used the same atomic base.</p>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>{[
      { label: "Atoms", desc: "Tokens, Icons, Typography, Colors — the foundational pieces", color: `${C}20`, border: `${C}30` },
      { label: "Molecules", desc: "Buttons, Input fields, Dropdowns — interactive components made of atoms", color: `${C}12`, border: `${C}20` },
      { label: "Organisms", desc: "Forms, Modals, Toolbars, Tables — complex structures composed of molecules", color: `${C}06`, border: `${C}15` },
    ].map((a, i) => <FadeIn key={i} delay={i * 0.1}><div style={{ padding: 22, background: a.color, border: `1px solid ${a.border}`, borderRadius: 4, textAlign: "center" }}><div style={{ fontFamily: FD, fontSize: 20, color: C, fontWeight: 600, marginBottom: 8 }}>{a.label}</div><p style={{ fontFamily: FB, fontSize: 13, lineHeight: 1.6, color: t.subtle, margin: 0 }}>{a.desc}</p></div></FadeIn>)}</div>
    <p style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.7, color: t.subtle }}>We also noticed a visual imbalance when icons appeared too bold or light compared to text. We created <strong style={{ color: t.text }}>dynamic icon sets</strong> — each icon in multiple visual weights (body, label) — so designers could switch based on component prominence. This brought significant improvement to visual rhythm and hierarchy.</p>
  </CS>
  <Divider />

  <CS label="Breakthrough" labelColor={C} title="Discovering PCS Logic">
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle, marginBottom: 20 }}>As we built molecules, we hit a wall — component bloat. 760+ button variants. Engineers still hardcoding. Then a whiteboard session revealed a powerful pattern: <strong style={{ color: C }}>nearly every component = Prefix + Content + Suffix.</strong></p>
    <Img label="Whiteboard: PCS discovery — the universal component shell" color={C} aspect="4/3" />
    <DC color={C} title="PCS Slot Granularity" context="How constrained should each P, C, S slot be? Open means anything goes, fixed means no flexibility." options={[{ text: "Fully open slots", chosen: false }, { text: "Constrained per component type", chosen: true }, { text: "Fixed — locked to one pattern", chosen: false }]} reasoning="Constrained slots = flexibility within guardrails. Buttons: prefix=icons only, content=text, suffix=icons/counters. This prevented misuse while enabling every real-world variant." />
    <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, margin: "20px 0 12px" }}>The impact was immediate — we rebuilt components using PCS logic and slashed variant counts:</p>
    <FadeIn><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>{[{ c: "Buttons", b: "760", a: "32" }, { c: "Badges", b: "624", a: "25" }, { c: "Inputs", b: "113", a: "40" }].map((v, i) => <div key={i} style={{ padding: 22, background: t.card, border: `1px solid ${t.border}`, textAlign: "center", borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 14, color: t.text, fontWeight: 600, marginBottom: 14 }}>{v.c}</div><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={{ fontFamily: FD, fontSize: 22, color: t.muted, textDecoration: "line-through" }}>{v.b}</span><span style={{ color: C, fontWeight: 700 }}>→</span><span style={{ fontFamily: FD, fontSize: 30, color: C, fontWeight: 700 }}>{v.a}</span></div></div>)}</div></FadeIn>
    <BA beforeLabel="760 button variants — maintenance nightmare" afterLabel="32 via PCS — every variant covered" />
    <QB text="The PCS logic literally saved us weeks in component rebuilding." author="Product Designer, Mint V8 team" color={C} />
  </CS>
  <Divider />

  <CS label="Theming" labelColor={C} title="Two Themes, Zero Component Duplication">
    <p style={{ fontFamily: FB, fontSize: 16, lineHeight: 1.8, color: t.subtle, marginBottom: 20 }}>We created two core themes — one for Clear Finance Cloud (CFC) and one for Clear Supply Chain (CSC). They differed only in primary colour shades. Thanks to token-first architecture, this required no component changes — just token value swaps.</p>
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <FadeIn><div style={{ padding: 28, background: "rgba(21,108,239,0.08)", border: "1px solid rgba(21,108,239,0.2)", textAlign: "center", borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 11, color: BLUE, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>Clear Finance Cloud</div><div style={{ fontFamily: FD, fontSize: 24, color: BLUE, marginBottom: 6 }}>Blue 600</div><div style={{ fontFamily: FB, fontSize: 12, color: t.muted }}>mint.cfc.sys.color.primary → #156CEF</div></div></FadeIn>
      <FadeIn delay={0.1}><div style={{ padding: 28, background: "rgba(147,51,234,0.08)", border: "1px solid rgba(147,51,234,0.2)", textAlign: "center", borderRadius: 4 }}><div style={{ fontFamily: FB, fontSize: 11, color: "#9333EA", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>Clear Supply Chain</div><div style={{ fontFamily: FD, fontSize: 24, color: "#9333EA", marginBottom: 6 }}>Purple 600</div><div style={{ fontFamily: FB, fontSize: 12, color: t.muted }}>mint.csc.sys.color.primary → #9333EA</div></div></FadeIn>
    </div>
    <Img label="Theme switching demo — CFC → CSC with zero component changes" color={C} />
  </CS>
  <Divider />

  <CS label="Adoption" labelColor={C} title="Bridging Designers and Engineers">
    <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, color: t.subtle, marginBottom: 20 }}>We didn't have a dedicated design systems engineering team. So I built adoption as a design problem, not a mandate.</p>
    <PS number={1} title="Weekly PCS Workshops" description="45-min sessions every Thursday. After 4 weeks, all designers were self-sufficient. Engineers attended too — they started contributing to the system." color={C} />
    <PS number={2} title="Figma Playground" description="A shared experimentation space with interactive PCS components. Designers could explore variants inline with live feedback." color={C} />
    <PS number={3} title="Token Sync Pipeline" description="Tokens documented in Figma, exported to JSON, implemented by devs as CSS variables. Planned: Style Dictionary → automated Storybook integration." color={C} />
    <PS number={4} title="Gradual Deprecation" description="2–3 screens per sprint migrated to Mint V8. By week 4, teams were voluntarily migrating their own screens without being asked." color={C} />
    <DC color={C} title="Hard Cutover vs Gradual Migration" context="The Design Manager wanted immediate system-wide deprecation of old components. I pushed back." options={[{ text: "Hard cutover — deprecate everything immediately", chosen: false }, { text: "Gradual — prove value per sprint, earn voluntary adoption", chosen: true }]} reasoning="Mandates create resistance. Each sprint that proved PCS logic's value converted skeptics into advocates. By week 6, adoption was 100% — because the team chose it." />
    <QB text="I was skeptical. Once I built with PCS, I couldn't go back." author="Vikram, Sr. Product Designer" color={C} />
    <QB text="Naming conventions and spacing rules made it so much easier to code with confidence." author="Frontend Engineer, Clear" color={C} />
  </CS>
  <Divider />

  <CS label="Impact" labelColor={C} title="Results That Spoke for Themselves">
    <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
      <MC metric="80%" label="Variant ↓" color={C} /><MC metric="70%" label="Dev effort ↓" color={C} /><MC metric="100%" label="Adoption in 6 wks" color={C} /><MC metric="2" label="Themes, 0 duplication" color={C} />
    </div>
    <CT headers={["Challenge", "Solution", "Outcome"]} rows={[
      ["Fragmented design language", "Mint V8 with token-based atomic architecture", "Unified experience across all product suites"],
      ["Hardcoded UI components", "Design tokens (typography, spacing, colour, elevation)", "Consistent patterns + seamless Figma-to-code mapping"],
      ["Impossible theming for global expansion", "Token values mapped per theme (CFC, CSC)", "Brand customisation without touching component logic"],
      ["700+ component variants", "PCS Logic (Prefix, Content, Suffix)", "80% variant reduction — improved design and dev velocity"],
      ["Poor design-engineering collaboration", "Workshops + Figma playground + token documentation", "Engineers contributing to the system; 70% less dev effort"],
      ["Inconsistent icon visual weight", "Dynamic icons in multiple contextual weights", "Improved visual rhythm and readability across all interfaces"],
    ]} />
  </CS>
  <Divider />

  <CS label="Looking Ahead" labelColor={C}>
    <PS number={1} title="Pattern Standardisation Across UX" description="Auditing and standardising all recurring interaction patterns — error handling, feedback messages, file imports, confirmation flows, and empty states — with consistent UX behaviours and micro-interactions." color={C} />
    <PS number={2} title="Developer Documentation Portal" description="Building a robust Storybook documentation portal as a single source of truth for developers, PMs, and designers." color={C} />
    <PS number={3} title="Motion & Interaction Tokens" description="Adding tokens for micro-interactions, animations, and transition timings to ensure consistency in motion design throughout the platform." color={C} />
    <PS number={4} title="Automated Token Pipeline" description="Style Dictionary for token export to JSON, CSS, SCSS, and JS. Figma plugins for PCS toggling. GitHub automation for token updates." color={C} />
  </CS>
  <Divider />

  <CS label="Reflection" labelColor={C}>
    <QB text="Design systems aren't about one perfect UI kit. They're about building a foundation that scales, adapts, and empowers everyone involved." color={C} />
    <PS number={1} title="Tokens First, Always" description="Everything scalable flows from a token system. Components built without tokens are houses built without foundations." color={C} />
    <PS number={2} title="Structure > Style" description="PCS abstracts structure, not just visuals. It's a thinking model as much as a design pattern — and that's what made it transferable to engineers." color={C} />
    <PS number={3} title="Adoption Is a Design Problem" description="Workshops and playgrounds beat mandates every time. Make the new system easier to use than the old one — and the team will choose it themselves." color={C} />
  </CS>
  <Bk onClick={goBack} />
</Wrap>); }

/* ═══ HOME ═══ */
function HomePage({ onOpen }) { const { t } = useTheme(); const [as, setAs] = useState("about"); const m = useIsMobile(); useEffect(() => { const h = () => { for (const id of ["contact", "skills", "experience", "work", "about"]) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 300) { setAs(id); break; } } }; window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []); return (<><Nav activeSection={as} currentPage="home" goHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} goTo={onOpen} /><main id="main-content"><Hero /><section id="work" aria-label="Selected Work" style={{ paddingTop: m ? 60 : 100, paddingBottom: m ? 60 : 100 }}><Wrap><FadeIn><SL>Selected Work</SL><h2 style={{ fontFamily: FD, fontSize: m ? 28 : 42, color: t.text, margin: "0 0 44px 0", fontWeight: 400, lineHeight: 1.15 }}>Featured <span style={{ fontStyle: "italic" }}>Case Studies</span></h2></FadeIn><div style={{ display: "flex", flexDirection: "column", gap: 28 }}>{projects.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpen} />)}</div></Wrap></section><ExperienceTimeline /><SkillsSection /><ContactSection /></main></>); }

/* ═══ ROOT ═══ */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const goTo = useCallback((id) => setPage(id), []);
  const goHome = useCallback(() => { setPage("home"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }, []);
  const goZzazz = useCallback(() => { setPage("zzazz"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }, []);
  return (
    <ThemeProvider>
      <PortfolioInner page={page} goTo={goTo} goHome={goHome} goZzazz={goZzazz} />
    </ThemeProvider>
  );
}

function PortfolioInner({ page, goTo, goHome, goZzazz }) {
  const { t } = useTheme();
  const liveRef = useRef(null);
  useEffect(() => {
    const titles = { home: "Home — Ashish Khoshya portfolio", zzazz: "ZZAZZ Terminal case study", "gstr-3b": "GSTR-3B Filing Redesign case study", "mint-v8": "Mint V8 Design System case study" };
    if (liveRef.current) liveRef.current.textContent = titles[page] || "Case study";
  }, [page]);
  return (<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{background:${t.bg};color:${t.text};overflow-x:hidden;transition:background 0.4s,color 0.4s;min-width:0;word-break:break-word}img,svg{max-width:100%;height:auto}::selection{background:${t.accent};color:${t.bg}}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${t.bg}}::-webkit-scrollbar-thumb{background:${t.accent}50;border-radius:3px}button:focus-visible{outline:2px solid ${t.accent};outline-offset:2px}a:focus-visible{outline:2px solid ${t.accent};outline-offset:3px;border-radius:2px}[role="button"]:focus-visible{outline:2px solid ${t.accent};outline-offset:2px}.skip-link{position:absolute;top:-100px;left:20px;z-index:9999;padding:10px 20px;background:${t.accent};color:#0A0A0A;font-family:${FB};font-size:14px;font-weight:700;text-decoration:none;border-radius:4px;transition:top 0.2s}.skip-link:focus{top:8px}table{border-collapse:collapse;width:100%}.mobile-menu-btn{display:none!important}@media(max-width:768px){.mobile-menu-btn{display:flex!important}}`}</style>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <div ref={liveRef} role="status" aria-live="polite" aria-atomic="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0, padding: 0, margin: "-1px" }} />
    {page === "home" && <HomePage onOpen={goTo} />}
    {page === "zzazz" && <><Nav currentPage="detail" goBack={goHome} goHome={goHome} goTo={goTo} /><main id="main-content"><ZZAZZDetail goBack={goHome} goTo={goTo} /></main></>}
    {page === "zzazz-exchange" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZExchange goBack={goZzazz} /></main></>}
    {page === "zzazz-publish" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZPublish goBack={goZzazz} /></main></>}
    {page === "zzazz-moments" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZMoments goBack={goZzazz} /></main></>}
    {page === "zzazz-timepay" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZTimePay goBack={goZzazz} /></main></>}
    {page === "zzazz-adexchange" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZAdExchange goBack={goZzazz} /></main></>}
    {page === "zzazz-dots" && <><Nav currentPage="detail" goBack={goZzazz} goHome={goHome} goTo={goTo} /><main id="main-content"><ZDOTS goBack={goZzazz} /></main></>}
    {page === "mint-v8" && <><Nav currentPage="detail" goBack={goHome} goHome={goHome} goTo={goTo} /><main id="main-content"><MintV8Detail goBack={goHome} /></main></>}
    {page === "gstr-3b" && <><Nav currentPage="detail" goBack={goHome} goHome={goHome} goTo={goTo} /><main id="main-content"><GSTR3BDetail goBack={goHome} /></main></>}
  </>);
}