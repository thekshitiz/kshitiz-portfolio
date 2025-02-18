import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const data = await req.json()

        // Add analytics data
        const analyticsData = {
            ...data,
            analytics: {
                timestamp: new Date().toISOString(),
                subjectCategory: data.metadata.subjectCategory,
                customSubject: data.metadata.customSubject,
                userAgent: req.headers.get('user-agent'),
                ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
            },
        }

        // Log for analysis
        console.log('Contact Form Submission:', analyticsData)

        // Here you could:
        // 1. Save to database for analytics
        // 2. Track subject types frequency
        // 3. Analyze custom subjects for new categories
        // 4. Generate reports on contact patterns

        return NextResponse.json({ message: 'Message sent successfully' })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
