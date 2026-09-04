import { Tree, Corridor, SimulationAction } from '@/types';

interface ConnectivityGraph {
  nodes: Set<number>;
  edges: Map<number, Set<number>>;
}

export class SimulationEngine {
  private trees: Tree[];
  private corridors: Corridor[];
  private maxCanopyDistance: number = 25; // meters - maximum distance for canopy connectivity

  constructor(trees: Tree[], corridors: Corridor[]) {
    this.trees = trees;
    this.corridors = corridors;
  }

  // Calculate distance between two points (Haversine formula)
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Build connectivity graph from active trees
  private buildConnectivityGraph(activeTrees: Tree[]): ConnectivityGraph {
    const graph: ConnectivityGraph = {
      nodes: new Set(),
      edges: new Map(),
    };

    // Add all trees as nodes
    activeTrees.forEach(tree => {
      graph.nodes.add(tree.id);
      graph.edges.set(tree.id, new Set());
    });

    // Connect trees within canopy distance
    for (let i = 0; i < activeTrees.length; i++) {
      for (let j = i + 1; j < activeTrees.length; j++) {
        const tree1 = activeTrees[i];
        const tree2 = activeTrees[j];
        
        const distance = this.calculateDistance(
          tree1.lat,
          tree1.lng,
          tree2.lat,
          tree2.lng
        );

        // If trees are within canopy reach, connect them
        const canopyReach = (tree1.canopyRadius || 0) + (tree2.canopyRadius || 0);
        if (distance <= Math.max(this.maxCanopyDistance, canopyReach)) {
          graph.edges.get(tree1.id)?.add(tree2.id);
          graph.edges.get(tree2.id)?.add(tree1.id);
        }
      }
    }

    return graph;
  }

  // Calculate connectivity score using graph metrics
  private calculateConnectivityScore(graph: ConnectivityGraph): number {
    if (graph.nodes.size === 0) return 0;

    // Calculate average degree (connections per node)
    let totalDegree = 0;
    graph.edges.forEach(connections => {
      totalDegree += connections.size;
    });
    const avgDegree = totalDegree / graph.nodes.size;

    // Calculate connected components
    const components = this.findConnectedComponents(graph);
    const largestComponent = Math.max(...components.map(c => c.size), 0);
    
    // Connectivity is based on:
    // 1. Average degree (how connected nodes are)
    // 2. Size of largest connected component (network coherence)
    const degreeScore = Math.min(avgDegree / 4, 1) * 50; // Up to 50%
    const componentScore = (largestComponent / graph.nodes.size) * 50; // Up to 50%

    return Math.min(degreeScore + componentScore, 100);
  }

  // Find connected components in the graph
  private findConnectedComponents(graph: ConnectivityGraph): Set<number>[] {
    const visited = new Set<number>();
    const components: Set<number>[] = [];

    const dfs = (node: number, component: Set<number>) => {
      visited.add(node);
      component.add(node);
      
      graph.edges.get(node)?.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor, component);
        }
      });
    };

    graph.nodes.forEach(node => {
      if (!visited.has(node)) {
        const component = new Set<number>();
        dfs(node, component);
        components.push(component);
      }
    });

    return components;
  }

  // Calculate canopy coverage percentage
  private calculateCanopyCoverage(trees: Tree[]): number {
    // Simplified calculation based on total canopy area
    const totalCanopyArea = trees.reduce((sum, tree) => {
      const radius = tree.canopyRadius || 5;
      return sum + Math.PI * radius * radius;
    }, 0);

    // Normalize to a percentage (assuming a reference area)
    const referenceArea = 1000000; // 1 km² in m²
    return Math.min((totalCanopyArea / referenceArea) * 100, 100);
  }

  // Count critical nodes in the network
  private countCriticalNodes(graph: ConnectivityGraph, trees: Tree[]): number {
    let criticalCount = 0;

    // A node is critical if removing it significantly fragments the network
    graph.nodes.forEach(nodeId => {
      const connections = graph.edges.get(nodeId)?.size || 0;
      const tree = trees.find(t => t.id === nodeId);
      
      // Consider it critical if it has many connections or is marked as critical
      if (connections >= 3 || tree?.isCriticalNode) {
        criticalCount++;
      }
    });

    return criticalCount;
  }

  // Simulate actions and return results
  simulate(actions: SimulationAction[]) {
    // Create a working copy of trees
    let workingTrees = [...this.trees];

    // Apply actions
    actions.forEach(action => {
      switch (action.actionType) {
        case 'remove_tree':
          workingTrees = workingTrees.filter(t => t.id !== action.targetId);
          break;
        case 'add_tree':
          // Add new tree (simplified - would need full tree data)
          if (action.parameters) {
            workingTrees.push(action.parameters as Tree);
          }
          break;
        // Add more action types as needed
      }
    });

    // Calculate before and after metrics
    const beforeGraph = this.buildConnectivityGraph(this.trees);
    const afterGraph = this.buildConnectivityGraph(workingTrees);

    const beforeConnectivity = this.calculateConnectivityScore(beforeGraph);
    const afterConnectivity = this.calculateConnectivityScore(afterGraph);

    const beforeCanopy = this.calculateCanopyCoverage(this.trees);
    const afterCanopy = this.calculateCanopyCoverage(workingTrees);

    const beforeCriticalNodes = this.countCriticalNodes(beforeGraph, this.trees);
    const afterCriticalNodes = this.countCriticalNodes(afterGraph, workingTrees);

    const beforeComponents = this.findConnectedComponents(beforeGraph);
    const afterComponents = this.findConnectedComponents(afterGraph);

    return {
      connectivityBefore: Math.round(beforeConnectivity),
      connectivityAfter: Math.round(afterConnectivity),
      canopyBefore: Math.round(beforeCanopy),
      canopyAfter: Math.round(afterCanopy),
      corridorsBefore: beforeComponents.length,
      corridorsAfter: afterComponents.length,
      criticalNodesLost: beforeCriticalNodes - afterCriticalNodes,
      affectedTrees: this.trees.length - workingTrees.length,
      networkChanges: {
        beforeComponents: beforeComponents.map(c => Array.from(c)),
        afterComponents: afterComponents.map(c => Array.from(c)),
      },
    };
  }
}
