import { defineStore } from 'pinia'
import { useMessageStore } from '@/store/message'
import { useTaskStore } from '@/store/tasks'
import { v4 as uuid_v4 } from 'uuid'

export const useGoalStore = defineStore('goal', {
  state: () => ({
    goals: [],
    goal: null,
    loading: false,
    feedback: {
      error: false,
      message: '',
    },
  }),
  getters: {
    getAllGoals(state) {
      return state.goals
    },
    getNewGoals() {
      const { tasks } = useTaskStore()
      const goalsToIgnore = [
        ...new Set(
          tasks.map((task) => {
            return task.goal
          })
        ),
      ]
      const goalsToStart = this.goals
        .filter((goal) => {
          return !goalsToIgnore.includes(goal.id)
        })
        .sort((a, b) => {
          let da = new Date(a.deadline)
          let db = new Date(b.deadline)

          return da - db
        })

      return goalsToStart
    },
  },
  actions: {
    async fetchGoals() {
      this.goals = []
      this.loading = true
      try {
        this.goals = await fetch(`${process.env.VUE_APP_API_HOST}/goals`).then(
          (response) => response.json()
        )
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchGoal(id) {
      this.goal = []
      this.loading = true
      try {
        this.goal = await fetch(
          `${process.env.VUE_APP_API_HOST}/goals/${id}`
        ).then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addGoal(data) {
      const { setMessage } = useMessageStore()
      const goals = [...this.getAllGoals]
      const alreadyExists = goals.some(({ title }) => title === data.title)

      if (alreadyExists) {
        setMessage({
          active: true,
          text: 'add.goal.form.error.exists',
          error: true,
        })
      } else {
        const newGoal = {
          id: uuid_v4(),
          title: data.title,
          deadline: data.deadline,
          created_at: new Date(),
          updated_at: new Date(),
        }
        try {
          fetch(`${process.env.VUE_APP_API_HOST}/goals`, {
            method: 'POST',
            body: JSON.stringify(newGoal),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(this.goals.push(newGoal))
            .then((res) => res.json())

          setMessage({
            active: true,
            text: 'add.goal.form.success',
            error: false,
          })
        } catch (error) {
          this.error = error
        }
      }
    },
  },
})
