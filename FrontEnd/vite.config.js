import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,  // Frontend runs on port 5173
    hmr: {
      protocol: 'ws',  // WebSocket protocol
      host: 'localhost',
      clientPort: 5173, // Ensure this matches the port Vite is running on
    },
  },
});
