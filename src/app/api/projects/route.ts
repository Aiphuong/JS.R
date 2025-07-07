import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function GET() {
	try {
		const data = await simpleStorage.getProjectsData()
		
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/projects error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch projects data' },
			{ status: 500 }
		)
	}
} 