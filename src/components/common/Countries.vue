<template>
  <div>
    <multiselect
      v-model="selected"
      :options="options"
      selectLabel=""
      track-by="value"
      label="text"
    >
    </multiselect>
  </div>
</template>

<script>
/* For more info, see: https://github.com/monterail/vue-multiselect */
import Multiselect from 'vue-multiselect'
const countries = require('./countries.data.js')
export default {
  components: { Multiselect },
  props: ['value'],
  data () {
    return {
      selected: null,
      options: countries
    }
  },
  watch: {
    value: function (val, oldVal) {
      this.selected = countries.find((option) => option.value === val)
    },
    selected: function (val, oldVal) {
      if (typeof (val) !== 'undefined' && val) {
        this.$emit('input', val.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
