module.exports = {
  apps: [
    {
      name: 'Super_Smash_Bros_Interface',
      script: '/home/ubuntu/.nvm/versions/node/v16.18.1/bin/yarn',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '500M',
    },
  ],
}