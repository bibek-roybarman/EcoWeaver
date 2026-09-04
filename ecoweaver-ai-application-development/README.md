# EcoWeaver AI

**An AI-powered urban ecological planning platform that helps cities understand how development affects canopy-dependent wildlife before construction happens.**

![EcoWeaver AI](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)

## 🚀 Quick Deploy

**Deploy in 5 minutes:**

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Vercel
npm i -g vercel && vercel --prod

# 3. Add Postgres (via Vercel dashboard)
# 4. Done!
```

**→ [Complete Deployment Guide](HOSTING_GUIDE.md)** | **→ [Quick Deploy](DEPLOY_NOW.md)**

## 🌳 Product Vision

> **"Don't just map the city. Understand the ecosystem living inside it."**

EcoWeaver AI combines GIS, AI, ecological network analysis, and interactive visualization to help urban planners, governments, conservation organizations, and developers understand ecological consequences BEFORE infrastructure decisions are finalized.

## ✨ Key Features

### 🗺️ **Interactive Eco Map**
- Real-time visualization of urban canopy networks
- Individual tree tracking with ecological value assessment
- Wildlife corridor mapping
- Critical node identification

### 🎯 **Canopy Guardian**
- Automated monitoring of habitat connectivity
- Vulnerable corridor detection
- Real-time ecological health metrics
- Species-specific corridor analysis

### 🔮 **Habitat Simulator** (Flagship Feature)
- Remove trees and watch connectivity change in real-time
- Infrastructure impact simulation
- Before/after ecological metrics
- Interactive scenario modeling

### 🎭 **Nature's Domino**
- Visual storytelling of ecological cascades
- Step-by-step impact visualization
- Educational ecological consequence mapping

### 🤖 **AI Ecological Analysis**
- OpenAI-powered impact explanations
- Plain-language recommendations
- Evidence-based intervention suggestions
- Scenario-specific guidance

### 📊 **Professional Reports**
- Ecological impact report cards
- Comprehensive metrics and visualizations
- Actionable recommendations
- Stakeholder-ready documentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push database schema
npx drizzle-kit push

# Seed demo data (optional)
curl -X POST http://localhost:3000/api/seed

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎬 Demo Mode

Experience the complete workflow:

1. Visit `/simulator?demo=cubbon-park`
2. Tree #21 is automatically selected
3. Click "Simulate Tree Removal"
4. Watch connectivity drop from 82% → 56%
5. Explore the broken Grey Slender Loris corridor
6. View AI recommendations
7. Generate ecological report card

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Drizzle ORM
- **Maps**: Leaflet, OpenStreetMap
- **Network Analysis**: Custom graph-based connectivity engine
- **Visualization**: React Flow, Recharts
- **Animation**: Framer Motion
- **AI**: OpenAI API (when configured)
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── map/                  # Interactive eco map
│   ├── simulator/            # Habitat simulator
│   ├── canopy-guardian/      # Monitoring dashboard
│   ├── domino/               # Nature's Domino visualization
│   ├── reports/              # Report generation
│   ├── about/                # About page
│   └── api/                  # API routes
│       ├── trees/
│       ├── simulations/
│       └── seed/
├── components/
│   ├── Navigation.tsx
│   └── EcoMap.tsx
├── lib/
│   ├── demo-data.ts          # Cubbon Park demo dataset
│   ├── simulation-engine.ts  # Connectivity calculations
│   ├── seed.ts               # Database seeding
│   └── utils.ts
├── db/
│   ├── index.ts
│   └── schema.ts             # Database schema
└── types/
    └── index.ts
```

## 🗄️ Database Schema

The platform uses a comprehensive relational schema:

- **users** - User accounts and roles
- **projects** - Ecological assessment projects
- **trees** - Individual tree tracking with spatial data
- **species** - Wildlife species database
- **corridors** - Wildlife movement corridors
- **simulations** - Scenario simulations
- **simulation_actions** - Actions within simulations
- **simulation_results** - Calculated impacts
- **reports** - Generated impact reports
- **infrastructure** - Buildings, roads, etc.

## 🌍 Demo Data

The platform ships with a realistic demo dataset for **Cubbon Park, Bengaluru**:

- 12 sample trees with varying ecological values
- **Tree #21**: 74-year Rain Tree (critical node)
- Grey Slender Loris primary corridor
- 4 species profiles
- Baseline connectivity: 82%

**Note**: Demo data is synthetic and clearly labeled. Not real-world measurements.

## 🎯 Use Cases

- **Urban Planners**: Pre-construction ecological impact assessment
- **Municipal Governments**: Balance development with biodiversity
- **Conservation NGOs**: Data-driven corridor protection
- **Real Estate Developers**: Ecologically sensitive design
- **Architects**: Site planning with ecological intelligence
- **Researchers**: Urban biodiversity analysis

## 🔮 Roadmap

### ✅ Current (MVP)
- Interactive ecological maps
- Tree database and connectivity analysis
- Habitat simulator
- Nature's Domino visualization
- AI recommendations
- Report generation

### 🚀 V2 (Next)
- Real satellite data integration
- Multi-city support
- Advanced species modeling
- Historical canopy analysis
- Enhanced simulation engine

### 🌟 V3 (Vision)
- City-wide ecological digital twins
- Predictive development analysis
- Automated planning recommendations
- IoT sensor integration
- API for third-party tools

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Build
npm run build

# Start production server
npm start
```

## 📝 API Endpoints

- `GET /api/trees` - List all trees
- `POST /api/trees` - Create tree
- `GET /api/simulations` - List simulations
- `POST /api/simulations` - Create simulation
- `POST /api/seed` - Seed demo data

## 🤝 Contributing

EcoWeaver AI is a demo platform built for the Multispecies Hackathon. For production use or collaboration opportunities, please contact the team.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the environmental storytelling of Elephant Academy's Multispecies Hackathon
- Built with ❤️ for urban biodiversity conservation
- Demo data structure inspired by real urban forest assessment methodologies

## 📧 Contact

For inquiries about using EcoWeaver AI for your city or project, reach out to the development team.

---

**Every road changes a city. Every tree changes an ecosystem.**  
**EcoWeaver helps us understand both.**

🌳 Built with Next.js • 🗺️ Powered by ecological intelligence • 🤖 Enhanced by AI
