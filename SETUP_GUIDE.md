# QR Profile SaaS Platform - Setup Guide

## Overview

This is a complete SaaS platform for creating and managing digital business cards with QR codes. Admins can create user profiles, generate QR codes, and email them to users. Users can then scan or share their digital profiles.

## Features

✓ Admin authentication with hardcoded credentials
✓ Multi-user profile management
✓ Automatic QR code generation
✓ Email delivery via Gmail/Nodemailer
✓ Public profile pages with social links
✓ Contact information management
✓ Services/packages listing
✓ vCard download support
✓ Profile sharing functionality
✓ Beautiful responsive design

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Supabase Configuration (already set from integration)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# Gmail Configuration (for sending QR codes)
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASSWORD=your_gmail_app_password

# Application URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Gmail App Password Setup

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Factor Authentication
3. Go to App passwords: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the generated password and use it as `GMAIL_PASSWORD`

## Database Setup

The database schema is already created with:
- `profiles` table with all user profile fields
- Indexes for optimized queries
- Row Level Security (RLS) for data protection
- Public read access for profile viewing

## File Structure

```
app/
├── page.tsx                 # Landing page
├── profile/[slug]/page.tsx  # Public profile page
├── admin/
│   ├── login/page.tsx       # Admin login
│   └── dashboard/page.tsx   # Admin dashboard
└── api/
    ├── admin/
    │   ├── login/route.ts   # Login endpoint
    │   └── logout/route.ts  # Logout endpoint
    └── profiles/
        ├── route.ts         # Get/Create profiles
        ├── [id]/route.ts    # Get/Update/Delete profile
        └── [id]/qr/route.ts # Generate QR code

components/
├── admin/
│   ├── create-profile-form.tsx
│   ├── profile-list.tsx
│   └── qrcode-modal.tsx
└── ui/                      # shadcn/ui components

lib/
├── auth.ts                  # Authentication utilities
├── supabase.ts              # Database client
└── email.ts                 # Email service
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create `.env.local` with all required variables (see Environment Variables section above).

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Access Admin Dashboard

- Go to `http://localhost:3000/admin/login`
- Use your `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Create your first profile

### 5. Create a Profile

1. Click "Create New Profile" in the dashboard
2. Fill in user information (name, title, email, etc.)
3. Add social links and services
4. Click "Create Profile"

### 6. Generate QR Code

1. Click the "QR Code" button next to a profile
2. Click "Generate QR Code"
3. Optionally click "Send QR Code to [email]" to email it
4. Download the QR code or copy the profile link

### 7. Share Profile

Users can:
- Scan the QR code to view the profile
- Visit the direct link
- Download their contact info as vCard
- Share via native share functionality

## Workflow

### Admin Flow
1. Admin logs in with credentials
2. Creates new user profile
3. Generates QR code
4. Emails QR code to user
5. User receives email with QR code and profile link

### User Flow
1. Receives email with QR code
2. Scans QR code with phone camera
3. Opens their digital profile
4. Can download vCard or share profile
5. Profile shows all their information, social links, and services

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login admin
- `POST /api/admin/logout` - Logout admin

### Profiles
- `GET /api/profiles` - Get all profiles (admin only)
- `POST /api/profiles` - Create profile (admin only)
- `GET /api/profiles/[id]` - Get profile details
- `PUT /api/profiles/[id]` - Update profile (admin only)
- `DELETE /api/profiles/[id]` - Delete profile (admin only)
- `POST /api/profiles/[id]/qr` - Generate QR code and send email

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel Settings
4. Deploy

### Deployment Checklist

- [ ] All environment variables set
- [ ] Supabase database configured
- [ ] Gmail app password created
- [ ] NEXT_PUBLIC_APP_URL set to your domain
- [ ] Test admin login
- [ ] Test profile creation
- [ ] Test QR code generation
- [ ] Test email sending

## Customization

### Change Admin Credentials

1. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in environment variables
2. Restart application

### Add More Social Platforms

Edit `/lib/supabase.ts` to add new social URL fields, then update:
- `components/admin/create-profile-form.tsx` - Add form field
- `app/profile/[slug]/page.tsx` - Add social icon display

### Customize Profile Fields

Edit the database migration or add new fields to match your needs.

## Troubleshooting

### Email not sending
- Check `GMAIL_USER` and `GMAIL_PASSWORD` are correct
- Ensure Gmail app password is used (not your regular password)
- Check that less secure app access is not blocking

### QR Code not generating
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly
- Check browser console for errors

### Admin login not working
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Clear browser cookies and try again

## Support

For issues or questions, check:
1. Vercel documentation: https://vercel.com/docs
2. Supabase documentation: https://supabase.com/docs
3. Next.js documentation: https://nextjs.org/docs
