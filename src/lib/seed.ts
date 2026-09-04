import { db } from '@/db';
import { 
  users, 
  projects, 
  trees, 
  species, 
  treeSpecies, 
  corridors 
} from '@/db/schema';
import { demoTrees, demoSpecies, demoCorridor, demoProject } from './demo-data';

export async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Create a demo user
    const [user] = await db.insert(users).values({
      email: 'demo@ecoweaver.ai',
      name: 'Demo User',
      organization: 'EcoWeaver AI',
      role: 'urban_planner',
    }).returning();

    console.log('Created demo user');

    // Create demo project
    const [project] = await db.insert(projects).values({
      userId: user.id,
      name: demoProject.name,
      location: demoProject.location,
      description: demoProject.description,
      bounds: demoProject.bounds,
      baselineConnectivity: demoProject.baselineConnectivity,
    }).returning();

    console.log('Created demo project');

    // Insert species
    const insertedSpecies = await db.insert(species).values(
      demoSpecies.map(s => ({
        name: s.name,
        commonName: s.commonName,
        scientificName: s.scientificName,
        habitatType: s.habitatType,
        canopyDependency: s.canopyDependency,
        sensitivity: s.sensitivity,
        description: s.description,
        imageUrl: s.imageUrl,
      }))
    ).returning();

    console.log('Inserted species');

    // Insert trees
    const insertedTrees = await db.insert(trees).values(
      demoTrees.map(t => ({
        projectId: project.id,
        treeNumber: t.treeNumber,
        species: t.species,
        commonName: t.commonName,
        age: t.age,
        canopyRadius: t.canopyRadius,
        height: t.height,
        ecologicalValue: t.ecologicalValue,
        connectivityContribution: t.connectivityContribution,
        lat: t.lat,
        lng: t.lng,
        status: t.status,
        isCriticalNode: t.isCriticalNode,
        metadata: t.metadata,
      }))
    ).returning();

    console.log('Inserted trees');

    // Create tree-species relationships (simplified - assign species to critical/high value trees)
    const treeSpeciesData = [];
    for (const tree of insertedTrees) {
      if (tree.ecologicalValue === 'critical') {
        // Assign multiple species to critical trees
        for (let i = 0; i < 3; i++) {
          treeSpeciesData.push({
            treeId: tree.id,
            speciesId: insertedSpecies[i].id,
          });
        }
      } else if (tree.ecologicalValue === 'high') {
        // Assign 1-2 species to high value trees
        treeSpeciesData.push({
          treeId: tree.id,
          speciesId: insertedSpecies[0].id,
        });
      }
    }

    if (treeSpeciesData.length > 0) {
      await db.insert(treeSpecies).values(treeSpeciesData);
      console.log('Created tree-species relationships');
    }

    // Insert corridor
    await db.insert(corridors).values({
      projectId: project.id,
      name: demoCorridor.name,
      speciesId: insertedSpecies[0].id, // Grey Slender Loris
      connectivityScore: demoCorridor.connectivityScore,
      length: demoCorridor.length,
      criticalTreeCount: demoCorridor.criticalTreeCount,
      threatLevel: demoCorridor.threatLevel,
      potentialFragmentation: demoCorridor.potentialFragmentation,
      geometry: demoCorridor.geometry,
      status: demoCorridor.status,
    });

    console.log('Inserted corridor');
    console.log('Database seed completed successfully!');

    return { success: true, projectId: project.id };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
