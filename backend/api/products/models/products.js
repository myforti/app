'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require('slugify');
const option_slugify = {
  lower: true,
  remove: /[*+~.,()'"!:@?ь=]/g,
}

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.sale && Number(data.sale) !== 0) {
        data.price_old = data.price
        data.price = Number(data.price) - (Number(data.price) * Number(data.sale) / 100)
      }
      if (data.name) {
        data.slug = slugify(data.name, option_slugify);
      }
      if (data.count === null) {
        data.count = 1
      }
    },
    async beforeUpdate(params, data) {
      const [product] = await strapi.query('products').find({ id: params.id })
      if (!product) return false 
      if (data.sale && Number(data.sale) !== 0) {
        if (Number(product.sale) === Number(data.sale)) return false
        data.price_old = data.price
        data.price = Number(data.price) - (Number(data.price) * Number(data.sale) / 100)
      }
      if (data.name) {
        data.slug = slugify(data.name, option_slugify);
      }
      if (data.count === null) {
        data.count = 1
      }
    },
  },
};
