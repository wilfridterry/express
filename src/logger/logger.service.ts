import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	public constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	/**
	 * @param args
	 */
	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	/**
	 * @param args
	 */
	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	/**
	 * @param args
	 */
	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
