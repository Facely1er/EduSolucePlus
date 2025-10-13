// Audit logging service for compliance tracking
interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
}

class AuditService {
  private sessionId: string;
  private buffer: AuditLogEntry[] = [];
  private maxBufferSize = 100;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startAutoFlush();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private startAutoFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  // Log various types of actions
  logLogin(userId: string, success: boolean, errorMessage?: string): void {
    this.log({
      action: 'user_login',
      resourceType: 'authentication',
      resourceId: userId,
      details: { loginAttempt: true },
      success,
      errorMessage
    });
  }

  logDataAccess(userId: string, resourceType: string, resourceId: string, action: string): void {
    this.log({
      action: `data_${action}`,
      resourceType,
      resourceId,
      details: { dataAccess: true },
      success: true
    });
  }

  logPrivacyRequest(userId: string, requestType: string, requestId: string): void {
    this.log({
      action: 'privacy_request_submitted',
      resourceType: 'data_subject_request',
      resourceId: requestId,
      details: { requestType },
      success: true
    });
  }

  logIncidentReport(userId: string, incidentId: string, severity: string): void {
    this.log({
      action: 'incident_reported',
      resourceType: 'privacy_incident',
      resourceId: incidentId,
      details: { severity },
      success: true
    });
  }

  logComplianceAction(userId: string, obligationId: string, action: string): void {
    this.log({
      action: `compliance_${action}`,
      resourceType: 'compliance_obligation',
      resourceId: obligationId,
      details: { complianceAction: true },
      success: true
    });
  }

  logVendorAssessment(userId: string, vendorId: string, score: number): void {
    this.log({
      action: 'vendor_assessed',
      resourceType: 'vendor_assessment',
      resourceId: vendorId,
      details: { assessmentScore: score },
      success: true
    });
  }

  private log(entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'sessionId' | 'userAgent'>): void {
    const auditEntry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      ipAddress: this.getClientIP(),
      ...entry
    };

    this.buffer.push(auditEntry);

    // Auto-flush if buffer is full
    if (this.buffer.length >= this.maxBufferSize) {
      this.flush();
    }

    // Store critical actions immediately in localStorage as backup
    if (['user_login', 'incident_reported', 'privacy_request_submitted'].includes(entry.action)) {
      this.storeLocalBackup(auditEntry);
    }
  }

  private getClientIP(): string {
    // In production, this would be handled by the backend
    return 'client-side';
  }

  private storeLocalBackup(entry: AuditLogEntry): void {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('audit_backup') || '[]');
      existingLogs.push(entry);
      
      // Keep only the last 50 critical entries
      if (existingLogs.length > 50) {
        existingLogs.splice(0, existingLogs.length - 50);
      }
      
      localStorage.setItem('audit_backup', JSON.stringify(existingLogs));
    } catch (error) {
      console.error('Failed to store audit backup:', error);
    }
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const entriesToFlush = [...this.buffer];
    this.buffer = [];

    try {
      // In production, send to audit logging service
      console.log('Flushing audit entries:', entriesToFlush.length);
      
      // For now, store in localStorage for development
      const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      existingLogs.push(...entriesToFlush);
      
      // Keep only the last 1000 entries in localStorage
      if (existingLogs.length > 1000) {
        existingLogs.splice(0, existingLogs.length - 1000);
      }
      
      localStorage.setItem('audit_logs', JSON.stringify(existingLogs));
      
      // In production, this would send to your audit service:
      // await this.sendToAuditService(entriesToFlush);
      
    } catch (error) {
      console.error('Failed to flush audit logs:', error);
      // Re-add failed entries to buffer for retry
      this.buffer.unshift(...entriesToFlush);
    }
  }

  // Get audit logs for compliance reporting
  async getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    resourceType?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<AuditLogEntry[]> {
    try {
      const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      
      if (!filters) return logs;
      
      return logs.filter((log: AuditLogEntry) => {
        if (filters.userId && log.userId !== filters.userId) return false;
        if (filters.action && log.action !== filters.action) return false;
        if (filters.resourceType && log.resourceType !== filters.resourceType) return false;
        if (filters.startDate && log.timestamp < filters.startDate) return false;
        if (filters.endDate && log.timestamp > filters.endDate) return false;
        return true;
      });
    } catch (error) {
      console.error('Failed to retrieve audit logs:', error);
      return [];
    }
  }

  // Export audit logs for compliance reporting
  async exportAuditLogs(format: 'json' | 'csv' = 'json'): Promise<string> {
    const logs = await this.getAuditLogs();
    
    if (format === 'csv') {
      const headers = ['Timestamp', 'User ID', 'Action', 'Resource Type', 'Resource ID', 'Success', 'Details'];
      const csvRows = logs.map(log => [
        log.timestamp,
        log.userId || '',
        log.action,
        log.resourceType,
        log.resourceId,
        log.success.toString(),
        JSON.stringify(log.details).replace(/"/g, '""')
      ]);
      
      return [headers, ...csvRows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    }
    
    return JSON.stringify(logs, null, 2);
  }
}

export const auditService = new AuditService();