'use client';

import Navigation from '@/components/Navigation';

export default function ReportsPage() {
  const sampleReport = {
    id: 1,
    title: 'Tree #21 Removal Impact Assessment',
    scenario: 'Removal of Tree #21',
    location: 'Cubbon Park, Bengaluru',
    date: '2024-01-20',
    overallImpact: 'HIGH',
    connectivityBefore: 82,
    connectivityAfter: 56,
    canopyBefore: 74,
    canopyAfter: 68,
    corridorsAffected: 2,
    speciesAffected: 4,
    criticalNodesLost: 1,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ecological Reports</h1>
            <p className="text-gray-600">Professional impact assessments and recommendations</p>
          </div>
        </div>

        {/* Report Card */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-100 text-sm font-medium mb-1">ECOWEAVER AI</div>
                  <h1 className="text-2xl font-bold text-white">Ecological Impact Report</h1>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">EW</span>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-8 space-y-8">
              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Scenario</div>
                  <div className="text-sm font-semibold text-gray-900">{sampleReport.scenario}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location</div>
                  <div className="text-sm font-semibold text-gray-900">{sampleReport.location}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Date</div>
                  <div className="text-sm font-semibold text-gray-900">{sampleReport.date}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Overall Impact</div>
                  <div className="px-3 py-1 bg-red-100 text-red-900 font-bold text-sm rounded-lg inline-block">
                    🔴 {sampleReport.overallImpact}
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Impact Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Habitat Connectivity</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-400">{sampleReport.connectivityBefore}%</span>
                      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-2xl font-bold text-red-600">{sampleReport.connectivityAfter}%</span>
                    </div>
                    <div className="text-sm text-red-600 font-semibold mt-2">
                      -{sampleReport.connectivityBefore - sampleReport.connectivityAfter}% Loss
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Canopy Coverage</div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-400">{sampleReport.canopyBefore}%</span>
                      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-2xl font-bold text-orange-600">{sampleReport.canopyAfter}%</span>
                    </div>
                    <div className="text-sm text-orange-600 font-semibold mt-2">
                      -{sampleReport.canopyBefore - sampleReport.canopyAfter}% Loss
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{sampleReport.corridorsAffected}</div>
                    <div className="text-xs text-gray-600 mt-1">Corridors Affected</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{sampleReport.speciesAffected}</div>
                    <div className="text-xs text-gray-600 mt-1">Species Affected</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{sampleReport.criticalNodesLost}</div>
                    <div className="text-xs text-gray-600 mt-1">Critical Nodes Lost</div>
                  </div>
                </div>
              </div>

              {/* Ecological Domino */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ecological Domino Effect</h2>
                <div className="space-y-3">
                  {[
                    'Tree Removal',
                    'Canopy Fragmentation',
                    'Corridor Disruption',
                    'Species Movement Risk'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-900">{step}</div>
                      </div>
                      {index < 3 && (
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-blue-900 mb-3">AI Recommendation</h2>
                    <div className="text-blue-900 font-semibold text-lg mb-2">PRESERVE TREE #21</div>
                    <p className="text-sm text-blue-800 leading-relaxed mb-4">
                      Removing Tree #21 creates a critical break in the existing canopy network. The resulting fragmentation 
                      significantly reduces movement continuity for canopy-dependent species such as the Grey Slender Loris. 
                      This 74-year-old Rain Tree serves as a key connectivity node with a contribution of +12% to overall 
                      network coherence.
                    </p>
                    <div className="text-sm font-semibold text-blue-900 mb-2">Alternative Mitigation Strategies:</div>
                    <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                      <li>Plant 8-12 native canopy trees to create alternative connectivity pathways</li>
                      <li>Install a canopy bridge structure to maintain wildlife movement across the gap</li>
                      <li>Modify development footprint to avoid the critical ecological node</li>
                      <li>Implement phased restoration with temporary corridor support</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Data Sources & Confidence */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Tree inventory database (2024)</li>
                      <li>• Species habitat mapping</li>
                      <li>• Network connectivity analysis</li>
                      <li>• AI ecological modeling</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Limitations</h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Based on demo/synthetic data</li>
                      <li>• Simplified ecological model</li>
                      <li>• Requires field validation</li>
                      <li>• Seasonal variations not included</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                  Download PDF Report
                </button>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Share Report
                </button>
                <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors">
                  Create New Scenario
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div>Report ID: ECO-{sampleReport.id.toString().padStart(6, '0')}</div>
                <div>Generated by EcoWeaver AI • {sampleReport.date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
