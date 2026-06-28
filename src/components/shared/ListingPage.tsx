import { Edit, MoreHorizontal, Plus, Search, Trash2, Download, ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import type { ListingAction, ListingPageProps } from './type/ListingType'

function ListingPage<T extends { id: string | number }>({
  title,
  description,
  createLabel = 'Create',
  searchPlaceholder = 'Search',
  columns,
  data,
  actions,
  onCreate,
}: ListingPageProps<T>) {
  const rowActions =
    actions ??
    ([
      { label: 'Edit', icon: <Edit className="size-3" /> },
      { label: 'Delete', icon: <Trash2 className="size-3" /> },
    ] satisfies ListingAction<T>[])

  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([])

  const allSelected = data.length > 0 && selectedIds.length === data.length
  const partiallySelected = selectedIds.length > 0 && selectedIds.length < data.length

  const accentColors = ['border-emerald-400', 'border-cyan-400', 'border-fuchsia-400', 'border-amber-400', 'border-rose-400']

  const selectedItems = useMemo(
    () => new Set(selectedIds),
    [selectedIds]
  )

  const toggleRowSelection = (id: string | number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    )
  }

  const toggleAll = () => {
    setSelectedIds((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    )
  }

  const getStatusBadgeClasses = (status: unknown) => {
    const value = String(status ?? '').toLowerCase()
    if (value.includes('active')) return 'bg-emerald-50 text-emerald-700'
    if (value.includes('pending')) return 'bg-amber-50 text-amber-700'
    if (value.includes('critical')) return 'bg-rose-50 text-rose-700'
    if (value.includes('discharged')) return 'bg-slate-100 text-slate-700'
    return 'bg-slate-100 text-slate-700'
  }

  const formatShortDate = (value: unknown) => {
    const date = new Date(String(value))
    if (Number.isNaN(date.getTime())) return String(value ?? '')

    const day = date.getDate()
    const suffix =
      day % 10 === 1 && day !== 11 ? 'st' :
        day % 10 === 2 && day !== 12 ? 'nd' :
          day % 10 === 3 && day !== 13 ? 'rd' : 'th'
    const month = date.toLocaleString('en-US', { month: 'short' })
    return `${day}${suffix} ${month}`
  }

  const formatCellValue = (rawValue: unknown, keyName: string) => {
    if (rawValue == null) return ''
    const value = String(rawValue)
    const lowerKey = keyName.toLowerCase()
    const isUpdatedField = ['updated', 'updated_at', 'last visit', 'last_visit'].some((term) => lowerKey.includes(term))
    const looksLikeDate = /\d{4}-\d{2}-\d{2}/.test(value) || /\d{2}:\d{2}/.test(value)
    return isUpdatedField || looksLikeDate ? formatShortDate(rawValue) : value
  }

  return (
    <div className="p-6">
      {/* Breadcrumb + header */}
      <div className="mb-4 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <nav className="mb-2 text-sm text-slate-500">Dashboard &gt; <span className="text-slate-700">{title}</span></nav>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <div className="text-sm text-slate-500">{data.length.toLocaleString()} records</div>
          </div>
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" className="h-9 gap-2">
            <Search className="size-4" />
            Filter
            <ChevronDown className="size-4" />
          </Button>
          <Button variant="outline" className="h-9 gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button variant="outline" className="h-9 gap-2">
            Sort: Last Visit
            <ChevronDown className="size-4" />
          </Button>
          <Button className="h-9 bg-blue-600 text-white hover:bg-blue-700" onClick={onCreate}>
            <Plus className="size-4 text-white" />
            New {createLabel}
          </Button>
        </div>
      </div>

      {/* Filters row (visual only) */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-slate-700">
            <option>Status</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-slate-700">
            <option>Specialty</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-slate-700">
            <option>Assigned Doctor</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-slate-700">
            <option>Date range</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-slate-700">
            <option>Tags</option>
          </select>
        </div>

        <div className="ml-auto w-72">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              placeholder={searchPlaceholder}
              type="search"
            />
          </label>
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="w-14 px-4 py-3">
                  <Checkbox
                    checked={allSelected ? true : partiallySelected ? 'indeterminate' : false}
                    onCheckedChange={toggleAll}
                  />
                </th>
                {columns.map((column) => (
                  <th
                    className="px-4 py-3 text-xs font-semibold uppercase text-slate-500"
                    key={String(column.key)}
                  >
                    {column.label}
                  </th>
                ))}
                {/* <th className="w-20 px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, idx) => {
                  const selected = selectedItems.has(item.id)
                  return (
                    <tr
                      className={
                        `relative border-t border-slate-100 transition hover:bg-slate-50 ${selected ? 'bg-slate-50' : ''}`
                      }
                      key={item.id}
                    >
                      <td className="relative w-14 px-4 py-4">
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleRowSelection(item.id)}
                        />
                      </td>
                      {/* <td className={`absolute left-0 top-0 h-full w-1 ${accentColors[idx % accentColors.length]}`} aria-hidden /> */}
                      {columns.map((column, cidx) => {
                        const rawValue = item[column.key]
                        const rendered = column.render ? column.render(item) : formatCellValue(rawValue, String(column.key))
                        const isStatus = String(column.key).toLowerCase() === 'status'
                        return (
                          <td className="px-6 py-4 align-top text-sm text-slate-800" key={String(column.key)}>
                            {cidx === 0 && !column.render ? (
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                                  {String(item.name ?? item.title ?? '')
                                    .split(' ')
                                    .map((s) => s[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate font-medium text-slate-900">{String(item.name ?? item.title ?? '')}</div>
                                  {item.mrn ? (
                                    <div className="text-xs text-slate-400">{String(item.mrn)}</div>
                                  ) : null}
                                </div>
                              </div>
                            ) : isStatus && !column.render ? (
                              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClasses(rawValue)}`}>
                                {String(rawValue ?? '')}
                              </span>
                            ) : (
                              rendered
                            )}
                          </td>
                        )
                      })}
                      <td className="px-4 py-4">
                        <div className="flex justify-end items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" type="button">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {rowActions.map((action) => (
                                <DropdownMenuItem
                                  key={action.label}
                                  onSelect={() => action.onClick?.(item)}
                                >
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="px-4 py-12 text-center text-sm text-muted-foreground" colSpan={columns.length + 2}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3">
          <div className="text-xs text-slate-500">1-25 of {data.length.toLocaleString()}</div>
          <div className="flex items-center gap-2">
            <select className="h-8 rounded-md border border-input bg-background px-2 text-sm">
              <option>Rows per page: 25</option>
            </select>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 rounded-md border border-input text-sm">«</button>
              <button className="h-8 w-8 rounded-md bg-blue-600 text-white">1</button>
              <button className="h-8 w-8 rounded-md border border-input text-sm">2</button>
              <button className="h-8 w-8 rounded-md border border-input text-sm">3</button>
              <button className="h-8 w-8 rounded-md border border-input text-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPage
