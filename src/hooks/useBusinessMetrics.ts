// Business metrics and analytics hook
import { useState, useEffect, useCallback } from 'react';
import { complianceService } from '../services/complianceService';
import { dataRightsService } from '../services/dataRightsService';
import { errorService } from '../services/errorService';

interface BusinessMetrics {
  compliance: {
    overallScore: number;
    obligationsByStatus: Record<string, number>;
    overdueObligations: number;
    upcomingDeadlines: number;
  };
  dataRights: {
    totalRequests: number;
    requestsByType: Record<string, number>;
    averageResponseTime: number;
    overdueRequests: number;
  };
  system: {
    totalErrors: number;
    errorsBySeverity: Record<string, number>;
    recentErrors: number;
  };
  trends: {
    complianceScoreTrend: number;
    requestVolumeTrend: number;
    errorRateTrend: number;
  };
}

export function useBusinessMetrics(organizationId?: string) {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (organizationId) {
      loadMetrics();
      
      // Set up automatic refresh every 5 minutes
      const interval = setInterval(loadMetrics, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [organizationId, loadMetrics]);

  const loadMetrics = useCallback(async () => {
    if (!organizationId) return;

    setLoading(true);
    setError(null);

    try {
      const [complianceMetrics, dataRightsStats, errorStats] = await Promise.all([
        complianceService.getComplianceMetrics(organizationId),
        dataRightsService.getRequestStatistics(organizationId),
        Promise.resolve(errorService.getErrorStatistics())
      ]);

      // Calculate trends (mock implementation - in production, store historical data)
      const storedMetrics = localStorage.getItem(`metrics_${organizationId}`);
      let trends = { complianceScoreTrend: 0, requestVolumeTrend: 0, errorRateTrend: 0 };
      
      if (storedMetrics) {
        try {
          const previousMetrics = JSON.parse(storedMetrics);
          trends = {
            complianceScoreTrend: complianceMetrics.overallScore - (previousMetrics.compliance?.overallScore || 0),
            requestVolumeTrend: dataRightsStats.totalRequests - (previousMetrics.dataRights?.totalRequests || 0),
            errorRateTrend: errorStats.recentErrors - (previousMetrics.system?.recentErrors || 0)
          };
        } catch {
          console.warn('Failed to parse previous metrics for trend calculation');
        }
      }

      const newMetrics: BusinessMetrics = {
        compliance: complianceMetrics,
        dataRights: dataRightsStats,
        system: errorStats,
        trends
      };

      setMetrics(newMetrics);
      setLastUpdated(new Date());
      
      // Store current metrics for trend calculation
      localStorage.setItem(`metrics_${organizationId}`, JSON.stringify(newMetrics));
      
    } catch (error) {
      console.error('Failed to load business metrics:', error);
      setError(error instanceof Error ? error.message : 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  }, [organizationId]);

  // Export metrics for reporting
  const exportMetrics = async (format: 'json' | 'csv' = 'json'): Promise<string> => {
    if (!metrics) return '';

    if (format === 'csv') {
      const csvData = [
        ['Metric', 'Value', 'Category'],
        ['Overall Compliance Score', metrics.compliance.overallScore.toString(), 'Compliance'],
        ['Overdue Obligations', metrics.compliance.overdueObligations.toString(), 'Compliance'],
        ['Total Data Rights Requests', metrics.dataRights.totalRequests.toString(), 'Data Rights'],
        ['Average Response Time (days)', metrics.dataRights.averageResponseTime.toString(), 'Data Rights'],
        ['Total System Errors', metrics.system.totalErrors.toString(), 'System'],
        ['Recent Errors (24h)', metrics.system.recentErrors.toString(), 'System']
      ];
      
      return csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    }

    return JSON.stringify(metrics, null, 2);
  };

  return {
    metrics,
    loading,
    error,
    lastUpdated,
    refresh: loadMetrics,
    exportMetrics
  };
}