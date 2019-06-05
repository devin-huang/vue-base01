export default {
  bind (el, binding) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    document.addEventListener('click', documentHandler)
    el.__vueClickOutside__ = documentHandler
  },
  unbind (el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
