import Navbar from '@/components/navigation/navbar'
import Hero from '@/components/sections/hero-section/hero'
import About from '@/components/sections/about-section/about'
import Skills from '@/components/sections/skills-section/skills'
import Projects from '@/components/sections/projects-section/projects'
import Experience from '@/components/sections/experience-section/experience'
import Contact from '@/components/sections/contact-section/contact'
import Footer from '@/components/footer/footer'

export default function Home() {
	return (
		<main className="min-h-screen">
			<Navbar />
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Contact />
			<Footer />
		</main>
	)
}
