import { useState, useRef, useEffect } from "react";
import { Trash2, Plus, Minus, ChevronLeft, ShoppingCart, Search } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  category: string;
}

const PRODUCTS: Product[] = [
  // Hortifruti
  { id: 1,  code: "2000010", name: "Banana Nanica (kg)",     price: 4.99,  category: "Hortifruti" },
  { id: 2,  code: "2000020", name: "Maçã Gala (kg)",          price: 7.49,  category: "Hortifruti" },
  { id: 3,  code: "2000030", name: "Tomate (kg)",             price: 5.29,  category: "Hortifruti" },
  { id: 4,  code: "2000040", name: "Cebola (kg)",             price: 3.99,  category: "Hortifruti" },
  // Mercearia
  { id: 5,  code: "7891000100103", name: "Arroz Tio João 5kg",  price: 24.90, category: "Mercearia" },
  { id: 6,  code: "7896001001002", name: "Feijão Carioca 1kg",  price: 9.49,  category: "Mercearia" },
  { id: 7,  code: "7896006000700", name: "Açúcar União 1kg",    price: 5.89,  category: "Mercearia" },
  { id: 8,  code: "7893000200301", name: "Óleo Soja Liza 900ml",price: 7.99,  category: "Mercearia" },
  { id: 9,  code: "7896004400305", name: "Farinha Trigo 1kg",   price: 4.49,  category: "Mercearia" },
  { id: 10, code: "7896005400103", name: "Macarrão Barilla 500g",price: 5.19, category: "Mercearia" },
  // Laticínios
  { id: 11, code: "7896010100101", name: "Leite Integral 1L",   price: 5.29,  category: "Laticínios" },
  { id: 12, code: "7896010200202", name: "Iogurte Grego 500g",  price: 8.99,  category: "Laticínios" },
  { id: 13, code: "7896010300303", name: "Queijo Mussarela 300g",price: 14.49,category: "Laticínios" },
  { id: 14, code: "7896010400404", name: "Manteiga 200g",        price: 10.99, category: "Laticínios" },
  // Bebidas
  { id: 15, code: "7896020100101", name: "Coca-Cola 2L",         price: 9.49,  category: "Bebidas" },
  { id: 16, code: "7896020200202", name: "Suco Del Valle 1L",    price: 7.29,  category: "Bebidas" },
  { id: 17, code: "7896020300303", name: "Água Mineral 1,5L",    price: 2.99,  category: "Bebidas" },
  { id: 18, code: "7896020400404", name: "Café Pilão 500g",      price: 15.90, category: "Bebidas" },
  // Higiene
  { id: 19, code: "7896030100101", name: "Shampoo Pantene 400ml",price: 19.90, category: "Higiene" },
  { id: 20, code: "7896030200202", name: "Sabonete Dove 90g",    price: 4.49,  category: "Higiene" },
  { id: 21, code: "7896030300303", name: "Papel Higiênico 12un", price: 21.90, category: "Higiene" },
  { id: 22, code: "7896030400404", name: "Pasta Dental Colgate", price: 6.99,  category: "Higiene" },
  // Limpeza
  { id: 23, code: "7896040100101", name: "Detergente Ypê 500ml", price: 2.49,  category: "Limpeza" },
  { id: 24, code: "7896040200202", name: "Sabão Pó Omo 1kg",     price: 13.90, category: "Limpeza" },
  { id: 25, code: "7896040300303", name: "Água Sanitária 1L",    price: 3.49,  category: "Limpeza" },
];

const CATEGORIES = ["Todos", "Hortifruti", "Mercearia", "Laticínios", "Bebidas", "Higiene", "Limpeza"];

const MONEY_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "⌫"];

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem extends Product { qty: number }
type Stage = "sale" | "payment" | "receipt";
type PayMethod = "dinheiro" | "credito" | "debito" | "pix";

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ─── Main Component ───────────────────────────────────────────────────────────

export function SupermarketCheckout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [stage, setStage] = useState<Stage>("sale");
  const [payMethod, setPayMethod] = useState<PayMethod>("dinheiro");
  const [cashInput, setCashInput] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => { searchRef.current?.focus(); }, []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const cashPaid = parseFloat(cashInput) / 100;
  const change = cashPaid - total;

  const addItem = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
  };

  const setQty = (id: number, delta: number) => {
    setCart(prev => prev.flatMap(i => {
      if (i.id !== id) return [i];
      const next = i.qty + delta;
      return next <= 0 ? [] : [{ ...i, qty: next }];
    }));
  };

  const clear = () => { setCart([]); setStage("sale"); setCashInput(""); setPayMethod("dinheiro"); };

  const products = PRODUCTS.filter(p =>
    (category === "Todos" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search))
  );

  const handleNumpad = (k: string) => {
    if (k === "⌫") { setCashInput(v => v.slice(0, -1)); return; }
    setCashInput(v => {
      const next = (v + k).replace(/^0+/, "") || "0";
      return next.length > 8 ? v : next;
    });
  };

  const cashDisplay = cashInput
    ? fmt(parseFloat(cashInput.padStart(3, "0").replace(/(\d+)(\d{2})$/, "$1.$2")))
    : "R$ 0,00";

  const parsedCash = cashInput
    ? parseFloat(cashInput.padStart(3, "0").replace(/(\d+)(\d{2})$/, "$1.$2"))
    : 0;

  const canFinish = payMethod !== "dinheiro" || parsedCash >= total;

  // ── Receipt ──────────────────────────────────────────────────────────────
  if (stage === "receipt") {
    const now = new Date();
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "2rem", background: "#f8f7f5", minHeight: "100%" }}>
        <div style={{ width: "100%", maxWidth: 360, background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
          {/* Header */}
          <div style={{ borderBottom: "1px dashed #d1d5db", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "0.9rem", color: "#111" }}>SUPERMERCADO BONSAI</div>
            <div style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.3rem" }}>CNPJ: 00.000.000/0001-00</div>
            <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>Rua das Palmeiras, 320 — Fortaleza, CE</div>
            <div style={{ marginTop: "0.8rem", fontSize: "0.7rem", color: "#6b7280" }}>
              {now.toLocaleDateString("pt-BR")} &nbsp;·&nbsp; {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              &nbsp;·&nbsp; Caixa 03 &nbsp;·&nbsp; Op: MARIA
            </div>
          </div>

          {/* Items */}
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px dashed #d1d5db" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#374151" }}>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td style={{ paddingBottom: "0.4rem", paddingRight: "0.5rem" }}>{item.qty}x {item.name}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap", paddingBottom: "0.4rem" }}>{fmt(item.price * item.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ padding: "1rem 1.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", marginBottom: "0.3rem" }}>
              <span>{totalItems} item(ns)</span>
              <span>SUBTOTAL: {fmt(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, color: "#111", fontSize: "0.95rem", borderTop: "1px solid #e5e7eb", paddingTop: "0.6rem", marginBottom: "0.6rem" }}>
              <span>TOTAL</span>
              <span>{fmt(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", marginBottom: "0.2rem" }}>
              <span>FORMA PAGAMENTO</span>
              <span>{payMethod.toUpperCase()}</span>
            </div>
            {payMethod === "dinheiro" && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", marginBottom: "0.2rem" }}>
                  <span>VALOR RECEBIDO</span>
                  <span>{fmt(parsedCash)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#059669", fontWeight: 600, fontSize: "0.9rem" }}>
                  <span>TROCO</span>
                  <span>{fmt(Math.max(0, parsedCash - total))}</span>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{ borderTop: "1px dashed #d1d5db", padding: "1rem 1.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#9ca3af", lineHeight: 1.6 }}>
              OBRIGADO PELA PREFERÊNCIA<br />
              Volte sempre!<br />
              SAC: 0800-000-0000
            </div>
          </div>

          <div style={{ padding: "1rem 1.5rem" }}>
            <button
              onClick={clear}
              style={{
                width: "100%", padding: "0.85rem", background: "#16a34a", color: "#fff",
                fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer",
                letterSpacing: "0.05em", transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#15803d")}
              onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
            >
              Nova Venda (F8)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Payment ───────────────────────────────────────────────────────────────
  if (stage === "payment") {
    return (
      <div style={{ display: "flex", height: "100%", minHeight: 560, background: "#f3f4f6" }}>
        {/* Left info */}
        <div style={{ width: 260, background: "#1f2937", color: "#f9fafb", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", flexShrink: 0 }}>
          <button
            onClick={() => setStage("sale")}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
          >
            <ChevronLeft size={14} /> Voltar
          </button>
          <div style={{ borderTop: "1px solid #374151", paddingTop: "1.2rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Total a pagar</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2rem", fontWeight: 500, color: "#f9fafb" }}>{fmt(total)}</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.3rem" }}>{totalItems} item(ns)</div>
          </div>

          <div style={{ borderTop: "1px solid #374151", paddingTop: "1.2rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Resumo</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: 200, overflowY: "auto" }}>
              {cart.map(i => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#d1d5db" }}>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.qty}× {i.name}</span>
                  <span style={{ flexShrink: 0, marginLeft: "0.5rem", fontFamily: "'DM Mono', monospace" }}>{fmt(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — method + input */}
        <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", overflowY: "auto" }}>
          {/* Method selector */}
          <div>
            <div style={{ fontSize: "0.72rem", color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              Forma de Pagamento
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem" }}>
              {(["dinheiro", "credito", "debito", "pix"] as PayMethod[]).map(m => (
                <button
                  key={m}
                  onClick={() => setPayMethod(m)}
                  style={{
                    padding: "0.8rem 0.4rem",
                    background: payMethod === m ? "#1f2937" : "#fff",
                    color: payMethod === m ? "#f9fafb" : "#374151",
                    border: `2px solid ${payMethod === m ? "#1f2937" : "#e5e7eb"}`,
                    fontSize: "0.75rem", fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {m === "credito" ? "Crédito" : m === "debito" ? "Débito" : m === "pix" ? "PIX" : "Dinheiro"}
                </button>
              ))}
            </div>
          </div>

          {/* Cash numpad */}
          {payMethod === "dinheiro" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Display */}
              <div style={{ background: "#fff", border: "2px solid #e5e7eb", padding: "1rem 1.2rem" }}>
                <div style={{ fontSize: "0.65rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  Valor Recebido
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "2.2rem", color: "#111", textAlign: "right" }}>
                  {cashDisplay}
                </div>
              </div>

              {/* Change preview */}
              <div style={{
                background: parsedCash >= total && parsedCash > 0 ? "#f0fdf4" : "#f9fafb",
                border: `1px solid ${parsedCash >= total && parsedCash > 0 ? "#86efac" : "#e5e7eb"}`,
                padding: "0.8rem 1.2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600 }}>TROCO</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2rem", color: parsedCash >= total && parsedCash > 0 ? "#16a34a" : "#d1d5db", fontWeight: 600 }}>
                  {parsedCash > 0 ? fmt(Math.max(0, parsedCash - total)) : "---"}
                </span>
              </div>

              {/* Numpad */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {MONEY_KEYS.map(k => (
                  <button
                    key={k}
                    onClick={() => handleNumpad(k)}
                    style={{
                      padding: "1rem",
                      background: k === "⌫" ? "#fee2e2" : "#fff",
                      color: k === "⌫" ? "#dc2626" : "#111",
                      border: "1px solid #e5e7eb",
                      fontSize: k === "⌫" ? "1rem" : "1.3rem",
                      fontFamily: "'DM Mono', monospace",
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = k === "⌫" ? "#fecaca" : "#f9fafb")}
                    onMouseLeave={e => (e.currentTarget.style.background = k === "⌫" ? "#fee2e2" : "#fff")}
                  >
                    {k}
                  </button>
                ))}
              </div>

              {/* Quick bills */}
              <div>
                <div style={{ fontSize: "0.65rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Cédulas Rápidas
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[2, 5, 10, 20, 50, 100].map(v => (
                    <button
                      key={v}
                      onClick={() => setCashInput(String(v * 100))}
                      style={{
                        flex: 1, padding: "0.5rem 0", background: "#fff", color: "#374151",
                        border: "1px solid #d1d5db", fontSize: "0.78rem", fontFamily: "'DM Mono', monospace",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#1f2937"; e.currentTarget.style.color = "#f9fafb"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Card/PIX instructions */}
          {payMethod !== "dinheiro" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "#fff", border: "1px solid #e5e7eb", padding: "3rem" }}>
              {payMethod === "pix" ? (
                <>
                  <div style={{ width: 120, height: 120, background: "#f3f4f6", display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "2px", padding: "12px" }}>
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} style={{ background: Math.random() > 0.5 ? "#111" : "transparent", borderRadius: "1px" }} />
                    ))}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>Escaneie o QR Code</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Aguardando confirmação do pagamento...</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "3rem" }}>💳</div>
                  <div style={{ fontSize: "0.9rem", color: "#374151", fontWeight: 600 }}>
                    {payMethod === "credito" ? "Insira ou aproxime o cartão" : "Insira o cartão na maquininha"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Aguardando aprovação...</div>
                </>
              )}
            </div>
          )}

          {/* Confirm button */}
          <button
            onClick={() => canFinish && setStage("receipt")}
            disabled={!canFinish}
            style={{
              width: "100%", padding: "1rem",
              background: canFinish ? "#16a34a" : "#d1d5db",
              color: canFinish ? "#fff" : "#9ca3af",
              fontSize: "0.9rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              border: "none", cursor: canFinish ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (canFinish) e.currentTarget.style.background = "#15803d"; }}
            onMouseLeave={e => { if (canFinish) e.currentTarget.style.background = "#16a34a"; }}
          >
            {payMethod === "dinheiro" && !canFinish && parsedCash > 0
              ? `Falta ${fmt(total - parsedCash)}`
              : "Confirmar Pagamento (F12)"}
          </button>
        </div>
      </div>
    );
  }

  // ── Sale screen ───────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", height: "100%", minHeight: 560, background: "#f3f4f6" }}>

      {/* LEFT — Products */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Search + Categories */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0.8rem 1rem" }}>
          <div style={{ position: "relative", marginBottom: "0.6rem" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar produto ou código..."
              style={{
                width: "100%", paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #e5e7eb", background: "#f9fafb",
                fontSize: "0.85rem", color: "#111", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "0.25rem 0.7rem", whiteSpace: "nowrap",
                  background: category === cat ? "#1f2937" : "#fff",
                  color: category === cat ? "#f9fafb" : "#6b7280",
                  border: `1px solid ${category === cat ? "#1f2937" : "#e5e7eb"}`,
                  fontSize: "0.72rem", cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0.8rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.5rem", alignContent: "start" }}>
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => addItem(p)}
              style={{
                background: "#fff", border: "1px solid #e5e7eb",
                padding: "0.8rem", textAlign: "left", cursor: "pointer",
                transition: "all 0.15s", display: "flex", flexDirection: "column", gap: "0.4rem",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#1f2937"; e.currentTarget.style.background = "#f9fafb"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
            >
              <div style={{ fontSize: "0.6rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.category}</div>
              <div style={{ fontSize: "0.82rem", color: "#111", lineHeight: 1.3, fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "#16a34a", fontWeight: 600, marginTop: "0.2rem" }}>
                {fmt(p.price)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — Cart */}
      <div style={{ width: 300, background: "#fff", borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingCart size={15} style={{ color: "#6b7280" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111" }}>Itens ({totalItems})</span>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clear}
              style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.72rem" }}
            >
              <Trash2 size={11} /> Cancelar
            </button>
          )}
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.8rem", color: "#d1d5db" }}>
              <ShoppingCart size={40} />
              <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Nenhum item lançado</span>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{ padding: "0.6rem 1rem", borderBottom: "1px solid #f3f4f6", display: "flex", flexDirection: "column", gap: "0.4rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#111", lineHeight: 1.3, flex: 1 }}>{item.name}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: "#16a34a", fontWeight: 600, flexShrink: 0 }}>
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>
                    {fmt(item.price)} × {item.qty}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <button
                      onClick={() => setQty(item.id, -1)}
                      style={{ width: 22, height: 22, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Minus size={10} />
                    </button>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#111", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button
                      onClick={() => setQty(item.id, 1)}
                      style={{ width: 22, height: 22, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total + Pay */}
        <div style={{ padding: "1rem", borderTop: "2px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>TOTAL</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.6rem", color: "#111", fontWeight: 600 }}>
              {fmt(total)}
            </span>
          </div>
          <button
            onClick={() => cart.length > 0 && setStage("payment")}
            disabled={cart.length === 0}
            style={{
              width: "100%", padding: "0.9rem",
              background: cart.length > 0 ? "#1f2937" : "#e5e7eb",
              color: cart.length > 0 ? "#f9fafb" : "#9ca3af",
              fontSize: "0.82rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: "none", cursor: cart.length > 0 ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (cart.length > 0) e.currentTarget.style.background = "#374151"; }}
            onMouseLeave={e => { if (cart.length > 0) e.currentTarget.style.background = "#1f2937"; }}
          >
            Pagamento (F4)
          </button>
        </div>
      </div>
    </div>
  );
}
