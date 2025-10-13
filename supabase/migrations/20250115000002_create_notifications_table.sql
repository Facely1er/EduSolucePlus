/*
  # Create notifications table for comprehensive notification system
  
  This migration creates the notifications table to support the notification service
  with features like scheduled notifications, multiple channels, and priority levels.
  
  1. New Tables
    - `notifications` - User notifications with scheduling and delivery tracking
    - `notification_templates` - Reusable notification templates
    - `notification_delivery_logs` - Delivery tracking and analytics
    
  2. Security
    - Enable RLS on all notification tables
    - Add policies for user-specific access
    - Add indexes for performance
    
  3. Features
    - Support for multiple notification channels (email, push, in-app, SMS)
    - Priority levels (low, medium, high, urgent)
    - Scheduled notifications
    - Delivery tracking and analytics
    - Template-based notifications
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN (
    'compliance_deadline', 'incident_alert', 'data_request', 'assessment_reminder',
    'training_reminder', 'system_alert', 'security_alert', 'weekly_digest'
  )),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  title text NOT NULL,
  message text NOT NULL,
  channels text[] NOT NULL DEFAULT '{}',
  data jsonb DEFAULT '{}',
  status text NOT NULL CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'read')) DEFAULT 'pending',
  scheduled_for timestamptz,
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create notification_templates table
CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL UNIQUE CHECK (type IN (
    'compliance_deadline', 'incident_alert', 'data_request', 'assessment_reminder',
    'training_reminder', 'system_alert', 'security_alert', 'weekly_digest'
  )),
  title_template text NOT NULL,
  message_template text NOT NULL,
  channels text[] NOT NULL DEFAULT '{}',
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on notification_templates
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

-- Notification templates policies (read-only for authenticated users)
CREATE POLICY "Authenticated users can view notification templates"
  ON notification_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Create notification_delivery_logs table for analytics
CREATE TABLE IF NOT EXISTS notification_delivery_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid REFERENCES notifications(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('email', 'push', 'in_app', 'sms')),
  status text NOT NULL CHECK (status IN ('sent', 'delivered', 'failed', 'bounced', 'opened', 'clicked')),
  delivered_at timestamptz,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on notification_delivery_logs
ALTER TABLE notification_delivery_logs ENABLE ROW LEVEL SECURITY;

-- Delivery logs policies
CREATE POLICY "Users can view delivery logs for their notifications"
  ON notification_delivery_logs
  FOR SELECT
  TO authenticated
  USING (
    notification_id IN (
      SELECT id FROM notifications WHERE user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_organization_id ON notifications(organization_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled_for ON notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_notification_templates_type ON notification_templates(type);
CREATE INDEX IF NOT EXISTS idx_notification_templates_is_active ON notification_templates(is_active);

CREATE INDEX IF NOT EXISTS idx_notification_delivery_logs_notification_id ON notification_delivery_logs(notification_id);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_logs_channel ON notification_delivery_logs(channel);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_logs_status ON notification_delivery_logs(status);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_logs_created_at ON notification_delivery_logs(created_at);

-- Add updated_at triggers
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_notification_templates_updated_at
  BEFORE UPDATE ON notification_templates
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert default notification templates
INSERT INTO notification_templates (type, title_template, message_template, channels, priority, is_active) VALUES
('compliance_deadline', 'Compliance Deadline Approaching', 'The compliance obligation "{title}" is due on {due_date}. Please take action to ensure timely completion.', '{"email", "in_app"}', 'high', true),
('incident_alert', 'Privacy Incident Alert', 'A {severity} severity privacy incident has been reported: {title}. Please review and take appropriate action.', '{"email", "push", "in_app"}', 'urgent', true),
('data_request', 'New Data Subject Request', 'A new {request_type} request has been submitted by {requester_name}. Please review and process within the required timeframe.', '{"email", "in_app"}', 'high', true),
('assessment_reminder', 'Assessment Reminder', 'You have pending assessments to complete. Please log in to complete your privacy compliance assessments.', '{"email", "in_app"}', 'medium', true),
('training_reminder', 'Training Module Reminder', 'You have incomplete training modules. Please continue your privacy training to maintain compliance.', '{"email", "in_app"}', 'medium', true),
('system_alert', 'System Alert', '{message}', '{"email", "in_app"}', 'medium', true),
('security_alert', 'Security Alert', 'A security event has been detected: {message}. Please review your account activity.', '{"email", "push", "in_app"}', 'urgent', true),
('weekly_digest', 'Weekly Privacy Compliance Digest', 'Your weekly privacy compliance summary: {summary}', '{"email"}', 'low', true)
ON CONFLICT (type) DO NOTHING;

-- Create function to clean up old notifications
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
  -- Delete notifications older than 90 days that are read or failed
  DELETE FROM notifications 
  WHERE created_at < NOW() - INTERVAL '90 days'
  AND status IN ('read', 'failed');
  
  -- Delete delivery logs older than 90 days
  DELETE FROM notification_delivery_logs 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create function to get notification statistics
CREATE OR REPLACE FUNCTION get_notification_stats(user_id_param uuid)
RETURNS TABLE (
  total_count bigint,
  unread_count bigint,
  by_type jsonb,
  by_priority jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE status = 'pending') as unread_count,
    jsonb_object_agg(type, type_count) as by_type,
    jsonb_object_agg(priority, priority_count) as by_priority
  FROM (
    SELECT 
      type,
      priority,
      COUNT(*) as type_count,
      COUNT(*) as priority_count
    FROM notifications 
    WHERE user_id = user_id_param
    GROUP BY type, priority
  ) stats;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE notifications IS 'User notifications with scheduling and delivery tracking';
COMMENT ON TABLE notification_templates IS 'Reusable notification templates for different notification types';
COMMENT ON TABLE notification_delivery_logs IS 'Delivery tracking and analytics for notifications';
COMMENT ON FUNCTION cleanup_old_notifications() IS 'Cleans up old notifications and delivery logs';
COMMENT ON FUNCTION get_notification_stats(uuid) IS 'Returns notification statistics for a user';