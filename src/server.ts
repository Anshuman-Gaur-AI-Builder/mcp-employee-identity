#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSkillsTool } from "./tools/skills.js";
import { registerCareerTool } from "./tools/career.js";
import { registerCertificationsTool } from "./tools/certifications.js";
import { registerProjectsTool } from "./tools/projects.js";
import { registerIdentityTools } from "./tools/identity.js";

const server = new McpServer({
  name: "mcp-employee-identity",
  version: "1.0.0",
});

// Register all tools
registerSkillsTool(server);
registerCareerTool(server);
registerCertificationsTool(server);
registerProjectsTool(server);
registerIdentityTools(server);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mcp-employee-identity server running on stdio");
}

main().catch((error: unknown) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
