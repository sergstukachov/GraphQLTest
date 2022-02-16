define(['uiComponent', 'jquery'], function (Component, $) {
    'use strict';

    const query = `
query exampleProduct($count: Int = 1) {
  products(filter: {}, pageSize: $count) {
    total_count
    items {
      sku
      name
      type_id
      image {
        url
      }
    }
  }
}
    `;
    return Component.extend({
        defaults: {
            tracks: {
                result: true
            }
        },
        initialize: function () {
            const payload = {
                query: query,
                variables: {
                    count: 3
                }
            };
            new Promise((resolve, reject) => {
                $.ajax({
                    url: '/graphql',
                    contentType: 'application/json',
                    dataType: 'json',
                    method: 'POST',
                    data: JSON.stringify(payload),
                    success: resolve,
                    error: reject
                });
            })
                .then(data => this.result = data)
                .catch(console.error)

            return this._super();
        }
    });
});
