/*
 * WEBSITE CONTENT CONTROL FILE
 * ============================
 * Most recruiter-facing copy lives here so future edits do not require hunting
 * across components. Every block below explains what it controls.
 *
 * EDITING RULE: keep claims inside the verified evidence boundary. Portfolio
 * counts (10 systems, 15 AI use cases, 25 buyer questions, 20 vendor-risk
 * questions) are supported by the included workbooks. Do not add client results,
 * certification claims, years of employment, or percentage improvements unless
 * you later obtain evidence that supports them.
 */

// SITE IDENTITY: used in navigation, metadata, footer and contact surfaces.
export const siteConfig = {
  name: "Md. Abdullah Al Owasi",
  shortName: "AAO",
  // ROLE is a portfolio identity, not an employer-issued job title.
  role: "Technology Risk & AI Governance · GRC · TPRM · Security Compliance",
  descriptor: "Evidence Architecture · Control Assurance · AI Risk Operations",
  location: "Kuala Lumpur, Malaysia",
  email: "abdullahalowasi369@gmail.com",
  // AVAILABILITY: broad enough for recruiting without claiming jurisdiction-specific work authorization.
  availability: "Open to Technology Risk, GRC, TPRM, Security Compliance and AI Governance opportunities",
  intro:
    "Technology Risk and AI Governance portfolio focused on evidence lineage, third-party risk, assurance operations, AI risk controls and decision-ready governance systems.",
  canonicalUrl: "https://personal-portfolio-website-e13.pages.dev",
  social: {
    linkedin: "https://www.linkedin.com/in/md-abdullah-al-owasi/",
    github: "https://github.com/abdullahalowasi369-dev",
    x: "https://x.com/aaowasi369",
    whatsapp: "https://wa.me/601163994321",
    instagram: "https://www.instagram.com/_aaowasi_",
    facebook: "https://www.facebook.com/abdullah.prannoy.7",
  },
} as const;

// HERO ROTATION: short domains shown in the animated top-of-page signal.
export const heroWords = [
  "technology risk",
  "control assurance",
  "AI governance",
  "third-party risk",
] as const;

// VERIFIED PORTFOLIO COUNTS: safe to use because the included workbooks contain the underlying rows.
export const heroMetrics = [
  { value: "10", label: "governance systems designed from requirement to decision" },
  { value: "15", label: "AI use cases mapped across risk, oversight and transparency" },
  { value: "25", label: "buyer-diligence questions connected to evidence paths" },
  { value: "20", label: "vendor-risk questions structured for criticality and evidence" },
] as const;

// COMPACT NAV SIGNALS: deliberately short for scanning, not keyword stuffing.
export const navTrustMetrics = ["10 systems", "NIST · ISO · SOC 2", "AI governance"] as const;

// EXECUTIVE VALUE: business relevance without fabricated outcome percentages.
export const executiveValue = [
  {
    title: "Customer assurance that can be defended",
    label: "Trust operations",
    copy: "Structure security and compliance responses around approved evidence, accountable owners, review cadence and explicit exceptions so recurring diligence is consistent and inspectable.",
  },
  {
    title: "Control assurance with an operating cadence",
    label: "GRC operations",
    copy: "Connect control intent to evidence, testing, exceptions, remediation and retesting so assurance work can operate continuously instead of becoming a one-time audit exercise.",
  },
  {
    title: "AI governance tied to real decisions",
    label: "AI risk",
    copy: "Translate AI inventories into risk classification, ownership, human oversight, evaluation, monitoring and transparency decisions using NIST AI RMF, ISO/IEC 42001 and EU AI Act concepts.",
  },
  {
    title: "Third-party risk proportionate to exposure",
    label: "TPRM",
    copy: "Prioritize vendor scrutiny by criticality, data exposure, assurance evidence, processor obligations and residual risk rather than treating every questionnaire as equally material.",
  },
] as const;

// SIGNATURE OPERATING MODEL: use consistently across website, resume, portfolio and interviews.
export const decisionChain = [
  "Requirement",
  "Control",
  "Evidence",
  "Exception",
  "Residual risk",
  "Decision",
] as const;

export type FlagshipModule = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
  columns: string[];
  rows: string[][];
  controls: string[];
};

// FLAGSHIP ARCHITECTURE: three deep systems shown before the broader project catalogue.
export const flagshipModules: FlagshipModule[] = [
  {
    id: "evidence",
    label: "Enterprise Assurance",
    eyebrow: "Layer 01 · Control & evidence architecture",
    title: "Enterprise Assurance Evidence Fabric",
    summary:
      "A control-to-evidence architecture that decomposes broad trust claims into accountable owners, reviewable evidence, framework references, exceptions and remediation decisions.",
    metrics: [
      { label: "Evidence domains", value: "15" },
      { label: "Primary lenses", value: "SOC 2 + ISO" },
      { label: "Operating model", value: "Traceable" },
    ],
    columns: ["Domain", "Decision question", "Evidence path", "Priority"],
    rows: [
      ["Access", "Can privileged access be defended?", "RBAC · MFA · access review", "High"],
      ["Encryption", "Is customer data protected in transit and at rest?", "TLS · storage · KMS evidence", "High"],
      ["Incident", "Can escalation and notification be evidenced?", "IR plan · exercise · notice flow", "High"],
      ["Assurance", "What independent or internal evidence supports the claim?", "SOC scope · ISO evidence · control record", "High"],
    ],
    controls: ["Evidence owner", "Review cadence", "Framework crosswalk", "Exception state", "Remediation owner"],
  },
  {
    id: "tprm",
    label: "Third-Party Risk",
    eyebrow: "Layer 02 · Vendor risk decisioning",
    title: "Third-Party Risk Decision Engine",
    summary:
      "A vendor-governance model that turns criticality, public assurance evidence, processor obligations and AI-provider risk into approve, remediate, accept or reject decisions.",
    metrics: [
      { label: "Vendors modeled", value: "10" },
      { label: "Risk questions", value: "20" },
      { label: "Decision states", value: "4" },
    ],
    columns: ["Vendor", "Criticality", "Primary risk", "Residual"],
    rows: [
      ["OpenAI", "Tier 1", "Retention / model data-use configuration", "Medium"],
      ["AWS Bedrock", "Tier 1", "IAM / KMS / region design", "Low-Med"],
      ["Slack", "Tier 1", "Sensitive collaboration data / apps", "Medium"],
      ["GitHub", "Tier 1", "Source code / secrets / AI tooling", "Medium"],
    ],
    controls: ["Subprocessor chain", "DPA evidence", "Data region", "Retention", "AI data-use terms"],
  },
  {
    id: "ai",
    label: "AI Governance",
    eyebrow: "Layer 03 · AI risk operations",
    title: "AI Governance Decision Register",
    summary:
      "An enterprise AI inventory model connecting business purpose, stakeholders, oversight, NIST AI RMF functions, risk treatment, monitoring and EU AI Act transparency decisions.",
    metrics: [
      { label: "AI use cases", value: "15" },
      { label: "Transparency cases", value: "15" },
      { label: "RMF functions", value: "4" },
    ],
    columns: ["Use case", "Human oversight", "Risk", "Decision"],
    rows: [
      ["Support chatbot", "Escalation required", "Disclosure / quality", "Implement"],
      ["Voice agent", "Material-issue escalation", "Interaction transparency", "Implement"],
      ["Code assistant", "Developer + CI review", "Secret / vulnerability", "Control"],
      ["Risk summarizer", "CISO / GRC approval", "Risk misstatement", "Control"],
    ],
    controls: ["Govern", "Map", "Measure", "Manage", "Article 50 applicability"],
  },
];

export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  category: "GRC & Compliance" | "AI Governance" | "TPRM & Risk";
  eyebrow: string;
  outcome: string;
  detail: string;
  frameworks: string[];
  metrics: { label: string; value: string }[];
  artifact?: string;
  artifactLabel?: string;
  source?: string;
  featured?: boolean;
};

// PROJECT CATALOGUE: ten evidence-backed systems. Keep counts synchronized with workbooks.
export const projects: Project[] = [
  {
    id: "trust",
    title: "Enterprise Trust & Customer Assurance Architecture",
    shortTitle: "Assurance Architecture",
    category: "GRC & Compliance",
    eyebrow: "Revenue-sensitive assurance",
    outcome: "Architects a governed path from buyer question to evidence, owner, exception and remediation decision.",
    detail:
      "A 15-domain assurance architecture spanning security governance, identity, encryption, incident response, privacy roles, subprocessors, retention, AI data use and customer diligence. The model is designed to make trust claims traceable to evidence and accountable ownership rather than relying on narrative answers alone.",
    frameworks: ["SOC 2 TSC", "ISO/IEC 27001:2022", "GDPR Art. 28", "NIST AI RMF"],
    metrics: [
      { label: "Evidence domains", value: "15" },
      { label: "Buyer questions", value: "25" },
      { label: "Decision path", value: "Traceable" },
    ],
    artifact: "/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx",
    artifactLabel: "Open executive governance portfolio",
    featured: true,
  },
  {
    id: "ai-governance",
    title: "AI Governance Operating Architecture",
    shortTitle: "AI Governance OS",
    category: "AI Governance",
    eyebrow: "AI risk operations",
    outcome: "Turns AI principles into an accountable inventory, risk model, oversight structure, evaluation plan and monitoring workflow.",
    detail:
      "A 15-use-case enterprise AI register with business purpose, data classes, stakeholders, human oversight, NIST AI RMF function mapping, inherent risk, controls, residual risk, owner and monitoring logic.",
    frameworks: ["NIST AI RMF 1.0", "NIST GenAI Profile", "ISO/IEC 42001:2023"],
    metrics: [
      { label: "AI use cases", value: "15" },
      { label: "RMF functions", value: "4" },
      { label: "Ownership", value: "Mapped" },
    ],
    artifact: "/artifacts/Governance_Evidence_Workbook.xlsx",
    artifactLabel: "Download evidence workbook",
    featured: true,
  },
  {
    id: "tprm",
    title: "Third-Party Risk & AI Provider Decision System",
    shortTitle: "TPRM Decisioning",
    category: "TPRM & Risk",
    eyebrow: "Vendor assurance",
    outcome: "Creates an evidence-led approve / remediate / accept / reject decision trail for critical vendors and AI providers.",
    detail:
      "A public-evidence vendor model covering OpenAI, Anthropic, AWS Bedrock, Gemini Enterprise, Slack, GitHub, Stripe, Cloudflare, Sentry and Datadog, supported by a 20-question vendor-risk assessment structure.",
    frameworks: ["GDPR Art. 28", "SOC 2", "ISO/IEC 27001", "NIST AI RMF"],
    metrics: [
      { label: "Vendors", value: "10" },
      { label: "Risk questions", value: "20" },
      { label: "Decision states", value: "4" },
    ],
    featured: true,
  },
  {
    id: "controls",
    title: "SOC 2 + ISO 27001 Control-to-Evidence Architecture",
    shortTitle: "Control Evidence",
    category: "GRC & Compliance",
    eyebrow: "Audit operations",
    outcome: "Connects control intent to evidence, cadence, ownership, test logic, exceptions and retesting.",
    detail:
      "A unified 15-domain control inventory spanning governance, risk, assets, identity, privileged access, encryption, logging, vulnerability management, SDLC, incidents, continuity, vendor risk, privacy, AI governance and customer assurance.",
    frameworks: ["AICPA Trust Services Criteria", "ISO/IEC 27001:2022"],
    metrics: [
      { label: "Domains", value: "15" },
      { label: "Audit tests", value: "15" },
      { label: "Evidence model", value: "Owned" },
    ],
  },
  {
    id: "executive-risk",
    title: "Executive Technology Risk & KRI Decision System",
    shortTitle: "Executive Risk",
    category: "TPRM & Risk",
    eyebrow: "Risk communication",
    outcome: "Translates control and compliance activity into accountable residual-risk decisions, treatment plans and KRIs.",
    detail:
      "A 15-risk executive register covering availability, privileged access, shadow AI, third parties, Article 50, questionnaire accuracy, vulnerabilities, privacy deletion, AI reliability, logging, audit evidence and AI change governance.",
    frameworks: ["ISO 27001 risk treatment", "NIST AI RMF", "Enterprise GRC"],
    metrics: [
      { label: "Risks", value: "15" },
      { label: "KRIs", value: "15" },
      { label: "Treatment", value: "Decision-based" },
    ],
  },
  {
    id: "article50",
    title: "AI Transparency & Article 50 Decision System",
    shortTitle: "Article 50",
    category: "AI Governance",
    eyebrow: "EU AI transparency",
    outcome: "Maps interactive and synthetic AI use cases to provider/deployer transparency, provenance, marking and disclosure decisions.",
    detail:
      "A 15-use-case transparency register covering chatbots, voice agents, synthetic images/video/audio, public-interest text, recruiting AI, emotion recognition, biometric categorization and AI translation/dubbing.",
    frameworks: ["EU AI Act Article 50", "NIST AI RMF", "ISO/IEC 42001"],
    metrics: [
      { label: "Use cases", value: "15" },
      { label: "Applicable since", value: "2 Aug 2026" },
      { label: "Decision model", value: "Provider / deployer" },
    ],
    source: "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems",
  },
  {
    id: "shadow-ai",
    title: "Shadow AI & Prompt DLP Governance Standard",
    shortTitle: "Shadow AI DLP",
    category: "AI Governance",
    eyebrow: "Data protection",
    outcome: "Defines preventive and detective controls for sensitive-data exposure through unsanctioned or poorly governed AI use.",
    detail:
      "A 12-control governance standard covering approved AI channels, prompt data classification, secret detection, code assistants, personal data, material decisions, meeting bots, local redaction and provider reviews.",
    frameworks: ["NIST GenAI Profile", "ISO/IEC 27001", "ISO/IEC 42001"],
    metrics: [
      { label: "Controls", value: "12" },
      { label: "Critical controls", value: "3" },
      { label: "Control pattern", value: "DLP + CASB" },
    ],
  },
  {
    id: "procurement",
    title: "Enterprise Procurement & Security Questionnaire System",
    shortTitle: "Security Triage",
    category: "GRC & Compliance",
    eyebrow: "Customer trust operations",
    outcome: "Standardizes high-friction security answers around governed evidence, ownership and review dates.",
    detail:
      "A 25-question knowledge base covering governance, SOC 2, ISO 27001, encryption, access, vulnerabilities, incidents, continuity, subprocessors, AI training, retention, residency, TPRM, SDLC and Article 50.",
    frameworks: ["SOC 2", "ISO 27001", "GDPR", "NIST AI RMF"],
    metrics: [
      { label: "Canonical answers", value: "25" },
      { label: "Evidence links", value: "Built in" },
      { label: "Review ownership", value: "Defined" },
    ],
  },
  {
    id: "article28",
    title: "GDPR Article 28 Processor Governance System",
    shortTitle: "Article 28",
    category: "TPRM & Risk",
    eyebrow: "Processor governance",
    outcome: "Converts processor and subprocessor obligations into operational controls, evidence requests and accountable decisions.",
    detail:
      "A 12-clause operational control set for processing instructions, confidentiality, security, subprocessors, flow-down obligations, data-subject support, breach assistance, DPIAs, deletion, audit rights and transfers.",
    frameworks: ["GDPR Article 28", "ISO 27001 supplier/privacy controls"],
    metrics: [
      { label: "Clauses", value: "12" },
      { label: "Owners", value: "Mapped" },
      { label: "Evidence", value: "Defined" },
    ],
  },
  {
    id: "audit-ops",
    title: "Continuous Assurance & Audit Operations System",
    shortTitle: "Audit Operations",
    category: "GRC & Compliance",
    eyebrow: "Continuous assurance",
    outcome: "Structures evidence cadence, request ownership, exception tracking, remediation and retesting for repeatable assurance operations.",
    detail:
      "An audit-operations tracker with SOC 2, ISO 27001, GDPR and AI-governance requests, due dates, owners, reviewer states, exceptions, remediation dates and final conclusions.",
    frameworks: ["SOC 2", "ISO/IEC 27001", "Continuous GRC"],
    metrics: [
      { label: "Audit requests", value: "15" },
      { label: "Exception states", value: "Tracked" },
      { label: "Evidence cadence", value: "Recurring" },
    ],
    artifact: "/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx",
    artifactLabel: "Open governance portfolio",
  },
];

export const skillCategories = ["All", "GRC & Compliance", "AI Governance", "TPRM & Risk", "Automation & Technical Systems"] as const;
export type SkillCategory = (typeof skillCategories)[number];

export type Skill = {
  name: string;
  category: Exclude<SkillCategory, "All">;
  context: string;
  evidence: string;
};

// CAPABILITY MAP: each skill includes a concrete evidence reference so it is defensible in interviews.
export const skills: Skill[] = [
  { name: "Technology GRC", category: "GRC & Compliance", context: "Risk, controls, evidence, ownership, exceptions, remediation and assurance workflows.", evidence: "10-system operating portfolio" },
  { name: "SOC 2", category: "GRC & Compliance", context: "Trust Services Criteria translated into control, evidence, testing and assurance structures.", evidence: "15-domain control inventory" },
  { name: "ISO/IEC 27001", category: "GRC & Compliance", context: "ISMS control architecture, risk treatment, ownership and evidence mapping.", evidence: "Control-to-evidence architecture" },
  { name: "Security Questionnaires", category: "GRC & Compliance", context: "Governed buyer answers with evidence paths, accountable owners and review cadence.", evidence: "25-question assurance knowledge base" },
  { name: "Control Testing", category: "GRC & Compliance", context: "Population/sample logic, expected results, exceptions, remediation and retesting.", evidence: "Audit-operations system" },
  { name: "NIST AI RMF", category: "AI Governance", context: "Govern, Map, Measure and Manage applied to enterprise AI inventory and risk decisions.", evidence: "15-use-case AI governance register" },
  { name: "EU AI Act Article 50", category: "AI Governance", context: "Provider/deployer transparency analysis for interactive and synthetic AI use cases.", evidence: "15-use-case transparency register" },
  { name: "ISO/IEC 42001", category: "AI Governance", context: "AI management-system concepts integrated with accountability, risk and evidence workflows.", evidence: "AI governance operating architecture" },
  { name: "AI Risk Registers", category: "AI Governance", context: "Purpose, data, stakeholder, oversight, evaluation, monitoring and residual-risk mapping.", evidence: "AI governance decision register" },
  { name: "Shadow AI Governance", category: "AI Governance", context: "Approved channels, prompt classification, secret detection, redaction and unsanctioned-use controls.", evidence: "12-control governance standard" },
  { name: "Third-Party Risk", category: "TPRM & Risk", context: "Criticality tiering, evidence review, contractual risk, findings and treatment decisions.", evidence: "10-vendor TPRM register" },
  { name: "GDPR Article 28", category: "TPRM & Risk", context: "Processor instructions, subprocessors, assistance, deletion, audit rights and evidence requirements.", evidence: "12-clause processor control set" },
  { name: "Vendor Risk Assessments", category: "TPRM & Risk", context: "Evidence requests spanning assurance, IAM, cryptography, privacy, resilience and AI providers.", evidence: "20-question vendor-risk assessment" },
  { name: "Executive Risk", category: "TPRM & Risk", context: "Likelihood, impact, residual risk, appetite, treatment, KRI and escalation logic.", evidence: "15-risk executive register" },
  { name: "Python", category: "Automation & Technical Systems", context: "Data transformation and repeatable artifact-generation workflows for governance and evidence operations.", evidence: "GRC evidence workbooks" },
  { name: "TypeScript / React", category: "Automation & Technical Systems", context: "Typed interfaces for decision systems, interactive evidence views and portfolio tooling.", evidence: "This portfolio" },
  { name: "Next.js App Router", category: "Automation & Technical Systems", context: "Static-first web architecture, metadata, accessibility and deployment discipline.", evidence: "This portfolio" },
  { name: "Git / GitHub", category: "Automation & Technical Systems", context: "Version control, change traceability, repository documentation and delivery workflow.", evidence: "Portfolio repository" },
  { name: "Data Modeling / SQL", category: "Automation & Technical Systems", context: "Structured thinking for evidence inventories, risk registers, ownership and relational decision data.", evidence: "Computer Science systems foundation + GRC systems" },
  { name: "Systems Thinking", category: "Automation & Technical Systems", context: "Technical foundation for decomposing governance problems into inputs, states, dependencies and decision logic.", evidence: "Computer Science systems foundation + operating portfolio" },
];

export const timeline = [
  {
    year: "Operating principle",
    title: "Evidence must survive challenge.",
    copy: "I design governance work so every important claim can be traced to a requirement, control, evidence path, accountable owner, exception state and decision. The objective is not documentation volume; it is decision quality under scrutiny.",
    tags: ["Evidence architecture", "Control assurance", "Decision quality"],
  },
  {
    year: "Enterprise assurance",
    title: "Trust becomes valuable when it is operational.",
    copy: "Customer diligence, audits and executive risk reporting should draw from the same governed evidence system. That reduces contradiction, clarifies ownership and creates a cleaner path from security claim to business decision.",
    tags: ["SOC 2", "ISO 27001", "Customer trust"],
  },
  {
    year: "AI governance",
    title: "AI risk needs operating mechanics, not principles alone.",
    copy: "My AI governance work connects inventory, purpose, data, stakeholders, human oversight, evaluation, monitoring, transparency and residual risk so governance produces decisions rather than policy theatre.",
    tags: ["NIST AI RMF", "EU AI Act", "ISO 42001"],
  },
  {
    year: "Technical foundation",
    title: "Computer Science · SEGi University",
    copy: "Currently studying Bachelor of Computer Science (Hons), specializing in AI & Cybersecurity at SEGi University. The technical foundation strengthens the systems side of governance work: software engineering, data structures, databases, automation and disciplined decomposition of complex technical problems.",
    tags: ["Computer Science", "Systems thinking", "Automation"],
  },
];

export const frameworkLinks = [
  { label: "NIST AI RMF", href: "https://www.nist.gov/itl/ai-risk-management-framework", note: "AI risk lifecycle" },
  { label: "NIST GenAI Profile", href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence", note: "GenAI risk actions" },
  { label: "ISO/IEC 27001:2022", href: "https://www.iso.org/standard/27001", note: "ISMS requirements" },
  { label: "ISO/IEC 42001:2023", href: "https://www.iso.org/standard/42001", note: "AI management systems" },
  { label: "EU AI Act Article 50", href: "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems", note: "Transparency duties" },
  { label: "AICPA Trust Services Criteria", href: "https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022", note: "SOC 2 criteria" },
] as const;


/*
 * VISUALIZATION DATA
 * ------------------
 * These values are derived from the included governance workbook. They are
 * portfolio-scope data, not production/client performance metrics.
 */
export const aiRiskHeatmapUseCases = [
  { id: "AI-03", name: "Customer chatbot", riskScore: 12, oversight: 3, oversightLabel: "Escalation for material issues", residualRisk: "Medium", rmf: "MAP / MEASURE", transparency: "AI interaction disclosure" },
  { id: "AI-05", name: "Security questionnaire assistant", riskScore: 15, oversight: 5, oversightLabel: "GRC approval", residualRisk: "Medium", rmf: "GOVERN / MEASURE", transparency: "Evidence-backed claims" },
  { id: "AI-06", name: "Contract review assistant", riskScore: 15, oversight: 5, oversightLabel: "Legal review", residualRisk: "Medium", rmf: "MAP / MEASURE", transparency: "Context-dependent" },
  { id: "AI-08", name: "Code assistant", riskScore: 15, oversight: 4, oversightLabel: "Developer review + CI tests", residualRisk: "Medium", rmf: "MAP / MEASURE", transparency: "Internal-use controls" },
  { id: "AI-10", name: "Marketing image generator", riskScore: 12, oversight: 3, oversightLabel: "Marketing review", residualRisk: "Medium", rmf: "MAP / MEASURE", transparency: "Marking / disclosure where applicable" },
  { id: "AI-13", name: "Fraud alert prioritizer", riskScore: 15, oversight: 5, oversightLabel: "Analyst decision", residualRisk: "Medium", rmf: "MEASURE / MANAGE", transparency: "Decision-support governance" },
  { id: "AI-15", name: "Executive risk summarizer", riskScore: 10, oversight: 5, oversightLabel: "CISO / GRC approval", residualRisk: "Low", rmf: "GOVERN / MEASURE", transparency: "Source-locked narrative" },
] as const;

export const assuranceTelemetry = [
  { label: "Control / evidence domains", current: 15, total: 15, state: "Mapped" },
  { label: "AI governance use cases", current: 15, total: 15, state: "Mapped" },
  { label: "Buyer diligence paths", current: 25, total: 25, state: "Traceable" },
  { label: "Vendor-risk questions", current: 20, total: 20, state: "Structured" },
] as const;

export const governanceLineage = [
  { key: "Requirement", label: "Requirement", detail: "Material obligation, risk expectation or business need." },
  { key: "Control", label: "Control", detail: "Behavior, configuration or process intended to manage the requirement." },
  { key: "Evidence", label: "Evidence", detail: "Inspectable proof that the control exists and operates as expected." },
  { key: "Exception", label: "Exception", detail: "Gap, uncertainty, failed test or dependency that changes the control state." },
  { key: "Residual Risk", label: "Residual risk", detail: "Exposure remaining after current controls and exceptions are considered." },
  { key: "Decision", label: "Decision", detail: "Approve, remediate, accept, escalate or reject with accountable ownership." },
] as const;

export const portfolioDomainMix = [
  { label: "Assurance / GRC", value: 4 },
  { label: "AI governance", value: 3 },
  { label: "TPRM / risk", value: 3 },
] as const;

export const executiveRiskModel = {
  sampleRisks: 15,
  inherentTotal: 208,
  residualTotal: 127,
  open: 8,
  monitor: 7,
  note: "Modeled portfolio risk register; not a realized enterprise outcome.",
} as const;
