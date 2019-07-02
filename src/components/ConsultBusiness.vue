<template>
  <div>
    <div>
      编号&emsp;&emsp; &emsp; &emsp; 产品名称&emsp;&emsp; &emsp; &emsp; &emsp;  &emsp;产品描述&emsp;&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  &emsp; 截至期限
    </div>
    <hr>
    <div>
      <ul>
        <li v-for="(item, index) of businessInfoList" :key="index">
          {{item.businessId}}-----{{item.businessType}}-----{{item.businessDescription}}-----{{item.businessDate}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultBusiness',
  data () {
    return {
      businessInfoList: []
    }
  },
  /**
   * 页面加载时发生查询全部理财产品请求
   */
  mounted () {
    this.$api.get('/businessInfo', {}, response => {
      const data = response.data.data
      for (var i = 0; i < data.length; i++) {
        this.businessInfoList.push(data[i])
      }
    })
  }
}
</script>

<style scoped>

</style>
