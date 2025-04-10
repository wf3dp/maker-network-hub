
import { subscribeToAuthEvents } from '@/auth/bridge';
import { getLogger } from '@/logging';
import { LogCategory } from '@/logging/types';
import { createModuleBridge } from '@/core/MessageBus';

// Create admin module bridge
export const adminBridge = createModuleBridge('admin');

// Module state type
interface ModuleState {
  initialized: boolean;
  eventHandlersRegistered: boolean;
}

// Initialize module state
const moduleState: ModuleState = {
  initialized: false,
  eventHandlersRegistered: false,
};

/**
 * Initialize the admin module
 */
export function initializeAdminModule(): void {
  if (moduleState.initialized) {
    return;
  }

  const logger = getLogger();
  logger.info('Initializing admin module', {
    category: LogCategory.ADMIN,
    source: 'ModuleRegistry'
  });

  // Register event handlers if not already done
  if (!moduleState.eventHandlersRegistered) {
    registerEventHandlers();
    moduleState.eventHandlersRegistered = true;
  }

  moduleState.initialized = true;
}

/**
 * Register event handlers for admin module
 */
function registerEventHandlers(): void {
  const logger = getLogger();
  
  // Subscribe to auth events
  subscribeToAuthEvents('AUTH_STATE_CHANGE', (event) => {
    logger.info(`Admin module received auth event: ${event.type}`, {
      category: LogCategory.ADMIN,
      source: 'ModuleRegistry',
      details: { eventType: event.type }
    });

    // Handle auth events specific to admin functionality
    switch (event.type) {
      case 'AUTH_SIGNED_IN':
        // Handle sign in if needed
        break;
      case 'AUTH_SIGNED_OUT':
        // Handle sign out if needed
        break;
    }
  });
  
  // Publish admin module initialized event
  adminBridge.publish('system', {
    type: 'module-initialized',
    module: 'admin',
    timestamp: new Date()
  });
}

/**
 * Subscribe to admin events
 */
export function subscribeToAdminEvents(channel: string, listener: (message: any) => void) {
  return adminBridge.subscribe(channel, listener);
}

/**
 * Publish admin event
 */
export function publishAdminEvent(channel: string, message: any) {
  return adminBridge.publish(channel, message);
}

