# QR Profile Platform - Complete Test & Run Guide

## Prerequisites
- Node.js 18+
- npm/yarn
- Supabase account (already set up)
- Gmail account (for QR code emails)

---

## Step 1: Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Use this as `GMAIL_PASSWORD` (NOT your regular Gmail password)

---

## Step 2: Set Up Environment Variables

Create `.env.local` in project root:

```
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Admin credentials (choose your own)
ADMIN_EMAIL=admin@yoursite.com
ADMIN_PASSWORD=YourSecurePassword123!

# Gmail for sending QR codes
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop

# App URL (change for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 3: Install Dependencies

```bash
npm install
# or
yarn install
```

---

## Step 4: Run Locally

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Step 5: Test the System

### A. View Landing Page
- Go to http://localhost:3000
- See "Digital Business Cards Made Easy"
- Click "Admin Login" button

### B. Admin Login
- URL: http://localhost:3000/admin/login
- Email: (use ADMIN_EMAIL from .env.local)
- Password: (use ADMIN_PASSWORD from .env.local)
- Click "Sign In"

### C. Create a Profile
- Click "Create New Profile" button
- Fill in form:
  - Name: John Doe
  - Title: Product Manager
  - Email: john@example.com
  - Slug: john-doe (auto-generated, must be unique)
  - Add social links (optional)
- Click "Create Profile"

### D. Generate QR Code
- In dashboard, find the profile you created
- Click "Generate QR Code" button
- Choose:
  - "Generate Only" - Just create QR code
  - "Generate & Send Email" - Email QR to user

### E. Check Email
- Check GMAIL_USER inbox
- Should have email with:
  - Subject: "Your Digital Profile Card"
  - QR code image
  - Direct link to profile

### F. View Public Profile
- Click the direct link in email, OR
- Visit: http://localhost:3000/profile/john-doe
- See full profile with all info
- Test "Share" button
- Test "Download vCard" button

### G. Test Admin Features
- Edit profile: Click edit button, change info, save
- Delete profile: Click delete, confirm
- Manage multiple profiles: Create 5+ profiles, test dashboard

---

## Common Issues & Solutions

### "Login not working"
- Check ADMIN_EMAIL and ADMIN_PASSWORD in .env.local
- Make sure spaces in GMAIL_PASSWORD are without quotes
- Clear browser cookies and try again

### "QR code email not sending"
- Check GMAIL_PASSWORD is app password, NOT regular password
- Verify GMAIL_USER is correct
- Check Gmail 2FA is enabled (required for app passwords)
- Check spam folder
- Look at server logs for errors

### "Database error when creating profile"
- Check Supabase URL and anon key in .env.local
- Make sure profiles table exists (should be auto-created)
- Check slug is unique (no duplicates)
- Check all required fields: name, title, email, slug

### "Styling looks wrong"
- Clear .next cache: `rm -rf .next`
- Restart dev server
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

### "Components not found errors"
- Run `npm install` again
- Check all import paths use `@/` alias
- Make sure no circular imports

---

## Deployment Checklist

Before deploying to production:

- [ ] Test all features locally
- [ ] Update NEXT_PUBLIC_APP_URL to production domain
- [ ] Change ADMIN_EMAIL and ADMIN_PASSWORD
- [ ] Use strong ADMIN_PASSWORD (20+ characters)
- [ ] Enable HTTPS (production URLs must start with https://)
- [ ] Set up environment variables on hosting platform
- [ ] Test QR code generation on production
- [ ] Test email sending on production
- [ ] Set up monitoring/logging

---

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
- Push environment variables in Vercel dashboard
- Auto-deploys on git push

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### Option 3: Railway/Render/Other
- Push code to GitHub
- Connect repo to platform
- Set environment variables
- Deploy

---

## Production Tips

1. **Database**: Use Supabase production instance
2. **Email**: Consider SendGrid for higher limits (100+ emails/day)
3. **Security**: 
   - Use strong admin password
   - Enable HTTPS
   - Add CORS headers if needed
4. **Monitoring**: Set up error tracking (Sentry, LogRocket)
5. **Backups**: Enable Supabase automated backups
6. **Custom Domain**: Point domain to your host

---

## File Structure

```
app/
├── page.tsx                 # Landing page
├── admin/
│   ├── login/page.tsx       # Admin login
│   └── dashboard/page.tsx   # Admin dashboard
├── profile/
│   └── [slug]/page.tsx      # Public profile page
└── api/
    ├── admin/
    │   ├── login/route.ts   # Login API
    │   ├── logout/route.ts  # Logout API
    │   └── check/route.ts   # Auth check
    └── profiles/
        ├── route.ts         # Create/list profiles
        ├── [id]/route.ts    # Edit/delete profile
        └── [id]/qr/route.ts # Generate QR code

lib/
├── auth.ts                  # Auth utilities
├── supabase.ts             # Supabase client
├── email.ts                # Email service
└── utils.ts                # Helpers

components/
└── admin/
    ├── create-profile-form.tsx
    ├── edit-profile-form.tsx
    ├── profile-card.tsx
    └── qrcode-modal.tsx
```

---

## Feature Checklist

- [x] Admin login with credentials
- [x] Create user profiles
- [x] Edit user profiles
- [x] Delete user profiles
- [x] Generate QR codes
- [x] Email QR codes
- [x] View public profiles via QR/link
- [x] Social media links
- [x] vCard download
- [x] Profile sharing
- [x] Dark/light mode
- [x] Responsive design
- [x] Database integration
- [x] Email service
- [x] Protected admin routes

---

## Need Help?

1. Check error messages in console
2. Read logs in server terminal
3. Check debug output in browser F12 console
4. Review documentation files in project root
5. Check Supabase dashboard for database issues

---

**Ready to go! Happy testing! 🚀**
