'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from './Loading'
import { SmartLoading } from './SmartLoading'
import { CodeSplitBoundary } from './CodeSplitBoundary'

// Dynamic imports with loading states
const Hero = dynamic(() => import('./Hero'), {
    loading: () => <Loading />,
})

const About = dynamic(() => import('./About'), {
    loading: () => <Loading />,
    ssr: false,
})

const Projects = dynamic(() => import('./Projects'), {
    loading: () => <Loading />,
    ssr: false,
})

// Dynamically import components that are below the fold
const Portfolio = dynamic(() => import('./Portfolio'))
const Skills = dynamic(() => import('./Skills'))
const Services = dynamic(() => import('./Services'))
const Testimonials = dynamic(() => import('./Testimonials'))
const Contact = dynamic(() => import('./Contact'))

export function HomeContent() {
    return (
        <CodeSplitBoundary>
            <Suspense fallback={<SmartLoading />}>
                <Hero />
                <About />
                <Projects />
                <Portfolio />
                <Skills />
                <Services />
                <Testimonials />
                <Contact />
            </Suspense>
        </CodeSplitBoundary>
    )
}
