import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "ghid",
        label: "Ghidul Jurnalistului",
        path: "content/ghid",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}` || 'new-page'
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titlu",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Ordine in meniu",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Continut",
            isBody: true,
          },
        ],
      },
      {
        name: "guvernanta",
        label: "Guvernanta",
        path: "content/guvernanta",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titlu",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Continut",
            isBody: true,
          },
        ],
      },
    ],
  },
});
