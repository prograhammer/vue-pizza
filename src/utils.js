module.exports = {

  /**
   * A simple example to handle the error from a response.
   *
   * @param {Object} context The Vue component with an error data property we can set.
   * @param {Response} response The Vue-resource Response that we will try to get errors from.
   */
  handleError: function (context, response) {
    if (context.hasOwnProperty('error') && response.body.hasOwnProperty('error_description')) {
      context.error = response.body.error_description
    }
  }
}
