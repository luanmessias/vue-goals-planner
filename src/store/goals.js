import { defineStore } from 'pinia'
import { useMessageStore } from '@/store/message'
import { useTaskStore } from '@/store/tasks'
import {
  query,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
} from 'firebase/firestore'
import projectFirestore from '@/firebase/config'

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
          let da = new Date(+a.deadline)
          let db = new Date(+b.deadline)

          return da - db
        })

      return goalsToStart
    },
    getStartedGoals() {
      const { tasks } = useTaskStore()
      const goalsToIgnore = [
        ...new Set(
          tasks.map((task) => {
            return task.goal
          })
        ),
      ]
      const startedGoals = this.goals
        .filter((goal) => {
          return goalsToIgnore.includes(goal.id)
        })
        .sort((a, b) => {
          let da = new Date(+a.deadline)
          let db = new Date(+b.deadline)

          return da - db
        })
      return startedGoals
    },
  },
  actions: {
    async fetchGoals() {
      this.goals = []
      this.loading = true
      try {
        const res = await getDocs(query(collection(projectFirestore, 'goals')))
        res.forEach((doc) => {
          this.goals.push({ id: doc.id, ...doc.data() })
        })
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
        const docRef = doc(projectFirestore, 'goals', id)
        const docSnap = await getDoc(docRef)
        this.goal = { id: docSnap.id, ...docSnap.data() }
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
          title: data.title,
          deadline: data.deadline,
          created_at: new Date(),
          updated_at: new Date(),
        }
        try {
          const colRef = collection(projectFirestore, 'goals')
          const docRef = await addDoc(colRef, newGoal)
          await this.fetchGoal(docRef.id)
          this.goals.push(this.goal)

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
    getGoalDonePercentage(goalId) {
      const { tasks } = useTaskStore()
      const goalTasks = tasks.filter((task) => task.goal === goalId)
      const doneTasks = goalTasks.filter((task) => task.done === true)
      const percentage = Math.round((doneTasks.length / goalTasks.length) * 100)
      return percentage
    },
  },
})
