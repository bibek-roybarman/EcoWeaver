'use client';

import { useEffect, useRef, useState } from 'react';
import { Tree } from '@/types';

interface EcoMapProps {
  trees: Tree[];
  center: { lat: number; lng: number };
  onTreeSelect?: (tree: Tree) => void;
  selectedTree?: Tree | null;
}

export default function EcoMap({ trees, center, onTreeSelect, selectedTree }: EcoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet dynamically (client-side only)
    if (typeof window !== 'undefined' && !mapRef.current) {
      import('leaflet').then((L) => {
        import('leaflet/dist/leaflet.css');

        if (mapContainerRef.current && !mapRef.current) {
          // Initialize map
          const map = L.map(mapContainerRef.current).setView([center.lat, center.lng], 16);

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(map);

          mapRef.current = map;
          setIsMapLoaded(true);

          // Add custom icon
          const customIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#16a34a" width="32" height="32">
                <circle cx="12" cy="12" r="8" fill="#16a34a" opacity="0.3"/>
                <circle cx="12" cy="12" r="4" fill="#16a34a"/>
              </svg>
            `),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          });

          const criticalIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" width="32" height="32">
                <circle cx="12" cy="12" r="8" fill="#dc2626" opacity="0.3"/>
                <circle cx="12" cy="12" r="4" fill="#dc2626"/>
                <circle cx="12" cy="12" r="2" fill="#ffffff"/>
              </svg>
            `),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          });

          // Add tree markers
          trees.forEach((tree) => {
            const marker = L.marker([tree.lat, tree.lng], {
              icon: tree.isCriticalNode ? criticalIcon : customIcon,
            }).addTo(map);

            marker.bindPopup(`
              <div style="font-family: system-ui, sans-serif;">
                <strong style="font-size: 14px;">${tree.treeNumber}</strong><br/>
                <span style="font-size: 12px; color: #666;">${tree.species}</span><br/>
                <span style="font-size: 11px; color: ${
                  tree.ecologicalValue === 'critical' ? '#dc2626' : '#16a34a'
                }; text-transform: uppercase; font-weight: 600;">
                  ${tree.ecologicalValue} Value
                </span>
              </div>
            `);

            marker.on('click', () => {
              onTreeSelect?.(tree);
            });

            markersRef.current.push(marker);
          });
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update marker styles when selected tree changes
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    import('leaflet').then((L) => {
      markersRef.current.forEach((marker, index) => {
        const tree = trees[index];
        const isSelected = selectedTree?.id === tree.id;

        if (isSelected) {
          marker.setIcon(
            L.icon({
              iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="40" height="40">
                  <circle cx="12" cy="12" r="10" fill="#2563eb" opacity="0.4"/>
                  <circle cx="12" cy="12" r="6" fill="#2563eb"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              iconSize: [40, 40],
              iconAnchor: [20, 20],
              popupAnchor: [0, -20],
            })
          );
        } else {
          const criticalIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" width="32" height="32">
                <circle cx="12" cy="12" r="8" fill="#dc2626" opacity="0.3"/>
                <circle cx="12" cy="12" r="4" fill="#dc2626"/>
                <circle cx="12" cy="12" r="2" fill="#ffffff"/>
              </svg>
            `),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          });

          const normalIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#16a34a" width="32" height="32">
                <circle cx="12" cy="12" r="8" fill="#16a34a" opacity="0.3"/>
                <circle cx="12" cy="12" r="4" fill="#16a34a"/>
              </svg>
            `),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          });

          marker.setIcon(tree.isCriticalNode ? criticalIcon : normalIcon);
        }
      });
    });
  }, [selectedTree, isMapLoaded, trees]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading ecological map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
