# 🚀 Deploy EcoWeaver AI in 10 Minutes

## ⚡ Fastest Method: Vercel (Recommended)

### Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git
git init
git add .
git commit -m "Deploy EcoWeaver AI"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/ecoweaver-ai.git
git push -u origin main
```

### Step 2: Deploy to Vercel (3 minutes)

**Via Web (Easiest):**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign up with GitHub
3. Click "Import" on your `ecoweaver-ai` repo
4. Click "Deploy"
5. ✅ Done! Your app is live

**Via CLI (Fastest):**

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Step 3: Add Database (3 minutes)

1. In Vercel dashboard → Your project
2. Go to "Storage" tab
3. Click "Create Database" → "Postgres"
4. Name it `ecoweaver-db`
5. Click "Create"

### Step 4: Push Schema (1 minute)

```bash
# Get DATABASE_URL from Vercel Storage tab
# Then run:
npx drizzle-kit push
```

### Step 5: Seed Demo Data (1 minute)

```bash
# Visit your deployed app's seed endpoint:
curl -X POST https://your-app.vercel.app/api/seed

# Or visit in browser:
https://your-app.vercel.app/api/seed
```

---

## ✅ Done! Test Your Deployment

Visit:
- **Home**: `https://your-app.vercel.app`
- **Demo**: `https://your-app.vercel.app/simulator?demo=cubbon-park`
- **Health**: `https://your-app.vercel.app/api/health`

---

## 🎯 Even Faster? Use Vercel CLI One-Liner

```bash
# Install, login, and deploy
npm install -g vercel && vercel login && vercel --prod

# Add Postgres via dashboard
# Push schema: npx drizzle-kit push
# Seed: curl -X POST https://your-app.vercel.app/api/seed
```

---

## 🆘 Troubleshooting

### Build fails?
```bash
# Test locally first:
npm run build
npm start
```

### Database not connecting?
1. Check Environment Variables in Vercel
2. Verify `DATABASE_URL` is set
3. Re-run `npx drizzle-kit push`

### Map not loading?
- First load might be slow (cold start)
- Refresh the page
- Check browser console for errors

---

## 📱 Share Your Demo

Once deployed, share these links:

- **Landing Page**: `https://your-app.vercel.app`
- **Live Demo**: `https://your-app.vercel.app/simulator?demo=cubbon-park`
- **GitHub Repo**: `https://github.com/YOUR-USERNAME/ecoweaver-ai`

---

## 🎉 You're Live!

Your EcoWeaver AI platform is now:
✅ Deployed globally  
✅ Running on HTTPS  
✅ Auto-scaling  
✅ Free (Vercel hobby plan)  

**Total time: ~10 minutes**

---

## 🔄 Updates & Redeployment

Every time you push to GitHub, Vercel auto-deploys:

```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main

# Vercel automatically redeploys!
```

---

## 🌟 Next Steps

- [ ] Add custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Set up OpenAI API key for AI features (optional)
- [ ] Share with judges/users
- [ ] Collect feedback

---

**Need detailed instructions?** See [HOSTING_GUIDE.md](HOSTING_GUIDE.md)

**Ready to present?** See [HACKATHON_DEMO.md](HACKATHON_DEMO.md)

🌳 **Your ecological intelligence platform is live!**
