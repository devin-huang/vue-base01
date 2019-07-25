import { mapState } from 'vuex'

const Mixins = {
  methods: {
    print(ref) {
      let subOutputRankPrint = this.$refs[ref]
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.style.padding = '10px'
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    }
  },
  computed: {
    ...mapState({
      // 项目全局变量
      user: state => state.App.user,
      clientHeight: state => state.App.clientHeight
    })
  }
}

export default Mixins
