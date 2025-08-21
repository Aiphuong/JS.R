'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Award, Users, TrendingUp, Code, Globe } from 'lucide-react'

export default function Experience() {
	const experiences = [
		{
			id: 1,
			title: 'Senior Full-Stack Developer',
			company: 'TechCorp Solutions',
			location: 'Ho Chi Minh City, Vietnam',
			period: '2023 - Present',
			description: 'Leading development teams and architecting scalable solutions for enterprise clients. Mentoring junior developers and implementing best practices.',
			achievements: [
				'Led a team of 8 developers on a major e-commerce platform',
				'Improved application performance by 40% through optimization',
				'Implemented CI/CD pipelines reducing deployment time by 60%'
			],
			technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
			icon: <Code size={24} />
		},
		{
			id: 2,
			title: 'Full-Stack Developer',
			company: 'StartupHub',
			location: 'Ho Chi Minh City, Vietnam',
			period: '2021 - 2023',
			description: 'Built and maintained multiple web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality products.',
			achievements: [
				'Developed 5+ web applications from concept to deployment',
				'Reduced bug reports by 30% through improved testing',
				'Introduced modern development practices to the team'
			],
			technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Vuex'],
			icon: <Globe size={24} />
		},
		{
			id: 3,
			title: 'Frontend Developer',
			company: 'Digital Creative Agency',
			location: 'Ho Chi Minh City, Vietnam',
			period: '2019 - 2021',
			description: 'Created responsive and interactive user interfaces for various clients. Focused on user experience and modern design principles.',
			achievements: [
				'Designed and developed 20+ client websites',
				'Improved user engagement by 25% through UI/UX improvements',
				'Collaborated with designers to create pixel-perfect implementations'
			],
			technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux'],
			icon: <Code size={24} />
		}
	]

	const stats = [
		{ icon: <Briefcase size={24} />, number: '5+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
		{ icon: <Users size={24} />, number: '50+', label: 'Projects Delivered', color: 'from-purple-500 to-pink-500' },
		{ icon: <Award size={24} />, number: '15+', label: 'Happy Clients', color: 'from-green-500 to-emerald-500' },
		{ icon: <TrendingUp size={24} />, number: '100%', label: 'Success Rate', color: 'from-orange-500 to-red-500' }
	]

	return (
		<section id="experience" className="section-padding bg-gradient-to-b from-slate-900 via-green-900/20 to-slate-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
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
						className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6"
					>
						<Briefcase size={16} className="mr-2" />
						Professional Journey
					</motion.div>

					<h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
						My <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
					</h2>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						A journey of continuous growth, learning, and delivering exceptional results 
						across various roles and projects in the tech industry.
					</p>
				</motion.div>

				{/* Stats Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
				>
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -10, scale: 1.05 }}
							className="group p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center"
						>
							<div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
								{stat.icon}
							</div>
							<div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
							<div className="text-gray-300 text-sm">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Experience Timeline */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 transform -translate-x-1/2" />

					{/* Experience Items */}
					<div className="space-y-16">
						{experiences.map((experience, index) => (
							<motion.div
								key={experience.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: true }}
								className={`relative flex items-center ${
									index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
								}`}
							>
								{/* Timeline Dot */}
								<div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-slate-900 z-10" />

								{/* Content Card */}
								<div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
									<motion.div
										whileHover={{ y: -10, scale: 1.02 }}
										className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
									>
										{/* Header */}
										<div className="flex items-start gap-4 mb-6">
											<div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
												{experience.icon}
											</div>
											<div className="flex-1">
												<h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
												<div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
													<div className="flex items-center gap-1">
														<Briefcase size={16} />
														{experience.company}
													</div>
													<div className="flex items-center gap-1">
														<MapPin size={16} />
														{experience.location}
													</div>
												</div>
												<div className="flex items-center gap-1 text-blue-400 text-sm">
													<Calendar size={16} />
													{experience.period}
												</div>
											</div>
										</div>

										{/* Description */}
										<p className="text-gray-300 leading-relaxed mb-6">
											{experience.description}
										</p>

										{/* Achievements */}
										<div className="mb-6">
											<h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
											<ul className="space-y-2">
												{experience.achievements.map((achievement, achievementIndex) => (
													<li key={achievementIndex} className="flex items-start gap-2 text-gray-300 text-sm">
														<span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
														{achievement}
													</li>
												))}
											</ul>
										</div>

										{/* Technologies */}
										<div>
											<h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
											<div className="flex flex-wrap gap-2">
												{experience.technologies.map((tech) => (
													<span
														key={tech}
														className="px-3 py-1 bg-white/10 border border-white/20 text-white text-sm rounded-lg"
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									</motion.div>
								</div>

								{/* Spacer for odd items */}
								{index % 2 === 1 && <div className="w-5/12" />}
							</motion.div>
						))}
					</div>
				</div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-20"
				>
					<div className="p-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl border border-green-500/20">
						<h3 className="text-2xl font-bold text-white mb-4">Ready for the Next Challenge</h3>
						<p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
							I&apos;m always looking for new opportunities to grow, learn, and contribute to exciting projects. 
							Let&apos;s discuss how we can work together!
						</p>
						<motion.button
							whileHover={{ scale: 1.05, y: -5 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
						>
							Let&apos;s Connect
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	)
} 
