import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { IconManager } from "sanity-plugin-icon-manager";
import { markdownSchema } from "sanity-plugin-markdown";
import { resolve } from "./src/sanity/resolve";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "recursivepaws",
  title: "Vera Gonzalez",
  // sanity CLI only exposes SANITY_STUDIO_* env vars, so fall back for `sanity deploy`
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "vhh501ab",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool(),
    visionTool(),
    markdownSchema(),
    IconManager({
      inlineSvg: true,
    }),
    presentationTool({
      resolve,
      // hosted studio has no site at its own origin
      previewUrl: location.hostname.endsWith(".sanity.studio")
        ? "https://vera.lgbt"
        : location.origin,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
