module.exports = {
  apps: [{
    name: 'easymart-server',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-232-62-109.ap-south-1.compute.amazonaws.com',
      key: '~/.ssh/easymart-instance.pem',
      ref: 'origin/main',
      repo: 'git@github.com:fir0j/easymart.online-server.git',
      path: '/home/ubuntu/easymart.online-server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
