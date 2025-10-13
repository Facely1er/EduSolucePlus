// Global type definitions
declare global {
  const __APP_VERSION__: string;
  const __BUILD_TIME__: string;
}

// Extend window object for development tools
declare global {
  interface Window {
    __EDUSOLUCE_DEBUG__?: {
      auditService: any;
      errorService: any;
      complianceService: any;
      dataRightsService: any;
    };
  }
}

export {};