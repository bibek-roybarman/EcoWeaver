'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { demoTrees, demoCorridor, demoSpecies } from '@/lib/demo-data';

export default function CanopyGuardianPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const connectivity = 82;
  const canopyCoverage = 74;
  const criticalNodes = demoTrees.filter(t => t.isCriticalNode).length;
  const vulnerableCorridors = 6;
  const highRiskZones = 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Canopy Guardian</h1>
            <p className="text-gray-600">Real-time ecological monitoring and corridor protection for Cubbon Park</p>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{canopyCoverage}%</div>
              <div className="text-sm font-medium text-gray-500">Canopy Coverage</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{connectivity}%</div>
              <div className="text-sm font-medium text-gray-500">Habitat Connectivity</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{criticalNodes}</div>
              <div className="text-sm font-medium text-gray-500">Critical Nodes</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{vulnerableCorridors}</div>
              <div className="text-sm font-medium text-gray-500">Vulnerable Corridors</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">{highRiskZones}</div>
              <div className="text-sm font-medium text-gray-500">High-Risk Development Zones</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Corridors</h2>
            <div className="flex flex-wrap gap-2">
              {['all', 'critical', 'vulnerable', 'intact'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedFilter === filter
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Corridor Analysis */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Wildlife Corridors</h2>

            {/* Featured Corridor */}
            <div className="bg-white rounded-xl border-2 border-orange-300 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">HIGH THREAT DETECTED</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {demoCorridor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Primary movement corridor for {demoSpecies[0].commonName}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-orange-100 text-orange-900 font-semibold text-sm rounded-lg">
                    {demoCorridor.threatLevel?.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Connectivity</div>
                    <div className="text-2xl font-bold text-green-600">{demoCorridor.connectivityScore}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Length</div>
                    <div className="text-2xl font-bold text-gray-900">{demoCorridor.length} km</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Critical Trees</div>
                    <div className="text-2xl font-bold text-gray-900">{demoCorridor.criticalTreeCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Fragmentation Risk</div>
                    <div className="text-2xl font-bold text-red-600">{demoCorridor.potentialFragmentation}%</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Vulnerability Assessment</h4>
                  <p className="text-sm text-yellow-800">
                    This corridor faces significant fragmentation risk due to proposed infrastructure development. 
                    Loss of 2-3 critical trees would reduce connectivity below the minimum viable threshold for species movement.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                    View on Map
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Simulate Impact
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                    Protection Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Corridors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Indian Giant Squirrel Corridor', connectivity: 76, status: 'vulnerable', trees: 18 },
                { name: 'Bird Migration Route', connectivity: 88, status: 'intact', trees: 31 },
                { name: 'Pollinator Pathway', connectivity: 91, status: 'intact', trees: 42 },
                { name: 'Bat Movement Corridor', connectivity: 68, status: 'vulnerable', trees: 15 },
              ].map((corridor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{corridor.name}</h3>
                    <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      corridor.status === 'intact' ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'
                    }`}>
                      {corridor.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500">Connectivity</div>
                      <div className="text-xl font-bold text-gray-900">{corridor.connectivity}%</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Critical Trees</div>
                      <div className="text-xl font-bold text-gray-900">{corridor.trees}</div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
