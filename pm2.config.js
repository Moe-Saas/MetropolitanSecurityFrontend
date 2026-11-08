// Serves the pre-built static files (CI copies build/ into ~/frontend-deploy).
// Uses PM2's built-in static server instead of the heavy CRA dev server.
const path = require('path');
const os = require('os');

module.exports = {
  apps: [
    {
      name: 'react-app',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: path.join(os.homedir(), 'frontend-deploy'),
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
    },
  ],
};
