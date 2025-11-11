'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Library, PlusCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Library', href: '/library', icon: Library },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/10 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-xl font-bold">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Subliminal
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/upload">
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <PlusCircle className="h-4 w-4" />
                Upload
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
