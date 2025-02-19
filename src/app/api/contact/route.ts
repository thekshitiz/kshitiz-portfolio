import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'

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
            // Add this near the top of your existing route.ts file
            const submission = await prisma.contactSubmission.create({
                data: {
                    name,
                    email,
                    subject,
                    message,
                    metadata: {
                        userAgent: req.headers.get('user-agent'),
                        timestamp: new Date().toISOString(),
                    },
                },
            })

            // Send auto-reply to user
            console.log('Sending auto-reply...')
            await sendEmail({
                to: email,
                subject: 'Thank you for your message',
                text: `
Dear ${name},

Thank you for reaching out to me. I have received your message regarding "${subject}" and will review it promptly.

I typically respond to all inquiries within 24-48 business hours. If your matter is urgent, please feel free to reach me directly at freelancekshitiz@gmail.com.

Best regards,
Kshitiz Raj Lohani
Full Stack Developer
www.kshitiz.com
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                        <h2 style="color: #1a1a1a; margin-bottom: 20px;">Thank you for your message</h2>
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to me. I have received your message regarding "<strong>${subject}</strong>" and will review it promptly.</p>
                        <p>I typically respond to all inquiries within 24-48 business hours. If your matter is urgent, please feel free to reach me directly at <a href="mailto:freelancekshitiz@gmail.com" style="color: #0066cc;">freelancekshitiz@gmail.com</a>.</p>
                        <div style="margin-top: 30px;">
                            <p>Best regards,<br>
                            <strong>Kshitiz Raj Lohani</strong><br>
                            Full Stack Developer<br>
                            <a href="https://www.kshitiz.com" style="color: #0066cc;">www.kshitiz.com</a></p>
                        </div>
                    </div>
                `,
            })

            // The admin notification email will be sent to your email address
            await sendEmail({
                to: process.env.SMTP_USER || 'your-email@example.com',
                subject: `New Contact Form Message: ${subject}`,
                text: `
New message from your website contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}

Timestamp: ${new Date().toLocaleString()}
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                        <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Contact Form Message</h2>
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong></p>
                            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                            <p style="margin-top: 20px; color: #666;">
                                <em>Received on: ${new Date().toLocaleString()}</em>
                            </p>
                        </div>
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
