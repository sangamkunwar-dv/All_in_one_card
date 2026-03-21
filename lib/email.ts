import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function sendQRCodeEmail(
  to: string,
  userName: string,
  qrCodeUrl: string,
  profileUrl: string
): Promise<boolean> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #333; margin: 0; }
            .content { text-align: center; }
            .qr-section { margin: 30px 0; }
            .qr-section img { max-width: 300px; height: auto; }
            .link-section { margin: 30px 0; }
            .btn { display: inline-block; padding: 12px 30px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Digital Profile Card</h1>
              <p>Welcome, ${userName}!</p>
            </div>
            
            <div class="content">
              <p>Your QR code has been generated and is ready to share with others.</p>
              
              <div class="qr-section">
                <p><strong>Scan this QR code to view your profile:</strong></p>
                <img src="${qrCodeUrl}" alt="QR Code" />
              </div>
              
              <div class="link-section">
                <p><strong>Or visit your profile directly:</strong></p>
                <a href="${profileUrl}" class="btn">View My Profile</a>
              </div>
              
              <p style="color: #666; margin-top: 20px;">
                Share this QR code with others to let them quickly access your profile.
              </p>
            </div>
            
            <div class="footer">
              <p>This is your digital business card. Keep it safe and share it with anyone you'd like to connect with!</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `Your Digital Profile Card - QR Code for ${userName}`,
      html: htmlContent,
    })

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
