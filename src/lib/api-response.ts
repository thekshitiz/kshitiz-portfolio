// Standardize API responses
export function apiResponse<T>(data: T, status = 200) {
    return NextResponse.json({
        success: true,
        data,
        timestamp: new Date().toISOString()
    }, { status })
}

export function apiError(message: string, status = 500, code?: string) {
    return NextResponse.json({
        success: false,
        error: {
            message,
            code
        },
        timestamp: new Date().toISOString()
    }, { status })
} 