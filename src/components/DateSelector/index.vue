<template>
  <div class="date-selector">
    <span class="date-selector__label" v-text="label" />
    <transition name="date-selector__error__animate">
      <span v-if="error" class="date-selector__error" v-text="$t(error)" />
    </transition>
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
import { useI18n } from 'vue-i18n'

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
    startDate: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const date = ref(props.startDate ? props.startDate : '')
    const minDate = props.startDate ? '' : new Date()
    const { d } = useI18n()
    const format = () => d(date.value)
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
