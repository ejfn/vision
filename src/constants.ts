import { GeoCountry } from './api/freegeoip';
import { AppMode } from './store';

// tslint:disable:no-require-imports
export const EMOJI_ICONS: Record<string, {}> = {
  anger: require('../assets/emotions/anger.png'),
  contempt: require('../assets/emotions/contempt.png'),
  disgust: require('../assets/emotions/disgust.png'),
  fear: require('../assets/emotions/fear.png'),
  happiness: require('../assets/emotions/happiness.png'),
  neutral: require('../assets/emotions/neutral.png'),
  sadness: require('../assets/emotions/sadness.png'),
  surprise: require('../assets/emotions/surprise.png')
};

export const DECORATIONS: Record<string, {}> = {
  christmasBanner: require('../assets/christmas-banner.jpg')
};
// tslint:enable:no-require-imports

export interface AppConfig {
  color: string;
  logo: string;
  title: string;
  tag: string;
}

export const APP_CONFIG: Record<AppMode, AppConfig> = {
  Face: {
    color: '#4169e1',
    logo: 'emoticon-devil',
    title: 'Face Detection',
    tag: 'Microsoft Face API'
  },
  Vision: {
    color: '#2e8b57',
    logo: 'tag-text-outline',
    title: 'Photo Tagging',
    tag: 'Microsoft Computer Vision API'
  }
};

export const GEO_COUNTRIES: Array<GeoCountry> = [
  {
    geoname_id: '49518',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'RW',
    country_name: 'Rwanda'
  },
  {
    geoname_id: '51537',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SO',
    country_name: 'Somalia'
  },
  {
    geoname_id: '69543',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'YE',
    country_name: 'Yemen'
  },
  {
    geoname_id: '99237',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'IQ',
    country_name: 'Iraq'
  },
  {
    geoname_id: '102358',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'SA',
    country_name: 'Saudi Arabia'
  },
  {
    geoname_id: '130758',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'IR',
    country_name: 'Iran'
  },
  {
    geoname_id: '146669',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'CY',
    country_name: 'Cyprus'
  },
  {
    geoname_id: '149590',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'TZ',
    country_name: 'Tanzania'
  },
  {
    geoname_id: '163843',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'SY',
    country_name: 'Syria'
  },
  {
    geoname_id: '174982',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'AM',
    country_name: 'Armenia'
  },
  {
    geoname_id: '192950',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'KE',
    country_name: 'Kenya'
  },
  {
    geoname_id: '203312',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CD',
    country_name: 'Congo'
  },
  {
    geoname_id: '223816',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'DJ',
    country_name: 'Djibouti'
  },
  {
    geoname_id: '226074',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'UG',
    country_name: 'Uganda'
  },
  {
    geoname_id: '239880',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CF',
    country_name: 'Central African Republic'
  },
  {
    geoname_id: '241170',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SC',
    country_name: 'Seychelles'
  },
  {
    geoname_id: '248816',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'JO',
    country_name: 'Hashemite Kingdom of Jordan'
  },
  {
    geoname_id: '272103',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'LB',
    country_name: 'Lebanon'
  },
  {
    geoname_id: '285570',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KW',
    country_name: 'Kuwait'
  },
  {
    geoname_id: '286963',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'OM',
    country_name: 'Oman'
  },
  {
    geoname_id: '289688',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'QA',
    country_name: 'Qatar'
  },
  {
    geoname_id: '290291',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'BH',
    country_name: 'Bahrain'
  },
  {
    geoname_id: '290557',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'AE',
    country_name: 'United Arab Emirates'
  },
  {
    geoname_id: '294640',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'IL',
    country_name: 'Israel'
  },
  {
    geoname_id: '298795',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'TR',
    country_name: 'Turkey'
  },
  {
    geoname_id: '337996',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ET',
    country_name: 'Ethiopia'
  },
  {
    geoname_id: '338010',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ER',
    country_name: 'Eritrea'
  },
  {
    geoname_id: '357994',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'EG',
    country_name: 'Egypt'
  },
  {
    geoname_id: '366755',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SD',
    country_name: 'Sudan'
  },
  {
    geoname_id: '390903',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'GR',
    country_name: 'Greece'
  },
  {
    geoname_id: '433561',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'BI',
    country_name: 'Burundi'
  },
  {
    geoname_id: '453733',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'EE',
    country_name: 'Estonia'
  },
  {
    geoname_id: '458258',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'LV',
    country_name: 'Latvia'
  },
  {
    geoname_id: '587116',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'AZ',
    country_name: 'Azerbaijan'
  },
  {
    geoname_id: '597427',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'LT',
    country_name: 'Republic of Lithuania'
  },
  {
    geoname_id: '607072',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'SJ',
    country_name: 'Svalbard and Jan Mayen'
  },
  {
    geoname_id: '614540',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'GE',
    country_name: 'Georgia'
  },
  {
    geoname_id: '617790',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'MD',
    country_name: 'Republic of Moldova'
  },
  {
    geoname_id: '630336',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'BY',
    country_name: 'Belarus'
  },
  {
    geoname_id: '660013',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'FI',
    country_name: 'Finland'
  },
  {
    geoname_id: '661882',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'AX',
    country_name: 'Åland'
  },
  {
    geoname_id: '690791',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'UA',
    country_name: 'Ukraine'
  },
  {
    geoname_id: '718075',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'MK',
    country_name: 'Macedonia'
  },
  {
    geoname_id: '719819',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'HU',
    country_name: 'Hungary'
  },
  {
    geoname_id: '732800',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'BG',
    country_name: 'Bulgaria'
  },
  {
    geoname_id: '783754',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'AL',
    country_name: 'Albania'
  },
  {
    geoname_id: '798544',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'PL',
    country_name: 'Poland'
  },
  {
    geoname_id: '798549',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'RO',
    country_name: 'Romania'
  },
  {
    geoname_id: '831053',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'XK',
    country_name: 'Kosovo'
  },
  {
    geoname_id: '878675',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ZW',
    country_name: 'Zimbabwe'
  },
  {
    geoname_id: '895949',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ZM',
    country_name: 'Zambia'
  },
  {
    geoname_id: '921929',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'KM',
    country_name: 'Comoros'
  },
  {
    geoname_id: '927384',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MW',
    country_name: 'Malawi'
  },
  {
    geoname_id: '932692',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'LS',
    country_name: 'Lesotho'
  },
  {
    geoname_id: '933860',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'BW',
    country_name: 'Botswana'
  },
  {
    geoname_id: '934292',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MU',
    country_name: 'Mauritius'
  },
  {
    geoname_id: '934841',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SZ',
    country_name: 'Swaziland'
  },
  {
    geoname_id: '935317',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'RE',
    country_name: 'Réunion'
  },
  {
    geoname_id: '953987',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ZA',
    country_name: 'South Africa'
  },
  {
    geoname_id: '1024031',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'YT',
    country_name: 'Mayotte'
  },
  {
    geoname_id: '1036973',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MZ',
    country_name: 'Mozambique'
  },
  {
    geoname_id: '1062947',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MG',
    country_name: 'Madagascar'
  },
  {
    geoname_id: '1149361',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'AF',
    country_name: 'Afghanistan'
  },
  {
    geoname_id: '1168579',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'PK',
    country_name: 'Pakistan'
  },
  {
    geoname_id: '1210997',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'BD',
    country_name: 'Bangladesh'
  },
  {
    geoname_id: '1218197',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'TM',
    country_name: 'Turkmenistan'
  },
  {
    geoname_id: '1220409',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'TJ',
    country_name: 'Tajikistan'
  },
  {
    geoname_id: '1227603',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'LK',
    country_name: 'Sri Lanka'
  },
  {
    geoname_id: '1252634',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'BT',
    country_name: 'Bhutan'
  },
  {
    geoname_id: '1269750',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'IN',
    country_name: 'India'
  },
  {
    geoname_id: '1282028',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'MV',
    country_name: 'Maldives'
  },
  {
    geoname_id: '1282588',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'IO',
    country_name: 'British Indian Ocean Territory'
  },
  {
    geoname_id: '1282988',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'NP',
    country_name: 'Nepal'
  },
  {
    geoname_id: '1327865',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'MM',
    country_name: 'Myanmar [Burma]'
  },
  {
    geoname_id: '1512440',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'UZ',
    country_name: 'Uzbekistan'
  },
  {
    geoname_id: '1522867',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KZ',
    country_name: 'Kazakhstan'
  },
  {
    geoname_id: '1527747',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KG',
    country_name: 'Kyrgyzstan'
  },
  {
    geoname_id: '1546748',
    locale_code: 'en',
    continent_code: 'AN',
    continent_name: 'Antarctica',
    country_iso_code: 'TF',
    country_name: 'French Southern Territories'
  },
  {
    geoname_id: '1547314',
    locale_code: 'en',
    continent_code: 'AN',
    continent_name: 'Antarctica',
    country_iso_code: 'HM',
    country_name: 'Heard Island and McDonald Islands'
  },
  {
    geoname_id: '1547376',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'CC',
    country_name: 'Cocos [Keeling] Islands'
  },
  {
    geoname_id: '1559582',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'PW',
    country_name: 'Palau'
  },
  {
    geoname_id: '1562822',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'VN',
    country_name: 'Vietnam'
  },
  {
    geoname_id: '1605651',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'TH',
    country_name: 'Thailand'
  },
  {
    geoname_id: '1643084',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'ID',
    country_name: 'Indonesia'
  },
  {
    geoname_id: '1655842',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'LA',
    country_name: 'Laos'
  },
  {
    geoname_id: '1668284',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'TW',
    country_name: 'Taiwan'
  },
  {
    geoname_id: '1694008',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'PH',
    country_name: 'Philippines'
  },
  {
    geoname_id: '1733045',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'MY',
    country_name: 'Malaysia'
  },
  {
    geoname_id: '1814991',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'CN',
    country_name: 'China'
  },
  {
    geoname_id: '1819730',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'HK',
    country_name: 'Hong Kong'
  },
  {
    geoname_id: '1820814',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'BN',
    country_name: 'Brunei'
  },
  {
    geoname_id: '1821275',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'MO',
    country_name: 'Macao'
  },
  {
    geoname_id: '1831722',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KH',
    country_name: 'Cambodia'
  },
  {
    geoname_id: '1835841',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KR',
    country_name: 'Republic of Korea'
  },
  {
    geoname_id: '1861060',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'JP',
    country_name: 'Japan'
  },
  {
    geoname_id: '1873107',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'KP',
    country_name: 'North Korea'
  },
  {
    geoname_id: '1880251',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'SG',
    country_name: 'Singapore'
  },
  {
    geoname_id: '1899402',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'CK',
    country_name: 'Cook Islands'
  },
  {
    geoname_id: '1966436',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'TL',
    country_name: 'East Timor'
  },
  {
    geoname_id: '2017370',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'RU',
    country_name: 'Russia'
  },
  {
    geoname_id: '2029969',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'MN',
    country_name: 'Mongolia'
  },
  {
    geoname_id: '2077456',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'AU',
    country_name: 'Australia'
  },
  {
    geoname_id: '2078138',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'CX',
    country_name: 'Christmas Island'
  },
  {
    geoname_id: '2080185',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'MH',
    country_name: 'Marshall Islands'
  },
  {
    geoname_id: '2081918',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'FM',
    country_name: 'Federated States of Micronesia'
  },
  {
    geoname_id: '2088628',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'PG',
    country_name: 'Papua New Guinea'
  },
  {
    geoname_id: '2103350',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'SB',
    country_name: 'Solomon Islands'
  },
  {
    geoname_id: '2110297',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'TV',
    country_name: 'Tuvalu'
  },
  {
    geoname_id: '2110425',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'NR',
    country_name: 'Nauru'
  },
  {
    geoname_id: '2134431',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'VU',
    country_name: 'Vanuatu'
  },
  {
    geoname_id: '2139685',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'NC',
    country_name: 'New Caledonia'
  },
  {
    geoname_id: '2155115',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'NF',
    country_name: 'Norfolk Island'
  },
  {
    geoname_id: '2186224',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'NZ',
    country_name: 'New Zealand'
  },
  {
    geoname_id: '2205218',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'FJ',
    country_name: 'Fiji'
  },
  {
    geoname_id: '2215636',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'LY',
    country_name: 'Libya'
  },
  {
    geoname_id: '2233387',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CM',
    country_name: 'Cameroon'
  },
  {
    geoname_id: '2245662',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SN',
    country_name: 'Senegal'
  },
  {
    geoname_id: '2260494',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CG',
    country_name: 'Republic of the Congo'
  },
  {
    geoname_id: '2264397',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'PT',
    country_name: 'Portugal'
  },
  {
    geoname_id: '2275384',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'LR',
    country_name: 'Liberia'
  },
  {
    geoname_id: '2287781',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CI',
    country_name: 'Ivory Coast'
  },
  {
    geoname_id: '2300660',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GH',
    country_name: 'Ghana'
  },
  {
    geoname_id: '2309096',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GQ',
    country_name: 'Equatorial Guinea'
  },
  {
    geoname_id: '2328926',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'NG',
    country_name: 'Nigeria'
  },
  {
    geoname_id: '2361809',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'BF',
    country_name: 'Burkina Faso'
  },
  {
    geoname_id: '2363686',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'TG',
    country_name: 'Togo'
  },
  {
    geoname_id: '2372248',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GW',
    country_name: 'Guinea-Bissau'
  },
  {
    geoname_id: '2378080',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MR',
    country_name: 'Mauritania'
  },
  {
    geoname_id: '2395170',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'BJ',
    country_name: 'Benin'
  },
  {
    geoname_id: '2400553',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GA',
    country_name: 'Gabon'
  },
  {
    geoname_id: '2403846',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SL',
    country_name: 'Sierra Leone'
  },
  {
    geoname_id: '2410758',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ST',
    country_name: 'São Tomé and Príncipe'
  },
  {
    geoname_id: '2411586',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'GI',
    country_name: 'Gibraltar'
  },
  {
    geoname_id: '2413451',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GM',
    country_name: 'Gambia'
  },
  {
    geoname_id: '2420477',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'GN',
    country_name: 'Guinea'
  },
  {
    geoname_id: '2434508',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'TD',
    country_name: 'Chad'
  },
  {
    geoname_id: '2440476',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'NE',
    country_name: 'Niger'
  },
  {
    geoname_id: '2453866',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'ML',
    country_name: 'Mali'
  },
  {
    geoname_id: '2461445',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'EH',
    country_name: 'Western Sahara'
  },
  {
    geoname_id: '2464461',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'TN',
    country_name: 'Tunisia'
  },
  {
    geoname_id: '2510769',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'ES',
    country_name: 'Spain'
  },
  {
    geoname_id: '2542007',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'MA',
    country_name: 'Morocco'
  },
  {
    geoname_id: '2562770',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'MT',
    country_name: 'Malta'
  },
  {
    geoname_id: '2589581',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'DZ',
    country_name: 'Algeria'
  },
  {
    geoname_id: '2622320',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'FO',
    country_name: 'Faroe Islands'
  },
  {
    geoname_id: '2623032',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'DK',
    country_name: 'Denmark'
  },
  {
    geoname_id: '2629691',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'IS',
    country_name: 'Iceland'
  },
  {
    geoname_id: '2635167',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'GB',
    country_name: 'United Kingdom'
  },
  {
    geoname_id: '2658434',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'CH',
    country_name: 'Switzerland'
  },
  {
    geoname_id: '2661886',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'SE',
    country_name: 'Sweden'
  },
  {
    geoname_id: '2750405',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'NL',
    country_name: 'Netherlands'
  },
  {
    geoname_id: '2782113',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'AT',
    country_name: 'Austria'
  },
  {
    geoname_id: '2802361',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'BE',
    country_name: 'Belgium'
  },
  {
    geoname_id: '2921044',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'DE',
    country_name: 'Germany'
  },
  {
    geoname_id: '2960313',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'LU',
    country_name: 'Luxembourg'
  },
  {
    geoname_id: '2963597',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'IE',
    country_name: 'Ireland'
  },
  {
    geoname_id: '2993457',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'MC',
    country_name: 'Monaco'
  },
  {
    geoname_id: '3017382',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'FR',
    country_name: 'France'
  },
  {
    geoname_id: '3041565',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'AD',
    country_name: 'Andorra'
  },
  {
    geoname_id: '3042058',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'LI',
    country_name: 'Liechtenstein'
  },
  {
    geoname_id: '3042142',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'JE',
    country_name: 'Jersey'
  },
  {
    geoname_id: '3042225',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'IM',
    country_name: 'Isle of Man'
  },
  {
    geoname_id: '3042362',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'GG',
    country_name: 'Guernsey'
  },
  {
    geoname_id: '3057568',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'SK',
    country_name: 'Slovakia'
  },
  {
    geoname_id: '3077311',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'CZ',
    country_name: 'Czechia'
  },
  {
    geoname_id: '3144096',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'NO',
    country_name: 'Norway'
  },
  {
    geoname_id: '3164670',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'VA',
    country_name: 'Vatican City'
  },
  {
    geoname_id: '3168068',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'SM',
    country_name: 'San Marino'
  },
  {
    geoname_id: '3175395',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'IT',
    country_name: 'Italy'
  },
  {
    geoname_id: '3190538',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'SI',
    country_name: 'Slovenia'
  },
  {
    geoname_id: '3194884',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'ME',
    country_name: 'Montenegro'
  },
  {
    geoname_id: '3202326',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'HR',
    country_name: 'Croatia'
  },
  {
    geoname_id: '3277605',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'BA',
    country_name: 'Bosnia and Herzegovina'
  },
  {
    geoname_id: '3351879',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'AO',
    country_name: 'Angola'
  },
  {
    geoname_id: '3355338',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'NA',
    country_name: 'Namibia'
  },
  {
    geoname_id: '3370751',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SH',
    country_name: 'Saint Helena'
  },
  {
    geoname_id: '3374084',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BB',
    country_name: 'Barbados'
  },
  {
    geoname_id: '3374766',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'CV',
    country_name: 'Cabo Verde'
  },
  {
    geoname_id: '3378535',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'GY',
    country_name: 'Guyana'
  },
  {
    geoname_id: '3381670',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'GF',
    country_name: 'French Guiana'
  },
  {
    geoname_id: '3382998',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'SR',
    country_name: 'Suriname'
  },
  {
    geoname_id: '3424932',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'PM',
    country_name: 'Saint Pierre and Miquelon'
  },
  {
    geoname_id: '3425505',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'GL',
    country_name: 'Greenland'
  },
  {
    geoname_id: '3437598',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'PY',
    country_name: 'Paraguay'
  },
  {
    geoname_id: '3439705',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'UY',
    country_name: 'Uruguay'
  },
  {
    geoname_id: '3469034',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'BR',
    country_name: 'Brazil'
  },
  {
    geoname_id: '3474414',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'FK',
    country_name: 'Falkland Islands'
  },
  {
    geoname_id: '3474415',
    locale_code: 'en',
    continent_code: 'AN',
    continent_name: 'Antarctica',
    country_iso_code: 'GS',
    country_name: 'South Georgia and the South Sandwich Islands'
  },
  {
    geoname_id: '3489940',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'JM',
    country_name: 'Jamaica'
  },
  {
    geoname_id: '3508796',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'DO',
    country_name: 'Dominican Republic'
  },
  {
    geoname_id: '3562981',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'CU',
    country_name: 'Cuba'
  },
  {
    geoname_id: '3570311',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'MQ',
    country_name: 'Martinique'
  },
  {
    geoname_id: '3572887',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BS',
    country_name: 'Bahamas'
  },
  {
    geoname_id: '3573345',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BM',
    country_name: 'Bermuda'
  },
  {
    geoname_id: '3573511',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'AI',
    country_name: 'Anguilla'
  },
  {
    geoname_id: '3573591',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'TT',
    country_name: 'Trinidad and Tobago'
  },
  {
    geoname_id: '3575174',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'KN',
    country_name: 'St Kitts and Nevis'
  },
  {
    geoname_id: '3575830',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'DM',
    country_name: 'Dominica'
  },
  {
    geoname_id: '3576396',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'AG',
    country_name: 'Antigua and Barbuda'
  },
  {
    geoname_id: '3576468',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'LC',
    country_name: 'Saint Lucia'
  },
  {
    geoname_id: '3576916',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'TC',
    country_name: 'Turks and Caicos Islands'
  },
  {
    geoname_id: '3577279',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'AW',
    country_name: 'Aruba'
  },
  {
    geoname_id: '3577718',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'VG',
    country_name: 'British Virgin Islands'
  },
  {
    geoname_id: '3577815',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'VC',
    country_name: 'Saint Vincent and the Grenadines'
  },
  {
    geoname_id: '3578097',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'MS',
    country_name: 'Montserrat'
  },
  {
    geoname_id: '3578421',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'MF',
    country_name: 'Saint Martin'
  },
  {
    geoname_id: '3578476',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BL',
    country_name: 'Saint-Barthélemy'
  },
  {
    geoname_id: '3579143',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'GP',
    country_name: 'Guadeloupe'
  },
  {
    geoname_id: '3580239',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'GD',
    country_name: 'Grenada'
  },
  {
    geoname_id: '3580718',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'KY',
    country_name: 'Cayman Islands'
  },
  {
    geoname_id: '3582678',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BZ',
    country_name: 'Belize'
  },
  {
    geoname_id: '3585968',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'SV',
    country_name: 'El Salvador'
  },
  {
    geoname_id: '3595528',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'GT',
    country_name: 'Guatemala'
  },
  {
    geoname_id: '3608932',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'HN',
    country_name: 'Honduras'
  },
  {
    geoname_id: '3617476',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'NI',
    country_name: 'Nicaragua'
  },
  {
    geoname_id: '3624060',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'CR',
    country_name: 'Costa Rica'
  },
  {
    geoname_id: '3625428',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'VE',
    country_name: 'Venezuela'
  },
  {
    geoname_id: '3658394',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'EC',
    country_name: 'Ecuador'
  },
  {
    geoname_id: '3686110',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'CO',
    country_name: 'Colombia'
  },
  {
    geoname_id: '3703430',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'PA',
    country_name: 'Panama'
  },
  {
    geoname_id: '3723988',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'HT',
    country_name: 'Haiti'
  },
  {
    geoname_id: '3865483',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'AR',
    country_name: 'Argentina'
  },
  {
    geoname_id: '3895114',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'CL',
    country_name: 'Chile'
  },
  {
    geoname_id: '3923057',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'BO',
    country_name: 'Bolivia'
  },
  {
    geoname_id: '3932488',
    locale_code: 'en',
    continent_code: 'SA',
    continent_name: 'South America',
    country_iso_code: 'PE',
    country_name: 'Peru'
  },
  {
    geoname_id: '3996063',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'MX',
    country_name: 'Mexico'
  },
  {
    geoname_id: '4030656',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'PF',
    country_name: 'French Polynesia'
  },
  {
    geoname_id: '4030699',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'PN',
    country_name: 'Pitcairn Islands'
  },
  {
    geoname_id: '4030945',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'KI',
    country_name: 'Kiribati'
  },
  {
    geoname_id: '4031074',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'TK',
    country_name: 'Tokelau'
  },
  {
    geoname_id: '4032283',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'TO',
    country_name: 'Tonga'
  },
  {
    geoname_id: '4034749',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'WF',
    country_name: 'Wallis and Futuna'
  },
  {
    geoname_id: '4034894',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'WS',
    country_name: 'Samoa'
  },
  {
    geoname_id: '4036232',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'NU',
    country_name: 'Niue'
  },
  {
    geoname_id: '4041468',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'MP',
    country_name: 'Northern Mariana Islands'
  },
  {
    geoname_id: '4043988',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'GU',
    country_name: 'Guam'
  },
  {
    geoname_id: '4566966',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'PR',
    country_name: 'Puerto Rico'
  },
  {
    geoname_id: '4796775',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'VI',
    country_name: 'U.S. Virgin Islands'
  },
  {
    geoname_id: '5854968',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'UM',
    country_name: 'U.S. Minor Outlying Islands'
  },
  {
    geoname_id: '5880801',
    locale_code: 'en',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_iso_code: 'AS',
    country_name: 'American Samoa'
  },
  {
    geoname_id: '6251999',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'CA',
    country_name: 'Canada'
  },
  {
    geoname_id: '6252001',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'US',
    country_name: 'United States'
  },
  {
    geoname_id: '6254930',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: 'PS',
    country_name: 'Palestine'
  },
  {
    geoname_id: '6255147',
    locale_code: 'en',
    continent_code: 'AS',
    continent_name: 'Asia',
    country_iso_code: '',
    country_name: ''
  },
  {
    geoname_id: '6255148',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: '',
    country_name: ''
  },
  {
    geoname_id: '6290252',
    locale_code: 'en',
    continent_code: 'EU',
    continent_name: 'Europe',
    country_iso_code: 'RS',
    country_name: 'Serbia'
  },
  {
    geoname_id: '6697173',
    locale_code: 'en',
    continent_code: 'AN',
    continent_name: 'Antarctica',
    country_iso_code: 'AQ',
    country_name: 'Antarctica'
  },
  {
    geoname_id: '7609695',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'SX',
    country_name: 'Sint Maarten'
  },
  {
    geoname_id: '7626836',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'CW',
    country_name: 'Curaçao'
  },
  {
    geoname_id: '7626844',
    locale_code: 'en',
    continent_code: 'NA',
    continent_name: 'North America',
    country_iso_code: 'BQ',
    country_name: 'Bonaire, Sint Eustatius, and Saba'
  },
  {
    geoname_id: '7909807',
    locale_code: 'en',
    continent_code: 'AF',
    continent_name: 'Africa',
    country_iso_code: 'SS',
    country_name: 'South Sudan'
  }
];
