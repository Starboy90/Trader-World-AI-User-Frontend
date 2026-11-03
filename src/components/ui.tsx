"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, ChartCandlestick, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Trader World AI home">
      <span className="brand-icon">
        <ChartCandlestick size={21} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span>
          Trader World<span className="brand-ai">AI</span>
        </span>
      )}
    </Link>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Action({
  children,
  onClick,
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      onClick={onClick}
    >
      {children}
      <ArrowUpRight size={16} />
    </button>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const prior = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = before;
      prior?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
export function Coin({ symbol, color }: { symbol: string; color: string }) {
  return (
    <span className="coin" style={{ background: `${color}15`, color }}>
      {symbol === "BTC"
        ? "₿"
        : symbol === "ETH"
          ? "Ξ"
          : symbol === "EUR"
            ? "€"
            : symbol.slice(0, 1)}
    </span>
  );
}
