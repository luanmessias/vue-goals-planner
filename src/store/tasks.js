import { defineStore } from 'pinia'
import { query, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import projectFirestore from '@/firebase/config'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    task: null,
    loading: false,
    error: null,
  }),
  getters: {
    getAllTasks(state) {
      return state.tasks
    },
    getAllDoneTasks(state) {
      return state.tasks.filter((task) => task.done === true)
    },
    getAllUndoneTasks(state) {
      return state.tasks.filter((task) => task.done === false)
    },
    getAllTasksLength(state) {
      return state.tasks.length
    },
    getAllDoneTasksLength(state) {
      return state.tasks.filter((task) => task.done === true).length
    },
    getAllUndoneTasksLength(state) {
      return state.tasks.filter((task) => task.done === false).length
    },
  },
  actions: {
    async fetchTasks() {
      this.tasks = []
      this.loading = true
      try {
        const res = await getDocs(query(collection(projectFirestore, 'tasks')))
        res.forEach((doc) => {
          this.tasks.push({ id: doc.id, ...doc.data() })
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchTask(id) {
      this.task = []
      this.loading = true
      try {
        const docRef = doc(projectFirestore, 'tasks', id)
        const docSnap = await getDoc(docRef)
        this.task = { id: docSnap.id, ...docSnap.data() }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },
})
