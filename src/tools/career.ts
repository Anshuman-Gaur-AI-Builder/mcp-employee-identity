import { z } from "zod/v4";
import { getEmployee } from "../data/mockEmployee.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerCareerTool(server: McpServer): void {
  server.registerTool("get_my_career_history", {
    title: "Get My Career History",
    description:
      "Returns an employee's career history including roles, tenure, promotions, reporting structure, and key highlights at each level.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] get_my_career_history with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    let output = `# Career History — ${employee.firstName} ${employee.lastName}\n`;
    output += `**${employee.company}** · Hired ${employee.hireDate}\n\n`;

    for (const role of [...employee.careerHistory].reverse()) {
      const tenure = role.endDate
        ? `${role.startDate} → ${role.endDate}`
        : `${role.startDate} → Present`;

      output += `## ${role.title}${role.isPromotion ? " ⬆ Promoted" : ""}\n`;
      output += `${role.department} · ${tenure}\n`;
      output += `${role.location} · Reports to: ${role.reportsTo}\n\n`;

      for (const highlight of role.highlights) {
        output += `- ${highlight}\n`;
      }
      output += "\n";
    }

    console.error(`[TOOL RESPONSE] get_my_career_history returned ${employee.careerHistory.length} items`);
    return { content: [{ type: "text" as const, text: output }] };
  });
}
