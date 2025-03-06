enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
  SUCCESS = "SUCCESS",
}

class Logger {
  private static colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    blue: "\x1b[34m", // INFO
    yellow: "\x1b[33m", // WARN
    red: "\x1b[31m", // ERROR
    cyan: "\x1b[36m", // DEBUG
    green: "\x1b[32m", // SUCCESS
    gray: "\x1b[90m", // Timestamp
  };

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    ...args: any[]
  ): string {
    const timestamp =
      Logger.colors.gray + `[${Logger.getTimestamp()}]` + Logger.colors.reset;
    const levelColor = Logger.getLevelColor(level);
    const levelStr = `${levelColor}${Logger.colors.bright}[${level}]${Logger.colors.reset}`;
    const nameStr = `${Logger.colors.cyan}[${this.name}]${Logger.colors.reset}`;

    const additionalInfo =
      args.length > 0
        ? " " +
          args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
            )
            .join(" ")
        : "";

    return `${timestamp} ${levelStr} ${nameStr} ${message}${additionalInfo}`;
  }

  private static getLevelColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.INFO:
        return Logger.colors.blue;
      case LogLevel.WARN:
        return Logger.colors.yellow;
      case LogLevel.ERROR:
        return Logger.colors.red;
      case LogLevel.DEBUG:
        return Logger.colors.cyan;
      case LogLevel.SUCCESS:
        return Logger.colors.green;
      default:
        return Logger.colors.reset;
    }
  }

  info(message: string, ...args: any[]): void {
    console.log(this.formatMessage(LogLevel.INFO, message, ...args));
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, ...args));
  }

  error(message: string | Error, ...args: any[]): void {
    const errorMessage =
      message instanceof Error ? message.stack || message.message : message;
    console.error(this.formatMessage(LogLevel.ERROR, errorMessage, ...args));
  }

  debug(message: string, ...args: any[]): void {
    console.debug(this.formatMessage(LogLevel.DEBUG, message, ...args));
  }

  success(message: string, ...args: any[]): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message, ...args));
  }
}

export default Logger;
