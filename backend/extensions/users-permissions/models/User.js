'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.username) {
        let arr_username = data.username.split(" ")
        if (arr_username > 1) {
          let [name, surname] = arr_username
          data.username = name
          data.surname = surname
        }
      }

    },
    async beforeUpdate(params, data) {

    },
  },
};
