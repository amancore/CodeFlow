"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Home } from 'lucide-react'
import { use } from 'react'

export default function Navbar(props) {
  return (
    <nav className="bg-background shadow-sm py-1 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">{props.title}</Link>
      <div className="flex items-center">
					<Button variant="ghost" size="lg" asChild>
						<Link href="/" className="flex items-center gap-2">
							<Home className="h-5 w-5" />
							Home
						</Link>
					</Button>

					<Button size="icon" variant="ghost" asChild>
						<Link href="https://github.com/amancore/CodeFlow" target="_blank" className="flex items-center">
							<Github className="h-5 w-5" />
						</Link>
					</Button>
				</div>
    </nav>
  )
}

