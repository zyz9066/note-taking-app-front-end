import 'dotenv/config';

export default {
  expo: {
    name: 'NoteTakingApp',
    slug: 'note-taking-app',
    extra: {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    },
    plugins: [
      [
        'react-native-auth0',
        {
          domain: '${AUTH0_DOMAIN}',
          clientId: '${AUTH0_CLIENT_ID}',
        },
      ],
    ],
  },
};
