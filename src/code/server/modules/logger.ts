import chalk from "chalk";

/**
 * Logger class
 * @class Logger
 * @param {string} msg - message to log
 * @exports
 * @class Logger
 */

class Logger {
  static log(message: string): void {
    console.log(
      `${chalk.redBright("[Rebirth]")} ${chalk.whiteBright(message)}`
    );
  }

  static warning(message: string): void {
    console.log(
      `${chalk.yellowBright("[Rebirth] Warning:")} ${chalk.yellowBright(message)}`
    );
  }

  static error(message: string): void {
    console.log(
      `${chalk.redBright("[Rebirth] Error:")} ${chalk.redBright(message)}`
    );
  }

  static info(message: string): void {
    console.log(
      `${chalk.redBright("[Rebirth]")} ${chalk.whiteBright(message)}`
    );
  }

  static success(message: string): void {
    console.log(`${chalk.greenBright(`${message}`)}`);
  }
  static failed(message: string): void {
    console.log(`${chalk.redBright(`${message}`)}`);
  }
}

export default Logger;
