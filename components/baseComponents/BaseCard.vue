<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .base-card {
    background: $white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
</style>