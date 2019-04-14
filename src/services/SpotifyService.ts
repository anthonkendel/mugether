import { RequestService } from '@/services/RequestService';

const clientId = 'c0374a8b5c4144f0be3ebacfa7974330';
const accessScopes = [
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-private',
  'user-read-email',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
];
const scopes = accessScopes.join(' ');

export interface ISpotifyService {
  authorize(): void;
  authorizeFromCallback(): Record<string, string>;
  me(accessToken: string): Promise<any>;
  playlists(accessToken: string): Promise<any>;
  tracks(playlistId: string, accessToken: string): Promise<any>;
  search(query: string, accessToken: string): Promise<any>;
  player(accessToken: string): Promise<any>;
  play(data: any, accessToken: string): Promise<any>;
  pause(accessToken: string): Promise<any>;
}

export const SpotifyService: ISpotifyService = new class implements ISpotifyService {
  public authorize() {
    const params: Record<string, any> = {
      client_id: clientId,
      response_type: 'token',
      redirect_uri: 'http://localhost:9999/',
      state: '',
      scopes: encodeURIComponent(scopes),
      show_dialog: false,
    };
    const query = Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    window.location.href = `https://accounts.spotify.com/authorize?${query}`;
  }


  public authorizeFromCallback(): Record<string, string> {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get('access_token') || '';
    const expiresIn = params.get('expires_in') || '';
    return { accessToken, expiresIn };
  }

  public me(accessToken: string): Promise<any> {
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public playlists(accessToken: string): Promise<any> {
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public tracks(playlistId: string, accessToken: string): Promise<any> {
    return RequestService.request({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public search(query: string, accessToken: string): Promise<any> {
    const searchQuery = `q=${query}`;
    const searchTypes = 'type=track';
    const urlSearch = encodeURI(`${searchQuery}&${searchTypes}`);
    return RequestService.request({
      url: `https://api.spotify.com/v1/search?${urlSearch}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public player(accessToken: string): Promise<any> {
    // TODO: Handle 204 NO CONTENT. No content means no player found.
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public play(body: any, accessToken: string): Promise<any> {
    return RequestService.request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
  }

  public pause(accessToken: string): Promise<any> {
    return RequestService.request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}();