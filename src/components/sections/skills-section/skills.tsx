'use client'

import { motion } from 'framer-motion'
import { 
	Code, 
	Database, 
	Palette, 
	Server, 
	Smartphone, 
	Zap,
	React,
	TypeScript,
	Database as DatabaseIcon,
	Palette as PaletteIcon,
	Server as ServerIcon,
	Smartphone as MobileIcon
} from 'lucide-react'

interface SkillCategory {
	id: string
	title: string
	icon: React.ReactNode
	description: string
	skills: string[]
	color: string
}

const skillCategories: SkillCategory[] = [
	{
		id: 'frontend',
		title: 'Frontend Development',
		icon: <PaletteIcon size={32} />,
		description: 'Creating beautiful and responsive user interfaces',
		skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux'],
		color: 'from-blue-500 to-cyan-500'
	},
	{
		id: 'backend',
		title: 'Backend Development',
		icon: <ServerIcon size={32} />,
		description: 'Building robust and scalable server-side applications',
		skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
		color: 'from-green-500 to-emerald-500'
	},
	{
		id: 'database',
		title: 'Database & ORM',
		icon: <DatabaseIcon size={32} />,
		description: 'Managing data efficiently and securely',
		skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM', 'SQL'],
		color: 'from-purple-500 to-pink-500'
	},
	{
		id: 'mobile',
		title: 'Mobile Development',
		icon: <MobileIcon size={32} />,
		description: 'Cross-platform mobile application development',
		skills: ['React Native', 'Expo', 'Native Modules', 'Mobile UI/UX', 'App Store'],
		color: 'from-orange-500 to-red-500'
	},
	{
		id: 'devops',
		title: 'DevOps & Tools',
		icon: <Zap size={32} />,
		description: 'Deployment, CI/CD, and development tools',
		skills: ['Docker', 'AWS', 'Vercel', 'Git', 'GitHub Actions', 'Nginx'],
		color: 'from-indigo-500 to-blue-500'
	},
	{
		id: 'testing',
		title: 'Testing & Quality',
		icon: <Code size={32} />,
		description: 'Ensuring code quality and reliability',
		skills: ['Jest', 'React Testing Library', 'Cypress', 'ESLint', 'Prettier', 'TypeScript'],
		color: 'from-teal-500 to-green-500'
	}
]

export default function Skills() {
	return (
		<section id="skills" className="section-padding">
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
						My <span className="gradient-text">Skills</span>
					</h2>
					<p className="text-lg text-foreground/60 max-w-2xl mx-auto">
						Comprehensive overview of my technical expertise and development capabilities
					</p>
				</motion.div>

				{/* Skills Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{skillCategories.map((category, index) => (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="group"
						>
							<div className="relative p-6 rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 h-full card-hover">
								{/* Background Gradient */}
								<div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
								
								{/* Icon */}
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4`}
								>
									{category.icon}
								</motion.div>

								{/* Content */}
								<div className="relative z-10">
									<h3 className="text-xl font-semibold mb-2">{category.title}</h3>
									<p className="text-foreground/60 mb-4 text-sm leading-relaxed">
										{category.description}
									</p>

									{/* Skills List */}
									<div className="flex flex-wrap gap-2">
										{category.skills.map((skill, skillIndex) => (
											<motion.span
												key={skill}
												initial={{ opacity: 0, scale: 0.8 }}
												whileInView={{ opacity: 1, scale: 1 }}
												transition={{ 
													duration: 0.3, 
													delay: (index * 0.1) + (skillIndex * 0.05) 
												}}
												viewport={{ once: true }}
												className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full border border-border hover:border-primary transition-colors"
											>
												{skill}
											</motion.span>
										))}
									</div>
								</div>

								{/* Hover Effect */}
								<div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
							</div>
						</motion.div>
					))}
				</div>

				{/* Additional Skills */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<h3 className="text-2xl font-semibold mb-8">Additional Skills & Tools</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{[
							'Figma', 'Adobe XD', 'Postman', 'VS Code', 'Webpack', 'Babel',
							'Storybook', 'Strapi', 'Sanity', 'Stripe', 'Firebase', 'Supabase'
						].map((tool, index) => (
							<motion.span
								key={tool}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								viewport={{ once: true }}
								className="px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200"
							>
								{tool}
							</motion.span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
} 
