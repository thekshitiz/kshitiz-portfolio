interface GradientTextProps {
    children: React.ReactNode
    gradient: string
    className?: string
}

export function GradientText({
    children,
    gradient,
    className = '',
}: GradientTextProps) {
    return (
        <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}
        >
            {children}
        </span>
    )
}
