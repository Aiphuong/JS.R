import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Portfolio | Full Stack Developer",
	description: "Professional portfolio showcasing web development projects and skills",
	keywords: ["portfolio", "web developer", "full stack", "react", "next.js"],
	authors: [{ name: "Your Name" }],
	creator: "Your Name",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://your-portfolio.com",
		title: "Portfolio | Full Stack Developer",
		description: "Professional portfolio showcasing web development projects and skills",
		siteName: "Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Portfolio | Full Stack Developer",
		description: "Professional portfolio showcasing web development projects and skills",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
			>
				{children}
			</body>
		</html>
	);
}
