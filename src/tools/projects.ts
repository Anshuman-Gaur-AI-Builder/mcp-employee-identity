import { z } from "zod/v4";
import { getEmployee } from "../data/mockEmployee.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerProjectsTool(server: McpServer): void {
  server.registerTool("get_my_projects", {
    title: "Get My Projects",
    description:
      "Returns an employee's delivered projects including role, outcomes, technologies used, and team size. Data sourced from project management and delivery records.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] get_my_projects with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    let output = `# Projects — ${employee.firstName} ${employee.lastName}\n\n`;

    for (const project of employee.projects) {
      output += `## ${project.name} [${project.status}]\n`;
      output += `**Role:** ${project.role} · **Team size:** ${project.teamSize}\n`;
      output += `**Timeline:** ${project.startDate} → ${project.endDate}\n\n`;
      output += `${project.description}\n\n`;

      output += "**Outcomes:**\n";
      for (const outcome of project.outcomes) {
        output += `- ${outcome}\n`;
      }

      output += `\n**Technologies:** ${project.technologies.join(", ")}\n\n---\n\n`;
    }

    console.error(`[TOOL RESPONSE] get_my_projects returned ${employee.projects.length} items`);
    return { content: [{ type: "text" as const, text: output }] };
  });
}
