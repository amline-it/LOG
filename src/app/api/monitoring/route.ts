import { NextResponse } from "next/server";

import { getMonitoringData } from "@/lib/data/monitoring-store";

export async function GET() {
  return NextResponse.json(getMonitoringData());
}
