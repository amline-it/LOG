"use client";

import type { ProviderStatus } from "@/lib/types/monitoring";
import { cn, formatMs, formatNumber, formatPercent } from "@/lib/utils";

function StatusDot({ status }: { status: ProviderStatus }) {
  const colors = {
    active: "bg-emerald-500",
    inactive: "bg-slate-300",
    degraded: "bg-amber-500",
  };
  const labels = {
    active: "فعال",
    inactive: "غیرفعال",
    degraded: "کاهش کیفیت",
  };

  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className={cn("h-2.5 w-2.5 rounded-full", colors[status])} />
      {labels[status]}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: number }) {
  const tone =
    priority === 1
      ? "bg-teal-50 text-teal-700"
      : priority === 2
        ? "bg-sky-50 text-sky-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", tone)}>
      اولویت {formatNumber(priority)}
    </span>
  );
}

export function ServiceMatrixTable({
  rows,
}: {
  rows: Array<{
    serviceNameFa: string;
    categoryFa: string;
    activeOrganizations: number;
    totalOrganizations: number;
    primaryProviderFa: string;
    fallbackProviderFa: string | null;
    status: ProviderStatus;
    successCount: number;
    failedCount: number;
    timeoutCount: number;
    noResultCount: number;
    successRate: number;
    providers: Array<{
      organizationNameFa: string;
      priority: number;
      status: ProviderStatus;
      successCount: number;
      failedCount: number;
      successRate: number;
    }>;
  }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">ماتریس سرویس × سازمان</h2>
        <p className="mt-1 text-sm text-slate-500">
          برای هر سرویس فعال، سازمان‌های ارائه‌دهنده، اولویت و وضعیت پاسخ‌دهی
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 text-right font-medium">سرویس</th>
              <th className="px-4 py-3 text-right font-medium">دسته</th>
              <th className="px-4 py-3 text-right font-medium">سازمان‌های فعال</th>
              <th className="px-4 py-3 text-right font-medium">Primary</th>
              <th className="px-4 py-3 text-right font-medium">Fallback</th>
              <th className="px-4 py-3 text-right font-medium">وضعیت</th>
              <th className="px-4 py-3 text-right font-medium">موفق</th>
              <th className="px-4 py-3 text-right font-medium">از دست رفته</th>
              <th className="px-4 py-3 text-right font-medium">نرخ موفقیت</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const lost = row.failedCount + row.timeoutCount + row.noResultCount;
              return (
                <tr key={row.serviceNameFa} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">{row.serviceNameFa}</div>
                    <div className="mt-2 space-y-1">
                      {row.providers.map((provider) => (
                        <div
                          key={`${row.serviceNameFa}-${provider.organizationNameFa}`}
                          className="flex flex-wrap items-center gap-2 text-xs text-slate-500"
                        >
                          <PriorityBadge priority={provider.priority} />
                          <span>{provider.organizationNameFa}</span>
                          <StatusDot status={provider.status} />
                          <span>{formatPercent(provider.successRate)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{row.categoryFa}</td>
                  <td className="px-4 py-4 text-slate-900">
                    {formatNumber(row.activeOrganizations)} / {formatNumber(row.totalOrganizations)}
                  </td>
                  <td className="px-4 py-4 font-medium text-teal-700">{row.primaryProviderFa}</td>
                  <td className="px-4 py-4 text-slate-600">{row.fallbackProviderFa ?? "—"}</td>
                  <td className="px-4 py-4">
                    <StatusDot status={row.status} />
                  </td>
                  <td className="px-4 py-4 text-emerald-700">{formatNumber(row.successCount)}</td>
                  <td className="px-4 py-4 text-rose-700">{formatNumber(lost)}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {formatPercent(row.successRate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OrganizationTable({
  rows,
}: {
  rows: Array<{
    organizationNameFa: string;
    status: ProviderStatus;
    priorityRank: number;
    servicesCount: number;
    successCount: number;
    failedCount: number;
    timeoutCount: number;
    noResultCount: number;
    successRate: number;
    avgResponseMs: number;
  }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">عملکرد سازمان‌ها</h2>
        <p className="mt-1 text-sm text-slate-500">
          وضعیت فعال/غیرفعال، اولویت میانگین و نرخ موفقیت هر سازمان
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 text-right font-medium">سازمان</th>
              <th className="px-4 py-3 text-right font-medium">وضعیت</th>
              <th className="px-4 py-3 text-right font-medium">اولویت</th>
              <th className="px-4 py-3 text-right font-medium">سرویس‌ها</th>
              <th className="px-4 py-3 text-right font-medium">موفق</th>
              <th className="px-4 py-3 text-right font-medium">از دست رفته</th>
              <th className="px-4 py-3 text-right font-medium">نرخ موفقیت</th>
              <th className="px-4 py-3 text-right font-medium">میانگین پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const lost = row.failedCount + row.timeoutCount + row.noResultCount;
              return (
                <tr key={row.organizationNameFa} className="border-t border-slate-100">
                  <td className="px-4 py-4 font-medium text-slate-900">{row.organizationNameFa}</td>
                  <td className="px-4 py-4">
                    <StatusDot status={row.status} />
                  </td>
                  <td className="px-4 py-4">
                    <PriorityBadge priority={row.priorityRank} />
                  </td>
                  <td className="px-4 py-4">{formatNumber(row.servicesCount)}</td>
                  <td className="px-4 py-4 text-emerald-700">{formatNumber(row.successCount)}</td>
                  <td className="px-4 py-4 text-rose-700">{formatNumber(lost)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-teal-500"
                          style={{ width: `${Math.min(row.successRate, 100)}%` }}
                        />
                      </div>
                      <span>{formatPercent(row.successRate)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{formatMs(row.avgResponseMs)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PriorityList({
  items,
}: {
  items: Array<{
    serviceNameFa: string;
    organizationNameFa: string;
    priority: number;
    status: ProviderStatus;
    successRate: number;
  }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">اولویت پاسخ‌دهی</h2>
      <p className="mt-1 text-sm text-slate-500">
        سازمان‌های فعال به ترتیب اولویت پیکربندی‌شده
      </p>
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item.serviceNameFa}-${item.organizationNameFa}-${item.priority}`}
            className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
                {formatNumber(index + 1)}
              </span>
              <div>
                <p className="font-medium text-slate-900">
                  {item.serviceNameFa} — {item.organizationNameFa}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <PriorityBadge priority={item.priority} />
                  <StatusDot status={item.status} />
                </div>
              </div>
            </div>
            <span className="text-sm font-medium text-slate-700">
              {formatPercent(item.successRate)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RecentErrorsList({
  items,
}: {
  items: Array<{
    id: string;
    timestamp: string;
    serviceNameFa: string;
    organizationNameFa: string;
    message: string;
    status: "failed" | "timeout" | "no_result";
  }>;
}) {
  const tone = {
    failed: "bg-rose-500",
    timeout: "bg-amber-500",
    no_result: "bg-slate-400",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">آخرین خطاها</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-100 px-4 py-3">
            <div className="flex items-start gap-3">
              <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", tone[item.status])} />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {item.serviceNameFa} — {item.organizationNameFa}
                </p>
                <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                <p className="mt-1 text-xs text-slate-400">{item.timestamp}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
