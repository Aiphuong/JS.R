'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export interface ToastProps {
	id: string
	type: 'success' | 'error' | 'warning' | 'info'
	title: string
	message?: string
	duration?: number
	onClose: (id: string) => void
}

const toastIcons = {
	success: CheckCircle,
	error: XCircle,
	warning: AlertCircle,
	info: Info
}

const toastStyles = {
	success: 'border-green-500 bg-green-500/10 text-green-600',
	error: 'border-red-500 bg-red-500/10 text-red-600',
	warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-600',
	info: 'border-blue-500 bg-blue-500/10 text-blue-600'
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
	const [isVisible, setIsVisible] = useState(true)
	const Icon = toastIcons[type]

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(() => onClose(id), 300)
		}, duration)

		return () => clearTimeout(timer)
	}, [duration, id, onClose])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, x: 300, scale: 0.8 }}
					animate={{ opacity: 1, x: 0, scale: 1 }}
					exit={{ opacity: 0, x: 300, scale: 0.8 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${toastStyles[type]}`}
				>
					<Icon size={20} className="mt-0.5 flex-shrink-0" />
					<div className="flex-1 min-w-0">
						<h4 className="font-semibold text-sm">{title}</h4>
						{message && (
							<p className="text-sm opacity-90 mt-1">{message}</p>
						)}
					</div>
					<button
						onClick={() => {
							setIsVisible(false)
							setTimeout(() => onClose(id), 300)
						}}
						className="p-1 rounded-full hover:bg-black/10 transition-colors flex-shrink-0"
					>
						<X size={16} />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

interface ToastContainerProps {
	toasts: ToastProps[]
	onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} onClose={onClose} />
			))}
		</div>
	)
}

// Toast hook for easy usage
export function useToast() {
	const [toasts, setToasts] = useState<ToastProps[]>([])

	const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
		const id = Math.random().toString(36).substr(2, 9)
		const newToast = { ...toast, id, onClose: removeToast }
		setToasts(prev => [...prev, newToast])
	}

	const removeToast = (id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id))
	}

	const success = (title: string, message?: string) => {
		addToast({ type: 'success', title, message })
	}

	const error = (title: string, message?: string) => {
		addToast({ type: 'error', title, message })
	}

	const warning = (title: string, message?: string) => {
		addToast({ type: 'warning', title, message })
	}

	const info = (title: string, message?: string) => {
		addToast({ type: 'info', title, message })
	}

	return {
		toasts,
		success,
		error,
		warning,
		info,
		removeToast
	}
} 