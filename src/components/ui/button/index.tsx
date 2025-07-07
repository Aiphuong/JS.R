import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline' | 'destructive' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'md', asChild = false, ...props }, ref) => {
		const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
		
		const variants = {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			ghost: 'hover:bg-accent hover:text-accent-foreground'
		}
		
		const sizes = {
			sm: 'h-8 px-3 text-sm',
			md: 'h-10 px-4 py-2',
			lg: 'h-12 px-8 text-lg'
		}
		
		return (
			<button
				className={cn(
					baseClasses,
					variants[variant],
					sizes[size],
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'

export { Button } 