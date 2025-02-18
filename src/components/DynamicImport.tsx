'use client'

import { Suspense, lazy, ComponentType } from 'react'
import Loading from './Loading'

interface DynamicImportProps {
    component: () => Promise<{ default: ComponentType<any> }>
    fallback?: React.ReactNode
    props?: Record<string, any>
}

export function DynamicImport({
    component,
    fallback = <Loading />,
    props = {},
}: DynamicImportProps) {
    const LazyComponent = lazy(component)

    return (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    )
}
