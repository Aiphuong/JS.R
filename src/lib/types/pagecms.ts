// PageCMS specific types
export interface PageCMSConfig {
	apiKey: string
	projectId: string
	environment: string
}

export interface ContentItem {
	id: string
	title: string
	content: Record<string, any>
	createdAt: string
	updatedAt: string
	status?: 'draft' | 'published' | 'archived'
}

export interface ContentListResponse<T> {
	items: T[]
	total: number
	limit: number
	offset: number
}

// Content type definitions
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
	content: string
	image?: string
	bio?: string
	skills?: string[]
}

export interface ExperienceItem {
	title: string
	company: string
	period: string
	description: string
	technologies?: string[]
	achievements?: string[]
}

export interface ProjectItem {
	title: string
	description: string
	image?: string
	link?: string
	technologies?: string[]
	github?: string
	live?: string
}

export interface SkillsContent {
	frontend: string[]
	backend: string[]
	tools: string[]
	languages?: string[]
	databases?: string[]
}

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

// API Response types
export interface PageCMSResponse<T> {
	success: boolean
	data?: T
	error?: string
	message?: string
}

// Service method types
export interface PageCMSServiceInterface {
	create<T>(contentType: string, data: T): Promise<ContentItem>
	get<T>(contentType: string, id?: string): Promise<T>
	update<T>(contentType: string, id: string, data: Partial<T>): Promise<ContentItem>
	delete(contentType: string, id: string): Promise<void>
	list<T>(contentType: string, options?: {
		limit?: number
		offset?: number
		filter?: Record<string, any>
	}): Promise<ContentListResponse<T>>
	healthCheck(): Promise<boolean>
	
	// Hero-specific methods
	getHeroData(): Promise<HeroContent | null>
	createHeroData(data: HeroContent): Promise<ContentItem>
	updateHeroData(id: string, data: Partial<HeroContent>): Promise<ContentItem>
	deleteHeroData(id: string): Promise<void>
} 