<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="https://image.flaticon.com/icons/png/512/62/62470.png" alt="Mugether">
      </div>
      <div class="navbar-item">
        <h1 class="title is-5">Mugether</h1>
      </div>

      <a role="button" class="navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <SelectedPlaylistDropdown/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectedPlaylistDropdown from '@/components/SelectedPlaylistDropdown.vue';

export default Vue.extend({
  name: 'Navbar',
  components: { SelectedPlaylistDropdown },
});
</script>
