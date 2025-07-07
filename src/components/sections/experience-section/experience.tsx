'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building, GraduationCap } from 'lucide-react'

interface Experience {
	id: string
	title: string
	company: string
	location: string
	period: string
	description: string[]
	type: 'work' | 'education'
}

const experiences: Experience[] = [
	{
		id: '1',
		title: 'Senior Full Stack Developer',
		company: 'Tech Company Inc.',
		location: 'San Francisco, CA',
		period: '2022 - Present',
		description: [
			'Led development of multiple web applications using React, Node.js, and TypeScript',
			'Implemented CI/CD pipelines and improved deployment processes',
			'Mentored junior developers and conducted code reviews',
			'Collaborated with cross-functional teams to deliver high-quality products'
		],
		type: 'work'
	},
	{
		id: '2',
		title: 'Full Stack Developer',
		company: 'Startup XYZ',
		location: 'Remote',
		period: '2020 - 2022',
		description: [
			'Built and maintained scalable web applications using modern technologies',
			'Optimized application performance and improved user experience',
			'Worked closely with designers and product managers',
			'Participated in agile development processes'
		],
		type: 'work'
	},
	{
		id: '3',
		title: 'Frontend Developer',
		company: 'Digital Agency',
		location: 'New York, NY',
		period: '2019 - 2020',
		description: [
			'Developed responsive websites and web applications',
			'Collaborated with creative teams to implement designs',
			'Ensured cross-browser compatibility and accessibility',
			'Maintained and updated existing client websites'
		],
		type: 'work'
	},
	{
		id: '4',
		title: 'Bachelor of Computer Science',
		company: 'University of Technology',
		location: 'Boston, MA',
		period: '2015 - 2019',
		description: [
			'Graduated with honors (GPA: 3.8/4.0)',
			'Specialized in Software Engineering and Web Development',
			'Completed capstone project on e-commerce platform',
			'Active member of Computer Science Society'
		],
		type: 'education'
	}
]

export default function Experience() {
	return (
		<section id="experience" className="section-padding bg-gradient-to-b from-background to-secondary/20">
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
						My <span className="gradient-text">Experience</span>
					</h2>
					<p className="text-lg text-foreground/60 max-w-2xl mx-auto">
						Professional journey and educational background
					</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

					{/* Experience Items */}
					<div className="space-y-12">
						{experiences.map((experience, index) => (
							<motion.div
								key={experience.id}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className={`relative flex items-start ${
									index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
								}`}
							>
								{/* Timeline Dot */}
								<div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

								{/* Content Card */}
								<div className={`ml-12 md:ml-0 md:w-5/12 ${
									index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
								}`}>
									<div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
										{/* Header */}
										<div className="flex items-start justify-between mb-4">
											<div>
												<h3 className="text-xl font-semibold mb-1">
													{experience.title}
												</h3>
												<div className="flex items-center gap-4 text-sm text-foreground/60">
													<div className="flex items-center gap-1">
														{experience.type === 'work' ? (
															<Building size={16} />
														) : (
															<GraduationCap size={16} />
														)}
														<span>{experience.company}</span>
													</div>
													<div className="flex items-center gap-1">
														<MapPin size={16} />
														<span>{experience.location}</span>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-1 text-sm text-foreground/60">
												<Calendar size={16} />
												<span>{experience.period}</span>
											</div>
										</div>

										{/* Description */}
										<ul className="space-y-2">
											{experience.description.map((item, itemIndex) => (
												<li
													key={itemIndex}
													className="text-foreground/70 text-sm leading-relaxed flex items-start gap-2"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
													{item}
												</li>
											))}
										</ul>

										{/* Type Badge */}
										<div className="mt-4">
											<span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
												experience.type === 'work'
													? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
													: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
											}`}>
												{experience.type === 'work' ? 'Work Experience' : 'Education'}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="p-6 rounded-xl bg-card border border-border">
							<h3 className="text-2xl font-bold text-primary mb-2">3+</h3>
							<p className="text-foreground/60">Years of Experience</p>
						</div>
						<div className="p-6 rounded-xl bg-card border border-border">
							<h3 className="text-2xl font-bold text-primary mb-2">20+</h3>
							<p className="text-foreground/60">Projects Completed</p>
						</div>
						<div className="p-6 rounded-xl bg-card border border-border">
							<h3 className="text-2xl font-bold text-primary mb-2">15+</h3>
							<p className="text-foreground/60">Happy Clients</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
} 
