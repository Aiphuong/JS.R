// import { PageCMS } from '@pagecms/sdk'

// PageCMS configuration
const pagecmsConfig = {
	apiKey: process.env.PAGECMS_API_KEY || '',
	projectId: process.env.PAGECMS_PROJECT_ID || '',
	environment: process.env.PAGECMS_ENVIRONMENT || 'production'
}

// Mock PageCMS client for now
// const pagecms = new PageCMS(pagecmsConfig)
const pagecms = {
	content: {
		create: async (params: any) => {
			console.log('Mock PageCMS create:', params)
			return { id: 'mock-id', ...params.data, createdAt: new Date().toISOString() }
		},
		get: async (params: any) => {
			console.log('Mock PageCMS get:', params)
			// Return default hero data instead of null
			if (params.contentType === 'hero') {
				return {
					title: 'Welcome to My Portfolio',
					subtitle: 'Full Stack Developer',
					description: 'Passionate about creating amazing web experiences',
					image: '/images/hero.jpg',
					ctaText: 'View My Work',
					ctaLink: '/projects',
					background: 'gradient',
					animation: 'fade-in'
				}
			}
			return null
		},
		update: async (params: any) => {
			console.log('Mock PageCMS update:', params)
			return { id: params.id, ...params.data, updatedAt: new Date().toISOString() }
		},
		delete: async (params: any) => {
			console.log('Mock PageCMS delete:', params)
			return true
		},
		list: async (params: any) => {
			console.log('Mock PageCMS list:', params)
			// Return default hero data in list format
			if (params.contentType === 'hero') {
				return {
					items: [{
						id: 'mock-hero-id',
						title: 'Welcome to My Portfolio',
						subtitle: 'Full Stack Developer',
						description: 'Passionate about creating amazing web experiences',
						image: '/images/hero.jpg',
						ctaText: 'View My Work',
						ctaLink: '/projects',
						background: 'gradient',
						animation: 'fade-in'
					}],
					total: 1
				}
			}
			return { items: [], total: 0 }
		}
	},
	health: {
		check: async () => {
			console.log('Mock PageCMS health check')
			return true
		}
	}
}

// Content types for our sections
export const CONTENT_TYPES = {
	HERO: 'hero',
	ABOUT: 'about',
	EXPERIENCE: 'experience',
	PROJECTS: 'projects',
	SKILLS: 'skills',
	CONTACT: 'contact'
} as const

// Generic content interface
export interface ContentItem {
	id: string
	title: string
	content: Record<string, any>
	createdAt: string
	updatedAt: string
}

// Hero content interface
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

// About content interface
export interface AboutContent {
	title: string
	content: string
	image?: string
	bio?: string
	skills?: string[]
}

// Experience item interface
export interface ExperienceItem {
	id: string
	title: string
	company: string
	period: string
	description: string
	technologies?: string[]
	achievements?: string[]
	createdAt: string
	updatedAt: string
}

// Project item interface
export interface ProjectItem {
	id: string
	title: string
	description: string
	image?: string
	link?: string
	technologies?: string[]
	github?: string
	live?: string
	createdAt: string
	updatedAt: string
}

// Skills content interface
export interface SkillsContent {
	frontend: string[]
	backend: string[]
	tools: string[]
	languages?: string[]
	databases?: string[]
}

// Contact content interface
export interface ContactContent {
	email: string
	phone?: string
	location?: string
	social: {
		github?: string
		linkedin?: string
		twitter?: string
		instagram?: string
	}
}

// PageCMS Service class
export class PageCMSService {
	private client: any

	constructor() {
		this.client = pagecms
	}

	// Generic CRUD operations
	async create<T = any>(contentType: string, data: T): Promise<ContentItem> {
		try {
			const result = await this.client.content.create({
				contentType,
				data
			})
			return result
		} catch (error) {
			throw new Error(`Failed to create ${contentType}: ${error}`)
		}
	}

	async get<T = any>(contentType: string, id?: string): Promise<T> {
		try {
			if (id) {
				const result = await this.client.content.get({
					contentType,
					id
				})
				return result
			} else {
				const result = await this.client.content.list({
					contentType,
					limit: 1
				})
				return result.items[0] || null
			}
		} catch (error) {
			throw new Error(`Failed to get ${contentType}: ${error}`)
		}
	}

	async update<T = any>(contentType: string, id: string, data: Partial<T>): Promise<ContentItem> {
		try {
			const result = await this.client.content.update({
				contentType,
				id,
				data
			})
			return result
		} catch (error) {
			throw new Error(`Failed to update ${contentType}: ${error}`)
		}
	}

	async delete(contentType: string, id: string): Promise<void> {
		try {
			await this.client.content.delete({
				contentType,
				id
			})
		} catch (error) {
			throw new Error(`Failed to delete ${contentType}: ${error}`)
		}
	}

	async list<T = any>(contentType: string, options?: {
		limit?: number
		offset?: number
		filter?: Record<string, any>
	}): Promise<{ items: T[], total: number }> {
		try {
			const result = await this.client.content.list({
				contentType,
				...options
			})
			return result
		} catch (error) {
			throw new Error(`Failed to list ${contentType}: ${error}`)
		}
	}

	// Hero-specific methods
	async getHeroData(): Promise<HeroContent | null> {
		try {
			const result = await this.get<HeroContent>(CONTENT_TYPES.HERO)
			return result
		} catch (error) {
			console.error('Failed to get hero data:', error)
			return null
		}
	}

	async createHeroData(data: HeroContent): Promise<ContentItem> {
		return this.create(CONTENT_TYPES.HERO, data)
	}

	async updateHeroData(id: string, data: Partial<HeroContent>): Promise<ContentItem> {
		return this.update(CONTENT_TYPES.HERO, id, data)
	}

	async deleteHeroData(id: string): Promise<void> {
		return this.delete(CONTENT_TYPES.HERO, id)
	}

	// About-specific methods
	async getAboutData(): Promise<AboutContent | null> {
		try {
			const result = await this.get<AboutContent>(CONTENT_TYPES.ABOUT)
			return result
		} catch (error) {
			console.error('Failed to get about data:', error)
			return null
		}
	}

	// Experience-specific methods
	async getExperienceData(): Promise<ExperienceItem[]> {
		try {
			const result = await this.list<ExperienceItem>(CONTENT_TYPES.EXPERIENCE)
			return result.items
		} catch (error) {
			console.error('Failed to get experience data:', error)
			return []
		}
	}

	// Projects-specific methods
	async getProjectsData(): Promise<ProjectItem[]> {
		try {
			const result = await this.list<ProjectItem>(CONTENT_TYPES.PROJECTS)
			return result.items
		} catch (error) {
			console.error('Failed to get projects data:', error)
			return []
		}
	}

	// Skills-specific methods
	async getSkillsData(): Promise<SkillsContent | null> {
		try {
			const result = await this.get<SkillsContent>(CONTENT_TYPES.SKILLS)
			return result
		} catch (error) {
			console.error('Failed to get skills data:', error)
			return null
		}
	}

	// Contact-specific methods
	async getContactData(): Promise<ContactContent | null> {
		try {
			const result = await this.get<ContactContent>(CONTENT_TYPES.CONTACT)
			return result
		} catch (error) {
			console.error('Failed to get contact data:', error)
			return null
		}
	}

	// Health check
	async healthCheck(): Promise<boolean> {
		try {
			await this.client.health.check()
			return true
		} catch (error) {
			console.error('PageCMS health check failed:', error)
			return false
		}
	}
}

// Export singleton instance
export const pagecmsService = new PageCMSService() 