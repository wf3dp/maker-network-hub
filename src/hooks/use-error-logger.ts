
import { useCallback } from 'react';
import { getLogger } from '@/logging';
import { LogCategory, LogLevel } from '@/logging/types';
import { ErrorInfo } from 'react';

/**
 * Hook for logging errors from React components and error boundaries
 */
export function useErrorLogger(source: string) {
  const logger = getLogger();
  
  const logError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    logger.error(error.message, {
      category: LogCategory.ERROR,
      source,
      details: {
        errorName: error.name,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        error // Pass the full error object
      }
    });
  }, [logger, source]);

  const logErrorWithContext = useCallback((error: Error, context: Record<string, unknown> = {}) => {
    logger.error(error.message, {
      category: LogCategory.ERROR,
      source,
      details: {
        errorName: error.name,
        stack: error.stack,
        context
      }
    });
  }, [logger, source]);

  const logApiError = useCallback((error: unknown, endpoint: string, params?: unknown) => {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown API error';
    
    logger.error(`API Error: ${endpoint}`, {
      category: LogCategory.NETWORK, // Now uses the valid NETWORK category
      source,
      details: {
        error,
        endpoint,
        params
      }
    });
  }, [logger, source]);

  return {
    logError,
    logErrorWithContext,
    logApiError
  };
}
