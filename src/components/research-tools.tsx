"use client";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { z } from "zod";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChartCandlestick,
  ChevronDown,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { pageCopy, demoQuestions, markets, toolGroups } from "@/data";
import { Heading } from "./discovery";
import { Reveal } from "./ui";
import { ToolIcon } from "./tool-icon";
import { PriceChart } from "./price-chart";

export function HeroChart() {
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.1 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 110,
    damping: 24,
    mass: 0.7,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 110,
    damping: 24,
    mass: 0.7,
  });
  const rotateX = useTransform(smoothY, [-1, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);
  const x = useTransform(smoothX, [-1, 1], [-6, 6]);
  const y = useTransform(smoothY, [-1, 1], [-5, 5]);
  const lightX = useTransform(smoothX, [-1, 1], [10, 90]);
  const lightY = useTransform(smoothY, [-1, 1], [10, 90]);
  const glowLeft = useTransform(lightX, (value) => `${value}%`);
  const glowTop = useTransform(lightY, (value) => `${value}%`);
  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(
      Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
      ),
    );
    pointerY.set(
      Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      ),
    );
  }
  return (
    <div
      ref={stage}
      className="hero-chart-stage"
      onPointerMove={followPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
      data-in-view={inView}
    >
      <motion.div
        className="hero-chart-scene"
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, x, y, transformPerspective: 1100 }
        }
      >
        <motion.div
          aria-hidden="true"
          className="hero-pointer-glow"
          style={{ left: glowLeft, top: glowTop }}
        />
        <div className="glass candle-card">
          <div className="candle-heading">
            <span>
              <ChartCandlestick size={17} /> XAU / USD
            </span>
            <span className="live-badge">
              <span /> SIMULATED MARKET
            </span>
          </div>
          <div className="candle-value">
            2,654.32 <span>+0.82%</span>
          </div>
          <svg
            className="candlestick"
            viewBox="0 0 600 320"
            role="img"
            aria-label="Illustrative gold candlestick chart"
          >
            <defs>
              <linearGradient id="candle-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#2bc69c" stopOpacity=".1" />
                <stop offset="1" stopColor="#2bc69c" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[50, 110, 170, 230, 290].map((y) => (
              <line
                x1="15"
                x2="550"
                y1={y}
                y2={y}
                key={y}
                stroke="#dce3ed"
                strokeDasharray="3 6"
              />
            ))}
            <path
              d="M30 230 L64 260 L98 245 L132 220 L166 256 L200 225 L234 170 L268 200 L302 235 L336 160 L370 100 L404 135 L438 90 L472 50 L506 80 L540 65 L570 95 L570 310 L30 310 Z"
              fill="url(#candle-fill)"
            />
            <path
              d="M30 230 L64 260 L98 245 L132 220 L166 256 L200 225 L234 170 L268 200 L302 235 L336 160 L370 100 L404 135 L438 90 L472 50 L506 80 L540 65 L570 95"
              fill="none"
              stroke="#86d8c0"
              strokeWidth="2"
            />
            {[
              210, 245, 225, 199, 240, 202, 140, 170, 204, 132, 75, 98, 56, 25,
              55, 37, 66,
            ].map((y, i) => {
              const green = [2, 3, 5, 6, 9, 10, 12, 13, 15].includes(i);
              return (
                <g key={i}>
                  <line
                    x1={30 + i * 33}
                    x2={30 + i * 33}
                    y1={y - 21}
                    y2={y + 62}
                    stroke={green ? "#20c699" : "#e56a86"}
                    strokeWidth="1.7"
                  />
                  <motion.rect
                    initial={reduced ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.035 }}
                    x={23 + i * 33}
                    y={y}
                    width="14"
                    height={i % 3 === 0 ? 46 : 31}
                    rx="2"
                    fill={green ? "#20c699" : "#e56a86"}
                    style={{ transformOrigin: `${30 + i * 33}px ${y + 30}px` }}
                  />
                </g>
              );
            })}
            <text x="540" y="44" fontSize="9" fill="#a8b1bf">
              2,733.82
            </text>
            <text x="540" y="164" fontSize="9" fill="#a8b1bf">
              2,725.11
            </text>
            <text x="540" y="284" fontSize="9" fill="#a8b1bf">
              2,711.32
            </text>
          </svg>
          <div className="chart-bottom-label">
            <span>09:00</span>
            <span>11:00</span>
            <span>13:00</span>
            <span>15:00</span>
          </div>
        </div>
        <div className="hero-float-layer quote-layer">
          <div className="glass floating-quote hero-floating-card">
            <span>XAU/USD</span>
            <strong>2,742.80</strong>
            <small>+1.4%</small>
            <svg viewBox="0 0 90 28">
              <path
                d="M2 24L12 19L22 21L32 12L42 16L52 9L62 11L72 7L86 2"
                fill="none"
                stroke="#50c9a0"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>
        <div className="hero-float-layer analysis-layer">
          <div className="glass floating-analysis hero-floating-card">
            <h3>
              <span className="gradient-icon">
                <Sparkles size={17} />
              </span>
              AI Analysis <span className="scanning">SCANNING</span>
            </h3>
            <p>Momentum confirming across timeframes…</p>
            <div className="confidence-label">
              <span>Breakout confidence</span>
              <strong>87.6%</strong>
            </div>
            <div className="bar-track">
              <span style={{ width: "87.6%" }} />
            </div>
            <div className="analysis-bars">
              {[13, 24, 8, 15, 9, 7, 17, 11, 20, 14].map((h, i) => (
                <i
                  style={{ height: h, animationDelay: `${i * -0.17}s` }}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hero-float-layer broker-layer">
          <div className="glass floating-broker hero-floating-card">
            <span className="field-label">
              BEST BROKER MATCH <strong>★ 4.9</strong>
            </span>
            {[
              {
                name: "Aurum Markets",
                score: 92,
                detail: "1.2p gold · min $50",
              },
              { name: "Nordic Trade", score: 84, detail: "0.8p FX · min $100" },
            ].map((b) => (
              <div key={b.name}>
                <div>
                  <strong>{b.name}</strong>
                  <span>{b.score}%</span>
                </div>
                <small>{b.detail}</small>
                <div className="bar-track">
                  <span style={{ width: `${b.score}%` }} />
                </div>
              </div>
            ))}
            <a href="#brokers">
              Full comparison
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export function AssistantDemo() {
  const [query, setQuery] = useState(""),
    [question, setQuestion] = useState(""),
    [stage, setStage] = useState(-1),
    [error, setError] = useState("");
  useEffect(() => {
    if (stage < 0 || stage >= 3) return;
    const timer = setTimeout(() => setStage((s) => s + 1), 650);
    return () => clearTimeout(timer);
  }, [stage]);
  const busy = stage >= 0 && stage < 3;
  function ask(e?: FormEvent, text = query) {
    e?.preventDefault();
    const parsed = z
      .string()
      .trim()
      .min(5, "Ask a question with at least 5 characters.")
      .max(500, "Keep your question under 500 characters.")
      .safeParse(text);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setQuestion(parsed.data);
    setError("");
    setStage(0);
    setQuery("");
  }
  const lower = question.toLowerCase();
  return (
    <section id="assistant" className="section assistant-section">
      <div className="container">
        <Heading copy={pageCopy.assistant} />
        <Reveal className="glass assistant-demo">
          <div className="assistant-demo-header">
            <span className="gradient-icon">
              <Sparkles size={23} />
            </span>
            <div>
              <h3>Ask Trader World AI</h3>
              <small>trader-world-ai · online</small>
            </div>
            <span className="scanning">SIMULATED DEMO</span>
          </div>
          <div className="suggested-questions">
            {demoQuestions.map((q) => (
              <button disabled={busy} key={q} onClick={() => ask(undefined, q)}>
                {q}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {stage >= 0 && (
              <motion.div
                className="assistant-response"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
              >
                <p className="user-question">{question}</p>
                <ol>
                  {[
                    "Understanding your question",
                    "Building a research framework",
                    "Comparing illustrative market records",
                  ].map((s, i) => (
                    <li key={s} className={stage > i ? "complete" : ""}>
                      {stage > i ? (
                        <Check size={14} />
                      ) : (
                        <span className="loading-dot" />
                      )}
                      {s}
                    </li>
                  ))}
                </ol>
                {stage === 3 && (
                  <div className="response-result">
                    <Sparkles size={18} />
                    <div>
                      <strong>
                        {lower.includes("broker")
                          ? "A starting point for your broker research"
                          : lower.includes("prop")
                            ? "Compare the rules, not just the fee"
                            : lower.includes("risk")
                              ? "Start with a defined risk budget"
                              : "Put the price move in context"}
                      </strong>
                      <p>
                        {lower.includes("broker")
                          ? "Aurum Markets is one illustrative match for gold research. Compare minimum deposits, regional eligibility, and total fees using the live controls below. These are simulated providers, not endorsements."
                          : lower.includes("prop")
                            ? "Nova Funded and Apex Funded are sample challenges within $100. Check drawdown calculations and payout conditions in the comparison below. All records are illustrative."
                            : lower.includes("risk")
                              ? "At 1% risk on a $10,000 account, your risk budget is $100. A 1:2 setup targets $200 before fees. Use the risk calculator below to explore your own inputs."
                              : "Consider the dollar, bond yields, economic releases, and broader risk sentiment. This demonstration has no live news feed; it cannot explain today's actual gold movement."}
                      </p>
                      <a
                        href={
                          lower.includes("broker")
                            ? "#brokers"
                            : lower.includes("prop")
                              ? "#prop-firms"
                              : lower.includes("risk")
                                ? "#risk"
                                : "#intelligence"
                        }
                      >
                        Explore the tools
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <form className="assistant-input" onSubmit={ask}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a trading question…"
              aria-label="Ask a trading question"
              maxLength={500}
              disabled={busy}
            />
            <button
              className="button button-primary button-small"
              disabled={busy}
              type="submit"
            >
              <Send size={14} />
              {busy ? "Thinking…" : "Ask AI"}
            </button>
          </form>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </Reveal>
        <a href="#tools" className="explore-pill">
          <Sparkles size={13} /> Explore the full AI toolkit
          <ChevronDown size={13} />
        </a>
      </div>
    </section>
  );
}
export function ToolDirectory({ onTool }: { onTool: (name: string) => void }) {
  const [active, setActive] = useState("All tools");
  function navigate(title: string) {
    setActive(title);
  }
  return (
    <section id="tools" className="section tools-section">
      <div className="container">
        <Heading copy={pageCopy.tools} />
        <div className="tool-tabs" role="group" aria-label="Tool categories">
          {["All tools", ...toolGroups.map((g) => g.title)].map((title) => (
            <button
              key={title}
              className={active === title ? "active" : ""}
              aria-pressed={active === title}
              onClick={() => navigate(title)}
            >
              {title}
            </button>
          ))}
        </div>
        {toolGroups
          .filter((g) => active === "All tools" || g.title === active)
          .map((g) => (
            <div
              className={`tool-group color-${g.color}`}
              id={`group-${g.title}`}
              key={g.title}
            >
              <div className="tool-group-heading">
                <h3>
                  <span />
                  {g.title}
                </h3>
                <p>{g.description}</p>
              </div>
              <div
                className={`tool-card-grid ${g.tools.length === 2 ? "two-columns" : ""}`}
              >
                {g.tools.map((t, i) => (
                  <Reveal key={t.name} delay={(i % 3) * 0.05}>
                    <button
                      className="glass tool-card"
                      onClick={() => onTool(t.name)}
                    >
                      <span className="gradient-icon">
                        <ToolIcon name={t.icon} />
                      </span>
                      <ArrowUpRight className="tool-arrow" size={17} />
                      <h4>{t.name}</h4>
                      <p>{t.description}</p>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
const riskSchema = z
  .object({
    capital: z.number().positive(),
    risk: z.number().min(0.1).max(5),
    entry: z.number().positive(),
    stop: z.number().positive(),
    target: z.number().positive(),
  })
  .refine((v) => v.entry !== v.stop, {
    message: "Entry and stop must be different.",
  })
  .refine((v) => (v.target - v.entry) * (v.entry - v.stop) > 0, {
    message: "Target must be on the opposite side of entry from the stop.",
  });
export function RiskCalculator() {
  const [capital, setCapital] = useState(10000),
    [risk, setRisk] = useState(1),
    [entry, setEntry] = useState("2650"),
    [stop, setStop] = useState("2620"),
    [target, setTarget] = useState("2710");
  const parsed = riskSchema.safeParse({
    capital,
    risk,
    entry: Number(entry),
    stop: Number(stop),
    target: Number(target),
  });
  const amount = (capital * risk) / 100,
    distance = Math.abs(Number(entry) - Number(stop)),
    rr = distance ? Math.abs(Number(target) - Number(entry)) / distance : 0,
    size = distance ? amount / distance : 0;
  return (
    <section id="risk" className="section">
      <div className="container">
        <Heading copy={pageCopy.risk} />
        <Reveal className="glass risk-panel">
          <div className="risk-inputs">
            <h3>
              <ShieldCheck size={22} /> Your risk framework
            </h3>
            <label className="field-label" htmlFor="risk-capital">
              ACCOUNT CAPITAL{" "}
              <strong>${capital.toLocaleString("en-US")}</strong>
            </label>
            <input
              id="risk-capital"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
            />
            <label className="field-label" htmlFor="risk-percent">
              RISK PER TRADE <strong>{risk.toFixed(2)}%</strong>
            </label>
            <input
              id="risk-percent"
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value))}
            />
            <div className="price-inputs">
              {[
                { label: "ENTRY", v: entry, set: setEntry },
                { label: "STOP", v: stop, set: setStop },
                { label: "TARGET", v: target, set: setTarget },
              ].map((f) => (
                <label key={f.label}>
                  <span className="field-label">{f.label}</span>
                  <input
                    type="number"
                    min="0.0001"
                    step="any"
                    value={f.v}
                    onChange={(e) => f.set(e.target.value)}
                    aria-label={f.label.toLowerCase() + " price"}
                  />
                </label>
              ))}
            </div>
            {!parsed.success && (
              <p className="form-error" role="alert">
                {parsed.error.issues[0].message}
              </p>
            )}
          </div>
          <div className="risk-results" aria-live="polite">
            <div className="risk-stat-grid">
              <div className="glass risk-stat">
                <span className="field-label">CAPITAL AT RISK</span>
                <strong>
                  {parsed.success ? `$${amount.toFixed(2)}` : "—"}
                </strong>
                <small>{risk.toFixed(2)}% of your account</small>
              </div>
              <div className="glass risk-stat">
                <span className="field-label">RISK / REWARD</span>
                <strong>{parsed.success ? `1 : ${rr.toFixed(1)}` : "—"}</strong>
                <small>Before fees and slippage</small>
              </div>
              <div className="glass risk-stat">
                <span className="field-label">POSITION SIZE</span>
                <strong>
                  {parsed.success ? size.toFixed(2) : "—"}
                  <small> units</small>
                </strong>
                <small>Risk ÷ stop distance</small>
              </div>
              <div className="glass risk-stat">
                <span className="field-label">POTENTIAL REWARD</span>
                <strong>
                  {parsed.success ? `$${(amount * rr).toFixed(2)}` : "—"}
                </strong>
                <small>Illustrative target value</small>
              </div>
            </div>
            <div className="glass risk-explanation">
              <span className="gradient-icon">
                <Target size={21} />
              </span>
              <p>
                {parsed.success ? (
                  <>
                    At 1:{rr.toFixed(1)} risk/reward, the theoretical break-even
                    win rate is {(100 / (rr + 1)).toFixed(0)}% before costs. The{" "}
                    <strong>AI Risk Planner</strong> helps turn a scenario into
                    a written framework.
                  </>
                ) : (
                  "Enter valid prices to see your risk framework."
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function PassportSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="intelligence" className="section">
      <div className="container">
        <Heading copy={pageCopy.passport} />
        <Reveal className="glass passport-panel">
          <div className="glass equity-card">
            <div className="equity-heading">
              <h3>
                <Activity size={17} /> Equity curve — sample journal
              </h3>
              <span className="positive">+8.84R</span>
            </div>
            <PriceChart market={markets[0]} timeframe="1M" />
            <div className="equity-months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>
          <div className="passport-stats">
            <div className="passport-stat-grid">
              <div className="glass">
                <span className="field-label">WIN RATE</span>
                <strong>58%</strong>
              </div>
              <div className="glass">
                <span className="field-label">AVG. R / TRADE</span>
                <strong>+0.84R</strong>
              </div>
            </div>
            <div className="glass consistency-card">
              <span className="field-label">MONTHLY R · SAMPLE RESULTS</span>
              <div className="consistency-bars">
                {[41, 54, 49, 65, 43, 51, 29, 33, 31, 53].map((h, i) => (
                  <i style={{ height: h }} key={i} />
                ))}
              </div>
              <span className="consistency-caption">
                Consistency starts with a clearer process.
              </span>
            </div>
            <button className="glass discipline-card" onClick={onOpen}>
              <span className="discipline-ring">82%</span>
              <span>
                <strong>Discipline score</strong>
                <small>
                  Build a routine around your research. Open your journal
                  <ArrowUpRight size={12} />
                </small>
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
