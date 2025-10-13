import React from 'react';
import { BarChart3, Users, Shield, Clock, Target } from 'lucide-react';
import { MetricsCard } from '../common/MetricsCard';
import { Badge } from '../ui/Badge';

export function AnalyticsDashboard() {
  // Mock analytics data - in production, fetch from analytics service
  const analyticsData = {
    complianceScore: 78,
    complianceTrend: 5.2,
    activeUsers: 1247,
    usersTrend: 12.3,
    assessmentsCompleted: 89,
    assessmentsTrend: 8.7,
    trainingHours: 156,
    trainingTrend: 15.4,
    privacyIncidents: 3,
    incidentsTrend: -25.0,
    dataRequests: 23,
    requestsTrend: 4.2
  };

  const complianceAreas = [
    { name: 'FERPA', score: 85, trend: 3.2, status: 'excellent' },
    { name: 'COPPA', score: 72, trend: -1.5, status: 'good' },
    { name: 'CCPA', score: 68, trend: 8.7, status: 'needs-improvement' },
    { name: 'GDPR', score: 91, trend: 2.1, status: 'excellent' }
  ];

  const recentActivity = [
    { action: 'Assessment completed', user: 'John Smith', time: '2 hours ago', type: 'assessment' },
    { action: 'Training module started', user: 'Sarah Johnson', time: '4 hours ago', type: 'training' },
    { action: 'Privacy incident reported', user: 'Mike Chen', time: '1 day ago', type: 'incident' },
    { action: 'Data request submitted', user: 'Lisa Rodriguez', time: '2 days ago', type: 'data-request' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400';
      case 'good':
        return 'text-blue-600 dark:text-blue-400';
      case 'needs-improvement':
        return 'text-amber-600 dark:text-amber-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'training':
        return <Users className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'incident':
        return <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'data-request':
        return <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Privacy compliance insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Last 30 days</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Overall Compliance Score"
          value={`${analyticsData.complianceScore}%`}
          description="Institution-wide compliance"
          icon={Shield}
          trend={{
            value: analyticsData.complianceTrend,
            direction: analyticsData.complianceTrend > 0 ? 'up' : 'down',
            timeframe: 'vs last period'
          }}
          status={analyticsData.complianceScore >= 80 ? 'success' : 'warning'}
        />
        
        <MetricsCard
          title="Active Users"
          value={analyticsData.activeUsers.toLocaleString()}
          description="Users this month"
          icon={Users}
          trend={{
            value: analyticsData.usersTrend,
            direction: analyticsData.usersTrend > 0 ? 'up' : 'down',
            timeframe: 'vs last month'
          }}
          status="success"
        />
        
        <MetricsCard
          title="Assessments Completed"
          value={analyticsData.assessmentsCompleted}
          description="This month"
          icon={Target}
          trend={{
            value: analyticsData.assessmentsTrend,
            direction: analyticsData.assessmentsTrend > 0 ? 'up' : 'down',
            timeframe: 'vs last month'
          }}
          status="success"
        />
        
        <MetricsCard
          title="Training Hours"
          value={analyticsData.trainingHours}
          description="Completed this month"
          icon={Clock}
          trend={{
            value: analyticsData.trainingTrend,
            direction: analyticsData.trainingTrend > 0 ? 'up' : 'down',
            timeframe: 'vs last month'
          }}
          status="success"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Compliance Areas */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance by Area</h3>
          <div className="space-y-4">
            {complianceAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="font-medium">{area.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${getStatusColor(area.status)}`}>
                    {area.score}%
                  </span>
                  <div className="text-right">
                    <div className={`text-sm ${area.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {area.trend > 0 ? '+' : ''}{area.trend}%
                    </div>
                    <div className="text-xs text-muted-foreground">vs last period</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <MetricsCard
          title="Privacy Incidents"
          value={analyticsData.privacyIncidents}
          description="This month"
          icon={Shield}
          trend={{
            value: Math.abs(analyticsData.incidentsTrend),
            direction: analyticsData.incidentsTrend < 0 ? 'up' : 'down',
            timeframe: 'vs last month'
          }}
          status={analyticsData.privacyIncidents === 0 ? 'success' : 'warning'}
        />
        
        <MetricsCard
          title="Data Requests"
          value={analyticsData.dataRequests}
          description="Processed this month"
          icon={BarChart3}
          trend={{
            value: analyticsData.requestsTrend,
            direction: analyticsData.requestsTrend > 0 ? 'up' : 'down',
            timeframe: 'vs last month'
          }}
          status="info"
        />
        
        <MetricsCard
          title="Response Time"
          value="2.3 days"
          description="Average data request response"
          icon={Clock}
          trend={{
            value: -15.2,
            direction: 'up',
            timeframe: 'vs last month'
          }}
          status="success"
        />
      </div>
    </div>
  );
}