'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [connectivity, setConnectivity] = useState(0);
  const [criticalNodes, setCriticalNodes] = useState(0);
  const [brokenCorridors, setBrokenCorridors] = useState(0);

  // Animate counters on mount
  useEffect(() => {
    const animateValue = (setter: (v: number) => void, end: number, duration: number) => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setConnectivity, 82, 2000);
    animateValue(setCriticalNodes, 14, 1500);
    animateValue(setBrokenCorridors, 3, 1800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              See what happens
              <br />
              <span className="text-green-700">before the city changes.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EcoWeaver AI models urban ecological connectivity so planners can understand 
              the consequences of development before construction begins.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link 
                href="/map"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Explore EcoWeaver
              </Link>
              <Link 
                href="/simulator"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-green-700 font-semibold rounded-lg border-2 border-green-600 transition-all"
              >
                Run a Simulation
              </Link>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="mt-20 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-green-600">{connectivity}%</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Current Habitat Connectivity
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-blue-600">{criticalNodes}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Critical Ecological Nodes
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-orange-600">{brokenCorridors}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Broken Corridors Detected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Don&apos;t just map the city.
              <br />
              <span className="text-green-700">Understand the ecosystem living inside it.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Interactive Ecological Maps</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize urban canopy networks, wildlife corridors, and habitat connectivity 
                in real-time. See how trees, species, and ecosystems are interconnected.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Live Habitat Simulation</h3>
              <p className="text-gray-600 leading-relaxed">
                Remove a tree, build a road, or plan infrastructure. Watch ecological 
                connectivity change in real-time before decisions become permanent.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI Ecological Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI explains ecological consequences in plain language and 
                recommends evidence-based interventions to preserve biodiversity.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Impact Report Cards</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate professional ecological impact reports that combine scientific 
                analysis with clear recommendations for stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ready to see it in action?
          </h2>
          <p className="text-xl text-green-100">
            Experience the complete Cubbon Park simulation workflow
          </p>
          <Link 
            href="/simulator?demo=cubbon-park"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-green-700 font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Launch Demo — Cubbon Park
          </Link>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Built for Urban Decision Makers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Urban Planners',
                description: 'Assess ecological impacts before finalizing infrastructure decisions',
              },
              {
                title: 'Conservation NGOs',
                description: 'Protect wildlife corridors with data-driven evidence',
              },
              {
                title: 'Municipal Governments',
                description: 'Balance development with biodiversity preservation',
              },
              {
                title: 'Real Estate Developers',
                description: 'Design ecologically sensitive construction projects',
              },
              {
                title: 'Architects',
                description: 'Integrate ecological intelligence into building design',
              },
              {
                title: 'Researchers',
                description: 'Study urban biodiversity patterns and trends',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EW</span>
            </div>
            <span className="font-bold text-xl text-white">EcoWeaver AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            Making cities smarter, more informed, and more ecological.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2024 EcoWeaver AI. Demo platform for ecological impact assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}
