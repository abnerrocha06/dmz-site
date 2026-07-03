import { useState } from "react";
import { X, Mail, Phone, MapPin, Send } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl rounded-2xl border overflow-hidden"
        style={{
          background: "#0d1520",
          borderColor: "rgba(0,255,136,0.25)",
          boxShadow: "0 0 60px rgba(0,255,136,0.1), 0 0 120px rgba(0,201,255,0.05)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-5 border-b"
          style={{ borderColor: "rgba(0,255,136,0.15)" }}
        >
          <div>
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: "#00ff88" }}
            >
              // fale_conosco
            </span>
            <h2 className="mt-1" style={{ color: "#e2e8f0", fontFamily: "Rajdhani, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}>
              Entre em Contato
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#64748b" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00ff88")}
            onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Info */}
          <div
            className="px-8 py-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r"
            style={{ borderColor: "rgba(0,255,136,0.15)" }}
          >
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Nossa equipe está pronta para transformar suas ideias em soluções digitais de alto impacto.
            </p>

            <div className="flex flex-col gap-5">
              <ContactItem
                icon={<Mail size={18} />}
                label="E-mail"
                value="contato@helptech.com.br"
              />
              <ContactItem
                icon={<Phone size={18} />}
                label="Telefone / WhatsApp"
                value="(11) 99999-0000"
              />
              <ContactItem
                icon={<MapPin size={18} />}
                label="Localização"
                value="São Paulo, SP — Brasil"
              />
            </div>

            <div
              className="mt-auto rounded-xl p-4 font-mono text-xs leading-relaxed"
              style={{ background: "#090e14", color: "#00ff88", border: "1px solid rgba(0,255,136,0.12)" }}
            >
              <span style={{ color: "#64748b" }}>$ </span>
              helptech --status<br />
              <span style={{ color: "#00c9ff" }}>→</span> Disponível para novos projetos<br />
              <span style={{ color: "#00c9ff" }}>→</span> Resposta em até 24h<br />
              <span style={{ color: "#00ff88" }}>✓ </span>Online agora
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-4">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: "#00ff88" }}>
                <div className="text-4xl font-mono">✓</div>
                <p className="text-center" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "1.1rem" }}>
                  Mensagem enviada!<br />
                  <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Em breve entraremos em contato.</span>
                </p>
              </div>
            ) : (
              <>
                <FormInput
                  label="Seu Nome"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  placeholder="Ex: João Silva"
                />
                <FormInput
                  label="Seu E-mail"
                  type="email"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  placeholder="joao@empresa.com"
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#00ff88" }}>
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Descreva seu projeto ou necessidade..."
                    className="rounded-lg px-4 py-3 text-sm outline-none resize-none transition-all"
                    style={{
                      background: "#090e14",
                      border: "1px solid rgba(0,255,136,0.2)",
                      color: "#e2e8f0",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.6)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)")}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-lg py-3 font-semibold transition-all mt-2"
                  style={{
                    background: "#00ff88",
                    color: "#090e14",
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#00c9ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#00ff88")}
                >
                  <Send size={16} />
                  Enviar Mensagem
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5" style={{ color: "#00ff88" }}>{icon}</div>
      <div>
        <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "#64748b" }}>{label}</div>
        <div style={{ color: "#e2e8f0", fontSize: "0.9rem" }}>{value}</div>
      </div>
    </div>
  );
}

function FormInput({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-mono tracking-widest uppercase" style={{ color: "#00ff88" }}>
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg px-4 py-3 text-sm outline-none transition-all"
        style={{
          background: "#090e14",
          border: "1px solid rgba(0,255,136,0.2)",
          color: "#e2e8f0",
          fontFamily: "Inter, sans-serif",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.6)")}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)")}
      />
    </div>
  );
}
