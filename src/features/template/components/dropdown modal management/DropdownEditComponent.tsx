import { useState, useEffect } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Toaster, toast } from "sonner";
import {
  Search,
  X,
  FolderOpen,
  Tag,
  LayoutGrid,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Input } from "../../../../components/ui/input";
import Skeleton from "../../../../components/ui/skeleton";
import AddCategoryDialog from "./ui/AddCategoryDialog";
import ItemManagement from "./ui/ItemManagement";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Item { id: string; name: string }
interface SubCategory { id: string; name: string; items: Item[] }
interface Category { id: string; name: string }

// ─── Seed data ─────────────────────────────────────────────────────────────────

const SEED: Category[] = [
  {
    id: "c1", name: "Food"
  },
  {
    id: "c2", name: "Recipe"
  },
  {
    id: "c3", name: "Timings"
  },
  {
    id: "c4", name: "Exercise"
  },
  {
    id: "c5", name: "Custom"
  },
];
export default function DropdownModalContent({ open, onOpenChange }: any) {
  const [categories, setCategories] = useState<Category[]>(SEED);

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8">
        <Toaster position="top-center" richColors />
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[100] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none sm:max-w-4xl max-h-[90vh] overflow-y-auto">

              {/* Dialog header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3 sticky top-0 z-10 bg-background border-b">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                    <LayoutGrid className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <DialogPrimitive.Title className="text-sm font-semibold text-foreground leading-none">
                      Manage Items
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-[11px] text-muted-foreground mt-0.5">
                      {/* {categories.length} categories · {totalItems} items */}
                    </DialogPrimitive.Description>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AddCategoryDialog
                    existingNames={categories.map((c) => c.name)}
                    onCreate={(cat) => setCategories((p) => [...p, cat])}
                  />
                  <DialogPrimitive.Close asChild>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </DialogPrimitive.Close>
                </div>
              </div>

              {/* Dialog body */}
              <div className="p-4">
                <ItemManagement categories={categories} setCategories={setCategories} />
              </div>

            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </TooltipPrimitive.Provider>
  );
}
