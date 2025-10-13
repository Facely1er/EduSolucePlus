 // Data export/import component
import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  FileText, 
  Database, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/Button';
// Badge import removed - not used in this component
import { exportService } from '../../services/exportService';
import { demoDataService } from '../../services/demoDataService';
import { useUser } from '../../hooks/useSupabase';
import { useNotifications } from '../../contexts/NotificationContext';

interface DataExportImportProps {
  className?: string;
  showDemoControls?: boolean;
}

export function DataExportImport(props: DataExportImportProps) {
  const { className = '', showDemoControls = true } = props;
  
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('pdf');
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useUser();
  const { addNotification } = useNotifications();

  const getStoredData = (userId: string, dataType: string): unknown[] => {
    try {
      return JSON.parse(localStorage.getItem(`demo_${dataType}_${userId}`) || '[]');
    } catch {
      return [];
    }
  };

  const handleExportData = async (dataType: 'assessments' | 'training' | 'progress' | 'all') => {
    if (!user) {
      addNotification({
        type: 'warning',
        title: 'Login Required',
        message: 'Please log in to export your data',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
      return;
    }

    setIsExporting(true);
    
    try {
      const userId = user.id;
      
      if (dataType === 'all') {
        // Export complete demo data backup
        await demoDataService.exportDemoData(userId);
        addNotification({
          type: 'success',
          title: 'Data Exported',
          message: 'Complete data backup has been downloaded',
          timestamp: Date.now(),
          read: false,
          category: 'system'
        });
      } else {
        // Export specific data type
        const data = getStoredData(userId, dataType);
        
        switch (dataType) {
          case 'assessments':
            await exportService.exportAssessmentResults(data, { format: exportFormat });
            break;
          case 'training':
            await exportService.exportTrainingProgress(data, { format: exportFormat });
            break;
          case 'progress':
            await exportService.exportTrainingProgress(data, { format: exportFormat });
            break;
        }
        
        addNotification({
          type: 'success',
          title: 'Export Complete',
          message: `${dataType} data exported as ${exportFormat.toUpperCase()}`,
          timestamp: Date.now(),
          read: false,
          category: 'system'
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'There was an error exporting your data',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = async (file: File) => {
    setIsImporting(true);
    setImportMessage(null);
    setImportError(null);

    try {
      const result = await demoDataService.importDemoData(file);
      
      if (result.success) {
        setImportMessage(result.message);
        addNotification({
          type: 'success',
          title: 'Import Complete',
          message: 'Demo data has been imported successfully',
          timestamp: Date.now(),
          read: false,
          category: 'system'
        });
        
        // Reload the page to reflect imported data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setImportError(result.message);
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImportData(file);
    }
  };

  const handleFlushDemoData = () => {
    if (!user) return;
    
    const result = demoDataService.flushDemoData(user.id);
    
    addNotification({
      type: 'info',
      title: 'Demo Data Flushed',
      message: `Removed ${result.totalItemsRemoved} demo data items`,
      timestamp: Date.now(),
      read: false,
      category: 'system'
    });

    // Reload to reflect changes
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleRefreshDemoData = () => {
    if (!user) return;
    
    demoDataService.refreshDemoData(user.id);
    
    addNotification({
      type: 'success',
      title: 'Demo Data Refreshed',
      message: `Generated fresh demo data across all categories`,
      timestamp: Date.now(),
      read: false,
      category: 'system'
    });

    // Reload to reflect changes
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Export Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-500" />
          Export Data
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Format:</span>
            <div className="flex gap-2">
              {(['csv', 'json', 'pdf'] as const).map(format => (
                <Button
                  key={format}
                  variant={exportFormat === format ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExportFormat(format)}
                >
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => handleExportData('assessments')}
              disabled={isExporting}
              className="justify-start"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assessments
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportData('training')}
              disabled={isExporting}
              className="justify-start"
            >
              <Database className="h-4 w-4 mr-2" />
              Training
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportData('progress')}
              disabled={isExporting}
              className="justify-start"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Progress
            </Button>
            <Button
              onClick={() => handleExportData('all')}
              disabled={isExporting}
              className="justify-start"
            >
              {isExporting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export All
            </Button>
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Upload className="h-5 w-5 mr-2 text-green-500" />
          Import Data
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Import Guidelines</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Import only demo data backup files exported from EduSoluce™</li>
                  <li>• Files should be in JSON format with proper structure</li>
                  <li>• Importing will replace existing demo data</li>
                  <li>• Regular backups are recommended before importing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="justify-start"
            >
              {isImporting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isImporting ? 'Importing...' : 'Select File to Import'}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Import Status Messages */}
          {importMessage && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-300">{importMessage}</span>
              </div>
            </div>
          )}

          {importError && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-800 dark:text-red-300">{importError}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Data Controls */}
      {showDemoControls && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-500" />
            Demo Data Controls
          </h3>
          
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Demo Data Management</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    These controls manage demonstration data used for testing and evaluation purposes.
                    Use with caution as changes affect all demo content.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleRefreshDemoData}
                className="justify-start"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Demo Data
              </Button>
              
              <Button
                variant="outline"
                onClick={handleFlushDemoData}
                className="justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Demo Data
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p><strong>Refresh:</strong> Generates fresh demo data while preserving existing structure</p>
              <p><strong>Clear:</strong> Removes all demo data from local storage</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}