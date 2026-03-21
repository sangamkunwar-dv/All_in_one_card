# ⚡ QR Profile Platform - Quick Reference Card

## 🚀 Start Here (2 Minutes)

```bash
# 1. Install
npm install

# 2. Create .env.local
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=secure_password
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 3. Run
npm run dev

# 4. Visit
http://localhost:3000/admin/login
```

---

## 📋 Essential Info

| Item | Value |
|------|-------|
| **Admin Login** | `/admin/login` |
| **Dashboard** | `/admin/dashboard` |
| **Public Profile** | `/profile/[slug]` |
| **Home** | `/` |
| **Database** | Supabase PostgreSQL |
| **Framework** | Next.js 16 |

---

## 🔑 Admin Credentials

Use these to login:
- **Email**: Your `ADMIN_EMAIL`
- **Password**: Your `ADMIN_PASSWORD`

---

## 📧 Email Setup

1. Go to https://myaccount.google.com/apppasswords
2. Select Mail & Windows Computer
3. Generate 16-char password
4. Add to `.env.local` as `GMAIL_PASSWORD`

**Important**: Use APP PASSWORD, not regular Gmail password!

---

## 🎯 Main Features

### Admin
1. Create profiles
2. Generate QR codes
3. Send via email
4. Edit profiles
5. Delete profiles

### Users
1. View profile via QR
2. Download vCard
3. Share profile
4. View all info

---

## 📚 Documentation Map

| Doc | Time | Purpose |
|-----|------|---------|
| QUICKSTART.md | 5 min | Fast setup |
| SETUP_GUIDE.md | 20 min | Detailed |
| GMAIL_SETUP.md | 15 min | Email help |
| DEPLOYMENT.md | 30 min | Deploy |
| README.md | 20 min | Reference |
| COMPLETION_REPORT.md | 5 min | Overview |

---

## 🔧 Configuration

### .env.local Template
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
GMAIL_USER=email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💻 Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Run production build
npm run lint       # Run linter
```

---

## 🚀 Deploy Fast

### Vercel (Easiest)
1. Push to GitHub
2. Connect to Vercel
3. Add env variables
4. Deploy!

### Others
See DEPLOYMENT.md for:
- Netlify
- Railway
- AWS
- Docker

---

## 🆘 Troubleshooting

### Can't login?
- Check `.env.local` has ADMIN_EMAIL & ADMIN_PASSWORD
- Restart dev server

### Email not sending?
- Use app password from Gmail (not regular password)
- Check GMAIL_USER & GMAIL_PASSWORD
- See GMAIL_SETUP.md

### QR code not generating?
- Check NEXT_PUBLIC_APP_URL is set
- Check browser console for errors

### Database connection error?
- Verify Supabase credentials
- Check database table exists

---

## 📊 API Quick Ref

```
GET    /api/profiles           List profiles
POST   /api/profiles           Create profile
GET    /api/profiles/[id]      Get profile
PUT    /api/profiles/[id]      Update profile
DELETE /api/profiles/[id]      Delete profile
POST   /api/profiles/[id]/qr   Send QR email
POST   /api/admin/login        Login
POST   /api/admin/logout       Logout
```

---

## 🔐 Security

- ✅ Admin password hashing
- ✅ Secure sessions
- ✅ Database RLS
- ✅ CSRF protection
- ✅ Env var protection

---

## 📱 Features

- ✅ Admin dashboard
- ✅ Profile management
- ✅ QR code generation
- ✅ Email sending
- ✅ Public profiles
- ✅ vCard export
- ✅ Social links
- ✅ Mobile responsive
- ✅ Dark mode

---

## 🎨 Customization

**Colors**: Edit `app/globals.css`
**Logo**: Add to `public/` folder
**Email**: Edit `lib/email.ts`
**Fields**: Update database schema

---

## 📈 Performance

- Optimized for fast loading
- Database indexes included
- Image optimization
- CSS minimization
- Code splitting

---

## 💾 Database

Table: `profiles`

Columns:
- Basic info (name, title, bio)
- Contact (email, phone, location)
- Social (8 platforms)
- Services (JSON array)
- QR tracking
- Timestamps

---

## 🎯 Next Steps

1. **Setup** (5 min) → QUICKSTART.md
2. **Configure** (15 min) → SETUP_GUIDE.md
3. **Test** (10 min) → Create profile
4. **Deploy** (30 min) → DEPLOYMENT.md
5. **Share** (∞) → Use platform!

---

## 📞 Get Help

1. Check relevant documentation
2. Search within docs (CTRL+F)
3. Review README.md
4. Check code comments

---

## ✨ Key Files

```
app/
  ├── admin/login/page.tsx
  ├── admin/dashboard/page.tsx
  ├── profile/[slug]/page.tsx
  ├── api/profiles/
  ├── api/admin/
  └── page.tsx

lib/
  ├── auth.ts
  ├── supabase.ts
  ├── email.ts
  └── utils.ts

components/admin/
  ├── create-profile-form.tsx
  ├── edit-profile-form.tsx
  ├── profile-card.tsx
  └── qrcode-modal.tsx
```

---

## 🎓 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Database**: Supabase
- **Auth**: Custom (hardcoded)
- **Email**: Nodemailer + Gmail
- **UI**: shadcn/ui + Tailwind
- **Animations**: Framer Motion

---

## 💰 Cost

- **Free Tier**: $0/month
- **Starter**: ~$45/month
- **Growth**: ~$100+/month

---

## 🚀 Status

✅ **COMPLETE & READY TO USE**

All features implemented
All documentation included
Ready to deploy
Fully tested

---

## 🎉 You're All Set!

Everything you need is included.

**Start with QUICKSTART.md →**

**Happy building! 🚀**

---

*For detailed info, see full documentation files*
