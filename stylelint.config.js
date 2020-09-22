const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  root: true,
  extends: "stylelint-config-recommended",
  plugins: ["stylelint-order"],
  rules: {
    'order/properties-order': [
      sortOrderSmacss()
    ],
  },
};
