import { NextResponse } from 'next/server';
import { db } from '@/db';
import { simulations, simulationActions, simulationResults } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create simulation
    const [simulation] = await db.insert(simulations).values({
      projectId: body.projectId,
      name: body.name,
      scenarioType: body.scenarioType,
      description: body.description,
      status: 'draft',
    }).returning();

    // Add actions if provided
    if (body.actions && body.actions.length > 0) {
      const actionsToInsert = body.actions.map((action: any) => ({
        simulationId: simulation.id,
        actionType: action.actionType,
        targetId: action.targetId,
        parameters: action.parameters,
        geometry: action.geometry,
      }));
      
      await db.insert(simulationActions).values(actionsToInsert);
    }

    return NextResponse.json({ simulation }, { status: 201 });
  } catch (error) {
    console.error('Error creating simulation:', error);
    return NextResponse.json({ error: 'Failed to create simulation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allSimulations = await db.select().from(simulations);
    return NextResponse.json({ simulations: allSimulations });
  } catch (error) {
    console.error('Error fetching simulations:', error);
    return NextResponse.json({ error: 'Failed to fetch simulations' }, { status: 500 });
  }
}
