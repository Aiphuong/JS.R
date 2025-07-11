import { NextResponse } from 'next/server'
import { simpleStorage } from '@/lib/services/simple-storage'

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await request.json()
		const data = await simpleStorage.updateProject(params.id, body)
		
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('PUT /api/projects/[id] error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to update project' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await simpleStorage.deleteProject(params.id)
		
		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('DELETE /api/projects/[id] error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to delete project' },
			{ status: 500 }
		)
	}
} 