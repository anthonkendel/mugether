<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="https://image.flaticon.com/icons/png/512/62/62470.png" alt="Mugether">
      </div>
      <div class="navbar-item">
        <h1>Mugether</h1>
      </div>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isActive }"
        @click="onClickNavbarBurger"
      >
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-end"></div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  data: () => ({
    isActive: false,
  }),
  methods: {
    onClickNavbarBurger(): void {
      this.isActive = !this.isActive;
    },
  },
});
</script>
