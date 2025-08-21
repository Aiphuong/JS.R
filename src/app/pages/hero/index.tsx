'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Play, Download, Star, Zap, Sparkles } from 'lucide-react'

export default function Hero() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [scrollY, setScrollY] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll()
	
	// Smooth scroll values
	const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 400 })
	const parallaxY = useTransform(smoothScrollY, [0, 1000], [0, -300])
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}
		
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('scroll', handleScroll)
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	// Particle system
	const particles = Array.from({ length: 50 }, (_, i) => ({
		id: i,
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
		size: Math.random() * 4 + 1,
		speed: Math.random() * 2 + 0.5
	}))

	return (
		<section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			{/* Enhanced Background Elements */}
			<div className="absolute inset-0">
				{/* Floating Orbs with 3D Parallax */}
				<motion.div
					style={{ y: parallaxY }}
					animate={{
						x: [0, 100, 0],
						y: [0, -100, 0],
						rotate: [0, 360],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear"
					}}
					className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
				/>
				<motion.div
					style={{ y: parallaxY }}
					animate={{
						x: [0, -150, 0],
						y: [0, 100, 0],
						rotate: [360, 0],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: "linear"
					}}
					className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
				/>
				<motion.div
					style={{ y: parallaxY }}
					animate={{
						x: [0, 80, 0],
						y: [0, 80, 0],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: "linear"
					}}
					className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
				/>
			</div>

			{/* Interactive Particle System */}
			<div className="absolute inset-0">
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className="absolute w-1 h-1 bg-white/30 rounded-full"
						style={{
							left: particle.x,
							top: particle.y,
							width: particle.size,
							height: particle.size,
						}}
						animate={{
							y: [0, -100, 0],
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
						}}
						transition={{
							duration: particle.speed * 10,
							repeat: Infinity,
							ease: "linear",
							delay: particle.id * 0.1,
						}}
					/>
				))}
			</div>

			{/* Enhanced Grid Pattern */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

			{/* Main Content with Enhanced Animations */}
			<motion.div 
				style={{ scale, opacity }}
				className="container-custom relative z-10 text-center"
			>
				{/* Enhanced Floating Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.8 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8 }}
					whileHover={{ scale: 1.05, y: -5 }}
					className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 hover:bg-white/20 transition-all duration-300 shadow-2xl"
				>
					<motion.div
						animate={{ rotate: [0, 360] }}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
						className="w-2 h-2 bg-green-400 rounded-full mr-3"
					/>
					<span className="flex items-center gap-2">
						<Sparkles size={16} className="text-yellow-400" />
						Available for new opportunities
					</span>
				</motion.div>

				{/* Enhanced Main Heading with 3D Effect */}
				<motion.h1
					initial={{ opacity: 0, y: 30, rotateX: 90 }}
					animate={{ opacity: 1, y: 0, rotateX: 0 }}
					transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
					className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-white leading-tight perspective-1000"
				>
					<motion.span 
						className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
						whileHover={{ 
							scale: 1.05,
							textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
						}}
						transition={{ duration: 0.3 }}
					>
						Creative
					</motion.span>
					<motion.span 
						className="block text-white"
						whileHover={{ 
							scale: 1.05,
							textShadow: "0 0 30px rgba(255, 255, 255, 0.5)"
						}}
						transition={{ duration: 0.3 }}
					>
						Developer
					</motion.span>
				</motion.h1>

				{/* Enhanced Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 30, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 1, delay: 0.4, type: "spring" }}
					className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
				>
					I craft digital experiences that blend innovation with elegance. 
					From concept to deployment, I bring ideas to life with cutting-edge technology.
				</motion.p>

				{/* Enhanced CTA Buttons with 3D Effects */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.6 }}
					className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
				>
					<motion.button
						whileHover={{ 
							scale: 1.05, 
							y: -5,
							rotateY: 5,
							boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
						}}
						whileTap={{ scale: 0.95 }}
						className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl text-lg transition-all duration-300 overflow-hidden transform-gpu"
					>
						<span className="relative z-10 flex items-center gap-3">
							<motion.div
								animate={{ rotate: [0, 360] }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
							>
								<Play size={20} />
							</motion.div>
							View My Work
						</span>
						<motion.div 
							className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							initial={{ x: "-100%" }}
							whileHover={{ x: 0 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.button>

					<motion.button
						whileHover={{ 
							scale: 1.05, 
							y: -5,
							rotateY: -5,
							boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
						}}
						whileTap={{ scale: 0.95 }}
						className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm transform-gpu"
					>
						<span className="flex items-center gap-3">
							<motion.div
								animate={{ y: [0, -2, 0] }}
								transition={{ duration: 1, repeat: Infinity }}
							>
								<Download size={20} />
							</motion.div>
							Download CV
						</span>
					</motion.button>
				</motion.div>

				{/* Enhanced Stats with 3D Cards */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.8 }}
					className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
				>
					{[
						{ number: '50+', label: 'Projects Completed', icon: <Star size={24} />, color: 'from-yellow-400 to-orange-500' },
						{ number: '5+', label: 'Years Experience', icon: <Zap size={24} />, color: 'from-blue-400 to-cyan-500' },
						{ number: '100%', label: 'Client Satisfaction', icon: <Sparkles size={24} />, color: 'from-green-400 to-emerald-500' }
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
							animate={{ opacity: 1, scale: 1, rotateY: 0 }}
							transition={{ duration: 0.8, delay: 1 + index * 0.2, type: "spring" }}
							whileHover={{ 
								y: -15, 
								scale: 1.1,
								rotateY: 10,
								boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
							}}
							className="group p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform-gpu"
						>
							<div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
								{stat.icon}
							</div>
							<div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
								{stat.number}
							</div>
							<div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Enhanced Social Links with 3D Effects */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.2 }}
					className="flex justify-center space-x-6"
				>
					{[
						{ icon: '🐦', label: 'Twitter', href: '#', color: 'from-blue-400 to-cyan-500' },
						{ icon: '💼', label: 'LinkedIn', href: '#', color: 'from-blue-500 to-indigo-600' },
						{ icon: '🐙', label: 'GitHub', href: '#', color: 'from-gray-600 to-gray-800' },
						{ icon: '📧', label: 'Email', href: '#', color: 'from-red-400 to-pink-500' }
					].map((social, index) => (
						<motion.a
							key={social.label}
							href={social.href}
							initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
							animate={{ opacity: 1, scale: 1, rotateY: 0 }}
							transition={{ duration: 0.6, delay: 1.4 + index * 0.1, type: "spring" }}
							whileHover={{ 
								scale: 1.3, 
								y: -10,
								rotateY: 180,
								boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
							}}
							whileTap={{ scale: 0.9 }}
							className="group p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform-gpu"
							aria-label={social.label}
						>
							<span className="group-hover:scale-110 transition-transform duration-300 text-2xl">
								{social.icon}
							</span>
						</motion.a>
					))}
				</motion.div>
			</motion.div>

			{/* Enhanced Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 2 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="text-white/60 cursor-pointer"
					onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
				>
					<motion.div
						whileHover={{ scale: 1.2, y: -5 }}
						className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
					>
						<ArrowDown size={24} />
					</motion.div>
				</motion.div>
			</motion.div>

			{/* Enhanced Mouse Follow Effect */}
			<motion.div
				className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference shadow-2xl"
				style={{
					x: mousePosition.x - 12,
					y: mousePosition.y - 12,
				}}
				animate={{
					scale: [1, 1.2, 1],
					rotate: [0, 180, 360],
				}}
				transition={{ 
					type: "spring", 
					stiffness: 500, 
					damping: 28,
					scale: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					},
					rotate: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}}
			/>
		</section>
	)
} 
