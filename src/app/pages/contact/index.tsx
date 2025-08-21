'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react'

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 2000))
		
		setIsSubmitting(false)
		setIsSubmitted(true)
		setFormData({ name: '', email: '', subject: '', message: '' })
		
		// Reset success message after 5 seconds
		setTimeout(() => setIsSubmitted(false), 5000)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const contactInfo = [
		{
			icon: <Mail size={24} />,
			title: 'Email',
			value: 'your.email@example.com',
			description: 'Send me an email anytime',
			link: 'mailto:your.email@example.com'
		},
		{
			icon: <Phone size={24} />,
			title: 'Phone',
			value: '+84 123 456 789',
			description: 'Call me during business hours',
			link: 'tel:+84123456789'
		},
		{
			icon: <MapPin size={24} />,
			title: 'Location',
			value: 'Ho Chi Minh City, Vietnam',
			description: 'Available for remote work worldwide'
		}
	]

	const socialLinks = [
		{ icon: <Github size={24} />, name: 'GitHub', href: 'https://github.com/yourusername' },
		{ icon: <Linkedin size={24} />, name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
		{ icon: <Twitter size={24} />, name: 'Twitter', href: 'https://twitter.com/yourusername' }
	]

	return (
		<section id="contact" className="section-padding bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
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
						<MessageCircle size={16} className="mr-2" />
						Get In Touch
					</motion.div>

					<h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
						Let&apos;s Build Something <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Amazing</span>
					</h2>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Ready to start your next project? I&apos;m here to help bring your ideas to life. 
						Let&apos;s discuss how we can work together to create something extraordinary.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Left Column - Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Form */}
						<div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
							{isSubmitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									className="text-center py-12"
								>
									<CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
									<h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
									<p className="text-gray-300">Thank you for reaching out. I&apos;ll get back to you soon!</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-6">
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.1 }}
											viewport={{ once: true }}
										>
											<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
												Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
												placeholder="Your name"
											/>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.2 }}
											viewport={{ once: true }}
										>
											<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
												placeholder="your@email.com"
											/>
										</motion.div>
									</div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.3 }}
										viewport={{ once: true }}
									>
										<label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
											placeholder="What&apos;s this about?"
										/>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.4 }}
										viewport={{ once: true }}
									>
										<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
											Message
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={6}
											className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
											placeholder="Tell me about your project..."
										/>
									</motion.div>

									<motion.button
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.5 }}
										viewport={{ once: true }}
										type="submit"
										disabled={isSubmitting}
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										{isSubmitting ? (
											<>
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
												Sending...
											</>
										) : (
											<>
												<Send size={20} />
												Send Message
											</>
										)}
									</motion.button>
								</form>
							)}
						</div>
					</motion.div>

					{/* Right Column - Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Contact Information */}
						<div className="space-y-6">
							{contactInfo.map((info, index) => (
								<motion.div
									key={info.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
								>
									<div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
										{info.icon}
									</div>
									<div>
										<h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
										{info.link ? (
											<a
												href={info.link}
												className="text-pink-400 font-medium mb-1 hover:text-pink-300 transition-colors duration-300"
											>
												{info.value}
											</a>
										) : (
											<p className="text-pink-400 font-medium mb-1">{info.value}</p>
										)}
										<p className="text-gray-300 text-sm">{info.description}</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Social Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}
							className="space-y-4"
						>
							<h3 className="text-xl font-semibold text-white">Follow Me</h3>
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
										className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/20 hover:border-pink-400 transition-all duration-300"
										aria-label={social.name}
									>
										{social.icon}
									</motion.a>
								))}
							</div>
						</motion.div>

						{/* Availability */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							viewport={{ once: true }}
							className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
						>
							<div className="flex items-center gap-3 mb-4">
								<Clock size={20} className="text-pink-400" />
								<h3 className="text-lg font-semibold text-white">Availability</h3>
							</div>
							<p className="text-gray-300 mb-3">
								I&apos;m currently available for new projects and collaborations.
							</p>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
								<span className="text-green-400 text-sm font-medium">Available for hire</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
} 
