'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'

interface Project {
	id: string
	title: string
	description: string
	image: string
	technologies: string[]
	category: string
	liveUrl?: string
	githubUrl?: string
	featured: boolean
}

const projects: Project[] = [
	{
		id: '1',
		title: 'E-Commerce Platform',
		description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
		image: '/images/project1.jpg',
		technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'Tailwind CSS'],
		category: 'fullstack',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project1',
		featured: true
	},
	{
		id: '2',
		title: 'Task Management App',
		description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
		image: '/images/project2.jpg',
		technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
		category: 'fullstack',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project2',
		featured: true
	},
	{
		id: '3',
		title: 'Portfolio Website',
		description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.',
		image: '/images/project3.jpg',
		technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
		category: 'frontend',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project3',
		featured: false
	},
	{
		id: '4',
		title: 'Weather Dashboard',
		description: 'A weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
		image: '/images/project4.jpg',
		technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
		category: 'frontend',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project4',
		featured: false
	},
	{
		id: '5',
		title: 'REST API Service',
		description: 'A comprehensive REST API service with authentication, rate limiting, and comprehensive documentation.',
		image: '/images/project5.jpg',
		technologies: ['Node.js', 'Express', 'JWT', 'PostgreSQL', 'Swagger'],
		category: 'backend',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project5',
		featured: false
	},
	{
		id: '6',
		title: 'Mobile Fitness App',
		description: 'A cross-platform mobile application for fitness tracking with workout plans and progress monitoring.',
		image: '/images/project6.jpg',
		technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
		category: 'mobile',
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/yourusername/project6',
		featured: false
	}
]

const categories = [
	{ id: 'all', name: 'All Projects' },
	{ id: 'fullstack', name: 'Full Stack' },
	{ id: 'frontend', name: 'Frontend' },
	{ id: 'backend', name: 'Backend' },
	{ id: 'mobile', name: 'Mobile' }
]

export default function Projects() {
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [hoveredProject, setHoveredProject] = useState<string | null>(null)

	const filteredProjects = selectedCategory === 'all' 
		? projects 
		: projects.filter(project => project.category === selectedCategory)

	return (
		<section id="projects" className="section-padding bg-gradient-to-b from-background to-secondary/20">
			<div className="container-custom">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						My <span className="gradient-text">Projects</span>
					</h2>
					<p className="text-lg text-foreground/60 max-w-2xl mx-auto">
						Explore my latest work and creative solutions
					</p>
				</motion.div>

				{/* Filter Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
								selectedCategory === category.id
									? 'bg-primary text-primary-foreground shadow-lg'
									: 'bg-card border border-border text-foreground hover:border-primary hover:bg-primary/5'
							}`}
						>
							{category.name}
						</button>
					))}
				</motion.div>

				{/* Projects Grid */}
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedCategory}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								onHoverStart={() => setHoveredProject(project.id)}
								onHoverEnd={() => setHoveredProject(null)}
								className="group relative"
							>
								<div className="relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 h-full card-hover">
									{/* Project Image */}
									<div className="relative h-48 overflow-hidden">
										<div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
											<span className="text-foreground/40 text-sm">Project Image</span>
										</div>
										
										{/* Overlay */}
										<AnimatePresence>
											{hoveredProject === project.id && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
												>
													{project.liveUrl && (
														<motion.a
															href={project.liveUrl}
															target="_blank"
															rel="noopener noreferrer"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
														>
															<ExternalLink size={20} className="text-white" />
														</motion.a>
													)}
													{project.githubUrl && (
														<motion.a
															href={project.githubUrl}
															target="_blank"
															rel="noopener noreferrer"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
														>
															<Github size={20} className="text-white" />
														</motion.a>
													)}
												</motion.div>
											)}
										</AnimatePresence>

										{/* Featured Badge */}
										{project.featured && (
											<div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
												Featured
											</div>
										)}
									</div>

									{/* Project Content */}
									<div className="p-6">
										<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
											{project.title}
										</h3>
										<p className="text-foreground/60 text-sm leading-relaxed mb-4">
											{project.description}
										</p>

										{/* Technologies */}
										<div className="flex flex-wrap gap-2 mb-4">
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 text-xs font-medium bg-secondary text-foreground rounded border border-border"
												>
													{tech}
												</span>
											))}
										</div>

										{/* Action Buttons */}
										<div className="flex gap-2">
											{project.liveUrl && (
												<a
													href={project.liveUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
												>
													<Eye size={16} />
													Live Demo
												</a>
											)}
											{project.githubUrl && (
												<a
													href={project.githubUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground rounded-lg transition-colors"
												>
													<Github size={16} />
													Code
												</a>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	)
} 
