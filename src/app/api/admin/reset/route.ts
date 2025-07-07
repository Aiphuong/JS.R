import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function POST() {
	try {
		await simpleStorage.resetToDefault()

		return NextResponse.json(
			{ success: true, message: 'All data reset to default successfully' }
		)
	} catch (error) {
		console.error('POST /api/admin/reset error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to reset data' },
			{ status: 500 }
		)
	}
} 