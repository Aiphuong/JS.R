'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { Project, PortfolioContent } from '@/lib/types/content'

interface ProjectFormData {
	title: string
	description: string
	image: string
	technologies: string
	category: string
	liveUrl: string
	githubUrl: string
	featured: boolean
}

export default function ProjectsEditor() {
	const [content, setContent] = useState<PortfolioContent | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [editingProject, setEditingProject] = useState<Project | null>(null)
	const [showForm, setShowForm] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ProjectFormData>()

	useEffect(() => {
		fetchContent()
	}, [])

	const fetchContent = async () => {
		try {
			const response = await fetch('/api/content')
			const data = await response.json()
			setContent(data)
		} catch (error) {
			console.error('Error fetching content:', error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: ProjectFormData) => {
		if (!content) return

		setSaving(true)
		try {
			const projectData: Project = {
				id: editingProject?.id || Date.now().toString(),
				title: data.title,
				description: data.description,
				image: data.image,
				technologies: data.technologies.split(',').map(tech => tech.trim()),
				category: data.category,
				liveUrl: data.liveUrl || undefined,
				githubUrl: data.githubUrl || undefined,
				featured: data.featured
			}

			let updatedProjects: Project[]
			if (editingProject) {
				// Update existing project
				updatedProjects = content.projects.map(p => 
					p.id === editingProject.id ? projectData : p
				)
			} else {
				// Add new project
				updatedProjects = [...content.projects, projectData]
			}

			const updatedContent = {
				...content,
				projects: updatedProjects
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
				resetForm()
				alert(editingProject ? 'Project updated successfully!' : 'Project added successfully!')
			} else {
				alert('Error saving project')
			}
		} catch (error) {
			console.error('Error saving project:', error)
			alert('Error saving project')
		} finally {
			setSaving(false)
		}
	}

	const deleteProject = async (projectId: string) => {
		if (!content || !confirm('Are you sure you want to delete this project?')) return

		try {
			const updatedProjects = content.projects.filter(p => p.id !== projectId)
			const updatedContent = {
				...content,
				projects: updatedProjects
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
				alert('Project deleted successfully!')
			} else {
				alert('Error deleting project')
			}
		} catch (error) {
			console.error('Error deleting project:', error)
			alert('Error deleting project')
		}
	}

	const editProject = (project: Project) => {
		setEditingProject(project)
		reset({
			title: project.title,
			description: project.description,
			image: project.image,
			technologies: project.technologies.join(', '),
			category: project.category,
			liveUrl: project.liveUrl || '',
			githubUrl: project.githubUrl || '',
			featured: project.featured
		})
		setShowForm(true)
	}

	const resetForm = () => {
		setEditingProject(null)
		setShowForm(false)
		reset({
			title: '',
			description: '',
			image: '',
			technologies: '',
			category: '',
			liveUrl: '',
			githubUrl: '',
			featured: false
		})
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
						<h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
						<p className="text-gray-600 mt-1">Add, edit, and delete your portfolio projects</p>
					</div>
				</div>
				<button
					onClick={() => setShowForm(true)}
					className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Project
				</button>
			</div>

			{/* Form */}
			{showForm && (
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-900">
							{editingProject ? 'Edit Project' : 'Add New Project'}
						</h2>
						<button
							onClick={resetForm}
							className="text-gray-500 hover:text-gray-700"
						>
							× Close
						</button>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
									Project Title *
								</label>
								<input
									type="text"
									id="title"
									{...register('title', { required: 'Title is required' })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="Project Name"
								/>
								{errors.title && (
									<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
								)}
							</div>

							<div>
								<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
									Category *
								</label>
								<select
									id="category"
									{...register('category', { required: 'Category is required' })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select Category</option>
									<option value="fullstack">Full Stack</option>
									<option value="frontend">Frontend</option>
									<option value="backend">Backend</option>
									<option value="mobile">Mobile</option>
									<option value="other">Other</option>
								</select>
								{errors.category && (
									<p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
								)}
							</div>
						</div>

						<div>
							<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
								Description *
							</label>
							<textarea
								id="description"
								rows={4}
								{...register('description', { required: 'Description is required' })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Describe your project..."
							/>
							{errors.description && (
								<p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

							<div>
								<label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">
									Technologies *
								</label>
								<input
									type="text"
									id="technologies"
									{...register('technologies', { required: 'Technologies are required' })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="React, TypeScript, Node.js (comma separated)"
								/>
								{errors.technologies && (
									<p className="mt-1 text-sm text-red-600">{errors.technologies.message}</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
									Live URL
								</label>
								<input
									type="url"
									id="liveUrl"
									{...register('liveUrl')}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="https://example.com"
								/>
							</div>

							<div>
								<label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
									GitHub URL
								</label>
								<input
									type="url"
									id="githubUrl"
									{...register('githubUrl')}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="https://github.com/username/project"
								/>
							</div>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="featured"
								{...register('featured')}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
								Featured Project
							</label>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={saving}
								className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								<Save className="w-4 h-4 mr-2" />
								{saving ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Projects List */}
			<div className="bg-white rounded-lg border border-gray-200">
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-medium text-gray-900">Projects ({content?.projects.length || 0})</h3>
				</div>
				<div className="divide-y divide-gray-200">
					{content?.projects.map((project) => (
						<div key={project.id} className="p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									{project.image && (
										<img
											src={project.image}
											alt={project.title}
											className="w-16 h-16 object-cover rounded-lg"
										/>
									)}
									<div>
										<div className="flex items-center space-x-2">
											<h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
											{project.featured && (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
													Featured
												</span>
											)}
										</div>
										<p className="text-sm text-gray-600 mt-1">{project.description}</p>
										<div className="flex items-center space-x-4 mt-2">
											<span className="text-xs text-gray-500 capitalize">{project.category}</span>
											<div className="flex flex-wrap gap-1">
												{project.technologies.slice(0, 3).map((tech, index) => (
													<span
														key={index}
														className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
													>
														{tech}
													</span>
												))}
												{project.technologies.length > 3 && (
													<span className="text-xs text-gray-500">
														+{project.technologies.length - 3} more
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									{project.liveUrl && (
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 text-gray-400 hover:text-gray-600"
										>
											<Eye className="w-4 h-4" />
										</a>
									)}
									<button
										onClick={() => editProject(project)}
										className="p-2 text-gray-400 hover:text-blue-600"
									>
										<Edit className="w-4 h-4" />
									</button>
									<button
										onClick={() => deleteProject(project.id)}
										className="p-2 text-gray-400 hover:text-red-600"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					))}
					{(!content?.projects || content.projects.length === 0) && (
						<div className="p-6 text-center text-gray-500">
							No projects yet. Add your first project!
						</div>
					)}
				</div>
			</div>
		</div>
	)
} 