import { defineConfig } from "tinacms";

export default defineConfig({
  build: {
    outputFolder: "admin-tina",
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
      // ── BLOG ──────────────────────────────────────────────
      {
        name: "blog",
        label: "Wpisy bloga",
        path: "src/content/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title
                ?.toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "") ?? "",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Opis meta (120–160 znaków)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Data publikacji",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategoria",
            required: true,
            options: [
              "Tech SEO",
              "Strategia",
              "Content",
              "Link Building",
              "Local SEO",
            ],
          },
          {
            type: "image",
            name: "image",
            label: "Zdjęcie okładkowe",
          },
          {
            type: "string",
            name: "readTime",
            label: "Czas czytania (np. 8 min)",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },

      // ── REALIZACJE ────────────────────────────────────────
      {
        name: "realizacje",
        label: "Realizacje (Case Studies)",
        path: "src/content/realizacje",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Opis",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "client",
            label: "Klient (branża)",
          },
          {
            type: "datetime",
            name: "date",
            label: "Data",
          },
          {
            type: "image",
            name: "image",
            label: "Zdjęcie",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },
    ],
  },
});
