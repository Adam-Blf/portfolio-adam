// Portfolio Data - Adam Beloucif v2026

// Logo mappings for organizations
export const logoMap: Record<string, string> = {
  // Entreprises
  "Groupe Hospitalier Fondation Vallee - Paul Guiraud": "/logos/groupe_hospitalier_paul_guiraud_logo.jpg",
  "GHT Psy Sud": "/logos/groupe_hospitalier_paul_guiraud_logo.jpg",
  "EPSM Lille-Metropole - GHT Psy NPdC": "/logos/epsm_lille_logo.jpg",
  "BNP Paribas": "/logos/bnp_paribas_logo.jpg",
  "Marine Nationale": "/logos/marine_nationale_logo.jpg",
  "DE NOUVEL ARCHITECT POUR COMMUNICATION": "/logos/architecture_logo.svg",
  "BONE iT": "/logos/boneit_logo.jpg",
  "McDonald's": "/logos/mcdonalds_corporation_logo.jpg",

  // Ecoles
  "EFREI Paris": "/logos/efrei_logo.jpg",
  "EFREI Paris x ISIT (Double diplome)": "/logos/efrei_logo.jpg",
  "ISIT Paris": "/logos/isit_paris_logo.jpg",
  "Universidad de Malaga": "/logos/universidad_de_malaga_logo.jpg",

  // Partenaires
  "Inetum": "/logos/inetum_logo.svg",

  // Certifications issuers
  "Microsoft": "/logos/microsoft_logo.jpg",
  "LinkedIn": "/logos/linkedin_logo.jpg",
  "HubSpot Academy": "/logos/hubspot_academy_logo.jpg",
  "Pix": "/logos/gip_pix_logo.jpg",
  "EFREI": "/logos/efrei_logo.jpg",

  // Associations
  "BDE Efrei": "/logos/bdeefrei_logo.jpg",
  "BDE ISIT": "/logos/bde_isit_logo.jpg",
  "Efrei Rugby": "/logos/efrei_rugby_logo.jpg",
  "Efrei Poker": "/logos/efrei_poker_logo.jpg",
  "Efreestyle": "/logos/efreestyle_logo.jpg",
  "Bureau Des Arts Efrei": "/logos/bda_efrei_logo.jpg",
  "Bureau Des Sports EFREI": "/logos/bureau_des_sports_efrei_paris_logo.jpg",
  "Prom'Efrei": "/logos/promefrei_logo.svg",
}

// Shields.io badges configuration for skills
export const skillBadges: Record<string, { logo: string; color: string; logoColor?: string }> = {
  // Languages
  "Python": { logo: "python", color: "3776AB" },
  "TypeScript": { logo: "typescript", color: "3178C6" },
  "JavaScript": { logo: "javascript", color: "F7DF1E", logoColor: "black" },
  "SQL/PL-SQL": { logo: "oracle", color: "F80000" },
  "PHP": { logo: "php", color: "777BB4" },
  "C#": { logo: "csharp", color: "512BD4" },

  // Frameworks
  "React/Next.js": { logo: "react", color: "61DAFB", logoColor: "black" },
  "Node.js/Express": { logo: "nodedotjs", color: "339933" },
  "Streamlit": { logo: "streamlit", color: "FF4B4B" },
  "Pandas/NumPy": { logo: "pandas", color: "150458" },
  ".NET": { logo: "dotnet", color: "512BD4" },
  "Tailwind CSS": { logo: "tailwindcss", color: "06B6D4" },

  // Data
  "Oracle": { logo: "oracle", color: "F80000" },
  "PostgreSQL": { logo: "postgresql", color: "4169E1" },
  "MongoDB": { logo: "mongodb", color: "47A248" },
  "ETL/ELT": { logo: "apacheairflow", color: "017CEE" },
  "Business Objects": { logo: "sap", color: "0FAAFF" },

  // Cloud
  "AWS": { logo: "amazonwebservices", color: "232F3E" },
  "Azure": { logo: "microsoftazure", color: "0078D4" },
  "GCP": { logo: "googlecloud", color: "4285F4" },
  "Docker": { logo: "docker", color: "2496ED" },
  "CI/CD": { logo: "githubactions", color: "2088FF" },

  // AI
  "Scikit-learn": { logo: "scikitlearn", color: "F7931E" },
  "NLP/Transformers": { logo: "huggingface", color: "FFD21E", logoColor: "black" },
  "TensorFlow": { logo: "tensorflow", color: "FF6F00" },
  "OpenAI/LLMs": { logo: "openai", color: "412991" },
}

export const personalInfo = {
  name: "Adam Beloucif",
  title: "Data Engineer & Fullstack Developer",
  slogan: "From Data to Decisions. From Code to Impact.",
  subtitle: "M1 Data Engineering & IA @ EFREI Paris | Ingenieur Data @ GHT Psy Sud | President BDE EFREI",
  email: "adam.beloucif@efrei.net",
  location: "Paris, France",
  birthday: "20 juin 2004",
  linkedin: "https://www.linkedin.com/in/adambeloucif/",
  github: "https://github.com/Adam-Blf",
  languages: ["Francais (Natif)", "Anglais (Professionnel)", "Espagnol (Professionnel)"],
  highlights: [
    "Architecture Data & Pipelines ETL/ELT",
    "Machine Learning & NLP",
    "Fullstack React/Node/Python",
    "Leadership & Gestion de projet",
  ],
  currentRole: {
    title: "Ingenieur PMSI / Data Engineer",
    company: "GHT Psy Sud",
    type: "Alternance M1",
  },
  bio: `Passionne par la data et l'innovation, je construis des systemes intelligents qui transforment les donnees en decisions strategiques. Mon parcours unique combine expertise technique (Data Engineering, IA, Fullstack) et competences humaines (President BDE 5700+ etudiants, PMM Marine Nationale). Actuellement en M1 Data Engineering & IA a l'EFREI Paris, je developpe des solutions data pour le secteur hospitalier.`,
}

// Stats are now dynamically fetched from GitHub API
// These are fallback values if API is unavailable
export const stats = [
  { label: "Projets GitHub", value: "35+", icon: "code" },
  { label: "Commits", value: "500+", icon: "git-commit" },
  { label: "Années d'expérience", value: "3+", icon: "briefcase" },
  { label: "Technologies", value: "30+", icon: "layers" },
]

export const staticMetrics = {
  yearsExperience: 3,
  certifications: 8,
  volunteerRoles: 6,
  languages: ["Français (Natif)", "Anglais (Professionnel)", "Espagnol (Professionnel)"],
}

export const keyAchievements = [
  {
    title: "President BDE EFREI",
    description: "Leadership de 5700+ etudiants, gestion budget 100k€+, organisation evenements majeurs",
    icon: "users",
    year: "2024",
  },
  {
    title: "Double Diplome International",
    description: "Bachelor EFREI-ISIT + Erasmus Universidad de Malaga (Espagne)",
    icon: "globe",
    year: "2022-2025",
  },
  {
    title: "Marine Nationale - PMM Kieffer",
    description: "Formation militaire complete - Mention Assez Bien - Permis bateau & PSC1",
    icon: "anchor",
    year: "2020-2021",
  },
  {
    title: "Data Engineer Healthcare",
    description: "Pipelines ETL, modeles ML predictifs, tableaux de bord BI pour hopitaux",
    icon: "database",
    year: "2024-Present",
  },
]



export const experiences = [
  {
    id: 1,
    title: "Ingenieur PMSI / Data Engineer",
    company: "Groupe Hospitalier Fondation Vallee - Paul Guiraud",
    location: "Villejuif, Ile-de-France",
    type: "Alternance",
    period: "Sept 2025 - Present",
    startDate: "2025-09",
    endDate: null,
    current: true,
    description: "Pole Analyse & Pilotage (BI/PMSI) et Pole Data Engineering & Infocentre",
    missions: [
      "Analyse de donnees: Exploitation des donnees du SIH et DPI (DxCare, CPage) pour le suivi strategique et medico-economique",
      "Reporting decisionnel: Conception et maintenance de tableaux de bord interactifs (Business Objects, PMSI-Pilot)",
      "Architecture de donnees: Modelisation base Oracle de l'infocentre, optimisation et performance",
      "Developpement Backend: Creation API PHP pour interoperabilite et acces securise aux donnees",
      "Pipelines de donnees: Mise en place flux ETL/ELT (SQL/PL-SQL), industrialisation Docker et CI/CD",
      "Data Science & Qualite: Modeles predictifs ML pour anticiper admissions, monitoring qualite RGPD",
    ],
    tech: ["PHP", "Oracle", "SQL/PL-SQL", "Python", "Docker", "Git", "Business Objects", "DxCare", "CPage"],
  },
  {
    id: 2,
    title: "Charge de Communication Digitale",
    company: "EPSM Lille-Metropole - GHT Psy NPdC",
    location: "Armentieres, France",
    type: "Alternance",
    period: "Dec 2024 - Sept 2025",
    startDate: "2024-12",
    endDate: "2025-09",
    current: false,
    description: "Refonte et optimisation de l'ecosysteme digital du GHT Psy NPdC specialise en sante mentale",
    missions: [
      "Analyse fonctionnelle et specifications techniques des projets digitaux",
      "Gestion des donnees et reporting: creation KPI et tableaux de bord pour suivi des performances",
      "Methodologie projet rigoureuse: documentation complete, suivi regulier, iterations",
    ],
    tech: ["Strategie Digitale", "Data Visualization", "Python", "Streamlit", "KPI"],
  },
  {
    id: 3,
    title: "Stagiaire Communication",
    company: "DE NOUVEL ARCHITECT POUR COMMUNICATION",
    location: "Paris, France",
    type: "Stage",
    period: "Mai 2024 - Juil 2024",
    startDate: "2024-05",
    endDate: "2024-07",
    current: false,
    description: "Communication visuelle et digitale pour agence d'architecture specialisee",
    missions: [
      "Creation contenu engageant et storytelling pour projets architecturaux sur reseaux sociaux",
      "Developpement strategie communication digitale avec visuels impactants",
      "Gestion ecosysteme communication avec approche creative pour accroitre visibilite",
    ],
    tech: ["Design", "Social Media", "Storytelling", "Architecture"],
  },
  {
    id: 4,
    title: "Agent d'entretien",
    company: "Groupe Hospitalier Paul Guiraud",
    location: "Villejuif, Ile-de-France",
    type: "Job etudiant",
    period: "Aout 2023",
    startDate: "2023-08",
    endDate: "2023-08",
    current: false,
    description: "Entretien des locaux hospitaliers",
    missions: [
      "Entretien et nettoyage des espaces communs, bureaux et chambres patients",
      "Desinfection des surfaces selon protocoles sanitaires stricts",
      "Gestion des dechets et collaboration avec equipes soignantes",
    ],
    tech: ["Hygiene", "Protocoles sanitaires", "Travail d'equipe"],
  },
  {
    id: 5,
    title: "Assistant Scrum Master",
    company: "BNP Paribas",
    location: "Montreuil, France",
    type: "Stage",
    period: "Mai 2023 - Juil 2023",
    startDate: "2023-05",
    endDate: "2023-07",
    current: false,
    description: "Support implementation methodologie Agile/Scrum en equipe projet bancaire",
    missions: [
      "Animation ceremonies Scrum: Daily Stand-ups, Sprint Planning, Sprint Review, Retrospectives",
      "Support au Scrum Master: preparation reunions, suivi actions post-reunion",
      "Gestion Product Backlog: creation/mise a jour User Stories, priorisation",
      "Suivi indicateurs de performance: Velocity, Burndown Chart, taux completion sprints",
      "Identification et escalade des blocages, collaboration equipes transverses",
    ],
    tech: ["Agile", "Scrum", "Jira", "Confluence"],
  },
  {
    id: 6,
    title: "Employe Polyvalent",
    company: "McDonald's",
    location: "Bagneux, Ile-de-France",
    type: "Job etudiant",
    period: "Dec 2022 - Fev 2023",
    startDate: "2022-12",
    endDate: "2023-02",
    current: false,
    description: "Service en restauration rapide",
    missions: [
      "Service a la clientele: accueil, prise de commandes, service rapide et courtois",
      "Preparation des produits alimentaires selon normes entreprise et hygiene",
      "Polyvalence: cuisine, caisse ou salle selon besoins, travail en equipe",
    ],
    tech: ["Service Client", "Travail d'equipe", "Gestion du stress"],
  },
  {
    id: 7,
    title: "Manutentionnaire",
    company: "BONE iT",
    location: "Villebon-sur-Yvette, Ile-de-France",
    type: "Job etudiant",
    period: "Aout 2022",
    startDate: "2022-08",
    endDate: "2022-08",
    current: false,
    description: "Logistique et gestion d'entrepot",
    missions: [
      "Reception et verification des marchandises",
      "Dechargement camions, stockage produits selon procedures",
      "Preparation commandes, gestion inventaires, maintenance entrepot",
    ],
    tech: ["Logistique", "Gestion stocks", "Travail d'equipe"],
  },
  {
    id: 8,
    title: "Manutentionnaire",
    company: "BONE iT",
    location: "Villebon-sur-Yvette, Ile-de-France",
    type: "Job etudiant",
    period: "Dec 2021",
    startDate: "2021-12",
    endDate: "2021-12",
    current: false,
    description: "Logistique et gestion d'entrepot",
    missions: [
      "Reception marchandises et verification conformite",
      "Stockage et preparation des commandes a expedier",
      "Collaboration equipe pour objectifs logistique",
    ],
    tech: ["Logistique", "Gestion stocks", "Travail d'equipe"],
  },
  {
    id: 9,
    title: "Preparation Militaire Marine (PMM) Kieffer",
    company: "Marine Nationale",
    location: "Villeneuve-Saint-Georges, Ile-de-France",
    type: "Formation",
    period: "Sept 2020 - Juil 2021",
    startDate: "2020-09",
    endDate: "2021-07",
    current: false,
    description: "Formation militaire sur 10 mois - Diplome obtenu Mention Assez Bien",
    missions: [
      "Apprentissage des bases de la Marine Nationale, tir, lutte incendie",
      "Participation aux ceremonies militaires",
      "Obtention Permis bateau cotier et PSC1 (Premiers Secours)",
    ],
    tech: ["Leadership", "Discipline", "Travail d'equipe", "Gestion du stress"],
  },
]

export const education = [
  {
    id: 1,
    degree: "Master Data Engineering & IA",
    school: "EFREI Paris",
    period: "2025 - 2027",
    startDate: "2025-09",
    endDate: null,
    level: "Bac+5, RNCP Niveau 7",
    rncp: "RNCP40875",
    current: true,
    description: "Formation en alternance avec Inetum. Architecture Data & Cloud (Data Lakes, Data Mesh, AWS/Azure/GCP, Spark, Databricks). Engineering & Pipelines (ETL/ELT, Airflow, Kafka, Flink). IA & ML (TensorFlow, PyTorch, MLOps, NLP). Certifications cloud visees : AWS Solutions Architect, Azure Data Engineer, GCP Professional.",
    highlights: [
      "Partenariat industriel Inetum",
      "Mentor Programme Student Success EFREI",
      "Hackathons & competitions ML",
      "Certifications AWS/Azure/GCP",
    ],
    skills: [
      "Data Lakes, Warehouses, Data Mesh",
      "Spark, Databricks, Kafka, Flink",
      "TensorFlow, PyTorch, MLOps",
      "Docker, Kubernetes, CI/CD",
    ],
    debouches: ["Data Engineer", "ML Engineer", "Data Architect", "Chief Data Officer", "Consultant Data & IA"],
  },
  {
    id: 2,
    degree: "Bachelor International Communication & Technology",
    school: "EFREI Paris",
    period: "2022 - 2025",
    startDate: "2022-09",
    endDate: "2025-06",
    level: "Bac+3, RNCP Niveau 6 (180 ECTS)",
    rncp: "RNCP35541",
    current: false,
    description: "Double diplome EFREI-ISIT. Digital Project Management (Agile, Scrum, Kanban). Communication & Marketing (SEO, SEA, SMO, CRM). UX/UI & Web Development. President BDE Efrei (5700+ etudiants), Resp. Partenariats Rugby, Resp. Design Poker, Prof Danse Efreestyle.",
    highlights: [
      "President BDE EFREI (Mar-Juin 2024)",
      "Resp. Communication BDE (5700+ etudiants)",
      "Resp. Partenariats Efrei Rugby",
      "Prof Danse Rock Efreestyle",
    ],
    skills: [
      "Gestion de projet Agile/Scrum",
      "Marketing Digital (SEO, SEA, SMO)",
      "UX/UI Design & Prototyping",
      "Front-end (HTML/CSS/JS)",
    ],
    debouches: ["Digital Project Manager", "Product Manager", "UX/UI Designer", "Traffic Manager"],
  },
  {
    id: 3,
    degree: "Bachelor Communication Digitale & International",
    school: "ISIT Paris",
    period: "2022 - 2025",
    startDate: "2022-09",
    endDate: "2025-06",
    level: "Bac+3, Double diplome",
    current: false,
    description: "Double diplome avec l'EFREI axe sur le management interculturel et la communication multilingue. Vice-President BDE ISIT (800+ etudiants, 1 an 10 mois). Membre Pole Event BDE ISIT. Competences en negociation internationale et communication cross-culturelle.",
    highlights: [
      "Vice-President BDE ISIT (Fev 24-Sept 25)",
      "Membre Pole Event BDE ISIT",
      "Management interculturel",
      "Communication multilingue",
    ],
    skills: [
      "Communication interculturelle",
      "Anglais & Espagnol professionnel",
      "Leadership associatif",
      "Cross-cultural management",
    ],
    debouches: [],
  },
  {
    id: 4,
    degree: "Erasmus - Communication & Media Studies",
    school: "Universidad de Malaga",
    period: "Sept 2023 - Fev 2024",
    startDate: "2023-09",
    endDate: "2024-02",
    level: "Semestre d'echange",
    current: false,
    description: "Semestre Erasmus en Espagne. Cours en espagnol : Production Audiovisual, Ingles instrumental I y III, Analisis del discurso, Communication Commercial. Immersion complete dans la culture espagnole et perfectionnement linguistique.",
    highlights: [
      "Production Audiovisuelle",
      "Analyse du discours",
      "Communication Commerciale",
      "Immersion culturelle totale",
    ],
    skills: [
      "Espagnol professionnel",
      "Production audiovisuelle",
      "Adaptabilite internationale",
      "Autonomie",
    ],
    debouches: [],
  },
  {
    id: 5,
    degree: "Preparation Militaire Marine (PMM) Kieffer",
    school: "Marine Nationale",
    period: "2020 - 2021",
    startDate: "2020-09",
    endDate: "2021-09",
    level: "Mention Assez Bien",
    current: false,
    description: "Formation militaire complete de 12 mois au sein de la Marine Nationale. Apprentissage des bases militaires, tir, lutte incendie, ceremonies officielles. Obtention du Permis bateau cotier et PSC1 (Premiers Secours Civiques niveau 1).",
    highlights: [
      "Permis bateau cotier",
      "PSC1 (Premiers Secours)",
      "Ceremonies militaires",
      "Tir & Lutte incendie",
    ],
    skills: [
      "Leadership",
      "Travail d'equipe",
      "Gestion du stress",
      "Rigueur & Discipline",
    ],
    debouches: [],
  },
]

export const certifications = [
  // 2025 - RNCP & IA
  { name: "Chef de projets digitaux (RNCP 35541)", issuer: "EFREI", year: "2025", date: "2025-07", level: "Niveau 6", rncp: "RNCP35541", url: "https://www.francecompetences.fr/recherche/rncp/35541/" },

  // LinkedIn Learning / Microsoft
  { name: "Inbound", issuer: "HubSpot Academy", year: "2024", date: "2024-03", expires: "2026-04" },
  { name: "Generative AI: The Evolution of Thoughtful Online Search", issuer: "LinkedIn", year: "2024", date: "2024-06" },
  { name: "Ameliorer sa prise de decision avec l'IA generative", issuer: "LinkedIn", year: "2024", date: "2024-06" },
  { name: "Streamlining Your Work with Microsoft Copilot", issuer: "LinkedIn", year: "2024", date: "2024-07" },
  { name: "Integrer l'IA generative dans son processus creatif", issuer: "LinkedIn", year: "2024", date: "2024-07" },

  // Autres
  { name: "Certificat Pix", issuer: "Pix", year: "2022", date: "2022-03", credentialId: "P-F8T2HB8H" },
  { name: "PSC1 - Premiers Secours Civiques niveau 1", issuer: "Marine Nationale", year: "2021", date: "2021-06" },
  { name: "Permis Bateau Cotier", issuer: "Marine Nationale", year: "2021", date: "2021-05" },
]

export const skills = {
  languages: [
    { name: "Python", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript", level: 85 },
    { name: "SQL/PL-SQL", level: 80 },
    { name: "PHP", level: 75 },
    { name: "C#", level: 70 },
  ],
  frameworks: [
    { name: "React/Next.js", level: 85 },
    { name: "Node.js/Express", level: 80 },
    { name: "Streamlit", level: 85 },
    { name: "Pandas/NumPy", level: 85 },
    { name: ".NET", level: 70 },
    { name: "Tailwind CSS", level: 90 },
  ],
  data: [
    { name: "Oracle", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 75 },
    { name: "ETL/ELT", level: 80 },
    { name: "Business Objects", level: 75 },
  ],
  cloud: [
    { name: "AWS", level: 70 },
    { name: "Azure", level: 70 },
    { name: "GCP", level: 65 },
    { name: "Docker", level: 80 },
    { name: "CI/CD", level: 75 },
  ],
  ai: [
    { name: "Scikit-learn", level: 80 },
    { name: "NLP/Transformers", level: 75 },
    { name: "TensorFlow", level: 65 },
    { name: "OpenAI/LLMs", level: 80 },
  ],
}

export const techBadges = {
  languages: [
    { name: "Python", color: "3776AB", logo: "python" },
    { name: "TypeScript", color: "007ACC", logo: "typescript" },
    { name: "JavaScript", color: "F7DF1E", logo: "javascript", logoColor: "black" },
    { name: "C%23", color: "239120", logo: "c-sharp" },
    { name: "PHP", color: "777BB4", logo: "php" },
    { name: "SQL", color: "4479A1", logo: "postgresql" },
  ],
  frameworks: [
    { name: "React", color: "20232A", logo: "react", logoColor: "61DAFB" },
    { name: "Next.js", color: "000000", logo: "next.js" },
    { name: "Node.js", color: "339933", logo: "node.js" },
    { name: "Streamlit", color: "FF4B4B", logo: "streamlit" },
    { name: "Tailwind_CSS", color: "38B2AC", logo: "tailwind-css" },
  ],
  data: [
    { name: "Pandas", color: "150458", logo: "pandas" },
    { name: "Oracle", color: "F80000", logo: "oracle" },
    { name: "MongoDB", color: "47A248", logo: "mongodb" },
    { name: "PostgreSQL", color: "316192", logo: "postgresql" },
  ],
  cloud: [
    { name: "AWS", color: "232F3E", logo: "amazon-aws" },
    { name: "Azure", color: "0078D4", logo: "microsoft-azure" },
    { name: "Docker", color: "2496ED", logo: "docker" },
    { name: "Git", color: "F05032", logo: "git" },
  ],
  ai: [
    { name: "Scikit--learn", color: "F7931E", logo: "scikit-learn" },
    { name: "OpenAI", color: "412991", logo: "openai" },
    { name: "HuggingFace", color: "FFD21E", logo: "huggingface", logoColor: "black" },
  ],
}

export const projects = {
  featured: ["Langue-des-signes", "Taskmate", "AISCA-Cocktails", "Echo", "folder-analyzer-web", "genius"],

  // Map of repo names to their live demo URLs
  homepages: {
    "Taskmate": "https://taskmatev2.vercel.app",
    "Echo": "https://echo-dating.vercel.app",
    "genius": "https://genius-pwa.vercel.app",
    "folder-analyzer-web": "https://adam-blf.github.io/folder-analyzer-web/",
    "Projet-IA-Generative-Doctis-AI-mo": "https://doctis-ai-mo.vercel.app",
    "black-out": "https://black-out-adam-blfs-projects.vercel.app",
    "Borderland": "https://blackout-tau.vercel.app",
    "ChessAI-SelfLearning-Web": "https://chess-ai-self-learning-web.vercel.app",
    "pgvplanning": "https://pgv-planning-adam-blfs-projects.vercel.app",
    "Calculator-JS": "https://adam-blf.github.io/Calculator-JS/",
    "Mendelieve.io": "https://adam-blf.github.io/Mendelieve.io/",
    "Snake-Game": "https://adam-blf.github.io/Snake-Game/",
    "PMU-Game": "https://adam-blf.github.io/PMU-Game/",
    "Pong-Game": "https://adam-blf.github.io/Pong-Game/",
    "Guess-The-Number": "https://adam-blf.github.io/Guess-The-Number/",
    "WalkingAI": "https://adam-blf.github.io/WalkingAI/",
  } as Record<string, string>,

  categories: {
    "AI / ML / NLP": [
      { name: "AISCA-Cocktails", lang: "Python", desc: "App recommandation cocktails avec SBERT semantic search + RAG", tags: ["Python", "SBERT", "RAG", "Streamlit"] },
      { name: "EFREI-NLP-Anime-Recommendation", lang: "Python", desc: "Moteur recommandation NLP (TF-IDF, Cosine Similarity)", tags: ["Python", "NLP", "Scikit-learn"] },
      { name: "Langue-des-signes", lang: "Python", desc: "IA apprentissage langue des signes avec MediaPipe + Deep Learning", tags: ["Python", "MediaPipe", "Computer Vision", "Deep Learning"] },
      { name: "ia-pero", lang: "Python", desc: "Explorateur similarite semantique avec Sentence-Transformers", tags: ["Python", "Streamlit", "Transformers"] },
      { name: "ia-pero-final", lang: "Python", desc: "Version finale du projet ia-pero", tags: ["Python", "NLP"] },
      { name: "Projet-IA-Generative-Doctis-AI-mo", lang: "Python", desc: "IA Generative pour Doctis (sante)", tags: ["Python", "Generative AI"] },
      { name: "WalkingAI", lang: "HTML/JS", desc: "Simulation IA apprenant a marcher (Reinforcement Learning)", tags: ["JavaScript", "RL", "Simulation"] },
      { name: "RobotArtist", lang: "Python", desc: "Generation artistique par robot/IA", tags: ["Python", "Generative Art"] },
      { name: "ChessAI-SelfLearning-Web", lang: "CSS/JS", desc: "IA echecs auto-apprenante", tags: ["JavaScript", "AI", "Chess"] },
    ],
    "PWA / Apps Modernes": [
      { name: "genius", lang: "TypeScript", desc: "PWA micro-learning gamifie - Apprends en swipant", tags: ["TypeScript", "PWA", "Gamification"] },
      { name: "Echo", lang: "TypeScript", desc: "PWA Dating App - Dating reinvente avec authenticite temps reel", tags: ["TypeScript", "PWA", "Real-time"] },
      { name: "A.B.E.L", lang: "TypeScript", desc: "Assistant Personnel PWA - Adam Beloucif Est La", tags: ["TypeScript", "PWA", "AI Assistant"] },
      { name: "Borderland", lang: "TypeScript", desc: "Application Card Game", tags: ["TypeScript", "Gaming"] },
      { name: "BeeBle", lang: "TypeScript", desc: "Application web BeeBle", tags: ["TypeScript", "Web App"] },
      { name: "poke-next", lang: "TypeScript", desc: "Pokedex application avec Next.js", tags: ["TypeScript", "Next.js", "API"] },
    ],
    "Fullstack / Backend": [
      { name: "Taskmate", lang: "JavaScript", desc: "Plateforme productivite MERN + ML priorisation intelligente", tags: ["MongoDB", "Express", "React", "Node.js", "ML"] },
      { name: "TP-Social-Media", lang: "JavaScript", desc: "Backend REST pour reseau social evenementiel", tags: ["Node.js", "Express", "REST API", "MongoDB"] },
      { name: "Mendelieve.io", lang: "JavaScript", desc: "Tableau periodique interactif", tags: ["JavaScript", "Web App"] },
      { name: "pgvplanning", lang: "TypeScript", desc: "Application de planning", tags: ["TypeScript", "Planning"] },
      { name: "EtudiantOS", lang: "C#", desc: "Systeme/Application pour etudiants", tags: ["C#", ".NET"] },
    ],
    "Outils & Utilitaires": [
      { name: "ExcelCleaner", lang: "Python", desc: "Utilitaire GUI nettoyage et restructuration fichiers Excel", tags: ["Python", "Pandas", "GUI", "Automation"] },
      { name: "folder-analyzer-web", lang: "JavaScript", desc: "Outil audit fichiers ultra-rapide 100% browser", tags: ["JavaScript", "File System API", "Browser"] },
      { name: "pin-collector", lang: "Python", desc: "Gestion collections avec Streamlit", tags: ["Python", "Streamlit", "Data Viz"] },
      { name: "dimmoulinette", lang: "Python", desc: "Outil utilitaire Python", tags: ["Python"] },
    ],
    "Jeux & Simulations": [
      { name: "Blackjack-Simulator", lang: "Python", desc: "Simulateur blackjack pro avec 5 strategies IA", tags: ["Python", "OOP", "AI", "Simulation"] },
      { name: "Snake-Game", lang: "JavaScript", desc: "Snake avec niveaux progressifs, leaderboard", tags: ["JavaScript", "Canvas", "Gaming"] },
      { name: "Pong-Game", lang: "CSS/JS", desc: "Pong classique avec mode solo IA", tags: ["JavaScript", "CSS", "AI"] },
      { name: "PMU-Game", lang: "CSS/JS", desc: "Simulation paris hippiques", tags: ["JavaScript", "CSS", "Simulation"] },
      { name: "Guess-The-Number", lang: "CSS/JS", desc: "Jeu devinette avec indices", tags: ["JavaScript", "CSS"] },
    ],
    "Autres": [
      { name: "Calculator-JS", lang: "JavaScript", desc: "Calculatrice scientifique avec historique", tags: ["JavaScript", "Math"] },
      { name: "black-out", lang: "TypeScript", desc: "Projet black-out", tags: ["TypeScript"] },
    ],
  },
}

export const volunteering = [
  // Leadership
  { role: "Vice-President", org: "BDE ISIT", period: "Fev 2024 - Present", startDate: "2024-02", endDate: null, scope: "800+ etudiants, Leadership associatif" },
  { role: "President", org: "BDE Efrei", period: "Mars 2024 - Juin 2024", startDate: "2024-03", endDate: "2024-06", scope: "5700+ etudiants" },
  { role: "Responsable Communication", org: "BDE Efrei", period: "Nov 2022 - Mars 2023", startDate: "2022-11", endDate: "2023-03", scope: "Strategie digitale, Community management" },

  // Evenementiel
  { role: "Membre Pole Event", org: "BDE ISIT", period: "Avr 2023 - Fev 2024", startDate: "2023-04", endDate: "2024-02", scope: "Organisation evenements" },
  { role: "Membre Pole Voyage", org: "Bureau Des Sports EFREI", period: "Oct 2024 - Present", startDate: "2024-10", endDate: null, scope: "Organisation voyages" },
  { role: "Membre Pole Event", org: "Bureau Des Sports EFREI", period: "Mai 2023 - Avr 2024", startDate: "2023-05", endDate: "2024-04", scope: "Evenements sportifs" },

  // Sports & Culture
  { role: "Professeur Danse Rock", org: "Efreestyle", period: "Juil 2024 - Fev 2025", startDate: "2024-07", endDate: "2025-02", scope: "Enseignement et mentorat" },
  { role: "Responsable Partenariats", org: "Efrei Rugby", period: "Juil 2023 - Nov 2024", startDate: "2023-07", endDate: "2024-11", scope: "Developpement sponsors" },

  // Arts & Creative
  { role: "Secretaire General", org: "Bureau Des Arts Efrei", period: "Avr 2023 - Avr 2024", startDate: "2023-04", endDate: "2024-04", scope: "Gestion administrative" },
  { role: "Responsable Design", org: "Efrei Poker", period: "Juin 2023 - Avr 2024", startDate: "2023-06", endDate: "2024-04", scope: "Identite visuelle, Adobe Suite" },
]

// Timeline events for chronological visualization
export type TimelineEventType = 'education' | 'experience' | 'volunteering' | 'certification' | 'milestone'

export interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  subtitle: string
  period: string
  startDate: string
  endDate: string | null
  icon: string
  color: string
  description?: string
}

export const getTimelineEvents = (): TimelineEvent[] => {
  const events: TimelineEvent[] = []

  // Education events
  education.forEach((edu) => {
    events.push({
      id: `edu-${edu.id}`,
      type: 'education',
      title: edu.degree,
      subtitle: edu.school,
      period: edu.period,
      startDate: edu.startDate || '',
      endDate: edu.endDate || null,
      icon: 'graduation',
      color: '#3178C6', // Blue
      description: edu.description,
    })
  })

  // Experience events
  experiences.forEach((exp) => {
    events.push({
      id: `exp-${exp.id}`,
      type: 'experience',
      title: exp.title,
      subtitle: exp.company,
      period: exp.period,
      startDate: exp.startDate || '',
      endDate: exp.endDate || null,
      icon: 'briefcase',
      color: '#e07a5f', // Copper accent
      description: exp.description,
    })
  })

  // Volunteering events
  volunteering.forEach((vol, idx) => {
    events.push({
      id: `vol-${idx}`,
      type: 'volunteering',
      title: vol.role,
      subtitle: vol.org,
      period: vol.period,
      startDate: vol.startDate || '',
      endDate: vol.endDate || null,
      icon: 'heart',
      color: '#47A248', // Green
      description: vol.scope,
    })
  })

  // Sort by start date (descending - most recent first)
  return events.sort((a, b) => {
    const dateA = a.startDate || '0000-00'
    const dateB = b.startDate || '0000-00'
    return dateB.localeCompare(dateA)
  })
}

// Years for timeline
export const timelineYears = ['2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020']
