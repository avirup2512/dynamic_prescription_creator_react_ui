import { type ReactNode } from 'react';
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 font-mono text-cyan-400">
            {'</>'}
          </span>
          Acme
        </div>

        <div className="relative z-10 max-w-md space-y-3">
          <p className="text-3xl font-semibold leading-tight text-white">
            Ship faster. Sleep better.
          </p>
          <p className="text-sm text-slate-400">
            Everything you need to manage your account, projects and team — in one place.
          </p>
        </div>

        <p className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}