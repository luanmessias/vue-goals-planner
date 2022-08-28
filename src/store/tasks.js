import { defineStore } from 'pinia'
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from 'firebase/firestore'
import projectFirestore from '@/firebase/config'
import { useMessageStore } from './message'
import { useFilterStore } from './filter'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    task: null,
    filteredTasks: null,
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
      const { updateFilters } = useFilterStore()
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
          done: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
        try {
          const colRef = collection(projectFirestore, 'tasks')
          const docRef = await addDoc(colRef, newTask)
          await this.fetchTask(docRef.id)
          this.tasks.push(this.task)
          updateFilters(data.goal)

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
    async toggleTaskDone(task) {
      const { updateFilters } = useFilterStore()
      const { id, done } = task
      const { setMessage } = useMessageStore()
      try {
        const updatedTask = {
          ...task,
          done: done ? false : true,
          updated_at: new Date(),
        }
        await setDoc(doc(projectFirestore, 'tasks', id), updatedTask, {
          merge: true,
        })
        const taskIndex = this.tasks.findIndex((t) => t.id === id)
        this.tasks[taskIndex] = updatedTask
        updateFilters(updatedTask.goal)
        setMessage({
          active: true,
          text: 'update.task.form.success',
          error: false,
        })
      } catch (error) {
        this.error = error
      }
    },
  },
})
