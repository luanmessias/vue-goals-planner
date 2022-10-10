<template>
  <Teleport to="#modal">
    <transition name="register__animate">
      <div
        v-if="isRegisterFormActive"
        :class="['register', { 'register--dark': isThemeDarkActive }]"
      >
        <div class="register__container">
          <div class="register__header">
            <div
              class="register__header__return"
              @click="toggleRegisterFormAction"
            >
              <ArrowLeft />
            </div>
            <h1
              class="register__header__title"
              v-text="$t('register.form.title')"
            />
          </div>

          <BaseInput
            class="register__field register__field--email"
            :label="$t('login.form.email')"
            v-model="user.email.text"
            :error="user.email.error"
            type="email"
            @input="checkEmail"
            hideLabel
          />
          <BaseInput
            class="register__field register__field--password"
            :label="$t('login.form.password')"
            v-model="user.password.text"
            :error="user.password.error"
            type="password"
            @input="checkPassword"
            hideLabel
          />
          <BaseButton
            @click="registerAction"
            :label="$t('register.form.submit')"
            class="register__add-button"
          />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/store/toggle'
import ArrowLeft from 'icons/ArrowLeft.vue'
import BaseInput from '@/components/BaseInput'
import { mailValidator } from '@/utils/MailValidator'
import { passwordValidator } from '@/utils/PasswordValidator'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useMessageStore } from '@/store/message'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  components: {
    BaseButton,
    ArrowLeft,
    BaseInput,
  },
  setup() {
    const { isThemeDarkActive, isRegisterFormActive } = storeToRefs(
      useToggleStore()
    )
    const { toggleRegisterForm } = useToggleStore()
    const { setMessage } = useMessageStore()
    const router = useRouter()
    const user = ref({
      email: {
        text: '',
        error: '',
      },
      password: {
        text: '',
        error: '',
      },
    })

    const clearForm = () => {
      user.value.email.text = ''
      user.value.email.error = ''
      user.value.password.text = ''
      user.value.password.error = ''
    }

    const toggleRegisterFormAction = () => {
      toggleRegisterForm()
      clearForm()
    }

    const checkEmail = () => {
      const { email } = user.value
      if (!email.text) {
        email.error = 'login.form.email.required'
        return false
      }
      if (!mailValidator(email.text)) {
        email.error = 'login.form.email.invalid'
        return false
      }
      email.error = ''
      return true
    }

    const checkPassword = () => {
      const { password } = user.value
      if (!password.text) {
        password.error = 'login.form.password.required'
        return false
      }
      if (!passwordValidator(password.text)) {
        password.error = 'login.form.password.invalid'
        return false
      }
      password.error = ''
      return true
    }

    const registerAction = () => {
      const { email, password } = user.value
      if (checkEmail() && checkPassword()) {
        createUserWithEmailAndPassword(getAuth(), email.text, password.text)
          .then(() => {
            toggleRegisterFormAction()
            setMessage({
              active: true,
              text: 'register.form.success',
              error: false,
            })
            router.push({ name: 'home' })
          })
          .catch((error) => {
            const errorCode = error.code

            if (errorCode === 'auth/email-already-in-use') {
              email.error = 'register.form.email.already.in.use'
              return
            } else {
              setMessage({
                active: true,
                text: 'register.form.error.generic',
                error: true,
              })
            }
          })
      }
    }

    return {
      isThemeDarkActive,
      isRegisterFormActive,
      toggleRegisterFormAction,
      user,
      checkEmail,
      checkPassword,
      registerAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
