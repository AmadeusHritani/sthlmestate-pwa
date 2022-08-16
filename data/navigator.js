export default {
  menu: {
    clipped: true,
    drawer: false,
    fixed: true,
    miniVariant: true,
    right: true,
    rightDrawer: false,
    top: {
      title: 'Sthlm Estate by SimHop',
      items: [
        {
          id: 1,
          slug: '/properties',
          label: 'Properties',
          title: 'All Properties',
          icon: 'mdi-home-city'
        },
        {
          id: 2,
          slug: '/properties/for-sale',
          label: 'Sale',
          title: 'Properties For Sale',
          icon: 'mdi-handshake'
        },
        {
          id: 3,
          slug: '/properties/for-rent',
          label: 'Rent',
          title: 'Properties For Rent',
          icon: 'mdi-key-variant'
        },
        {
          id: 4,
          slug: '/properties/by-rooms',
          label: 'By Rooms',
          title: 'Filter Properties by Number of Rooms',
          icon: 'mdi-sofa-single'
        }
      ]
    }
  }
}
