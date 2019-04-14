import { store } from '@/store';
import { Actions } from '@/store/actions';
import { IState } from '@/store/store';

export interface IAuthenticationService {
  isAuthorized(): boolean;
  getAccessToken(): string;
  authorize(accessToken: string, expiresIn: string): Promise<void>;
  logout(): Promise<void>;
}

export const AuthenticationService: IAuthenticationService = new class implements IAuthenticationService {
  public isAuthorized(): boolean {
    return Boolean(store.state.accessToken && store.state.expiresIn);
  }

  public getAccessToken(): string {
    return store.state.accessToken;
  }

  public async authorize(accessToken: string, expiresIn: string): Promise<void> {
    return store.dispatch(Actions.setState, { accessToken, expiresIn });
  }

  public async logout(): Promise<void> {
    return store.dispatch(Actions.setState, {
      accessToken: '',
      expiresIn: '',
    } as IState);
  }
}();
