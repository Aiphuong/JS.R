import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function GET() {
	try {
		const data = await simpleStorage.getSkillsData()
		
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/skills error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch skills data' },
			{ status: 500 }
		)
	}
} 