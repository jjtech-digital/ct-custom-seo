import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Custom Seo',
  entryPointUriPath,
  cloudIdentifier: 'gcp-au',
  headers: {
    csp: {
      'connect-src': [
        'https://ct-custom-seo-be.vercel.app/products',
        'http://localhost:3002/products',
        'https://auth.australia-southeast1.gcp.commercetools.com/oauth/token',
        'https://api.australia-southeast1.gcp.commercetools.com/ct-assessment',
        'https://api.australia-southeast1.gcp.commercetools.com/ct-assessment/product-projections',
      ],
    },
  },
  env: {
    development: {
      initialProjectKey: 'ct-assessment',
    },
    production: {
      applicationId: '${env:APPLICATION_ID}',
      url: '${env:APP_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
