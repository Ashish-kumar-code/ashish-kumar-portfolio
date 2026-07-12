// Serverless Function: api/approve-resume.js
// Handles approval and denial callbacks from action links in the owner's email

export default async function handler(req, res) {
  const { action, email, name, type, id } = req.query || {}

  if (!email || !action) {
    return res.status(400).send('<h1>Bad Request</h1><p>Missing required parameters.</p>')
  }

  const isApproved = action === 'approve'
  const statusString = isApproved ? 'Approved' : 'Denied'

  // Env configurations
  const resendApiKey = process.env.RESEND_API_KEY
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseId = process.env.AIRTABLE_BASE_ID
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'ResumeRequests'

  // 1. Update status in Airtable (if keys are provided)
  if (airtableApiKey && airtableBaseId && id && !id.startsWith('mock_')) {
    try {
      await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            "Status": statusString
          }
        })
      })
    } catch (err) {
      console.error('Error updating Airtable status:', err)
    }
  } else {
    console.log(`Skipping Airtable update (Keys missing or mock ID: ${id}). Updated local status to: ${statusString}`)
  }

  // 2. If Approved: Send automated email with the resume file link to the requester
  if (isApproved) {
    const resumeUrl = type === 'fullstack'
      ? 'https://drive.google.com/file/d/1jTnfP212iutrsjGmS5MzlPt8KalVZAsl/view?usp=drive_link'
      : 'https://drive.google.com/file/d/1ygVCUKDQrffjiEdhFmCL9AAlzJ_mlmP2/view?usp=drive_link'

    const resumeTitle = type === 'fullstack' ? 'Full Stack Developer Resume' : 'Data Analyst Resume'

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Ashish Kumar <onboarding@resend.dev>', // Resend sandbox testing default sender
            to: email,
            subject: `Ashish Kumar - ${resumeTitle}`,
            html: `
              <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #4F8CFF; margin-bottom: 12px;">Resume Request Approved</h3>
                <p>Hi ${name},</p>
                <p>Thank you for requesting my resume and showing interest in my profile. I have reviewed your request and granted download access.</p>
                <p>Click the button below to view and download my targeted <strong>${resumeTitle}</strong> on Google Drive:</p>
                <div style="margin: 24px 0;">
                  <a href="${resumeUrl}" target="_blank" style="background-color: #4F8CFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View Resume on Google Drive</a>
                </div>
                <p>If you have any questions or would like to schedule a call, please feel free to reach out directly to me at this email address.</p>
                <br />
                <p style="margin-bottom: 4px; font-weight: bold;">Best regards,</p>
                <p style="margin: 0; color: #4F8CFF; font-weight: bold;">Ashish Kumar</p>
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">Full Stack Developer & Data Analyst</p>
                <p style="margin: 0; font-size: 12px; color: #9ca3af;"><a href="mailto:choubeyashish22@gmail.com">choubeyashish22@gmail.com</a></p>
              </div>
            `
          })
        })
      } catch (err) {
        console.error('Error sending resume email via Resend:', err)
        return res.status(500).send('<h1>Internal Server Error</h1><p>Failed to send the resume email.</p>')
      }
    } else {
      console.log(`Skipping Resend email delivery (Keys missing). Would have sent resume link: ${resumeUrl} to ${email}`)
    }
  }

  // 3. Render HTML response to the browser for Ashish
  res.setHeader('Content-Type', 'text/html')
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Request Processed</title>
      <style>
        body {
          font-family: sans-serif;
          background-color: #0B0B0C;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #111214;
          border: 1px solid #1E2024;
          padding: 32px;
          border-radius: 12px;
          text-align: center;
          max-width: 400px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        h1 {
          font-size: 20px;
          margin-bottom: 12px;
          color: ${isApproved ? '#10b981' : '#ef4444'};
        }
        p {
          font-size: 14px;
          color: #A1A1AA;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .badge {
          background-color: ${isApproved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
          color: ${isApproved ? '#10b981' : '#ef4444'};
          border: 1px solid ${isApproved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
          padding: 6px 12px;
          border-radius: 20px;
          font-family: monospace;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Access ${isApproved ? 'Approved' : 'Denied'}</h1>
        <p>
          The resume request from <strong>${email}</strong> has been successfully updated in your logs.
          ${isApproved ? 'An automated email containing your resume link has been dispatched to their inbox.' : 'The workflow has been stopped. No files were delivered.'}
        </p>
        <span class="badge">STATUS: ${statusString.toUpperCase()}</span>
      </div>
    </body>
    </html>
  `)
}
