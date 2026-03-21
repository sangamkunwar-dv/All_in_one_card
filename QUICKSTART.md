# QR Profile Platform - Quick Start Guide

## 🚀 Installation

1. **Clone or Download the Project**
   ```bash
   git clone <repo-url>
   cd qr-profile-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```
   # Supabase (Already configured if using v0)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Admin Credentials (Set these yourself)
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password

   # Gmail Configuration (For sending QR codes)
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASSWORD=your_gmail_app_password

   # App URL (Update when deployed)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Note:** For GMAIL_PASSWORD, use a Gmail App Password, not your regular Gmail password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password and paste it as GMAIL_PASSWORD

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features Overview

### Admin Dashboard
- **Login**: `http://localhost:3000/admin/login`
  - Use your configured ADMIN_EMAIL and ADMIN_PASSWORD
- **Create Profiles**: Add new user profiles with all information
- **Generate QR Codes**: Automatically create QR codes for each profile
- **Send Emails**: Email QR codes and profile links to users
- **Edit Profiles**: Update existing profile information
- **Delete Profiles**: Remove profiles

### User Profiles
- **Public Profile Pages**: Each profile accessible at `http://localhost:3000/profile/[slug]`
- **QR Code Scanning**: Users can scan QR codes to access profiles
- **Share Options**: Download vCard, copy link, share directly
- **Social Links**: Display all social media and contact information
- **Services/Pricing**: Show offered services and packages

## 🔑 How It Works

1. **Admin creates a profile** with user details
2. **QR code is automatically generated** linking to the profile
3. **Admin sends QR code via email** to the user
4. **User scans QR code** or clicks link to view their profile
5. **Users can share** their profile with others

## 🛠️ Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in the Vercel dashboard
5. Deploy!

### Deploy to Other Platforms
- Netlify, AWS Amplify, Railway, or any Node.js hosting
- Ensure you set all required environment variables
- Database: Supabase (cloud-hosted PostgreSQL)

## 📧 Email Troubleshooting

If emails aren't sending:
1. **Check Gmail App Password**: Make sure you're using an app-specific password, not your Gmail password
2. **Enable "Less Secure Apps"**: Not needed with app passwords
3. **Check logs**: Look at server console for error messages
4. **Test connection**: Try sending a test email from admin dashboard

## 🔐 Security Notes

- Admin password is hashed and stored in cookies
- All user data is protected with Row-Level Security (RLS)
- Public profiles can only be viewed by URL/QR code
- Admin credentials should be strong
- Never commit `.env.local` to version control

## 📱 API Endpoints

- `GET /api/profiles` - List all profiles (admin only)
- `POST /api/profiles` - Create new profile (admin only)
- `GET /api/profiles/[id]` - Get profile by ID
- `PUT /api/profiles/[id]` - Update profile (admin only)
- `DELETE /api/profiles/[id]` - Delete profile (admin only)
- `POST /api/profiles/[id]/qr` - Generate and email QR code (admin only)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## 🆘 Support

For issues or questions:
1. Check the SETUP_GUIDE.md for detailed information
2. Review the environment variables
3. Check browser console for error messages
4. Review server logs for API errors

## 🎨 Customization

- **Colors**: Edit `/app/globals.css` to change the theme
- **Logo**: Add your logo to `/public` and update the navbar
- **Profile Fields**: Modify the profile schema in `/scripts/init-db.sql` and update forms accordingly
- **Email Template**: Customize email in `/lib/email.ts`

## 📈 Next Steps

1. Set up your first admin account
2. Create a profile for testing
3. Generate and view QR codes
4. Deploy to production
5. Share profiles with your team

Enjoy your QR Profile Platform! 🎉
