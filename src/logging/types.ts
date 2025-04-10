
import { ReactNode } from 'react';

/**
 * Logging levels with increasing severity
 */
export enum LogLevel {
  DEBUG = 'debug',
  TRACE = 'trace',
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Log categories for grouping logs
 */
export enum LogCategory {
  SYSTEM = 'system',
  APP = 'app',
  UI = 'ui',
  AUTH = 'auth',
  API = 'api',
  DATABASE = 'database',
  ADMIN = 'admin',
  USER = 'user',
  CONTENT = 'content',
  MIGRATION = 'migration',
  CHAT = 'chat',
  PERFORMANCE = 'performance',
  ERROR = 'error',
  SECURITY = 'security',
  ANALYTICS = 'analytics',
  INTEGRATION = 'integration',
  THEME = 'theme',
  TESTING = 'testing',
  NOTIFICATION = 'notification',
  UNKNOWN = 'unknown',
  NETWORK = 'network' // Added missing NETWORK category
}

/**
 * Full log entry structure
 */
export interface LogEntry {
  id?: string;
  level: LogLevel;
  message: string | ReactNode;
  category?: LogCategory;
  timestamp: Date;
  details?: Record<string, any>;
  source?: string;
  sessionId?: string;
  userId?: string;
  duration?: number;
  tags?: string[];
  [key: string]: any;
}

/**
 * Filter options for log queries
 */
export interface LogFilterOptions {
  level?: LogLevel;
  categories?: LogCategory[];
  source?: string;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
  tags?: string[];
  limit?: number;
}

/**
 * Transport interface for log outputs
 */
export interface LogTransport {
  log(entry: LogEntry): void;
  supports(level: LogLevel, category?: LogCategory): boolean;
}

/**
 * Configuration options for the logging system
 */
export interface LoggingConfig {
  minLevel?: LogLevel;
  transports?: LogTransport[];
  bufferSize?: number;
  flushInterval?: number;
  includeSource?: boolean;
  includeUser?: boolean;
  includeSession?: boolean;
  enabledCategories?: LogCategory[];
  uiTransport?: {
    showDebug?: boolean;
    showInfo?: boolean;
    showWarning?: boolean;
    showError?: boolean;
    showCritical?: boolean;
  };
}
