'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { AboutContent } from '@/lib/services/simple-storage'

interface AboutFormData {
	title: string
	description: string
	image: string
	skills: string
	experience: string
}

export default function AboutEditor() {
	const [content, setContent] = useState<AboutContent | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<AboutFormData>()

	useEffect(() => {
		fetchContent()
	}, [])

	const fetchContent = async () => {
		try {
			const response = await fetch('/api/about')
			const data = await response.json()
			setContent(data)
			if (data) {
				reset({
					title: data.title || '',
					description: data.description || '',
					image: data.image || '',
					skills: data.skills?.join(', ') || '',
					experience: data.experience || ''
				})
			}
		} catch (error) {
			console.error('Error fetching content:', error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: AboutFormData) => {
		setSaving(true)
		try {
			const aboutData: Partial<AboutContent> = {
				title: data.title,
				description: data.description,
				image: data.image || undefined,
				skills: data.skills ? data.skills.split(',').map(skill => skill.trim()) : undefined,
				experience: data.experience || undefined
			}

			const response = await fetch('/api/admin/about', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(aboutData),
			})

			if (response.ok) {
				const updatedData = await response.json()
				setContent(updatedData)
				alert('About section updated successfully!')
			} else {
				alert('Error updating about section')
			}
		} catch (error) {
			console.error('Error updating about section:', error)
			alert('Error updating about section')
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

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Link
						href="/admin"
						className="inline-flex items-center text-gray-500 hover:text-gray-700"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Dashboard
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Edit About Section</h1>
						<p className="text-gray-600 mt-1">Update your personal information and skills</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Form */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Title */}
						<div>
							<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
								Title *
							</label>
							<input
								type="text"
								id="title"
								{...register('title', { required: 'Title is required' })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="About Me"
							/>
							{errors.title && (
								<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
							)}
						</div>

						{/* Description */}
						<div>
							<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
								Description *
							</label>
							<textarea
								id="description"
								rows={6}
								{...register('description', { required: 'Description is required' })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Tell your story..."
							/>
							{errors.description && (
								<p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
							)}
						</div>

						{/* Image */}
						<div>
							<label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
								Image URL
							</label>
							<input
								type="url"
								id="image"
								{...register('image')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						{/* Experience */}
						<div>
							<label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
								Experience
							</label>
							<input
								type="text"
								id="experience"
								{...register('experience')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="3+ Years"
							/>
						</div>

						{/* Skills */}
						<div>
							<label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
								Skills (comma-separated)
							</label>
							<input
								type="text"
								id="skills"
								{...register('skills')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="React, Node.js, TypeScript"
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-end">
							<button
								type="submit"
								disabled={saving}
								className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								<Save className="w-4 h-4 mr-2" />
								{saving ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</form>
				</div>

				{/* Preview */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
					{content && (
						<div className="space-y-4">
							<h4 className="text-xl font-semibold">{content.title}</h4>
							<p className="text-gray-600">{content.description}</p>
							{content.image && (
								<img
									src={content.image}
									alt="About"
									className="w-full h-48 object-cover rounded-lg"
								/>
							)}
							{content.experience && (
								<p className="text-sm text-gray-500">
									<strong>Experience:</strong> {content.experience}
								</p>
							)}
							{content.skills && content.skills.length > 0 && (
								<div>
									<strong className="text-sm text-gray-500">Skills:</strong>
									<div className="flex flex-wrap gap-2 mt-2">
										{content.skills.map((skill, index) => (
											<span
												key={index}
												className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
} 