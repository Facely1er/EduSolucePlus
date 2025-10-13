import React from 'react';
import { useState } from 'react';
import { Award, Download, Share2, Calendar, CheckCircle, Star, Trophy, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { exportService } from '../services/exportService';
import { useNotifications, createNotification } from '../contexts/NotificationContext';
import { useUser } from '../hooks/useSupabase';

export function CertificatePage() {
  const { user, profile } = useUser();
  const { addNotification } = useNotifications();
  const [isGenerating, setIsGenerating] = useState(false);

  const certificates = [
    {
      id: 'ferpa-fundamentals-cert',
      title: 'FERPA Fundamentals Certification',
      description: 'Demonstrates comprehensive understanding of FERPA requirements and implementation',
      completedDate: '2025-01-02',
      expiryDate: '2026-01-02',
      score: 85,
      credentialId: 'EDS-FERPA-2025-001234',
      issuer: 'EduSoluce by ERMITS',
      status: 'active',
      regulation: 'ferpa',
      level: 'intermediate'
    },
    {
      id: 'privacy-basics-cert',
      title: 'Digital Privacy Basics Certification',
      description: 'Foundational knowledge of digital privacy principles and best practices',
      completedDate: '2024-12-15',
      expiryDate: '2025-12-15',
      score: 92,
      credentialId: 'EDS-PRIV-2024-005678',
      issuer: 'EduSoluce by ERMITS',
      status: 'active',
      regulation: 'general',
      level: 'beginner'
    },
    {
      id: 'coppa-compliance-cert',
      title: 'COPPA Compliance Certification',
      description: 'Advanced understanding of COPPA requirements for educational technology',
      completedDate: '2024-11-20',
      expiryDate: '2025-11-20',
      score: 78,
      credentialId: 'EDS-COPPA-2024-009876',
      issuer: 'EduSoluce by ERMITS',
      status: 'expiring-soon',
      regulation: 'coppa',
      level: 'advanced'
    }
  ];

  const achievements = [
    {
      id: 'privacy-champion',
      title: 'Privacy Champion',
      description: 'Completed 5 or more privacy assessments with scores above 80%',
      earnedDate: '2025-01-02',
      icon: '🏆',
      rarity: 'rare'
    },
    {
      id: 'ferpa-expert',
      title: 'FERPA Expert',
      description: 'Achieved perfect score on FERPA Fundamentals assessment',
      earnedDate: '2024-12-20',
      icon: '🎓',
      rarity: 'epic'
    },
    {
      id: 'continuous-learner',
      title: 'Continuous Learner',
      description: 'Completed training modules for 30 consecutive days',
      earnedDate: '2024-12-01',
      icon: '📚',
      rarity: 'common'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400';
      case 'expiring-soon':
        return 'text-amber-600 dark:text-amber-400';
      case 'expired':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800';
      case 'rare':
        return 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-950';
      case 'epic':
        return 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-950';
      default:
        return 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800';
    }
  };

  const handleDownloadCertificate = async (certificate: { id: string; title: string; type: string; completedAt: string }) => {
    setIsGenerating(true);
    try {
      // Use the actual user profile name or email if available
      const userName = profile?.full_name || user?.email?.split('@')[0] || 'Demo User';
      
      await exportService.generateCertificatePDF({
        recipientName: userName,
        courseName: certificate.title,
        completionDate: new Date(certificate.completedDate).toLocaleDateString(),
        score: certificate.score,
        certificateId: certificate.credentialId,
        instructorName: 'EduSoluce Privacy Team'
      });
      
      addNotification(createNotification.systemUpdate(
        `Certificate for ${certificate.title} has been downloaded`,
        '/certificate'
      ));
    } catch (error) {
      console.error('Certificate generation failed:', error);
      addNotification({
        type: 'error',
        title: 'Generation Failed',
        message: 'There was an error generating your certificate',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Certificates & Achievements</h1>
        <p className="text-muted-foreground">
          View and manage your privacy compliance certificates and learning achievements.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold">{certificates.length}</span>
          </div>
          <h3 className="font-semibold">Certificates</h3>
          <p className="text-sm text-muted-foreground">Total earned</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            <span className="text-2xl font-bold">{achievements.length}</span>
          </div>
          <h3 className="font-semibold">Achievements</h3>
          <p className="text-sm text-muted-foreground">Unlocked badges</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold">
              {certificates.filter(c => c.status === 'active').length}
            </span>
          </div>
          <h3 className="font-semibold">Active</h3>
          <p className="text-sm text-muted-foreground">Valid certificates</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold">
              {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
            </span>
          </div>
          <h3 className="font-semibold">Avg. Score</h3>
          <p className="text-sm text-muted-foreground">Assessment average</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Certificates */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">My Certificates</h2>
          <div className="space-y-6">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <Award className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{certificate.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{certificate.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Credential ID: {certificate.credentialId}</span>
                        <span>Score: {certificate.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={certificate.regulation as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {certificate.regulation.toUpperCase()}
                    </Badge>
                    <Badge level={certificate.level as 'beginner' | 'intermediate' | 'advanced'}>
                      {certificate.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="font-medium">{new Date(certificate.completedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className={`font-medium ${getStatusColor(certificate.status)}`}>
                      {new Date(certificate.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    Issued by {certificate.issuer}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownloadCertificate(certificate)}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {isGenerating ? 'Generating...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`rounded-lg border-2 p-4 ${getRarityColor(achievement.rarity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Verification */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-2">Certificate Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All certificates can be verified using their credential IDs on our verification portal.
            </p>
            <Button variant="outline" className="w-full">
              Verify Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}