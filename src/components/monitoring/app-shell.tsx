"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  LogOut,
  Server,
  Settings,
  ShieldAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/inquiries/analytics", label: "داشبورد استعلام", icon: LayoutDashboard },
  { href: "/inquiries/analytics#matrix", label: "منابع سرویس", icon: Server },
  { href: "/inquiries/analytics#organizations", label: "سازمان‌ها", icon: Building2 },
  { href: "/inquiries/analytics#charts", label: "گزارش‌ها", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-l border-slate-200 bg-slate-900 text-white lg:block">
          <div className="border-b border-slate-800 px-6 py-5">
            <p className="text-lg font-bold">Amline Admin</p>
            <p className="mt-1 text-xs text-slate-400">Inquiry Monitoring</p>
          </div>
          <nav className="space-y-1 p-4">
            {navItems.map((item) => {
              const active = pathname === item.href.split("#")[0];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-teal-500/15 text-teal-300"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-1 border-t border-slate-800 p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              <ShieldAlert className="h-4 w-4" />
              هشدارها
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
              تنظیمات
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </div>
        </aside>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
