export const CHARACTERISTICS = {
    "Device type": [
      "Desktop", "Tablet", "Smartphone", "Feature Phone", "Smart TV",
      "Gaming Console", "Wearable", "E-reader", "Car Infotainment",
    ],
    Platform: ["iOS", "Android", "Windows", "macOS", "Linux"],
    Browser: ["Chrome", "Safari", "Firefox", "Edge", "Opera"],
    "Device brand": ["Apple", "Samsung", "Huawei", "OnePlus", "Sony"],
    "Os version": ["iOS 17", "Android 14", "Windows 11", "macOS Ventura"],
    Language: ["English", "Spanish", "French", "German", "Chinese"],
  } as const;
  
  export const GEOLOCATION = {
    Country: [
      "Bangladesh", "USA", "Chile", "Pakistan", "India",
      "Afghanistan", "Nepal", "Bhutan", "Maldives", "Sri Lanka",
      "Iran", "Iraq", "Syria", "Jordan", "Lebanon",
      "Saudi Arabia", "UAE", "Kuwait", "Bahrain",
    ],
    Region: [
      "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barishal",
      "Sylhet", "London", "Delhi", "Mumbai", "Karachi", "Lahore",
    ],
    City: [
      "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barishal",
      "Sylhet", "London", "Delhi", "Mumbai", "Karachi", "Lahore",
    ],
    Isp: ["Du", "Cu", "Ku", "Cuet", "Duet"],
  } as const;
  
  export type Characteristic = keyof typeof CHARACTERISTICS;
  export type Geolocation = keyof typeof GEOLOCATION;
  
  export const DEFAULT_VALUES = Object.keys(CHARACTERISTICS).reduce(
    (acc, key) => {
      acc.included[key as Characteristic] = [];
      acc.excluded[key as Characteristic] = [];
      return acc;
    },
    {
      included: {} as Record<Characteristic, string[]>,
      excluded: {} as Record<Characteristic, string[]>,
    }
  );
  
  export const DEFAULT_GEO_VALUES = Object.keys(GEOLOCATION).reduce(
    (acc, key) => {
      acc.included[key as Geolocation] = [];
      acc.excluded[key as Geolocation] = [];
      return acc;
    },
    {
      included: {} as Record<Geolocation, string[]>,
      excluded: {} as Record<Geolocation, string[]>,
    }
  );
  