import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Metadata = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export const metadata: Metadata = {
	title: {
		default: "My University Blog",
		template: "%s | My University Blog",
	},
	description: "A blog about my university life and coding journey",
	keywords: ["university", "coding", "blog", "student life", "programming"],
	authors: [{ name: "Shintaro Jokagi" }],
	creator: "Shintaro Jokagi",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://taroj-blog.pages.dev/",
		siteName: "My University Blog",
	},
	twitter: {
		card: "summary_large_image",
		title: "My University Blog",
		description: "A blog about my university life and coding journey",
		creator: "@taroj1205",
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<head />
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Navbar />
					<main className="flex-grow">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
