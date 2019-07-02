<template>
  <page>
    <div>
      <el-table
        stripe
        border
        v-lazy-render="handelLoadmore"
        :header-row-style="headerRowStyle"
        style="width: 100%"
        :height="tableHeight - 70"
        :data="filteredData"
        :data-size="tableData.length"
      >
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column label="ID">
          <template slot-scope="scope">
            <div>
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.deviceId }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <div>
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right"
        >
          <template slot-scope="scope">
            <div>
              <el-button-group>
                <el-button size="mini">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="pageFooter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[15, 30, 60, 90]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      tableData: [],
      page: {
        total: null,
        num: 1,
        size: 30
      },
      currentStartIndex: 1,
      currentEndIndex: 30
    }
  },
  computed: {
    ...mapState({
      clientHeight: state => state.App.clientHeight,
      tableHeight: state => state.App.tableHeight
    }),
    filteredData () {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false
        } else if (index > this.currentEndIndex) {
          return false
        } else {
          return true
        }
      })
    }
  },
  methods: {
    handelLoadmore (currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex
      this.currentEndIndex = currentEndIndex
    },
    headerRowStyle () {
      return "height:60px"
    },
    async getTableData (param) {
      let params = {
        pageNum: (param && param.num) || this.page.num,
        pageSize: (param && param.size) || this.page.size
      }
      let { error, message, data } = await this.$api.common.findDeviceList(
        params
      )
      this.tableData = data.list
      this.page.total = data.total
      if (error) this.$message.error(message)
      else this.$message.success(message)
    },
    handleSizeChange (size) {
      this.getTableData({
        num: this.page.num,
        size: size
      })
    },
    handleCurrentChange (index) {
      this.getTableData({
        num: index,
        size: this.page.size
      })
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>
section {
  height: 250px;
}
</style>
