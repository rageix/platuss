import _ from 'lodash';
import { NextRequest } from 'next/server';

export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Exit = 'exit',
}

// A log object
interface Log {
  level: LogLevel;
  message: string;
  error: unknown;
  data: object;
}

// Log output format
interface LogOutput {
  time: string; // ISO timestamp
  level: string; // the severity level of the message
  message: string; // the log message
  error?: string; // the error message if any
  stack?: string; // a stack dump if error is specified
  data?: object; // data if specified
}

// A simple logging class
class Logger {
  outputHandler: (arg: LogOutput) => void;
  allowDebug: boolean = false;

  constructor() {
    this.outputHandler = this.consoleWriter;
  }

  // just a standard json output 1 message per line
  consoleWriter = (output: LogOutput) => {
    console.log(JSON.stringify(output));
  };

  private log = (arg: Log) => {
    // if this message is a debug message and debug is disabled then ignore it
    // so for example we normally want to ignore any debug message in production
    if (arg.level === LogLevel.Debug && !this.allowDebug) return;

    const output: LogOutput = {
      time: new Date().toISOString(),
      level: arg.level,
      message: arg.message,
    };

    if (arg.error instanceof Error) {
      // if error has a message attach it
      if (arg.error.message) {
        output['error'] = arg.error.message;
      } else {
        output['error'] = _.toString(arg.error);
      }

      // if error has a stack trace then attach it
      if (arg.error.stack) {
        output['stack'] = arg.error.stack;
      }
    }

    // if data is specified then attach to output
    if (arg.data) {
      output['data'] = arg.data;
    }

    this.consoleWriter(output);
  };

  fatal = (message: string, error?: Error, data?: object) => {
    this.log({
      level: LogLevel.Fatal,
      message: message,
      error: error,
      data: data,
    });

    // forcefully exit the program
    process.exit(5);
  };

  exit = (message: string, error?: Error, data?: object) => {
    this.log({
      level: LogLevel.Exit,
      message: message,
      error: error,
      data: data,
    });

    // forcefully exit the program
    process.exit(0);
  };

  error = (message: string, error?: unknown, data?: object) => {
    this.log({
      level: LogLevel.Error,
      message: message,
      error: error,
      data: data,
    });
  };

  requestError = (request: NextRequest, error: unknown) => {
    this.error('request', error, {
      url: request.url,
      method: request.method,
    });
  };

  warn = (message: string, error?: Error, data?: object) => {
    this.log({
      level: LogLevel.Warn,
      message: message,
      error: error,
      data: data,
    });
  };

  info = (message: string, error?: Error, data?: object) => {
    this.log({
      level: LogLevel.Info,
      message: message,
      error: error,
      data: data,
    });
  };

  debug = (message: string, error?: Error, data?: object) => {
    this.log({
      level: LogLevel.Debug,
      message: message,
      error: error,
      data: data,
    });
  };
}

export default new Logger();
