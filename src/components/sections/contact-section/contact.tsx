'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

interface ContactInfo {
	icon: React.ReactNode
	title: string
	value: string
	link?: string
}

const contactInfo: ContactInfo[] = [
	{
		icon: <Mail size={24} />,
		title: 'Email',
		value: 'your.email@example.com',
		link: 'mailto:your.email@example.com'
	},
	{
		icon: <Phone size={24} />,
		title: 'Phone',
		value: '+1 (555) 123-4567',
		link: 'tel:+15551234567'
	},
	{
		icon: <MapPin size={24} />,
		title: 'Location',
		value: 'Your City, Country'
	}
]

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

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

	return (
		<section id="contact" className="section-padding">
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
						Get In <span className="gradient-text">Touch</span>
					</h2>
					<p className="text-lg text-foreground/60 max-w-2xl mx-auto">
						Let&apos;s discuss your project and bring your ideas to life
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
							<div className="space-y-6">
								{contactInfo.map((info, index) => (
									<motion.div
										key={info.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
									>
										<div className="text-primary">
											{info.icon}
										</div>
										<div>
											<p className="font-medium">{info.title}</p>
											{info.link ? (
												<a
													href={info.link}
													className="text-foreground/60 hover:text-primary transition-colors"
												>
													{info.value}
												</a>
											) : (
												<p className="text-foreground/60">{info.value}</p>
											)}
										</div>
									</motion.div>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-2xl font-semibold mb-6">Let&apos;s Connect</h3>
							<p className="text-foreground/60 leading-relaxed">
								I&apos;m always open to discussing new opportunities, interesting projects, 
								or just having a chat about technology and development. Feel free to reach 
								out if you&apos;d like to work together or simply want to connect!
							</p>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<div className="p-6 rounded-xl bg-card border border-border">
							<h3 className="text-2xl font-semibold mb-6">Send Message</h3>
							
							{isSubmitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									className="text-center py-8"
								>
									<CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
									<h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
									<p className="text-foreground/60">
										Thank you for your message. I&apos;ll get back to you soon!
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label htmlFor="name" className="block text-sm font-medium mb-2">
												Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
												placeholder="Your name"
											/>
										</div>
										<div>
											<label htmlFor="email" className="block text-sm font-medium mb-2">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
												placeholder="your.email@example.com"
											/>
										</div>
									</div>

									<div>
										<label htmlFor="subject" className="block text-sm font-medium mb-2">
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
											placeholder="What's this about?"
										/>
									</div>

									<div>
										<label htmlFor="message" className="block text-sm font-medium mb-2">
											Message
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={5}
											className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
											placeholder="Tell me about your project..."
										/>
									</div>

									<motion.button
										type="submit"
										disabled={isSubmitting}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
				</div>
			</div>
		</section>
	)
} 
