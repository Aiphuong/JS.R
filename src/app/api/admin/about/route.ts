import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { simpleStorage } from '@/lib/services/simple-storage'

const aboutSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	image: z.string().optional(),
	skills: z.array(z.string()).optional(),
	experience: z.string().optional()
})

export async function GET() {
	try {
		const data = await simpleStorage.getAboutData()
		
		if (!data) {
			return NextResponse.json(
				{ success: false, error: 'About data not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/admin/about error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch about data' },
			{ status: 500 }
		)
	}
}

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json()
		const validatedData = aboutSchema.partial().parse(body)

		const result = await simpleStorage.updateAboutData(validatedData)

		return NextResponse.json(
			{ success: true, message: 'About data updated successfully', data: result }
		)
	} catch (error) {
		console.error('PUT /api/admin/about error:', error)
		
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ 
					success: false, 
					error: 'Validation error', 
					details: error.errors
				},
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ success: false, error: 'Failed to update about data' },
			{ status: 500 }
		)
	}
} 