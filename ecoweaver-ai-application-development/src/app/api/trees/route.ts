import { NextResponse } from 'next/server';
import { db } from '@/db';
import { trees } from '@/db/schema';

export async function GET() {
  try {
    const allTrees = await db.select().from(trees);
    return NextResponse.json({ trees: allTrees });
  } catch (error) {
    console.error('Error fetching trees:', error);
    return NextResponse.json({ error: 'Failed to fetch trees' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [newTree] = await db.insert(trees).values(body).returning();
    return NextResponse.json({ tree: newTree }, { status: 201 });
  } catch (error) {
    console.error('Error creating tree:', error);
    return NextResponse.json({ error: 'Failed to create tree' }, { status: 500 });
  }
}
