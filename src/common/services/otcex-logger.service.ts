import { LoggerService, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;
const customFormat = printf(
  info =>
    `[${info.label}] ${process.pid} - ${info.timestamp} ${info.level}: ${
      info.message
    }`,
);

@Injectable()
export class OtcexLoggerService implements LoggerService {
  private logger;
  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        colorize(),
        label({ label: 'OTCEX' }),
        timestamp(),
        customFormat,
      ),
      transports: [
        new winston.transports.File({
          dirname: './log',
          filename: 'error.log',
          level: 'warn',
        }),
        new winston.transports.Console({ level: 'info' }),
      ],
    });
  }

  log(message: string) {
    this.logger.log('info', message);
  }
  error(message: string, trace: string) {
    this.logger.log('error', message);
  }
  warn(message: string) {
    this.logger.log('warn', message);
  }
}
