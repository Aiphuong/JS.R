'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { ProjectContent } from '@/lib/services/simple-storage'

interface ProjectFormData {
	title: string
	description: string
	image: string
	technologies: string
	liveUrl: string
	githubUrl: string
	featured: boolean
}

export default function ProjectsEditor() {
	const [projects, setProjects] = useState<ProjectContent[]>([])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [editingProject, setEditingProject] = useState<ProjectContent | null>(null)
	const [showForm, setShowForm] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ProjectFormData>()

	useEffect(() => {
		fetchProjects()
	}, [])

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects')
			const data = await response.json()
			setProjects(data)
		} catch (error) {
			console.error('Error fetching projects:', error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data: ProjectFormData) => {
		setSaving(true)
		try {
			const projectData: Omit<ProjectContent, 'id'> = {
				title: data.title,
				description: data.description,
				image: data.image,
				technologies: data.technologies.split(',').map(tech => tech.trim()),
				liveUrl: data.liveUrl || undefined,
				githubUrl: data.githubUrl || undefined,
				featured: data.featured
			}

			let response
			if (editingProject) {
				// Update existing project
				response = await fetch(`/api/projects/${editingProject.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(projectData),
				})
			} else {
				// Add new project
				response = await fetch('/api/projects', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(projectData),
				})
			}

			if (response.ok) {
				await fetchProjects()
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
		if (!confirm('Are you sure you want to delete this project?')) return

		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				await fetchProjects()
				alert('Project deleted successfully!')
			} else {
				alert('Error deleting project')
			}
		} catch (error) {
			console.error('Error deleting project:', error)
			alert('Error deleting project')
		}
	}

	const editProject = (project: ProjectContent) => {
		setEditingProject(project)
		reset({
			title: project.title,
			description: project.description,
			image: project.image || '',
			technologies: project.technologies?.join(', ') || '',
			liveUrl: project.liveUrl || '',
			githubUrl: project.githubUrl || '',
			featured: project.featured || false
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
				<div className="bg-white p-6 rounded-lg shadow">
					<h2 className="text-xl font-semibold mb-4">
						{editingProject ? 'Edit Project' : 'Add New Project'}
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Title</label>
								<input
									type="text"
									{...register('title', { required: 'Title is required' })}
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
								{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Image URL</label>
								<input
									type="text"
									{...register('image')}
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Description</label>
							<textarea
								{...register('description', { required: 'Description is required' })}
								rows={3}
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
							<input
								type="text"
								{...register('technologies')}
								placeholder="React, Node.js, TypeScript"
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Live URL</label>
								<input
									type="url"
									{...register('liveUrl')}
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">GitHub URL</label>
								<input
									type="url"
									{...register('githubUrl')}
									className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								{...register('featured')}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label className="ml-2 block text-sm text-gray-900">Featured Project</label>
						</div>

						<div className="flex space-x-3">
							<button
								type="submit"
								disabled={saving}
								className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
							>
								<Save className="w-4 h-4 mr-2" />
								{saving ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
							</button>
							<button
								type="button"
								onClick={resetForm}
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Projects List */}
			<div className="bg-white rounded-lg shadow">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-medium text-gray-900">Projects ({projects.length})</h2>
				</div>
				<div className="divide-y divide-gray-200">
					{projects.map((project) => (
						<div key={project.id} className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center space-x-3">
										<h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
										{project.featured && (
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
												Featured
											</span>
										)}
									</div>
									<p className="text-gray-600 mt-1">{project.description}</p>
									{project.technologies && project.technologies.length > 0 && (
										<div className="mt-2">
											<span className="text-sm text-gray-500">Technologies: </span>
											<span className="text-sm text-gray-700">{project.technologies.join(', ')}</span>
										</div>
									)}
									<div className="mt-3 flex space-x-3">
										{project.liveUrl && (
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
											>
												<Eye className="w-4 h-4 mr-1" />
												Live Demo
											</a>
										)}
										{project.githubUrl && (
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
											>
												<Edit className="w-4 h-4 mr-1" />
												GitHub
											</a>
										)}
									</div>
								</div>
								<div className="flex space-x-2">
									<button
										onClick={() => editProject(project)}
										className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										<Edit className="w-4 h-4" />
									</button>
									<button
										onClick={() => deleteProject(project.id)}
										className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					))}
					{projects.length === 0 && (
						<div className="p-6 text-center text-gray-500">
							No projects found. Add your first project to get started.
						</div>
					)}
				</div>
			</div>
		</div>
	)
} 