<template>
<div 
  class="address-modal modal fade"
  tabindex="-1" 
  role="dialog" 
  aria-labelledby="myModalLabel" 
  aria-hidden="true"
  @keyup.esc="close()">
>
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
              <h4>Add Address</h4>
              <button type="button" class="close" @click="close()" aria-hidden="true">
                <i class="fa fa-close"></i>
              </button>
          </div>
          <div class="modal-body">
            <spinner v-if="isSaving" message="Saving..."></spinner> 
            <div class="container"> 
              <div class=" col-lg-6 offset-lg-3 col-md-12">
                <form>
                  <div class="form-group">
                    <input class="form-control" placeholder="Line1" id="js-address-modal__addressLine1" v-model="address.addressLine1">
                  </div>
                  <div class="form-group">
                    <input class="form-control" placeholder="Line2" id="js-address-modal__addressLine2" v-model="address.addressLine2">
                  </div>
                  <div class="form-group">
                    <input class="form-control" placeholder="State/Province" id="js-address-modal__state" v-model="address.state">
                  </div>
                  <div class="form-group">
                    <countries v-model="address.country"></countries>
                  </div>
                  <div class="form-group">
                    <input placeholder="Postal Code" class="form-control" id="js-address-modal__zipcode" v-model="address.zipcode">
                  </div>
                </form>
                <button type="button" class="btn btn-primary solid blank" @click="save">
                  <i class="mdi mdi-content-save'"></i>
                  Save changes
                </button>                
              </div>      
            </div>    
          </div>
        </div>
    </div>
</div>
</template>

<script>
import Spinner from '../common/Spinner.vue'
import Countries from '../common/Countries.vue'

export default {
  name: 'addressModal',
  components: { Spinner, Countries },

  /**
   * Props the parent can use to manipulate this component.
   * Note: Components themselves should not mutate their own props.
   */
  props: {

    /**
     * Modal visibility
     *
     * The parent can use this to control visibility. Note, the parent can also use `vi-if` to
     * control the life-cyle of the modal (it will be created/destroyed each time).
     */
    'visible': {
      type: Boolean
    }
  },

  data () {
    return {

      /**
       * @var{Object} address The address input data the form will submit to the server.
       */
      address: {
        addressLine1: '',
        addressLine2: '',
        state: '',
        country: '',
        zipcode: ''
      },

      /**
       * @var{boolean} isSaving Flag to designate whether the form is currently
       *    in the process of being saved.
       *
       */
      isSaving: false,
      error: ''
    }
  },

  watch: {

    /**
     * Watch for changes on the visible prop.
     *
     * @param {boolean} val The new visibility value.
     * @param {boolean} oldVal The old visibility value.
     * @return {void}
     */
    visible: function (val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
      val ? this.show() : this.close()
    }
  },

  /**
   * When component is mounted.
   */
  mounted () {
    this.initModal()
  },

  methods: {

    /**
     * Initialize modal
     *
     *   - Setup Bootstrap Modal.
     *   - Make ajax call to load input fields.
     *
     * return {void}
     */
    initModal () {
      this.modal = $('.address-modal')
      this.modal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
      })

      if (this.visible) this.show()
    },

    /**
     * Get Address data from server.
     *
     * @return {void}
     */
    getAddress () {
      // get address request would go here (to get existing data from server)
    },

    /**
     * Show the modal
     *
     * @return {void}
     */
    show () {
      this.modal.modal('show')
      this.getAddress()
    },

    /**
     * Close the modal and emit an event.
     *
     * @return {void}
     */
    close () {
      this.modal.modal('hide')
      this.$emit('closed', false)
    },

    /**
     * Save the address form
     *
     * @return {void}
     */
    save () {
      if (this.isSaving) return
      this.isSaving = true

      // Do saving request here

      /*
      this.$http
        .post('/api/account/address', this.address)
        .then((response) => {
          this.isSaving = false
          utils.handleError(this, response)
          this.$emit('saved', this.address)
          this.close()
        })
        .catch((response) => {
          this.isSaving = false
          utils.handleError(this, response)
        })
      */

      // Simulate waiting and success
      setTimeout(() => {
        this.isSaving = false
        this.$emit('saved', this.address)
        this.close()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
