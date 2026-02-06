interface TechBadgeProps {
  name: string
  color: string
  logo: string
  logoColor?: string
}

export default function TechBadge({ name, color, logo, logoColor = 'white' }: TechBadgeProps) {
  const badgeUrl = `https://img.shields.io/badge/${name}-${color}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}`

  return (
    <img
      src={badgeUrl}
      alt={name}
      className="h-6 sm:h-7"
      loading="lazy"
    />
  )
}

// Pre-defined tech badges
export const techBadgeConfigs: Record<string, TechBadgeProps> = {
  Python: { name: "Python", color: "3776AB", logo: "python" },
  TypeScript: { name: "TypeScript", color: "007ACC", logo: "typescript" },
  JavaScript: { name: "JavaScript", color: "F7DF1E", logo: "javascript", logoColor: "black" },
  React: { name: "React", color: "20232A", logo: "react", logoColor: "61DAFB" },
  "Next.js": { name: "Next.js", color: "000000", logo: "next.js" },
  "Node.js": { name: "Node.js", color: "339933", logo: "node.js" },
  Express: { name: "Express", color: "000000", logo: "express" },
  MongoDB: { name: "MongoDB", color: "47A248", logo: "mongodb" },
  PostgreSQL: { name: "PostgreSQL", color: "316192", logo: "postgresql" },
  Oracle: { name: "Oracle", color: "F80000", logo: "oracle" },
  Docker: { name: "Docker", color: "2496ED", logo: "docker" },
  AWS: { name: "AWS", color: "232F3E", logo: "amazon-aws" },
  Azure: { name: "Azure", color: "0078D4", logo: "microsoft-azure" },
  GCP: { name: "GCP", color: "4285F4", logo: "google-cloud" },
  Git: { name: "Git", color: "F05032", logo: "git" },
  Streamlit: { name: "Streamlit", color: "FF4B4B", logo: "streamlit" },
  Pandas: { name: "Pandas", color: "150458", logo: "pandas" },
  "Scikit-learn": { name: "Scikit--learn", color: "F7931E", logo: "scikit-learn" },
  TensorFlow: { name: "TensorFlow", color: "FF6F00", logo: "tensorflow" },
  OpenAI: { name: "OpenAI", color: "412991", logo: "openai" },
  PHP: { name: "PHP", color: "777BB4", logo: "php" },
  "C#": { name: "C%23", color: "239120", logo: "c-sharp" },
  ".NET": { name: ".NET", color: "512BD4", logo: "dotnet" },
  Tailwind: { name: "Tailwind_CSS", color: "38B2AC", logo: "tailwind-css" },
  Vercel: { name: "Vercel", color: "000000", logo: "vercel" },
}
