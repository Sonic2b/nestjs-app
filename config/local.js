module.exports = {
  discovery: {
    type: 'eureka',
    options: {
      instance: {
        instanceId: 'demoservice',
        app: 'demoservice',
        hostName: '192.168.0.153',
        ipAddr: '192.168.0.153',
        statusPageUrl: 'http://192.168.0.153:4000/info',
        healthCheckUrl: 'http://192.168.0.153:4000/health',
        port: {
          $: 4000,
          '@enabled': true
        },
        vipAddress: 'demoservice',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn'
        }
      },
      eureka: {
        // eureka server host / port
        fetchRegistry: false,
        host: '192.168.0.47',
        port: 8000,
        servicePath: '/eureka/apps/',
        // serviceUrl: 'http://192.168.0.47:8000/eureka/apps/'
      }
    }
  }
}
