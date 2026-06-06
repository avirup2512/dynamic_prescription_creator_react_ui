import { Edit, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import type { ListingAction, ListingPageProps } from './type/ListingType'
import { useEffect } from 'react'



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
    useEffect(()=>{
      console.log(data);
      
    },[data])
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 sm:w-72"
              placeholder={searchPlaceholder}
              type="search"
            />
          </label>

          <Button className="h-9 gap-2" type="button" onClick={onCreate}>
            <Plus className="size-4" />
            {createLabel}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                {columns.map((column) => (
                  <th
                    className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground"
                    key={String(column.key)}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="w-32 px-4 py-3 text-right text-xs font-semibold uppercase text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    className="border-t border-border transition hover:bg-muted/40"
                    key={item.id}
                  >
                    {columns.map((column) => (
                      <td
                        className="px-4 py-4 text-sm text-foreground"
                        key={String(column.key)}
                      >
                        {column.render
                          ? column.render(item)
                          : String(item[column.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {rowActions.map((action) => (
                          <Button
                            aria-label={action.label}
                            key={action.label}
                            onClick={() => action.onClick?.(item)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            {action.icon ?? <MoreHorizontal className="size-4" />}
                          </Button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                    colSpan={columns.length + 1}
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListingPage
