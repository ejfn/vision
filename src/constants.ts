export type AppMode = 'Face' | 'Emotion' | 'Vision';

export interface MainScreenConfig {
  color: string;
  logo: string;
  title: string;
  tag: string;
}

export const MAIN_SCREEN_CONFIG: Record<AppMode, MainScreenConfig> = {
  Face: {
    color: '#4169e1',
    logo: 'emoticon',
    title: 'Face Detection',
    tag: 'Microsoft Face API'
  },
  Emotion: {
    color: '#ba55d3',
    logo: 'emoticon-devil',
    title: 'Mood Detection',
    tag: 'Microsoft Emotion API'
  },
  Vision: {
    color: '#2e8b57',
    logo: 'tag-text-outline',
    title: 'Image Tagging',
    tag: 'Microsoft Computer Vision API'
  }
};
