import { Bell, Search, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '../ui/button'
import { ThemeToggle } from '../tiptap-templates/simple/theme-toggle'

function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
        <h2 className="truncate text-lg font-semibold">My Prescription</h2>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
            placeholder="Search"
            type="search"
          />
        </label>

        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <ThemeToggle />
        <Button asChild variant="ghost" className="h-9 gap-2 px-2">
          <Link to="/dashboard/profile">
            <span className="flex size-7 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-4" />
            </span>
            <span className="hidden text-sm font-medium sm:inline">Account</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}

export default Navbar
