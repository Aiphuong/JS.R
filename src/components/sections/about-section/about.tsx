'use client'

import { motion } from 'framer-motion'
import { User, MapPin, Calendar, Mail, Github, Linkedin } from 'lucide-react'

interface InfoItem {
	icon: React.ReactNode
	label: string
	value: string
}

interface Skill {
	name: string
	level: number
}

const infoItems: InfoItem[] = [
	{
		icon: <User size={20} />,
		label: 'Name',
		value: 'Your Name'
	},
	{
		icon: <MapPin size={20} />,
		label: 'Location',
		value: 'Your City, Country'
	},
	{
		icon: <Calendar size={20} />,
		label: 'Experience',
		value: '3+ Years'
	},
	{
		icon: <Mail size={20} />,
		label: 'Email',
		value: 'your.email@example.com'
	}
]

const skills: Skill[] = [
	{ name: 'React', level: 90 },
	{ name: 'TypeScript', level: 85 },
	{ name: 'Node.js', level: 80 },
	{ name: 'Next.js', level: 85 },
	{ name: 'Python', level: 75 },
	{ name: 'SQL', level: 80 }
]

export default function About() {
	return (
		<section id="about" className="section-padding bg-gradient-to-b from-background to-secondary/20">
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
						About <span className="gradient-text">Me</span>
					</h2>
					<p className="text-lg text-foreground/60 max-w-2xl mx-auto">
						Get to know me better and understand my journey in web development
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Personal Info */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Personal Information */}
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold mb-6">Personal Information</h3>
							<div className="grid gap-4">
								{infoItems.map((item, index) => (
									<motion.div
										key={item.label}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
									>
										<div className="text-primary">
											{item.icon}
										</div>
										<div>
											<p className="text-sm text-foreground/60">{item.label}</p>
											<p className="font-medium">{item.value}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Social Links */}
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
							<div className="flex gap-4">
								<motion.a
									href="https://github.com/yourusername"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className="p-3 rounded-lg bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
								>
									<Github size={24} />
								</motion.a>
								<motion.a
									href="https://linkedin.com/in/yourusername"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className="p-3 rounded-lg bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
								>
									<Linkedin size={24} />
								</motion.a>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Skills & Description */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* About Description */}
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold mb-6">My Story</h3>
							<div className="space-y-4 text-foreground/80 leading-relaxed">
								<p>
									I&apos;m a passionate Full Stack Developer with over 3 years of experience 
									creating modern web applications. My journey in technology started with 
									curiosity and has evolved into a deep passion for building solutions that 
									make a difference.
								</p>
								<p>
									I specialize in React, TypeScript, and Node.js, with a strong focus on 
									creating scalable, maintainable code. I believe in the power of clean 
									architecture and user-centered design to create exceptional digital experiences.
								</p>
								<p>
									When I&apos;m not coding, you can find me exploring new technologies, 
									contributing to open-source projects, or sharing knowledge with the 
									developer community.
								</p>
							</div>
						</div>

						{/* Skills */}
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
							<div className="space-y-4">
								{skills.map((skill, index) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="space-y-2"
									>
										<div className="flex justify-between items-center">
											<span className="font-medium">{skill.name}</span>
											<span className="text-sm text-foreground/60">{skill.level}%</span>
										</div>
										<div className="w-full bg-secondary rounded-full h-2">
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${skill.level}%` }}
												transition={{ duration: 1, delay: index * 0.1 }}
												viewport={{ once: true }}
												className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
											/>
										</div>
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
