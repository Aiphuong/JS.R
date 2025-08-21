import { Hero, About, Skills, Projects, Experience, Contact } from './pages'
import Footer from '@/components/footer/footer'

export default function Home() {
	return (
		<main className="min-h-screen">
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
