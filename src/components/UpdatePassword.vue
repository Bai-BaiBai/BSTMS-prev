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
    /**
     * 监听新密码、旧密码的输入，返回错误信息
     * @returns {string}
     */
    msg1: function () {
      // 新旧密码的合法性判断
      if (this.newPassword.length !== 6 || !/^[0-9]+$/.test(this.newPassword) || !/^[0-9]+$/.test(this.oldPassword)) {
        return this.$CONST.TIP_PASSWOR_NUMBERS
      } else {
        // 新旧密码是否不同
        if (this.newPassword === this.oldPassword) {
          return this.$CONST.TIP_OLD_NEW_PASSWORD_NOT_DIFF
        }
        return ''
      }
    },
    /**
     * 监听新密码和重复输入是否相同，返回错误信息
     * @returns {string}
     */
    msg2: function () {
      if (this.newPassword !== this.repeat) {
        return this.$CONST.TIP_REPEAT_PASSWORD_DIFF
      } else {
        return ''
      }
    }
  },
  methods: {
    /**
     * 执行更新密码
     */
    update () {
      // 检查是否存在输入错误
      if (this.msg1 !== '' || this.msg2 !== '') {
        alert(this.$CONST.TIP_ILLEGAL_INPUT + this.msg1 + '; ' + this.msg2)
        return
      }
      // 发送更新密码请求
      this.$api.put('/password', {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          // 如果更细成功，给出弹框提示，否则提示错误信息
          if (response.data.code === 0) {
            alert(this.$CONST.UPDATE_PASSWORD_SUCCESS)
          } else {
            alert(response.data.error)
          }
          this.oldPassword = ''
          this.newPassword = ''
          this.repeat = ''
        } else {
          // 请求失败提示(网络或后台故障)
          alert(this.$CONST.REQUEST_FAILURE)
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
