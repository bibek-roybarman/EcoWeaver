import { pgTable, text, integer, serial, timestamp, real, jsonb, boolean, varchar } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  organization: varchar('organization', { length: 255 }),
  role: varchar('role', { length: 50 }), // urban_planner, government, conservationist, researcher, developer
  createdAt: timestamp('created_at').defaultNow(),
});

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }),
  description: text('description'),
  bounds: jsonb('bounds'), // GeoJSON bounds
  baselineConnectivity: real('baseline_connectivity'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Trees table
export const trees = pgTable('trees', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  treeNumber: varchar('tree_number', { length: 50 }),
  species: varchar('species', { length: 255 }),
  commonName: varchar('common_name', { length: 255 }),
  age: integer('age'),
  canopyRadius: real('canopy_radius'), // in meters
  height: real('height'), // in meters
  ecologicalValue: varchar('ecological_value', { length: 50 }), // low, medium, high, critical
  connectivityContribution: real('connectivity_contribution'), // percentage
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  status: varchar('status', { length: 50 }).default('active'), // active, removed, protected
  isCriticalNode: boolean('is_critical_node').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Species table
export const species = pgTable('species', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  commonName: varchar('common_name', { length: 255 }),
  scientificName: varchar('scientific_name', { length: 255 }),
  habitatType: varchar('habitat_type', { length: 100 }),
  canopyDependency: varchar('canopy_dependency', { length: 50 }), // high, medium, low
  sensitivity: varchar('sensitivity', { length: 50 }), // high, medium, low
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
});

// Tree-Species relationship (which species are supported by which trees)
export const treeSpecies = pgTable('tree_species', {
  id: serial('id').primaryKey(),
  treeId: integer('tree_id').references(() => trees.id),
  speciesId: integer('species_id').references(() => species.id),
});

// Corridors table
export const corridors = pgTable('corridors', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  name: varchar('name', { length: 255 }),
  speciesId: integer('species_id').references(() => species.id),
  connectivityScore: real('connectivity_score'), // 0-100
  length: real('length'), // in km
  criticalTreeCount: integer('critical_tree_count'),
  threatLevel: varchar('threat_level', { length: 50 }), // low, medium, high, critical
  potentialFragmentation: real('potential_fragmentation'), // percentage
  geometry: jsonb('geometry'), // GeoJSON LineString
  status: varchar('status', { length: 50 }).default('intact'), // intact, vulnerable, broken
  createdAt: timestamp('created_at').defaultNow(),
});

// Simulations table
export const simulations = pgTable('simulations', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  name: varchar('name', { length: 255 }).notNull(),
  scenarioType: varchar('scenario_type', { length: 100 }), // tree_removal, road_construction, restoration
  description: text('description'),
  status: varchar('status', { length: 50 }).default('draft'), // draft, complete, archived
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Simulation actions table
export const simulationActions = pgTable('simulation_actions', {
  id: serial('id').primaryKey(),
  simulationId: integer('simulation_id').references(() => simulations.id),
  actionType: varchar('action_type', { length: 50 }).notNull(), // remove_tree, add_tree, add_road, add_building, add_bridge, restore_habitat
  targetId: integer('target_id'), // reference to tree, building, etc.
  parameters: jsonb('parameters'), // additional parameters
  geometry: jsonb('geometry'), // GeoJSON if applicable
  createdAt: timestamp('created_at').defaultNow(),
});

// Simulation results table
export const simulationResults = pgTable('simulation_results', {
  id: serial('id').primaryKey(),
  simulationId: integer('simulation_id').references(() => simulations.id).notNull(),
  connectivityBefore: real('connectivity_before'),
  connectivityAfter: real('connectivity_after'),
  canopyBefore: real('canopy_before'),
  canopyAfter: real('canopy_after'),
  corridorsBefore: integer('corridors_before'),
  corridorsAfter: integer('corridors_after'),
  speciesAffected: integer('species_affected'),
  criticalNodesLost: integer('critical_nodes_lost'),
  riskScore: varchar('risk_score', { length: 50 }), // low, medium, high, critical
  impactSummary: text('impact_summary'),
  affectedCorridors: jsonb('affected_corridors'), // array of corridor IDs
  affectedSpecies: jsonb('affected_species'), // array of species IDs
  networkChanges: jsonb('network_changes'), // detailed network analysis
  calculatedAt: timestamp('calculated_at').defaultNow(),
});

// Reports table
export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  simulationId: integer('simulation_id').references(() => simulations.id),
  title: varchar('title', { length: 255 }),
  aiSummary: text('ai_summary'),
  recommendations: jsonb('recommendations'), // array of recommendation objects
  reportData: jsonb('report_data'), // full report content
  riskLevel: varchar('risk_level', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Infrastructure table (buildings, roads, etc.)
export const infrastructure = pgTable('infrastructure', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  type: varchar('type', { length: 50 }), // road, building, bridge
  name: varchar('name', { length: 255 }),
  geometry: jsonb('geometry'), // GeoJSON
  status: varchar('status', { length: 50 }).default('existing'), // existing, proposed, removed
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});
