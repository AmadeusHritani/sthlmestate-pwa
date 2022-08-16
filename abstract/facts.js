export default [
  {
    label: 'Pris:',
    tag: 'money-format',
    props: {
      locale: 'sv-SE',
      'currency-code': 'SEK',
      'subunits-value': false,
      'hide-subunits': true
    },
    rootObject: 'price',
    slug: 'startingPrice',
    value: null,
    prefix: null,
    suffix: null,
    text: null
  },
  {
    label: 'Avgift:',
    tag: 'money-format',
    props: {
      locale: 'sv-SE',
      currencyCode: 'SEK',
      subunitsValue: false,
      hideSubunits: true
    },
    rootObject: 'baseInformation',
    slug: 'monthlyFee',
    value: null,
    prefix: null,
    suffix: null,
    textIcon: 'mdi-comment-quote-outline',
    text: [
      {
        label: null,
        tag: 'div',
        classes: 'fact-comments',
        props: {},
        rootObject: 'baseInformation',
        slug: 'commentary',
        data: null
      }
    ]
  },
  {
    label: 'Typ',
    tag: '',
    props: null,
    rootObject: 'baseInformation',
    slug: 'propertyType',
    value: null,
    prefix: '',
    suffix: '',
    text: null
  },
  {
    label: 'Antal rum',
    tag: '',
    props: {},
    rootObject: 'interior',
    slug: 'numberOfRooms',
    value: null,
    prefix: '',
    suffix: '',
    text: [
      {
        label: null,
        tag: 'div',
        classes: 'fact-comments',
        props: {},
        rootObject: null,
        slug: 'rooms-headings-string',
        data: null
      }
    ]
  },
  {
    label: 'Boarea',
    tag: '',
    props: {},
    rootObject: 'baseInformation',
    slug: 'livingSpace',
    value: null,
    prefix: '',
    suffix: 'kvm',
    text: null
  },
  {
    label: 'Byggår',
    tag: '',
    props: {},
    rootObject: 'building',
    slug: 'buildingYear',
    value: null,
    prefix: '',
    suffix: '',
    text: [
      {
        label: 'Byggnadstyp',
        tag: 'span',
        classes: 'fact-comments mr-2',
        props: {},
        rootObject: 'building',
        slug: 'buildingType',
        data: null
      },
      {
        label: 'Fönster',
        tag: 'span',
        classes: 'fact-comments mr-2',
        props: {},
        rootObject: 'building',
        slug: 'windows',
        data: null
      },
      {
        label: 'Uppvärmning',
        tag: 'span',
        classes: 'fact-comments',
        props: {},
        rootObject: 'building',
        slug: 'heating',
        data: null
      }
    ]
  }
]
