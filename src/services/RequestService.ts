import { AuthenticationService } from '@/services/AuthenticationService';

export interface IRequestParameters {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface IRequestService {
  request(parameters: IRequestParameters): Promise<any>;
}

export const RequestService: IRequestService = new class implements IRequestService {
  public async request({ url, method = 'GET', headers = {}, body = {} }: IRequestParameters): Promise<any | never> {
    const options: RequestInit = { method, headers };
    if (method === 'PUT' || method === 'POST') {
      options.body = JSON.stringify(body);
      (options.headers as any)['Content-Type'] = 'application/json; charset=utf-8';
    }
    return fetch(url, options)
      .then((value) => {
        if (!value.ok) {
          AuthenticationService.logout();
        }
        return value.json();
      })
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
  }
}();
