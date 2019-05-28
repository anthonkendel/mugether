<template>
  <b-dropdown
    v-if="isAuthorized"
    v-model="activeDevice"
  >
    <template v-slot:trigger="">
      <button class="button">
        <span >
          Active device:
          <strong v-if="activeDevice.id">{{ activeDevice.name }}</strong>
          <strong v-else>None</strong>
        </span>
      </button>
    </template>

    <b-dropdown-item
      v-for="device in availableDevices"
      :key="device.id"
      :value="device"
    >
      <span>{{ device.name }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Playlist, Device } from '@/services/SpotifyInterfaces';
import { Actions } from '@/store/actions';
import { SpotifyService } from '@/services/SpotifyService';
import { AuthenticationService } from '@/services/AuthenticationService';

export default Vue.extend({
  name: 'ActivceDeviceDropdown',
  computed: {
    isAuthorized: () => AuthenticationService.isAuthorized(),
    accessToken: () => AuthenticationService.getAccessToken(),
    availableDevices(): Device[] {
      return this.$store.state.availableDevices;
    },
    activeDevice: {
      get(): any {
        return this.$store.state.activeDevice || {};
      },
      async set(value: Device): Promise<void> {
        if (this.$store.state.activeDevice.id !== value.id) {
          await SpotifyService.updatePlayer({ deviceIds: [value.id] }, this.accessToken);
          this.$store.dispatch(Actions.setState, { activeDevice: value });
        }
      },
    },
  },
  async created(): Promise<void> {
    if (this.isAuthorized) {
      await this.loadDevices();
    }
  },
  methods: {
    async loadDevices(): Promise<void> {
      const { devices = [] } = await SpotifyService.getDevices(this.accessToken);
      const activeDevice = devices!.find((device) => device.is_active);
      await this.$store.dispatch(Actions.setState, { availableDevices: devices, activeDevice });
    },
  },
});
</script>

<style scoped>

</style>
