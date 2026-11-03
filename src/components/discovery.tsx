"use client";
import { useMemo, useState } from "react";
import { Building2, Check, ShieldCheck, Sparkles } from "lucide-react";
import { pageCopy, brokers, propFirms } from "@/data";
import { Reveal } from "./ui";

export function Heading({
  copy,
}: {
  copy: {
    eyebrow: string;
    before: string;
    accent: string;
    after: string;
    description: string;
  };
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">
        <span />
        {copy.eyebrow}
      </p>
      <h2>
        {copy.before}
        <span className="gradient-text">{copy.accent}</span>
        {copy.after}
      </h2>
      <p>{copy.description}</p>
    </Reveal>
  );
}
export function Segments({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="segments-group">
      <span className="field-label">{label}</span>
      <div className="segments" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            className={value === o ? "active" : ""}
            aria-pressed={value === o}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
export function BrokerDiscovery() {
  const [capital, setCapital] = useState(3000),
    [experience, setExperience] = useState("Beginner"),
    [instrument, setInstrument] = useState("Gold"),
    [region, setRegion] = useState("EU"),
    [priority, setPriority] = useState("Balanced");
  const ranked = useMemo(
    () =>
      brokers
        .map((b) => ({
          ...b,
          score: Math.min(
            99,
            Math.round(
              45 +
                (b.deposit <= capital ? 15 : -10) +
                (b.instruments.includes(instrument) ? 14 : 0) +
                (b.region.includes(region) ? 10 : 0) +
                (priority === "Tight spreads"
                  ? (1.2 - b.spread) * 12
                  : priority === "Low deposits"
                    ? Math.max(0, 15 - b.deposit / 40)
                    : (1.2 - b.spread) * 7 + Math.max(0, 7 - b.deposit / 100)) +
                (experience === "Beginner"
                  ? b.deposit <= 250
                    ? 3
                    : 0
                  : b.leverage <= 200
                    ? 3
                    : 0),
            ),
          ),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [capital, experience, instrument, region, priority],
  );
  const best = ranked[0];
  return (
    <section id="brokers" className="section">
      <div className="container">
        <Heading copy={pageCopy.brokers} />
        <Reveal className="glass discovery-panel">
          <div className="profile-controls">
            <h3>
              <Building2 size={23} /> Your profile
            </h3>
            <label className="field-label" htmlFor="trading-capital">
              TRADING CAPITAL —{" "}
              <strong>${capital.toLocaleString("en-US")}</strong>
            </label>
            <input
              id="trading-capital"
              type="range"
              min="100"
              max="10000"
              step="100"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
            />
            <Segments
              label="EXPERIENCE"
              options={["Beginner", "Intermediate", "Advanced"]}
              value={experience}
              onChange={setExperience}
            />
            <Segments
              label="PREFERRED INSTRUMENT"
              options={["Gold", "Forex", "Crypto", "Indices"]}
              value={instrument}
              onChange={setInstrument}
            />
            <Segments
              label="REGION"
              options={["EU", "UK", "APAC", "Global"]}
              value={region}
              onChange={setRegion}
            />
            <Segments
              label="FEE PRIORITY"
              options={["Low deposits", "Tight spreads", "Balanced"]}
              value={priority}
              onChange={setPriority}
            />
            <p className="info-note">
              Illustrative comparison records. Match scores demonstrate how your
              preferences affect a shortlist.
            </p>
          </div>
          <div className="broker-results" aria-live="polite">
            <div className="comparison-grid">
              {ranked.map((b, i) => (
                <article
                  className={`glass comparison-card ${i === 0 ? "best-match" : ""}`}
                  key={b.name}
                >
                  {i === 0 && (
                    <span className="best-match-label">BEST MATCH</span>
                  )}
                  <div className="comparison-title">
                    <h3>{b.name}</h3>
                    <span>{b.score}%</span>
                  </div>
                  <p>{b.description}</p>
                  <dl>
                    <div>
                      <dt>Min deposit</dt>
                      <dd>${b.deposit}</dd>
                    </div>
                    <div>
                      <dt>Gold spread</dt>
                      <dd>{b.spread} pips</dd>
                    </div>
                    <div>
                      <dt>Leverage</dt>
                      <dd>1:{b.leverage}</dd>
                    </div>
                    <div>
                      <dt>Regulation</dt>
                      <dd>{b.regulation}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="glass match-reasons">
              <h3>
                <Sparkles size={17} /> Why the AI ranks {best.name} first
              </h3>
              <ul>
                <li>
                  <Check size={16} />
                  {best.instruments.includes(instrument)
                    ? `${instrument} coverage fits your ${priority.toLowerCase()} priority.`
                    : `Compare ${instrument} availability directly with this provider.`}
                </li>
                <li>
                  <Check size={16} />
                  {best.deposit <= capital
                    ? `$${best.deposit} minimum sits inside your $${capital.toLocaleString("en-US")} capital.`
                    : `The $${best.deposit} minimum exceeds your current budget.`}
                </li>
                <li>
                  <Check size={16} />
                  {best.regulation} oversight for your{" "}
                  {experience.toLowerCase()} research in {region}.
                </li>
                <li>
                  <Check size={16} />
                  Platforms: {best.platforms}.
                </li>
              </ul>
              <p>
                <ShieldCheck size={13} />
                Simulated records; spreads and eligibility vary. Verify with the
                provider. Not a recommendation.
              </p>
            </div>
            <p className="scan-note">
              Brokers scanned: <strong>{brokers.length}</strong> · criteria: 12
              · illustrative data
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function PropDiscovery() {
  const [budget, setBudget] = useState("≤ $100"),
    [rule, setRule] = useState("Any"),
    [payout, setPayout] = useState("30d");
  const limit = Number(budget.replace(/\D/g, "")),
    days = Number(payout.replace("d", ""));
  const filtered = propFirms
    .filter(
      (p) =>
        p.fee <= limit &&
        (rule === "Any" || p.rule === rule) &&
        p.payout <= days,
    )
    .sort((a, b) => a.target / a.drawdown - b.target / b.drawdown);
  return (
    <section id="prop-firms" className="section">
      <div className="container">
        <Heading copy={pageCopy.propFirms} />
        <Reveal className="glass prop-panel">
          <div className="prop-filters">
            <Segments
              label={`CHALLENGE BUDGET — $${limit}`}
              options={["≤ $50", "≤ $75", "≤ $100", "≤ $150"]}
              value={budget}
              onChange={setBudget}
            />
            <Segments
              label="DRAWDOWN RULE"
              options={["Any", "Static", "Trailing", "End-of-day"]}
              value={rule}
              onChange={setRule}
            />
            <Segments
              label="PAYOUT WITHIN"
              options={["7d", "14d", "30d"]}
              value={payout}
              onChange={setPayout}
            />
          </div>
          <div className="prop-results" aria-live="polite">
            {filtered.length ? (
              filtered.slice(0, 3).map((p, i) => (
                <article
                  className={`glass prop-card ${i === 0 ? "best-match" : ""}`}
                  key={p.name}
                >
                  <div className="comparison-title">
                    <h3>{p.name}</h3>
                    <span>{Math.max(80, 98 - i * 3)}% match</span>
                  </div>
                  <p>{p.description}</p>
                  {[
                    { label: "Profit target", value: p.target, max: 12 },
                    { label: "Max drawdown", value: p.drawdown, max: 14 },
                    { label: "Profit split", value: p.split, max: 100 },
                  ].map((v) => (
                    <div className="metric-bar" key={v.label}>
                      <div>
                        <span>{v.label}</span>
                        <strong>{v.value}%</strong>
                      </div>
                      <div className="bar-track">
                        <span
                          style={{ width: `${(v.value / v.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="prop-tags">
                    <span>from ${p.fee}</span>
                    <span>{p.rule} DD</span>
                    <span>payout {p.payout}d</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <ShieldCheck size={28} />
                <h3>No matching challenges.</h3>
                <p>
                  Try a larger budget, another drawdown rule, or a longer payout
                  window.
                </p>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    setBudget("≤ $100");
                    setRule("Any");
                    setPayout("30d");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
          <p className="scan-note">
            Illustrative challenge records. Confirm rules and eligibility with
            the provider before applying.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
