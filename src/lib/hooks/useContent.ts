'use client'

import { useState, useCallback } from 'react'
import type { 
	HeroContent, 
	AboutContent, 
	ProjectContent, 
	ExperienceContent, 
	SkillContent, 
	ContactContent,
	PortfolioData 
} from '@/lib/services/simple-storage'

interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

export function useContent() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<PortfolioData | null>(null)

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
				setData(result.data as PortfolioData || null)
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

	// Get all content
	const getAllContent = useCallback(() => {
		return callApi<PortfolioData>('/api/content')
	}, [callApi])

	// Hero methods
	const getHeroData = useCallback(() => {
		return callApi<HeroContent>('/api/hero')
	}, [callApi])

	const updateHeroData = useCallback((heroData: Partial<HeroContent>) => {
		return callApi<HeroContent>('/api/admin/hero', {
			method: 'PUT',
			body: JSON.stringify(heroData)
		})
	}, [callApi])

	// About methods
	const getAboutData = useCallback(() => {
		return callApi<AboutContent>('/api/about')
	}, [callApi])

	const updateAboutData = useCallback((aboutData: Partial<AboutContent>) => {
		return callApi<AboutContent>('/api/admin/about', {
			method: 'PUT',
			body: JSON.stringify(aboutData)
		})
	}, [callApi])

	// Projects methods
	const getProjectsData = useCallback(() => {
		return callApi<ProjectContent[]>('/api/projects')
	}, [callApi])

	const createProject = useCallback((projectData: Omit<ProjectContent, 'id'>) => {
		return callApi<ProjectContent>('/api/admin/projects', {
			method: 'POST',
			body: JSON.stringify(projectData)
		})
	}, [callApi])

	const updateProject = useCallback((id: string, projectData: Partial<ProjectContent>) => {
		return callApi<ProjectContent>(`/api/admin/projects/${id}`, {
			method: 'PUT',
			body: JSON.stringify(projectData)
		})
	}, [callApi])

	const deleteProject = useCallback((id: string) => {
		return callApi<void>(`/api/admin/projects/${id}`, {
			method: 'DELETE'
		})
	}, [callApi])

	// Experience methods
	const getExperienceData = useCallback(() => {
		return callApi<ExperienceContent[]>('/api/experience')
	}, [callApi])

	const createExperience = useCallback((experienceData: Omit<ExperienceContent, 'id'>) => {
		return callApi<ExperienceContent>('/api/admin/experience', {
			method: 'POST',
			body: JSON.stringify(experienceData)
		})
	}, [callApi])

	const updateExperience = useCallback((id: string, experienceData: Partial<ExperienceContent>) => {
		return callApi<ExperienceContent>(`/api/admin/experience/${id}`, {
			method: 'PUT',
			body: JSON.stringify(experienceData)
		})
	}, [callApi])

	const deleteExperience = useCallback((id: string) => {
		return callApi<void>(`/api/admin/experience/${id}`, {
			method: 'DELETE'
		})
	}, [callApi])

	// Skills methods
	const getSkillsData = useCallback(() => {
		return callApi<SkillContent[]>('/api/skills')
	}, [callApi])

	const createSkill = useCallback((skillData: Omit<SkillContent, 'id'>) => {
		return callApi<SkillContent>('/api/admin/skills', {
			method: 'POST',
			body: JSON.stringify(skillData)
		})
	}, [callApi])

	const updateSkill = useCallback((id: string, skillData: Partial<SkillContent>) => {
		return callApi<SkillContent>(`/api/admin/skills/${id}`, {
			method: 'PUT',
			body: JSON.stringify(skillData)
		})
	}, [callApi])

	const deleteSkill = useCallback((id: string) => {
		return callApi<void>(`/api/admin/skills/${id}`, {
			method: 'DELETE'
		})
	}, [callApi])

	// Contact methods
	const getContactData = useCallback(() => {
		return callApi<ContactContent>('/api/contact')
	}, [callApi])

	const updateContactData = useCallback((contactData: Partial<ContactContent>) => {
		return callApi<ContactContent>('/api/admin/contact', {
			method: 'PUT',
			body: JSON.stringify(contactData)
		})
	}, [callApi])

	// Reset all data
	const resetAllData = useCallback(() => {
		return callApi<void>('/api/admin/reset', {
			method: 'POST'
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
		getAllContent,
		getHeroData,
		updateHeroData,
		getAboutData,
		updateAboutData,
		getProjectsData,
		createProject,
		updateProject,
		deleteProject,
		getExperienceData,
		createExperience,
		updateExperience,
		deleteExperience,
		getSkillsData,
		createSkill,
		updateSkill,
		deleteSkill,
		getContactData,
		updateContactData,
		resetAllData,
		clearError
	}
} 