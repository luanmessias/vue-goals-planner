import { defineStore } from 'pinia'
import { useMessageStore } from '@/store/message'
import { useTaskStore } from '@/store/tasks'
import { useToggleStore } from '@/store/toggle'
import {
  query,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'
import projectFirestore from '@/firebase/config'

export const useGoalStore = defineStore('goal', {
  state: () => ({
    goals: [],
    goal: null,
    delGoal: null,
    editGoal: null,
    loading: false,
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
    goalAlreadyExists(goalTitle) {
      const alreadyExists = this.goals.some(({ title }) => title === goalTitle)
      return alreadyExists
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
    async updateGoal(data) {
      const { toggleEditGoalForm } = useToggleStore()
      const { setMessage } = useMessageStore()
      const alreadyExists =
        this.goals.some(({ title }) => title === data.title) &&
        data.title !== this.editGoal.title

      if (alreadyExists) {
        setMessage({
          active: true,
          text: 'add.goal.form.error.exists',
          error: true,
        })
      } else {
        const updatedGoal = {
          ...data,
          updated_at: new Date(),
        }
        try {
          await setDoc(doc(projectFirestore, 'goals', data.id), updatedGoal, {
            merge: true,
          })
          const goalIndex = this.goals.findIndex((goal) => goal.id === data.id)
          this.goals[goalIndex] = updatedGoal
          this.setGoal(updatedGoal.id)
          setMessage({
            active: true,
            text: 'update.goal.form.success',
            error: false,
          })
          toggleEditGoalForm()
        } catch (error) {
          this.error = error
        }
      }
    },
    async deleteGoal() {
      const { setMessage } = useMessageStore()
      const { clearUnusedTasks } = useTaskStore()
      const goal = this.delGoal
      try {
        await deleteDoc(doc(projectFirestore, 'goals', goal.id))
        const goalIndex = this.goals.findIndex((g) => g.id === goal.id)
        this.goals.splice(goalIndex, 1)
        clearUnusedTasks()
      } catch (error) {
        this.error = error
      } finally {
        setMessage({
          active: true,
          text: 'delete.goal.success',
          error: false,
        })
      }
    },
    getGoalDonePercentage(goalId) {
      const { tasks } = useTaskStore()
      const goalTasks = tasks.filter((task) => task.goal === goalId)
      const doneTasks = goalTasks.filter((task) => task.done === true)
      const percentage = Math.round((doneTasks.length / goalTasks.length) * 100)
      return percentage
    },
    setGoal(goalId) {
      this.goal = this.goals.find((goal) => goal.id === goalId)
    },
    setDelGoal(goalId) {
      const goal = this.goals.find((goal) => goal.id === goalId)
      this.delGoal = { ...goal }
    },
    clearDelGoal() {
      this.delGoal = null
    },
    setEditGoal(goalId) {
      const goal = this.goals.find((goal) => goal.id === goalId)
      this.editGoal = { ...goal }
    },
    clearEditGoal() {
      this.editGoal = null
    },
  },
})
