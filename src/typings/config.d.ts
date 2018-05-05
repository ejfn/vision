export type AzureLocation = "westus" | "australiaeast" | "southeastasia" | "northeurope";

export interface Config {
  semver: string;
  showAd: boolean;
  showInterstitialCalls: number;
  geoAzureLocationMap: {
    AF?: AzureLocation;
    AN?: AzureLocation;
    AS?: AzureLocation;
    EU?: AzureLocation;
    NA?: AzureLocation;
    OC?: AzureLocation;
    SA?: AzureLocation;
  };
  faceApiKeys: ApiLocationKey[];
  visionApiKeys: ApiLocationKey[];
  adMob: {
    banners: AdUnitIds[];
    interstitials: AdUnitIds[];
  };
  amplitude: {
    apiKey: string;
  };
}
export interface ApiLocationKey {
  location: AzureLocation;
  key: string;
}
export interface AdUnitIds {
  ios?: string;
  android?: string;
}
