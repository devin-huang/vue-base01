<template>
  <section class="about">
    <!--<h4>Permission</h4>-->
    <!--<el-button type="primary" v-if="operationPermission">通过权限控制是否能操作该按钮: {{permission}}</el-button>-->
    <h4>UER THE NATIVE API GET DATA ( 使用原生API方式获取数据 )</h4>
    <el-select v-model="value1">
      <el-option
        v-for="(item, index) in useNativeAPIGetData"
        :key="index"
        :class="{ danger: item.id == -1 }"
        :value="item.id"
        >{{ item }}</el-option
      >
    </el-select>

    <h4>UER VUEX GET DATA ( 使用VUEX方式获取数据 )</h4>
    <el-select v-model="value2">
      <el-option
        v-for="(item, index) in userList"
        :key="index"
        :class="{ danger: item.id == -1 }"
        :value="item.id"
        >{{ item }}</el-option
      >
    </el-select>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import permission from './permission'
export default {
  name: 'Api',
  mixins: [permission],
  props: {
    msg: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      value1: null,
      value2: null,
      useNativeAPIGetData: null
    }
  },
  computed: {
    ...mapState({
      permission: state => state.Permission.permission,
      // 'userList': state => state.Common.userList,
      deviceList: state => state.Common.deviceList,
      deviceSeriesList: state => state.Common.deviceSeriesList,
      userList: state => {
        // NOT GET THIS IN mapState (在mapState中使用this无法获取到vue对象,建议使用api获取数据方式整理)
        let list = state.Common.userList
        list.unshift({ id: '-1', loginName: 'Meoo', name: 'Meoo' })
        return list
      }
    })
  },
  async created() {
    this.getNativeApiData()
    this.getVuexData()

    // Test New Http Method Get API
    // 使用新得http方法获取Api得测试
    this.findDeviceList({ pageNum: 0 })
    this.getDeviceSeriesListByBrandId(60)
    this.deleteAddress(60)
  },
  methods: {
    ...mapActions('Common', [
      'findUserList',
      'findDeviceList',
      'getDeviceSeriesListByBrandId'
    ]),
    ...mapActions('Address', ['deleteAddress']),
    // ACCORDING TO THE NATIVE API GET DATA (使用原生API方式获取数据)
    async getNativeApiData() {
      let { error, message, data } = await this.$api.common.findUserList()
      data.unshift({ id: '-1', loginName: 'Me', name: 'Me' })
      this.useNativeAPIGetData = data
      if (error) {
        this.$message.error(message)
      } else this.$message.success(message)
    },
    // ACCORDING TO THE VUEX GET DATA (使用VUEX获取数据)
    async getVuexData() {
      let { error, message } = await this.findUserList()
      error ? this.$message.error(message) : this.$message.success(message)
    }
  }
}
</script>
<style lang="scss" scoped>
.about {
  width: 35%;
  margin: 0 auto;
  text-align: left;
}
.danger {
  color: darkred;
}
</style>
