"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Crown, Package, Plus } from "lucide-react";
import { pageCopy, faqs, modules, plans } from "@/data";
import { Heading } from "./discovery";
import { Reveal } from "./ui";
import { ToolIcon } from "./tool-icon";
export function Pricing({
  onChoose,
}: {
  onChoose: (plan: string, price: number, period: string) => void;
}) {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="section">
      <div className="container">
        <Heading copy={pageCopy.pricing} />
        <Reveal className="billing-wrap">
          <div
            className="billing-toggle"
            role="group"
            aria-label="Billing period"
          >
            <button
              className={!annual ? "active" : ""}
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={annual ? "active" : ""}
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              Annual<span>2 months free</span>
            </button>
          </div>
        </Reveal>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.06}
              className={`glass pricing-card ${p.popular ? "recommended" : ""}`}
            >
              {p.popular && (
                <span className="recommended-label">
                  <Crown size={13} /> RECOMMENDED
                </span>
              )}
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="plan-price">
                <motion.strong
                  key={String(annual)}
                  initial={{ opacity: 0.3, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ${annual ? p.yearly : p.monthly}
                </motion.strong>
                <span>/ {annual ? "year" : "month"}</span>
              </div>
              <p className="annual-note">
                {annual ? "Two months free vs monthly" : "\u00a0"}
              </p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={15} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`button ${p.popular ? "button-primary" : "button-secondary"}`}
                onClick={() =>
                  onChoose(
                    p.name,
                    annual ? p.yearly : p.monthly,
                    annual ? "year" : "month",
                  )
                }
              >
                {p.cta}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PackageBuilder({
  onChoose,
}: {
  onChoose: (plan: string, price: number, period: string) => void;
}) {
  const [selected, setSelected] = useState([0, 6]);
  const total = selected.reduce((sum, i) => sum + modules[i].price, 0);
  function toggle(i: number) {
    setSelected((s) => (s.includes(i) ? s.filter((v) => v !== i) : [...s, i]));
  }
  return (
    <section id="package" className="section">
      <div className="container">
        <Heading copy={pageCopy.package} />
        <Reveal className="glass package-panel">
          <div className="package-grid">
            {modules.map((m, i) => (
              <button
                key={m.name}
                className={`glass module-card ${selected.includes(i) ? "selected" : ""}`}
                aria-pressed={selected.includes(i)}
                onClick={() => toggle(i)}
              >
                <span className="gradient-icon">
                  <ToolIcon name={m.icon} />
                </span>
                <span className="module-check">
                  {selected.includes(i) ? (
                    <Check size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
                <h3>{m.name}</h3>
                <p>{m.description}</p>
                <strong>
                  ${m.price}
                  <small>/month</small>
                </strong>
              </button>
            ))}
          </div>
          <div className="glass package-summary">
            <div className="selected-modules">
              {selected.length ? (
                selected.map((i) => (
                  <button
                    key={i}
                    aria-label={`Remove ${modules[i].name}`}
                    onClick={() => toggle(i)}
                  >
                    {modules[i].name} · ${modules[i].price}
                    <Plus size={10} />
                  </button>
                ))
              ) : (
                <span>Select the modules that fit your workflow.</span>
              )}
            </div>
            <div className="package-total" aria-live="polite">
              <span className="field-label">PACKAGE TOTAL</span>
              <strong>
                ${total}
                <small>/mo</small>
              </strong>
            </div>
            <button
              className="button button-primary"
              disabled={!selected.length}
              onClick={() =>
                onChoose(
                  `Custom package: ${selected.map((i) => modules[i].name).join(", ")}`,
                  total,
                  "month",
                )
              }
            >
              <Package size={16} /> Continue
            </button>
          </div>
          <p className="package-note">
            Demo builder — checkout is activated when a billing backend is
            connected.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section">
      <div className="container">
        <Heading copy={pageCopy.faq} />
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal className="glass faq-item" key={f.question}>
              <h3>
                <button
                  id={`faq-question-${i}`}
                  aria-controls={`faq-answer-${i}`}
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.question}
                  <span className={open === i ? "open" : ""}>
                    <Plus size={16} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p>{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
