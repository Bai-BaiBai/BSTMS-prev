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
    usernameMsg: function () {
      if (this.username === '') {
        return '请输入姓名'
      } else {
        return ''
      }
    },
    idNumbersMsg: function () {
      if (this.idNumbers === '' || this.idNumbers.length !== 18 || !/^[0-9]+$/.test(this.idNumbers)) {
        return '请输入18位身份证号'
      } else {
        return ''
      }
    },
    phoneMsg: function () {
      if (this.phone === '' || !/^[0-9]+$/.test(this.phone)) {
        return '请输入手机号'
      } else {
        return ''
      }
    },
    passwordMsg: function () {
      if (this.password === '' || this.password.length !== 6 || !/^[0-9]+$/.test(this.password)) {
        return '请输入6位数字密码'
      } else {
        return ''
      }
    },
    repeatMsg: function () {
      if (this.repeat !== this.password) {
        return '两次输入不一致'
      } else {
        return ''
      }
    }
  },
  methods: {
    verifyUser () {
      if (this.username === '' || this.idNumbers === '' || this.phone === '') {
        alert('请输入完整的身份信息')
        return
      }
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
    execute () {
      if (this.usernameMsg !== '' || this.idNumbersMsg !== '' || this.phoneMsg !== '' || this.verifyMsg !== '' || this.passwordMsg !== '' || this.repeatMsg !== '') {
        alert('非法的输入：' + this.usernameMsg + ' ' + this.idNumbersMsg + ' ' + this.phoneMsg + ' ' + this.verifyMsg + ' ' + this.passwordMsg + ' ' + this.repeatMsg)
        return
      }
      this.$api.post('/createAccount', {
        idNumbers: this.idNumbers,
        password: this.password,
        cardType: this.cardType
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          if (response.data.code === 0) {
            // eslint-disable-next-line no-undef
            alert('开户成功，银行卡号为：' + (BigInt(response.data.data.cardId)).toLocaleString())
          } else {
            alert(response.data.error)
          }
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
