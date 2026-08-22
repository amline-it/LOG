import type {
  MonitoringPayload,
  Organization,
  ServiceDefinition,
  ServiceProviderBinding,
} from "@/lib/types/monitoring";

const organizations: Organization[] = [
  { id: "cache", name: "Cache", nameFa: "کش داخلی", status: "active" },
  { id: "zohal", name: "Zohal", nameFa: "زحل", status: "active" },
  { id: "vandar", name: "Vandar", nameFa: "وندار", status: "active" },
  { id: "pgsb", name: "PGSB", nameFa: "PGSB", status: "degraded" },
  { id: "zadak", name: "Zadak", nameFa: "زاداک", status: "inactive" },
];

const services: ServiceDefinition[] = [
  {
    id: "shahkar",
    name: "Shahkar",
    nameFa: "شاهکار",
    category: "identity",
    categoryFa: "هویت و احراز",
  },
  {
    id: "identity",
    name: "Identity Inquiry",
    nameFa: "استعلام هویت",
    category: "identity",
    categoryFa: "هویت و احراز",
  },
  {
    id: "postal",
    name: "Postal Code",
    nameFa: "کد پستی",
    category: "address",
    categoryFa: "آدرس و پست",
  },
  {
    id: "kyc",
    name: "KYC",
    nameFa: "احراز هویت KYC",
    category: "kyc",
    categoryFa: "KYC / PGSB",
  },
  {
    id: "pgsb_inquiry",
    name: "PGSB Inquiry",
    nameFa: "استعلام PGSB",
    category: "kyc",
    categoryFa: "KYC / PGSB",
  },
  {
    id: "contract",
    name: "Contract Inquiry",
    nameFa: "استعلام قرارداد",
    category: "contract",
    categoryFa: "قرارداد",
  },
];

const bindings: ServiceProviderBinding[] = [
  {
    serviceId: "shahkar",
    organizationId: "cache",
    priority: 1,
    status: "active",
    isPrimary: true,
    isFallback: false,
    successCount: 482000,
    failedCount: 12000,
    timeoutCount: 3400,
    noResultCount: 1100,
    avgResponseMs: 42,
  },
  {
    serviceId: "shahkar",
    organizationId: "vandar",
    priority: 2,
    status: "active",
    isPrimary: false,
    isFallback: true,
    successCount: 128400,
    failedCount: 35200,
    timeoutCount: 8900,
    noResultCount: 4200,
    avgResponseMs: 890,
  },
  {
    serviceId: "shahkar",
    organizationId: "zohal",
    priority: 3,
    status: "inactive",
    isPrimary: false,
    isFallback: false,
    successCount: 0,
    failedCount: 0,
    timeoutCount: 0,
    noResultCount: 0,
    avgResponseMs: 0,
  },
  {
    serviceId: "identity",
    organizationId: "zohal",
    priority: 1,
    status: "active",
    isPrimary: true,
    isFallback: false,
    successCount: 96400,
    failedCount: 4200,
    timeoutCount: 1800,
    noResultCount: 900,
    avgResponseMs: 620,
  },
  {
    serviceId: "identity",
    organizationId: "vandar",
    priority: 2,
    status: "active",
    isPrimary: false,
    isFallback: true,
    successCount: 18200,
    failedCount: 3100,
    timeoutCount: 1400,
    noResultCount: 700,
    avgResponseMs: 980,
  },
  {
    serviceId: "postal",
    organizationId: "zohal",
    priority: 1,
    status: "active",
    isPrimary: true,
    isFallback: false,
    successCount: 54200,
    failedCount: 2800,
    timeoutCount: 900,
    noResultCount: 500,
    avgResponseMs: 710,
  },
  {
    serviceId: "postal",
    organizationId: "pgsb",
    priority: 2,
    status: "degraded",
    isPrimary: false,
    isFallback: true,
    successCount: 8400,
    failedCount: 4200,
    timeoutCount: 2100,
    noResultCount: 1100,
    avgResponseMs: 1540,
  },
  {
    serviceId: "kyc",
    organizationId: "pgsb",
    priority: 1,
    status: "degraded",
    isPrimary: true,
    isFallback: false,
    successCount: 22400,
    failedCount: 6800,
    timeoutCount: 3200,
    noResultCount: 1600,
    avgResponseMs: 1320,
  },
  {
    serviceId: "kyc",
    organizationId: "zadak",
    priority: 2,
    status: "inactive",
    isPrimary: false,
    isFallback: true,
    successCount: 0,
    failedCount: 0,
    timeoutCount: 0,
    noResultCount: 0,
    avgResponseMs: 0,
  },
  {
    serviceId: "pgsb_inquiry",
    organizationId: "pgsb",
    priority: 1,
    status: "degraded",
    isPrimary: true,
    isFallback: false,
    successCount: 18600,
    failedCount: 5400,
    timeoutCount: 2600,
    noResultCount: 1200,
    avgResponseMs: 1480,
  },
  {
    serviceId: "contract",
    organizationId: "cache",
    priority: 1,
    status: "active",
    isPrimary: true,
    isFallback: false,
    successCount: 31800,
    failedCount: 900,
    timeoutCount: 300,
    noResultCount: 120,
    avgResponseMs: 180,
  },
  {
    serviceId: "contract",
    organizationId: "zohal",
    priority: 2,
    status: "active",
    isPrimary: false,
    isFallback: true,
    successCount: 4200,
    failedCount: 600,
    timeoutCount: 200,
    noResultCount: 80,
    avgResponseMs: 540,
  },
];

function orgName(id: string): string {
  return organizations.find((o) => o.id === id)?.nameFa ?? id;
}

function orgStatus(id: string) {
  return organizations.find((o) => o.id === id)?.status ?? "inactive";
}

function successRate(success: number, failed: number, timeout: number, noResult: number) {
  const total = success + failed + timeout + noResult;
  if (total === 0) return 0;
  return (success / total) * 100;
}

function aggregateServiceStatus(providers: ServiceProviderBinding[]): "active" | "inactive" | "degraded" {
  const active = providers.filter((p) => p.status === "active");
  if (active.length === 0) return "inactive";
  if (providers.some((p) => p.status === "degraded")) return "degraded";
  return "active";
}

export function getMonitoringData(): MonitoringPayload {
  const serviceMatrix = services.map((service) => {
    const providers = bindings
      .filter((b) => b.serviceId === service.id)
      .sort((a, b) => a.priority - b.priority);

    const primary = providers.find((p) => p.isPrimary) ?? providers[0];
    const fallback = providers.find((p) => p.isFallback) ?? providers[1];

    const successCount = providers.reduce((sum, p) => sum + p.successCount, 0);
    const failedCount = providers.reduce((sum, p) => sum + p.failedCount, 0);
    const timeoutCount = providers.reduce((sum, p) => sum + p.timeoutCount, 0);
    const noResultCount = providers.reduce((sum, p) => sum + p.noResultCount, 0);
    const weightedMs = providers.reduce(
      (sum, p) => sum + p.avgResponseMs * (p.successCount + p.failedCount),
      0,
    );
    const weightTotal = providers.reduce(
      (sum, p) => sum + p.successCount + p.failedCount,
      0,
    );

    return {
      serviceId: service.id,
      serviceName: service.name,
      serviceNameFa: service.nameFa,
      category: service.category,
      categoryFa: service.categoryFa,
      activeOrganizations: providers.filter((p) => p.status === "active").length,
      totalOrganizations: providers.length,
      primaryProvider: primary?.organizationId ?? "-",
      primaryProviderFa: primary ? orgName(primary.organizationId) : "-",
      fallbackProvider: fallback?.organizationId ?? null,
      fallbackProviderFa: fallback ? orgName(fallback.organizationId) : null,
      status: aggregateServiceStatus(providers),
      successCount,
      failedCount,
      timeoutCount,
      noResultCount,
      successRate: successRate(successCount, failedCount, timeoutCount, noResultCount),
      avgResponseMs: weightTotal > 0 ? weightedMs / weightTotal : 0,
      providers: providers.map((p) => ({
        organizationId: p.organizationId,
        organizationNameFa: orgName(p.organizationId),
        priority: p.priority,
        status: p.status,
        successCount: p.successCount,
        failedCount: p.failedCount + p.timeoutCount + p.noResultCount,
        successRate: successRate(
          p.successCount,
          p.failedCount,
          p.timeoutCount,
          p.noResultCount,
        ),
      })),
    };
  });

  const orgPerformance = organizations.map((org) => {
    const orgBindings = bindings.filter((b) => b.organizationId === org.id);
    const successCount = orgBindings.reduce((sum, b) => sum + b.successCount, 0);
    const failedCount = orgBindings.reduce((sum, b) => sum + b.failedCount, 0);
    const timeoutCount = orgBindings.reduce((sum, b) => sum + b.timeoutCount, 0);
    const noResultCount = orgBindings.reduce((sum, b) => sum + b.noResultCount, 0);
    const avgPriority =
      orgBindings.length > 0
        ? orgBindings.reduce((sum, b) => sum + b.priority, 0) / orgBindings.length
        : 99;

    return {
      organizationId: org.id,
      organizationNameFa: org.nameFa,
      status: org.status,
      priorityRank: Math.round(avgPriority),
      servicesCount: orgBindings.length,
      successCount,
      failedCount,
      timeoutCount,
      noResultCount,
      successRate: successRate(successCount, failedCount, timeoutCount, noResultCount),
      avgResponseMs:
        orgBindings.length > 0
          ? orgBindings.reduce((sum, b) => sum + b.avgResponseMs, 0) / orgBindings.length
          : 0,
    };
  });

  const totalSuccess = serviceMatrix.reduce((sum, row) => sum + row.successCount, 0);
  const totalFailed = serviceMatrix.reduce((sum, row) => sum + row.failedCount, 0);
  const totalTimeout = serviceMatrix.reduce((sum, row) => sum + row.timeoutCount, 0);
  const totalNoResult = serviceMatrix.reduce((sum, row) => sum + row.noResultCount, 0);
  const totalInquiries = totalSuccess + totalFailed + totalTimeout + totalNoResult;

  const priorities = bindings
    .filter((b) => b.status !== "inactive")
    .sort((a, b) => a.priority - b.priority || a.serviceId.localeCompare(b.serviceId))
    .map((b) => {
      const service = services.find((s) => s.id === b.serviceId)!;
      return {
        serviceNameFa: service.nameFa,
        organizationNameFa: orgName(b.organizationId),
        priority: b.priority,
        status: b.status,
        successRate: successRate(
          b.successCount,
          b.failedCount,
          b.timeoutCount,
          b.noResultCount,
        ),
      };
    });

  const trend = [
    { date: "2026-08-16", label: "۱۶/۰۵", success: 168000, failed: 18200, timeout: 4200, noResult: 2100 },
    { date: "2026-08-17", label: "۱۷/۰۵", success: 172400, failed: 17600, timeout: 3900, noResult: 1900 },
    { date: "2026-08-18", label: "۱۸/۰۵", success: 181200, failed: 19400, timeout: 4500, noResult: 2300 },
    { date: "2026-08-19", label: "۱۹/۰۵", success: 176800, failed: 20100, timeout: 4800, noResult: 2400 },
    { date: "2026-08-20", label: "۲۰/۰۵", success: 184600, failed: 18800, timeout: 4100, noResult: 2100 },
    { date: "2026-08-21", label: "۲۱/۰۵", success: 190200, failed: 17200, timeout: 3600, noResult: 1800 },
    { date: "2026-08-22", label: "۲۲/۰۵", success: 195800, failed: 16400, timeout: 3300, noResult: 1600 },
  ];

  const peakHours = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    label: `${hour.toString().padStart(2, "0")}:۰۰`,
    count: Math.round(
      900 +
        Math.sin((hour - 10) / 3) * 420 +
        (hour >= 9 && hour <= 18 ? 680 : 120),
    ),
  }));

  const recentErrors = [
    {
      id: "err-1",
      timestamp: "۱۴۰۴/۰۵/۳۱ ۱۰:۴۲",
      serviceNameFa: "شاهکار",
      organizationNameFa: "وندار",
      message: "پاسخ نامعتبر از سرویس‌دهنده — کد ۵۰۲",
      status: "failed" as const,
    },
    {
      id: "err-2",
      timestamp: "۱۴۰۴/۰۵/۳۱ ۱۰:۳۸",
      serviceNameFa: "کد پستی",
      organizationNameFa: "PGSB",
      message: "timeout پس از ۳۰ ثانیه",
      status: "timeout" as const,
    },
    {
      id: "err-3",
      timestamp: "۱۴۰۴/۰۵/۳۱ ۱۰:۳۱",
      serviceNameFa: "احراز هویت KYC",
      organizationNameFa: "PGSB",
      message: "سرویس در حالت degraded — پاسخ ناقص",
      status: "no_result" as const,
    },
    {
      id: "err-4",
      timestamp: "۱۴۰۴/۰۵/۳۱ ۱۰:۱۸",
      serviceNameFa: "استعلام هویت",
      organizationNameFa: "وندار",
      message: "عدم تطابق کد ملی و موبایل",
      status: "failed" as const,
    },
  ];

  const categories: Array<ServiceDefinition["category"]> = [
    "identity",
    "address",
    "kyc",
    "contract",
  ];

  const serviceGroups = categories.map((category) => {
    const groupServices = services.filter((s) => s.category === category);
    const activeCount = groupServices.filter((service) => {
      const providers = bindings.filter((b) => b.serviceId === service.id);
      return providers.some((p) => p.status === "active");
    }).length;

    return {
      category,
      categoryFa: groupServices[0]?.categoryFa ?? category,
      services: groupServices.map((s) => s.nameFa),
      activeCount,
      totalCount: groupServices.length,
    };
  });

  return {
    summary: {
      totalInquiries,
      successCount: totalSuccess,
      failedCount: totalFailed,
      timeoutCount: totalTimeout,
      noResultCount: totalNoResult,
      successRate: successRate(totalSuccess, totalFailed, totalTimeout, totalNoResult),
      avgResponseMs: 842,
      inquiriesPerMinute: 1728,
      activeServices: serviceMatrix.filter((s) => s.status === "active").length,
      totalServices: serviceMatrix.length,
      activeOrganizations: organizations.filter((o) => o.status === "active").length,
      totalOrganizations: organizations.length,
      periodLabel: "۷ روز اخیر",
      deltas: {
        totalInquiries: 18.6,
        successRate: 2.4,
        avgResponseMs: 6.2,
        inquiriesPerMinute: -13.4,
      },
    },
    serviceMatrix,
    organizations: orgPerformance,
    priorities,
    trend,
    peakHours,
    recentErrors,
    serviceGroups,
    updatedAt: new Date().toISOString(),
  };
}
