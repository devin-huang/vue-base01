<template>
  <section>
    <!-- 一级 -->
    <template v-for="(item, key) in routers">
      <!-- 含有下拉类型 -->
      <el-submenu v-if="hasChildren(item)" :key="key" :index="item.path">
        <template slot="title">
          <!-- 设置根标题也自动跳转对应路由 -->
          <!--<router-link :to="`${item.path}/${item.children[0].path}`">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span> {{ item.name }} </span>-->
          <!--</router-link>-->
          <!--常规-->
          <i class="el-icon-location" />
          <span> {{ item.name }} </span>
        </template>
        <el-menu-item-group
          v-for="(child, index) in item.children"
          :key="index"
        >
          <template slot="title"
            >Group 1</template
          >
          <!--<router-link :to="`${item.path}/${child.path}`"><el-menu-item index="1-1">{{child.name}}</el-menu-item></router-link>-->
          <!-- if -->
          <!-- 递归组件必须有if 与 key/name -->
          <sidebar-item
            v-if="hasChildren(child)"
            :key="child.path"
            :routers="[child]"
          />
          <!-- else -->
          <router-link
            v-else
            :key="child.key"
            :to="`${item.path}/${child.path}`"
          >
            <el-menu-item :index="`${item.path}/${child.path}`">
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 不有下拉类型 -->
      <router-link v-else :key="key" :to="item.path">
        <el-menu-item v-if="item.name" :index="item.path">
          <!-- v-if="item.name用于过滤隐藏的路由 -->
          <i class="el-icon-menu" />
          <span slot="title"> {{ item.name }} </span>
        </el-menu-item>
      </router-link>
    </template>
  </section>
</template>

<script>
export default {
  name: 'Index',
  props: { routers: { type: Array } },
  methods: {
    hasChildren(val) {
      return !!(val.children && val.children.length)
    },
    handleOpen() {},
    handleClose() {}
  }
}
</script>

<style lang="scss" scoped></style>
