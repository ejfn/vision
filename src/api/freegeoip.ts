export type FreeGeoIp = Partial<{
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

export async function getFreeGeoIp(): Promise<FreeGeoIp> {
  const response: Response = await fetch('https://freegeoip.net/json/');
  if (!response.ok) {
    throw new Error((await response.json()).error.message);
  }
  return response.json() as Promise<FreeGeoIp>;
}
