# Deployment Guide - QR Profile Platform

## 🚀 Deployment Options

Choose one of these platforms to deploy your QR Profile Platform:

1. **Vercel** (Recommended) - Easiest, free tier available
2. **Netlify** - Good alternative, has serverless functions
3. **Railway** - Simple database + app hosting
4. **AWS** - Enterprise option
5. **Self-hosted** - Full control

---

## 🎯 Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- Project code pushed to GitHub

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Select **Import Git Repository**
4. Choose your repository from GitHub
5. Click **Import**

### Step 3: Set Environment Variables

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
ADMIN_EMAIL = admin@example.com
ADMIN_PASSWORD = your_secure_password
GMAIL_USER = your-email@gmail.com
GMAIL_PASSWORD = xxxx xxxx xxxx xxxx
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

### Step 4: Deploy

1. Click **Deploy**
2. Wait for deployment to complete
3. Your app will be live at `your-domain.vercel.app`

### Step 5: Test Production

1. Go to `https://your-domain.vercel.app/admin/login`
2. Login with admin credentials
3. Test creating a profile
4. Test QR code generation and email

---

## 🎯 Option 2: Deploy to Netlify

### Step 1: Connect GitHub

1. Go to https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub
4. Select your repository

### Step 2: Configure Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Step 3: Set Environment Variables

In Netlify, go to **Settings** → **Build & Deploy** → **Environment**

Add all your environment variables (same as Vercel)

### Step 4: Deploy

Click **Deploy**. Your site will build and go live.

### Note for Netlify
You'll need to add this to `next.config.js`:
```javascript
module.exports = {
  reactStrictMode: true,
}
```

---

## 🎯 Option 3: Deploy to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project

1. Click **New Project**
2. Choose **GitHub Repo**
3. Select your repository

### Step 3: Add Postgres (if not using Supabase)

- Click **Add Service**
- Select **Postgres**
- (Skip if using Supabase)

### Step 4: Set Environment Variables

1. Select your project
2. Go to **Variables**
3. Add all your environment variables

### Step 5: Deploy

Railway will automatically deploy on push.

---

## 🔄 Post-Deployment Checklist

### ✅ Verify Core Functionality

1. **Test Admin Login**
   - Navigate to `/admin/login`
   - Login with admin credentials
   - Should see dashboard

2. **Create Test Profile**
   - Click "Create New Profile"
   - Fill in all fields
   - Click "Save"
   - Profile should appear in dashboard

3. **Test QR Code**
   - Click "QR Code" on profile
   - Should see modal with QR code
   - Click "Send via Email"
   - Check email inbox

4. **View Public Profile**
   - Copy the profile link
   - Open in new tab
   - Should see beautiful profile page
   - All links should work

5. **Test Share Features**
   - Click "Copy Link" - should copy to clipboard
   - Click "Download vCard" - should download file
   - Try "Share" button (native sharing)

### ✅ Monitor Errors

1. Check deployment logs
2. Monitor error tracking (Sentry optional)
3. Set up email alerts for issues

---

## 🔐 Security Checklist

Before going live:

- [ ] NEXT_PUBLIC_APP_URL is set to your production domain
- [ ] All sensitive variables are set (ADMIN_PASSWORD, GMAIL_PASSWORD)
- [ ] .env.local is NOT committed to git
- [ ] Database RLS policies are in place
- [ ] Admin login is working
- [ ] CORS is configured properly
- [ ] SSL/TLS is enabled (automatic on Vercel/Netlify)

---

## 📊 Performance Optimization

### Database Queries
- Profiles table has indexes on slug, email, created_at
- RLS policies minimize unnecessary queries
- Consider pagination for large profile lists

### Image Optimization
- Next.js Image component handles optimization
- Upload profile photos to Supabase Storage (optional)

### Caching
- Consider caching profile pages:
```javascript
// In app/profile/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour
```

---

## 🚨 Troubleshooting Deployment

### "Cannot find module" errors
- [ ] All dependencies installed
- [ ] package.json is correct
- [ ] Build command is correct

### Environment variables not found
- [ ] All variables are set in deployment platform
- [ ] Check spelling (case-sensitive)
- [ ] Redeploy after changing variables

### Database connection fails
- [ ] Supabase URL is correct
- [ ] Keys are valid
- [ ] Database is accessible

### Emails not sending
- [ ] GMAIL_PASSWORD is the app password (not regular)
- [ ] GMAIL_USER is correct email
- [ ] Check production logs for errors

### Pages showing 404
- [ ] Make sure Next.js build completed
- [ ] Check routing setup
- [ ] Verify API routes exist

---

## 📈 Scaling Considerations

As your platform grows:

### Database Scaling
- Supabase Free tier: ~500MB storage
- Upgrade to Pro for more: $25/month
- Alternative: Use AWS RDS

### Email Scaling
- Gmail: 500 emails/day (free)
- Consider SendGrid for 100k/month
- Set up email queue for reliability

### CDN Optimization
- Enable Vercel Edge Functions
- Use Supabase Storage for images
- Configure caching headers

### Monitoring
- Add Sentry for error tracking
- Use analytics dashboard
- Monitor email delivery rates

---

## 🔄 Continuous Deployment

### Enable Auto-Deploy

Push to main branch → Automatic deployment

### Preview Deployments

1. Create pull request
2. Vercel creates preview URL
3. Test changes
4. Merge to deploy to production

### Rollback Strategy

If something breaks in production:
1. Revert commit on GitHub
2. Push to main
3. Deployment will roll back automatically

---

## 📊 Monitoring & Analytics

### Set Up Error Tracking (Optional)

Add Sentry for error monitoring:

```bash
npm install @sentry/nextjs
```

### Monitor Performance
- Check deployment logs regularly
- Monitor database performance
- Track email delivery rates

---

## 💰 Cost Estimates

### Free Tier Option (Small Usage)
- Vercel: Free
- Supabase: Free (PostgreSQL)
- Gmail: Free
- **Total**: $0/month

### Starter Tier (Growing)
- Vercel: Free/Pro ($20)
- Supabase: Pro ($25)
- Email: SendGrid free or paid
- **Total**: ~$45-100/month

### Production Tier (Enterprise)
- Vercel: Pro/Enterprise ($20-50+)
- Supabase: Pro/Enterprise ($25+)
- Email: SendGrid ($10-100+)
- **Total**: $100+/month

---

## 🆘 Support & Resources

### Official Docs
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)

### Community Help
- [Next.js Discord](https://discord.gg/bUG7V3r)
- [Vercel Support](https://vercel.com/support)
- Stack Overflow (tag: nextjs)

---

## 🎉 Deployment Success!

Once deployed:

1. Share your admin URL with team
2. Train users on how to create profiles
3. Set up monitoring
4. Plan scaling for future growth
5. Gather user feedback

**Congratulations on deploying your QR Profile Platform!** 🚀

---

## Next Steps After Deployment

1. Create your first real profiles
2. Customize email template
3. Add team members with their profiles
4. Share QR codes with the world
5. Monitor performance and feedback
6. Plan new features based on user needs

**You're all set!**
