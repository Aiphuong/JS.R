import { promises as fs } from 'fs'
import path from 'path'
import { AboutContent, ContactContent, ExperienceContent, HeroContent, PortfolioData, ProjectContent, SkillContent } from '../types'

// Default data to avoid duplication
const DEFAULT_DATA: PortfolioData = {
	hero: {
		title: 'Welcome to My Portfolio',
		subtitle: 'Full Stack Developer',
		description: 'Passionate about creating amazing web experiences',
		image: '/images/hero.jpg',
		ctaText: 'View My Work',
		ctaLink: '/projects',
		background: 'gradient',
		animation: 'fade-in'
	},
	about: {
		title: 'About Me',
		description: 'I am a passionate full-stack developer with experience in modern web technologies.',
		image: '/images/about.jpg',
		skills: ['React', 'Node.js', 'TypeScript', 'Python'],
		experience: '5+ years'
	},
	projects: [
		{
			id: '1',
			title: 'E-commerce Platform',
			description: 'A modern e-commerce platform built with Next.js and Stripe',
			image: '/images/project1.jpg',
			technologies: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
			githubUrl: 'https://github.com/example/ecommerce',
			liveUrl: 'https://ecommerce.example.com',
			featured: true
		}
	],
	experience: [
		{
			id: '1',
			title: 'Senior Full Stack Developer',
			company: 'Tech Company',
			period: '2022 - Present',
			description: 'Leading development of web applications',
			technologies: ['React', 'Node.js', 'TypeScript']
		}
	],
	skills: [
		{
			id: '1',
			name: 'React',
			category: 'Frontend',
			level: 90,
			icon: 'react'
		},
		{
			id: '2',
			name: 'Node.js',
			category: 'Backend',
			level: 85,
			icon: 'nodejs'
		}
	],
	contact: {
		email: 'contact@example.com',
		phone: '+1234567890',
		address: 'San Francisco, CA',
		socialLinks: {
			github: 'https://github.com/example',
			linkedin: 'https://linkedin.com/in/example',
			twitter: 'https://twitter.com/example'
		}
	},
	lastUpdated: new Date().toISOString()
}

class SimpleStorageService {
	private dataPath: string
	private data: PortfolioData

	constructor() {
		this.dataPath = path.join(process.cwd(), 'data', 'portfolio-data.json')
		this.data = { ...DEFAULT_DATA }
	}

	async initialize(): Promise<void> {
		try {
			// Create data directory if it doesn't exist
			const dataDir = path.dirname(this.dataPath)
			await fs.mkdir(dataDir, { recursive: true })

			// Try to load existing data
			try {
				const fileContent = await fs.readFile(this.dataPath, 'utf-8')
				const loadedData = JSON.parse(fileContent)
				// Merge with default data to ensure all fields exist
				this.data = { ...DEFAULT_DATA, ...loadedData }
			} catch {
				// File doesn't exist, use default data
				await this.saveData()
			}
		} catch (error) {
			console.error('Failed to initialize storage:', error)
		}
	}

	private async saveData(): Promise<void> {
		try {
			this.data.lastUpdated = new Date().toISOString()
			await fs.writeFile(this.dataPath, JSON.stringify(this.data, null, 2))
		} catch (error) {
			console.error('Failed to save data:', error)
			throw error
		}
	}

	// Hero methods
	async getHeroData(): Promise<HeroContent | null> {
		await this.initialize()
		return this.data.hero
	}

	async createHeroData(data: HeroContent): Promise<HeroContent> {
		await this.initialize()
		this.data.hero = data
		await this.saveData()
		return data
	}

	async updateHeroData(data: Partial<HeroContent>): Promise<HeroContent> {
		await this.initialize()
		this.data.hero = { ...this.data.hero, ...data } as HeroContent
		await this.saveData()
		return this.data.hero!
	}

	async deleteHeroData(): Promise<void> {
		await this.initialize()
		this.data.hero = null
		await this.saveData()
	}

	// About methods
	async getAboutData(): Promise<AboutContent | null> {
		await this.initialize()
		return this.data.about
	}

	async updateAboutData(data: Partial<AboutContent>): Promise<AboutContent> {
		await this.initialize()
		this.data.about = { ...this.data.about, ...data } as AboutContent
		await this.saveData()
		return this.data.about!
	}

	// Projects methods
	async getProjectsData(): Promise<ProjectContent[]> {
		await this.initialize()
		return this.data.projects
	}

	async createProject(data: Omit<ProjectContent, 'id'>): Promise<ProjectContent> {
		await this.initialize()
		const newProject: ProjectContent = {
			...data,
			id: Date.now().toString()
		}
		this.data.projects.push(newProject)
		await this.saveData()
		return newProject
	}

	async updateProject(id: string, data: Partial<ProjectContent>): Promise<ProjectContent> {
		await this.initialize()
		const index = this.data.projects.findIndex(p => p.id === id)
		if (index === -1) throw new Error('Project not found')
		
		this.data.projects[index] = { ...this.data.projects[index], ...data }
		await this.saveData()
		return this.data.projects[index]
	}

	async deleteProject(id: string): Promise<void> {
		await this.initialize()
		this.data.projects = this.data.projects.filter(p => p.id !== id)
		await this.saveData()
	}

	// Experience methods
	async getExperienceData(): Promise<ExperienceContent[]> {
		await this.initialize()
		return this.data.experience
	}

	async createExperience(data: Omit<ExperienceContent, 'id'>): Promise<ExperienceContent> {
		await this.initialize()
		const newExperience: ExperienceContent = {
			...data,
			id: Date.now().toString()
		}
		this.data.experience.push(newExperience)
		await this.saveData()
		return newExperience
	}

	async updateExperience(id: string, data: Partial<ExperienceContent>): Promise<ExperienceContent> {
		await this.initialize()
		const index = this.data.experience.findIndex(e => e.id === id)
		if (index === -1) throw new Error('Experience not found')
		
		this.data.experience[index] = { ...this.data.experience[index], ...data }
		await this.saveData()
		return this.data.experience[index]
	}

	async deleteExperience(id: string): Promise<void> {
		await this.initialize()
		this.data.experience = this.data.experience.filter(e => e.id !== id)
		await this.saveData()
	}

	// Skills methods
	async getSkillsData(): Promise<SkillContent[]> {
		await this.initialize()
		return this.data.skills
	}

	async createSkill(data: Omit<SkillContent, 'id'>): Promise<SkillContent> {
		await this.initialize()
		const newSkill: SkillContent = {
			...data,
			id: Date.now().toString()
		}
		this.data.skills.push(newSkill)
		await this.saveData()
		return newSkill
	}

	async updateSkill(id: string, data: Partial<SkillContent>): Promise<SkillContent> {
		await this.initialize()
		const index = this.data.skills.findIndex(s => s.id === id)
		if (index === -1) throw new Error('Skill not found')
		
		this.data.skills[index] = { ...this.data.skills[index], ...data }
		await this.saveData()
		return this.data.skills[index]
	}

	async deleteSkill(id: string): Promise<void> {
		await this.initialize()
		this.data.skills = this.data.skills.filter(s => s.id !== id)
		await this.saveData()
	}

	// Contact methods
	async getContactData(): Promise<ContactContent | null> {
		await this.initialize()
		return this.data.contact
	}

	async updateContactData(data: Partial<ContactContent>): Promise<ContactContent> {
		await this.initialize()
		this.data.contact = { ...this.data.contact, ...data } as ContactContent
		await this.saveData()
		return this.data.contact!
	}

	// Get all data
	async getAllData(): Promise<PortfolioData> {
		await this.initialize()
		return this.data
	}

	// Reset to default
	async resetToDefault(): Promise<void> {
		await this.initialize()
		this.data = { ...DEFAULT_DATA }
		await this.saveData()
	}
}

export const simpleStorage = new SimpleStorageService()
export type { 
	HeroContent, 
	AboutContent, 
	ProjectContent, 
	ExperienceContent, 
	SkillContent, 
	ContactContent,
	PortfolioData 
} 