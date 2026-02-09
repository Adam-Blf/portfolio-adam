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
  "Lycee Saint-Joseph": "/logos/lycee_saint_joseph_logo.svg",
  "College Liberte": "/logos/college_liberte_logo.svg",

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
  subtitle: "M1 Data Engineering & IA @ EFREI Paris | Apprenti Ingenieur PMSI / Data Engineer @ GHT Psy Sud",
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
  { label: "Annees d'experience", value: "4+", icon: "briefcase" },
  { label: "Technologies", value: "30+", icon: "layers" },
]

export const staticMetrics = {
  yearsExperience: 4,
  certifications: 19,
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
    rncpTitle: "Expert en ingenierie de donnees",
    current: true,
    description: "Formation alternance 2 ans. Expert en ingenierie de donnees : conception et developpement d'architectures data robustes, implementation de solutions IA, automatisation des deployements cloud et on-premise, gouvernance de la donnee. Triple expertise technique : Data Engineering, IA/ML et Cloud/DevOps.",
    highlights: [
      "Partenariat industriel Inetum (alternance data & IA)",
      "Mentor Programme Student Success EFREI",
      "Hackathons, competitions ML, challenges cloud",
      "Certifications visees AWS/Azure/GCP",
    ],
    skills: [
      "Architecture de donnees (BDD relationnelles/NoSQL, Data Lakes)",
      "Traitement de donnees (API, streaming, pipelines ETL/ELT)",
      "Data Science & Visualisation (Python, tableaux de bord)",
      "Machine Learning & Deep Learning (modeles predictifs, NLP)",
      "IA Generative (foundation models, LLMs, evaluation)",
      "Cloud Computing (stockage, traitement, securite cloud)",
      "CI/CD, MLOps, DataOps (containerisation, orchestration)",
      "Infrastructure as Code, monitoring, resilience",
      "Gouvernance des donnees (RGPD, qualite, cycle de vie)",
      "Securite et protection des donnees (chiffrement, IAM)",
      "Pilotage de projets Data (Agile, budget, KPI, ROI)",
      "Management d'equipes pluridisciplinaires et inclusives",
    ],
    curriculum: {
      m1: [
        "Real Time Data Engineering",
        "API et Web Service",
        "Big Data Frameworks",
        "Data Lakes & Data Integration",
        "Architecture de donnees",
        "Relational Databases",
        "NoSQL Databases",
        "Data Visualisation",
        "Machine Learning & Deep Learning",
        "Natural Language Processing",
        "Projet Data Science",
        "Projet IA Generative",
        "Data Science avec Python",
      ],
      m2: [
        "Introduction au Cloud Computing",
        "Data Engineering on Cloud (certification)",
        "Integration et Deploiement continu",
        "MLOps & DataOps",
        "Infrastructure Orchestration & Automation",
        "Securite 1 & 2",
        "Data Gouvernance & Management",
        "Data Regulations",
        "Leadership & Management",
        "Gestion de projets Data",
      ],
    },
    debouches: ["Data Engineer", "Data Analyst", "Consultant Data & IA", "Architecte Data sur le Cloud"],
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
    rncpTitle: "Chef de projets digitaux",
    current: false,
    description: "Double diplome EFREI-ISIT. Chef de projets digitaux : Web Development, Interactive Design, E-Business et Management Agile. Garant de la production de projets numeriques (cadrage, conception, pilotage, livraison) et de la maitrise couts/qualite/delais. Mobilite internationale obligatoire (Erasmus Malaga).",
    highlights: [
      "President BDE EFREI (Mar-Juin 2024)",
      "Resp. Communication BDE (5700+ etudiants)",
      "Resp. Partenariats Efrei Rugby",
      "Prof Danse Rock Efreestyle",
    ],
    skills: [
      "Cadrage et faisabilite de projet digital (cahier des charges, specs)",
      "Gestion de projet Agile/Scrum (retroplanning, coordination, reporting)",
      "Strategie de communication digitale (SEO/SEA, brand content, SMO)",
      "Developpement web (HTML/CSS/JS, CMS, bases de donnees, API)",
      "UX/UI Design & Prototyping (interfaces utilisateurs, ergonomie)",
      "Marketing Digital (e-business, data marketing, CRM, campagnes)",
      "Production audiovisuelle (motion design, montage video)",
      "Management interculturel & communication multilingue",
    ],
    curriculum: {
      b1: [
        "Developpement Durable", "Gestion de Projet", "Culture d'entreprise",
        "Economie numerique", "Droit du numerique",
        "Environnement Digital & Innovation", "Langages Web", "Conception CMS",
        "Community Management", "Marketing Digital", "Brand Content & Editorial",
        "Creation graphique", "Referencement Naturel SEO",
        "Neuro Marketing", "Marketing Fondamental", "Production Video",
        "SMO & Community Management",
        "Approche de l'interculturel", "Redaction Professionnelle FR/EN",
      ],
      b2: [
        "Gestion de la relation Client", "Gestion de projet",
        "Community Management", "Referencement SEO/SEA",
        "Motion Design", "IA - Intelligence Artificielle",
        "CMS", "Developpement informatique HTML",
        "Image, Camera, Cadre Lumiere et Realisation",
        "UX-UI", "PAO : Photoshop Illustrator",
      ],
      b3: [
        "Analyse et cadrage d'un projet digital",
        "Pilotage et Gestion du Projet Digital",
        "Droit des affaires", "RH Internationales",
        "Management international et interculturel",
        "Community Management", "Son, Image et Montage Video",
        "PAO : Photoshop Illustrator", "Gestion de contenu CMS",
        "Developper son agilite culturelle",
        "UX-UI", "Developpement web HTML + CMS",
        "Marketing et Communication", "Referencement SEO/SEA",
        "Data Marketing",
      ],
    },
    debouches: ["Chef de projets digitaux", "Product Manager", "UX/UI Designer", "Traffic Manager", "Digital Marketing Manager"],
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
    description: "Double diplome avec l'EFREI axe sur le management interculturel et la communication multilingue. Vice-President BDE ISIT (800+ etudiants, 1 an 10 mois). Competences en negociation internationale, communication cross-culturelle et business international.",
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
  {
    id: 6,
    degree: "Baccalaureat General - Specialites Maths/SVT",
    school: "Lycee Saint-Joseph",
    period: "2019 - 2022",
    startDate: "2019-09",
    endDate: "2022-06",
    level: "Mention Assez Bien",
    current: false,
    description: "Baccalaureat general au Lycee Saint-Joseph de Villejuif. Specialites Premiere : Mathematiques, Physique-Chimie, SVT. Specialites Terminale : Mathematiques, SVT. Obtenu avec Mention Assez Bien.",
    highlights: [
      "Mention Assez Bien",
      "Specialite Mathematiques",
      "Specialite SVT",
      "Physique-Chimie en Premiere",
    ],
    skills: [
      "Mathematiques",
      "Sciences de la Vie et de la Terre",
      "Physique-Chimie",
      "Raisonnement scientifique",
    ],
    debouches: [],
  },
  {
    id: 7,
    degree: "Brevet des Colleges",
    school: "College Liberte",
    period: "2015 - 2019",
    startDate: "2015-09",
    endDate: "2019-06",
    level: "Mention Tres Bien",
    current: false,
    description: "Diplome National du Brevet obtenu au College Liberte de Chevilly-Larue avec la Mention Tres Bien.",
    highlights: [
      "Mention Tres Bien",
      "Chevilly-Larue",
    ],
    skills: [
      "Mathematiques",
      "Francais",
      "Histoire-Geographie",
      "Sciences",
    ],
    debouches: [],
  },
]

export const certifications = [
  // 2027 - RNCP Master (en cours)
  { name: "Expert en ingenierie de donnees (RNCP 40875)", issuer: "EFREI", year: "2027", date: "2027-08", level: "Niveau 7", rncp: "RNCP40875", url: "https://www.francecompetences.fr/recherche/rncp/40875/", pending: true },

  // 2025 - RNCP Bachelor
  { name: "Chef de projets digitaux (RNCP 35541)", issuer: "EFREI", year: "2025", date: "2025-07", level: "Niveau 6", rncp: "RNCP35541", url: "https://www.francecompetences.fr/recherche/rncp/35541/" },

  // 2025 - Microsoft & LinkedIn Learning (IA)
  { name: "Les competences humaines a l'ere de l'IA", issuer: "Microsoft", year: "2025", date: "2025-11" },
  { name: "Integrer l'IA generative dans son processus creatif", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Ameliorer sa prise de decision avec l'IA generative", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Developper votre pensee critique avec l'IA generative", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Exploiter la puissance de l'intelligence sociale a l'ere de l'IA", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Developper ses competences en communication a l'ere de l'IA", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Developper ses capacites d'adaptation a l'ere de l'IA", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Miser sur les competences humaines a l'ere de l'IA", issuer: "LinkedIn", year: "2025", date: "2025-11" },
  { name: "Career Essentials in Generative AI by Microsoft and LinkedIn", issuer: "Microsoft", year: "2025", date: "2025-10" },
  { name: "Introduction to Artificial Intelligence", issuer: "LinkedIn", year: "2025", date: "2025-10" },

  // 2024 - LinkedIn Learning & HubSpot
  { name: "Inbound", issuer: "HubSpot Academy", year: "2024", date: "2024-03", expires: "2026-04" },
  { name: "Generative AI: The Evolution of Thoughtful Online Search", issuer: "LinkedIn", year: "2024", date: "2024-06" },
  { name: "Streamlining Your Work with Microsoft Copilot", issuer: "LinkedIn", year: "2024", date: "2024-07" },

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

// Hard Skills - extracted from EFREI Bachelor + Master curriculum + RNCP competences
export const hardSkills = {
  bachelor: {
    title: "Bachelor International Communication & Technology",
    rncp: "RNCP 35541 - Chef de projets digitaux",
    skills: [
      "HTML/CSS/JavaScript",
      "Developpement web (CMS, frameworks)",
      "Conception et integration CMS",
      "Referencement SEO/SEA",
      "UX/UI Design",
      "PAO (Photoshop, Illustrator)",
      "Creation graphique",
      "Motion Design",
      "Marketing Digital (SEO, SEA, SMO)",
      "Community Management",
      "Brand Content & Editorial",
      "Data Marketing & CRM",
      "Neuro Marketing",
      "Gestion de projet Agile/Scrum",
      "Cahier des charges & specifications",
      "Retroplanning de production",
      "Coordination d'equipes pluridisciplinaires",
      "Strategie de communication digitale",
      "Production audiovisuelle (video, son, montage)",
      "Redaction professionnelle FR/EN",
      "Droit du numerique & droit des affaires",
      "Economie numerique",
      "Intelligence Artificielle (introduction)",
    ],
  },
  master: {
    title: "Master Data Engineering & IA",
    rncp: "RNCP 40875 - Expert en ingenierie de donnees",
    skills: [
      "Bases de donnees relationnelles (SQL, PostgreSQL, Oracle)",
      "Bases de donnees NoSQL (MongoDB, Cassandra)",
      "Data Lakes & Data Integration",
      "API et Web Services",
      "Pipelines ETL/ELT",
      "Real Time Data Engineering (streaming, Kafka)",
      "Big Data Frameworks (Spark, Hadoop)",
      "Machine Learning & Deep Learning",
      "Natural Language Processing (NLP)",
      "IA Generative (foundation models, LLMs)",
      "Data Science avec Python",
      "Data Visualisation",
      "Cloud Computing (AWS, Azure, GCP)",
      "Data Engineering on Cloud",
      "Integration et Deploiement continu (CI/CD)",
      "MLOps & DataOps",
      "Infrastructure Orchestration & Automation",
      "Containerisation (Docker, Kubernetes)",
      "Data Gouvernance & Management",
      "Securite des donnees (chiffrement, IAM)",
      "Data Regulations (RGPD)",
      "Audit qualite des donnees",
      "Gestion de projets Data",
      "Leadership & Management",
    ],
  },
}

// Soft Skills - from formations, associations, military
export const softSkills = [
  { name: "Leadership", source: "President BDE EFREI (5700+ etudiants), VP BDE ISIT, PMM Marine Nationale", level: 95 },
  { name: "Gestion de projet", source: "Chef de projets digitaux (RNCP 35541), Scrum Master BNP Paribas", level: 90 },
  { name: "Communication", source: "Bachelor Communication & Technology, Resp. Com BDE", level: 90 },
  { name: "Travail d'equipe", source: "10+ associations, projets de groupe, hackathons", level: 95 },
  { name: "Adaptabilite", source: "Erasmus Malaga, PMM Marine, alternances multiples", level: 90 },
  { name: "Esprit critique", source: "Certifications IA Microsoft/LinkedIn, Data Engineering", level: 85 },
  { name: "Creativite", source: "Resp. Design Efrei Poker, Creation graphique, PAO", level: 85 },
  { name: "Management interculturel", source: "Double diplome EFREI-ISIT, Erasmus, Communication multilingue", level: 85 },
  { name: "Rigueur & Discipline", source: "PMM Kieffer Marine Nationale, Data Engineering hospitalier", level: 90 },
  { name: "Pedagogie", source: "Prof Danse Rock Efreestyle, Mentor EFREI", level: 80 },
  { name: "Gestion du stress", source: "Marine Nationale, evenementiel BDE, deadlines projets", level: 85 },
  { name: "Prise de decision", source: "Certifications IA decisionnelle, President BDE, pilotage projets", level: 85 },
]

// Courses by formation and year
export const formationCourses = {
  bachelor: {
    title: "Bachelor International Communication & Technology",
    school: "EFREI Paris x ISIT",
    period: "2022 - 2025",
    rncp: "RNCP 35541",
    rncpTitle: "Chef de projets digitaux",
    years: {
      "B1 (2022-2023)": [
        { name: "Developpement Durable", category: "general" },
        { name: "Gestion de Projet", category: "management" },
        { name: "Culture d'entreprise", category: "general" },
        { name: "Economie numerique", category: "general" },
        { name: "Droit du numerique", category: "droit" },
        { name: "Environnement Digital & Innovation", category: "tech" },
        { name: "Langages Web", category: "tech" },
        { name: "Conception CMS", category: "tech" },
        { name: "Projet Caritatif", category: "projet" },
        { name: "Community Management", category: "marketing" },
        { name: "Marketing Digital", category: "marketing" },
        { name: "Brand Content & Editorial", category: "marketing" },
        { name: "Creation graphique", category: "design" },
        { name: "Referencement Naturel SEO", category: "marketing" },
        { name: "Neuro Marketing", category: "marketing" },
        { name: "Marketing Fondamental", category: "marketing" },
        { name: "Production Video", category: "design" },
        { name: "SMO & Community Management", category: "marketing" },
        { name: "Approche de l'interculturel", category: "international" },
        { name: "Redaction Professionnelle FR/EN", category: "communication" },
      ],
      "B2 (2023-2024)": [
        { name: "Gestion de la relation Client", category: "marketing" },
        { name: "Gestion de projet", category: "management" },
        { name: "Community Management", category: "marketing" },
        { name: "Referencement SEO / SEA", category: "marketing" },
        { name: "Motion Design", category: "design" },
        { name: "IA - Intelligence Artificielle", category: "tech" },
        { name: "CMS", category: "tech" },
        { name: "Developpement informatique HTML", category: "tech" },
        { name: "Image, Camera, Cadre Lumiere et Realisation", category: "design" },
        { name: "UX-UI", category: "design" },
        { name: "PAO : Photoshop Illustrator", category: "design" },
        { name: "Anglais", category: "international" },
      ],
      "B3 (2024-2025)": [
        { name: "Analyse et cadrage d'un projet digital", category: "management" },
        { name: "Pilotage et Gestion du Projet Digital", category: "management" },
        { name: "Droit des affaires", category: "droit" },
        { name: "RH Internationales", category: "management" },
        { name: "Management international et interculturel", category: "international" },
        { name: "Community Management", category: "marketing" },
        { name: "Son, Image et Montage Video", category: "design" },
        { name: "PAO : Photoshop Illustrator", category: "design" },
        { name: "Gestion de contenu CMS", category: "tech" },
        { name: "Developper son agilite culturelle", category: "international" },
        { name: "UX-UI", category: "design" },
        { name: "Developpement web HTML + CMS", category: "tech" },
        { name: "Marketing et Communication", category: "marketing" },
        { name: "Referencement SEO / SEA", category: "marketing" },
        { name: "Data Marketing", category: "marketing" },
        { name: "Francais professionnel ecrit et oral", category: "communication" },
        { name: "Anglais professionnel ecrit et oral", category: "international" },
        { name: "Perfectionnement en espagnol", category: "international" },
      ],
    },
  },
  master: {
    title: "Master Data Engineering & IA",
    school: "EFREI Paris",
    period: "2025 - 2027",
    rncp: "RNCP 40875",
    rncpTitle: "Expert en ingenierie de donnees",
    years: {
      "M1 (2025-2026)": [
        { name: "Real Time Data Engineering", category: "data" },
        { name: "API et Web Service", category: "tech" },
        { name: "Big Data Frameworks", category: "data" },
        { name: "Data Lakes & Data Integration", category: "data" },
        { name: "Architecture de donnees", category: "data" },
        { name: "Relational Databases", category: "data" },
        { name: "NoSQL Databases", category: "data" },
        { name: "Data Visualisation", category: "data" },
        { name: "Machine Learning & Deep Learning", category: "ai" },
        { name: "Natural Language Processing", category: "ai" },
        { name: "Projet Data Science", category: "ai" },
        { name: "Projet IA Generative", category: "ai" },
        { name: "Data Science avec Python", category: "ai" },
      ],
      "M2 (2026-2027)": [
        { name: "Introduction au Cloud Computing", category: "cloud" },
        { name: "Data Engineering on Cloud (certification)", category: "cloud" },
        { name: "Integration et Deploiement continu", category: "cloud" },
        { name: "MLOps & DataOps", category: "cloud" },
        { name: "Infrastructure Orchestration & Automation", category: "cloud" },
        { name: "Securite 1", category: "securite" },
        { name: "Securite 2", category: "securite" },
        { name: "Data Gouvernance & Management", category: "gouvernance" },
        { name: "Data Regulations", category: "gouvernance" },
        { name: "Projet Data Management", category: "gouvernance" },
        { name: "Leadership & Management", category: "management" },
        { name: "Gestion de projets Data", category: "management" },
      ],
    },
  },
  erasmus: {
    title: "Erasmus - Communication & Media Studies",
    school: "Universidad de Malaga",
    period: "Sept 2023 - Fev 2024",
    rncp: null,
    rncpTitle: null,
    years: {
      "Semestre (2023-2024)": [
        { name: "Production Audiovisual", category: "design" },
        { name: "Ingles instrumental I y III", category: "international" },
        { name: "Analisis del discurso", category: "communication" },
        { name: "Communication Commercial", category: "marketing" },
      ],
    },
  },
  pmm: {
    title: "Preparation Militaire Marine (PMM) Kieffer",
    school: "Marine Nationale",
    period: "2020 - 2021",
    rncp: null,
    rncpTitle: null,
    years: {
      "Formation (2020-2021)": [
        { name: "Bases de la Marine Nationale", category: "militaire" },
        { name: "Tir", category: "militaire" },
        { name: "Lutte incendie", category: "militaire" },
        { name: "Ceremonies militaires", category: "militaire" },
        { name: "Permis bateau cotier", category: "militaire" },
        { name: "PSC1 (Premiers Secours Civiques)", category: "militaire" },
      ],
    },
  },
  lycee: {
    title: "Baccalaureat General - Maths/SVT",
    school: "Lycee Saint-Joseph, Villejuif",
    period: "2019 - 2022",
    rncp: null,
    rncpTitle: null,
    years: {
      "Seconde (2019-2020)": [
        { name: "Mathematiques", category: "sciences" },
        { name: "Physique-Chimie", category: "sciences" },
        { name: "SVT", category: "sciences" },
        { name: "Francais", category: "communication" },
        { name: "Histoire-Geographie", category: "general" },
        { name: "Anglais", category: "international" },
        { name: "Espagnol", category: "international" },
      ],
      "Premiere - Spe Maths/Physique/SVT (2020-2021)": [
        { name: "Specialite Mathematiques", category: "sciences" },
        { name: "Specialite Physique-Chimie", category: "sciences" },
        { name: "Specialite SVT", category: "sciences" },
        { name: "Francais (epreuve anticipee)", category: "communication" },
        { name: "Histoire-Geographie", category: "general" },
        { name: "Anglais", category: "international" },
        { name: "Espagnol", category: "international" },
      ],
      "Terminale - Spe Maths/SVT (2021-2022)": [
        { name: "Specialite Mathematiques", category: "sciences" },
        { name: "Specialite SVT", category: "sciences" },
        { name: "Philosophie", category: "general" },
        { name: "Histoire-Geographie", category: "general" },
        { name: "Anglais", category: "international" },
        { name: "Espagnol", category: "international" },
        { name: "Grand Oral", category: "communication" },
      ],
    },
  },
  college: {
    title: "Brevet des Colleges - Mention Tres Bien",
    school: "College Liberte, Chevilly-Larue",
    period: "2015 - 2019",
    rncp: null,
    rncpTitle: null,
    years: {
      "College (2015-2019)": [
        { name: "Mathematiques", category: "sciences" },
        { name: "Francais", category: "communication" },
        { name: "Histoire-Geographie", category: "general" },
        { name: "Sciences (Physique-Chimie, SVT, Technologie)", category: "sciences" },
        { name: "Anglais", category: "international" },
        { name: "Espagnol", category: "international" },
        { name: "Arts Plastiques", category: "design" },
        { name: "Education Musicale", category: "general" },
        { name: "EPS", category: "general" },
      ],
    },
  },
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
  { role: "Vice-President", org: "BDE ISIT", period: "Fev 2024 - Sept 2025", startDate: "2024-02", endDate: "2025-09", scope: "800+ etudiants, Leadership associatif" },
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
export const timelineYears = ['2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
