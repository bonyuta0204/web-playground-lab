# Web Playground Lab

A personal playground for experimenting with modern web-based technologies. This repository serves as a single-page static web application where each experiment is accessible via its own route.

## Overview

This repository is designed to be a living notebook for frontend R&D, providing an isolated environment for testing out new web APIs and JavaScript libraries, creating visual representations of algorithms and data, and improving hands-on understanding of browser capabilities and frontend performance.

## Experiments

The following experiments are currently available:

- **Fullscreen API Demo** (`/fullscreen`) - Explore the browser's Fullscreen API with a simple interactive demo.
- **D3.js Bar Chart** (`/d3-bar-chart`) - Interactive data visualization using the D3.js library.
- **DFS Algorithm Visualization** (`/dfs-visualization`) - Visual representation of the Depth-First Search graph traversal algorithm.

## Tech Stack

- **Frontend Framework:** React
- **Dev Server and Bundler:** Vite
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bonyuta0204/web-playground-lab.git
cd web-playground-lab

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Development

The development server will start at `http://localhost:5173` by default.

### Building for Production

```bash
pnpm build
```

This will generate static files in the `dist` directory that can be deployed to any static hosting service like GitHub Pages or Vercel.

## Project Structure

```
web-playground-lab/
├── public/                  # Static assets
├── src/
│   ├── components/          # Shared React components
│   ├── experiments/         # Each experiment in its own file
│   │   ├── FullscreenDemo.tsx
│   │   ├── D3BarChart.tsx
│   │   └── DFSVisualization.tsx
│   ├── App.tsx             # Routing and layout
│   └── main.tsx            # Entry point
├── index.html              # HTML shell
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # For Tailwind
├── vite.config.ts          # Vite configuration
└── package.json
```

## Adding New Experiments

To add a new experiment:

1. Create a new component in the `src/experiments/` directory
2. Add a new route in `src/App.tsx`
3. Add the experiment to the navigation in `src/components/Layout.tsx`
4. Add the experiment card to the home page in `src/components/Home.tsx`

## License

This project is open source and available under the [MIT License](LICENSE).
