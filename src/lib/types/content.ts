export interface HeroContent {
	greeting: string
	name: string
	title: string
	description: string
}

export interface AboutContent {
	story: string
	personalInfo: {
		name: string
		location: string
		experience: string
		email: string
	}
	socialLinks: {
		github: string
		linkedin: string
		twitter?: string
	}
	skills: Array<{
		name: string
		level: number
	}>
}

export interface Project {
	id: string
	title: string
	description: string
	image: string
	technologies: string[]
	category: string
	liveUrl?: string
	githubUrl?: string
	featured: boolean
}

export interface Experience {
	id: string
	title: string
	company: string
	location: string
	period: string
	description: string[]
	type: 'work' | 'education'
}

export interface ContactInfo {
	email: string
	phone: string
	location: string
}

export interface PortfolioContent {
	hero: HeroContent
	about: AboutContent
	projects: Project[]
	experience: Experience[]
	contact: ContactInfo
} 