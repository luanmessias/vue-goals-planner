<template>
  <div class="task-filter">
    <div
      v-for="filter in filters"
      :key="filter.id"
      :class="[
        'task-filter__opt',
        { 'task-filter__opt--active': filter.active },
      ]"
      @click="toggleActiveFilter(filter.id)"
    >
      <span class="task-filter__opt__title" v-text="$t(filter.label)"></span>
      <span class="task-filter__opt__length" v-text="filter.data.length"></span>
    </div>
  </div>
</template>

<script>
import { useFilterStore } from '@/store/filter'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'TaskFilter',
  props: {
    goal: {
      type: String,
      default: '',
    },
  },
  setup() {
    const route = useRoute()
    const { filters } = storeToRefs(useFilterStore())
    const { toggleActiveFilter, updateFilters } = useFilterStore()
    onMounted(() => {
      updateFilters(route.params.id)
    })
    return { filters, toggleActiveFilter }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
