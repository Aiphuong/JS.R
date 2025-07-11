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

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const data = await simpleStorage.createProject(body)
		
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('POST /api/projects error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to create project' },
			{ status: 500 }
		)
	}
} 