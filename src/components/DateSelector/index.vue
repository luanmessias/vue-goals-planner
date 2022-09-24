<template>
  <div :class="['date-selector', { 'date-selector--dark': isThemeDarkActive }]">
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
      :dark="isThemeDarkActive"
      noToday
      autoApply
    />
  </div>
</template>

<script>
import DatePicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'

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
      type: [String, Date],
      default: '',
    },
  },
  setup(props) {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const date = ref(props.startDate ? props.startDate : '')
    const minDate = props.startDate ? '' : new Date()
    const { d } = useI18n()
    const format = () => d(date.value)
    return {
      date,
      minDate,
      format,
      isThemeDarkActive,
    }
  },
}
</script>

<style lang="scss">
@import './styles';
</style>
