export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}

export class LogEntity {

  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor( options: LogEntityOptions ) {

    const { message, level, origin, createdAt = new Date(),  } = options

    this.message = message
    this.level = level
    this.createdAt = createdAt
    this.origin = origin

  }

  static fromJson = ( json: string ): LogEntity => {

    json = ( json === '' ) ? '{}' : json

    const { level, message, origin, createdAt } = JSON.parse( json )

    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt
    })
    
    log.createdAt = new Date( createdAt )

    return log
    
  }

  static fromObject = ( object: {[ key: string ]: any} ): LogEntity => {

    const { message, level, origin, createdAt } = object

    const log = new LogEntity({ level, message, origin, createdAt })

    return log

  }

}