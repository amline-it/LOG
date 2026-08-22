"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { PeakHourPoint, TrendPoint } from "@/lib/types/monitoring";
import { formatNumber } from "@/lib/utils";

export function TrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">روند استعلام‌ها</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="success" name="موفق" stroke="#14b8a6" strokeWidth={2} />
            <Line type="monotone" dataKey="failed" name="ناموفق" stroke="#f43f5e" strokeWidth={2} />
            <Line type="monotone" dataKey="timeout" name="Timeout" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="noResult" name="بدون نتیجه" stroke="#94a3b8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PeakHoursChart({ data }: { data: PeakHourPoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">ساعت اوج استعلام</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} interval={2} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" name="تعداد" fill="#14b8a6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProviderComparisonChart({
  data,
}: {
  data: Array<{ name: string; success: number; failed: number }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">شاهکار — موفق vs از دست رفته</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="success" name="موفق" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="failed" name="از دست رفته" fill="#f43f5e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatusDistributionChart({
  success,
  failed,
  timeout,
  noResult,
}: {
  success: number;
  failed: number;
  timeout: number;
  noResult: number;
}) {
  const data = [
    { name: "موفق", value: success, color: "#14b8a6" },
    { name: "ناموفق", value: failed, color: "#f43f5e" },
    { name: "Timeout", value: timeout, color: "#f59e0b" },
    { name: "بدون نتیجه", value: noResult, color: "#94a3b8" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">توزیع وضعیت</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
