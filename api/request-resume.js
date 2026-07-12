export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, company_name, resume_type } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  // 1. Env configurations
  const resendApiKey = process.env.RESEND_API_KEY
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseId = process.env.AIRTABLE_BASE_ID
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'ResumeRequests'

  // Resolve hostname dynamically for the approval links
  const host = req.headers.host || process.env.VERCEL_URL || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  let recordId = 'mock_rec_' + Math.random().toString(36).substring(2, 11)

  // 2. Log request details to Airtable (if keys are provided)
  if (airtableApiKey && airtableBaseId) {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            "Name": name || 'Anonymous Recruiter',
            "Email": email,
            "Company": company_name || 'Student / Personal',
            "ResumeType": resume_type === 'fullstack' ? 'Full Stack Developer' : 'Data Analyst',
            "Status": "Pending Approval",
            "Timestamp": new Date().toISOString()
          }
        })
      })
      const data = await response.json()
      if (data.id) {
        recordId = data.id
      }
    } catch (err) {
      console.error('Error logging to Airtable:', err)
    }
  } else {
    console.log('Skipping Airtable logging (Keys missing). Generated mock Record ID:', recordId)
  }

  // 3. Generate dynamic approval action links
  const approveUrl = `${protocol}://${host}/api/approve-resume?action=approve&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name || 'Recruiter')}&type=${resume_type}&id=${recordId}`
  const denyUrl = `${protocol}://${host}/api/approve-resume?action=deny&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name || 'Recruiter')}&type=${resume_type}&id=${recordId}`

  // 4. Send Approval Request Email to Ashish (via Resend)
  if (resendApiKey) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Resume Gate <onboarding@resend.dev>', // Resend sandbox testing default sender
          to: 'choubeyashish22@gmail.com',
          subject: `[Action Required] Resume Access Request from ${name || email}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #4F8CFF; margin-bottom: 16px;">New Resume Access Request</h2>
              <p>You received a new request to download your resume. Here are the requester details:</p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0;">${name || 'Not Provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0;">${company_name || 'Student / Personal'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Resume Requested:</td>
                  <td style="padding: 8px 0; text-transform: uppercase;">${resume_type === 'fullstack' ? 'Full Stack Developer' : 'Data Analyst'}</td>
                </tr>
              </table>
              <p style="margin-bottom: 24px;">Click one of the actions below to review this request:</p>
              <div style="display: flex; gap: 16px;">
                <a href="${approveUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Approve Request</a>
                <a href="${denyUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-left: 10px;">Deny Request</a>
              </div>
              <p style="font-size: 11px; color: #9ca3af; margin-top: 32px; border-t: 1px solid #e5e7eb; pt: 16px;">
                Logged Request ID: <strong>${recordId}</strong>. Deployed on Host: ${host}
              </p>
            </div>
          `
        })
      })
      const emailData = await emailResponse.json()
      console.log('Resend API response:', emailData)
    } catch (err) {
      console.error('Error dispatching email via Resend:', err)
      return res.status(500).json({ message: 'Internal Server Error sending email' })
    }
  } else {
    console.log('Skipping Resend email dispatch (Keys missing).')
    console.log('Approval URL (Approve):', approveUrl)
    console.log('Approval URL (Deny):', denyUrl)
  }

  return res.status(200).json({ 
    message: 'Request logged successfully. Pending approval.', 
    recordId,
    // Return URLs in development console for easy local testing
    dev_approve_url: host.includes('localhost') ? approveUrl : undefined,
    dev_deny_url: host.includes('localhost') ? denyUrl : undefined
  })
}
