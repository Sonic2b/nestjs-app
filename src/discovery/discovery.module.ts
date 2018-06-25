import { Logger } from '@nestjs/common';
import { Eureka } from 'eureka-js-client';

export class DiscoveryModule {
  static registerServices({ options }) {
    const eureka = new Eureka(options);
    eureka.start();
  }
}
