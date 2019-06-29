<template>
  <div>
    <div>输入旧密码</div>
    <input type="text" v-model="oldPassword">
    <div>输入新密码<label>{{msg1}}</label></div>
    <input type="password" v-model="newPassword">
    <div>再次输入密码<label>{{msg2}}</label></div>
    <input type="password" v-model="repeat">
    <div><button @click="update()">提交</button></div>
  </div>
</template>

<script>
export default {
  name: 'UpdatePassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      repeat: ''
    }
  },
  computed: {
    msg1: function () {
      if (this.newPassword.length !== 6 || !/^[0-9]+$/.test(this.newPassword) || !/^[0-9]+$/.test(this.oldPassword)) {
        return '请输入六位数字密码'
      } else {
        if (this.newPassword === this.oldPassword) {
          return '新密码不能与旧密码相同'
        }
        return ''
      }
    },
    msg2: function () {
      if (this.newPassword !== this.repeat) {
        return '两次密码输入不一致'
      } else {
        return ''
      }
    }
  },
  methods: {
    update () {
      if (this.msg1 !== '' || this.msg2 !== '') {
        alert('非法的输入：' + this.msg1 + '; ' + this.msg2)
        return
      }
      this.$api.put('/password', {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.code === 0) {
            alert('更新成功')
          } else {
            alert('密码错误，更新失败')
          }
          this.oldPassword = ''
          this.newPassword = ''
          this.repeat = ''
        } else {
          alert('请求失败，请稍后重试')
        }
      })
    }
  }
}
</script>

<style scoped>
  label{
    color: red;
  }
</style>
