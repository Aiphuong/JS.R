import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function GET() {
	try {
		const data = await simpleStorage.getContactData()
		
		if (!data) {
			return NextResponse.json(
				{ success: false, error: 'Contact data not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/contact error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch contact data' },
			{ status: 500 }
		)
	}
} 