'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavItem {
	name: string
	href: string
}

const navItems: NavItem[] = [
	{ name: 'Home', href: '#home' },
	{ name: 'About', href: '#about' },
	{ name: 'Skills', href: '#skills' },
	{ name: 'Projects', href: '#projects' },
	{ name: 'Experience', href: '#experience' },
	{ name: 'Contact', href: '#contact' },
]

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleNavClick = (href: string) => {
		setIsOpen(false)
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500 ease-out ${
				scrolled
					? 'bg-white/90 backdrop-blur-md shadow-2xl border-b border-gray-200/50'
					: 'bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm'
			}`}
		>
			<div className="container-custom px-6 h-full">
				<div className="flex items-center justify-between h-full">
					{/* Enhanced Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
					>
						Portfolio
					</motion.div>

					{/* Enhanced Desktop Navigation */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
						className="hidden md:flex items-center space-x-8"
					>
						{navItems.map((item, index) => (
							<motion.button
								key={item.name}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
								onClick={() => handleNavClick(item.href)}
								className="relative text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300 group"
							>
								{item.name}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
							</motion.button>
						))}
					</motion.div>

					{/* Enhanced Mobile Menu Button */}
					<motion.button
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
						aria-label="Toggle menu"
					>
						{isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
					</motion.button>
				</div>
			</div>

			{/* Enhanced Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0, y: -20 }}
						animate={{ opacity: 1, height: 'auto', y: 0 }}
						exit={{ opacity: 0, height: 0, y: -20 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-white/20 shadow-2xl"
					>
						<div className="container-custom py-6">
							<div className="flex flex-col space-y-4">
								{navItems.map((item, index) => (
									<motion.button
										key={item.name}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
										onClick={() => handleNavClick(item.href)}
										className="text-left text-gray-800 hover:text-blue-600 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:translate-x-2"
									>
										{item.name}
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
} 
