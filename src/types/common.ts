export interface ValidateSuppressInfo {
  code: string
}

export enum Protocol {
  HTTP = 'http',
}

export interface Option {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}

export interface Tag {
  name: string,
  value?: string
}

export const TIME_FOREVER = 32500972800000 // "2999-12-01 00:00:00"
