<template>
  <div class="banner">
    <div class="banner__container">
      <div class="banner__info">
        <h2 class="banner__info__title" v-text="$t('home.banner.title')" />
        <p class="banner__info__tasks">
          <span>{{ tasksDone }}/{{ tasks.length }}</span>
          {{ $t('home.banner.tasks') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
  data() {
    return {
      tasks: [],
    }
  },
  mounted() {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => (this.tasks = data))
      .catch((err) => console.log(err.message))
  },
  computed: {
    tasksDone() {
      return this.tasks.filter((task) => task.done === true).length
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
