'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, Send } from 'lucide-react'

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const footerLinks = {
		company: [
			{ name: 'About Us', href: '#about' },
			{ name: 'Our Team', href: '#team' },
			{ name: 'Careers', href: '#careers' },
			{ name: 'Press', href: '#press' }
		],
		services: [
			{ name: 'Web Development', href: '#web-dev' },
			{ name: 'Mobile Apps', href: '#mobile' },
			{ name: 'UI/UX Design', href: '#design' },
			{ name: 'Consulting', href: '#consulting' }
		],
		resources: [
			{ name: 'Blog', href: '#blog' },
			{ name: 'Documentation', href: '#docs' },
			{ name: 'Support', href: '#support' },
			{ name: 'API Reference', href: '#api' }
		],
		legal: [
			{ name: 'Privacy Policy', href: '#privacy' },
			{ name: 'Terms of Service', href: '#terms' },
			{ name: 'Cookie Policy', href: '#cookies' },
			{ name: 'GDPR', href: '#gdpr' }
		]
	}

	const socialLinks = [
		{ icon: <Github size={20} />, name: 'GitHub', href: 'https://github.com/yourusername' },
		{ icon: <Linkedin size={20} />, name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
		{ icon: <Twitter size={20} />, name: 'Twitter', href: 'https://twitter.com/yourusername' },
		{ icon: <Mail size={20} />, name: 'Email', href: 'mailto:your.email@example.com' }
	]

	return (
		<footer className="relative bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
			</div>

			{/* Grid Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

			<div className="container-custom relative z-10">
				{/* Main Footer Content */}
				<div className="py-16">
					<div className="grid lg:grid-cols-5 gap-12">
						{/* Company Info */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="lg:col-span-2"
						>
							<div className="mb-6">
								<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
									Portfolio
								</h3>
								<p className="text-gray-300 leading-relaxed max-w-md">
									Creating innovative digital solutions that transform ideas into reality. 
									Let&apos;s build something amazing together.
								</p>
							</div>

							{/* Newsletter Subscription */}
							<div className="mb-8">
								<h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
								<div className="flex gap-2">
									<input
										type="email"
										placeholder="Enter your email"
										className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
									/>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
									>
										<Send size={20} />
									</motion.button>
								</div>
							</div>

							{/* Social Links */}
							<div>
								<h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
								<div className="flex space-x-4">
									{socialLinks.map((social, index) => (
										<motion.a
											key={social.name}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.4, delay: index * 0.1 }}
											viewport={{ once: true }}
											whileHover={{ scale: 1.1, y: -3 }}
											whileTap={{ scale: 0.9 }}
											className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 hover:border-purple-400 transition-all duration-300"
											aria-label={social.name}
										>
											{social.icon}
										</motion.a>
									))}
								</div>
							</div>
						</motion.div>

						{/* Footer Links */}
						{Object.entries(footerLinks).map(([category, links], categoryIndex) => (
							<motion.div
								key={category}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
								viewport={{ once: true }}
							>
								<h4 className="text-lg font-semibold text-white mb-6 capitalize">
									{category}
								</h4>
								<ul className="space-y-3">
									{links.map((link, linkIndex) => (
										<motion.li
											key={link.name}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: linkIndex * 0.05 }}
											viewport={{ once: true }}
										>
											<a
												href={link.href}
												className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
											>
												{link.name}
											</a>
										</motion.li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="py-8 border-t border-white/20"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-2 text-gray-300 text-sm">
							<span>&copy; 2024 Portfolio. All rights reserved.</span>
							<span className="hidden md:inline">•</span>
							<span className="hidden md:inline">Made with</span>
							<Heart size={16} className="text-red-400" />
							<span className="hidden md:inline">in Vietnam</span>
						</div>

						<div className="flex items-center gap-6">
							<a href="#privacy" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
								Privacy Policy
							</a>
							<a href="#terms" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
								Terms of Service
							</a>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Scroll to Top Button */}
			<motion.button
				onClick={scrollToTop}
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				whileHover={{ scale: 1.1, y: -5 }}
				whileTap={{ scale: 0.9 }}
				className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 z-50"
				aria-label="Scroll to top"
			>
				<ArrowUp size={24} />
			</motion.button>
		</footer>
	)
} 
