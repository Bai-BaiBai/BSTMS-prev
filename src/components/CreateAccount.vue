<template>
  <div>
    <div>姓名<label>{{verifyMsg}}</label></div>
    <input placeholder="预留姓名" type="text" v-model="username"><label>{{usernameMsg}}</label>
    <div>身份证号</div>
    <input placeholder="预留身份证号" type="text" v-model="idNumbers"><label>{{idNumbersMsg}}</label>
    <div>手机号</div>
    <input placeholder="预留手机号" type="text" v-model="phone" @blur="verifyUser()"><label>{{phoneMsg}}</label>
    <div>开户类型</div>
    <select v-model="cardType">
      <option value="1">借记卡</option>
      <option value="2">信用卡</option>
    </select>
    <div>输入密码</div>
    <input type="password" v-model="password"><label>{{passwordMsg}}</label>
    <div>再次输入密码</div>
    <input type="password" v-model="repeat"><label>{{repeatMsg}}</label>
    <button @click="execute()">注册</button>
    <router-link :to="{name: 'Login'}">退出</router-link>
    <div v-show="showFlag">获得的卡号：{{newCardId}}</div>
  </div>
</template>

<script>
export default {
  name: 'CreateAccount',
  data () {
    return {
      username: '',
      idNumbers: '',
      phone: '',
      cardType: '1',
      password: '',
      repeat: '',
      showFlag: false,
      newCardId: '',
      verifyMsg: ''
    }
  },
  computed: {
    /**
     * 监听用户姓名的填写，如果未填写，给出提示
     * @returns {string}
     */
    usernameMsg: function () {
      if (this.username === '') {
        return this.$CONST.TIP_NAME_INPUT
      } else {
        return ''
      }
    },
    /**
     * 监听用户身份证号的填写，如果未填写或填写不正确，给出提示
     * @returns {string}
     */
    idNumbersMsg: function () {
      if (this.idNumbers === '' || this.idNumbers.length !== 18 || !/^[0-9]+$/.test(this.idNumbers)) {
        return this.$CONST.TIP_ID_CARD_NUMBERS
      } else {
        return ''
      }
    },
    /**
     * 监听用户手机号的填写，如果未填写或填写不正确，给出提示
     * @returns {string}
     */
    phoneMsg: function () {
      if (this.phone === '' || !/^[0-9]+$/.test(this.phone)) {
        return this.$CONST.TIP_PHONE_NUMBERS
      } else {
        return ''
      }
    },
    /**
     * 监听用户密码的输入，限制密码输入为 6 位数字，否则给出提示
     * @returns {string}
     */
    passwordMsg: function () {
      if (this.password === '' || this.password.length !== 6 || !/^[0-9]+$/.test(this.password)) {
        return this.$CONST.TIP_PASSWOR_NUMBERS
      } else {
        return ''
      }
    },
    /**
     * 监听重复密码的输入，如果两次密码输入不一致，给出提示
     * @returns {string}
     */
    repeatMsg: function () {
      if (this.repeat !== this.password) {
        return this.$CONST.TIP_REPEAT_PASSWORD_DIFF
      } else {
        return ''
      }
    }
  },
  methods: {
    /**
     * 在焦点离开手机号输入框时，触发认证用户信息
     */
    verifyUser () {
      // 当输入姓名、身份证号、手机号不合法时，给出弹框提示，并返回
      if (this.username === '' || this.idNumbers === '' || this.phone === '') {
        this.$message.error(this.$CONST.TIP_NON_COMPLETE_INFORMATION)
        return
      }
      // 三项输入合法时，发生用户信息认证请求
      // 如果未通过认证，数据库中不存在该用户、或信息填写有误，给出“无效用户”的提示
      this.$api.post('/verifyUser', {
        idNumbers: this.idNumbers,
        username: this.username,
        phone: this.phone
      }, response => {
        const data = response.data
        if (data.code === 1) {
          this.verifyMsg = data.error
        } else {
          this.verifyMsg = ''
        }
      })
    },
    /**
     * 执行注册功能
     */
    execute () {
      // 检查页面中的所有输入是否合法，不合法则给出弹框提示并返回
      if (this.usernameMsg !== '' || this.idNumbersMsg !== '' || this.phoneMsg !== '' || this.verifyMsg !== '' || this.passwordMsg !== '' || this.repeatMsg !== '') {
        this.$message.error(this.$CONST.TIP_ILLEGAL_INPUT + this.usernameMsg + ' ' + this.idNumbersMsg + ' ' + this.phoneMsg + ' ' + this.verifyMsg + ' ' + this.passwordMsg + ' ' + this.repeatMsg)
        return
      }
      // 均合法时，发送创建账户请求，参数为身份证号、密码、卡类型
      this.$api.post('/createAccount', {
        idNumbers: this.idNumbers,
        password: this.password,
        cardType: this.cardType
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          // 如果开户成功，给出新的银行卡号
          if (response.data.code === 0) {
            // eslint-disable-next-line no-undef
            this.$message.success(this.$CONST.CREATE_ACCOUNT_SUCCESS + response.data.data.cardIdString)
          } else {
            this.$message.error(response.data.error)
          }
        } else {
          // 请求失败提示(网络或后台故障)
          this.$message.warning(this.$CONST.REQUEST_FAILURE)
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
