'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ContactContent } from '@/lib/services/simple-storage'

interface ContactFormData {
	email: string
	phone: string
	address: string
	github: string
	linkedin: string
	twitter: string
	instagram: string
}

export default function ContactEditor() {
	const [content, setContent] = useState<ContactContent | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ContactFormData>()

	useEffect(() => {
		fetchContent()
	}, [])

	const fetchContent = async () => {
		try {
			const response = await fetch('/api/contact')
			const data = await response.json()
			setContent(data)
			if (data) {
				reset({
					email: data.email || '',
					phone: data.phone || '',
					address: data.address || '',
					github: data.socialLinks?.github || '',
					linkedin: data.socialLinks?.linkedin || '',
					twitter: data.socialLinks?.twitter || '',
					instagram: data.socialLinks?.instagram || ''
				})
			}
		} catch (error) {
			console.error('Error fetching content:', error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: ContactFormData) => {
		setSaving(true)
		try {
			const contactData: Partial<ContactContent> = {
				email: data.email,
				phone: data.phone || undefined,
				address: data.address || undefined,
				socialLinks: {
					github: data.github || undefined,
					linkedin: data.linkedin || undefined,
					twitter: data.twitter || undefined,
					instagram: data.instagram || undefined
				}
			}

			const response = await fetch('/api/admin/contact', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(contactData),
			})

			if (response.ok) {
				const updatedData = await response.json()
				setContent(updatedData)
				alert('Contact information updated successfully!')
			} else {
				alert('Error updating contact information')
			}
		} catch (error) {
			console.error('Error updating contact information:', error)
			alert('Error updating contact information')
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
						<h1 className="text-3xl font-bold text-gray-900">Edit Contact Information</h1>
						<p className="text-gray-600 mt-1">Update your contact details</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Form */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email Address *
							</label>
							<input
								type="email"
								id="email"
								{...register('email', { 
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								})}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="your.email@example.com"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
							)}
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								id="phone"
								{...register('phone')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="+1 (555) 123-4567"
							/>
						</div>

						<div>
							<label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
								Address
							</label>
							<input
								type="text"
								id="address"
								{...register('address')}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="City, Country"
							/>
						</div>

						{/* Social Links */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-900">Social Links</h3>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
										GitHub URL
									</label>
									<input
										type="url"
										id="github"
										{...register('github')}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://github.com/username"
									/>
								</div>

								<div>
									<label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
										LinkedIn URL
									</label>
									<input
										type="url"
										id="linkedin"
										{...register('linkedin')}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://linkedin.com/in/username"
									/>
								</div>

								<div>
									<label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
										Twitter URL
									</label>
									<input
										type="url"
										id="twitter"
										{...register('twitter')}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://twitter.com/username"
									/>
								</div>

								<div>
									<label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
										Instagram URL
									</label>
									<input
										type="url"
										id="instagram"
										{...register('instagram')}
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://instagram.com/username"
									/>
								</div>
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
					{content && (
						<div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
										<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-gray-600">Email</p>
										<p className="font-medium text-gray-900">{content.email}</p>
									</div>
								</div>

								{content.phone && (
									<div className="flex items-center space-x-3">
										<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
											<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
											</svg>
										</div>
										<div>
											<p className="text-sm text-gray-600">Phone</p>
											<p className="font-medium text-gray-900">{content.phone}</p>
										</div>
									</div>
								)}

								{content.address && (
									<div className="flex items-center space-x-3">
										<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
											<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</div>
										<div>
											<p className="text-sm text-gray-600">Address</p>
											<p className="font-medium text-gray-900">{content.address}</p>
										</div>
									</div>
								)}

								{content.socialLinks && (
									<div className="space-y-2">
										<p className="text-sm text-gray-600 font-medium">Social Links</p>
										<div className="flex space-x-3">
											{content.socialLinks.github && (
												<a href={content.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
													GitHub
												</a>
											)}
											{content.socialLinks.linkedin && (
												<a href={content.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
													LinkedIn
												</a>
											)}
											{content.socialLinks.twitter && (
												<a href={content.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
													Twitter
												</a>
											)}
											{content.socialLinks.instagram && (
												<a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
													Instagram
												</a>
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
} 