import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function SideBar({routeArray, isCollapsed, onToggleCollapse}:any)
{
    const location = useLocation()
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

    function toggleMenu(menuUrl: string) {
        setOpenMenus((currentMenus) => ({
            ...currentMenus,
            [menuUrl]: !currentMenus[menuUrl],
        }))
    }

    return(
        <aside className={`flex shrink-0 flex-col border-r border-border bg-card px-4 py-5 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="border-b border-border pb-5">
                <div className="flex items-center justify-between gap-3">
                    <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
                        <h1 className="text-lg font-semibold">My Prescription</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Dashboard</p>
                    </div>
                    <button
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={onToggleCollapse}
                        type="button"
                    >
                        {isCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
                    </button>
                </div>
            </div>

            <nav className="mt-6 space-y-1">
                {
                    routeArray && routeArray.length > 0 && routeArray.map((e:any,i:any)=>{
                        const hasChildren = e?.children && e.children.length > 0
                        const menuUrl = String(e?.url ?? '')
                        const isChildActive = hasChildren && e.children.some((child:any) =>
                            location.pathname.startsWith("/dashboard/"+child?.url)
                        )
                        const isOpen = openMenus[menuUrl] ?? isChildActive

                        if (hasChildren) {
                            return (
                                <div key={i}>
                                    <button
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted hover:text-foreground ${
                                            isChildActive
                                              ? 'bg-muted text-foreground'
                                              : 'text-muted-foreground'
                                        }`}
                                        onClick={() => toggleMenu(menuUrl)}
                                        type="button"
                                    >
                                        <span className={`truncate ${isCollapsed ? 'hidden' : 'block'}`}>{e?.label}</span>
                                        <span className={`${isCollapsed ? 'mx-auto' : ''}`}>
                                            <ChevronDown
                                                className={`size-4 transition-transform ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </span>
                                    </button>

                                    {isOpen && !isCollapsed ? (
                                        <div className="mt-1 space-y-1 border-l border-border pl-3">
                                            {e.children.map((child:any, childIndex:any) => (
                                                <NavLink
                                                    className={({ isActive }) =>
                                                      `block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted hover:text-foreground ${
                                                        isActive
                                                          ? 'bg-muted text-foreground'
                                                          : 'text-muted-foreground'
                                                      }`
                                                    }
                                                    key={childIndex}
                                                    to={"/dashboard/"+child?.url}
                                                >
                                                    {child?.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            )
                        }

                        return (
                            <div key={i}>
                                <NavLink
                                    className={({ isActive }) =>
                                      `block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted hover:text-foreground ${
                                        isActive
                                          ? 'bg-muted text-foreground'
                                          : 'text-muted-foreground'
                                      }`
                                    }
                                    to={"/dashboard/"+e?.url}
                                >
                                    <span className={`block truncate ${isCollapsed ? 'hidden' : ''}`}>{e?.label}</span>
                                    {isCollapsed ? (
                                        <span className="block text-center text-xs font-semibold">
                                            {String(e?.label ?? '').charAt(0).toUpperCase()}
                                        </span>
                                    ) : null}
                                </NavLink>

                            </div>
                        )
                    })
                }
            </nav>
      </aside>
    )
}
export default SideBar;
