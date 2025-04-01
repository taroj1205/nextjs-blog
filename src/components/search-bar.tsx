"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import searchJSON from "@/lib/search-data.json";
import Link from "next/link";
import { motion } from "framer-motion";

interface SearchResult {
	title: string;
	slug: string;
	excerpt: string;
}

export function SearchBar() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (query.length > 0) {
			const filteredResults = searchJSON.filter((item: SearchResult) =>
				JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
			);
			setResults(filteredResults);
			setIsOverlayVisible(true);
		} else {
			setResults([]);
			setIsOverlayVisible(false);
		}
	}, [query]);

			const handleClickOutside = useCallback((event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOverlayVisible(false);
				setActiveIndex(0);
			}
		}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query) {
			router.push(`/blog?q=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative w-full" ref={containerRef}>
			<div className="relative">
				<Input
					type="search"
					placeholder="Search..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => {
						if (results.length > 0) {
							setIsOverlayVisible(true);
						}
					}}
					className="w-full pl-4 pr-12"
					ref={inputRef}
				/>
				<Button
					type="submit"
					size="sm"
					variant="ghost"
					className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-muted/50"
				>
					<Search className="h-4 w-4" />
					<span className="sr-only">Search</span>
				</Button>
			</div>
			{isOverlayVisible && results.length > 0 && (
				<motion.ul
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.15 }}
					className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border bg-background/95 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-background/90"
				>
					{results.map((result) => (
						<li
							key={result.slug}
							className="border-b last:border-b-0 transition-colors duration-200 ease-in-out data-[active=true]:bg-muted"
							data-active={activeIndex === results.indexOf(result) + 1}
						>
							<Link
								href={`/blog/${result.slug}`}
								className="block px-4 py-3 hover:bg-muted/50"
							>
								<h3 className="font-medium text-sm text-foreground">{result.title}</h3>
								<p className="mt-1 text-xs text-muted-foreground line-clamp-2">
									{result.excerpt}
								</p>
							</Link>
						</li>
					))}
				</motion.ul>
			)}
		</form>
	);
}
