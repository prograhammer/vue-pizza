module.exports = {

  /**
   * Get the error from a response.
   *
   * @param {Response} response The Vue-resource Response that we will try to get errors from.
   */
  getError: function (response) {
    return response.body['error_description']
      ? response.body.error_description
      : response.statusText
  }
}
