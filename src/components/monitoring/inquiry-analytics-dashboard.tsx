"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/monitoring/app-shell";
import {
  PeakHoursChart,
  ProviderComparisonChart,
  StatusDistributionChart,
  TrendChart,
} from "@/components/monitoring/charts";
import {
  DashboardHeader,
  KpiCards,
  MiniBreakdownCards,
  ServiceGroupCards,
  StatusWidgets,
} from "@/components/monitoring/kpi-cards";
import {
  OrganizationTable,
  PriorityList,
  RecentErrorsList,
  ServiceMatrixTable,
} from "@/components/monitoring/tables";
import type { MonitoringPayload } from "@/lib/types/monitoring";

export function InquiryAnalyticsDashboard() {
  const [data, setData] = useState<MonitoringPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/monitoring")
      .then((res) => res.json())
      .then((payload: MonitoringPayload) => {
        setData(payload);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          در حال بارگذاری داشبورد مانیتورینگ...
        </div>
      </AppShell>
    );
  }

  if (!data) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
          خطا در دریافت داده‌های مانیتورینگ
        </div>
      </AppShell>
    );
  }

  const shahkarProviders = data.serviceMatrix
    .find((row) => row.serviceId === "shahkar")
    ?.providers.map((provider) => ({
      name: provider.organizationNameFa,
      success: provider.successCount,
      failed: provider.failedCount,
    })) ?? [];

  const worstProvider = [...data.serviceMatrix]
    .flatMap((row) =>
      row.providers.map((provider) => ({
        label: `${row.serviceNameFa} (${provider.organizationNameFa})`,
        errorRate: 100 - provider.successRate,
      })),
    )
    .sort((a, b) => b.errorRate - a.errorRate)[0];

  return (
    <AppShell>
      <div className="space-y-6">
        <DashboardHeader updatedAt={data.updatedAt} />

        <KpiCards summary={data.summary} />

        <MiniBreakdownCards
          successCount={data.summary.successCount}
          failedCount={data.summary.failedCount}
          timeoutCount={data.summary.timeoutCount}
          noResultCount={data.summary.noResultCount}
        />

        <ServiceGroupCards groups={data.serviceGroups} />

        <section id="matrix" className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <StatusWidgets
            summary={data.summary}
            worstProviderLabel={
              worstProvider
                ? `${worstProvider.label} — ${Math.round(worstProvider.errorRate * 10) / 10}٪ خطا`
                : "—"
            }
          />
          <ServiceMatrixTable rows={data.serviceMatrix} />
        </section>

        <section id="organizations" className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <OrganizationTable rows={data.organizations} />
          <PriorityList items={data.priorities} />
        </section>

        <section id="charts" className="grid gap-6 xl:grid-cols-2">
          <TrendChart data={data.trend} />
          <StatusDistributionChart
            success={data.summary.successCount}
            failed={data.summary.failedCount}
            timeout={data.summary.timeoutCount}
            noResult={data.summary.noResultCount}
          />
          <ProviderComparisonChart data={shahkarProviders} />
          <PeakHoursChart data={data.peakHours} />
        </section>

        <RecentErrorsList items={data.recentErrors} />
      </div>
    </AppShell>
  );
}
