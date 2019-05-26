export type FreeGeoIpResult = Partial<{
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip_code: string;
  time_zone: string;
  latitude: number;
  longitude: number;
  metro_code: number;
}>;

export type ContinentCode = 'AF' | 'AN' | 'AS' | 'EU' | 'NA' | 'OC' | 'SA';
export type ContinentName = 'Africa' | 'Antarctica' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

export interface GeoCountry {
  geoname_id: string;
  locale_code: 'en';
  continent_code: ContinentCode;
  continent_name: ContinentName;
  country_iso_code: string;
  country_name: string;
}

export async function queryFreeGeoIp(): Promise<FreeGeoIpResult> {
  const response: Response = await fetch('https://freegeoip.net/json/');
  if (!response.ok) {
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<FreeGeoIpResult>;
}
