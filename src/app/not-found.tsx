import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="container mx-auto p-8 pt-12 gap-10 flex flex-col">
			<h1 className="text-5xl font-extrabold">404: Page Not Found</h1>
			<div className="flex flex-col gap-6">
				<p className="text-lg text-muted-foreground">
					Sorry, the page you are looking for does not exist.
				</p>
				<Link href="/" passHref>
					<Button>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
