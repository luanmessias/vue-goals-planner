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
import { sortArrayByDate } from '@/utils/DateArraySorter'

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
    getAllGoalTasks(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter((task) => task.goal === goalId)
        this.filteredTasks = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllGoalTasksLength(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter((task) => task.goal === goalId)
        return filteredData.length
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllToDoGoalTasks(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter(
          (task) => task.goal === goalId && task.done === false
        )
        this.filteredTasks = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllToDoGoalTasksLength(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter(
          (task) => task.goal === goalId && task.done === false
        )
        return filteredData.length
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllDoneGoalTasks(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter(
          (task) => task.goal === goalId && task.done === true
        )
        this.filteredTasks = sortArrayByDate(filteredData, true)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    getAllDoneGoalTasksLength(goalId) {
      this.loading = true
      try {
        const filteredData = this.tasks.filter(
          (task) => task.goal === goalId && task.done === true
        )
        return filteredData.length
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
          done: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
        try {
          const colRef = collection(projectFirestore, 'tasks')
          const docRef = await addDoc(colRef, newTask)
          await this.fetchTask(docRef.id)
          this.tasks.push(this.task)
          this.getAllGoalTasks(newTask.goal)

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
