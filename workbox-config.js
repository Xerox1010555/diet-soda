module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{js,css,html,ico,png,svg,webp,avif,woff2,glb}',
  ],
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.getlayers\.ai\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'layers-assets',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'cloudflare-cdn',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /^https:\/\/unpkg\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'unpkg-cdn',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],
};