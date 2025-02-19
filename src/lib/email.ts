import nodemailer from 'nodemailer'

interface EmailOptions {
    to: string
    subject: string
    text: string
    html?: string
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
})

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to,
            subject,
            text,
            html: html || text,
        })

        console.log('Email sent:', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}

export async function sendWelcomeEmail(email: string, name: string) {
    const subject = 'Welcome to Our Blog!'
    const text = `Hi ${name},\n\nWelcome to our blog! We're excited to have you join our community.\n\nBest regards,\nThe Blog Team`
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome to Our Blog!</h1>
            <p>Hi ${name},</p>
            <p>Welcome to our blog! We're excited to have you join our community.</p>
            <p>Here's what you can do:</p>
            <ul>
                <li>Read and comment on blog posts</li>
                <li>Submit your own blog posts for review</li>
                <li>Interact with other community members</li>
            </ul>
            <p>Best regards,<br>The Blog Team</p>
        </div>
    `

    return sendEmail({ to: email, subject, text, html })
}

export async function sendCommentApprovedEmail(
    email: string,
    name: string,
    postTitle: string
) {
    const subject = 'Your Comment Has Been Approved'
    const text = `Hi ${name},\n\nYour comment on "${postTitle}" has been approved and is now visible to other readers.\n\nBest regards,\nThe Blog Team`
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Comment Approved</h1>
            <p>Hi ${name},</p>
            <p>Your comment on "${postTitle}" has been approved and is now visible to other readers.</p>
            <p>Best regards,<br>The Blog Team</p>
        </div>
    `

    return sendEmail({ to: email, subject, text, html })
}

export async function sendPostApprovedEmail(
    email: string,
    name: string,
    postTitle: string
) {
    const subject = 'Your Blog Post Has Been Approved'
    const text = `Hi ${name},\n\nYour blog post "${postTitle}" has been approved and is now published on our website.\n\nBest regards,\nThe Blog Team`
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Blog Post Approved</h1>
            <p>Hi ${name},</p>
            <p>Your blog post "${postTitle}" has been approved and is now published on our website.</p>
            <p>Best regards,<br>The Blog Team</p>
        </div>
    `

    return sendEmail({ to: email, subject, text, html })
}
