import { ReactNode } from 'react'
import Link from 'next/link'
import { Settings, User, Briefcase, FolderOpen, Mail, Home } from 'lucide-react'

interface AdminLayoutProps {
	children: ReactNode
}

const navItems = [
	{ href: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
	{ href: '/admin/hero', label: 'Hero Section', icon: <User size={20} /> },
	{ href: '/admin/about', label: 'About Section', icon: <User size={20} /> },
	{ href: '/admin/projects', label: 'Projects', icon: <FolderOpen size={20} /> },
	{ href: '/admin/experience', label: 'Experience', icon: <Briefcase size={20} /> },
	{ href: '/admin/contact', label: 'Contact', icon: <Mail size={20} /> },
	{ href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold text-gray-900">Portfolio Admin</h1>
						</div>
						<div className="flex items-center space-x-4">
							<Link
								href="/"
								className="text-gray-500 hover:text-gray-700 transition-colors"
							>
								View Site
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Sidebar */}
				<aside className="w-64 bg-white shadow-sm min-h-screen">
					<nav className="mt-8">
						<div className="px-4 space-y-2">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
								>
									{item.icon}
									<span className="ml-3">{item.label}</span>
								</Link>
							))}
						</div>
					</nav>
				</aside>

				{/* Main content */}
				<main className="flex-1 p-8">
					{children}
				</main>
			</div>
		</div>
	)
} 