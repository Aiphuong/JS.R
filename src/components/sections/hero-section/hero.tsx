'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHeroApi } from '@/lib/hooks/useHeroApi'

export default function Hero() {
	const { loading, error, data: content, getHeroData, clearError } = useHeroApi()

	useEffect(() => {
		getHeroData()
		
		// Set up interval to refresh data every 5 seconds (for demo purposes)
		// In production, you might want to use WebSocket or Server-Sent Events
		const interval = setInterval(() => {
			getHeroData()
		}, 5000)

		return () => clearInterval(interval)
	}, [getHeroData])

	if (loading) {
		return (
			<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading hero content...</p>
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
				<div className="text-center">
					<p className="text-red-600 mb-4">Error loading hero content: {error}</p>
					<button
						onClick={() => {
							clearError()
							getHeroData()
						}}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Retry
					</button>
				</div>
			</section>
		)
	}

	// Fallback content nếu không có data
	if (!content) {
		return (
			<section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-6"
					>
						<motion.h1
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900"
						>
							Welcome to My Portfolio
						</motion.h1>

						<motion.h2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600"
						>
							Full Stack Developer
						</motion.h2>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.8 }}
							className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
						>
							Passionate about creating amazing web experiences with modern technologies
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
						>
							<a
								href="#projects"
								className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								View My Work
							</a>
							<a
								href="#contact"
								className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
							>
								Get In Touch
							</a>
						</motion.div>
					</motion.div>
				</div>
			</section>
		)
	}

	// Determine background style
	const getBackgroundClass = () => {
		switch (content.background) {
			case 'gradient':
				return 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
			case 'solid':
				return 'bg-blue-50'
			case 'image':
				return content.image ? 'bg-cover bg-center' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
			default:
				return 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
		}
	}

	// Determine animation variants
	const getAnimationVariants = () => {
		switch (content.animation) {
			case 'fade-in':
				return {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { duration: 0.8 }
				}
			case 'slide-up':
				return {
					initial: { opacity: 0, y: 50 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.8 }
				}
			case 'zoom-in':
				return {
					initial: { opacity: 0, scale: 0.8 },
					animate: { opacity: 1, scale: 1 },
					transition: { duration: 0.8 }
				}
			default:
				return {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.8 }
				}
		}
	}

	const backgroundClass = getBackgroundClass()
	const animationVariants = getAnimationVariants()

	return (
		<section 
			className={`min-h-screen flex items-center justify-center ${backgroundClass}`}
			style={content.image && content.background === 'image' ? { backgroundImage: `url(${content.image})` } : {}}
		>
			<div className="container mx-auto px-4 text-center">
				<motion.div
					{...animationVariants}
					className="space-y-6"
				>
					<motion.h1
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900"
					>
						{content.title}
					</motion.h1>

					{content.subtitle && (
						<motion.h2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600"
						>
							{content.subtitle}
						</motion.h2>
					)}

					{content.description && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.8 }}
							className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
						>
							{content.description}
						</motion.p>
					)}

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.8 }}
						className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
					>
						{content.ctaText ? (
							<a
								href={content.ctaLink || '#projects'}
								className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								{content.ctaText}
							</a>
						) : (
							<a
								href="#projects"
								className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								View My Work
							</a>
						)}
						<a
							href="#contact"
							className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
						>
							Get In Touch
						</a>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
} 
