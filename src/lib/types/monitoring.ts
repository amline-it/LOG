export type InquiryStatus = "success" | "failed" | "timeout" | "no_result";

export type ProviderStatus = "active" | "inactive" | "degraded";

export type ServiceCategory =
  | "identity"
  | "address"
  | "kyc"
  | "contract";

export interface Organization {
  id: string;
  name: string;
  nameFa: string;
  status: ProviderStatus;
  description?: string;
}

export interface ServiceDefinition {
  id: string;
  name: string;
  nameFa: string;
  category: ServiceCategory;
  categoryFa: string;
}

export interface ServiceProviderBinding {
  serviceId: string;
  organizationId: string;
  priority: number;
  status: ProviderStatus;
  isPrimary: boolean;
  isFallback: boolean;
  successCount: number;
  failedCount: number;
  timeoutCount: number;
  noResultCount: number;
  avgResponseMs: number;
  lastResponseAt?: string;
}

export interface ServiceMatrixRow {
  serviceId: string;
  serviceName: string;
  serviceNameFa: string;
  category: ServiceCategory;
  categoryFa: string;
  activeOrganizations: number;
  totalOrganizations: number;
  primaryProvider: string;
  primaryProviderFa: string;
  fallbackProvider: string | null;
  fallbackProviderFa: string | null;
  status: ProviderStatus;
  successCount: number;
  failedCount: number;
  timeoutCount: number;
  noResultCount: number;
  successRate: number;
  avgResponseMs: number;
  providers: Array<{
    organizationId: string;
    organizationNameFa: string;
    priority: number;
    status: ProviderStatus;
    successCount: number;
    failedCount: number;
    successRate: number;
  }>;
}

export interface OrganizationPerformanceRow {
  organizationId: string;
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
}

export interface MonitoringSummary {
  totalInquiries: number;
  successCount: number;
  failedCount: number;
  timeoutCount: number;
  noResultCount: number;
  successRate: number;
  avgResponseMs: number;
  inquiriesPerMinute: number;
  activeServices: number;
  totalServices: number;
  activeOrganizations: number;
  totalOrganizations: number;
  periodLabel: string;
  deltas: {
    totalInquiries: number;
    successRate: number;
    avgResponseMs: number;
    inquiriesPerMinute: number;
  };
}

export interface TrendPoint {
  date: string;
  label: string;
  success: number;
  failed: number;
  timeout: number;
  noResult: number;
}

export interface PeakHourPoint {
  hour: number;
  label: string;
  count: number;
}

export interface RecentError {
  id: string;
  timestamp: string;
  serviceNameFa: string;
  organizationNameFa: string;
  message: string;
  status: Exclude<InquiryStatus, "success">;
}

export interface PriorityItem {
  serviceNameFa: string;
  organizationNameFa: string;
  priority: number;
  status: ProviderStatus;
  successRate: number;
}

export interface MonitoringPayload {
  summary: MonitoringSummary;
  serviceMatrix: ServiceMatrixRow[];
  organizations: OrganizationPerformanceRow[];
  priorities: PriorityItem[];
  trend: TrendPoint[];
  peakHours: PeakHourPoint[];
  recentErrors: RecentError[];
  serviceGroups: Array<{
    category: ServiceCategory;
    categoryFa: string;
    services: string[];
    activeCount: number;
    totalCount: number;
  }>;
  updatedAt: string;
}
