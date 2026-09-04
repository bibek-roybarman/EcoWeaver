'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

interface DominoNode {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const dominoSequence: DominoNode[] = [
  {
    id: 1,
    title: 'Tree #21 Removed',
    description: 'A 74-year-old Rain Tree with 18.4m canopy is removed for infrastructure development.',
    icon: '🌳',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 2,
    title: 'Canopy Gap Created',
    description: '18.4 meters of continuous canopy coverage is lost, creating a physical barrier.',
    icon: '⚠️',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 3,
    title: 'Loris Movement Interrupted',
    description: 'Grey Slender Loris can no longer traverse the gap. Movement requires ground descent, exposing them to predators.',
    icon: '🦎',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 4,
    title: 'Corridor Connectivity Drops',
    description: 'The primary movement corridor loses 26% connectivity (82% → 56%), fragmenting the habitat.',
    icon: '📉',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 5,
    title: 'Habitat Becomes Fragmented',
    description: 'Connected forest patch splits into isolated segments, reducing effective habitat area.',
    icon: '🗺️',
    color: 'from-lime-500 to-lime-600',
  },
  {
    id: 6,
    title: 'Food & Movement Patterns Change',
    description: 'Species alter foraging routes, spending more energy traveling longer distances for resources.',
    icon: '🍃',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 7,
    title: 'Local Biodiversity Risk Increases',
    description: 'Isolated populations face reduced genetic diversity, increased inbreeding, and higher extinction risk.',
    icon: '⚡',
    color: 'from-emerald-500 to-emerald-600',
  },
];

export default function DominoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveStep(0);
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= dominoSequence.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      <Navigation />
      
      <div className="pt-16 min-h-screen">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Nature&apos;s Domino Effect
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Explore how one urban decision triggers a cascade of ecological consequences
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>{isPlaying ? 'Playing...' : 'Play Sequence'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Domino Sequence */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 opacity-30 hidden md:block"></div>

            {/* Nodes */}
            <div className="space-y-8">
              {dominoSequence.map((node, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;

                return (
                  <div
                    key={node.id}
                    className={`relative transition-all duration-1000 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-8'
                    }`}
                  >
                    <div className="flex items-center justify-center md:justify-start">
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                        <div
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                            isCurrent
                              ? 'bg-white border-white shadow-2xl scale-105'
                              : isActive
                              ? 'bg-white/90 border-white/50 shadow-lg'
                              : 'bg-white/20 border-white/20'
                          }`}
                        >
                          {/* Number Badge */}
                          <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${node.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {node.id}
                          </div>

                          {/* Icon */}
                          <div className="flex items-start space-x-4">
                            <div className="text-5xl">{node.icon}</div>
                            <div className="flex-1">
                              <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-gray-900' : 'text-white'}`}>
                                {node.title}
                              </h3>
                              <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-700' : 'text-white/70'}`}>
                                {node.description}
                              </p>
                            </div>
                          </div>

                          {/* Pulse Effect for Current */}
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-2xl bg-green-500/20 animate-ping"></div>
                          )}
                        </div>
                      </div>

                      {/* Center Dot (Desktop) */}
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-6 h-6 rounded-full transition-all duration-500 ${
                            isActive ? `bg-gradient-to-br ${node.color}` : 'bg-white/20'
                          } ${isCurrent ? 'ring-4 ring-white/50' : ''}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        {activeStep >= dominoSequence.length - 1 && !isPlaying && (
          <div className="max-w-4xl mx-auto px-6 pb-20">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Every Tree Changes an Ecosystem
              </h2>
              <p className="text-lg text-green-100 text-center mb-6">
                This cascade demonstrates how infrastructure decisions have far-reaching ecological consequences. 
                EcoWeaver AI helps decision-makers understand these impacts before they become irreversible.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  View Full Analysis
                </button>
                <button className="px-6 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
