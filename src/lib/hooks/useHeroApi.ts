'use client'

import { useState, useCallback } from 'react'

interface HeroContent {
	title: string
	subtitle?: string
	description?: string
	image?: string
	ctaText?: string
	ctaLink?: string
	background?: string
	animation?: string
}

interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

export function useHeroApi() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<HeroContent | null>(null)

	const callApi = useCallback(async <T>(
		url: string,
		options: RequestInit = {}
	): Promise<ApiResponse<T>> => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(url, {
				headers: { 'Content-Type': 'application/json' },
				...options
			})
			const result = await response.json()
			
			if (result.success) {
				setData(result.data as HeroContent || null)
			} else {
				setError(result.error || 'An error occurred')
			}
			
			return result
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Network error occurred'
			setError(errorMessage)
			return { success: false, error: errorMessage }
		} finally {
			setLoading(false)
		}
	}, [])

	// Get hero data (public)
	const getHeroData = useCallback(() => {
		return callApi<HeroContent>('/api/hero')
	}, [callApi])

	// Get hero data (admin)
	const getAdminHeroData = useCallback(() => {
		return callApi<HeroContent>('/api/admin/hero')
	}, [callApi])

	// Create hero data
	const createHeroData = useCallback((heroData: HeroContent) => {
		return callApi<HeroContent>('/api/admin/hero', {
			method: 'POST',
			body: JSON.stringify(heroData)
		})
	}, [callApi])

	// Update hero data
	const updateHeroData = useCallback((heroData: Partial<HeroContent>) => {
		return callApi<HeroContent>('/api/admin/hero', {
			method: 'PUT',
			body: JSON.stringify(heroData)
		})
	}, [callApi])

	// Delete hero data
	const deleteHeroData = useCallback(() => {
		return callApi<HeroContent>('/api/admin/hero', {
			method: 'DELETE'
		})
	}, [callApi])

	// Reset to default data
	const resetHeroData = useCallback(() => {
		const defaultData: HeroContent = {
			title: 'Welcome to My Portfolio',
			subtitle: 'Full Stack Developer',
			description: 'Passionate about creating amazing web experiences',
			image: '/images/hero.jpg',
			ctaText: 'View My Work',
			ctaLink: '/projects',
			background: 'gradient',
			animation: 'fade-in'
		}
		return callApi<HeroContent>('/api/admin/hero', {
			method: 'PUT',
			body: JSON.stringify(defaultData)
		})
	}, [callApi])

	// Clear error
	const clearError = useCallback(() => {
		setError(null)
	}, [])

	return {
		loading,
		error,
		data,
		getHeroData,
		getAdminHeroData,
		createHeroData,
		updateHeroData,
		deleteHeroData,
		resetHeroData,
		clearError
	}
} 