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
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (query.length > 0) {
			const filteredResults = searchJSON.filter((item: SearchResult) =>
				JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
			);
			setResults(filteredResults);
		} else {
			setResults([]);
		}
	}, [query]);

	const handleKeydown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setQuery("");
				setResults([]);
			} else if (e.key === "Enter") {
				if (activeIndex > 0) {
					const result = results[activeIndex - 1];
					router.push(`/blog/${result.slug}`);
					setQuery("");
					setResults([]);
				} else {
					router.push(`/blog?q=${encodeURIComponent(query)}`);
				}
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				if (results.length > 0 && activeIndex < results.length) {
					setActiveIndex((prevIndex) => prevIndex + 1);
				}
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				if (results.length > 0 && activeIndex > 0) {
					setActiveIndex((prevIndex) => prevIndex - 1);
				}
			} else if (query.length === 0) {
				setActiveIndex(0);
			}
		},
		[query, router, results, activeIndex],
	);

	useEffect(() => {
		const inputEl = inputRef.current;
		const handleKeyDown = (e: KeyboardEvent) => handleKeydown(e);
		if (inputEl) {
			inputEl.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			if (inputEl) {
				inputEl.removeEventListener("keydown", handleKeyDown);
			}
		};
	}, [handleKeydown]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query) {
			router.push(`/blog?q=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<Input
				type="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full"
				ref={inputRef}
			/>
			<Button type="submit" size="sm" className="absolute right-0 top-0 h-full">
				<Search className="h-4 w-4" />
				<span className="sr-only">Search</span>
			</Button>
			{results.length > 0 && (
				<motion.ul
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="absolute z-10 mt-2 w-full rounded-md bg-background shadow-lg"
				>
					{results.map((result) => (
						<li
							key={result.slug}
							className="border-b last:border-b-0 bg-transparent data-[active=true]:bg-muted transition-colors duration-200 ease-in-out"
							data-active={activeIndex === results.indexOf(result) + 1}
						>
							<Link
								href={`/blog/${result.slug}`}
								className="block px-4 py-2 hover:bg-muted"
							>
								<h3 className="text-sm font-medium">{result.title}</h3>
								<p className="text-xs text-muted-foreground">
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
