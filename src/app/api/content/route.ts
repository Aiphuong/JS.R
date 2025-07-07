import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

// Public API route for all portfolio content
export async function GET() {
	try {
		const data = await simpleStorage.getAllData()
		
		if (!data) {
			return NextResponse.json(
				{ success: false, error: 'No data found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/content error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch content' },
			{ status: 500 }
		)
	}
} 