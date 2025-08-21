'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { User, Code, Award, Heart, MapPin, Calendar, Mail, Phone, Sparkles, Zap, Target, Rocket } from 'lucide-react'

export default function About() {
	const { scrollYProgress } = useScroll()
	const y = useTransform(scrollYProgress, [0, 1], [0, -100])

	const stats = [
		{ icon: <Code size={24} />, number: '50+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500', delay: 0.1 },
		{ icon: <Award size={24} />, number: '5+', label: 'Years Experience', color: 'from-purple-500 to-pink-500', delay: 0.2 },
		{ icon: <Heart size={24} />, number: '100%', label: 'Client Satisfaction', color: 'from-green-500 to-emerald-500', delay: 0.3 },
		{ icon: <User size={24} />, number: '25+', label: 'Happy Clients', color: 'from-orange-500 to-red-500', delay: 0.4 }
	]

	const personalInfo = [
		{ icon: <MapPin size={20} />, label: 'Location', value: 'Ho Chi Minh City, Vietnam', color: 'from-blue-500 to-cyan-600' },
		{ icon: <Calendar size={20} />, label: 'Experience', value: '5+ Years in Web Development', color: 'from-purple-500 to-pink-600' },
		{ icon: <Mail size={20} />, label: 'Email', value: 'your.email@example.com', color: 'from-green-500 to-emerald-600' },
		{ icon: <Phone size={20} />, label: 'Phone', value: '+84 123 456 789', color: 'from-orange-500 to-red-600' }
	]

	const skills = [
		{ name: 'Frontend Development', percentage: 95, color: 'from-blue-500 to-cyan-500', icon: <Code size={16} /> },
		{ name: 'Backend Development', percentage: 90, color: 'from-purple-500 to-pink-500', icon: <Zap size={16} /> },
		{ name: 'UI/UX Design', percentage: 85, color: 'from-green-500 to-emerald-500', icon: <Target size={16} /> },
		{ name: 'DevOps & Cloud', percentage: 80, color: 'from-orange-500 to-red-500', icon: <Rocket size={16} /> }
	]

	const achievements = [
		{ icon: <Award size={20} />, title: 'Best Developer 2023', description: 'Recognized for outstanding contributions' },
		{ icon: <Heart size={20} />, title: 'Client Choice Award', description: 'Highest satisfaction rating' },
		{ icon: <Sparkles size={20} />, title: 'Innovation Prize', description: 'Creative problem solving' }
	]

	return (
		<section id="about" className="section-padding bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
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
					className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" 
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
						className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
					>
						<motion.div
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						>
							<User size={16} className="mr-2" />
						</motion.div>
						About Me
					</motion.div>

					<motion.h2 
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 1, delay: 0.4, type: "spring" }}
						viewport={{ once: true }}
						className="text-4xl md:text-6xl font-bold mb-6 text-white"
					>
						Crafting Digital <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Experiences</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.6 }}
						viewport={{ once: true }}
						className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
					>
						I&apos;m a passionate full-stack developer who loves turning complex problems into simple, 
						beautiful, and intuitive solutions. With years of experience in web development, 
						I&apos;ve had the privilege of building software for clients worldwide.
					</motion.p>
				</motion.div>

				{/* Enhanced Stats Grid with 3D Effects */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
				>
					{stats.map((stat) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20, rotateY: 90 }}
							whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
							transition={{ duration: 0.8, delay: stat.delay, type: "spring" }}
							viewport={{ once: true }}
							whileHover={{ 
								y: -15, 
								scale: 1.05,
								rotateY: 10,
								boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
							}}
							className="group p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform-gpu"
						>
							<motion.div 
								className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.6 }}
							>
								{stat.icon}
							</motion.div>
							<div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
								{stat.number}
							</div>
							<div className="text-gray-300 text-sm">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Achievements Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-20"
				>
					<h3 className="text-3xl font-bold text-white text-center mb-12">Recognition & Awards</h3>
					<div className="grid md:grid-cols-3 gap-6">
						{achievements.map((achievement, index) => (
							<motion.div
								key={achievement.title}
								initial={{ opacity: 0, y: 20, scale: 0.8 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
								viewport={{ once: true }}
								whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
								className="group p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center transform-gpu"
							>
								<div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									{achievement.icon}
								</div>
								<h4 className="text-white font-bold mb-2">{achievement.title}</h4>
								<p className="text-gray-300 text-sm">{achievement.description}</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Enhanced Left Column */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Enhanced Personal Information */}
						<div className="space-y-6">
							<h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
							{personalInfo.map((info, index) => (
								<motion.div
									key={info.label}
									initial={{ opacity: 0, x: -20, rotateY: 90 }}
									whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
									viewport={{ once: true }}
									whileHover={{ 
										x: 10, 
										scale: 1.02,
										boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
									}}
									className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group transform-gpu"
								>
									<motion.div 
										className={`p-2 rounded-lg bg-gradient-to-r ${info.color} text-white group-hover:scale-110 transition-transform duration-300`}
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}
									>
										{info.icon}
									</motion.div>
									<div>
										<p className="text-gray-400 text-sm">{info.label}</p>
										<p className="text-white font-medium">{info.value}</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Enhanced Skills Progress */}
						<div className="space-y-6">
							<h3 className="text-2xl font-bold text-white mb-6">Core Skills</h3>
							{skills.map((skill, index) => (
								<motion.div
									key={skill.name}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ x: 10, scale: 1.02 }}
									className="space-y-2 group transform-gpu"
								>
									<div className="flex justify-between items-center">
										<span className="text-white font-medium flex items-center gap-2">
											{skill.icon}
											{skill.name}
										</span>
										<span className="text-gray-400 text-sm">{skill.percentage}%</span>
									</div>
									<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${skill.percentage}%` }}
											transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
											viewport={{ once: true }}
											className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
										/>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Enhanced Right Column */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Enhanced My Story */}
						<motion.div 
							whileHover={{ y: -10, scale: 1.02, rotateY: 2 }}
							className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform-gpu"
						>
							<h3 className="text-2xl font-bold text-white mb-6">My Story</h3>
							<div className="space-y-4 text-gray-300 leading-relaxed">
								<p>
									My journey in web development began 5 years ago when I first discovered my passion 
									for creating digital experiences. Since then, I&apos;ve worked on projects ranging from 
									small business websites to complex enterprise applications.
								</p>
								<p>
									I believe in writing clean, maintainable code and staying up-to-date with the latest 
									technologies and best practices. My approach combines technical expertise with creative 
									problem-solving to deliver solutions that exceed expectations.
								</p>
								<p>
									When I&apos;m not coding, you can find me exploring new technologies, contributing to 
									open-source projects, or sharing knowledge with the developer community.
								</p>
							</div>
						</motion.div>

						{/* Enhanced Timeline */}
						<div className="space-y-6">
							<h3 className="text-2xl font-bold text-white mb-6">Career Journey</h3>
							<div className="space-y-6">
								{[
									{ year: '2023 - Present', title: 'Senior Full-Stack Developer', company: 'Tech Company', description: 'Leading development teams and architecting scalable solutions' },
									{ year: '2021 - 2023', title: 'Full-Stack Developer', company: 'Startup', description: 'Built and maintained multiple web applications' },
									{ year: '2019 - 2021', title: 'Frontend Developer', company: 'Digital Agency', description: 'Created responsive and interactive user interfaces' }
								].map((item, index) => (
									<motion.div
										key={item.year}
										initial={{ opacity: 0, y: 20, scale: 0.9 }}
										whileInView={{ opacity: 1, y: 0, scale: 1 }}
										transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
										viewport={{ once: true }}
										whileHover={{ x: 10, scale: 1.02 }}
										className="relative pl-8 border-l-2 border-blue-500/30 group transform-gpu"
									>
										<motion.div 
											className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-x-2 group-hover:scale-150 transition-transform duration-300" 
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
										/>
										<div className="text-blue-400 text-sm font-medium mb-1">{item.year}</div>
										<div className="text-white font-bold mb-1">{item.title}</div>
										<div className="text-purple-400 text-sm mb-2">{item.company}</div>
										<div className="text-gray-300 text-sm">{item.description}</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
} 
