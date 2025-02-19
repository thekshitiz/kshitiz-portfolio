import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function GET() {
    try {
        await sendEmail({
            to: process.env.ADMIN_EMAIL!,
            subject: 'Test Email',
            text: 'This is a test email',
            html: '<h1>This is a test email</h1>',
        })
        return NextResponse.json({ message: 'Test email sent' })
    } catch (error) {
        console.error('Test email failed:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
