"use client";
import { useId, useState } from "react";
import { markets } from "@/data";

type Market = (typeof markets)[number];
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price < 2 ? 4 : 2,
    maximumFractionDigits: price < 2 ? 4 : 2,
  }).format(price);
export function PriceChart({
  market,
  timeframe = "1D",
  mini = false,
}: {
  market: Market;
  timeframe?: string;
  mini?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const offset = ["1H", "4H", "1D", "1W", "1M"].indexOf(timeframe);
  const raw = market.values;
  const values = raw.map(
    (v, i) => v + Math.sin(i * (offset + 1)) * (offset + 1) * 2,
  );
  const width = 720,
    height = mini ? 70 : 240,
    pad = mini ? 4 : 20;
  const min = Math.min(...values) - 15,
    max = Math.max(...values) + 15;
  const point = (i: number) => ({
    x: pad + (i / (values.length - 1)) * (width - pad * 2),
    y: height - pad - ((values[i] - min) / (max - min)) * (height - pad * 2),
  });
  const path = values
    .map((_, i) => `${i === 0 ? "M" : "L"}${point(i).x},${point(i).y}`)
    .join(" ");
  const positive = market.change >= 0,
    color = positive ? "#289780" : "#d37676";
  const selected = hover === null ? null : point(hover);
  return (
    <div className={`price-chart ${mini ? "mini-chart" : ""}`}>
      {!mini && (
        <span className="chart-unit">USD · {timeframe} · Example data</span>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${market.name} illustrative ${timeframe} price chart`}
        preserveAspectRatio="none"
        onPointerMove={
          mini
            ? undefined
            : (e) => {
                const box = e.currentTarget.getBoundingClientRect();
                setHover(
                  Math.max(
                    0,
                    Math.min(
                      values.length - 1,
                      Math.round(
                        ((e.clientX - box.left) / box.width) *
                          (values.length - 1),
                      ),
                    ),
                  ),
                );
              }
        }
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={color} stopOpacity=".18" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {!mini &&
          [0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2={width}
              y1={25 + i * 58}
              y2={25 + i * 58}
              stroke="#e7edeb"
              strokeDasharray="3 6"
            />
          ))}
        <path
          d={`${path} L${width - pad},${height} L${pad},${height} Z`}
          fill={`url(#${id})`}
        />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={mini ? 2 : 2.6}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {selected && (
          <>
            <line
              x1={selected.x}
              x2={selected.x}
              y1="0"
              y2={height}
              stroke={color}
              strokeDasharray="4 4"
            />
            <circle
              cx={selected.x}
              cy={selected.y}
              r="5"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          </>
        )}
      </svg>
      {!mini && (
        <>
          <div className="chart-times">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
          </div>
          {hover !== null && (
            <div className="chart-tooltip">
              Sample {hover + 1} ·{" "}
              {formatPrice(market.price * (0.98 + values[hover] / 4500))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
