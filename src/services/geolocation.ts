export interface DetectedLocation {
  city: string;
  state: string;
  zip: string;
}

export const geolocationService = {
  /**
   * Detect user's current city/zip using HTML5 Geolocation API + reverse lookup
   */
  async detectCurrentLocation(): Promise<DetectedLocation | null> {
    if (!navigator.geolocation) return null;

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (!res.ok) {
              resolve({ city: 'Seattle', state: 'WA', zip: '98101' });
              return;
            }
            const data = await res.json();
            const address = data?.address || {};
            const city = address.city || address.town || address.village || address.county || 'Seattle';
            const state = address.state || 'WA';
            const zip = address.postcode ? address.postcode.split('-')[0].trim() : '98101';
            
            resolve({ city, state, zip });
          } catch {
            resolve({ city: 'Seattle', state: 'WA', zip: '98101' });
          }
        },
        () => {
          // Fallback if user denies browser permission
          resolve(null);
        },
        { timeout: 5000 }
      );
    });
  },

  /**
   * Validate a US postal code and return city/state info
   */
  async lookupZipCode(zip: string): Promise<DetectedLocation | null> {
    const cleanZip = zip.trim().replace(/\D/g, '');
    if (cleanZip.length !== 5) return null;

    try {
      const res = await fetch(`https://api.zippopotam.us/us/${cleanZip}`);
      if (!res.ok) return null;
      const data = await res.json();
      const place = data?.places?.[0];
      if (!place) return null;

      return {
        city: place['place name'],
        state: place['state abbreviation'],
        zip: cleanZip
      };
    } catch {
      return null;
    }
  }
};
