import { RequestService } from '@/services/RequestService';
import {
  GetPlaylists,
  GetTracks,
  GetDevices,
  Search,
  GetMe,
  GetPlayer,
} from '@/services/SpotifyInterfaces';

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

interface UpdatePlayerParameters {
  deviceIds: string[];
  play?: boolean;
}

export interface SpotifyService {
  authorize(): void;
  authorizeFromCallback(): Record<string, string>;
  getMe(accessToken: string): Promise<GetMe>;
  getPlaylists(accessToken: string): Promise<GetPlaylists>;
  getTracks(
    playlistId: string,
    accessToken: string,
    pageSize?: number,
    indexOffset?: number,
  ): Promise<GetTracks>;
  querySearch(query: string, accessToken: string): Promise<Search>;
  getDevices(accessToken: string): Promise<GetDevices>;
  updatePlayer(
    { deviceIds, play }: UpdatePlayerParameters,
    accessToken: string,
  ): Promise<any>;
  getPlayer(accessToken: string): Promise<GetPlayer>;
  setPlay(data: any, accessToken: string): Promise<any>;
  setPause(accessToken: string): Promise<any>;
}

export const SpotifyService: SpotifyService = new class
  implements SpotifyService {
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

  public getMe(accessToken: string): Promise<GetMe> {
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public getPlaylists(accessToken: string): Promise<GetPlaylists> {
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public getTracks(
    playlistId: string,
    accessToken: string,
    pageSize = 50,
    indexOffset = 0,
  ): Promise<GetTracks> {
    return RequestService.request({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${pageSize}&offset=${indexOffset}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public querySearch(query: string, accessToken: string): Promise<Search> {
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

  public getDevices(accessToken: string): Promise<GetDevices> {
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me/player/devices',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public updatePlayer(
    { deviceIds = [], play }: UpdatePlayerParameters,
    accessToken: string,
  ): Promise<any> {
    return RequestService.request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        device_ids: deviceIds,
        play,
      },
    });
  }

  public getPlayer(accessToken: string): Promise<any> {
    // TODO: Handle 204 NO CONTENT. No content means no player found.
    return RequestService.request({
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public  setPlay(body: any, accessToken: string): Promise<any> {
    return RequestService.request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
  }

  public setPause(accessToken: string): Promise<any> {
    return RequestService.request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}();
