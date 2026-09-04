'use client';

import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About EcoWeaver AI
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              An AI-powered urban ecological planning platform that helps cities understand 
              how development affects canopy-dependent wildlife before construction happens.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              EcoWeaver AI exists to make urban development more ecologically intelligent. We believe that 
              cities can grow while preserving the hidden networks of life that exist within them.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By combining GIS, AI, and ecological network analysis, we help decision-makers understand 
              the consequences of infrastructure choices before they become permanent.
            </p>
          </div>
        </section>

        {/* Product Philosophy */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Product Philosophy
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌳</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Every tree is a node in a living network
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Urban forests aren&apos;t just collections of individual trees. They&apos;re interconnected 
                    ecosystems where each tree contributes to habitat connectivity, species movement, and 
                    ecological resilience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Fragmentation is invisible until it&apos;s permanent
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Traditional planning focuses on individual trees but misses the critical connections 
                    between them. By the time fragmentation is visible, it&apos;s often too late to reverse.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Simulate before you build
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    EcoWeaver lets planners test ecological scenarios in silico before construction begins, 
                    enabling evidence-based decisions that balance development with biodiversity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    AI translates ecology into action
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Complex ecological data becomes clear recommendations. Our AI explains impacts in plain 
                    language and suggests evidence-based interventions that stakeholders can actually implement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Who Uses EcoWeaver</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Urban Planners',
                  icon: '🏙️',
                  description: 'Assess ecological impacts during master planning and infrastructure design',
                },
                {
                  title: 'Municipal Governments',
                  icon: '🏛️',
                  description: 'Balance development goals with biodiversity preservation mandates',
                },
                {
                  title: 'Conservation Organizations',
                  icon: '🌿',
                  description: 'Protect wildlife corridors with data-driven advocacy and evidence',
                },
                {
                  title: 'Real Estate Developers',
                  icon: '🏗️',
                  description: 'Design ecologically sensitive projects that meet green building standards',
                },
                {
                  title: 'Architects',
                  icon: '📐',
                  description: 'Integrate ecological intelligence into site planning and design',
                },
                {
                  title: 'Researchers',
                  icon: '🔬',
                  description: 'Study urban biodiversity patterns and habitat connectivity dynamics',
                },
              ].map((useCase, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
                <span className="text-gray-700"><strong>GIS & Spatial Analysis:</strong> Leaflet, GeoJSON, spatial network modeling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-gray-700"><strong>AI & Machine Learning:</strong> OpenAI GPT for ecological analysis and recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                <span className="text-gray-700"><strong>Network Analysis:</strong> Graph-based connectivity modeling and simulation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg"></div>
                <span className="text-gray-700"><strong>Full-Stack Platform:</strong> Next.js, React, TypeScript, PostgreSQL, Drizzle ORM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Roadmap</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-green-50 border-l-4 border-green-600 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-2">✅ Current (MVP)</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Interactive ecological maps</li>
                  <li>• Tree database and connectivity analysis</li>
                  <li>• Habitat simulator with real-time impact calculation</li>
                  <li>• Nature&apos;s Domino visualization</li>
                  <li>• AI-powered recommendations</li>
                  <li>• Professional report generation</li>
                </ul>
              </div>

              <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-2">🚀 V2 (Next Release)</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Real satellite data integration</li>
                  <li>• Multi-city support</li>
                  <li>• Advanced species modeling</li>
                  <li>• Historical canopy change analysis</li>
                  <li>• Enhanced simulation engine</li>
                </ul>
              </div>

              <div className="p-6 bg-purple-50 border-l-4 border-purple-600 rounded-lg">
                <h3 className="text-lg font-bold text-purple-900 mb-2">🔮 V3 (Vision)</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• City-wide ecological digital twins</li>
                  <li>• Predictive development impact modeling</li>
                  <li>• Automated planning recommendations</li>
                  <li>• Real-time environmental sensor integration</li>
                  <li>• API for third-party planning tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 px-6 bg-gradient-to-br from-green-600 to-emerald-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              A digital ecological intelligence layer for every city on Earth — where development 
              decisions are informed by real-time biodiversity data, and where cities can grow 
              without breaking the living networks that sustain them.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Interested in using EcoWeaver AI for your city or project?
            </p>
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
