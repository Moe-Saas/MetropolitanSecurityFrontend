module.exports = {
  apps: [
    {
      name: 'frontend-app',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
    },
  ],
};
