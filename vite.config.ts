import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
   // ── Production preview server ──
  preview: {
    // Add every hostname that will reach the container.
    // Replace with your real domain(s); you can also use a RegExp.
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "jigyasa.deolang.com",   // ← your production domain
      // /\\.example\\.com$/   // ← wildcard for sub‑domains
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
