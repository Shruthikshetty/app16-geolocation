import { useState } from "react";

export function useGeolocation(): GeolocationData {
  const [isLoading, setIsLoading] = useState(false);
  // const [countClicks, setCountClicks] = useState(0);
  const [position, setPosition] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const [error, setError] = useState("");

  const { lat, lng } = position;

  function getPosition() {
    // setCountClicks((count) => count + 1);

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { lat, lng, getPosition, isLoading, error };
}

interface GeolocationData {
  lat: number | null;
  lng: number | null;
  getPosition: () => void;
  isLoading: boolean;
  error: string;
}
