// Editable content, example market data, and pricing. No live market feed is connected.
export const site = {
  name: "Trader World AI",
  copyrightYear: 2026,
  disclaimer:
    "Trader World AI is a research interface. Example data is illustrative, not live. Nothing on this website is financial advice. Trading involves risk, including the loss of capital.",
};
export const markets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    pair: "BTC / USD",
    price: 67432.8,
    change: 2.84,
    color: "#ee9c30",
    category: "Crypto",
    values: [
      25, 32, 28, 40, 35, 45, 43, 38, 54, 50, 65, 61, 73, 69, 82, 78, 89, 84,
      97, 93, 109, 101, 117, 111, 125, 120, 137, 132,
    ],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    pair: "ETH / USD",
    price: 3521.46,
    change: 1.62,
    color: "#8a8db5",
    category: "Crypto",
    values: [
      25, 33, 30, 28, 39, 34, 42, 36, 49, 53, 47, 61, 54, 63, 59, 72, 68, 78,
      72, 86, 80, 89, 85, 96, 87, 99, 95, 106,
    ],
  },
  {
    symbol: "AAPL",
    name: "Apple",
    pair: "AAPL / USD",
    price: 213.07,
    change: -0.43,
    color: "#1c2533",
    category: "Stocks",
    values: [
      115, 110, 119, 105, 109, 98, 105, 93, 98, 85, 94, 80, 88, 75, 80, 69, 77,
      63, 70, 61, 65, 54, 59, 48, 53, 45, 50, 44,
    ],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    pair: "NVDA / USD",
    price: 126.57,
    change: 3.12,
    color: "#79a64c",
    category: "Stocks",
    values: [
      20, 32, 25, 34, 31, 45, 41, 51, 44, 57, 55, 67, 61, 77, 70, 83, 76, 91,
      86, 102, 97, 111, 105, 118, 113, 125, 118, 137,
    ],
  },
  {
    symbol: "EUR",
    name: "Euro / US Dollar",
    pair: "EUR / USD",
    price: 1.0864,
    change: 0.21,
    color: "#5484c6",
    category: "Forex",
    values: [
      45, 53, 46, 59, 51, 56, 65, 58, 70, 65, 75, 67, 81, 73, 89, 82, 95, 88,
      101, 94, 107, 100, 111, 103, 115, 108, 119, 115,
    ],
  },
];
export const plans = [
  {
    name: "Starter",
    description: "Meet your AI trading desk",
    monthly: 19,
    yearly: 190,
    cta: "Choose plan",
    popular: false,
    features: [
      "Ask Trader World AI",
      "Economic Calendar + News AI",
      "Trading Calculators",
      "Personal Watchlist",
      "1,000 monthly AI credits",
    ],
  },
  {
    name: "Trader Pro",
    description: "The complete daily workflow",
    monthly: 39,
    yearly: 390,
    cta: "Get Trader Pro",
    popular: true,
    features: [
      "Everything in Starter",
      "Chart & Strategy AI",
      "Broker & Prop Firm Comparison",
      "AI Risk Planner + Journal",
      "Daily Market Brief AI",
      "5,000 monthly AI credits",
    ],
  },
  {
    name: "Elite",
    description: "Serious market intelligence",
    monthly: 69,
    yearly: 690,
    cta: "Choose plan",
    popular: false,
    features: [
      "Everything in Trader Pro",
      "Account Auditor",
      "Central Bank Intelligence",
      "News Impact Analyzer",
      "Why Is This Market Moving?",
      "15,000 monthly AI credits",
    ],
  },
  {
    name: "Ultimate",
    description: "The full ecosystem unlocked",
    monthly: 99,
    yearly: 990,
    cta: "Choose plan",
    popular: false,
    features: [
      "Everything in Elite",
      "Trader Passport Pro",
      "Unlimited saved analysis",
      "Priority AI responses",
      "Early access to new tools",
      "50,000 monthly AI credits",
    ],
  },
];
export const faqs = [
  {
    question: "What is Trader World AI?",
    answer:
      "Your AI-powered trading intelligence platform — analyze, compare, plan and improve, all in one connected ecosystem. This frontend demonstrates the workflow with simulated data and example AI responses.",
  },
  {
    question: "What is a Trader Passport?",
    answer:
      "Your personal trading profile brings your preferences, watchlist, research, and journal together. In this demo, saved workspace information is kept in your browser, with no server account or cloud synchronization.",
  },
  {
    question: "How do credits and subscriptions work?",
    answer:
      "Each plan includes a monthly AI credit allowance. The displayed plans and credits illustrate the intended product; no subscription or payment service is connected to this frontend.",
  },
  {
    question: "Can I build my own package?",
    answer:
      "Yes. The Build Your Own Package section lets you select any combination of the eight AI modules and see your total monthly cost update instantly — no hidden bundles.",
  },
  {
    question: "Does Trader World AI give financial advice?",
    answer:
      "No. Trader World AI provides educational and analytical tools, not financial advice or trade execution. All market data and comparison records in this demo are simulated. Always do your own research.",
  },
  {
    question: "Can I cancel or change plans anytime?",
    answer:
      "You can explore different plans or build a custom package in this demo without being charged. Actual subscription management requires a connected billing service.",
  },
];
export const insightPrompts = [
  "Summarize this market",
  "What are the key levels?",
  "Help me plan my research",
];
export const insights = {
  summary:
    "The example chart shows a constructive short-term trend, with higher lows and improving momentum. Check volume and the broader market before drawing a conclusion. This is an illustrative research summary, not a live signal.",
  levels:
    "Start by marking the most recent swing high and swing low on the chart. These can help you frame possible resistance and support. Look for confirmation across multiple timeframes; price levels alone do not predict an outcome.",
  research:
    "A considered research plan: 1. Review the wider trend. 2. Note upcoming economic events. 3. Define your risk before any decision. 4. Record your reasoning in your journal. Revisit the plan as new information arrives.",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "AI Tools", href: "#tools" },
  { label: "Brokers", href: "#brokers" },
  { label: "Prop Firms", href: "#prop-firms" },
  { label: "Market Intelligence", href: "#intelligence" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];
export const toolGroups = [
  {
    title: "Ask & Learn",
    description: "Ask questions in plain language and learn as you trade.",
    color: "purple",
    tools: [
      {
        name: "Ask Trader World AI",
        description:
          "One AI that understands your trading questions and finds answers across the whole platform.",
        icon: "message",
      },
      {
        name: "Trading Education",
        description:
          "Structured lessons that turn market concepts into practical, testable knowledge.",
        icon: "education",
      },
    ],
  },
  {
    title: "Trading Analysis",
    description: "Break down charts, accounts and behaviour with AI.",
    color: "cyan",
    tools: [
      {
        name: "Chart & Strategy AI",
        description:
          "Screenshot or describe a chart and get structured, level-based analysis.",
        icon: "chart",
      },
      {
        name: "Account Auditor",
        description:
          "Let AI review your trading performance to surface strengths and leaks.",
        icon: "audit",
      },
      {
        name: "Trading Journal",
        description:
          "Log every trade and let AI find the patterns behind your results.",
        icon: "journal",
      },
    ],
  },
  {
    title: "Market Intelligence",
    description: "Understand the story behind the price.",
    color: "mint",
    tools: [
      {
        name: "Economic Calendar AI",
        description:
          "Every event in context — understand what matters for your markets.",
        icon: "calendar",
      },
      {
        name: "Market News AI",
        description:
          "The headlines that matter, filtered and explained for traders.",
        icon: "news",
      },
      {
        name: "Why Is This Market Moving?",
        description:
          "Connect the dots between price, news and market sentiment.",
        icon: "globe",
      },
      {
        name: "Central Bank Intelligence",
        description: "Policy paths, statements and tone decoded for traders.",
        icon: "building",
      },
      {
        name: "News Impact Analyzer",
        description: "See how similar headlines moved markets in the past.",
        icon: "chart",
      },
      {
        name: "Daily Market Brief AI",
        description: "A calm, structured brief before your session starts.",
        icon: "brief",
      },
    ],
  },
  {
    title: "Broker & Prop Firm Discovery",
    description: "Find the right counterparty before you fund an account.",
    color: "pink",
    tools: [
      {
        name: "Broker AI and Comparison",
        description:
          "Describe your budget and style — AI shortlists and compares brokers.",
        icon: "building",
      },
      {
        name: "Prop Firm AI and Comparison",
        description:
          "Match challenge rules, drawdowns and payouts to your strategy.",
        icon: "scale",
      },
    ],
  },
  {
    title: "Risk & Planning",
    description: "Discipline is a system, not a mood.",
    color: "blue",
    tools: [
      {
        name: "Trading Calculators",
        description:
          "Position size, pip value, R:R and margin — computed precisely.",
        icon: "calculator",
      },
      {
        name: "AI Risk Planner",
        description:
          "Turn your capital and goals into a written risk framework.",
        icon: "shield",
      },
      {
        name: "Pre-Trade Checklist",
        description:
          "A gate before every entry so impulses never reach the market.",
        icon: "checklist",
      },
    ],
  },
  {
    title: "Personal Workspace",
    description: "Your process, connected in one place.",
    color: "purple",
    tools: [
      {
        name: "Trader Passport",
        description:
          "A personal profile that connects your trading preferences.",
        icon: "passport",
      },
      {
        name: "Personal Watchlist",
        description: "Keep your favorite markets and ideas within reach.",
        icon: "star",
      },
      {
        name: "Saved Analysis",
        description: "Return to the insights that matter to your process.",
        icon: "saved",
      },
      {
        name: "Analysis History",
        description: "A clear view of your research, over time.",
        icon: "history",
      },
    ],
  },
  {
    title: "Platform Features",
    description: "Flexible credits, subscriptions and rewards.",
    color: "mint",
    tools: [
      {
        name: "Credits and Subscriptions",
        description:
          "One credits system — pay only for the intelligence you use.",
        icon: "credits",
      },
      {
        name: "Referrals and Rewards",
        description: "Share Trader World AI and grow with the community.",
        icon: "gift",
      },
    ],
  },
];
export const modules = [
  {
    name: "Ask Trader World AI",
    description: "Conversational AI across the whole platform",
    price: 19,
    icon: "message",
  },
  {
    name: "Chart & Strategy AI",
    description: "Chart breakdowns and strategy feedback",
    price: 29,
    icon: "chart",
  },
  {
    name: "Broker Intelligence",
    description: "AI broker research and side-by-side comparison",
    price: 19,
    icon: "building",
  },
  {
    name: "Prop Firm Intelligence",
    description: "Challenge rules decoded and matched to you",
    price: 19,
    icon: "scale",
  },
  {
    name: "Trading Toolkit & Account Auditor",
    description: "Calculators, checklist and account review",
    price: 19,
    icon: "audit",
  },
  {
    name: "Market Intelligence",
    description: "News, calendar, central banks and movers",
    price: 29,
    icon: "globe",
  },
  {
    name: "Risk & Discipline AI",
    description: "Risk planning and pre-trade guardrails",
    price: 19,
    icon: "shield",
  },
  {
    name: "Trader Workspace",
    description: "Passport, watchlist, journal and history",
    price: 19,
    icon: "passport",
  },
];
export const brokers = [
  {
    name: "Aurum Markets",
    description: "Low-spread gold trading",
    deposit: 250,
    spread: 0.2,
    leverage: 500,
    regulation: "FCA, ASIC",
    region: ["EU", "UK", "APAC", "Global"],
    instruments: ["Gold", "Forex"],
    platforms: "MT4, MT5 with raw spreads",
  },
  {
    name: "Helix Broker",
    description: "Professional raw pricing",
    deposit: 500,
    spread: 0.1,
    leverage: 100,
    regulation: "ASIC",
    region: ["APAC", "Global"],
    instruments: ["Gold", "Forex", "Indices"],
    platforms: "MT5 and cTrader",
  },
  {
    name: "Meridian Markets",
    description: "Regulated multi-asset access",
    deposit: 100,
    spread: 0.3,
    leverage: 200,
    regulation: "FCA",
    region: ["EU", "UK", "Global"],
    instruments: ["Forex", "Indices"],
    platforms: "MT4 and MT5",
  },
  {
    name: "NovaTrade",
    description: "Beginner-friendly fees",
    deposit: 100,
    spread: 0.9,
    leverage: 400,
    regulation: "CySEC",
    region: ["EU", "Global"],
    instruments: ["Gold", "Forex", "Crypto"],
    platforms: "MT5 and web trader",
  },
  {
    name: "Vertex Global",
    description: "Crypto & metals variety",
    deposit: 200,
    spread: 0.6,
    leverage: 500,
    regulation: "ASIC, VFSC",
    region: ["APAC", "Global"],
    instruments: ["Crypto", "Gold", "Indices"],
    platforms: "MT4 and MT5",
  },
  {
    name: "Nordic Trade",
    description: "Accessible global trading",
    deposit: 50,
    spread: 0.8,
    leverage: 200,
    regulation: "CySEC",
    region: ["EU", "UK", "Global"],
    instruments: ["Forex", "Crypto"],
    platforms: "MT5 and web trader",
  },
  {
    name: "Atlas Prime",
    description: "Broad market coverage",
    deposit: 1000,
    spread: 0.4,
    leverage: 100,
    regulation: "FCA",
    region: ["UK", "EU", "Global"],
    instruments: ["Indices", "Forex"],
    platforms: "cTrader",
  },
  {
    name: "Coastline FX",
    description: "A simple place to start",
    deposit: 25,
    spread: 1.2,
    leverage: 200,
    regulation: "ASIC",
    region: ["APAC", "Global"],
    instruments: ["Forex", "Gold"],
    platforms: "MT4",
  },
];
export const propFirms = [
  {
    name: "Nova Funded",
    description: "Tight-risk disciplined traders",
    fee: 99,
    target: 8,
    drawdown: 6,
    split: 90,
    rule: "Static",
    payout: 7,
  },
  {
    name: "Apex Funded",
    description: "Fast payouts",
    fee: 79,
    target: 9,
    drawdown: 8,
    split: 90,
    rule: "Trailing",
    payout: 14,
  },
  {
    name: "Summit Capital",
    description: "Balanced, predictable rules",
    fee: 59,
    target: 8,
    drawdown: 10,
    split: 85,
    rule: "Static",
    payout: 14,
  },
  {
    name: "Horizon Funding",
    description: "An accessible first challenge",
    fee: 49,
    target: 10,
    drawdown: 8,
    split: 80,
    rule: "End-of-day",
    payout: 30,
  },
];
export const demoQuestions = [
  "I have $3,000. Which gold broker is suitable for me?",
  "Compare prop firms with a $100 challenge budget",
  "How much should I risk on a 1:2 setup?",
  "Why is gold moving today?",
];
export const quotes = [
  { symbol: "XAU/USD", price: "$2,654.32", change: "+0.82%" },
  { symbol: "EUR/USD", price: "$1.0847", change: "-0.12%" },
  { symbol: "BTC/USD", price: "$97,410.00", change: "+2.31%" },
  { symbol: "NASDAQ", price: "$21,845.60", change: "+1.04%" },
];
export const headlines = [
  { symbol: "BTC/USD", text: "Bitcoin extends recovery above $97,000" },
  {
    symbol: "NASDAQ",
    text: "Tech futures edge higher on AI earnings optimism",
  },
  { symbol: "USD", text: "Dollar softens as yields slip from weekly highs" },
];

export const workflow = [
  {
    title: "Create your Trader Passport",
    description:
      "Set up your profile, your trading preferences and the markets you follow.",
    icon: "passport",
  },
  {
    title: "Choose your AI tools",
    description: "Pick a subscription or build a package of your own modules.",
    icon: "workspace",
  },
  {
    title: "Ask and analyze",
    description:
      "Research markets, compare providers, read charts — in plain language.",
    icon: "message",
  },
  {
    title: "Save and improve",
    description:
      "Keep your research connected and build a more considered routine.",
    icon: "journal",
  },
];

export const pageCopy = {
  hero: {
    badge: "YOUR AI-POWERED TRADING INTELLIGENCE PLATFORM",
    first: "Trade",
    firstAccent: "Smarter.",
    second: "Think Beyond",
    third: "Markets.",
    description:
      "Trading Intelligence Platform. Ask questions in plain English — get broker matches, chart reads and risk-sized plans in seconds.",
    checks: [
      "22 AI tools connected",
      "Broker & prop matching",
      "7-day free trial*",
    ],
  },
  assistant: {
    eyebrow: "YOUR AI TRADING ASSISTANT",
    before: "Ask ",
    accent: "Trader World AI",
    after: " anything about trading.",
    description:
      "Watch the AI understand your question, build search filters, scan the broker database and explain its reasoning — step by step.",
  },
  tools: {
    eyebrow: "CONNECTED AI TOOLS",
    before: "One connected ",
    accent: "trading intelligence",
    after: " ecosystem",
    description:
      "22 AI tools that share one context — your watchlist, your risk rules, your Trader Passport.",
  },
  brokers: {
    eyebrow: "BROKER INTELLIGENCE",
    before: "AI broker comparison, ",
    accent: "matched to you",
    after: "",
    description:
      "Your capital. Your preferences. A clearer comparison — with the reasoning behind every match.",
  },
  propFirms: {
    eyebrow: "PROP FIRM DISCOVERY",
    before: "Challenge rules, ",
    accent: "decoded",
    after: "",
    description:
      "Every prop firm prices risk differently. Compare drawdown rules, profit targets and payout speed to your trading style.",
  },
  risk: {
    eyebrow: "RISK & PLANNING",
    before: "Discipline, ",
    accent: "computed",
    after: "",
    description:
      "Turn your numbers into a considered plan. Understand your exposure before you enter.",
  },
  passport: {
    eyebrow: "TRADING ANALYSIS",
    before: "A journal that ",
    accent: "improves you",
    after: "",
    description:
      "Your journal, performance and discipline — connected to your Trader Passport.",
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    before: "From sign-up to ",
    accent: "sharper trading",
    after: " in four steps",
    description: "One connected workspace. A more considered trading routine.",
  },
  pricing: {
    eyebrow: "SUBSCRIPTION PLANS",
    before: "Simple plans, ",
    accent: "serious intelligence",
    after: "",
    description:
      "Start with a subscription, build a custom package, or top up credits — cancel anytime.",
  },
  package: {
    eyebrow: "BUILD YOUR OWN PACKAGE",
    before: "Pay for ",
    accent: "exactly",
    after: " what you need",
    description:
      "Mix the eight AI modules into your own plan — the total updates as you build.",
  },
  faq: {
    eyebrow: "FAQ",
    before: "Questions, ",
    accent: "answered",
    after: "",
    description: "Everything else you may be wondering.",
  },
  footer:
    "Your AI-Powered Trading Intelligence Platform — analyze, compare, plan and improve, all in one connected ecosystem.",
  riskWarning:
    "Trading foreign exchange, commodities, indices and crypto on margin carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. Trader World AI provides educational and analytical tools only — nothing on this platform is financial advice, and we do not promise guaranteed profits, risk-free trading or certain investment outcomes. All market data on this homepage is simulated.",
};
