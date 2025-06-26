<!-- components/BaseCheckbox.vue -->
<script setup lang="ts">
interface Props {
  modelValue: boolean
  label: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="base-checkbox">
    <input
        type="checkbox"
        class="base-checkbox__input"
        v-model="checked"
    />
    <span class="base-checkbox__box" :class="{ checked }">
      <img
          v-if="checked"
          src="/icons/check.svg"
          alt="checked"
          class="check-icon"
      />
    </span>
    <span class="base-checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 10px 20px;

  &:hover {
    background: $hover;
  }
}

.base-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.base-checkbox__box {
  width: 20px;
  height: 20px;
  border: 1px solid $checkbox_default;
  border-radius: 2px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-checkbox__box.checked {
  border: 1px solid $checkbox_checked;
}

.check-icon {
  display: block;
  user-select: none;
}

.base-checkbox__label {
  color: $default_text;
  font-size: 13px;
  line-height: 20px;
}
</style>
