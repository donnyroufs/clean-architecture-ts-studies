/**
 * We only need this to prevent Jest from being mad about our Application
 * logging things while running tests.
 */

import { ILogger } from '@kondah/core'

export class NullifiedLogger implements ILogger {
  info(msg: string, label?: string): void {
    return undefined
  }
  success(msg: string, label?: string): void {
    return undefined
  }
  warning(msg: string, label?: string): void {
    return undefined
  }
  error(msg: string, label?: string): void {
    return undefined
  }
}
