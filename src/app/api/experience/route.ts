import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function GET() {
	try {
		const data = await simpleStorage.getExperienceData()
		
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/experience error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch experience data' },
			{ status: 500 }
		)
	}
} 