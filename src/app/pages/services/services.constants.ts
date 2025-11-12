export type ServiceIcon =
  | 'home'
  | 'office'
  | 'windows'
  | 'organize'
  | 'sparkles'
  | 'keys'
  | 'building'
  | 'sun';

export const SERVICE_IDS = [
  'residential',
  'commercial',
  'windows',
  'organization',
  'deep_clean',
  'move',
  'snowbird'
] as const;

export type ServiceId = typeof SERVICE_IDS[number];

export const DEFAULT_SERVICE_ID: ServiceId = SERVICE_IDS[0];

export const SERVICE_ICONS: Record<ServiceId, ServiceIcon> = {
  residential: 'home',
  commercial: 'office',
  windows: 'windows',
  organization: 'organize',
  deep_clean: 'sparkles',
  move: 'keys',
  snowbird: 'sun'
};

