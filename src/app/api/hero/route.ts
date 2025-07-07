import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

// Public API route for hero section
export async function GET() {
	try {
		const data = await simpleStorage.getHeroData()
		
		if (!data) {
			// Return default data if no hero data exists
			const defaultData = {
				title: 'Welcome to My Portfolio',
				subtitle: 'Full Stack Developer',
				description: 'Passionate about creating amazing web experiences',
				image: '/images/hero.jpg',
				ctaText: 'View My Work',
				ctaLink: '/projects',
				background: 'gradient',
				animation: 'fade-in'
			}
			return NextResponse.json({ success: true, data: defaultData })
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/hero error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch hero data' },
			{ status: 500 }
		)
	}
} 