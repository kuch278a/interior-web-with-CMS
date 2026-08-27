import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { CMSStore } from "../../../../cms/types";

export const dynamic = "force-static";

const DATA_PATH = path.join(process.cwd(), "cms", "data", "store.json");

function readStore(): CMSStore | null {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as CMSStore;
  } catch {
    return null;
  }
}

function writeStore(data: CMSStore): boolean {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const data = readStore();
  if (!data) {
    return NextResponse.json({ error: "Failed to read store" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CMSStore>;
    const current = readStore();

    if (!current) {
      return NextResponse.json({ error: "Store not initialized" }, { status: 500 });
    }

    // Support partial updates or full store updates
    const updated: CMSStore = {
      ...current,
      ...body,
    };

    const success = writeStore(updated);
    if (!success) {
      return NextResponse.json({ error: "Failed to write store" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
