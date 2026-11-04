"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface LiveMapProps {
  pickupCoords?: [number, number]; // [lat, lng]
  dropoffCoords?: [number, number];
  driverCoords?: [number, number];
  routeCoords?: [number, number][];
  className?: string;
  zoom?: number;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  pickupCoords = [12.9716, 77.5946], // Default Bengaluru
  dropoffCoords,
  driverCoords,
  routeCoords,
  className = "h-[400px] w-full rounded-2xl",
  zoom = 13,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Dynamically load Leaflet on the client side
    let L: any;
    let isCancelled = false;

    import("leaflet").then((leafletModule) => {
      if (isCancelled || !mapContainerRef.current) return;
      L = leafletModule.default || leafletModule;

      // Fix leaflet default icon asset paths in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          zoomControl: false,
        }).setView(pickupCoords, zoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        L.control.zoom({ position: "bottomright" }).addTo(mapInstanceRef.current);
      }

      const map = mapInstanceRef.current;

      // Helper custom icons
      const createCustomIcon = (bgColor: string, text: string) => {
        return L.divIcon({
          className: "custom-pin",
          html: `<div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; color: ${bgColor === '#B9F227' ? '#111111' : '#FFFFFF'};">${text}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
      };

      // 1. Pickup Marker
      if (pickupCoords) {
        if (!markersRef.current.pickup) {
          markersRef.current.pickup = L.marker(pickupCoords, {
            icon: createCustomIcon("#10B981", "P"),
          })
            .addTo(map)
            .bindPopup("<b>Pickup Location</b>");
        } else {
          markersRef.current.pickup.setLatLng(pickupCoords);
        }
      }

      // 2. Dropoff Marker
      if (dropoffCoords) {
        if (!markersRef.current.dropoff) {
          markersRef.current.dropoff = L.marker(dropoffCoords, {
            icon: createCustomIcon("#EF4444", "D"),
          })
            .addTo(map)
            .bindPopup("<b>Drop-off Location</b>");
        } else {
          markersRef.current.dropoff.setLatLng(dropoffCoords);
        }
      }

      // 3. Driver Marker
      if (driverCoords) {
        if (!markersRef.current.driver) {
          markersRef.current.driver = L.marker(driverCoords, {
            icon: createCustomIcon("#B9F227", "🚗"),
          })
            .addTo(map)
            .bindPopup("<b>Assigned Driver</b>");
        } else {
          markersRef.current.driver.setLatLng(driverCoords);
        }
      }

      // 4. Polyline route
      if (polylineRef.current) {
        map.removeLayer(polylineRef.current);
        polylineRef.current = null;
      }

      const pointsToDraw =
        routeCoords && routeCoords.length > 0
          ? routeCoords
          : dropoffCoords
          ? [pickupCoords, dropoffCoords]
          : null;

      if (pointsToDraw && pointsToDraw.length > 1) {
        polylineRef.current = L.polyline(pointsToDraw, {
          color: "#111111",
          weight: 4,
          opacity: 0.8,
          dashArray: "6, 8",
        }).addTo(map);

        const bounds = L.latLngBounds(pointsToDraw);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        map.setView(pickupCoords, zoom);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [pickupCoords, dropoffCoords, driverCoords, routeCoords, zoom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
