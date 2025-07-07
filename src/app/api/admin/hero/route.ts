import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { simpleStorage } from '@/lib/services/simple-storage'

// Validation schema
const heroSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
	ctaText: z.string().optional(),
	ctaLink: z.string().optional(),
	background: z.string().optional(),
	animation: z.string().optional()
})

export async function GET() {
	try {
		const data = await simpleStorage.getHeroData()
		
		if (!data) {
			return NextResponse.json(
				{ success: false, error: 'Hero data not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('GET /api/admin/hero error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch hero data' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const validatedData = heroSchema.parse(body)

		const result = await simpleStorage.createHeroData(validatedData)

		return NextResponse.json(
			{ 
				success: true, 
				message: 'Hero data created successfully', 
				data: result 
			},
			{ status: 201 }
		)
	} catch (error) {
		console.error('POST /api/admin/hero error:', error)
		
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
			{ success: false, error: 'Failed to create hero data' },
			{ status: 500 }
		)
	}
}

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json()
		const validatedData = heroSchema.partial().parse(body)

		const result = await simpleStorage.updateHeroData(validatedData)

		return NextResponse.json(
			{ success: true, message: 'Hero data updated successfully', data: result }
		)
	} catch (error) {
		console.error('PUT /api/admin/hero error:', error)
		
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
			{ success: false, error: 'Failed to update hero data' },
			{ status: 500 }
		)
	}
}

export async function DELETE() {
	try {
		await simpleStorage.deleteHeroData()

		return NextResponse.json(
			{ success: true, message: 'Hero data deleted successfully' }
		)
	} catch (error) {
		console.error('DELETE /api/admin/hero error:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to delete hero data' },
			{ status: 500 }
		)
	}
} 