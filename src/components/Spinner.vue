<template>
  <div :class="[
    'inline-block animate-spin rounded-full border-t-2 border-b-2',
    sizeClasses[size],
    colorClasses
  ]"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'pink'
  }
})

const sizeClasses = {
  sm: 'h-6 w-6 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4'
}

const colorClasses = computed(() => {
  return {
    pink: 'border-pink-500',
    white: 'border-white',
    gray: 'border-gray-400'
  }[props.color]
})
</script>