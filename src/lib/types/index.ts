export interface HeroContent {
	title: string
	subtitle?: string
	description?: string
	image?: string
	ctaText?: string
	ctaLink?: string
	background?: string
	animation?: string
}

export interface AboutContent {
	title: string
	description: string
	image?: string
	skills?: string[]
	experience?: string
}

export interface ProjectContent {
	id: string
	title: string
	description: string
	image?: string
	technologies?: string[]
	githubUrl?: string
	liveUrl?: string
	featured?: boolean
}

export interface ExperienceContent {
	id: string
	title: string
	company: string
	period: string
	description: string
	technologies?: string[]
}

export interface SkillContent {
	id: string
	name: string
	category: string
	level: number
	icon?: string
}

export interface ContactContent {
	email: string
	phone?: string
	address?: string
	socialLinks?: {
		github?: string
		linkedin?: string
		twitter?: string
		instagram?: string
	}
}

export interface PortfolioData {
	hero: HeroContent | null
	about: AboutContent | null
	projects: ProjectContent[]
	experience: ExperienceContent[]
	skills: SkillContent[]
	contact: ContactContent | null
	lastUpdated: string
}