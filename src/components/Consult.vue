<template>
  <div>
    <div>
      <router-link :to="{name: 'ConsultBusiness'}">理财产品</router-link>
      <router-link :to="{name: 'ConsultRate'}">外汇汇率</router-link>
      <router-view/>
    </div>
<!--    退出到登录页面-->
    <div>
      <router-link :to="{name: 'Login'}">退出</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultBusiness'
}
</script>

<style scoped>

</style>
