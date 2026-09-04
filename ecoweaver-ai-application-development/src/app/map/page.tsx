'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import EcoMap from '@/components/EcoMap';
import { demoTrees, demoSpecies } from '@/lib/demo-data';
import { Tree, Species } from '@/types';
import { getEcologicalValueColor } from '@/lib/utils';

export default function MapPage() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [showLayers, setShowLayers] = useState(true);

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree);
  };

  // Get species for the selected tree (simplified for demo)
  const getTreeSpecies = (tree: Tree): Species[] => {
    // For demo, assign species based on tree properties
    if (tree.ecologicalValue === 'critical') {
      return demoSpecies.slice(0, 3);
    } else if (tree.ecologicalValue === 'high') {
      return demoSpecies.slice(0, 2);
    }
    return [demoSpecies[2]];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Eco Map</h1>
              <p className="text-sm text-gray-600">Cubbon Park, Bengaluru</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLayers(!showLayers)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {showLayers ? 'Hide' : 'Show'} Layers
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-900">
                  {demoTrees.length} Trees Monitored
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map */}
          <div className="flex-1 relative">
            <EcoMap
              trees={demoTrees}
              center={{ lat: 12.9762, lng: 77.5929 }}
              onTreeSelect={handleTreeSelect}
              selectedTree={selectedTree}
            />

            {/* Legend */}
            {showLayers && (
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <h3 className="font-semibold text-gray-900 mb-3">Map Layers</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Active Trees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Critical Nodes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Selected Tree</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Ecological Value
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Critical</span>
                      <span className="font-semibold text-red-600">
                        {demoTrees.filter(t => t.ecologicalValue === 'critical').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">High</span>
                      <span className="font-semibold text-orange-600">
                        {demoTrees.filter(t => t.ecologicalValue === 'high').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Medium</span>
                      <span className="font-semibold text-yellow-600">
                        {demoTrees.filter(t => t.ecologicalValue === 'medium').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tree Information Panel */}
          {selectedTree && (
            <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTree.treeNumber}</h2>
                    <p className="text-sm text-gray-500 mt-1">Individual Tree Analysis</p>
                  </div>
                  <button
                    onClick={() => setSelectedTree(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Basic Info */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Species</div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">{selectedTree.species}</div>
                    <div className="text-sm text-gray-600">{selectedTree.commonName}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Age</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">~{selectedTree.age} years</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Canopy</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">{selectedTree.canopyRadius} m</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ecological Value</div>
                    <div className={`text-lg font-semibold mt-1 ${getEcologicalValueColor(selectedTree.ecologicalValue || '')}`}>
                      {selectedTree.ecologicalValue?.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Connectivity Contribution</div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-3xl font-bold text-green-600">+{selectedTree.connectivityContribution}%</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {selectedTree.isCriticalNode && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-red-900 text-sm">Critical Ecological Node</span>
                    </div>
                  </div>
                )}

                {/* Species Supported */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Species Supported</h3>
                  <div className="space-y-2">
                    {getTreeSpecies(selectedTree).map((species) => (
                      <div key={species.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">🦎</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{species.commonName}</div>
                          <div className="text-xs text-gray-500">{species.scientificName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why This Tree Matters */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Why This Tree Matters</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    This {selectedTree.species} serves as a key connectivity node in the canopy network, 
                    supporting critical movement corridors for canopy-dependent species. Its {selectedTree.canopyRadius}m 
                    canopy radius provides essential coverage for wildlife passage.
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                    Simulate Removal
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                    Protect Tree
                  </button>
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Explore Ecological Impact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
