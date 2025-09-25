import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
  name: "ntp-mcp",
  version: "1.0.0",
});

server.registerTool(
  "get-time",
  {
    description:
      "Vraag datum en tijd op bij een openbare NTP-server.",
  },
  async () => {
    const NTPClient = require("@destinationstransfers/ntp");
    const date = await NTPClient.getNetworkTime({ server: "ntp.time.nl" });

    return {
      content: [
        {
          type: "text",
          text: "Huidige datum: " + date,
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.info("NTP MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
