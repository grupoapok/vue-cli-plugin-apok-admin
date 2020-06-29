export default [
  {
    title: 'General',
    children: [
      {
        label: 'Dashboard',
        to: { name: 'Dashboard' },
        icon: {icon: 'tachometer-alt'}
      },
    ]
  },

  {
    title: 'Showcase',
    children: [
      {
        label: 'Sign in',
        to: { name: 'Login' },
        icon: {icon: 'sign-in-alt'}
      },

      {
        label: 'Components',
        to: { name: 'About' },
        icon: {icon: 'puzzle-piece'}
      },
      {
        label: 'Charts',
        to: { name: 'About' },
        icon: {icon: 'cog'},
      },

    ]
  },
]
