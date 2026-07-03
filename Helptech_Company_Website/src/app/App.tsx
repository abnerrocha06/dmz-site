import { useState } from "react";
import logoImg from "../imports/Design_sem_nome.png";
import {
  Globe, Shield, Smartphone, ShoppingCart,
  ChevronRight, Cpu, ArrowRight,
  Code2, BarChart3, Layers, Menu, X as XIcon,
  Mail, Phone, MapPin, Send, Terminal,
} from "lucide-react";
import { CodeBackground } from "./components/CodeBackground";
import { SupermarketCheckout } from "./components/SupermarketCheckout";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const BG     = "#090e14";
const CARD   = "#0d1520";
const DARK   = "#0a1018";
const TEXT   = "#e2e8f0";
const SUB    = "#94a3b8";
const MUTED  = "#64748b";
const GREEN  = "#00ff88";
const CYAN   = "#00c9ff";

const border = (a = 0.12) => `rgba(0,255,136,${a})`;

const mono: React.CSSProperties = { fontFamily: "Share Tech Mono, monospace" };
const rajdhani: React.CSSProperties = { fontFamily: "Rajdhani, sans-serif" };

// ─── Small reusable pieces ────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN, marginBottom: "1rem" }}>
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ ...rajdhani, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: TEXT, lineHeight: 1.1, margin: 0 }}>
      {children}
    </h2>
  );
}

function TermLine({ cmd, out, outColor }: { cmd: string; out: string; outColor: string }) {
  return (
    <div>
      <div><span style={{ color: MUTED }}>$ </span><span style={{ color: CYAN }}>{cmd}</span></div>
      <div style={{ color: outColor, paddingLeft: "1rem" }}>{out}</div>
    </div>
  );
}

function ServiceCard({ icon, tag, title, desc, features }: {
  icon: React.ReactNode; tag: string; title: string; desc: string; features: string[];
}) {
  return (
    <div
      style={{ background: CARD, border: `1px solid ${border(0.12)}`, borderRadius: 16, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", transition: "all 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = border(0.4); e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = border(0.12); e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ padding: "0.75rem", borderRadius: 12, background: "rgba(0,255,136,0.1)", color: GREEN }}>{icon}</div>
        <span style={{ ...mono, fontSize: "0.65rem", color: "rgba(0,255,136,0.3)" }}>{tag}</span>
      </div>
      <div>
        <h3 style={{ ...rajdhani, fontWeight: 700, fontSize: "1.2rem", color: TEXT, marginBottom: "0.5rem" }}>{title}</h3>
        <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "auto" }}>
        {features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: SUB }}>
            <span style={{ color: GREEN }}>→</span>{f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5584994584536"; // (84) 99458-4536
    const text = `Nova mensagem pelo site HelpTech%0A%0A*Nome:* ${encodeURIComponent(form.name)}%0A*E-mail:* ${encodeURIComponent(form.email)}%0A*Mensagem:* ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); onClose(); }, 2500);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", background: BG,
    border: `1px solid ${border(0.2)}`, color: TEXT, borderRadius: 8,
    fontFamily: "Inter, sans-serif", fontSize: "0.9rem", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 720, borderRadius: 20, background: CARD, border: `1px solid ${border(0.25)}`, boxShadow: "0 0 60px rgba(0,255,136,0.1)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.5rem 2rem", borderBottom: `1px solid ${border(0.15)}` }}>
          <div><Tag>// fale_conosco</Tag><h2 style={{ ...rajdhani, fontSize: "1.5rem", fontWeight: 700, color: TEXT, margin: 0 }}>Entre em Contato</h2></div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: MUTED }}
            onMouseEnter={e => (e.currentTarget.style.color = GREEN)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
            <XIcon size={20} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Info column */}
          <div style={{ padding: "2rem", borderRight: `1px solid ${border(0.15)}`, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ color: SUB, fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              Nossa equipe está pronta para transformar suas ideias em soluções digitais de alto impacto.
            </p>
            {[
              { icon: <Mail size={16} />, label: "E-mail", value: "contato@helptech.com.br" },
              { icon: <Phone size={16} />, label: "Telefone / WhatsApp", value: "(84) 99458-4536" },
              { icon: <MapPin size={16} />, label: "Localização", value: "Natal, RN — Brasil" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: "0.75rem" }}>
                <span style={{ color: GREEN, marginTop: 2 }}>{icon}</span>
                <div>
                  <div style={{ ...mono, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED }}>{label}</div>
                  <div style={{ fontSize: "0.9rem", color: TEXT }}>{value}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "auto", background: BG, border: `1px solid ${border(0.12)}`, borderRadius: 12, padding: "1rem", ...mono, fontSize: "0.75rem", lineHeight: 2, color: GREEN }}>
              <span style={{ color: MUTED }}>$ </span>helptech --status<br />
              <span style={{ color: CYAN }}>→</span> Disponível para novos projetos<br />
              <span style={{ color: CYAN }}>→</span> Resposta em até 24h<br />
              <span style={{ color: GREEN }}>✓ </span>Online agora
            </div>
          </div>

          {/* Form column */}
          <form onSubmit={submit} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem", color: GREEN }}>
                <div style={{ fontSize: "2.5rem", ...mono }}>✓</div>
                <p style={{ textAlign: "center", ...rajdhani, fontSize: "1.1rem", color: TEXT, margin: 0 }}>
                  Mensagem pronta!<br /><span style={{ color: MUTED, fontSize: "0.85rem" }}>Abrimos o WhatsApp para você concluir o envio.</span>
                </p>
              </div>
            ) : (
              <>
                {[
                  { field: "name", label: "Seu Nome", placeholder: "Ex: João Silva", type: "text" },
                  { field: "email", label: "Seu E-mail", placeholder: "joao@empresa.com", type: "email" },
                ].map(({ field, label, placeholder, type }) => (
                  <div key={field}>
                    <label style={{ display: "block", ...mono, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, marginBottom: "0.4rem" }}>{label}</label>
                    <input required type={type} placeholder={placeholder} value={(form as any)[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={inp}
                      onFocus={e => (e.currentTarget.style.borderColor = border(0.6))}
                      onBlur={e => (e.currentTarget.style.borderColor = border(0.2))} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", ...mono, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, marginBottom: "0.4rem" }}>Mensagem</label>
                  <textarea required rows={4} placeholder="Descreva seu projeto ou necessidade..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inp, resize: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = border(0.6))}
                    onBlur={e => (e.currentTarget.style.borderColor = border(0.2))} />
                </div>
                <button type="submit"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.85rem", borderRadius: 10, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = CYAN)}
                  onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
                  <Send size={15} /> Enviar Mensagem
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Checkout Modal ───────────────────────────────────────────────────────────
function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 900, borderRadius: 20, background: BG, border: `1px solid ${border(0.2)}`, boxShadow: "0 0 80px rgba(0,255,136,0.08)", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Title bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1.2rem", background: CARD, borderBottom: `1px solid ${border(0.15)}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            </div>
            <span style={{ ...mono, fontSize: "0.72rem", color: MUTED }}>HelpTech PDV — Caixa 01 — Operador: João Silva</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ ...mono, fontSize: "0.68rem", padding: "0.2rem 0.7rem", background: "rgba(0,255,136,0.1)", color: GREEN, border: `1px solid ${border(0.2)}`, borderRadius: 6 }}>● SISTEMA ATIVO</span>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: MUTED, display: "flex" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ff5f57")}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
              <XIcon size={18} />
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <SupermarketCheckout />
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [contactOpen,  setContactOpen]  = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Início",   id: "hero" },
    { label: "Sobre",    id: "about" },
    { label: "Serviços", id: "services" },
    { label: "Projetos", id: "projects" },
  ];

  const services = [
    { icon: <Globe size={28} />,        tag: "01", title: "Criação de Sites",           desc: "Sites institucionais, landing pages e e-commerces com design moderno, SEO otimizado e performance máxima. Desenvolvidos em React, Next.js e tecnologias de ponta.", features: ["Design responsivo", "SEO avançado", "Alta performance", "Painel administrativo"] },
    { icon: <Shield size={28} />,       tag: "02", title: "Monitoramento Web",          desc: "Monitoramento 24/7 de uptime, desempenho e segurança dos seus sites. Alertas em tempo real e relatórios detalhados para garantir que sua plataforma nunca pare.",  features: ["Uptime 24/7", "Alertas automáticos", "Relatórios mensais", "Auditoria de segurança"] },
    { icon: <Smartphone size={28} />,   tag: "03", title: "Aplicativos Mobile",         desc: "Apps nativos e híbridos para Android e iOS. Da interface ao backend, desenvolvemos experiências móveis completas para conectar você aos seus clientes.",           features: ["iOS & Android", "UX/UI nativo", "APIs integradas", "Push notifications"] },
    { icon: <ShoppingCart size={28} />, tag: "04", title: "Software para Supermercados", desc: "Sistema completo de PDV para caixas de supermercado: gestão de estoque, emissão de NF-e, leitor de código de barras, integração com balanças e relatórios gerenciais.", features: ["PDV completo", "Emissão de NF-e", "Controle de estoque", "Relatórios gerenciais"] },
  ];

  const extras = [
    { icon: <Code2 size={20} />,    title: "APIs & Integrações",    desc: "Conectamos sistemas distintos com APIs RESTful e WebSockets." },
    { icon: <BarChart3 size={20} />, title: "Dashboards & Analytics", desc: "Painéis gerenciais com dados em tempo real para tomada de decisão." },
    { icon: <Layers size={20} />,   title: "Cloud & DevOps",         desc: "Deploy em nuvem, CI/CD e infraestrutura escalável para o seu negócio." },
  ];

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 88, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", background: "rgba(9,14,20,0.88)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border(0.1)}` }}>
        {/* Logo */}
        <img
          src={logoImg}
          alt="HelpTech"
          style={{
            height: 84,
            width: "auto",
            display: "block",
            objectFit: "contain",
            filter: "invert(1) hue-rotate(180deg) drop-shadow(0 0 8px rgba(0,255,136,0.4))",
          }}
        />

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "2rem" }}>
          {navLinks.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", color: SUB, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
              onMouseLeave={e => (e.currentTarget.style.color = SUB)}>
              {label}
            </button>
          ))}
          <button onClick={() => setContactOpen(true)}
            style={{ padding: "0.5rem 1.25rem", borderRadius: 8, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = CYAN)}
            onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
            Fale Conosco
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: GREEN }}>
          {menuOpen ? <XIcon size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 88, left: 0, right: 0, zIndex: 30, background: CARD, borderBottom: `1px solid ${border(0.15)}`, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {navLinks.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: TEXT }}>
              {label}
            </button>
          ))}
          <button onClick={() => { setContactOpen(true); setMenuOpen(false); }}
            style={{ padding: "0.6rem 1.2rem", borderRadius: 8, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "0.9rem", fontWeight: 600, width: "fit-content" }}>
            Fale Conosco
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "hidden", paddingTop: "7rem" }}>
        <CodeBackground />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(0,255,136,0.06) 0%, rgba(9,14,20,0.95) 70%)" }} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: 900, margin: "0 auto" }}>
          {/* Hero logo */}
          <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
            <img
              src={logoImg}
              alt="HelpTech"
              style={{
                width: "min(460px, 85vw)",
                height: "auto",
                display: "block",
                filter: "invert(1) hue-rotate(180deg) drop-shadow(0 0 40px rgba(0,255,136,0.55)) drop-shadow(0 0 80px rgba(0,255,136,0.2))",
              }}
            />
          </div>

          {/* Status badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: 999, border: `1px solid ${border(0.3)}`, background: "rgba(0,255,136,0.05)", color: GREEN, ...mono, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
            Sistema Online — Pronto para Atender
          </div>

          <h1 style={{ ...rajdhani, fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 700, lineHeight: 1.05, color: TEXT, letterSpacing: "-0.01em", margin: 0 }}>
            Tecnologia que <span style={{ color: GREEN }}>transforma</span><br />seu negócio
          </h1>

          <p style={{ marginTop: "1.5rem", maxWidth: 560, margin: "1.5rem auto 0", color: SUB, fontSize: "1.05rem", lineHeight: 1.75 }}>
            Da criação de sites ao desenvolvimento de sistemas para supermercados — a HelpTech entrega soluções digitais completas com precisão e performance.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
            <button onClick={() => setContactOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: 12, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.06em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = CYAN; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = GREEN; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Fale Conosco <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("services")}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: 12, background: "transparent", color: GREEN, border: `1px solid ${border(0.3)}`, cursor: "pointer", ...rajdhani, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.06em", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,136,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Ver Serviços <ChevronRight size={18} />
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", maxWidth: 420, margin: "5rem auto 0" }}>
            {[{ value: "50+", label: "Projetos" }, { value: "5 anos", label: "Experiência" }, { value: "100%", label: "Satisfação" }].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ ...rajdhani, fontSize: "2rem", fontWeight: 700, color: GREEN }}>{value}</div>
                <div style={{ ...mono, fontSize: "0.72rem", color: MUTED }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: MUTED, ...mono, fontSize: "0.65rem" }}>
          <span>scroll</span>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${GREEN}, transparent)` }} />
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="about" style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="block md:grid">
          <div>
            <Tag>// sobre_nos</Tag>
            <Heading>Quem é a <span style={{ color: GREEN }}>HelpTech</span>?</Heading>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", color: SUB, lineHeight: 1.85, fontSize: "0.95rem" }}>
              <p style={{ margin: 0 }}>A <strong style={{ color: TEXT }}>HelpTech</strong> é uma empresa de tecnologia fundada com a missão de democratizar o acesso a soluções digitais inteligentes para negócios de todos os tamanhos — desde pequenas lojas até grandes redes varejistas.</p>
              <p style={{ margin: 0 }}>Desenvolvemos <strong style={{ color: TEXT }}>sites profissionais</strong>, realizamos <strong style={{ color: TEXT }}>monitoramento contínuo</strong> de plataformas web, criamos <strong style={{ color: TEXT }}>aplicativos móveis</strong> e entregamos <strong style={{ color: TEXT }}>softwares sob medida</strong>, incluindo sistemas de caixa para supermercados com gestão de estoque, emissão de nota fiscal e integração com leitores de código de barras.</p>
              <p style={{ margin: 0 }}>Nossa equipe é formada por engenheiros e designers apaixonados por código limpo, interfaces funcionais e resultados que impactam o dia a dia do seu negócio.</p>
            </div>
            <button onClick={() => setContactOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem", background: "none", border: "none", cursor: "pointer", color: GREEN, ...rajdhani, fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.05em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={e => (e.currentTarget.style.color = GREEN)}>
              Iniciar um projeto <ArrowRight size={16} />
            </button>
          </div>

          {/* Terminal */}
          <div style={{ borderRadius: 20, overflow: "hidden", background: CARD, border: `1px solid ${border(0.2)}`, boxShadow: "0 0 40px rgba(0,255,136,0.05)" }}>
            <div style={{ background: BG, borderBottom: `1px solid ${border(0.12)}`, padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: "0.75rem", ...mono, fontSize: "0.72rem", color: MUTED }}>helptech@server:~$</span>
            </div>
            <div style={{ padding: "1.5rem", ...mono, fontSize: "0.85rem", color: SUB, lineHeight: 2, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <TermLine cmd="whoami"        out="HelpTech Solutions"                      outColor={GREEN} />
              <TermLine cmd="cat missao.txt" out="Transformar negócios com tecnologia"    outColor={TEXT}  />
              <TermLine cmd="ls ./servicos"  out="sites/ apps/ softwares/ monitoramento/" outColor={CYAN}  />
              <TermLine cmd="uptime"         out="5 anos, 50+ projetos entregues"         outColor={TEXT}  />
              <TermLine cmd="status --check" out="✓ Disponível para novos projetos"       outColor={GREEN} />
              <div style={{ color: GREEN }}><span style={{ color: MUTED }}>$ </span>_</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="services" style={{ padding: "8rem 0", background: DARK }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Tag>// o_que_fazemos</Tag>
            <Heading>Nossas <span style={{ color: GREEN }}>Soluções</span></Heading>
            <p style={{ marginTop: "1rem", maxWidth: 480, margin: "1rem auto 0", color: MUTED, lineHeight: 1.75 }}>
              Cobrimos todo o espectro digital — do frontend ao backend, do mobile ao software embarcado.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
            {services.map(s => <ServiceCard key={s.title} {...s} />)}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem", marginTop: "1.5rem" }}>
            {extras.map(({ icon, title, desc }) => (
              <div key={title}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: CARD, border: `1px solid ${border(0.1)}`, borderRadius: 12, padding: "1.25rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = border(0.3))}
                onMouseLeave={e => (e.currentTarget.style.borderColor = border(0.1))}>
                <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(0,255,136,0.1)", color: GREEN, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ ...rajdhani, fontWeight: 600, color: TEXT, fontSize: "1rem" }}>{title}</div>
                  <div style={{ color: MUTED, fontSize: "0.82rem", marginTop: "0.2rem", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETOS ── */}
      <section id="projects" style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 3rem" }}>
          <Tag>// projetos_anteriores</Tag>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <Heading>Nosso <span style={{ color: GREEN }}>Portfólio</span></Heading>
            <p style={{ maxWidth: 360, color: MUTED, lineHeight: 1.75, fontSize: "0.88rem", margin: 0 }}>
              Confira a demo interativa do nosso sistema PDV. Em breve mais projetos serão publicados aqui.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>

            {/* ── Demo card: PDV ── */}
            <button onClick={() => setCheckoutOpen(true)}
              style={{ background: CARD, border: `1px solid ${border(0.2)}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative", padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = border(0.5); e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border(0.2); e.currentTarget.style.boxShadow = "none"; }}>

              {/* Mini PDV preview */}
              <div style={{ padding: "1.25rem", aspectRatio: "16/9", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {["Arroz 5kg — R$24,90","Leite 1L — R$5,29","Feijão 1kg — R$9,49","Café 500g — R$15,90"].map(item => (
                      <div key={item} style={{ background: "rgba(0,255,136,0.05)", border: `1px solid ${border(0.1)}`, borderRadius: 4, padding: "0.25rem 0.5rem", fontSize: "0.58rem", color: SUB, ...mono }}>{item}</div>
                    ))}
                  </div>
                  <div style={{ width: 72, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ background: "rgba(0,201,255,0.05)", border: "1px solid rgba(0,201,255,0.15)", borderRadius: 6, padding: "0.5rem" }}>
                      <div style={{ fontSize: "0.42rem", color: MUTED, ...mono }}>TOTAL</div>
                      <div style={{ fontSize: "0.9rem", color: GREEN, ...rajdhani, fontWeight: 700 }}>R$55,58</div>
                    </div>
                    <div style={{ background: "rgba(0,255,136,0.15)", border: `1px solid ${border(0.3)}`, borderRadius: 4, padding: "0.25rem", textAlign: "center" }}>
                      <span style={{ fontSize: "0.48rem", color: GREEN, ...mono }}>PAGAR →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "0.9rem 1.25rem", borderTop: `1px solid ${border(0.1)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ ...mono, fontSize: "0.62rem", color: border(0.5) as unknown as string, letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Software PDV</div>
                  <div style={{ ...rajdhani, fontWeight: 700, color: TEXT, fontSize: "1rem" }}>Sistema de Caixa — Demo</div>
                </div>
                <span style={{ ...mono, fontSize: "0.62rem", padding: "0.2rem 0.6rem", background: "rgba(0,255,136,0.1)", color: GREEN, border: `1px solid ${border(0.25)}`, borderRadius: 4 }}>
                  AO VIVO
                </span>
              </div>
            </button>

            {/* ── Card: CERNE Engenharia & Arquitetura ── */}
            <div
              style={{ background: CARD, border: `1px solid ${border(0.2)}`, borderRadius: 16, overflow: "hidden", transition: "all 0.2s", position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = border(0.5); e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border(0.2); e.currentTarget.style.boxShadow = "none"; }}>

              {/* Mini preview estilo prancheta */}
              <div style={{ padding: "1.25rem", aspectRatio: "16/9", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.6rem", background: "#F6F4EF" }}>
                <div style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.12em", color: "#A6813F", textTransform: "uppercase" }}>Engenharia Civil &amp; Arquitetura</div>
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "#201F1C", lineHeight: 1.15 }}>
                  Estrutura que<br />sustenta ideias.
                </div>
                <svg viewBox="0 0 200 60" style={{ width: "70%", marginTop: "0.25rem" }}>
                  <path d="M10 55 L10 30 L45 30 L45 18 L80 18 L80 30 L115 30 L115 40 L140 40 L140 55 Z" stroke="#201F1C" strokeWidth="1.5" fill="none" />
                  <path d="M0 55 H150" stroke="#201F1C" strokeWidth="1" />
                </svg>
              </div>

              {/* Footer */}
              <div style={{ padding: "0.9rem 1.25rem", borderTop: `1px solid ${border(0.1)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ ...mono, fontSize: "0.62rem", color: border(0.5) as unknown as string, letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Site Institucional</div>
                  <div style={{ ...rajdhani, fontWeight: 700, color: TEXT, fontSize: "1rem" }}>CERNE Engenharia &amp; Arquitetura</div>
                </div>
                <span style={{ ...mono, fontSize: "0.62rem", padding: "0.2rem 0.6rem", background: "rgba(0,255,136,0.1)", color: GREEN, border: `1px solid ${border(0.25)}`, borderRadius: 4 }}>
                  CONCLUÍDO
                </span>
              </div>
            </div>

            {/* Empty slots */}
            {[3,4,5,6].map(i => (
              <div key={i} style={{ background: CARD, border: `1px dashed ${border(0.1)}`, borderRadius: 16, aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,255,136,0.04)", border: `1px solid ${border(0.1)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cpu size={16} style={{ color: "rgba(0,255,136,0.2)" }} />
                </div>
                <span style={{ ...mono, fontSize: "0.7rem", color: "rgba(0,255,136,0.2)" }}>projeto_{String(i).padStart(2,"0")}.exe</span>
                <span style={{ ...mono, fontSize: "0.62rem", color: "rgba(100,116,139,0.3)" }}>// em breve</span>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div style={{ marginTop: "2.5rem", background: CARD, border: `1px solid ${border(0.15)}`, borderRadius: 16, padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ ...rajdhani, fontWeight: 600, fontSize: "1.15rem", color: TEXT }}>Quer ser um dos nossos próximos cases?</div>
              <div style={{ color: MUTED, fontSize: "0.88rem", marginTop: "0.2rem" }}>Entre em contato e vamos construir algo incrível juntos.</div>
            </div>
            <button onClick={() => setContactOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: 10, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.05em", transition: "background 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => (e.currentTarget.style.background = CYAN)}
              onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
              Iniciar Projeto <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "8rem 3rem", textAlign: "center", background: DARK, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <Tag>// pronto_para_comecar</Tag>
          <Heading>Vamos construir sua <span style={{ color: GREEN }}>solução digital</span>?</Heading>
          <p style={{ marginTop: "1.2rem", color: SUB, fontSize: "0.98rem", lineHeight: 1.75 }}>
            Nossa equipe está disponível para entender suas necessidades e propor a melhor solução tecnológica para o seu negócio.
          </p>
          <button onClick={() => setContactOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "2.5rem", padding: "1.1rem 2.5rem", borderRadius: 12, background: GREEN, color: BG, border: "none", cursor: "pointer", ...rajdhani, fontSize: "1.05rem", fontWeight: 600, letterSpacing: "0.06em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = CYAN; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,201,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GREEN; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            Fale Conosco Agora <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2.5rem 3rem", background: BG, borderTop: `1px solid ${border(0.1)}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <img
            src={logoImg}
            alt="HelpTech"
            style={{
              height: 40,
              width: "auto",
              display: "block",
              objectFit: "contain",
              filter: "invert(1) hue-rotate(180deg) drop-shadow(0 0 6px rgba(0,255,136,0.3))",
            }}
          />
          <div style={{ ...mono, fontSize: "0.75rem", color: MUTED }}>© 2025 HelpTech. Todos os direitos reservados.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Sites","Apps","Monitoramento","Supermercados"].map(item => (
              <span key={item} style={{ fontSize: "0.78rem", color: MUTED }}>{item}</span>
            ))}
          </div>
        </div>
      </footer>

      <ContactModal  open={contactOpen}  onClose={() => setContactOpen(false)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
