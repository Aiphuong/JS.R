'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { PortfolioContent } from '@/lib/types/content'

interface AboutFormData {
	story: string
	personalInfo: {
		name: string
		location: string
		experience: string
		email: string
	}
	socialLinks: {
		github: string
		linkedin: string
		twitter: string
	}
	skills: Array<{
		name: string
		level: number
	}>
}

export default function AboutEditor() {
	const [content, setContent] = useState<PortfolioContent | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm<AboutFormData>()

	const watchedSkills = watch('skills')

	useEffect(() => {
		fetchContent()
	}, [])

	const fetchContent = async () => {
		try {
			const response = await fetch('/api/content')
			const data = await response.json()
			setContent(data)
			reset(data.about)
		} catch (error) {
			console.error('Error fetching content:', error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: AboutFormData) => {
		if (!content) return

		setSaving(true)
		try {
			const updatedContent = {
				...content,
				about: data
			}

			const response = await fetch('/api/content', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedContent),
			})

			if (response.ok) {
				setContent(updatedContent)
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

	const addSkill = () => {
		const currentSkills = watchedSkills || []
		const newSkills = [...currentSkills, { name: '', level: 50 }]
		reset({ ...watch(), skills: newSkills })
	}

	const removeSkill = (index: number) => {
		const currentSkills = watchedSkills || []
		const newSkills = currentSkills.filter((_, i) => i !== index)
		reset({ ...watch(), skills: newSkills })
	}

	const updateSkill = (index: number, field: 'name' | 'level', value: string | number) => {
		const currentSkills = watchedSkills || []
		const newSkills = currentSkills.map((skill, i) => 
			i === index ? { ...skill, [field]: value } : skill
		)
		reset({ ...watch(), skills: newSkills })
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
						{/* Story */}
						<div>
							<label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
								Your Story *
							</label>
							<textarea
								id="story"
								rows={6}
								{...register('story', { required: 'Story is required' })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Tell your story..."
							/>
							{errors.story && (
								<p className="mt-1 text-sm text-red-600">{errors.story.message}</p>
							)}
						</div>

						{/* Personal Info */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="personalInfo.name" className="block text-sm font-medium text-gray-700 mb-2">
										Name *
									</label>
									<input
										type="text"
										id="personalInfo.name"
										{...register('personalInfo.name', { required: 'Name is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="Your Name"
									/>
								</div>

								<div>
									<label htmlFor="personalInfo.location" className="block text-sm font-medium text-gray-700 mb-2">
										Location *
									</label>
									<input
										type="text"
										id="personalInfo.location"
										{...register('personalInfo.location', { required: 'Location is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="City, Country"
									/>
								</div>

								<div>
									<label htmlFor="personalInfo.experience" className="block text-sm font-medium text-gray-700 mb-2">
										Experience *
									</label>
									<input
										type="text"
										id="personalInfo.experience"
										{...register('personalInfo.experience', { required: 'Experience is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="3+ Years"
									/>
								</div>

								<div>
									<label htmlFor="personalInfo.email" className="block text-sm font-medium text-gray-700 mb-2">
										Email *
									</label>
									<input
										type="email"
										id="personalInfo.email"
										{...register('personalInfo.email', { required: 'Email is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="your.email@example.com"
									/>
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-900">Social Links</h3>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="socialLinks.github" className="block text-sm font-medium text-gray-700 mb-2">
										GitHub URL *
									</label>
									<input
										type="url"
										id="socialLinks.github"
										{...register('socialLinks.github', { required: 'GitHub URL is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://github.com/username"
									/>
								</div>

								<div>
									<label htmlFor="socialLinks.linkedin" className="block text-sm font-medium text-gray-700 mb-2">
										LinkedIn URL *
									</label>
									<input
										type="url"
										id="socialLinks.linkedin"
										{...register('socialLinks.linkedin', { required: 'LinkedIn URL is required' })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://linkedin.com/in/username"
									/>
								</div>

								<div>
									<label htmlFor="socialLinks.twitter" className="block text-sm font-medium text-gray-700 mb-2">
										Twitter URL (Optional)
									</label>
									<input
										type="url"
										id="socialLinks.twitter"
										{...register('socialLinks.twitter')}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://twitter.com/username"
									/>
								</div>
							</div>
						</div>

						{/* Skills */}
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-medium text-gray-900">Skills</h3>
								<button
									type="button"
									onClick={addSkill}
									className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<Plus className="w-4 h-4 mr-1" />
									Add Skill
								</button>
							</div>

							<div className="space-y-3">
								{(watchedSkills || []).map((skill, index) => (
									<div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
										<div className="flex-1">
											<input
												type="text"
												value={skill.name}
												onChange={(e) => updateSkill(index, 'name', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												placeholder="Skill name"
											/>
										</div>
										<div className="w-24">
											<input
												type="number"
												min="0"
												max="100"
												value={skill.level}
												onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												placeholder="Level"
											/>
										</div>
										<button
											type="button"
											onClick={() => removeSkill(index)}
											className="p-2 text-red-600 hover:text-red-800"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
						</div>

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
					<div className="space-y-6">
						<div>
							<h4 className="font-medium text-gray-900 mb-2">Story</h4>
							<p className="text-gray-700 text-sm">
								{content?.about.story || 'Your story will appear here...'}
							</p>
						</div>

						<div>
							<h4 className="font-medium text-gray-900 mb-2">Personal Info</h4>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="text-gray-500">Name:</span>
									<p className="font-medium">{content?.about.personalInfo.name || 'Not set'}</p>
								</div>
								<div>
									<span className="text-gray-500">Location:</span>
									<p className="font-medium">{content?.about.personalInfo.location || 'Not set'}</p>
								</div>
								<div>
									<span className="text-gray-500">Experience:</span>
									<p className="font-medium">{content?.about.personalInfo.experience || 'Not set'}</p>
								</div>
								<div>
									<span className="text-gray-500">Email:</span>
									<p className="font-medium">{content?.about.personalInfo.email || 'Not set'}</p>
								</div>
							</div>
						</div>

						<div>
							<h4 className="font-medium text-gray-900 mb-2">Skills</h4>
							<div className="space-y-2">
								{(content?.about.skills || []).map((skill, index) => (
									<div key={index} className="flex items-center justify-between">
										<span className="text-sm font-medium">{skill.name}</span>
										<div className="flex items-center space-x-2">
											<div className="w-20 bg-gray-200 rounded-full h-2">
												<div
													className="bg-blue-600 h-2 rounded-full"
													style={{ width: `${skill.level}%` }}
												></div>
											</div>
											<span className="text-xs text-gray-500 w-8">{skill.level}%</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
} 