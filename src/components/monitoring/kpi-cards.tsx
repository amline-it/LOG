"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock3,
  Gauge,
  Layers3,
  MinusCircle,
  RefreshCw,
  Server,
  XCircle,
} from "lucide-react";

import type { MonitoringSummary } from "@/lib/types/monitoring";
import { cn, formatMs, formatNumber, formatPercent } from "@/lib/utils";

function DeltaBadge({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0;
  const negative = invert ? value > 0 : value < 0;
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        positive && "bg-emerald-50 text-emerald-700",
        negative && "bg-rose-50 text-rose-700",
        !positive && !negative && "bg-slate-100 text-slate-600",
      )}
    >
      {value > 0 ? "+" : ""}
      {formatPercent(value, 1)}
    </span>
  );
}

interface KpiCardsProps {
  summary: MonitoringSummary;
}

export function KpiCards({ summary }: KpiCardsProps) {
  const cards = [
    {
      title: "کل استعلام‌ها",
      value: formatNumber(summary.totalInquiries),
      sub: summary.periodLabel,
      delta: summary.deltas.totalInquiries,
      icon: Activity,
      accent: "text-teal-700 bg-teal-50",
    },
    {
      title: "موفق",
      value: formatNumber(summary.successCount),
      sub: formatPercent(summary.successRate),
      icon: CheckCircle2,
      accent: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "ناموفق / از دست رفته",
      value: formatNumber(
        summary.failedCount + summary.timeoutCount + summary.noResultCount,
      ),
      sub: formatPercent(100 - summary.successRate),
      icon: XCircle,
      accent: "text-rose-700 bg-rose-50",
    },
    {
      title: "میانگین زمان پاسخ",
      value: formatMs(summary.avgResponseMs),
      delta: summary.deltas.avgResponseMs,
      invertDelta: true,
      icon: Clock3,
      accent: "text-sky-700 bg-sky-50",
    },
    {
      title: "استعلام در دقیقه",
      value: formatNumber(summary.inquiriesPerMinute),
      delta: summary.deltas.inquiriesPerMinute,
      icon: Gauge,
      accent: "text-violet-700 bg-violet-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
              <div className="mt-2 flex items-center gap-2">
                {card.sub ? (
                  <span className="text-xs text-slate-500">{card.sub}</span>
                ) : null}
                {"delta" in card && card.delta !== undefined ? (
                  <DeltaBadge value={card.delta} invert={card.invertDelta} />
                ) : null}
              </div>
            </div>
            <div className={cn("rounded-xl p-2", card.accent)}>
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface StatusWidgetsProps {
  summary: MonitoringSummary;
  worstProviderLabel: string;
}

export function StatusWidgets({ summary, worstProviderLabel }: StatusWidgetsProps) {
  const widgets = [
    {
      title: "سرویس‌های فعال",
      value: `${formatNumber(summary.activeServices)} از ${formatNumber(summary.totalServices)}`,
      icon: Server,
      tone: "text-teal-700 bg-teal-50",
    },
    {
      title: "سازمان‌های فعال",
      value: `${formatNumber(summary.activeOrganizations)} از ${formatNumber(summary.totalOrganizations)}`,
      icon: Building2,
      tone: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "بیشترین خطا",
      value: worstProviderLabel,
      icon: AlertTriangle,
      tone: "text-amber-700 bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4">
      {widgets.map((widget) => (
        <div
          key={widget.title}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className={cn("mb-3 inline-flex rounded-xl p-2", widget.tone)}>
            <widget.icon className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-500">{widget.title}</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{widget.value}</p>
        </div>
      ))}
    </div>
  );
}

export function DashboardHeader({ updatedAt }: { updatedAt: string }) {
  const time = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(updatedAt));

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            Analytics v1
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Service Sources
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Organizations
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">داشبورد تحلیلی استعلام‌ها</h1>
        <p className="mt-1 text-sm text-slate-500">
          مانیتورینگ سرویس‌های فعال، سازمان‌های ارائه‌دهنده، اولویت پاسخ‌دهی و نرخ موفقیت
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
          ۱۴۰۴/۰۵/۲۵ تا ۱۴۰۴/۰۵/۳۱
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <RefreshCw className="h-4 w-4" />
          بروزرسانی
        </button>
        <span className="text-xs text-slate-400">آخرین بروزرسانی: {time}</span>
      </div>
    </div>
  );
}

export function MiniBreakdownCards({
  successCount,
  failedCount,
  timeoutCount,
  noResultCount,
}: {
  successCount: number;
  failedCount: number;
  timeoutCount: number;
  noResultCount: number;
}) {
  const items = [
    { label: "پاسخ درست", value: successCount, icon: CheckCircle2, tone: "text-emerald-700" },
    { label: "ناموفق", value: failedCount, icon: XCircle, tone: "text-rose-700" },
    { label: "Timeout", value: timeoutCount, icon: Clock3, tone: "text-amber-700" },
    { label: "بدون نتیجه", value: noResultCount, icon: MinusCircle, tone: "text-slate-600" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <item.icon className={cn("h-4 w-4", item.tone)} />
            <span className="text-sm text-slate-500">{item.label}</span>
          </div>
          <p className="mt-2 text-xl font-bold text-slate-900">{formatNumber(item.value)}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceGroupCards({
  groups,
}: {
  groups: Array<{
    categoryFa: string;
    services: string[];
    activeCount: number;
    totalCount: number;
  }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {groups.map((group) => (
        <div
          key={group.categoryFa}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 inline-flex rounded-xl bg-teal-50 p-2 text-teal-700">
            <Layers3 className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900">{group.categoryFa}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {formatNumber(group.activeCount)} از {formatNumber(group.totalCount)} سرویس فعال
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.services.map((service) => (
              <span
                key={service}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
