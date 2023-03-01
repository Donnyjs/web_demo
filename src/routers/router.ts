export const router = [
  {
    icon: 'HomeOutlined',
    title: 'Home',
    path: '/home',
  },
  {
    icon: 'ProfileOutlined',
    title: 'Configure',
    path: '/configure',
  },
  {
    icon: 'ExclamationCircleOutlined',
    title: 'Error',
    path: '/error',
    children: [
      {
        icon: 'AppstoreOutlined',
        path: '/404',
        title: '404',
      },
      {
        icon: 'AppstoreOutlined',
        path: '/403',
        title: '403',
      },
      {
        icon: 'AppstoreOutlined',
        path: '/500',
        title: '500',
      },
    ],
  },
  {
    icon: 'PaperClipOutlined',
    title: 'LinkPage',
    path: '/link',
    children: [
      {
        icon: 'AppstoreOutlined',
        path: '/link/github',
        title: 'GitHub',
        isLink: 'https://github.com',
      },
    ],
  },
  {
    icon: 'HomeOutlined',
    title: 'Mint',
    path: '/mint',
  },
];
