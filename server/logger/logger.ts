import winston from 'winston'
import path from 'path'

const { combine, timestamp, json, prettyPrint, errors } = winston.format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),

  transports: [
    //  new winston.transports.Console(),

    new winston.transports.File({ filename: path.join(__dirname, `../logs/${new Date().toISOString().slice(0, 10)}.log`) })
  ]
})
