'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Palette, Database, Cloud, Smartphone, Globe, Zap, Shield, Star, Target, Rocket, Layers } from 'lucide-react'

export default function Skills() {
	const { scrollYProgress } = useScroll()
	const y = useTransform(scrollYProgress, [0, 1], [0, -100])

	const skillCategories = [
		{
			title: 'Frontend Development',
			icon: <Code size={32} />,
			color: 'from-blue-500 to-cyan-500',
			description: 'Creating beautiful and responsive user interfaces',
			skills: [
				{ name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-500', icon: <Star size={16} /> },
				{ name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400', icon: <Target size={16} /> },
				{ name: 'Next.js', level: 88, color: 'from-gray-700 to-gray-500', icon: <Rocket size={16} /> },
				{ name: 'Tailwind CSS', level: 92, color: 'from-cyan-500 to-blue-500', icon: <Layers size={16} /> },
				{ name: 'Vue.js', level: 85, color: 'from-green-500 to-emerald-400', icon: <Code size={16} /> }
			]
		},
		{
			title: 'Backend Development',
			icon: <Database size={32} />,
			color: 'from-purple-500 to-pink-500',
			description: 'Building robust and scalable server-side applications',
			skills: [
				{ name: 'Node.js', level: 90, color: 'from-green-500 to-emerald-500', icon: <Zap size={16} /> },
				{ name: 'Python', level: 85, color: 'from-blue-500 to-cyan-500', icon: <Code size={16} /> },
				{ name: 'Express.js', level: 88, color: 'from-gray-600 to-gray-400', icon: <Rocket size={16} /> },
				{ name: 'PostgreSQL', level: 82, color: 'from-blue-600 to-indigo-500', icon: <Database size={16} /> },
				{ name: 'MongoDB', level: 80, color: 'from-green-600 to-emerald-500', icon: <Cloud size={16} /> }
			]
		},
		{
			title: 'UI/UX Design',
			icon: <Palette size={32} />,
			color: 'from-green-500 to-emerald-500',
			description: 'Designing intuitive and beautiful user experiences',
			skills: [
				{ name: 'Figma', level: 88, color: 'from-purple-500 to-pink-500', icon: <Palette size={16} /> },
				{ name: 'Adobe XD', level: 85, color: 'from-blue-500 to-cyan-500', icon: <Target size={16} /> },
				{ name: 'Sketch', level: 80, color: 'from-orange-500 to-red-500', icon: <Star size={16} /> },
				{ name: 'Prototyping', level: 90, color: 'from-green-500 to-emerald-500', icon: <Rocket size={16} /> },
				{ name: 'User Research', level: 85, color: 'from-blue-600 to-indigo-500', icon: <Globe size={16} /> }
			]
		},
		{
			title: 'DevOps & Cloud',
			icon: <Cloud size={32} />,
			color: 'from-orange-500 to-red-500',
			description: 'Deployment, CI/CD, and cloud infrastructure',
			skills: [
				{ name: 'AWS', level: 85, color: 'from-orange-500 to-yellow-500', icon: <Cloud size={16} /> },
				{ name: 'Docker', level: 80, color: 'from-blue-500 to-cyan-500', icon: <Layers size={16} /> },
				{ name: 'Kubernetes', level: 75, color: 'from-blue-600 to-indigo-500', icon: <Rocket size={16} /> },
				{ name: 'CI/CD', level: 88, color: 'from-green-500 to-emerald-500', icon: <Zap size={16} /> },
				{ name: 'Linux', level: 82, color: 'from-yellow-500 to-orange-500', icon: <Code size={16} /> }
			]
		}
	]

	const additionalSkills = [
		{ icon: <Smartphone size={24} />, name: 'Mobile Development', level: 'Advanced', color: 'from-purple-500 to-pink-600' },
		{ icon: <Globe size={24} />, name: 'Internationalization', level: 'Intermediate', color: 'from-blue-500 to-cyan-600' },
		{ icon: <Zap size={24} />, name: 'Performance Optimization', level: 'Advanced', color: 'from-green-500 to-emerald-600' },
		{ icon: <Shield size={24} />, name: 'Security Best Practices', level: 'Intermediate', color: 'from-orange-500 to-red-600' }
	]

	const certifications = [
		{ name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023', color: 'from-orange-500 to-yellow-500' },
		{ name: 'Google Cloud Professional', issuer: 'Google Cloud', year: '2023', color: 'from-blue-500 to-cyan-500' },
		{ name: 'Microsoft Azure Developer', issuer: 'Microsoft', year: '2022', color: 'from-blue-600 to-indigo-500' }
	]

	return (
		<section id="skills" className="section-padding bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
			{/* Enhanced Background Elements */}
			<div className="absolute inset-0">
				<motion.div 
					style={{ y }}
					className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
				/>
				<motion.div 
					style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
					className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" 
				/>
				<motion.div 
					style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
					className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" 
				/>
			</div>

			{/* Enhanced Grid Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

			<div className="container-custom relative z-10">
				{/* Enhanced Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-20"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
						whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
						transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
						viewport={{ once: true }}
						whileHover={{ scale: 1.05, rotateY: 5 }}
						className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
					>
						<motion.div
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						>
							<Code size={16} className="mr-2" />
						</motion.div>
						Technical Skills
					</motion.div>

					<motion.h2 
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 1, delay: 0.4, type: "spring" }}
						viewport={{ once: true }}
						className="text-4xl md:text-6xl font-bold mb-6 text-white"
					>
						My <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.6 }}
						viewport={{ once: true }}
						className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
					>
						I&apos;ve mastered a diverse range of technologies and frameworks, 
						enabling me to build robust, scalable, and innovative solutions.
					</motion.p>
				</motion.div>

				{/* Enhanced Skills Categories Grid */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="grid lg:grid-cols-2 gap-8 mb-20"
				>
					{skillCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 30, rotateY: 90 }}
							whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
							transition={{ duration: 0.8, delay: categoryIndex * 0.1, type: "spring" }}
							viewport={{ once: true }}
							whileHover={{ 
								y: -15, 
								scale: 1.02,
								rotateY: 5,
								boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
							}}
							className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform-gpu"
						>
							{/* Enhanced Category Header */}
							<div className="flex items-center gap-4 mb-8">
								<motion.div 
									className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.6 }}
								>
									{category.icon}
								</motion.div>
								<div>
									<h3 className="text-2xl font-bold text-white">{category.title}</h3>
									<p className="text-gray-400 text-sm">{category.description}</p>
								</div>
							</div>

							{/* Enhanced Skills List */}
							<div className="space-y-6">
								{category.skills.map((skill, skillIndex) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0, x: -20, scale: 0.9 }}
										whileInView={{ opacity: 1, x: 0, scale: 1 }}
										transition={{ duration: 0.6, delay: skillIndex * 0.1, type: "spring" }}
										viewport={{ once: true }}
										whileHover={{ x: 10, scale: 1.02 }}
										className="space-y-2 group transform-gpu"
									>
										<div className="flex justify-between items-center">
											<span className="text-white font-medium flex items-center gap-2">
												{skill.icon}
												{skill.name}
											</span>
											<span className="text-gray-400 text-sm">{skill.level}%</span>
										</div>
										<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${skill.level}%` }}
												transition={{ duration: 1.5, delay: 1 + skillIndex * 0.1, ease: "easeOut" }}
												viewport={{ once: true }}
												className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
											/>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Enhanced Additional Skills */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-20"
				>
					<h3 className="text-3xl font-bold text-white text-center mb-12">Additional Expertise</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{additionalSkills.map((skill, index) => (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, y: 20, rotateY: 90 }}
								whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
								viewport={{ once: true }}
								whileHover={{ 
									y: -10, 
									scale: 1.05,
									rotateY: 10,
									boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
								}}
								className="group p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center transform-gpu"
							>
								<motion.div 
									className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.6 }}
								>
									{skill.icon}
								</motion.div>
								<h4 className="text-white font-bold mb-2">{skill.name}</h4>
								<span className="text-cyan-400 text-sm font-medium">{skill.level}</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* New Certifications Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-20"
				>
					<h3 className="text-3xl font-bold text-white text-center mb-12">Certifications & Training</h3>
					<div className="grid md:grid-cols-3 gap-6">
						{certifications.map((cert, index) => (
							<motion.div
								key={cert.name}
								initial={{ opacity: 0, y: 20, scale: 0.8 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
								viewport={{ once: true }}
								whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
								className="group p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center transform-gpu"
							>
								<div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
									<Star size={24} />
								</div>
								<h4 className="text-white font-bold mb-2">{cert.name}</h4>
								<p className="text-gray-300 text-sm mb-2">{cert.issuer}</p>
								<span className="text-cyan-400 text-sm font-medium">{cert.year}</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Enhanced Skills Highlight */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<motion.div 
						whileHover={{ y: -10, scale: 1.02, rotateY: 2 }}
						className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl border border-blue-500/20 transform-gpu"
					>
						<h3 className="text-2xl font-bold text-white mb-4">Always Learning & Growing</h3>
						<p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
							Technology evolves rapidly, and I&apos;m committed to staying at the forefront. 
							I regularly explore new frameworks, tools, and methodologies to deliver cutting-edge solutions.
						</p>
						<motion.button
							whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
						>
							View My Projects
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
} 
