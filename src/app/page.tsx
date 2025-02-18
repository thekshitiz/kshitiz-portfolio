import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

export default function Home() {
    return (
        <>
            <section id="home">
                <Hero />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="services">
                <Services />
            </section>
            <section id="portfolio">
                <Projects />
            </section>
            <section id="testimonials">
                <Testimonials />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </>
    )
}
