<template>
  <div class="date-selector">
    <span class="date-selector__label" v-text="label" />
    <DatePicker
      class="date-selector__input"
      :enableTimePicker="false"
      v-model="datePickerConfig.date"
      :minDate="datePickerConfig.minDate"
      noToday
      autoApply
    />
  </div>
</template>

<script>
import DatePicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'

export default {
  name: 'DateSelector',
  components: {
    DatePicker,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const datePickerConfig = {
      date: ref(new Date()),
      minDate: new Date(),
    }
    return {
      datePickerConfig,
    }
  },
}
</script>

<style lang="scss">
@import './styles';
</style>
