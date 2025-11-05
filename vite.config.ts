import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "vqcpzv9tdm.ap.loclx.io", // ✅ Add your tunnel hostname here
      "localhost",
    ],
    host: true, // ✅ Ensures it listens on all network interfaces
    port: 5173, // or whatever port you’re using
  },
}));
