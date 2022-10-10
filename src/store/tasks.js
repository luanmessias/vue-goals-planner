import { defineStore } from 'pinia'
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  where,
} from 'firebase/firestore'
import projectFirestore from '@/firebase/config'
import { useMessageStore } from './message'
import { useFilterStore } from './filter'
import { useToggleStore } from './toggle'
import { useGoalStore } from './goals'
import { useUserStore } from './user'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    task: null,
    editTask: null,
    delTask: null,
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
    getAllDoneTasksLength(state) {
      return state.tasks.filter((task) => task.done).length
    },
  },
  actions: {
    async fetchTasks() {
      const { user } = useUserStore()
      this.tasks = []
      this.loading = true
      try {
        const q = query(
          collection(projectFirestore, 'tasks'),
          where('user', '==', user.uid)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
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
      const { user } = useUserStore()
      const { toggleTaskForm } = useToggleStore()
      const { updateFilters } = useFilterStore()
      const { setMessage } = useMessageStore()
      const alreadyExists = this.tasks.some(
        ({ title, goal }) => title === data.title && goal === data.goal
      )

      if (alreadyExists) {
        setMessage({
          active: true,
          text: 'add.task.form.error.exists',
          error: true,
        })
      } else {
        const newTask = {
          title: data.title,
          description: data.description,
          user: user.uid,
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
          toggleTaskForm()
        } catch (error) {
          this.error = error
        }
      }
    },
    async updateTask(data) {
      const { toggleEditTaskForm } = useToggleStore()
      const { updateFilters } = useFilterStore()
      const { setMessage } = useMessageStore()
      const alreadyExists = this.tasks.some(({ title }) => title === data.title)

      if (alreadyExists) {
        setMessage({
          active: true,
          text: 'task.form.error.exists',
          error: true,
        })
      } else {
        try {
          const updatedTask = {
            ...data,
            updated_at: new Date(),
          }
          await setDoc(doc(projectFirestore, 'tasks', data.id), updatedTask, {
            merge: true,
          })
          const taskIndex = this.tasks.findIndex((t) => t.id === data.id)
          this.tasks[taskIndex] = updatedTask
          updateFilters(data.goal)
          setMessage({
            active: true,
            text: 'update.task.form.success',
            error: false,
          })
          toggleEditTaskForm()
        } catch (error) {
          this.error = error
        }
      }
    },
    async deleteTask() {
      const { setMessage } = useMessageStore()
      const { updateFilters } = useFilterStore()
      const task = this.delTask
      try {
        await deleteDoc(doc(projectFirestore, 'tasks', task.id))
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id)
        this.tasks.splice(taskIndex, 1)
        updateFilters(task.goal)
        setMessage({
          active: true,
          text: 'delete.task.form.success',
          error: false,
        })
      } catch (error) {
        this.error = error
      }
    },
    async clearUnusedTasks() {
      const { updateFilters } = useFilterStore()
      const { goals } = useGoalStore()
      try {
        this.tasks.map(async (task) => {
          const goal = goals.some((goal) => goal.id === task.goal)
          if (!goal) {
            await deleteDoc(doc(projectFirestore, 'tasks', task.id))
            const taskIndex = this.tasks.findIndex((t) => t.id === task.id)
            this.tasks.splice(taskIndex, 1)
            updateFilters(task.goal)
          }
        })
      } catch (error) {
        this.error = error
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
    setEditTask(taskId) {
      const task = this.tasks.find((task) => task.id === taskId)
      this.editTask = { ...task }
    },
    clearEditTask() {
      this.editTask = null
    },
    setDelTask(taskId) {
      const task = this.tasks.find((task) => task.id === taskId)
      this.delTask = { ...task }
    },
    clearDelTask() {
      this.delTask = null
    },
  },
})
