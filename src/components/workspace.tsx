"use client";
import { useState, useEffect, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Globe2,
  LayoutDashboard,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { insightPrompts, insights, markets } from "@/data";
import { useDemoProfile, useWorkspace } from "@/lib/use-workspace";
import { Brand, Coin, Modal } from "./ui";
import { formatPrice, PriceChart } from "./price-chart";

type Entry = { id: string; text: string; date: string };
type Alert = { id: string; symbol: string; price: number };
type Message = { role: "user" | "assistant"; text: string };
const noteSchema = z
  .string()
  .trim()
  .min(3, "Write at least 3 characters.")
  .max(2000, "Keep your note under 2,000 characters.");
const alertSchema = z.coerce
  .number()
  .positive("Enter a price greater than zero.")
  .max(100000000, "Enter a price below 100 million.");
export function Workspace({
  preview = false,
  onClose,
}: {
  preview?: boolean;
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selected, setSelected] = useState(markets[0]);
  const [timeframe, setTimeframe] = useState("1D");
  const [category, setCategory] = useState("All markets");
  const [query, setQuery] = useState("");
  const { data, update, storageError } = useWorkspace();
  const profile = useDemoProfile();
  const { watchlist, entries, alerts } = data;
  const setWatchlist = (v: string[] | ((w: string[]) => string[])) =>
    update("watchlist", v);
  const setEntries = (v: Entry[] | ((w: Entry[]) => Entry[])) =>
    update("entries", v);
  const setAlerts = (v: Alert[] | ((w: Alert[]) => Alert[])) =>
    update("alerts", v);
  const [alertOpen, setAlertOpen] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    if (!thinking) return;
    const timer = setTimeout(() => {
      const question = messages.at(-1)?.text.toLowerCase() ?? "";
      const response = question.includes("level")
        ? insights.levels
        : question.includes("plan") || question.includes("research")
          ? insights.research
          : insights.summary;
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `${selected.name}: ${response}` },
      ]);
      setThinking(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [thinking, messages, selected.name]);
  function ask(text: string) {
    const parsed = z.string().trim().min(3).max(500).safeParse(text);
    if (!parsed.success || thinking) return;
    setMessages((m) => [...m, { role: "user", text: parsed.data }]);
    setPrompt("");
    setThinking(true);
  }
  function toggleWatch(symbol: string) {
    setWatchlist((w) =>
      w.includes(symbol) ? w.filter((s) => s !== symbol) : [...w, symbol],
    );
  }
  function saveNote(e: FormEvent) {
    e.preventDefault();
    const result = noteSchema.safeParse(note);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setEntries((v) => [
      {
        id: crypto.randomUUID(),
        text: result.data,
        date: new Date().toISOString(),
      },
      ...v,
    ]);
    setNote("");
    setError("");
  }
  function saveAlert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = alertSchema.safeParse(
      new FormData(e.currentTarget).get("price"),
    );
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setAlerts((v) => [
      ...v,
      { id: crypto.randomUUID(), symbol: selected.symbol, price: result.data },
    ]);
    setAlertOpen(false);
    setError("");
    setActiveTab("Alerts");
  }
  const visible = markets.filter(
    (m) =>
      (category === "All markets" || m.category === category) &&
      (activeTab !== "Watchlist" || watchlist.includes(m.symbol)) &&
      `${m.name} ${m.symbol}`.toLowerCase().includes(query.toLowerCase()),
  );
  const nav = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Watchlist", icon: Star },
    { label: "AI assistant", icon: Sparkles },
    { label: "Alerts", icon: Bell },
    { label: "Journal", icon: BookOpen },
  ];
  const marketTable = (
    <div className="market-table">
      <div className="table-header">
        <span>Asset</span>
        <span>Price</span>
        <span>24h change</span>
        <span className="table-trend">Last 24 hours</span>
        <span />
      </div>
      {visible.length ? (
        visible.map((m) => (
          <div
            key={m.symbol}
            className={`market-row ${selected.symbol === m.symbol ? "selected" : ""}`}
          >
            <button
              className="asset-button"
              onClick={() => setSelected(m)}
              aria-label={`View ${m.name}`}
            >
              <Coin symbol={m.symbol} color={m.color} />
              <span>
                <strong>{m.name}</strong>
                <small>{m.symbol}</small>
              </span>
            </button>
            <span className="table-price">{formatPrice(m.price)}</span>
            <span className={m.change >= 0 ? "positive" : "negative"}>
              {m.change > 0 ? "+" : ""}
              {m.change.toFixed(2)}%
            </span>
            <span className="table-trend">
              <PriceChart market={m} mini />
            </span>
            <button
              className={`icon-button star-button ${watchlist.includes(m.symbol) ? "starred" : ""}`}
              aria-label={`${watchlist.includes(m.symbol) ? "Remove" : "Add"} ${m.symbol} ${watchlist.includes(m.symbol) ? "from" : "to"} watchlist`}
              onClick={() => toggleWatch(m.symbol)}
            >
              <Star
                size={15}
                fill={watchlist.includes(m.symbol) ? "currentColor" : "none"}
              />
            </button>
          </div>
        ))
      ) : (
        <p className="empty-state">
          {activeTab === "Watchlist"
            ? "Your watchlist is empty. Add a star beside a market in Overview."
            : "No markets match your search."}
        </p>
      )}
    </div>
  );
  const assistant = (
    <div className="assistant-content">
      <div className="assistant-orb">
        <Sparkles size={25} />
      </div>
      <h3>A little more perspective.</h3>
      <p>
        Ask a question.
        <br />
        Find your next starting point.
      </p>
      <div className="prompt-list">
        {insightPrompts.map((p) => (
          <button key={p} disabled={thinking} onClick={() => ask(p)}>
            {p}
            <ArrowUpRight size={13} />
          </button>
        ))}
      </div>
      <div className="messages" aria-live="polite">
        {messages.map((m, i) => (
          <div className={`chat-message ${m.role}`} key={i}>
            {m.text}
          </div>
        ))}
        {thinking && (
          <p className="thinking">
            Gathering perspective<span>…</span>
          </p>
        )}
      </div>
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(prompt);
        }}
      >
        <input
          aria-label="Ask the AI assistant"
          placeholder="Ask anything about this market…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          minLength={3}
          maxLength={500}
          required
        />
        <button
          className="icon-button send-button"
          type="submit"
          disabled={thinking || prompt.trim().length < 3}
          aria-label="Send question"
        >
          <Send size={14} />
        </button>
      </form>
      <small className="demo-caption">
        Example responses · Always do your own research
      </small>
    </div>
  );
  return (
    <div
      className={`workspace ${preview ? "workspace-preview" : "workspace-full"}`}
    >
      <aside className="workspace-sidebar">
        <Brand compact />
        <span className="sidebar-caption">WORKSPACE</span>
        <nav aria-label="Workspace">
          {nav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              aria-label={label}
              title={label}
              className={activeTab === label ? "active" : ""}
              onClick={() => {
                setActiveTab(label);
                setError("");
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
              {label === "AI assistant" && <span className="tiny-ai">AI</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="demo-label">
            <span /> DEMO WORKSPACE
          </span>
          <button onClick={() => setActiveTab("Help")}>
            <CircleHelp size={16} />
            <span>Help & resources</span>
          </button>
          <div className="profile">
            <span className="avatar">
              {profile?.name.slice(0, 1).toUpperCase() ?? "Y"}
            </span>
            <div>
              <strong>{profile?.name ?? "Your workspace"}</strong>
              <small>
                {profile?.plan.startsWith("Custom package")
                  ? "Custom package"
                  : `${profile?.plan ?? "Starter"} plan`}
              </small>
            </div>
            <ChevronDown size={14} />
          </div>
        </div>
      </aside>
      <div className="workspace-body">
        <header className="workspace-topbar">
          <span>
            <span className="muted">Workspace</span>
            <span className="breadcrumb">/</span>
            {activeTab}
          </span>
          <div>
            <span className="data-badge">
              <span /> Example market data
            </span>
            {onClose && (
              <button
                className="icon-button"
                onClick={onClose}
                aria-label="Close workspace"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </header>
        <div className="workspace-main">
          <div className="workspace-title">
            <div>
              <p className="workspace-greeting">YOUR DAILY PERSPECTIVE</p>
              <h2>
                {activeTab === "Overview"
                  ? "A clearer view of the market."
                  : activeTab === "AI assistant"
                    ? "Think it through, together."
                    : activeTab === "Help"
                      ? "Make yourself at home."
                      : `Your ${activeTab.toLowerCase()}.`}
              </h2>
            </div>
            <span className="market-status">
              <span /> Markets in focus
            </span>
          </div>
          {storageError && (
            <p role="status" className="form-error">
              {storageError}
            </p>
          )}
          {(activeTab === "Overview" || activeTab === "Watchlist") && (
            <>
              <div className="market-summaries">
                {markets.slice(0, 3).map((m) => (
                  <button
                    key={m.symbol}
                    className={`summary-card ${selected.symbol === m.symbol ? "chosen" : ""}`}
                    onClick={() => setSelected(m)}
                  >
                    <div>
                      <Coin symbol={m.symbol} color={m.color} />
                      <strong>{m.name}</strong>
                      <ArrowUpRight size={14} className="muted" />
                    </div>
                    <strong className="summary-price">
                      {formatPrice(m.price)}
                    </strong>
                    <span className={m.change > 0 ? "positive" : "negative"}>
                      {m.change > 0 ? "+" : ""}
                      {m.change}% <small>past 24h</small>
                    </span>
                    <div className="summary-spark">
                      <PriceChart market={m} mini />
                    </div>
                  </button>
                ))}
              </div>
              <div className="workspace-grid">
                <section className="panel chart-panel">
                  <div className="panel-heading">
                    <div className="chart-market">
                      <Coin symbol={selected.symbol} color={selected.color} />
                      <div>
                        <h3>{selected.name}</h3>
                        <small>{selected.pair}</small>
                      </div>
                      <ChevronDown size={14} />
                    </div>
                    <button
                      className="text-button"
                      onClick={() => {
                        setAlertOpen(true);
                        setError("");
                      }}
                    >
                      <Bell size={14} /> Set alert
                    </button>
                  </div>
                  <div className="chart-price">
                    {formatPrice(selected.price)}
                    <span
                      className={selected.change > 0 ? "positive" : "negative"}
                    >
                      {selected.change > 0 ? "+" : ""}
                      {selected.change}%<ArrowUpRight size={13} />
                    </span>
                  </div>
                  <div className="timeframes" aria-label="Chart timeframe">
                    {["1H", "4H", "1D", "1W", "1M"].map((t) => (
                      <button
                        className={timeframe === t ? "active" : ""}
                        key={t}
                        aria-pressed={timeframe === t}
                        onClick={() => setTimeframe(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <PriceChart market={selected} timeframe={timeframe} />
                  <div className="chart-footer">
                    <span>
                      <span className="status-dot" /> Illustrative price
                      movement
                    </span>
                    <span>Powered by perspective</span>
                  </div>
                </section>
                <section className="panel ai-panel">
                  <div className="panel-heading">
                    <h3>
                      <Sparkles size={16} /> AI insights
                    </h3>
                    <span className="tiny-ai">BETA</span>
                  </div>
                  {assistant}
                </section>
              </div>
              <section className="panel markets-panel">
                <div className="panel-heading">
                  <h3>
                    {activeTab === "Watchlist"
                      ? "Your watchlist"
                      : "Market overview"}
                    <span className="count-badge">{visible.length}</span>
                  </h3>
                  <label className="search-field">
                    <Search size={14} />
                    <input
                      placeholder="Search markets"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search markets"
                    />
                  </label>
                </div>
                <div className="market-filters">
                  {["All markets", "Crypto", "Stocks", "Forex"].map((c) => (
                    <button
                      key={c}
                      className={category === c ? "active" : ""}
                      aria-pressed={category === c}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {marketTable}
              </section>
            </>
          )}
          {activeTab === "AI assistant" && (
            <section className="panel assistant-standalone">
              <div className="panel-heading">
                <h3>
                  <Sparkles size={16} /> Research assistant
                </h3>
                <span className="tiny-ai">DEMO</span>
              </div>
              {assistant}
            </section>
          )}
          {activeTab === "Alerts" && (
            <section className="panel tool-panel">
              <div className="panel-heading">
                <h3>Price alerts</h3>
                <button
                  className="button button-primary button-small"
                  onClick={() => {
                    setAlertOpen(true);
                    setError("");
                  }}
                >
                  <Plus size={14} /> Create alert
                </button>
              </div>
              <p className="muted">
                Saved locally. Live monitoring and notifications require a
                connected market service.
              </p>
              {alerts.length ? (
                alerts.map((a) => (
                  <div className="saved-row" key={a.id}>
                    <Bell size={19} />
                    <div>
                      <strong>
                        {a.symbol} target: {formatPrice(a.price)}
                      </strong>
                      <small>Saved price target · Example data</small>
                    </div>
                    <button
                      className="icon-button"
                      aria-label={`Delete ${a.symbol} alert`}
                      onClick={() =>
                        setAlerts((v) => v.filter((x) => x.id !== a.id))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <Bell size={30} />
                  <h3>Let the market come to you.</h3>
                  <p>Create a price target to keep your research organized.</p>
                </div>
              )}
            </section>
          )}
          {activeTab === "Journal" && (
            <section className="panel tool-panel">
              <h3>Your thinking, in one place.</h3>
              <p className="muted">
                Capture your research, decisions, and lessons. Notes stay in
                this browser.
              </p>
              <form onSubmit={saveNote} className="journal-form">
                <label htmlFor="journal-note">New journal entry</label>
                <textarea
                  id="journal-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What are you seeing in the market today?"
                  maxLength={2000}
                  rows={5}
                  required
                  aria-describedby={error ? "journal-error" : undefined}
                />
                <div className="form-bottom">
                  <small className="muted">{note.length} / 2,000</small>
                  <button
                    className="button button-primary button-small"
                    type="submit"
                  >
                    <Plus size={15} /> Save entry
                  </button>
                </div>
                {error && (
                  <p id="journal-error" className="form-error" role="alert">
                    {error}
                  </p>
                )}
              </form>
              {entries.length ? (
                entries.map((n) => (
                  <article key={n.id} className="journal-entry">
                    <div>
                      <time dateTime={n.date}>
                        {new Date(n.date).toLocaleString()}
                      </time>
                      <button
                        className="icon-button"
                        aria-label="Delete journal entry"
                        onClick={() =>
                          setEntries((v) => v.filter((x) => x.id !== n.id))
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p>{n.text}</p>
                  </article>
                ))
              ) : (
                <p className="empty-state">
                  Your next insight starts with a note.
                </p>
              )}
            </section>
          )}
          {activeTab === "Help" && (
            <section className="panel tool-panel">
              <Globe2 size={30} />
              <h3>A workspace for a clearer routine.</h3>
              <p className="muted">
                Choose an asset in Overview to explore its example chart. Star a
                market to save it to your watchlist. Use AI assistant for
                illustrative research prompts, Alerts to save price targets, and
                Journal to record your thinking.
              </p>
              <p className="muted">
                This frontend runs entirely in your browser. It does not execute
                trades, stream live prices, or connect to a paid subscription.
                Your saved workspace is specific to this browser.
              </p>
              <button
                className="button button-primary"
                onClick={() => setActiveTab("Overview")}
              >
                Explore the workspace
                <ArrowUpRight size={15} />
              </button>
            </section>
          )}
          <div className="workspace-footnote">
            <Check size={12} /> A calmer space to think.{" "}
            <span>Research tools, not financial advice.</span>
          </div>
        </div>
      </div>
      {alertOpen && (
        <Modal title="Create a price alert" onClose={() => setAlertOpen(false)}>
          <p className="muted">
            Save a target for {selected.name}. Live notifications are not
            connected.
          </p>
          <form onSubmit={saveAlert} className="stack-form">
            <label htmlFor="alert-price">Target price (USD)</label>
            <input
              id="alert-price"
              name="price"
              type="number"
              step="any"
              min="0.00001"
              placeholder={String(selected.price)}
              required
              autoFocus
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="button button-primary">
              Save price target
              <Check size={16} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
