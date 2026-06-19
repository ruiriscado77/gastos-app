import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "supermercado", label: "Supermercado", color: "#4CAF7D" },
  { id: "restaurante",  label: "Restaurante",  color: "#E8721A" },
  { id: "combustivel",  label: "Combustível",  color: "#6B7FD4" },
  { id: "saude",        label: "Saúde",        color: "#E05C7A" },
  { id: "roupa",        label: "Roupa",        color: "#9B6DB5" },
  { id: "casa",         label: "Casa",         color: "#5BA8D4" },
  { id: "lazer",        label: "Lazer",        color: "#F0A500" },
  { id: "tecnologia",   label: "Tecnologia",   color: "#3D8FB5" },
  { id: "servicos",     label: "Serviços",     color: "#2E8B57" },
  { id: "escola",       label: "Escola",       color: "#D4855A" },
  { id: "desporto",     label: "Desporto",     color: "#5BAD8F" },
  { id: "outros",       label: "Outros",       color: "#9AA5B4" },
];

function resolveCat(val) {
  if (!val) return CATEGORIES[CATEGORIES.length - 1];
  const found = CATEGORIES.find(c => c.id === val || c.label === val || val.includes(c.label));
  return found || CATEGORIES[CATEGORIES.length - 1];
}

// ── Icons ────────────────────────────────────────────────────────────────────
function CatIcon({ cat, size = 16, color = "#8892A4" }) {
  const id = resolveCat(cat).id;
  const w = size, h = size;
  const sc = color;

  if (id === "supermercado") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <path d="M6 2L3 7h18l-3-5" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 7l1.5 10a1 1 0 001 .9h11a1 1 0 001-.9L19 7" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="11" x2="9" y2="15" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="12" y1="11" x2="12" y2="15" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="15" y1="11" x2="15" y2="15" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (id === "restaurante") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="4" stroke={sc} strokeWidth="1.6"/>
      <line x1="7" y1="3" x2="7" y2="8" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M5 3v5a2 2 0 004 0V3" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="17" y1="3" x2="17" y2="21" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M15 3h4v5a2 2 0 01-4 0V3z" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (id === "combustivel") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="10" height="16" rx="1" stroke={sc} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M13 8h3a1 1 0 011 1v5a1 1 0 001 1h0a1 1 0 001-1V8l-3-4" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="8" x2="10" y2="8" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (id === "saude") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={sc} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="12" y1="7" x2="12" y2="17" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="7" y1="12" x2="17" y2="12" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (id === "roupa") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <path d="M3 6l4-3a5 5 0 0010 0l4 3-3 3v11H6V9L3 6z" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (id === "casa") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <polyline points="3 11 12 3 21 11" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 11v9h5v-5h4v5h5v-9" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (id === "lazer") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (id === "tecnologia") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="13" rx="1.5" stroke={sc} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="1" y1="21" x2="23" y2="21" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="8" y2="17" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="16" y1="21" x2="16" y2="17" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (id === "servicos") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={sc} strokeWidth="1.6"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (id === "escola") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <path d="M12 21V6" stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 6a9 9 0 019 0 9 9 0 019 0v15a9 9 0 00-9-3 9 9 0 00-9 3V6z" stroke={sc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (id === "desporto") return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={sc} strokeWidth="1.6"/>
      <polygon points="12,7 14.5,9.5 13.5,12.5 10.5,12.5 9.5,9.5" stroke={sc} strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="12" y1="7" x2="12" y2="3.1" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14.5" y1="9.5" x2="17.9" y2="7.5" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="13.5" y1="12.5" x2="16.2" y2="15.2" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="10.5" y1="12.5" x2="7.8" y2="15.2" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="9.5" y1="9.5" x2="6.1" y2="7.5" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <circle cx="5"  cy="12" r="1.5" fill={sc}/>
      <circle cx="12" cy="12" r="1.5" fill={sc}/>
      <circle cx="19" cy="12" r="1.5" fill={sc}/>
    </svg>
  );
}

function CatBadge({ cat, size = 32 }) {
  const c = resolveCat(cat);
  const bg = c.color || "#9AA5B4";
  const iconSize = Math.round(size * 0.72);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <CatIcon cat={cat} size={iconSize} color="#fff" />
    </div>
  );
}

// ── Constants ────────────────────────────────────────────────────────────────
const MONTH_NAMES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const now = new Date();
const defaultMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;

const C = {
  bg: "#E8EBF2", surface: "#FFFFFF", border: "#D8DCE8",
  text: "#1A1D2E", muted: "#8892A4",
  success: "#10B981", danger: "#EF4444",
  more: "#2E8B57", less: "#E8721A",
  headerBg: "#2D3142",
  headerCard: "#3D4259",
  headerBorder: "#4A506A",
  headerText: "#FFFFFF",
  headerMuted: "#A8B0C8",
};

function formatEur(val) {
  return Number(val).toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}
function parseMonth(m) {
  const [y, mo] = m.split("-");
  return `${MONTH_NAMES[parseInt(mo)-1]} ${y}`;
}
function fmtDate(dateStr) {
  const [y,m,d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

// ── Export helpers ────────────────────────────────────────────────────────────
function exportToCSV(monthExpenses, selectedMonth, totals, diff, diffWho) {
  const rows = [
    ["Data","Quem","Descrição","Categoria","Valor (€)"],
    ...monthExpenses
      .sort((a,b) => a.date.localeCompare(b.date))
      .map(e => [fmtDate(e.date), e.person, e.description, resolveCat(e.category).label, e.amount.toFixed(2)]),
    [],
    ["","","","Total Rui:", totals.Rui.toFixed(2)],
    ["","","","Total Cláudia:", totals.Cláudia.toFixed(2)],
    ["","","","Diferença:", diff.toFixed(2)],
    ["","","",`${diffWho === "Rui" ? "Cláudia" : "Rui"} paga a ${diffWho}:`, (diff/2).toFixed(2)],
  ];
  const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `gastos-${selectedMonth}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function exportToPDF(monthExpenses, selectedMonth, totals, diff, diffWho) {
  const ruiItems = monthExpenses.filter(e => e.person === "Rui").sort((a,b) => a.date.localeCompare(b.date));
  const claudiaItems = monthExpenses.filter(e => e.person === "Cláudia").sort((a,b) => a.date.localeCompare(b.date));
  const label = parseMonth(selectedMonth);
  const payer = diffWho === "Rui" ? "Cláudia" : "Rui";
  const tableRows = (items, color) => items.map(e => `
    <tr>
      <td>${fmtDate(e.date)}</td><td>${e.description}</td>
      <td>${resolveCat(e.category).label}</td>
      <td style="text-align:right;color:${color};font-weight:600">${formatEur(e.amount)}</td>
    </tr>`).join("");
  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8">
<title>Gastos ${label}</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',system-ui,sans-serif;background:#fff;color:#1A1D2E;padding:32px;max-width:800px;margin:0 auto}
h1{font-size:24px;font-weight:700;margin-bottom:4px}.sub{color:#8892A4;font-size:14px;margin-bottom:24px}
.totals{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px}
.tcard{border-radius:12px;padding:16px;text-align:center;border:1px solid #E8EBF2}.tcard .name{font-size:12px;color:#8892A4;margin-bottom:6px}.tcard .val{font-size:22px;font-weight:700}
.settlement{border:1px solid #E8EBF2;border-radius:12px;padding:14px 20px;margin-bottom:24px;text-align:center}
.settlement .payer{font-size:12px;color:#E8721A;font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.settlement .amount{font-size:22px;font-weight:700}
h2{font-size:15px;font-weight:600;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #E8EBF2}
table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px}
th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#8892A4;padding:6px 8px;border-bottom:2px solid #E8EBF2}
td{padding:8px;border-bottom:1px solid #F0F2F8}tr:last-child td{border-bottom:none}
.footer{color:#8892A4;font-size:11px;text-align:center;margin-top:24px}@media print{body{padding:16px}}</style></head><body>
<h1>Gastos Mensais</h1><div class="sub">Rui & Cláudia · ${label}</div>
<div class="totals">
  <div class="tcard"><div class="name">Rui</div><div class="val">${formatEur(totals.Rui)}</div></div>
  <div class="tcard"><div class="name">Cláudia</div><div class="val">${formatEur(totals.Cláudia)}</div></div>
  <div class="tcard"><div class="name">Total conjunto</div><div class="val">${formatEur(totals.Rui + totals.Cláudia)}</div></div>
</div>
${diff === 0
  ? `<div class="settlement"><div class="payer">Igual</div><div class="amount" style="color:#10B981">Gastaram o mesmo!</div></div>`
  : `<div class="settlement"><div class="payer">${payer}</div><div class="amount">${formatEur(diff/2)}</div></div>`}
<h2>Gastos do Rui</h2>
<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th style="text-align:right">Valor</th></tr></thead>
<tbody>${tableRows(ruiItems,"#2E8B57")}</tbody></table>
<h2>Gastos da Cláudia</h2>
<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th style="text-align:right">Valor</th></tr></thead>
<tbody>${tableRows(claudiaItems,"#2E8B57")}</tbody></table>
<div class="footer">Gerado em ${new Date().toLocaleDateString("pt-PT")} · Gastos Rui & Cláudia</div>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  setTimeout(() => { win?.print(); URL.revokeObjectURL(url); }, 800);
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [form, setForm] = useState({ person:"Rui", description:"", category:"supermercado", amount:"", date:new Date().toISOString().split("T")[0] });
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("list");
  const [listPerson, setListPerson] = useState("Rui");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadExpenses();
    // Real-time subscription
    const channel = supabase
      .channel("expenses-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "expenses" }, () => {
        loadExpenses();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function loadExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setExpenses(data);
    setLoading(false);
  }

  async function saveExpense(entry) {
    setSaving(true);
    if (editId) {
      await supabase.from("expenses").update({
        person: entry.person, description: entry.description,
        category: entry.category, amount: entry.amount, date: entry.date,
      }).eq("id", editId);
    } else {
      await supabase.from("expenses").insert([entry]);
    }
    setSaving(false);
  }

  async function deleteExpense(id) {
    await supabase.from("expenses").delete().eq("id", id);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
  const totals = {
    Rui: monthExpenses.filter(e => e.person==="Rui").reduce((s,e) => s+Number(e.amount), 0),
    Cláudia: monthExpenses.filter(e => e.person==="Cláudia").reduce((s,e) => s+Number(e.amount), 0),
  };
  const diff = Math.abs(totals.Rui - totals.Cláudia);
  const diffWho = totals.Rui > totals.Cláudia ? "Rui" : "Cláudia";
  const allMonths = [...new Set(expenses.map(e => e.date.substring(0,7)))].sort().reverse();
  if (!allMonths.includes(defaultMonth)) allMonths.unshift(defaultMonth);
  const ruiItems = monthExpenses.filter(e => e.person==="Rui").sort((a,b) => b.date.localeCompare(a.date));
  const claudiaItems = monthExpenses.filter(e => e.person==="Cláudia").sort((a,b) => b.date.localeCompare(a.date));

  function openAdd() {
    setForm({ person:"Rui", description:"", category:"supermercado", amount:"", date:new Date().toISOString().split("T")[0] });
    setEditId(null);
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditId(null);
    setError("");
  }

  async function handleSubmit() {
    setError("");
    if (!form.description.trim()) { setError("Escreve uma descrição."); return; }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) { setError("Valor inválido."); return; }
    const entry = { ...form, amount: parseFloat(form.amount), id: editId || Date.now().toString() };
    await saveExpense(entry);
    closeModal();
    showToast("Guardado!");
  }

  function handleEdit(entry) {
    setForm({ person:entry.person, description:entry.description, category:entry.category, amount:String(entry.amount), date:entry.date });
    setEditId(entry.id);
    setError("");
    setModalOpen(true);
  }

  async function handleDelete(id) {
    await deleteExpense(id);
  }

  if (loading) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:C.bg}}>
      <div style={{width:32,height:32,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.text}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{color:C.muted,marginTop:14,fontSize:14}}>A carregar…</p>
    </div>
  );

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:480,margin:"0 auto"}}>

      {/* HEADER */}
      <div style={{background:C.headerBg,padding:"18px 16px 0",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:14,position:"relative"}}>
          {saving && <span style={{position:"absolute",right:0,fontSize:11,color:C.headerMuted}}>A guardar…</span>}
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}
            style={{background:C.headerCard,color:C.headerText,border:`1px solid ${C.headerBorder}`,borderRadius:10,padding:"8px 16px",fontSize:15,fontWeight:600,cursor:"pointer"}}>
            {allMonths.map(m => <option key={m} value={m}>{parseMonth(m)}</option>)}
          </select>
        </div>

        {/* Totals */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          <TotalPill label="Rui" value={formatEur(totals.Rui)} valueColor={diff===0?C.headerText:totals.Rui>totals.Cláudia?C.more:C.less} />
          <TotalPill label="Cláudia" value={formatEur(totals.Cláudia)} valueColor={diff===0?C.headerText:totals.Cláudia>totals.Rui?C.more:C.less} />
          <div style={{background:C.headerCard,border:`1px solid ${C.headerBorder}`,borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
            <span style={{display:"block",fontSize:10,color:C.less,fontWeight:600,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.04em"}}>A pagar</span>
            <span style={{display:"block",fontSize:13,fontWeight:700,color:diff===0?C.success:C.headerText}}>
              {diff===0 ? "Quits!" : formatEur(diff/2)}
            </span>
            {diff>0 && <span style={{display:"block",fontSize:9,color:C.headerMuted,marginTop:1}}>
              {diffWho==="Rui" ? "Cláudia → Rui" : "Rui → Cláudia"}
            </span>}
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderTop:`1px solid ${C.headerBorder}`,margin:"0 -16px"}}>
          {[["list","Lista"],["summary","Resumo"]].map(([key,label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{flex:1,background:"transparent",border:"none",borderBottom:`2px solid ${tab===key?C.headerText:"transparent"}`,
                color:tab===key?C.headerText:C.headerMuted,padding:"11px 0",fontSize:13,fontWeight:tab===key?600:400,cursor:"pointer"}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:12,paddingBottom:88}}>

        {/* LIST */}
        {tab==="list" && (
          <div>
            {/* Person sub-tabs */}
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              {[{key:"Rui",total:totals.Rui},{key:"Cláudia",total:totals.Cláudia}].map(({key,total}) => {
                const active = listPerson===key;
                return (
                  <button key={key} onClick={() => setListPerson(key)}
                    style={{flex:1,padding:"9px 0",borderRadius:10,border:`1.5px solid ${active?C.text:C.border}`,
                      background:active?C.text:C.surface,color:active?"#fff":C.muted,
                      fontSize:13,fontWeight:active?600:400,cursor:"pointer"}}>
                    {key} · {formatEur(total)}
                  </button>
                );
              })}
            </div>
            {monthExpenses.length===0
              ? <div style={{textAlign:"center",color:C.muted,padding:"48px 20px",lineHeight:1.8,background:C.surface,borderRadius:14,border:`1px solid ${C.border}`}}>
                  Ainda não há gastos em {parseMonth(selectedMonth)}.<br/>Adiciona o primeiro!
                </div>
              : (() => {
                  const items = listPerson==="Rui" ? ruiItems : claudiaItems;
                  return items.length===0
                    ? <div style={{textAlign:"center",color:C.muted,padding:"32px 20px",background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
                        Sem gastos de {listPerson} este mês.
                      </div>
                    : items.map(e => <ExpenseItem key={e.id} e={e} onEdit={handleEdit} onDelete={handleDelete}/>);
                })()
            }
          </div>
        )}

        {/* SUMMARY */}
        {tab==="summary" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div style={{...card,textAlign:"center",marginBottom:0}}>
                <div style={{fontSize:13,color:C.muted,marginBottom:6}}>Rui</div>
                <div style={{fontSize:24,fontWeight:700,color:diff===0?C.text:totals.Rui>totals.Cláudia?C.more:C.less}}>{formatEur(totals.Rui)}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:4}}>{ruiItems.length} registo(s)</div>
              </div>
              <div style={{...card,textAlign:"center",marginBottom:0}}>
                <div style={{fontSize:13,color:C.muted,marginBottom:6}}>Cláudia</div>
                <div style={{fontSize:24,fontWeight:700,color:diff===0?C.text:totals.Cláudia>totals.Rui?C.more:C.less}}>{formatEur(totals.Cláudia)}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:4}}>{claudiaItems.length} registo(s)</div>
              </div>
            </div>

            {/* Category bars — individual */}
            {["Rui","Cláudia"].map(person => {
              const items = monthExpenses.filter(e=>e.person===person);
              const byCat = CATEGORIES.map(c=>({
                cat:c, total:items.filter(e=>resolveCat(e.category).id===c.id).reduce((s,e)=>s+Number(e.amount),0)
              })).filter(x=>x.total>0).sort((a,b)=>b.total-a.total);
              if(!byCat.length) return null;
              return (
                <div key={person} style={{...card,marginBottom:10}}>
                  <h4 style={{fontSize:13,fontWeight:600,color:C.text,margin:"0 0 10px"}}>{person} por categoria</h4>
                  {byCat.map(({cat,total}) => {
                    const pct = totals[person]>0?(total/totals[person]*100):0;
                    return (
                      <div key={cat.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                        <span style={{width:126,flexShrink:0,display:"flex",alignItems:"center",gap:6}}>
                          <CatBadge cat={cat.id} size={20} />
                          <span style={{fontSize:11,color:C.muted}}>{cat.label}</span>
                        </span>
                        <div style={{flex:1,height:5,background:C.bg,borderRadius:3,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:cat.color||C.text,borderRadius:3,transition:"width 0.4s"}}/>
                        </div>
                        <span style={{fontSize:11,color:C.text,fontWeight:600,width:58,textAlign:"right"}}>{formatEur(total)}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Casal */}
            {(() => {
              const totalCasal = totals.Rui + totals.Cláudia;
              const byCat = CATEGORIES.map(c=>({
                cat:c, total:monthExpenses.filter(e=>resolveCat(e.category).id===c.id).reduce((s,e)=>s+Number(e.amount),0)
              })).filter(x=>x.total>0).sort((a,b)=>b.total-a.total);
              if(!byCat.length) return null;
              return (
                <div style={{...card,marginBottom:10}}>
                  <h4 style={{fontSize:13,fontWeight:600,color:C.text,margin:"0 0 4px"}}>Casal por categoria</h4>
                  <p style={{fontSize:11,color:C.muted,margin:"0 0 10px"}}>Total conjunto: {formatEur(totalCasal)}</p>
                  {byCat.map(({cat,total}) => {
                    const pct = totalCasal>0?(total/totalCasal*100):0;
                    return (
                      <div key={cat.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                        <span style={{width:126,flexShrink:0,display:"flex",alignItems:"center",gap:6}}>
                          <CatBadge cat={cat.id} size={20} />
                          <span style={{fontSize:11,color:C.muted}}>{cat.label}</span>
                        </span>
                        <div style={{flex:1,height:5,background:C.bg,borderRadius:3,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:cat.color||C.text,borderRadius:3,transition:"width 0.4s"}}/>
                        </div>
                        <span style={{fontSize:11,color:C.text,fontWeight:600,width:58,textAlign:"right"}}>{formatEur(total)}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Export */}
            <div style={{...card,marginBottom:0}}>
              <h4 style={{fontSize:12,fontWeight:600,margin:"0 0 10px",color:C.muted,textTransform:"uppercase",letterSpacing:"0.04em"}}>Exportar {parseMonth(selectedMonth)}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button onClick={() => exportToPDF(monthExpenses,selectedMonth,totals,diff,diffWho)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,border:`1px solid ${C.border}`,background:C.bg,cursor:"pointer",color:C.text}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="13" height="18" rx="1.5" stroke="#8892A4" strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M4 6h13" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="7" y1="10" x2="14" y2="10" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="7" y1="13" x2="14" y2="13" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="7" y1="16" x2="11" y2="16" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M14 17l3 3m0 0l3-3m-3 3V14" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontWeight:600,fontSize:14}}>Exportar PDF</div>
                    <div style={{fontSize:11,color:C.muted}}>Relatório para imprimir ou guardar</div>
                  </div>
                </button>
                <button onClick={() => { exportToCSV(monthExpenses,selectedMonth,totals,diff,diffWho); showToast("CSV criado! Abre no Google Sheets."); }}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,border:`1px solid ${C.border}`,background:C.bg,cursor:"pointer",color:C.text}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="1.5" stroke="#8892A4" strokeWidth="1.6" strokeLinejoin="round"/>
                    <line x1="3" y1="9" x2="21" y2="9" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="3" y1="15" x2="21" y2="15" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="9" y1="9" x2="9" y2="21" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="15" y1="9" x2="15" y2="21" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M16 19l2 2m0 0l2-2m-2 2v-5" stroke="#8892A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontWeight:600,fontSize:14}}>Exportar Google Sheets</div>
                    <div style={{fontSize:11,color:C.muted}}>Descarrega CSV · abre no Google Sheets</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button onClick={openAdd}
        style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",width:52,height:52,borderRadius:"50%",background:C.headerBg,border:"none",
          cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:20,padding:0}}>
        <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
          <line x1="13" y1="4" x2="13" y2="22" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="4" y1="13" x2="22" y2="13" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* MODAL */}
      {modalOpen && (
        <div style={{position:"fixed",inset:0,zIndex:30,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div onClick={closeModal} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}}/>
          <div style={{position:"relative",background:C.surface,borderRadius:"20px 20px 0 0",padding:"0 16px 32px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 -4px 24px rgba(0,0,0,0.15)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
              <div style={{width:36,height:4,borderRadius:2,background:C.border}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h2 style={{margin:0,fontSize:16,fontWeight:600}}>{editId?"Editar Despesa":"Nova Despesa"}</h2>
              <button onClick={closeModal} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",color:C.muted,lineHeight:1}}>×</button>
            </div>

            {error && <div style={{background:"#FEF2F2",border:`1px solid #FECACA`,borderRadius:8,padding:"8px 12px",color:C.danger,fontSize:13,marginBottom:12}}>{error}</div>}

            <label style={lbl}>Quem pagou?</label>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              {["Rui","Cláudia"].map(p => (
                <button key={p} onClick={() => setForm(f=>({...f,person:p}))}
                  style={{flex:1,padding:"10px 0",borderRadius:10,border:`1.5px solid ${form.person===p?C.text:C.border}`,
                    background:form.person===p?C.text:C.surface,
                    color:form.person===p?"#fff":C.muted,
                    fontSize:15,cursor:"pointer",fontWeight:form.person===p?600:400}}>
                  {p}
                </button>
              ))}
            </div>

            <label style={lbl}>Descrição</label>
            <input value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))}
              placeholder="Ex: Compras no Pingo Doce" style={inp} />

            <label style={lbl}>Categoria</label>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:14}}>
              {CATEGORIES.map(c => {
                const sel = form.category === c.id;
                return (
                  <button key={c.id} onClick={() => setForm(f=>({...f,category:c.id}))}
                    style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 4px",borderRadius:10,
                      border:`1.5px solid ${sel?C.text:C.border}`,
                      background:sel?C.text:C.surface,
                      cursor:"pointer"}}>
                    <span style={{lineHeight:0}}><CatBadge cat={c.id} size={28} /></span>
                    <span style={{fontSize:9,color:sel?"#fff":C.muted,fontWeight:sel?600:400,textAlign:"center",lineHeight:1.2}}>{c.label}</span>
                  </button>
                );
              })}
            </div>

            <label style={lbl}>Valor (€)</label>
            <input type="number" min="0" step="0.01" value={form.amount}
              onChange={e => setForm(f=>({...f,amount:e.target.value}))}
              placeholder="0,00" style={inp} />

            <label style={lbl}>Data</label>
            <input type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} style={inp} />

            <button onClick={handleSubmit}
              style={{width:"100%",padding:"13px 0",borderRadius:10,border:"none",background:C.text,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:8}}>
              {editId?"Guardar Alterações":`Adicionar para ${form.person}`}
            </button>
            {editId && <button onClick={closeModal}
              style={{width:"100%",padding:"11px 0",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:14,cursor:"pointer"}}>
              Cancelar
            </button>}
          </div>
        </div>
      )}

      {toast && (
        <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:C.text,color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:14,fontWeight:500,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",zIndex:40}}>
          {toast}
        </div>
      )}
    </div>
  );
}

function TotalPill({label,value,valueColor}) {
  return (
    <div style={{background:"#3D4259",border:"1px solid #4A506A",borderRadius:10,padding:"8px 10px",textAlign:"center"}}>
      <span style={{display:"block",fontSize:10,color:"#A8B0C8",fontWeight:600,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}</span>
      <span style={{display:"block",fontSize:13,fontWeight:700,color:valueColor||"#FFFFFF"}}>{value}</span>
    </div>
  );
}

function ExpenseItem({e,onEdit,onDelete}) {
  const [confirm,setConfirm] = useState(false);
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",background:"#fff",borderRadius:10,marginBottom:5,border:"1px solid #E8EBF2"}}>
      <CatBadge cat={e.category} size={34} />
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:"#1A1D2E"}}>{e.description}</div>
        <div style={{fontSize:10,color:"#8892A4",marginTop:1}}>{resolveCat(e.category).label} · {fmtDate(e.date)}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
        <span style={{fontSize:13,fontWeight:700,color:"#1A1D2E"}}>{Number(e.amount).toLocaleString("pt-PT",{minimumFractionDigits:2})}€</span>
        <div style={{display:"flex",gap:4}}>
          <button onClick={() => onEdit(e)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:10,padding:"1px 3px",opacity:0.45,color:"#1A1D2E"}}>Edit</button>
          {confirm
            ? <button onClick={() => onDelete(e.id)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:10,padding:"1px 3px",color:"#EF4444"}}>Ok?</button>
            : <button onClick={() => setConfirm(true)} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:10,padding:"1px 3px",opacity:0.45,color:"#1A1D2E"}}>Del</button>
          }
        </div>
      </div>
    </div>
  );
}

const card = {background:"#fff",borderRadius:12,padding:"14px",border:"1px solid #E8EBF2",marginBottom:10};
const lbl = {display:"block",fontSize:12,color:"#8892A4",marginBottom:5,fontWeight:500};
const inp = {width:"100%",background:"#F0F2F7",border:"1px solid #D8DCE8",borderRadius:8,color:"#1A1D2E",padding:"10px 12px",fontSize:14,marginBottom:12,boxSizing:"border-box",outline:"none"};
