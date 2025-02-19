const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    READ: 'bg-blue-100 text-blue-800',
    REPLIED: 'bg-green-100 text-green-800',
    ARCHIVED: 'bg-gray-100 text-gray-800',
}

export default function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
                statusColors[status as keyof typeof statusColors]
            }`}
        >
            {status}
        </span>
    )
}
