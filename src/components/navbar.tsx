"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { useTheme } from "next-themes";

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              My University Blog
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-foreground"
                  : "text-foreground/60 transition-colors hover:text-foreground"
              }
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={
                pathname === "/blog"
                  ? "text-foreground"
                  : "text-foreground/60 transition-colors hover:text-foreground"
              }
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:max-w-96">
            <SearchBar />
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              <Sun className="h-5 w-5 hide-if-dark" />
              <Moon className="h-5 w-5 hide-if-light" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
