import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
    freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
    options: Options = {}
): [(element: any) => void, boolean] {
    const {
        threshold = 0,
        root = null,
        rootMargin = '0px',
        freezeOnceVisible = false,
    } = options

    const [entry, setEntry] = useState<IntersectionObserverEntry>()
    const [ref, setRef] = useState<Element | null>(null)
    const frozen = useRef(false)

    const isVisible = entry?.isIntersecting

    const frozen = entry?.isIntersecting && freezeOnceVisible

    useEffect(() => {
        if (!ref || frozen) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setEntry(entry)
            },
            { threshold, root, rootMargin }
        )

        observer.observe(ref)

        return () => observer.disconnect()
    }, [ref, threshold, root, rootMargin, frozen])

    return [setRef, !!isVisible]
}
