// Create a centralized error handling system
export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public code?: string
    ) {
        super(message)
    }
}

export function handleApiError(error: unknown) {
    console.error('API Error:', error)
    
    if (error instanceof AppError) {
        return NextResponse.json(
            { error: error.message, code: error.code },
            { status: error.statusCode }
        )
    }
    
    return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
    )
} 