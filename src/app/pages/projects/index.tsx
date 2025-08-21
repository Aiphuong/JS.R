'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Eye, Filter, Star, Users, Calendar } from 'lucide-react'

export default function Projects() {
	const [activeFilter, setActiveFilter] = useState('all')

	const categories = [
		{ id: 'all', name: 'All Projects', count: 12 },
		{ id: 'web', name: 'Web Apps', count: 6 },
		{ id: 'mobile', name: 'Mobile Apps', count: 3 },
		{ id: 'ui', name: 'UI/UX Design', count: 3 }
	]

	const projects = [
		{
			id: 1,
			title: 'E-Commerce Platform',
			description: 'A full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and admin dashboard.',
			image: '/api/placeholder/400/300',
			category: 'web',
			technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
			github: 'https://github.com/username/ecommerce',
			live: 'https://ecommerce-demo.com',
			stars: 45,
			contributors: 8,
			date: '2024'
		},
		{
			id: 2,
			title: 'Task Management App',
			description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
			image: '/api/placeholder/400/500',
			category: 'web',
			technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
			github: 'https://github.com/username/taskapp',
			live: 'https://taskapp-demo.com',
			stars: 32,
			contributors: 5,
			date: '2024'
		},
		{
			id: 3,
			title: 'Fitness Tracker Mobile App',
			description: 'Cross-platform mobile app for tracking workouts, nutrition, and fitness goals with beautiful charts and analytics.',
			image: '/api/placeholder/400/400',
			category: 'mobile',
			technologies: ['React Native', 'Expo', 'Firebase', 'Recharts'],
			github: 'https://github.com/username/fitness-app',
			live: null,
			stars: 28,
			contributors: 3,
			date: '2023'
		},
		{
			id: 4,
			title: 'Portfolio Website Design',
			description: 'Modern portfolio website design with smooth animations, responsive layout, and interactive elements.',
			image: '/api/placeholder/400/350',
			category: 'ui',
			technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
			github: null,
			live: 'https://portfolio-design.com',
			stars: 15,
			contributors: 1,
			date: '2023'
		},
		{
			id: 5,
			title: 'Social Media Dashboard',
			description: 'Comprehensive dashboard for managing multiple social media accounts with analytics and scheduling features.',
			image: '/api/placeholder/400/450',
			category: 'web',
			technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
			github: 'https://github.com/username/social-dashboard',
			live: 'https://social-dashboard.com',
			stars: 67,
			contributors: 12,
			date: '2023'
		},
		{
			id: 6,
			title: 'Weather Forecast App',
			description: 'Beautiful weather application with location-based forecasts, detailed maps, and weather alerts.',
			image: '/api/placeholder/400/300',
			category: 'mobile',
			technologies: ['Flutter', 'Dart', 'OpenWeather API', 'Google Maps'],
			github: 'https://github.com/username/weather-app',
			live: null,
			stars: 23,
			contributors: 2,
			date: '2023'
		}
	]

	const filteredProjects = activeFilter === 'all' 
		? projects 
		: projects.filter(project => project.category === activeFilter)

	return (
		<section id="projects" className="section-padding bg-gradient-to-b from-slate-900 via-pink-900/20 to-slate-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
			</div>

			{/* Grid Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

			<div className="container-custom relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-20"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6"
					>
						<Filter size={16} className="mr-2" />
						Featured Work
					</motion.div>

					<h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
						My <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
					</h2>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Explore a collection of my best work, showcasing innovative solutions, 
						beautiful designs, and cutting-edge technologies.
					</p>
				</motion.div>

				{/* Filter Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="flex flex-wrap justify-center gap-4 mb-16"
				>
					{categories.map((category) => (
						<motion.button
							key={category.id}
							onClick={() => setActiveFilter(category.id)}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
								activeFilter === category.id
									? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
									: 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40'
							}`}
						>
							{category.name}
							<span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
								{category.count}
							</span>
						</motion.button>
					))}
				</motion.div>

				{/* Projects Grid */}
				<AnimatePresence mode="wait">
					<motion.div
						key={activeFilter}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -30 }}
						transition={{ duration: 0.6 }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
							>
								{/* Project Image */}
								<div className="relative h-64 overflow-hidden">
									<div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
										<span className="text-gray-400 text-sm">Project Image</span>
									</div>
									
									{/* Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									
									{/* Action Buttons */}
									<div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
										{project.live && (
											<motion.a
												href={project.live}
												target="_blank"
												rel="noopener noreferrer"
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-300"
											>
												<ExternalLink size={20} />
											</motion.a>
										)}
										{project.github && (
											<motion.a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-300"
											>
												<Github size={20} />
											</motion.a>
										)}
									</div>
								</div>

								{/* Project Content */}
								<div className="p-6">
									<div className="flex items-center gap-2 mb-3">
										<span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 text-xs font-medium rounded-full">
											{project.category.toUpperCase()}
										</span>
										<span className="text-gray-400 text-sm">{project.date}</span>
									</div>

									<h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
										{project.title}
									</h3>

									<p className="text-gray-300 text-sm leading-relaxed mb-4">
										{project.description}
									</p>

									{/* Technologies */}
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-lg"
											>
												{tech}
											</span>
										))}
									</div>

									{/* Project Stats */}
									<div className="flex items-center justify-between text-sm text-gray-400">
										<div className="flex items-center gap-1">
											<Star size={16} className="text-yellow-400" />
											<span>{project.stars}</span>
										</div>
										<div className="flex items-center gap-1">
											<Users size={16} className="text-blue-400" />
											<span>{project.contributors}</span>
										</div>
										<div className="flex items-center gap-1">
											<Calendar size={16} className="text-green-400" />
											<span>{project.date}</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-20"
				>
					<div className="p-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl border border-pink-500/20">
						<h3 className="text-2xl font-bold text-white mb-4">Interested in Working Together?</h3>
						<p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
							I&apos;m always open to discussing new opportunities and exciting projects. 
							Let&apos;s create something amazing together!
						</p>
						<motion.button
							whileHover={{ scale: 1.05, y: -5 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
						>
							Get In Touch
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	)
} 
