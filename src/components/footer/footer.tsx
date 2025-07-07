'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
	{
		name: 'GitHub',
		icon: <Github size={20} />,
		url: 'https://github.com/yourusername',
		color: 'hover:text-gray-600'
	},
	{
		name: 'LinkedIn',
		icon: <Linkedin size={20} />,
		url: 'https://linkedin.com/in/yourusername',
		color: 'hover:text-blue-600'
	},
	{
		name: 'Twitter',
		icon: <Twitter size={20} />,
		url: 'https://twitter.com/yourusername',
		color: 'hover:text-blue-400'
	},
	{
		name: 'Email',
		icon: <Mail size={20} />,
		url: 'mailto:your.email@example.com',
		color: 'hover:text-red-500'
	}
]

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-card border-t border-border">
			<div className="container-custom section-padding">
				<div className="text-center">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="mb-6"
					>
						<h3 className="text-2xl font-bold gradient-text">Portfolio</h3>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex justify-center gap-6 mb-6"
					>
						{socialLinks.map((social, index) => (
							<motion.a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								transition={{ 
									duration: 0.3, 
									delay: index * 0.1 
								}}
								viewport={{ once: true }}
								className={`p-3 rounded-lg bg-secondary border border-border text-foreground/60 transition-all duration-200 ${social.color}`}
								aria-label={social.name}
							>
								{social.icon}
							</motion.a>
						))}
					</motion.div>

					{/* Navigation Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="flex flex-wrap justify-center gap-6 mb-6 text-sm"
					>
						{['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
							<button
								key={item}
								onClick={() => {
									const element = document.querySelector(`#${item.toLowerCase()}`)
									if (element) {
										element.scrollIntoView({ behavior: 'smooth' })
									}
								}}
								className="text-foreground/60 hover:text-primary transition-colors"
							>
								{item}
							</button>
						))}
					</motion.div>

					{/* Copyright */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						viewport={{ once: true }}
						className="text-foreground/40 text-sm"
					>
						<p>
							© {currentYear} Your Name. All rights reserved.
						</p>
						<p className="mt-2">
							Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
						</p>
					</motion.div>
				</div>
			</div>
		</footer>
	)
} 
