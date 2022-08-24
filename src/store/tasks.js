import { defineStore } from 'pinia'
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from 'firebase/firestore'
import projectFirestore from '@/firebase/config'
import { useMessageStore } from './message'

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
    getAllTasksLength(state) {
      return state.tasks.length
    },
    getAllDoneTasks(state) {
      return state.tasks.filter((task) => task.done)
    },
    getAllDoneTasksLength(state) {
      return state.tasks.filter((task) => task.done).length
    },
    getAllGoalTasks(state, goalId) {
      return state.tasks.filter((task) => task.goal === goalId)
    },
    getAllGoalTasksLength(state, goalId) {
      return state.tasks.filter((task) => task.goal === goalId).length
    },
    getToDoGoalTasks(state, goalId) {
      return state.tasks.filter(
        (task) => task.goal === goalId && task.done === false
      )
    },
    getTodoGoalTasksLength(state, goalId) {
      return state.tasks.filter(
        (task) => task.goal === goalId && task.done === false
      ).length
    },
    getDoneGoalTasks(state, goalId) {
      return state.tasks.filter(
        (task) => task.goal === goalId && task.done === true
      )
    },
    getDoneGoalTasksLength(state, goalId) {
      return state.tasks.filter(
        (task) => task.goal === goalId && task.done === true
      ).length
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
    async addTask(data) {
      const { setMessage } = useMessageStore()
      const tasks = [...this.getAllTasks]
      const alreadyExists = tasks.some(({ title }) => title === data.title)

      if (alreadyExists) {
        setMessage({
          active: true,
          error: true,
          message: 'add.task.form.error.exists',
        })
      } else {
        const newTask = {
          title: data.title,
          description: data.description,
          goal: data.goal,
          created_at: new Date(),
          updated_at: new Date(),
        }
        try {
          const colRef = collection(projectFirestore, 'tasks')
          const docRef = await addDoc(colRef, newTask)
          await this.fetchTask(docRef.id)
          this.tasks.push(this.task)

          setMessage({
            active: true,
            text: 'add.task.form.success',
            error: false,
          })
        } catch (error) {
          this.error = error
        }
      }
    },
  },
})
