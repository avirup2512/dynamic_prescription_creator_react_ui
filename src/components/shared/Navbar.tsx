import { Bell, LogOut, Menu, Search, UserRound, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'
import { ThemeToggle } from '../tiptap-templates/simple/theme-toggle'
import { useDispatch, useSelector } from 'react-redux'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import AuthService from '@/features/auth/service/AuthService'
import { SetLoggedInUser } from '@/features/auth/store/AuthSlice'

function Navbar({ onToggleSidebar, isSidebarCollapsed }: { onToggleSidebar?: () => void; isSidebarCollapsed?: boolean }) {
  const authSelector = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await AuthService.logout();
    } finally {
      localStorage.removeItem('auth_token');
      dispatch((SetLoggedInUser as any)({ id: '', email: '' }));
      navigate('/auth');
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 sm:px-6 backdrop-blur">
      <div className="flex items-center gap-3 min-w-0">
        <button
          aria-label={isSidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground md:hidden"
          onClick={onToggleSidebar}
          type="button"
        >
          {isSidebarCollapsed ? <Menu className="size-5" /> : <X className="size-5" />}
        </button>

        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h2 className="truncate text-lg font-semibold">My Prescription</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* <label className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
            placeholder="Search"
            type="search"
          />
        </label>

        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell />
        </Button> */}
        {/* <ThemeToggle /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              {
                authSelector?.loggedInUser && authSelector.loggedInUser.email ?
                  <>
                    <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                      {authSelector.loggedInUser.email[0]?.toUpperCase()}
                    </span>
                  </> :
                  <>
                    <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                      <UserRound className="size-4" />
                    </span>
                  </>
              }
              <span className="hidden text-sm font-medium sm:inline">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile">
                <UserRound className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar
