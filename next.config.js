const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const withPWA = require('next-pwa');

module.exports = withPWA(withCSS(withLess(withImages(withSass({
  pwa: { 
    dest: 'public'
  },
  env: {
    ANY_ENV_KEY: "ANY_ENV_VARIABLE"
  }
})))));

module.exports = {
  images: {
    domains: ['storage.googleapis.com']
  }
}