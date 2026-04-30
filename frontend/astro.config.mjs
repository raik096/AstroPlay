import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

import node from "@astrojs/node";

export default defineConfig({
  site: "https://example.com",
  integrations: [preact()],

  adapter: node({
    mode: "standalone"
  })
});