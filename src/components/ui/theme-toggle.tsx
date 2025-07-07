'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/context/ThemeContext'
import { motion } from 'framer-motion'

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()

	const themes = [
		{ value: 'light' as const, icon: Sun, label: 'Light' },
		{ value: 'dark' as const, icon: Moon, label: 'Dark' },
		{ value: 'system' as const, icon: Monitor, label: 'System' },
	]

	return (
		<div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
			{themes.map(({ value, icon: Icon, label }) => (
				<motion.button
					key={value}
					onClick={() => setTheme(value)}
					className={`p-2 rounded-md transition-all duration-200 ${
						theme === value
							? 'bg-background text-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'
					}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					title={`Switch to ${label} mode`}
				>
					<Icon size={16} />
				</motion.button>
			))}
		</div>
	)
} 