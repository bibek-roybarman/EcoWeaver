'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import EcoMap from '@/components/EcoMap';
import { demoTrees, demoProject } from '@/lib/demo-data';
import { Tree, SimulationAction } from '@/types';
import { SimulationEngine } from '@/lib/simulation-engine';
import { getRiskColor } from '@/lib/utils';

function SimulatorContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams?.get('demo') === 'cubbon-park';

  const [trees, setTrees] = useState<Tree[]>(demoTrees);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [actions, setActions] = useState<SimulationAction[]>([]);
  const [results, setResults] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Auto-select Tree #21 in demo mode
    if (isDemo) {
      const tree21 = demoTrees.find(t => t.treeNumber === 'TREE-021');
      if (tree21) {
        setSelectedTree(tree21);
      }
    }
  }, [isDemo]);

  const handleRemoveTree = () => {
    if (!selectedTree) return;

    setIsSimulating(true);

    // Create action
    const action: SimulationAction = {
      id: Date.now(),
      simulationId: null,
      actionType: 'remove_tree',
      targetId: selectedTree.id,
      parameters: null,
      geometry: null,
    };

    setActions([...actions, action]);

    // Run simulation
    setTimeout(() => {
      const engine = new SimulationEngine(demoTrees, []);
      const simulationResults = engine.simulate([action]);
      
      setResults(simulationResults);
      setSimulationActive(true);
      
      // Update tree status
      setTrees(trees.map(t => 
        t.id === selectedTree.id ? { ...t, status: 'removed' } : t
      ));

      setIsSimulating(false);
    }, 1500);
  };

  const handleReset = () => {
    setTrees(demoTrees);
    setActions([]);
    setResults(null);
    setSimulationActive(false);
    setSelectedTree(null);
  };

  const activeTrees = trees.filter(t => t.status !== 'removed');

  // Determine risk level
  const getRiskLevel = () => {
    if (!results) return 'low';
    const loss = results.connectivityBefore - results.connectivityAfter;
    if (loss >= 20) return 'critical';
    if (loss >= 10) return 'high';
    if (loss >= 5) return 'medium';
    return 'low';
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habitat Simulator</h1>
              <p className="text-sm text-gray-600">
                {simulationActive ? 'Simulation: Tree #21 Removal' : 'Interactive Ecological Simulation'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {simulationActive && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Reset Simulation
                </button>
              )}
              {isDemo && !simulationActive && (
                <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">🎬 Demo Mode Active</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map */}
          <div className="flex-1 relative">
            <EcoMap
              trees={activeTrees}
              center={{ lat: 12.9762, lng: 77.5929 }}
              onTreeSelect={setSelectedTree}
              selectedTree={selectedTree}
            />

            {/* Simulation Overlay */}
            {simulationActive && results && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 border-2 border-red-500">
                <div className="text-center space-y-4">
                  <div className={`inline-block px-4 py-2 rounded-lg ${
                    riskLevel === 'critical' ? 'bg-red-100 text-red-900' :
                    riskLevel === 'high' ? 'bg-orange-100 text-orange-900' :
                    riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-900' :
                    'bg-green-100 text-green-900'
                  }`}>
                    <span className="font-bold text-sm uppercase tracking-wide">
                      {riskLevel} Risk
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Ecological Impact Detected
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500 mb-2">Habitat Connectivity</div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-3xl font-bold text-gray-400">{results.connectivityBefore}%</span>
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-3xl font-bold text-red-600">{results.connectivityAfter}%</span>
                      </div>
                      <div className="text-sm text-red-600 font-semibold mt-1">
                        -{results.connectivityBefore - results.connectivityAfter}% Loss
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500 mb-2">Canopy Coverage</div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-3xl font-bold text-gray-400">{results.canopyBefore}%</span>
                        <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-3xl font-bold text-orange-600">{results.canopyAfter}%</span>
                      </div>
                      <div className="text-sm text-orange-600 font-semibold mt-1">
                        -{results.canopyBefore - results.canopyAfter}% Loss
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Corridors</div>
                        <div className="font-bold text-gray-900">{results.corridorsAfter} / {results.corridorsBefore}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Critical Nodes Lost</div>
                        <div className="font-bold text-red-600">{results.criticalNodesLost}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Trees Affected</div>
                        <div className="font-bold text-gray-900">{results.affectedTrees}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isSimulating && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-gray-900">Calculating ecological impact...</p>
                  <p className="text-sm text-gray-600 mt-2">Analyzing network connectivity</p>
                </div>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Simulation Controls</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {simulationActive ? 'Simulation in progress' : 'Select a tree and choose an action'}
                </p>
              </div>

              {selectedTree && !simulationActive && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm font-semibold text-blue-900 mb-1">Selected</div>
                    <div className="text-lg font-bold text-blue-900">{selectedTree.treeNumber}</div>
                    <div className="text-sm text-blue-700">{selectedTree.species}</div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={handleRemoveTree}
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Simulate Tree Removal</span>
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
                        Add Infrastructure (Coming Soon)
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
                        Add Canopy Bridge (Coming Soon)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!selectedTree && !simulationActive && (
                <div className="text-center p-8 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-sm">Click a tree on the map to start simulating</p>
                </div>
              )}

              {simulationActive && results && (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-red-900 mb-2">⚠️ Grey Slender Loris Corridor</h3>
                    <p className="text-sm text-red-800">
                      Critical movement corridor has been fragmented. Canopy connectivity reduced by {results.connectivityBefore - results.connectivityAfter}%.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h3>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                        View Nature&apos;s Domino Effect
                      </button>
                      <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                        Get AI Recommendations
                      </button>
                      <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                        Generate Report Card
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Instructions */}
              {isDemo && !simulationActive && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-green-900 mb-2">🎬 Demo Instructions</h3>
                  <ol className="text-sm text-green-800 space-y-2 list-decimal list-inside">
                    <li>Tree #21 is already selected</li>
                    <li>Click &quot;Simulate Tree Removal&quot;</li>
                    <li>Watch connectivity drop from 82% → 56%</li>
                    <li>Observe the broken corridor</li>
                    <li>Explore AI recommendations</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading simulator...</p>
        </div>
      </div>
    }>
      <SimulatorContent />
    </Suspense>
  );
}
