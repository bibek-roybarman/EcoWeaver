# EcoWeaver AI - Development Guide

## 🏗️ Architecture Overview

EcoWeaver AI is a full-stack ecological planning platform built with modern web technologies and a focus on real-time interactivity.

## 🎯 Core Workflow

The flagship user journey demonstrates the platform's capabilities:

```
1. User opens EcoWeaver AI
2. Selects Cubbon Park, Bengaluru
3. Views ecological map with tree overlays
4. Clicks Tree #21 (74-year Rain Tree)
5. Views detailed tree information panel
6. Clicks "Simulate Removal"
7. System calculates network impact
8. Connectivity drops: 82% → 56%
9. Grey Slender Loris corridor breaks
10. Nature's Domino animation shows cascade
11. AI generates recommendations
12. User generates ecological report card
```

## 🗺️ Application Pages

### Home (`/`)
- Cinematic landing page
- Animated metrics counters
- Product philosophy
- Use cases
- Demo CTA

### Eco Map (`/map`)
- Full-screen interactive Leaflet map
- Tree markers with custom icons
- Click-to-select tree functionality
- Side panel with tree details
- Layer controls and legend

### Habitat Simulator (`/simulator`)
- **Most important feature**
- Split-screen: Map + Control Panel
- Real-time simulation engine
- Before/after metrics display
- Demo mode support (`?demo=cubbon-park`)

### Canopy Guardian (`/canopy-guardian`)
- Ecological monitoring dashboard
- Real-time connectivity metrics
- Corridor vulnerability analysis
- Threat level indicators

### Nature's Domino (`/domino`)
- Step-by-step cascade visualization
- Animated sequence player
- Educational storytelling
- Ecological consequence mapping

### Reports (`/reports`)
- Professional report cards
- Metrics visualization
- AI recommendations
- Download/share functionality

### About (`/about`)
- Mission and vision
- Product philosophy
- Technology stack
- Roadmap

## 🧩 Component Architecture

### Navigation (`Navigation.tsx`)
- Persistent top navigation
- Route highlighting
- Responsive design

### EcoMap (`EcoMap.tsx`)
- Leaflet integration
- Custom tree markers
- Interactive tooltips
- Dynamic icon updates

### LoadingSpinner (`LoadingSpinner.tsx`)
- Reusable loading state
- Customizable message

## 🔧 Simulation Engine

Located in `src/lib/simulation-engine.ts`, the core ecological modeling system:

### Features
- **Graph-based network analysis**
- **Haversine distance calculations**
- **Connected components detection**
- **Connectivity scoring algorithm**
- **Canopy coverage estimation**

### Algorithm

```typescript
1. Build connectivity graph from trees
   - Nodes: Individual trees
   - Edges: Canopy connections (< 25m or canopy overlap)

2. Calculate baseline metrics
   - Average degree (connections per tree)
   - Largest connected component
   - Connectivity score (0-100)

3. Apply simulation actions
   - Remove trees
   - Add infrastructure
   - Modify environment

4. Recalculate network
   - New connectivity score
   - Component fragmentation
   - Critical node loss

5. Return results
   - Before/after comparison
   - Impact metrics
   - Network changes
```

### Connectivity Score Formula

```
Connectivity = (degreeScore * 0.5) + (componentScore * 0.5)

where:
  degreeScore = min(avgDegree / 4, 1) * 50
  componentScore = (largestComponent / totalNodes) * 50
```

## 📊 Data Models

### Tree
```typescript
{
  id: number
  treeNumber: string       // e.g., "TREE-021"
  species: string          // e.g., "Rain Tree"
  age: number             // years
  canopyRadius: number    // meters
  ecologicalValue: string // critical|high|medium|low
  connectivityContribution: number // percentage
  lat: number
  lng: number
  isCriticalNode: boolean
}
```

### Simulation Result
```typescript
{
  connectivityBefore: number    // 0-100
  connectivityAfter: number     // 0-100
  canopyBefore: number         // percentage
  canopyAfter: number          // percentage
  corridorsBefore: number      // count
  corridorsAfter: number       // count
  criticalNodesLost: number
  affectedTrees: number
  networkChanges: object
}
```

## 🎨 Design System

### Colors
- **Primary Green**: `#16a34a` (green-600)
- **Secondary**: `#059669` (emerald-600)
- **Accent**: `#10b981` (emerald-500)
- **Warning**: `#f59e0b` (amber-500)
- **Danger**: `#dc2626` (red-600)
- **Info**: `#2563eb` (blue-600)

### Typography
- **Headlines**: Bold, 2xl-7xl
- **Body**: Regular, base-lg
- **Labels**: Medium, sm-xs, uppercase tracking

### Components
- **Cards**: White bg, rounded-xl, shadow-sm
- **Buttons**: Rounded-lg, font-semibold, transition-colors
- **Badges**: Rounded-lg, uppercase, font-bold

## 🗄️ Database Operations

### Schema Push
```bash
npx drizzle-kit push
```

### Seed Demo Data
```bash
curl -X POST http://localhost:3000/api/seed
```

### Direct SQL
```bash
psql $DATABASE_URL -c "SELECT * FROM trees;"
```

## 🔌 API Design

### REST Conventions
- `GET /api/resource` - List
- `GET /api/resource/:id` - Get one
- `POST /api/resource` - Create
- `PUT /api/resource/:id` - Update
- `DELETE /api/resource/:id` - Delete

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

## 🧪 Testing Workflow

### Type Checking
```bash
npm run typecheck
```

### Build Validation
```bash
npm run build
```

### Manual Testing
1. Start dev server: `npm run dev`
2. Visit `/simulator?demo=cubbon-park`
3. Select Tree #21
4. Click "Simulate Removal"
5. Verify connectivity drop
6. Check all metrics update
7. Test navigation
8. Test responsive layouts

## 🚀 Deployment Checklist

- [ ] All TypeScript errors resolved
- [ ] Production build passes
- [ ] Database schema pushed
- [ ] Environment variables configured
- [ ] Demo data seeded (optional)
- [ ] Health check passing (`/api/health`)
- [ ] All routes accessible
- [ ] Map loads correctly
- [ ] Simulation calculates properly

## 🔐 Environment Variables

Required:
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

Optional:
```env
OPENAI_API_KEY=sk-... # For AI analysis features
NEXT_PUBLIC_MAPBOX_TOKEN=pk... # For enhanced maps
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640-1024px (sm-lg)
- **Desktop**: > 1024px (lg+)

### Mobile Considerations
- Bottom sheets for panels
- Simplified map controls
- Stacked layouts
- Touch-optimized interactions

## ⚡ Performance Optimization

### Map
- Lazy load Leaflet client-side
- Memoize marker creation
- Debounce pan/zoom events

### Data
- Memo heavy calculations
- Cache API responses
- Lazy load components
- Progressive image loading

### Bundle
- Dynamic imports for heavy libraries
- Tree-shaking unused code
- Code splitting by route

## 🐛 Common Issues

### Map not showing
- Ensure `leaflet/dist/leaflet.css` imported
- Check Leaflet loaded client-side only
- Verify coordinates valid

### Simulation not calculating
- Check trees array has data
- Verify SimulationEngine imported
- Console log intermediate steps

### Build failures
- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check TypeScript errors
- Verify all imports resolve

## 🎓 Learning Resources

### Key Concepts
- **Graph Theory**: Connected components, node degree
- **GIS**: Spatial coordinates, distance calculations
- **Ecology**: Habitat connectivity, corridor analysis
- **Network Analysis**: Centrality, fragmentation

### References
- Next.js App Router docs
- Drizzle ORM documentation
- Leaflet API reference
- React Flow documentation

## 🔮 Future Enhancements

### Short-term
- Real satellite imagery
- Multiple projects
- User authentication
- Advanced filters

### Medium-term
- Historical analysis
- Species-specific models
- Weather integration
- Mobile app

### Long-term
- Predictive AI
- City-wide digital twins
- API ecosystem
- Real-time sensors

## 💡 Best Practices

### Code
- Use TypeScript strictly
- Follow React hooks rules
- Memoize expensive operations
- Handle loading states

### UX
- Provide immediate feedback
- Show loading indicators
- Clear error messages
- Intuitive navigation

### Data
- Validate inputs
- Handle edge cases
- Cache when appropriate
- Seed demo data clearly

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📞 Support

For technical questions or issues:
- Check documentation
- Review code comments
- Test with demo data
- Reach out to team

---

**Happy coding! 🌳**
