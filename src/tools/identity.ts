import { z } from "zod/v4";
import { getEmployee } from "../data/mockEmployee.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Employee } from "../data/mockEmployee.js";

function buildWorkDataSummary(employee: Employee): string {
  let summary = "";

  // Career trajectory
  summary += "## Career History\n";
  for (const role of employee.careerHistory) {
    const tenure = role.endDate ?? "Present";
    summary += `- ${role.title}, ${role.department} (${role.startDate} → ${tenure})${role.isPromotion ? " [Promoted]" : ""}\n`;
    for (const h of role.highlights) {
      summary += `  - ${h}\n`;
    }
  }

  // Skills
  summary += "\n## Verified Skills\n";
  for (const skill of employee.skills) {
    summary += `- ${skill.name}: ${skill.proficiencyLevel} (${skill.yearsOfExperience} yrs)\n`;
  }

  // Certifications
  summary += "\n## Certifications\n";
  for (const cert of employee.certifications) {
    summary += `- ${cert.name} — ${cert.issuingBody} (${cert.dateEarned})\n`;
  }

  // Projects
  summary += "\n## Key Projects\n";
  for (const project of employee.projects) {
    summary += `- ${project.name} (${project.role}, team of ${project.teamSize})\n`;
    summary += `  ${project.description}\n`;
    summary += `  Outcomes: ${project.outcomes.join("; ")}\n`;
    summary += `  Tech: ${project.technologies.join(", ")}\n`;
  }

  return summary;
}

export function registerIdentityTools(server: McpServer): void {
  server.registerTool("generate_linkedin_summary", {
    title: "Generate LinkedIn Summary",
    description:
      "Synthesizes a compelling LinkedIn About section and Skills list grounded in verified work data. Pulls from skills, career history, certifications, and project outcomes to create an authentic professional narrative.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] generate_linkedin_summary with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    const workData = buildWorkDataSummary(employee);

    const prompt = `You are a professional brand strategist. Using ONLY the verified work data below, write:

1. A LinkedIn "About" section (150-200 words, first person, conversational but professional)
2. A "Featured Skills" list (top 8 skills, ordered by strength)
3. A one-line headline suggestion

Ground every claim in the data. Do not fabricate achievements, metrics, or experiences not present in the data.

---

**Employee:** ${employee.firstName} ${employee.lastName}
**Current Role:** ${employee.currentTitle} at ${employee.company} (${employee.companySize})

${workData}`;

    console.error(`[TOOL RESPONSE] generate_linkedin_summary returned 1 items`);
    return {
      content: [
        {
          type: "text" as const,
          text: `# LinkedIn Profile Generator — ${employee.firstName} ${employee.lastName}\n\nUse the following verified work data to generate the LinkedIn profile:\n\n${prompt}`,
        },
      ],
    };
  });

  server.registerTool("generate_github_bio", {
    title: "Generate GitHub Bio",
    description:
      "Generates a GitHub profile README bio optimized for developer audiences. Built from verified skills, project delivery data, and technical certifications.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] generate_github_bio with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    const workData = buildWorkDataSummary(employee);

    const prompt = `You are a developer relations expert. Using ONLY the verified work data below, write a GitHub profile README that includes:

1. A short intro (2-3 sentences — who they are, what they build)
2. A "What I'm working on" section (current project, role, impact)
3. A tech stack section using markdown badges or a clean list
4. Key project highlights (2-3 projects, with quantified outcomes)
5. Certifications as a compact list

Keep it concise, technical, and authentic. No fluff. Do not fabricate anything not present in the data.

---

**Employee:** ${employee.firstName} ${employee.lastName}
**Current Role:** ${employee.currentTitle} at ${employee.company}

${workData}`;

    console.error(`[TOOL RESPONSE] generate_github_bio returned 1 items`);
    return {
      content: [
        {
          type: "text" as const,
          text: `# GitHub Profile Generator — ${employee.firstName} ${employee.lastName}\n\nUse the following verified work data to generate the GitHub profile README:\n\n${prompt}`,
        },
      ],
    };
  });
}
