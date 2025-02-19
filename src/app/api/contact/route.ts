import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { name, email, subject, message } = data

        console.log('Received form data:', { name, email, subject, message })

        // Basic validation
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields:', {
                name,
                email,
                subject,
                message,
            })
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        try {
            // Send email to admin
            console.log('Sending admin notification...')
            await sendEmail({
                to: process.env.SMTP_USER || 'your-email@example.com',
                subject: `Contact Form: ${subject}`,
                text: `
                    Name: ${name}
                    Email: ${email}
                    Subject: ${subject}
                    Message: ${message}
                `,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
            })

            // Send auto-reply
            console.log('Sending auto-reply...')
            await sendEmail({
                to: email,
                subject: 'Thank you for contacting us',
                text: `
                    Dear ${name},

                    Thank you for reaching out. I have received your message and will get back to you as soon as possible.

                    Best regards,
                    Kshitiz
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Thank you for contacting us</h2>
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
                        <p>Best regards,<br>Kshitiz</p>
                    </div>
                `,
            })

            console.log('Emails sent successfully')
            return NextResponse.json(
                { message: 'Message sent successfully' },
                { status: 200 }
            )
        } catch (emailError) {
            console.error('Email sending failed:', emailError)
            throw new Error('Failed to send email: ' + emailError.message)
        }
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to send message' },
            { status: 500 }
        )
    }
}
