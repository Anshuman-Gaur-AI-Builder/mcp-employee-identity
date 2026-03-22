export interface Skill {
  name: string;
  category: string;
  proficiencyLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
  verifiedBy: string;
  lastAssessed: string;
}

export interface CareerEntry {
  title: string;
  department: string;
  startDate: string;
  endDate: string | null;
  employmentType: "Full-time";
  location: string;
  reportsTo: string;
  isPromotion: boolean;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuingBody: string;
  dateEarned: string;
  expirationDate: string | null;
  credentialId: string;
  verificationUrl: string;
}

export interface Project {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  status: "Completed" | "In Progress";
  description: string;
  outcomes: string[];
  technologies: string[];
  teamSize: number;
}

export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companySize: string;
  currentTitle: string;
  department: string;
  hireDate: string;
  skills: Skill[];
  careerHistory: CareerEntry[];
  certifications: Certification[];
  projects: Project[];
}

export const EMPLOYEES: Record<string, Employee> = {
  "EMP-2847": {
    employeeId: "EMP-2847",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@acmecorp.com",
    company: "Acme Corp",
    companySize: "5,200 employees",
    currentTitle: "Tech Lead",
    department: "Platform Engineering",
    hireDate: "2022-03-14",

    skills: [
      {
        name: "TypeScript",
        category: "Programming Languages",
        proficiencyLevel: "Expert",
        yearsOfExperience: 5,
        verifiedBy: "Engineering Skills Assessment Q1 2026",
        lastAssessed: "2026-01-15",
      },
      {
        name: "React",
        category: "Frontend Frameworks",
        proficiencyLevel: "Expert",
        yearsOfExperience: 5,
        verifiedBy: "Engineering Skills Assessment Q1 2026",
        lastAssessed: "2026-01-15",
      },
      {
        name: "Node.js",
        category: "Backend Runtimes",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 4,
        verifiedBy: "Engineering Skills Assessment Q1 2026",
        lastAssessed: "2026-01-15",
      },
      {
        name: "PostgreSQL",
        category: "Databases",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 4,
        verifiedBy: "Engineering Skills Assessment Q1 2026",
        lastAssessed: "2026-01-15",
      },
      {
        name: "AWS (ECS, Lambda, S3, RDS)",
        category: "Cloud Infrastructure",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 3,
        verifiedBy: "AWS Solutions Architect Certification",
        lastAssessed: "2025-09-20",
      },
      {
        name: "System Design",
        category: "Architecture",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 3,
        verifiedBy: "Architecture Review Board",
        lastAssessed: "2025-11-01",
      },
      {
        name: "GraphQL",
        category: "API Design",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 3,
        verifiedBy: "Project Delivery — Unified API Gateway",
        lastAssessed: "2025-06-30",
      },
      {
        name: "Docker & Kubernetes",
        category: "DevOps",
        proficiencyLevel: "Intermediate",
        yearsOfExperience: 3,
        verifiedBy: "Platform Engineering Onboarding",
        lastAssessed: "2024-09-01",
      },
      {
        name: "Technical Leadership",
        category: "Leadership",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 2,
        verifiedBy: "Manager Assessment — Annual Review 2025",
        lastAssessed: "2025-12-15",
      },
      {
        name: "CI/CD Pipeline Design",
        category: "DevOps",
        proficiencyLevel: "Advanced",
        yearsOfExperience: 3,
        verifiedBy: "Project Delivery — Developer Productivity Initiative",
        lastAssessed: "2025-03-30",
      },
    ],

    careerHistory: [
      {
        title: "Software Engineer II",
        department: "Product Engineering",
        startDate: "2022-03-14",
        endDate: "2023-06-30",
        employmentType: "Full-time",
        location: "San Francisco, CA",
        reportsTo: "Priya Sharma, Engineering Manager",
        isPromotion: false,
        highlights: [
          "Shipped customer-facing dashboard used by 12,000+ monthly active users",
          "Reduced API response times by 40% through query optimization",
          "Mentored 2 junior engineers through onboarding program",
        ],
      },
      {
        title: "Senior Software Engineer",
        department: "Product Engineering",
        startDate: "2023-07-01",
        endDate: "2024-12-31",
        employmentType: "Full-time",
        location: "San Francisco, CA",
        reportsTo: "Priya Sharma, Engineering Manager",
        isPromotion: true,
        highlights: [
          "Led design and delivery of Unified API Gateway serving 50M+ requests/day",
          "Drove migration from monolith to microservices for payments domain",
          "Authored internal RFC process adopted across 4 engineering teams",
          "Received 'Impact Award' for cross-team collaboration (Q3 2024)",
        ],
      },
      {
        title: "Tech Lead",
        department: "Platform Engineering",
        startDate: "2025-01-01",
        endDate: null,
        employmentType: "Full-time",
        location: "San Francisco, CA (Hybrid)",
        reportsTo: "Marcus Johnson, Director of Engineering",
        isPromotion: true,
        highlights: [
          "Leading a team of 6 engineers building Acme's internal developer platform",
          "Designed event-driven architecture reducing inter-service latency by 60%",
          "Established platform SLOs and on-call practices for 99.95% uptime target",
          "Driving adoption of internal developer portal (85% of engineering onboarded)",
        ],
      },
    ],

    certifications: [
      {
        name: "AWS Certified Solutions Architect — Associate",
        issuingBody: "Amazon Web Services",
        dateEarned: "2024-03-15",
        expirationDate: "2027-03-15",
        credentialId: "AWS-SAA-2847-2024",
        verificationUrl: "https://aws.amazon.com/verification",
      },
      {
        name: "Certified Kubernetes Application Developer (CKAD)",
        issuingBody: "The Linux Foundation",
        dateEarned: "2024-08-22",
        expirationDate: "2027-08-22",
        credentialId: "LF-CKAD-2847",
        verificationUrl: "https://training.linuxfoundation.org/verification",
      },
      {
        name: "Professional Scrum Master I (PSM I)",
        issuingBody: "Scrum.org",
        dateEarned: "2023-11-10",
        expirationDate: null,
        credentialId: "PSM-I-2847-2023",
        verificationUrl: "https://scrum.org/certificates",
      },
      {
        name: "GraphQL Professional Certificate",
        issuingBody: "Apollo GraphQL",
        dateEarned: "2025-02-28",
        expirationDate: null,
        credentialId: "APOLLO-GQL-2847",
        verificationUrl: "https://odyssey.apollographql.com",
      },
    ],

    projects: [
      {
        name: "Customer Analytics Dashboard",
        role: "Lead Developer",
        startDate: "2022-05-01",
        endDate: "2022-11-15",
        status: "Completed",
        description:
          "Built a real-time analytics dashboard for enterprise customers to track usage patterns, feature adoption, and account health metrics.",
        outcomes: [
          "Adopted by 340 enterprise accounts within first quarter",
          "Reduced customer churn analysis time from 2 days to 15 minutes",
          "12,000+ monthly active users across customer base",
        ],
        technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
        teamSize: 3,
      },
      {
        name: "Unified API Gateway",
        role: "Technical Lead",
        startDate: "2023-09-01",
        endDate: "2024-06-30",
        status: "Completed",
        description:
          "Designed and delivered a centralized API gateway to consolidate 12 separate service endpoints into a single GraphQL API, improving developer experience and reducing client-side complexity.",
        outcomes: [
          "Consolidated 12 REST endpoints into a single GraphQL API",
          "Serving 50M+ requests/day with p99 latency under 120ms",
          "Reduced frontend integration time for new features by 65%",
        ],
        technologies: [
          "GraphQL",
          "Apollo Server",
          "TypeScript",
          "Redis",
          "AWS ECS",
          "DataLoader",
        ],
        teamSize: 5,
      },
      {
        name: "Payments Microservices Migration",
        role: "Senior Engineer",
        startDate: "2024-01-15",
        endDate: "2024-09-30",
        status: "Completed",
        description:
          "Led the decomposition of the payments monolith into event-driven microservices, enabling independent deployment and scaling of payment processing, invoicing, and reconciliation.",
        outcomes: [
          "Zero-downtime migration of $2.3B annual payment volume",
          "Deployment frequency increased from bi-weekly to daily",
          "Payment processing latency reduced by 45%",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Kafka",
          "PostgreSQL",
          "AWS Lambda",
          "Terraform",
        ],
        teamSize: 8,
      },
      {
        name: "Internal Developer Platform (Acme DevEx)",
        role: "Tech Lead",
        startDate: "2025-01-15",
        endDate: "2026-03-22",
        status: "In Progress",
        description:
          "Building Acme's internal developer platform — a unified portal for service catalog, deployment pipelines, environment provisioning, and observability. Goal: reduce cognitive load and onboarding time for 400+ engineers.",
        outcomes: [
          "85% of engineering teams onboarded to the portal",
          "New service provisioning time reduced from 3 days to 20 minutes",
          "Standardized CI/CD pipelines across 60+ microservices",
        ],
        technologies: [
          "React",
          "TypeScript",
          "Backstage",
          "Kubernetes",
          "ArgoCD",
          "Grafana",
          "AWS CDK",
        ],
        teamSize: 6,
      },
    ],
  },
};

export function getEmployee(employeeId: string): Employee | undefined {
  return EMPLOYEES[employeeId];
}
