export const BaseUrl: string = 'http://localhost:5000/api';

export function GetEndPointFullPath(endpoint: string): string {
  return BaseUrl + endpoint;
}
