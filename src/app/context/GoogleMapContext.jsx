"use client";
import { useState, useEffect } from "react";

const useGoogleMapsApi = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`,
    );

    if (existingScript) {
      if (window.google) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener("load", () => setIsLoaded(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Error loading Google Maps API script");
    };

    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [apiKey]);

  return isLoaded;
};

export default useGoogleMapsApi;
