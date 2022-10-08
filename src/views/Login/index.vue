<template>
  <div :class="['login', { 'login--dark': isThemeDarkActive }]">
    <div class="login__container">
      <div class="login__logo">
        <LogoIcon size="96px" />
        <h1 v-text="$t('login.logo.name')" />
      </div>
      <BaseButton :label="$t('login.google')" @click="signWithGoogle">
        <GoogleIcon />
      </BaseButton>
      <span class="login__or" v-text="$t('login.or.text')" />
      <BaseInput
        class="login__email"
        :label="$t('login.form.email')"
        v-model="user.email.text"
        :error="user.email.error"
        type="email"
        @input="checkEmail"
        hideLabel
      />
      <BaseInput
        class="login__password"
        :label="$t('login.form.password')"
        v-model="user.password.text"
        :error="user.password.error"
        type="password"
        @input="checkPassword"
        hideLabel
      />
      <BaseButton
        :label="$t('login.form.submit')"
        class="login__button"
        @click="loginAction"
      />
      <div class="login__acc">
        <span
          class="login__acc__description"
          v-text="$t('login.form.no.account')"
        />
        <span
          class="login__acc__create"
          v-text="$t('login.form.create.account')"
          @click="toggleRegisterFormAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import LogoIcon from './img/LogoIcon'
import GoogleIcon from 'icons/Google'
import BaseInput from '@/components/BaseInput'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { ref } from 'vue'
import { useToggleStore } from '@/store/toggle'
import { storeToRefs } from 'pinia'
import { mailValidator } from '@/utils/MailValidator'
import { passwordValidator } from '@/utils/PasswordValidator'
import { useMessageStore } from '@/store/message'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

export default {
  name: 'LoginPage',
  components: {
    BaseButton,
    LogoIcon,
    GoogleIcon,
    BaseInput,
  },
  setup() {
    const { isThemeDarkActive } = storeToRefs(useToggleStore())
    const { toggleRegisterForm } = useToggleStore()
    const { setMessage } = useMessageStore()
    const { setUser } = useUserStore()
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

    const signWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(token, user)
      })
    }

    const loginAction = () => {
      const auth = getAuth()
      const { email, password } = user.value
      if (checkEmail() && checkPassword()) {
        signInWithEmailAndPassword(auth, email.text, password.text)
          .then((userCredential) => {
            setUser(userCredential.user)
            setMessage({
              active: true,
              text: 'login.form.success',
              error: false,
            })
            router.push({ name: 'home' })
          })
          .catch((error) => {
            const errorCode = error.code

            if (errorCode === 'auth/user-not-found') {
              email.error = 'login.form.user.not.found'
              return
            }

            if (errorCode === 'auth/wrong-password') {
              password.error = 'login.form.wrong.password'
              return
            }

            if (errorCode === 'auth/user-disabled') {
              email.error = 'login.form.user.disabled'
              return
            }

            setMessage({
              active: true,
              text: 'register.form.error.generic',
              error: true,
            })
          })
      }
    }

    return {
      signWithGoogle,
      user,
      checkEmail,
      checkPassword,
      toggleRegisterFormAction,
      isThemeDarkActive,
      loginAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
