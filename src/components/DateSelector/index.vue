<template>
  <div class="date-selector">
    <span class="date-selector__label" v-text="label" />
    <DatePicker
      v-bind="$attrs"
      :class="[
        'date-selector__input',
        { 'date-selector__input--error': error },
      ]"
      :enableTimePicker="false"
      v-model="date"
      :minDate="minDate"
      :format="format"
      noToday
      autoApply
    />
  </div>
</template>

<script>
import DatePicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'
import dayjs from 'dayjs'

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
    error: {
      type: String,
      value: '',
    },
  },
  setup() {
    const date = ref('')
    const minDate = new Date()
    const format = () => dayjs(date.value).format('DD/MM/YYYY')

    return {
      date,
      minDate,
      format,
    }
  },
}
</script>

<style lang="scss">
@import './styles';
</style>
