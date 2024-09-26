import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose md:text-left">
						Built by Shintaro Jokagi. The source code is available on{" "}
						<Link
							href="https://github.com/taroj1205/nextjs-blog"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</Link>
						.
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<Link
						href="https://github.com/taroj1205"
						target="_blank"
						rel="noreferrer"
					>
						<Github className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</Link>
					<Link
						href="https://twitter.com/taroj1205"
						target="_blank"
						rel="noreferrer"
					>
						<Twitter className="h-5 w-5" />
						<span className="sr-only">Twitter</span>
					</Link>
					<Link
						href="https://linkedin.com/in/taroj"
						target="_blank"
						rel="noreferrer"
					>
						<Linkedin className="h-5 w-5" />
						<span className="sr-only">LinkedIn</span>
					</Link>
				</div>
			</div>
		</footer>
	);
}
