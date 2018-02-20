const config = {
  ENV_NAME: "local",
  CONTACT_ENDPOINT: 'http://local-adigoldshtein.com:8000/contact',
  ORIGINS: {
    OWN_SITE: 'http://local-adigoldshtein.com:3001'
  },
  GA_ANALYTICS: {
    TRACKING_ID: 'UA-111175260-1',
    DEBUG: false
  }
};

module.exports = config;
