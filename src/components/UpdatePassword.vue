<template>
  <div>
    <div>输入旧密码</div>
    <input type="text" v-model="oldPassword">
    <div>输入新密码<label>{{msg1}}</label></div>
    <input type="password" v-model="newPassword">
    <div>再次输入密码<label>{{msg2}}</label></div>
    <input type="password" v-model="repeat">
    <div>
      请输入预留手机号接收的验证码:
      <br>
      <input type="text" v-model="validateCode">
      <button @click="countDown()" :class="{disabled: !this.canClick}">{{content}}</button>
    </div>
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
      repeat: '',
      content: '发送验证码',
      totalTime: 60,
      validateCode: '',
      canClick: true
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
        this.$message.error(this.$CONST.TIP_ILLEGAL_INPUT + this.msg1 + '; ' + this.msg2)
        return
      }
      if (this.validateCode === '') {
        this.$message.error('请输入验证码')
        return
      }
      // TODO 清空倒计时
      // 发送更新密码请求
      this.$api.put('/password', {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword,
        validateCode: this.validateCode
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          // 如果更细成功，给出弹框提示，否则提示错误信息
          if (response.data.code === 0) {
            this.$message.success(this.$CONST.UPDATE_PASSWORD_SUCCESS)
          } else {
            this.$message.error(response.data.error)
          }
          this.oldPassword = ''
          this.newPassword = ''
          this.repeat = ''
          this.validateCode = ''
        } else {
          // 请求失败提示(网络或后台故障)
          this.$message.warning(this.$CONST.REQUEST_FAILURE)
        }
      })
    },
    countDown () {
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + '秒后重新发送'
      // eslint-disable-next-line no-unused-vars
      let clock = window.setInterval(() => {
        // eslint-disable-next-line no-unused-expressions
        this.totalTime--
        this.content = this.totalTime + '秒后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true
        }
      }, 1000)
      this.$api.get('/sendsms', {}, response => {
      })
    }
  }
}
</script>

<style scoped>
  label{
    color: red;
  }
  .disabled{
    background-color: #dddddd;
    border-color: #dddddd;
    color: #57a3f3;
    cursor: not-allowed;
  }
</style>
