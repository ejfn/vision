export type AzureLocation = 'westus' | 'australiaeast' | 'southeastasia' | 'northeurope';

export interface Config {
  geoAzureLocationMap: {
    AF?: AzureLocation;
    AN?: AzureLocation;
    AS?: AzureLocation;
    EU?: AzureLocation;
    NA?: AzureLocation;
    OC?: AzureLocation;
    SA?: AzureLocation;
  };
  faceApiKeys: Array<ApiLocationKey>;
  visionApiKeys: Array<ApiLocationKey>;
  adMob: {
    banners: Array<AdUnitIds>;
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

export const CONFIG: Config = {
  geoAzureLocationMap: {
    AF: 'northeurope',
    AN: 'australiaeast',
    AS: 'southeastasia',
    EU: 'northeurope',
    NA: 'westus',
    OC: 'australiaeast',
    SA: 'westus',
  },
  faceApiKeys: [
    {
      location: 'westus',
    },
    {
      location: 'southeastasia',
    },
    {
      location: 'australiaeast',
    },
    {
      location: 'northeurope',
    },
  ],
  visionApiKeys: [
    {
      location: 'westus',
    },
    {
      location: 'australiaeast',
    },
    {
      location: 'southeastasia',
    },
    {
      location: 'northeurope',
    },
  ],
  adMob: {
    banners: [
      {
      },
      {
      },
    ],
  },
};
