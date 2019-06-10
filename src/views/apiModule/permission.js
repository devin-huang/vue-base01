export default {
  data () {
    return {
      operationPermission: false
    }
  },
  async created () {
    this.operationPermission = await this.$permission('api:edit');
    console.log(this.operationPermission, 'permission');
  }
};
