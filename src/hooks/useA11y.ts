import { useEffect } from 'react'

export function useA11y() {
    useEffect(() => {
        // Add keyboard navigation indicator
        const handleFirstTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing')
                window.removeEventListener('keydown', handleFirstTab)
            }
        }
        window.addEventListener('keydown', handleFirstTab)

        return () => {
            window.removeEventListener('keydown', handleFirstTab)
        }
    }, [])
}
