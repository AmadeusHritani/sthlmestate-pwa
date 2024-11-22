export default {
  data: [
    {
      id: 1,
      slug: 'bidding',
      label: 'bidding',
      show: false,
      active: true
    },
    {
      id: 2,
      slug: 'description',
      label: 'description',
      active: true,
      content: [
        {
          id: 1,
          name: 'short-description',
          label: null,
          tag: 'p',
          classes: ['short-desc'],
          data: {
            type: String,
            value: ''
          }
        }, {
          id: 2,
          name: 'long-description',
          label: null,
          tag: 'p',
          classes: ['long-desc'],
          data: {
            type: String,
            value: ''
          }
        }
      ]
    }, {
      id: 3,
      slug: 'facts',
      label: 'facts',
      active: false,
      content: [
        {
          id: 1,
          name: 'rooms',
          label: 'Rum',
          tag: 'span',
          classes: ['horizontal-list-item', 'rooms'],
          data: {
            type: String,
            value: ''
          }
        }
      ]
    }, {
      id: 4,
      slug: 'association',
      label: 'association',
      active: false
    }, {
      id: 5,
      slug: 'operations',
      label: 'operation-cost',
      active: false
    }, {
      id: 6,
      slug: 'documents',
      label: 'documents',
      active: false
    }
  ]
}
