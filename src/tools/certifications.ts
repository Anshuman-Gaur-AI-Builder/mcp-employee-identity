import { z } from "zod/v4";
import { getEmployee } from "../data/mockEmployee.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerCertificationsTool(server: McpServer): void {
  server.registerTool("get_my_certifications", {
    title: "Get My Certifications",
    description:
      "Returns an employee's professional certifications including issuing bodies, dates earned, expiration status, and credential verification links.",
    inputSchema: {
      employeeId: z.string().describe("Employee ID (e.g., EMP-2847)"),
    },
  }, async ({ employeeId }) => {
    console.error(`[TOOL CALLED] get_my_certifications with args: ${JSON.stringify({ employeeId })}`);
    const employee = getEmployee(employeeId);
    if (!employee) {
      return {
        content: [{ type: "text" as const, text: `Employee ${employeeId} not found.` }],
        isError: true,
      };
    }

    let output = `# Certifications — ${employee.firstName} ${employee.lastName}\n\n`;

    for (const cert of employee.certifications) {
      const status = cert.expirationDate
        ? `Valid until ${cert.expirationDate}`
        : "No expiration";

      output += `## ${cert.name}\n`;
      output += `- **Issued by:** ${cert.issuingBody}\n`;
      output += `- **Date earned:** ${cert.dateEarned}\n`;
      output += `- **Status:** ${status}\n`;
      output += `- **Credential ID:** ${cert.credentialId}\n`;
      output += `- **Verify:** ${cert.verificationUrl}\n\n`;
    }

    console.error(`[TOOL RESPONSE] get_my_certifications returned ${employee.certifications.length} items`);
    return { content: [{ type: "text" as const, text: output }] };
  });
}
