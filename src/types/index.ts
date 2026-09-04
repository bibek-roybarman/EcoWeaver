export interface Tree {
  id: number;
  projectId: number | null;
  treeNumber: string | null;
  species: string | null;
  commonName: string | null;
  age: number | null;
  canopyRadius: number | null;
  height: number | null;
  ecologicalValue: string | null;
  connectivityContribution: number | null;
  lat: number;
  lng: number;
  status: string | null;
  isCriticalNode: boolean | null;
  metadata: any;
  supportedSpecies?: Species[];
}

export interface Species {
  id: number;
  name: string;
  commonName: string | null;
  scientificName: string | null;
  habitatType: string | null;
  canopyDependency: string | null;
  sensitivity: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface Corridor {
  id: number;
  projectId: number | null;
  name: string | null;
  speciesId: number | null;
  connectivityScore: number | null;
  length: number | null;
  criticalTreeCount: number | null;
  threatLevel: string | null;
  potentialFragmentation: number | null;
  geometry: any;
  status: string | null;
  species?: Species;
}

export interface Project {
  id: number;
  userId: number | null;
  name: string;
  location: string | null;
  description: string | null;
  bounds: any;
  baselineConnectivity: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Simulation {
  id: number;
  projectId: number | null;
  name: string;
  scenarioType: string | null;
  description: string | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface SimulationAction {
  id: number;
  simulationId: number | null;
  actionType: string;
  targetId: number | null;
  parameters: any;
  geometry: any;
}

export interface SimulationResult {
  id: number;
  simulationId: number;
  connectivityBefore: number | null;
  connectivityAfter: number | null;
  canopyBefore: number | null;
  canopyAfter: number | null;
  corridorsBefore: number | null;
  corridorsAfter: number | null;
  speciesAffected: number | null;
  criticalNodesLost: number | null;
  riskScore: string | null;
  impactSummary: string | null;
  affectedCorridors: any;
  affectedSpecies: any;
  networkChanges: any;
}

export interface Report {
  id: number;
  simulationId: number | null;
  title: string | null;
  aiSummary: string | null;
  recommendations: any;
  reportData: any;
  riskLevel: string | null;
  createdAt: Date | null;
}

export interface NetworkNode {
  id: string;
  type: 'tree' | 'species' | 'corridor' | 'habitat';
  label: string;
  data: any;
  position?: { x: number; y: number };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  style?: any;
}
