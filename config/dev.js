module.exports = {
  env: process.env.NODE_ENV,
  redis: {
    url: 'redis://192.168.0.45:6379'
  },
  mongodb: {
    url: 'mongodb://192.168.0.25:27017'
  }
}
