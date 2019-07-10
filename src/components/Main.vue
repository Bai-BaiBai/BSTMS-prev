<template>
  <div>
<!--      退卡直接返回login
      <router-link :to="{name: 'Balance'}">查询余额</router-link>
      <router-link :to="{name: 'UpdatePassword'}">修改密码</router-link>
      <router-link :to="{name: 'SaveMoney'}">存款</router-link>
      <router-link :to="{name: 'GetMoney'}">取款</router-link>
      <router-link :to="{name: 'Transfer'}">转账</router-link>
      <router-link :to="{name: 'ExchangeCurrency'}">货币交易</router-link>
      <router-link :to="{name: 'Main'}">返回主页面</router-link>
      <button @click="logout()">退卡</button>
      <router-view />
      -->
    <div style="position: relative; left: 450px">
      <el-menu
        router
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/main/balance">
          查询余额
        </el-menu-item>
        <el-menu-item index="/main/updatePassword">
          修改密码
        </el-menu-item>
        <el-menu-item index="/main/saveMoney">
          存款
        </el-menu-item>
        <el-menu-item index="/main/getMoney">
          取款
        </el-menu-item>
        <el-menu-item index="/main/transfer">
          转账
        </el-menu-item>
        <el-menu-item index="/main/exchangeCurrency">
          货币交易
        </el-menu-item>
        <el-menu-item index="/main">
          返回主页面
        </el-menu-item>
        <el-menu-item style="padding: 0">
          <button @click="logout()" style="background-color:#545c64; height: 104%">退卡</button>
        </el-menu-item>
      </el-menu>
    </div>
    <br>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    /**
     * 执行退卡
     */
    logout () {
      // 发送退卡请求，成功给出提示，并返回到登录页面
      this.$api.get('/logout', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          this.$router.push('/')
          this.$message.success(this.$CONST.LOGOUT_SUCCESS)
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

</style>
