# EcoWeaver AI - Complete Hosting Guide

## 🚀 Deployment Options

EcoWeaver AI can be hosted in several ways. Choose based on your needs:

| Option | Best For | Cost | Difficulty |
|--------|----------|------|------------|
| **Vercel** | Quick demo, free tier | Free | ⭐ Easy |
| **Railway** | Full production, PostgreSQL included | ~$5/mo | ⭐⭐ Medium |
| **Render** | Full production, free tier | Free-$7/mo | ⭐⭐ Medium |
| **DigitalOcean** | Full control | ~$12/mo | ⭐⭐⭐ Advanced |

---

## ✅ **RECOMMENDED: Vercel + Vercel Postgres**

### Why Vercel?
- Built by Next.js creators
- Automatic deployments from Git
- Free tier (perfect for demos/hackathons)
- Built-in PostgreSQL support
- Zero configuration

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - EcoWeaver AI"

# Create GitHub repository (via GitHub.com)
# Then connect your local repo:
git remote add origin https://github.com/YOUR-USERNAME/ecoweaver-ai.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Web Interface (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub account)
3. Click **"Add New Project"**
4. Select your `ecoweaver-ai` repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click **"Deploy"**

**Option B: CLI (Faster for developers)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: ecoweaver-ai
# - Directory: ./
# - Override settings? No

# Production deployment
vercel --prod
```

#### 3. Add PostgreSQL Database

1. In Vercel dashboard, go to your project
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Name it: `ecoweaver-db`
6. Click **"Create"**

Vercel automatically adds these environment variables:
```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
```

#### 4. Update Environment Variables

1. In Vercel dashboard → **"Settings"** → **"Environment Variables"**
2. Add `DATABASE_URL`:
   - **Name**: `DATABASE_URL`
   - **Value**: Use the `POSTGRES_URL` value from Storage tab
3. Click **"Save"**

#### 5. Push Database Schema

```bash
# Install Vercel Postgres SDK
npm install @vercel/postgres

# Set environment variable locally (for schema push)
export DATABASE_URL="your-postgres-url-from-vercel"

# Push schema to Vercel Postgres
npx drizzle-kit push
```

#### 6. Seed Demo Data (Optional)

```bash
# After deployment, visit:
https://your-app.vercel.app/api/seed

# Or use curl:
curl -X POST https://your-app.vercel.app/api/seed
```

#### 7. Test Your Deployment

Visit:
```
https://your-app.vercel.app
https://your-app.vercel.app/simulator?demo=cubbon-park
```

### ✅ Done! Your app is live.

---

## 🚂 **Option 2: Railway** (Recommended for Production)

### Why Railway?
- PostgreSQL included
- Simple deployment
- Generous free tier → $5/month
- Auto-scaling

### Step-by-Step

#### 1. Push to GitHub
(Same as Vercel step 1)

#### 2. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `ecoweaver-ai` repository
5. Railway auto-detects Next.js

#### 3. Add PostgreSQL

1. In your project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway creates a database

#### 4. Connect Database

1. Click on your Next.js service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add **"Reference"** → Select PostgreSQL → `DATABASE_URL`
5. Railway automatically links it

#### 5. Push Schema

```bash
# Get database URL from Railway
# Railway dashboard → PostgreSQL → Connect → Copy DATABASE_URL

# Set locally
export DATABASE_URL="postgresql://..."

# Push schema
npx drizzle-kit push
```

#### 6. Deploy

```bash
# Railway auto-deploys on git push
git push origin main

# Or redeploy manually in Railway dashboard
```

#### 7. Custom Domain (Optional)

1. Railway dashboard → Your service → **"Settings"**
2. Click **"Generate Domain"**
3. Or add custom domain

### ✅ Done! Live at: `your-app.railway.app`

---

## 🎨 **Option 3: Render**

### Why Render?
- Free tier available
- Simple interface
- PostgreSQL included (free tier: 90 days, then $7/mo)

### Step-by-Step

#### 1. Push to GitHub
(Same as above)

#### 2. Create PostgreSQL Database

1. Go to [render.com](https://render.com)
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name**: ecoweaver-db
   - **Database**: ecoweaver
   - **User**: ecoweaver
   - **Region**: Choose closest
   - **Plan**: Free (or Starter $7/mo)
4. Click **"Create Database"**
5. Copy the **"Internal Database URL"**

#### 3. Deploy Web Service

1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: ecoweaver-ai
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 4. Add Environment Variables

1. In Web Service settings → **"Environment"**
2. Add:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste Internal Database URL
3. Click **"Save Changes"**

#### 5. Push Schema

```bash
# Use the database URL from Render
export DATABASE_URL="postgresql://..."

# Push schema
npx drizzle-kit push
```

### ✅ Done! Live at: `your-app.onrender.com`

---

## 🌊 **Option 4: DigitalOcean App Platform**

### Quick Deploy

```bash
# Install doctl CLI
# Follow: https://docs.digitalocean.com/reference/doctl/how-to/install/

# Deploy
doctl apps create --spec .do/app.yaml
```

Create `.do/app.yaml`:
```yaml
name: ecoweaver-ai
services:
- name: web
  github:
    repo: YOUR-USERNAME/ecoweaver-ai
    branch: main
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  
databases:
- name: db
  engine: PG
  production: true
```

---

## 🐳 **Option 5: Docker + Any Cloud Provider**

### Create Dockerfile

```dockerfile
# Create this file: Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose (with PostgreSQL)

```yaml
# Create this file: docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/ecoweaver
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=ecoweaver
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Deploy

```bash
# Build and run
docker-compose up -d

# Push schema
docker-compose exec app npx drizzle-kit push

# Seed data
curl -X POST http://localhost:3000/api/seed
```

---

## ⚡ **Quick Deploy Comparison**

### Fastest (5 minutes)
**Vercel** - One-click deploy, auto PostgreSQL
```bash
vercel --prod
```

### Most Features (10 minutes)
**Railway** - Full-stack platform, scaling
```bash
# Just connect GitHub, Railway handles rest
```

### Free Forever (15 minutes)
**Render Free Tier** + **Vercel** (frontend only)
```bash
# Render: Backend + DB
# Vercel: Frontend (static export)
```

---

## 🔐 **Environment Variables Needed**

### Required
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

### Optional (for full features)
```env
OPENAI_API_KEY=sk-...                    # For AI recommendations
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...        # For enhanced maps (optional)
```

---

## 📊 **Post-Deployment Checklist**

After deploying, verify:

- [ ] Home page loads (`/`)
- [ ] Map page works (`/map`)
- [ ] Simulator runs (`/simulator?demo=cubbon-park`)
- [ ] Health check passes (`/api/health`)
- [ ] Database connected (no errors)
- [ ] All pages accessible
- [ ] Demo mode works

### Quick Test

```bash
# Replace with your URL
export APP_URL="https://your-app.vercel.app"

# Test health
curl $APP_URL/api/health

# Should return: {"ok":true}

# Seed data
curl -X POST $APP_URL/api/seed

# Visit demo
open $APP_URL/simulator?demo=cubbon-park
```

---

## 🎯 **Recommended Setup for Hackathon**

### Best Option: Vercel (Free, Fast, Professional)

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Vercel (via web UI)
# - Import GitHub repo
# - Add Vercel Postgres
# - Deploy

# 3. Push schema
npx drizzle-kit push

# 4. Seed data
curl -X POST https://your-app.vercel.app/api/seed

# Total time: ~10 minutes
```

**Your app is live!**
- Share URL: `https://your-app.vercel.app`
- Demo URL: `https://your-app.vercel.app/simulator?demo=cubbon-park`

---

## 🆘 **Troubleshooting**

### Build Fails

**Error**: "Module not found"
```bash
# Solution: Verify all dependencies installed
npm install
```

**Error**: "TypeScript errors"
```bash
# Solution: Check types locally first
npm run typecheck
```

### Database Connection Fails

**Error**: "connect ECONNREFUSED"
```bash
# Solution: Verify DATABASE_URL is set
echo $DATABASE_URL

# Check in deployment platform's environment variables
```

### Map Not Loading

**Error**: Leaflet CSS not found
```bash
# Solution: Ensure globals.css imports Leaflet
# src/app/globals.css should have:
@import "leaflet/dist/leaflet.css";
```

### API Routes 404

**Error**: `/api/health` returns 404
```bash
# Solution: Ensure build completed
npm run build

# Check api folder exists:
ls src/app/api/
```

---

## 🎓 **Platform-Specific Tips**

### Vercel
- Auto-deploys on git push
- Preview deployments for branches
- Analytics available (paid)
- Edge functions supported

### Railway
- Environment variables auto-sync
- Built-in monitoring
- Easy database backups
- Logs accessible

### Render
- Free tier sleeps after 15 min inactivity
- First request after sleep is slow
- Upgrade to paid for always-on

---

## 📱 **Custom Domain Setup**

### Vercel
1. Project settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides)

### Railway
1. Service settings → Networking
2. Add custom domain
3. Update CNAME to Railway

### Render
1. Service settings → Custom Domain
2. Add domain
3. Update DNS records

---

## 🔒 **Security Checklist**

Before going live:

- [ ] Environment variables are secret (not in code)
- [ ] `.env` in `.gitignore`
- [ ] Database has strong password
- [ ] HTTPS enabled (auto on most platforms)
- [ ] API rate limiting considered
- [ ] CORS configured if needed

---

## 💰 **Cost Estimates**

### Free Tier (Hackathon/Demo)
- **Vercel**: Free (hobby plan)
- **Render**: Free web service + Free DB (90 days)
- **Railway**: $5 credit/month free
- **Total**: $0/month

### Production (Small Scale)
- **Vercel Pro**: $20/month
- **Railway**: ~$5-10/month
- **Render**: $7/month (DB) + Free (web)
- **Total**: $5-20/month

### Production (Medium Scale)
- **Railway**: ~$20/month
- **Render**: $25/month
- **DigitalOcean**: ~$12/month
- **Total**: $12-25/month

---

## 🚀 **Ready to Deploy?**

### Fastest Path (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Add Vercel Postgres in dashboard

# 4. Push schema
npx drizzle-kit push

# 5. Seed data
curl -X POST https://your-app.vercel.app/api/seed

# ✅ DONE! Share your link!
```

---

## 📞 **Need Help?**

1. Check deployment platform docs:
   - [Vercel Docs](https://vercel.com/docs)
   - [Railway Docs](https://docs.railway.app)
   - [Render Docs](https://render.com/docs)

2. Review build logs in platform dashboard

3. Test locally first:
   ```bash
   npm run build
   npm start
   ```

4. Check environment variables are set

---

## 🎉 **You're Live!**

Once deployed, share:
- **Main URL**: `https://your-app.vercel.app`
- **Demo URL**: `https://your-app.vercel.app/simulator?demo=cubbon-park`

**Your EcoWeaver AI platform is now accessible worldwide!** 🌍🌳

---

*Recommended: Start with Vercel for hackathons, migrate to Railway/Render for production.*
