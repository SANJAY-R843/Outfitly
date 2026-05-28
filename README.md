# AURA -- LUXURY AI FASHION INTELLIGENCE PLATFORM

> **Haute couture meets cyberpunk luxury.** An editorial-grade fashion intelligence system designed to analyze wardrobes, run Claude-powered vision style consultations, and render outfits onto custom-shaded holographic 3D mannequins.

---

## Aesthetic & Design System

AURA is structured with a premium, obsidian-meets-gold dark-magazine aesthetic:
- **Obsidian Black** (`#0A0A0B`) & **Void Black** (`#0F0F13`) surfaces.
- **Liquid Gold** (`#C9A84C`) & **Light Gold Glow** (`#E8C96A`) accents.
- **Electric Ivory** (`#F5F0E8`) for ultra-premium text clarity.
- **Deep Cyberpunk Violet** (`#1A0A2E`) for ambient glow backdrops.
- **Typography**: Heading hierarchies written in elegant serif **Playfair Display**, and secondary tags/body items in high-readability sans-serif **DM Sans**.
- **Interactive Surfaces**: Micro-animated glassmorphism overlays, magnetic cursor actions, dragging mechanics, and multi-axis 3D particle fields.

---

## Setup & Launch Instructions

### Prerequisites
- **Node.js** (v18+ recommended)
- **NPM** (v9+ recommended)
- **Anthropic API Key**: Obtain a key from Anthropic for Claude Sonnet 4.

### Quick Start
1. **Initialize Configurations**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   PORT=5000
    NODE_ENV=development
    ANTHROPIC_API_KEY=your_key_here
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. **Install All Monorepo Dependencies**:
   From the root folder, run:
   ```bash
   npm run install:all
   ```

3. **Start Development Servers (Express + React Vite)**:
   Launch both backend and frontend applications concurrently using a single command:
   ```bash
   npm run dev
   ```

4. **Access the Interface**:
   - **Frontend client** is accessible at: `http://localhost:5173`
   - **Backend server** is running at: `http://localhost:5000`

---

## Technical Infrastructure

### Backend (server/)
- **Node.js + Express**: Dynamic API routing with integrated JSON rate-limit safety guards.
- **Anthropic Claude**: Powered by `claude-sonnet-4-20250514` for multimodal vision and styling intelligence.
- **Multer**: Multi-part data upload buffer processing.
- **Sharp**: Automatic image compressor, preparing base64 buffers for Claude Vision payloads.

### Frontend (client/)
- **Vite & React 18**: Standard modern React pipelines with local proxy mapping.
- **React Three Fiber & Drei**: Dynamic 3D render loop. Manages orbit control hooks, procedural particle coordinates, and canvas lights.
- **Custom Shaders**: Includes vertex-displacement wave calculations for silk-gold fabrics, fresnel/scanline layers for holographic avatars, and procedural noise materials.
- **Framer Motion**: Smooth entry/exit page transitions, drag-to-dock closet builders, and SVG path stroke-drawing loading checkmarks.
- **Zustand & React Query**: Clean server cache hydration and context storage.
