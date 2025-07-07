import { pagecmsService, CONTENT_TYPES } from '../src/lib/services/pagecms'

// Current in-memory data (from the old system)
const currentHeroData = {
	title: 'Welcome to My Portfolio',
	subtitle: 'Full Stack Developer',
	description: 'Passionate about creating amazing web experiences',
	image: '/images/hero.jpg',
	ctaText: 'View My Work',
	ctaLink: '/projects',
	background: 'gradient',
	animation: 'fade-in'
}

// Sample data for other sections
const sampleData = {
	about: {
		title: 'About Me',
		content: 'I am a passionate full-stack developer...',
		image: '/images/about.jpg'
	},
	experience: [
		{
			title: 'Senior Developer',
			company: 'Tech Corp',
			period: '2020-2023',
			description: 'Led development of multiple web applications...'
		}
	],
	projects: [
		{
			title: 'E-commerce Platform',
			description: 'A modern e-commerce solution...',
			image: '/images/project1.jpg',
			link: 'https://example.com'
		}
	],
	skills: {
		frontend: ['React', 'Next.js', 'TypeScript'],
		backend: ['Node.js', 'Python', 'PostgreSQL'],
		tools: ['Git', 'Docker', 'AWS']
	},
	contact: {
		email: 'contact@example.com',
		phone: '+1234567890',
		location: 'San Francisco, CA',
		social: {
			github: 'https://github.com/username',
			linkedin: 'https://linkedin.com/in/username'
		}
	}
}

async function migrateToPageCMS() {
	console.log('Starting migration to PageCMS...')

	try {
		// Check PageCMS connection
		const isHealthy = await pagecmsService.healthCheck()
		if (!isHealthy) {
			throw new Error('PageCMS connection failed')
		}
		console.log('✅ PageCMS connection successful')

		// Migrate hero data
		console.log('📝 Migrating hero data...')
		const existingHero = await pagecmsService.getHeroData()
		
		if (!existingHero) {
			await pagecmsService.createHeroData(currentHeroData)
			console.log('✅ Hero data migrated successfully')
		} else {
			console.log('ℹ️ Hero data already exists, skipping...')
		}

		// Migrate about data
		console.log('📝 Migrating about data...')
		const existingAbout = await pagecmsService.get('about')
		if (!existingAbout) {
			await pagecmsService.create(CONTENT_TYPES.ABOUT, sampleData.about)
			console.log('✅ About data migrated successfully')
		} else {
			console.log('ℹ️ About data already exists, skipping...')
		}

		// Migrate experience data
		console.log('📝 Migrating experience data...')
		const existingExperience = await pagecmsService.list(CONTENT_TYPES.EXPERIENCE)
		if (existingExperience.items.length === 0) {
			for (const exp of sampleData.experience) {
				await pagecmsService.create(CONTENT_TYPES.EXPERIENCE, exp)
			}
			console.log('✅ Experience data migrated successfully')
		} else {
			console.log('ℹ️ Experience data already exists, skipping...')
		}

		// Migrate projects data
		console.log('📝 Migrating projects data...')
		const existingProjects = await pagecmsService.list(CONTENT_TYPES.PROJECTS)
		if (existingProjects.items.length === 0) {
			for (const project of sampleData.projects) {
				await pagecmsService.create(CONTENT_TYPES.PROJECTS, project)
			}
			console.log('✅ Projects data migrated successfully')
		} else {
			console.log('ℹ️ Projects data already exists, skipping...')
		}

		// Migrate skills data
		console.log('📝 Migrating skills data...')
		const existingSkills = await pagecmsService.get('skills')
		if (!existingSkills) {
			await pagecmsService.create(CONTENT_TYPES.SKILLS, sampleData.skills)
			console.log('✅ Skills data migrated successfully')
		} else {
			console.log('ℹ️ Skills data already exists, skipping...')
		}

		// Migrate contact data
		console.log('📝 Migrating contact data...')
		const existingContact = await pagecmsService.get('contact')
		if (!existingContact) {
			await pagecmsService.create(CONTENT_TYPES.CONTACT, sampleData.contact)
			console.log('✅ Contact data migrated successfully')
		} else {
			console.log('ℹ️ Contact data already exists, skipping...')
		}

		console.log('🎉 Migration completed successfully!')
		console.log('📊 Summary:')
		console.log('   - Hero: ✅')
		console.log('   - About: ✅')
		console.log('   - Experience: ✅')
		console.log('   - Projects: ✅')
		console.log('   - Skills: ✅')
		console.log('   - Contact: ✅')

	} catch (error) {
		console.error('❌ Migration failed:', error)
		process.exit(1)
	}
}

// Run migration if this script is executed directly
if (require.main === module) {
	migrateToPageCMS()
}

export { migrateToPageCMS } 