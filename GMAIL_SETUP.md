# Gmail Setup Guide for QR Profile Platform

## 🔐 Getting Your Gmail App Password

The QR Profile Platform uses Gmail to send QR codes and profile links to users. To make this work securely, you need to generate a Gmail **App Password** instead of using your regular Gmail password.

### Why App Passwords?
- ✅ More secure than your main Gmail password
- ✅ Can be revoked anytime
- ✅ Works with 2-factor authentication
- ✅ Prevents exposing your main password in code
- ✅ Google's recommended approach

---

## 📝 Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication (if not already enabled)

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** on the left sidebar
3. Scroll to **2-Step Verification** and click **Get Started**
4. Follow the prompts to enable 2FA
   - You'll need to verify with your phone
5. Once enabled, come back to this guide

### Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
   - You need to be signed in to your Gmail account
2. If prompted, sign in again to confirm
3. At the bottom, you'll see a dropdown that says **Select the app and device**
4. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your current device type)
5. Click **Generate**
6. Google will show you a 16-character password like: `xxxx xxxx xxxx xxxx`

### Step 3: Copy Your App Password

1. The password will appear in a popup
2. **Copy the entire 16-character password** (including spaces)
3. You can click the copy icon or select it manually
4. Don't close this tab yet!

### Step 4: Add to Your .env.local

1. Open your project's `.env.local` file
2. Find or add this line:
   ```
   GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```
3. Replace `xxxx xxxx xxxx xxxx` with the password you just copied
4. Also add your Gmail email:
   ```
   GMAIL_USER=your-email@gmail.com
   ```
5. Save the file

### Step 5: Test Email Sending

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Go to Admin Dashboard: `http://localhost:3000/admin/login`
3. Login with your admin credentials
4. Create a test profile with a real email address
5. Click the "QR Code" button
6. Click "Send QR Code via Email"
7. Check the email inbox for the QR code

---

## 🔍 Troubleshooting Email Issues

### "Authentication failed" or "Invalid credentials"
- ✅ Make sure you're using the **App Password**, not your regular Gmail password
- ✅ Copy-paste the entire 16-character password including spaces
- ✅ Check that GMAIL_USER matches your Gmail address exactly
- ✅ Restart the development server after changing .env.local

### "Gmail account verification required"
- Go to https://accounts.google.com/signin/continue?sarp=1&scc=1
- Verify your account
- Try again

### Email still not sending
1. Check server logs for error messages:
   - Look at the terminal running `npm run dev`
   - Look for error messages in the console
2. Verify environment variables:
   - Stop the dev server
   - Check `.env.local` has both GMAIL_USER and GMAIL_PASSWORD
   - Run `npm run dev` again
3. Try a different Gmail account:
   - Some Gmail accounts have stricter security settings
   - Corporate Gmail accounts might need special setup

### "Less Secure App Access" errors (older Gmail accounts)
- If you have an old Gmail account, you might need:
  - Go to https://myaccount.google.com/lesssecureapps
  - Click **Turn on** (might be deprecated)
  - OR follow the App Password method above (recommended)

---

## 📧 How Email Sending Works

1. Admin creates a profile
2. Admin clicks "QR Code" button
3. Admin clicks "Send QR Code via Email"
4. System generates a QR code
5. Email template is created with:
   - QR code image
   - Direct profile link
   - Professional message
6. Email sent via Gmail SMTP
7. Status updated in database

---

## 🔒 Security Best Practices

1. **Never share your app password**
   - Don't commit `.env.local` to git
   - Don't share it in messages or emails

2. **Use different app passwords for different environments**
   - Development: one app password
   - Production: different app password
   - Testing: yet another app password

3. **Revoke app passwords if compromised**
   - Go to https://myaccount.google.com/apppasswords
   - Delete suspicious app passwords
   - Generate a new one

4. **Use Gmail app passwords instead of regular password**
   - Never put your regular Gmail password in code
   - App passwords can be revoked individually
   - Keep main password secure

---

## 🌍 Using with Different Email Services

If you want to use a different email service:

### Gmail (Current Setup)
- Already configured
- Works with App Passwords
- Good for small to medium volume

### Outlook/Hotmail
- Requires app-specific password
- Use SMTP: smtp.live.com:587
- Similar setup to Gmail

### SendGrid
- Requires API key
- Better for high volume
- Edit `/lib/email.ts` to use SendGrid instead

### Resend
- Modern email service
- Good for Next.js apps
- Would need to modify email service

---

## 📊 Email Quota

Gmail limits you to:
- **500 emails per day** (free account)
- **2,000 emails per day** (business account)

For higher volumes, consider:
- SendGrid (popular & reliable)
- Resend (modern, Next.js friendly)
- AWS SES (part of AWS ecosystem)

---

## ✅ Checklist

- [ ] Google Account created and logged in
- [ ] 2-Factor Authentication enabled
- [ ] App Password generated at https://myaccount.google.com/apppasswords
- [ ] GMAIL_PASSWORD added to `.env.local`
- [ ] GMAIL_USER added to `.env.local` (your Gmail address)
- [ ] Development server restarted after env changes
- [ ] Test email sent successfully
- [ ] Profile email received with QR code

---

## 🆘 Still Having Issues?

1. **Check server logs**
   - Look at terminal where you ran `npm run dev`
   - Look for error messages after clicking "Send QR Code"

2. **Test with simple Python script**
   ```python
   import smtplib
   gmail = "your-email@gmail.com"
   password = "xxxx xxxx xxxx xxxx"
   
   server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
   server.login(gmail, password)
   print("Success!")
   ```

3. **Contact Gmail Support**
   - Visit https://support.google.com/mail
   - Search "app passwords"
   - Follow official Google guides

---

## 📞 Need Help?

If you're still having trouble:
1. Re-read this guide carefully
2. Check the error message in the terminal
3. Verify your Gmail app password one more time
4. Try generating a new app password
5. Make sure `.env.local` is saved and dev server restarted

**Remember**: The app password should be the one generated at https://myaccount.google.com/apppasswords, NOT your regular Gmail password!

---

Good luck! Once email is working, your platform will send QR codes automatically! 🎉
