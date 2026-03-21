# QR Profile Platform - Digital Business Card SaaS

A complete, production-ready SaaS platform for creating and managing digital business cards with QR code generation and email distribution.

## 🌟 Features

### Admin Panel
- **Secure Authentication**: Hardcoded admin login with encrypted sessions
- **Profile Management**: Create, edit, and delete user profiles
- **QR Code Generation**: Automatic unique QR code for each profile
- **Email Distribution**: Send QR codes directly to users via Gmail
- **Dashboard**: Beautiful admin interface with profile overview

### User Profiles
- **Public Sharing**: Each user gets a unique public profile page
- **QR Code Scanning**: Easy access via QR code scanning
- **Rich Information**:
  - Basic details (name, title, bio, location, phone)
  - Social media links (Instagram, LinkedIn, Twitter, GitHub, etc.)
  - Portfolio/website links
  - Services and packages
- **Share Options**:
  - Download vCard (.vcf) file
  - Copy and share direct link
  - Native share functionality
  - QR code display

### Technical Features
- **Database**: Supabase PostgreSQL with Row-Level Security
- **Authentication**: Secure admin token-based auth
- **Email**: Nodemailer with Gmail SMTP
- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: shadcn/ui components with Tailwind CSS
- **Animations**: Framer Motion for smooth interactions
- **Responsive**: Mobile-first design

## 📋 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | Full-stack React framework |
| **TypeScript** | Type-safe code |
| **Supabase** | PostgreSQL database & auth |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI component library |
| **Framer Motion** | Animations |
| **QRCode** | QR code generation |
| **Nodemailer** | Email service |
| **bcryptjs** | Password hashing |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier available)
- Gmail account for email functionality

### Quick Start

1. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Platform**
   - Admin: http://localhost:3000/admin/login
   - Home: http://localhost:3000

For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)

## 📁 Project Structure

```
qr-profile-platform/
├── app/
│   ├── admin/
│   │   ├── login/          # Admin login page
│   │   ├── dashboard/      # Main admin dashboard
│   │   └── layout.tsx      # Admin layout
│   ├── api/
│   │   ├── admin/          # Auth endpoints
│   │   └── profiles/       # Profile CRUD + QR endpoints
│   ├── profile/[slug]/     # Public profile page
│   ├── page.tsx            # Home/landing page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & theme
├── components/
│   ├── admin/              # Admin-specific components
│   │   ├── create-profile-form.tsx
│   │   ├── edit-profile-form.tsx
│   │   ├── profile-card.tsx
│   │   ├── profile-list.tsx
│   │   └── qrcode-modal.tsx
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── supabase.ts         # Database client
│   ├── email.ts            # Email service
│   ├── middleware.ts       # Route protection
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
├── scripts/
│   └── init-db.sql         # Database schema
└── middleware.ts           # Next.js middleware
```

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password_here

# Gmail (for QR code emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your_16_char_app_password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 API Documentation

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check` - Check auth status

### Profiles (Admin Only)
- `GET /api/profiles` - List all profiles
- `POST /api/profiles` - Create profile
- `GET /api/profiles/[id]` - Get profile details
- `PUT /api/profiles/[id]` - Update profile
- `DELETE /api/profiles/[id]` - Delete profile

### QR Codes (Admin Only)
- `POST /api/profiles/[id]/qr` - Generate and email QR code

### Public
- `GET /profile/[slug]` - View public profile

## 🎨 Customization

### Change Theme Colors
Edit `/app/globals.css` to modify the design token colors:
```css
:root {
  --primary: oklch(0.55 0.2 280);      /* Primary brand color */
  --accent: oklch(0.65 0.2 280);       /* Accent color */
  /* ... other tokens */
}
```

### Add Custom Profile Fields
1. Update database schema in `scripts/init-db.sql`
2. Run migration: `npm run migrate`
3. Update form components in `components/admin/`
4. Update public profile page in `app/profile/[slug]/page.tsx`

### Custom Email Template
Edit the `generateQREmailTemplate()` function in `lib/email.ts`

## 🔐 Security

- ✅ Admin password hashing with bcrypt
- ✅ Secure HTTP-only cookies for auth tokens
- ✅ Row-Level Security (RLS) on database
- ✅ SQL injection protection with parameterized queries
- ✅ CSRF protection with middleware
- ✅ Environment variables for sensitive data

## 📱 Mobile Support

The platform is fully responsive and mobile-friendly:
- Adaptive layouts for all screen sizes
- Touch-friendly buttons and forms
- Optimized for mobile profile viewing
- QR code scanning support

## 🚢 Deployment

### Deploy to Vercel
```bash
npm run build
vercel deploy
```

### Deploy to Other Platforms
1. Build the project: `npm run build`
2. Set environment variables in your platform's dashboard
3. Set Node.js version to 18+
4. Point to `npm run start` as the start command

## 🐛 Troubleshooting

### Email Not Sending
- Verify Gmail app password (not regular Gmail password)
- Check GMAIL_USER and GMAIL_PASSWORD in .env.local
- Ensure Gmail account has "Less Secure App Access" enabled or use app passwords

### QR Code Not Generating
- Verify NEXT_PUBLIC_APP_URL is set correctly
- Check browser console for errors
- Ensure profile slug is valid

### Database Connection Error
- Verify Supabase URL and keys
- Check database migration ran successfully
- Ensure row-level security policies are correct

## 📊 Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  photo_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  -- Social links
  instagram_url, linkedin_url, twitter_url, github_url,
  facebook_url, youtube_url, tiktok_url, website_url,
  -- Services
  services JSONB DEFAULT '[]'::jsonb,
  -- QR Code tracking
  qr_code_url TEXT,
  qr_email_sent BOOLEAN DEFAULT FALSE,
  qr_sent_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💬 Support

For questions or issues:
1. Check the [QUICKSTART.md](./QUICKSTART.md) guide
2. Review the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. Check browser/server console for error messages
4. Review API response messages

## 🎯 Roadmap

- [ ] Analytics dashboard (profile views, QR scans)
- [ ] Bulk import profiles via CSV
- [ ] Custom profile templates
- [ ] Integration with CRM systems
- [ ] SMS-based profile sharing
- [ ] Advanced QR code customization
- [ ] Profile view tracking
- [ ] Payment integration for premium features

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for teams and professionals**
