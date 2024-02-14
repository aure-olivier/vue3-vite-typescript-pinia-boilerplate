// Eslint
/* eslint-disable no-console */

// Helpers
import c from 'ansi-colors';
import { padLeft } from '../utils/text';

export class Logger {
  public name: string;
  constructor (name: string) {
    this.name = name;
  }
  public debug (msg: string): void {
    console.debug(`[${c.gray('DEBUG')}] ${c.gray(this.getTimeStamp())} ${msg} - ${c.green(`{${this.name}}`)}`);
  }
  public info (msg: string): void {
    console.info(`[${c.cyan('INFO')}] ${c.gray(this.getTimeStamp())} ${msg} - ${c.green(`{${this.name}}`)}`);
  }
  public warn (msg: string): void {
    console.warn(`[${c.yellow('WARN')}] ${c.gray(this.getTimeStamp())} ${msg} - ${c.green(`{${this.name}}`)}`);
  }
  public error (msg: string): void {
    console.error(`[${c.red('ERROR')}] ${c.gray(this.getTimeStamp())} ${msg} - ${c.green(`{${this.name}}`)}`);
  }
  protected getTimeStamp (): string {
    const now = new Date();
    return `${padLeft(now.getHours().toString(), '0', 2)}:${padLeft(now.getMinutes().toString(), '0', 2)}:${padLeft(now.getSeconds().toString(), '0', 2)}`;
  }
}
