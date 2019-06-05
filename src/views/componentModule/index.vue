<template>
  <section>
    <tab>
      <ul>
        <li
          :class="{ active: item.name == activeName }"
          :key="index"
          v-for="(item, index) in tabList"
          @click="handleTabTitleClick(item.name)"
        >
          {{ item.label }}
        </li>
      </ul>
      <template slot="tabContent">
        <div :is="activeName"></div>
        <!--通过is加载指定组件-->
      </template>
    </tab>
  </section>
</template>

<script>
import Tab from '@/components/CustomeTab'
import dnUtils from '@/views/componentModule/tpls/utils'
import dnComponent from '@/views/componentModule/tpls/component'
import dnTable from '@/views/componentModule/tpls/table'


export default {
  name: 'index',
  components: {Tab, dnUtils, dnComponent, dnTable},
  data () {
    return {
      activeName: 'dnUtils',
      tabList: [
        {
          label: 'Utils',
          name: 'dnUtils'
        },
        {
          label: 'Table',
          name: 'dnTable'
        },
        {
          label: 'Component',
          name: 'dnComponent'
        }
      ],
      // 作用域插槽
      typeList: [
        {
          name: 'Clothing',
          data: [
            {name: 'adidas', color: 'blue', size: 24},
            {name: 'nike', color: 'yellow', size: 12},
            {name: 'under', color: 'white', size: 50}
          ]
        },
        {
          name: 'car',
          data: [
            {name: 'Toyota', type: 'small', seat: 5, color: 'black'},
            {name: 'HONDA', type: 'big', seat: 7, color: 'gold'}
          ]
        }
      ]
    }
  },
  methods: {
    handleTabTitleClick (val) {
      this.activeName = val
    }
  }
}
</script>

<style scoped></style>
