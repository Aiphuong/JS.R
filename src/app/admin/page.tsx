'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
	User, 
	FolderOpen, 
	Briefcase, 
	Mail, 
	Settings,
	Edit3,
	Eye,
	Save
} from 'lucide-react'

interface PortfolioData {
	hero: {
		title: string
		subtitle?: string
		description?: string
		image?: string
		ctaText?: string
		ctaLink?: string
		background?: string
		animation?: string
	} | null
	about: {
		title: string
		description: string
		image?: string
		skills?: string[]
		experience?: string
	} | null
	projects: Array<{
		id: string
		title: string
		description: string
		image?: string
		technologies?: string[]
		githubUrl?: string
		liveUrl?: string
		featured?: boolean
	}>
	experience: Array<{
		id: string
		title: string
		company: string
		period: string
		description: string
		technologies?: string[]
	}>
	skills: Array<{
		id: string
		name: string
		category: string
		level: number
		icon?: string
	}>
	contact: {
		email: string
		phone?: string
		address?: string
		socialLinks?: {
			github?: string
			linkedin?: string
			twitter?: string
			instagram?: string
		}
	} | null
	lastUpdated: string
}

export default function AdminDashboard() {
	const [content, setContent] = useState<PortfolioData | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	useEffect(() => {
		fetchContent()
	}, [])

	const fetchContent = async () => {
		try {
			const response = await fetch('/api/content')
			const data = await response.json()
			if (data.success) {
				setContent(data.data)
			} else {
				console.error('Error fetching content:', data.error)
			}
		} catch (error) {
			console.error('Error fetching content:', error)
		} finally {
			setLoading(false)
		}
	}

	const saveContent = async () => {
		if (!content) return
		
		setSaving(true)
		try {
			const response = await fetch('/api/content', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(content),
			})
			
			if (response.ok) {
				alert('Content saved successfully!')
			} else {
				alert('Error saving content')
			}
		} catch (error) {
			console.error('Error saving content:', error)
			alert('Error saving content')
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		)
	}

	const sections = [
		{
			title: 'Hero Section',
			description: 'Edit greeting, title, subtitle, and description',
			icon: <User className="w-6 h-6" />,
			href: '/admin/hero',
			preview: content?.hero?.title || 'Not set'
		},
		{
			title: 'About Section',
			description: 'Edit personal story, info, and skills',
			icon: <User className="w-6 h-6" />,
			href: '/admin/about',
			preview: content?.about?.title || 'Not set'
		},
		{
			title: 'Projects',
			description: 'Manage your portfolio projects',
			icon: <FolderOpen className="w-6 h-6" />,
			href: '/admin/projects',
			preview: `${content?.projects?.length || 0} projects`
		},
		{
			title: 'Experience',
			description: 'Edit work and education history',
			icon: <Briefcase className="w-6 h-6" />,
			href: '/admin/experience',
			preview: `${content?.experience?.length || 0} entries`
		},
		{
			title: 'Contact',
			description: 'Update contact information',
			icon: <Mail className="w-6 h-6" />,
			href: '/admin/contact',
			preview: content?.contact?.email || 'Not set'
		},
		{
			title: 'Settings',
			description: 'General settings and configuration',
			icon: <Settings className="w-6 h-6" />,
			href: '/admin/settings',
			preview: 'Configure settings'
		}
	]

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
					<p className="text-gray-600 mt-2">Manage your portfolio content</p>
				</div>
				<div className="flex space-x-3">
					<Link
						href="/"
						target="_blank"
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<Eye className="w-4 h-4 mr-2" />
						Preview Site
					</Link>
					<button
						onClick={saveContent}
						disabled={saving}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
					>
						<Save className="w-4 h-4 mr-2" />
						{saving ? 'Saving...' : 'Save All Changes'}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sections.map((section) => (
					<Link
						key={section.href}
						href={section.href}
						className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
										{section.icon}
									</div>
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-medium text-gray-900">
										{section.title}
									</h3>
									<p className="text-sm text-gray-500 mt-1">
										{section.description}
									</p>
								</div>
							</div>
							<Edit3 className="w-4 h-4 text-gray-400" />
						</div>
						<div className="mt-4">
							<p className="text-sm text-gray-600">
								Current: <span className="font-medium">{section.preview}</span>
							</p>
						</div>
					</Link>
				))}
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">
							{content?.projects?.length || 0}
						</div>
						<div className="text-sm text-gray-500">Projects</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-green-600">
							{content?.experience?.length || 0}
						</div>
						<div className="text-sm text-gray-500">Experience</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-purple-600">
							{content?.skills?.length || 0}
						</div>
						<div className="text-sm text-gray-500">Skills</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-orange-600">
							{content?.about?.skills?.length || 0}
						</div>
						<div className="text-sm text-gray-500">About Skills</div>
					</div>
				</div>
			</div>

			{content?.lastUpdated && (
				<div className="bg-gray-50 rounded-lg p-4">
					<p className="text-sm text-gray-600">
						Last updated: {new Date(content.lastUpdated).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	)
} 