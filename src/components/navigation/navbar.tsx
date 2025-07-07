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
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? 'glass-effect shadow-lg'
					: 'bg-transparent'
			}`}
		>
			<div className="container-custom section-padding">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-2xl font-bold gradient-text"
					>
						Portfolio
					</motion.div>

					{/* Desktop Navigation */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="hidden md:flex items-center space-x-8"
					>
						{navItems.map((item, index) => (
							<button
								key={item.name}
								onClick={() => handleNavClick(item.href)}
								className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
								style={{
									animationDelay: `${index * 0.1}s`,
								}}
							>
								{item.name}
							</button>
						))}
					</motion.div>

					{/* Mobile Menu Button */}
					<motion.button
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
						aria-label="Toggle menu"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</motion.button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden glass-effect border-t border-white/20"
					>
						<div className="container-custom py-4">
							<div className="flex flex-col space-y-4">
								{navItems.map((item, index) => (
									<motion.button
										key={item.name}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.3,
											delay: index * 0.1,
										}}
										onClick={() => handleNavClick(item.href)}
										className="text-left text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
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
