import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'

// Dynamically import components that are below the fold
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Skills = dynamic(() => import('@/components/Skills'))
const Services = dynamic(() => import('@/components/Services'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const Contact = dynamic(() => import('@/components/Contact'))

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Portfolio />
            <Skills />
            <Services />
            <Testimonials />
            <Contact />
        </>
    )
}
