import { z } from "zod/v4";
import { getEmployee } from "../data/mockEmployee.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerSkillsTool(server: McpServer): void {
  server.registerTool("get_my_skills", {
    title: "Get My Skills",
    description:
      "Returns an employee's verified skills with proficiency levels, years of experience, and assessment details. Data sourced from HCM skills assessments and project delivery records.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] get_my_skills with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    const skillsByCategory = new Map<string, typeof employee.skills>();
    for (const skill of employee.skills) {
      const existing = skillsByCategory.get(skill.category) ?? [];
      existing.push(skill);
      skillsByCategory.set(skill.category, existing);
    }

    let output = `# Verified Skills — ${employee.firstName} ${employee.lastName}\n`;
    output += `**${employee.currentTitle}** at ${employee.company}\n\n`;

    for (const [category, skills] of skillsByCategory) {
      output += `## ${category}\n`;
      for (const skill of skills) {
        output += `- **${skill.name}** — ${skill.proficiencyLevel} · ${skill.yearsOfExperience} yrs\n`;
        output += `  Verified by: ${skill.verifiedBy} (${skill.lastAssessed})\n`;
      }
      output += "\n";
    }

    console.error(`[TOOL RESPONSE] get_my_skills returned ${employee.skills.length} items`);
    return { content: [{ type: "text" as const, text: output }] };
  });
}
