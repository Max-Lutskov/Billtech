<script setup lang="ts">
type TabOption = 'cheapest' | 'fastest' | 'optimal'

const tabs = [
  { value: 'cheapest', label: 'НАЙДЕШЕВШИЙ' },
  { value: 'fastest', label: 'НАЙШВИДШИЙ' },
  { value: 'optimal', label: 'ОПТИМАЛЬНИЙ' },
] as const

const emit = defineEmits<{
  (e: 'change', value: TabOption): void
}>()

const activeTab = ref<TabOption>('cheapest')

function setActive(tab: TabOption) {
  activeTab.value = tab
  emit('change', tab)
}
</script>

<template>
  <div class="tabs">
    <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab', { active: tab.value === activeTab }]"
        @click="setActive(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $border;
}

.tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.5;
  vertical-align: middle;
  letter-spacing: 1px;
  background: $white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 450px) {
    font-size: 10px;
    padding: 10px;
  }

  &:not(:last-child) {
    border-right: 1px solid $border;
  }

  &.active {
    background: $primary;
    color: $white;
  }
}
</style>
