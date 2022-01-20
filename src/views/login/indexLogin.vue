<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="form"
      :model="user"
      size="medium"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
          class="login-logo"
          :src="logoSrc"
          alt="拉勾心选"
        >
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            class="imgcode"
            alt="验证码"
            :src="captchaSrc"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCaptcha, getLoginInfo, login } from '@/api/common'
import type { IElForm, IFormRule } from '@/types/element-plus'
// import { ElForm } from 'element-plus'
import { store } from '@/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const form = ref<IElForm | null>(null)
// const form = ref <InstanceType<typeof ElForm> | null>(null) // 会与模板中的ref 对应
const logoSrc = ref('')
const captchaSrc = ref('')
const user = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})
const loading = ref(false)
// <IFormRule>
const rules = ref<IFormRule>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})

onMounted(() => {
  loadLogo()
  loadCaptcha()
})

// 获取验证码
const loadCaptcha = async () => {
  const data = await getCaptcha()
  console.log(data)
  captchaSrc.value = URL.createObjectURL(data)
}
// logo获取
const loadLogo = async () => {
  const data = await getLoginInfo()
  logoSrc.value = data.login_logo
  // logoSrc.value
}

const handleSubmit = async () => {
  // 表单验证
  const valid = await form.value?.validate()
  if (!valid) {
    return false
  }

  // // 验证通过，展示 loading
  loading.value = true

  // // 请求提交
  const data = await login(user).catch(() => {
    loadCaptcha() // 刷新验证码
  }).finally(() => {
    loading.value = false
  })
  console.log('登录', data)

  if (!data) return

  ElMessage.success('登录成功')

  // // 存储登录用户信息
  store.commit('setUser', {
    ...data.user_info,
    token: data.token
  })

  store.commit('setMenus', data.menus)

  // // 跳转回原来页面
  let redirect = route.query.redirect
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect)
}

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
