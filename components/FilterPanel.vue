<script setup lang="ts">
import BaseCheckBox from '~/components/baseComponents/BaseCheckBox.vue'
import BaseCard from '~/components/baseComponents/BaseCard.vue'
import { useStopsFilter } from '@/composables/useStopsFilter'

const { stops, onCheckChange } = useStopsFilter()
</script>

<template>
  <div class="filter-panel">
    <BaseCard class="filter-panel__card">
      <h2 class="filter-panel__title">кількість пересадок</h2>
      <BaseCheckBox
          v-for="stop in stops"
          class="filter-panel__checkbox"
          :key="stop.value"
          :model-value="stop.checked ?? false"
          @update:modelValue="checked => onCheckChange(stop.value, checked)"
          :label="stop.label"
      />
    </BaseCard>
  </div>
</template>

<style scoped lang="scss">
.filter-panel {
  &__title {
    font-size: 12px;
    font-weight: 600;
    line-height: 12px;
    letter-spacing: 1px;
    padding: 0 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  &__card {
    padding: 20px 0 10px 0;
    width: 232px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>