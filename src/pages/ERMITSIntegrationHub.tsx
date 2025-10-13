import React, { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Clock, Target, Shield, BarChart3, Brain, Zap, FileText, Lock, BookOpen, Users, Home, GraduationCap, MessageSquare, UserCheck, Globe, Monitor } from 'lucide-react';

// Type definitions
interface EcosystemNode {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  position: { x: string; y: string };
  color: string;
  bgColor: string;
  borderColor: string;
  status: 'active' | 'connected' | 'pending' | 'planned';
}

interface ConnectionStatus {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'pending' | 'error' | 'planned';
  lastSync?: string;
  statusText: string;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ReactNode;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface IntegrationOpportunity {
  id: string;
  category: string;
  title: string;
  description: string;
  product: 'SocialCaution' | 'PandaGarde' | 'Family Hub';
  icon: React.ReactNode;
  implementation: string;
}

const ERMITSIntegrationHub: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('2 hours ago');

  // Logo configuration - Specify your logo file extensions here
  const logoMap = {
    edusoluce: '/logos/edusoluce-logo.png', // Change extension to match your files
    socialcaution: '/logos/socialcaution-logo.png', 
    pandagarde: '/logos/pandagarde-logo.png',
    familyhub: '/logos/familyhub-logo.png',
    cybercaution: '/logos/cybercaution-logo.png',
    cybersoluce: '/logos/cybersoluce-logo.png',
    cybercorrect: '/logos/cybercorrect-logo.png',
    vendorsoluce: '/logos/vendorsoluce-logo.png',
    'ermits-advisory': '/logos/ermits-advisory-logo.png'
  };

  // Alternative: If you have mixed formats, specify each individually:
  // const logoMap = {
  //   edusoluce: '/logos/edusoluce-logo.svg',
  //   socialcaution: '/logos/socialcaution-logo.png', 
  //   pandagarde: '/logos/pandagarde-logo.jpg',
  //   // ... etc
  // };

  // Fallback icon mapping
  const fallbackIcons = {
    edusoluce: <GraduationCap className="w-6 h-6" />,
    socialcaution: <Globe className="w-4 h-4" />,
    pandagarde: <Shield className="w-4 h-4" />,
    familyhub: <Home className="w-4 h-4" />,
    cybercaution: <AlertCircle className="w-4 h-4" />,
    cybersoluce: <Shield className="w-4 h-4" />,
    cybercorrect: <CheckCircle className="w-4 h-4" />,
    vendorsoluce: <Users className="w-4 h-4" />,
    'ermits-advisory': <Brain className="w-4 h-4" />
  };

  // Logo component with fallback for multiple file formats
  const LogoIcon = ({ nodeId, isHub = false }: { nodeId: string; isHub?: boolean }) => {
    const [logoError, setLogoError] = useState(false);
    const logoPath = logoMap[nodeId as keyof typeof logoMap];
    const fallbackIcon = fallbackIcons[nodeId as keyof typeof fallbackIcons];
    const sizeClass = isHub ? "w-10 h-10" : "w-7 h-7";
    
    if (logoError || !logoPath) {
      return fallbackIcon;
    }
    
    return (
      <img 
        src={logoPath} 
        alt={`${nodeId} logo`} 
        className={`${sizeClass} object-contain`}
        onError={() => setLogoError(true)}
        onLoad={() => setLogoError(false)} // Reset error state on successful load
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%',
        }}
      />
    );
  };

  // Ecosystem nodes configuration - Updated with logo system
  const ecosystemNodes: EcosystemNode[] = [
    {
      id: 'edusoluce',
      name: 'EduSoluce™',
      subtitle: 'Privacy Education Hub',
      icon: <LogoIcon nodeId="edusoluce" isHub={true} />,
      position: { x: '50%', y: '50%' },
      color: '#FFFFFF',
      bgColor: '#2563EB',
      borderColor: '#1D4ED8',
      status: 'active'
    },
    {
      id: 'socialcaution',
      name: 'SocialCaution',
      subtitle: 'Social Media Safety',
      icon: <LogoIcon nodeId="socialcaution" />,
      position: { x: '20%', y: '20%' },
      color: '#E91E63',
      bgColor: 'rgba(233, 30, 99, 0.15)',
      borderColor: '#E91E63',
      status: 'connected'
    },
    {
      id: 'pandagarde',
      name: 'PandaGarde',
      subtitle: 'COPPA Protection',
      icon: <LogoIcon nodeId="pandagarde" />,
      position: { x: '80%', y: '20%' },
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.15)',
      borderColor: '#4CAF50',
      status: 'connected'
    },
    {
      id: 'familyhub',
      name: 'Family Hub',
      subtitle: 'Home Integration',
      icon: <LogoIcon nodeId="familyhub" />,
      position: { x: '50%', y: '75%' },
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.15)',
      borderColor: '#FF9800',
      status: 'connected'
    },
    {
      id: 'cybercaution',
      name: 'CyberCaution™',
      subtitle: 'Threat Intelligence',
      icon: <LogoIcon nodeId="cybercaution" />,
      position: { x: '10%', y: '50%' },
      color: '#0072C6',
      bgColor: 'rgba(0, 114, 198, 0.15)',
      borderColor: '#0072C6',
      status: 'connected'
    },
    {
      id: 'cybersoluce',
      name: 'CyberSoluce™',
      subtitle: 'GRC Platform',
      icon: <LogoIcon nodeId="cybersoluce" />,
      position: { x: '90%', y: '50%' },
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.15)',
      borderColor: '#22C55E',
      status: 'pending'
    },
    {
      id: 'cybercorrect',
      name: 'CyberCorrect™',
      subtitle: 'Compliance Engine',
      icon: <LogoIcon nodeId="cybercorrect" />,
      position: { x: '75%', y: '75%' },
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.15)',
      borderColor: '#8B5CF6',
      status: 'planned'
    },
    {
      id: 'vendorsoluce',
      name: 'VendorSoluce™',
      subtitle: 'Supply Chain Risk',
      icon: <LogoIcon nodeId="vendorsoluce" />,
      position: { x: '25%', y: '75%' },
      color: '#DC2626',
      bgColor: 'rgba(220, 38, 38, 0.15)',
      borderColor: '#DC2626',
      status: 'planned'
    },
    {
      id: 'ermits-advisory',
      name: 'ERMITS Advisory',
      subtitle: 'Strategic Intelligence',
      icon: <LogoIcon nodeId="ermits-advisory" />,
      position: { x: '50%', y: '15%' },
      color: '#6366F1',
      bgColor: 'rgba(99, 102, 241, 0.15)',
      borderColor: '#6366F1',
      status: 'connected'
    }
  ];

  // Connection status data
  const connectionStatuses: ConnectionStatus[] = [
    {
      id: 'socialcaution',
      name: 'SocialCaution',
      description: 'Social media safety monitoring',
      status: 'connected',
      lastSync: '1 hour ago',
      statusText: 'Active'
    },
    {
      id: 'pandagarde',
      name: 'PandaGarde',
      description: 'COPPA compliance automation',
      status: 'connected',
      lastSync: '30 minutes ago',
      statusText: 'Active'
    },
    {
      id: 'familyhub',
      name: 'Family Hub',
      description: 'Home-school privacy education',
      status: 'connected',
      lastSync: '45 minutes ago',
      statusText: 'Active'
    },
    {
      id: 'cybercaution',
      name: 'CyberCaution™',
      description: 'Threat intelligence feeds',
      status: 'connected',
      lastSync: '3 hours ago',
      statusText: 'Connected'
    },
    {
      id: 'cybersoluce',
      name: 'CyberSoluce™',
      description: 'GRC integration pending',
      status: 'pending',
      statusText: 'Pending'
    },
    {
      id: 'cybercorrect',
      name: 'CyberCorrect™',
      description: 'FERPA compliance automation',
      status: 'planned',
      statusText: 'Planned'
    },
    {
      id: 'vendorsoluce',
      name: 'VendorSoluce™',
      description: 'EdTech vendor assessments',
      status: 'planned',
      statusText: 'Q2 2025'
    },
    {
      id: 'ermits-advisory',
      name: 'ERMITS Advisory',
      description: 'Strategic guidance',
      status: 'connected',
      statusText: 'Available'
    }
  ];

  // Integration opportunities data
  const integrationOpportunities: IntegrationOpportunity[] = [
    // Curriculum Integration
    {
      id: 'digital-citizenship',
      category: 'Curriculum Integration',
      title: 'Digital Citizenship Programs',
      description: 'Embed privacy education as core component of digital citizenship curriculum with real-time social media monitoring and family engagement.',
      product: 'SocialCaution',
      icon: <GraduationCap className="w-5 h-5" />,
      implementation: 'SocialCaution integrates directly with digital citizenship lessons, providing real-time examples and interactive learning experiences.'
    },
    {
      id: 'computer-science',
      category: 'Curriculum Integration',
      title: 'Computer Science Classes',
      description: 'Technical privacy implementation education showing students how COPPA protections work in real educational technology systems.',
      product: 'PandaGarde',
      icon: <Monitor className="w-5 h-5" />,
      implementation: 'PandaGarde provides hands-on labs where students learn about data minimization and protection technologies in action.'
    },
    {
      id: 'social-studies',
      category: 'Curriculum Integration',
      title: 'Social Studies Integration',
      description: 'Privacy rights and civil liberties education connecting legal frameworks to practical family privacy management.',
      product: 'Family Hub',
      icon: <BookOpen className="w-5 h-5" />,
      implementation: 'Family Hub facilitates discussions about privacy rights with take-home activities that engage parents and siblings.'
    },
    {
      id: 'media-literacy',
      category: 'Curriculum Integration',
      title: 'English/Communications',
      description: 'Media literacy and critical analysis of social media platforms with real-time monitoring and assessment tools.',
      product: 'SocialCaution',
      icon: <MessageSquare className="w-5 h-5" />,
      implementation: 'SocialCaution provides analysis tools for students to critically examine social media content and privacy implications.'
    },
    
    // School-Wide Programs
    {
      id: 'peer-education',
      category: 'School-Wide Programs',
      title: 'Peer Education Initiatives',
      description: 'Students teaching students using social media monitoring insights and age-appropriate privacy education tools.',
      product: 'SocialCaution',
      icon: <Users className="w-5 h-5" />,
      implementation: 'SocialCaution provides peer mentors with dashboards showing anonymized social media risks to guide peer education sessions.'
    },
    {
      id: 'privacy-campaigns',
      category: 'School-Wide Programs',
      title: 'Privacy Awareness Campaigns',
      description: 'Student-led advocacy campaigns using COPPA compliance data to demonstrate the importance of privacy protections.',
      product: 'PandaGarde',
      icon: <Globe className="w-5 h-5" />,
      implementation: 'PandaGarde generates school-wide privacy metrics that students use to create compelling advocacy materials.'
    },
    {
      id: 'digital-wellness',
      category: 'School-Wide Programs',
      title: 'Digital Wellness Programs',
      description: 'Holistic approach to online safety combining social media monitoring, age-appropriate protections, and family engagement.',
      product: 'Family Hub',
      icon: <Shield className="w-5 h-5" />,
      implementation: 'Family Hub coordinates school-wide wellness initiatives with home reinforcement and family participation tracking.'
    },
    {
      id: 'student-government',
      category: 'School-Wide Programs',
      title: 'Student Government Integration',
      description: 'Privacy policy advocacy and input using real compliance data and family engagement insights to inform school policies.',
      product: 'PandaGarde',
      icon: <UserCheck className="w-5 h-5" />,
      implementation: 'PandaGarde provides student government with age-appropriate compliance dashboards to inform policy recommendations.'
    },
    
    // Family Engagement
    {
      id: 'parent-education',
      category: 'Family Engagement',
      title: 'Parent Education Nights',
      description: 'Students teaching families about social media safety and privacy rights using interactive monitoring tools and dashboards.',
      product: 'SocialCaution',
      icon: <Home className="w-5 h-5" />,
      implementation: 'SocialCaution provides family-friendly dashboards where students demonstrate social media risks to parents in real-time.'
    },
    {
      id: 'home-privacy-audits',
      category: 'Family Engagement',
      title: 'Home Privacy Audits',
      description: 'Family privacy improvement projects guided by student privacy literacy and supported by comprehensive family tools.',
      product: 'Family Hub',
      icon: <Target className="w-5 h-5" />,
      implementation: 'Family Hub provides structured audit tools that students and families use together to improve home privacy practices.'
    },
    {
      id: 'intergenerational-learning',
      category: 'Family Engagement',
      title: 'Intergenerational Learning',
      description: 'Students helping parents with technology and privacy settings while learning about COPPA protections for younger siblings.',
      product: 'PandaGarde',
      icon: <Users className="w-5 h-5" />,
      implementation: 'PandaGarde offers family-appropriate interfaces where students teach parents about age-based privacy protections.'
    },
    {
      id: 'school-home-communication',
      category: 'Family Engagement',
      title: 'School-Home Communication',
      description: 'Consistent privacy messaging between school and home using coordinated social media monitoring and family engagement platforms.',
      product: 'Family Hub',
      icon: <MessageSquare className="w-5 h-5" />,
      implementation: 'Family Hub synchronizes school privacy education with home reinforcement, ensuring consistent messaging and support.'
    }
  ];

  // Benefits data
  const benefits: Benefit[] = [
    {
      id: 'whole-community',
      title: 'Whole-Community Privacy Education',
      description: 'Engage students, teachers, families, and administrators with coordinated privacy education through SocialCaution, PandaGarde, and Family Hub integration.',
      icon: <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    },
    {
      id: 'real-time-application',
      title: 'Real-Time Learning Application',
      description: 'Students apply privacy knowledge immediately through social media monitoring, COPPA protections, and family engagement activities.',
      icon: <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    },
    {
      id: 'age-appropriate',
      title: 'Age-Appropriate Protection',
      description: 'Automatic COPPA compliance through PandaGarde while providing age-appropriate privacy education through the integrated ecosystem.',
      icon: <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    },
    {
      id: 'behavioral-outcomes',
      title: 'Measurable Behavioral Change',
      description: 'Track actual privacy behavior improvements across social media, school systems, and home environments with comprehensive analytics.',
      icon: <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    },
    {
      id: 'curriculum-integration',
      title: 'Seamless Curriculum Integration',
      description: 'Integrate privacy education into digital citizenship, computer science, social studies, and communications through specialized tools.',
      icon: <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    },
    {
      id: 'family-engagement',
      title: 'Family-School Partnership',
      description: 'Bridge school privacy education with home reinforcement through Family Hub, creating consistent privacy practices across environments.',
      icon: <Home className="w-5 h-5 text-primary-600 dark:text-primary-400" />
    }
  ];

  // Roadmap data
  const roadmapItems: RoadmapItem[] = [
    {
      id: 'core-platform',
      title: 'Core Platform Launch',
      description: 'EduSoluce™ platform with gamified content and LMS integration',
      quarter: 'Q4 2024',
      status: 'completed',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: 'education-ecosystem',
      title: 'Education Ecosystem Integration',
      description: 'SocialCaution, PandaGarde, and Family Hub connectivity for comprehensive privacy education',
      quarter: 'Q1 2025',
      status: 'in-progress',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'cybercaution-feeds',
      title: 'CyberCaution™ Intelligence Feeds',
      description: 'Real-time threat intelligence specific to educational sector',
      quarter: 'Q1 2025',
      status: 'in-progress',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'cybercorrect-compliance',
      title: 'CyberCorrect™ Compliance Engine',
      description: 'Automated FERPA/COPPA compliance monitoring and reporting',
      quarter: 'Q2 2025',
      status: 'planned',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'vendorsoluce-assessment',
      title: 'VendorSoluce™ EdTech Assessment',
      description: 'Automated vendor risk assessment for educational technology',
      quarter: 'Q3 2025',
      status: 'planned',
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 'intelligence-engine',
      title: 'ERMITS Intelligence Engine™',
      description: 'AI-driven educational cybersecurity recommendations',
      quarter: 'Q4 2025',
      status: 'planned',
      icon: <Brain className="w-4 h-4" />
    }
  ];

  // Simulate sync functionality
  const handleRefreshConnections = () => {
    setLastSyncTime('Just now');
    // Add loading state simulation
    setTimeout(() => {
      setLastSyncTime('2 minutes ago');
    }, 3000);
  };

  // Status icon component
  const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'planned':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: string; text: string }> = ({ status, text }) => {
    const getStatusStyles = (status: string) => {
      switch (status) {
        case 'connected':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'pending':
          return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
        case 'error':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'planned':
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      }
    };

    return (
      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getStatusStyles(status)}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="container py-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">ERMITS Resilience Operating System™</h1>
        <p className="text-muted-foreground text-lg">Connect EduSoluce with the broader ERMITS ecosystem to transform educational cybersecurity from compliance burden to competitive advantage</p>
      </div>

      {/* Ecosystem and Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Ecosystem Visualization */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card shadow-sm h-full">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-semibold mb-2">ERMITS Ecosystem Architecture</h3>
              <p className="text-sm text-muted-foreground">Interactive visualization of EduSoluce™ integration with the ERMITS Resilience Operating System</p>
            </div>
            <div className="p-6">
              <div className="relative h-[600px] bg-gradient-to-br from-blue-50 to-purple-50/30 dark:from-blue-950 dark:to-purple-950/30 rounded-lg border overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Dynamic Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Core hub connections (EduSoluce to others) */}
                  {ecosystemNodes
                    .filter(node => node.id !== 'edusoluce')
                    .map((node) => {
                      const hubX = 50;
                      const hubY = 50;
                      const nodeX = parseFloat(node.position.x);
                      const nodeY = parseFloat(node.position.y);
                      
                      const isSelected = selectedNode === node.id || selectedNode === 'edusoluce';
                      const isHovered = hoveredNode === node.id || hoveredNode === 'edusoluce';
                      const isActive = node.status === 'connected' || node.status === 'active';
                      
                      return (
                        <g key={`connection-${node.id}`}>
                          {/* Connection line */}
                          <line 
                            x1={hubX} 
                            y1={hubY} 
                            x2={nodeX} 
                            y2={nodeY}
                            stroke={isSelected ? "#FFA000" : 
                                   isHovered ? node.borderColor : 
                                   isActive ? "url(#connectionGradient)" : "#E5E7EB"}
                            strokeWidth={isSelected ? "2" : isHovered ? "1.5" : isActive ? "1" : "0.5"}
                            strokeDasharray={isActive ? "none" : "5,5"}
                            opacity={isSelected ? "1" : isHovered ? "0.9" : isActive ? "0.7" : "0.3"}
                            filter={isSelected ? "url(#glow)" : "none"}
                            className="transition-all duration-300"
                          />
                          
                          {/* Data flow animation for active connections */}
                          {(isActive || isHovered) && (
                            <circle r={isSelected ? "2" : "1.5"} fill="#FFA000" opacity="0.8">
                              <animateMotion dur={isSelected ? "2s" : "3s"} repeatCount="indefinite">
                                <path d={`M ${hubX} ${hubY} L ${nodeX} ${nodeY}`} />
                              </animateMotion>
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  
                  {/* Cross-platform connections - updated for new positions */}
                  <line x1="20" y1="20" x2="80" y2="20" stroke="#E91E63" strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
                  <line x1="20" y1="20" x2="50" y2="75" stroke="#4CAF50" strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
                  <line x1="80" y1="20" x2="50" y2="75" stroke="#FF9800" strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
                  <line x1="25" y1="75" x2="75" y2="75" stroke="#8B5CF6" strokeWidth="0.6" opacity="0.4" strokeDasharray="3,3" />
                </svg>

                {/* Ecosystem Nodes */}
                {ecosystemNodes.map((node) => {
                  const isSelected = selectedNode === node.id;
                  const isHovered = hoveredNode === node.id;
                  const isHub = node.id === 'edusoluce';
                  
                  return (
                    <div
                      key={node.id}
                      className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 z-20 ${
                        isSelected ? 'scale-110' : isHovered ? 'scale-105' : 'hover:scale-105'
                      }`}
                      style={{
                        left: node.position.x,
                        top: node.position.y,
                        transform: `translate(-50%, -50%)`
                      }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Node circle */}
                      <div
                        className={`flex items-center justify-center rounded-full transition-all duration-300 relative ${
                          isHub ? 'w-24 h-24 text-4xl border-4' : 'w-16 h-16 text-3xl border-3'
                        } ${isSelected ? 'shadow-2xl' : isHovered ? 'shadow-xl' : 'shadow-lg'}`}
                        style={{
                          backgroundColor: isHub ? node.bgColor : node.bgColor,
                          borderColor: isSelected ? '#FFA000' : isHovered ? node.borderColor : node.borderColor,
                          color: isHub ? 'white' : node.color,
                          boxShadow: isSelected ? `0 0 30px ${node.borderColor}40` : 
                                     isHovered ? `0 0 20px ${node.borderColor}30` : undefined
                        }}
                      >
                        {node.icon}
                        
                        {/* Status indicator */}
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center ${
                          node.status === 'active' || node.status === 'connected' ? 'bg-green-500' :
                          node.status === 'pending' ? 'bg-amber-500' : 'bg-gray-400'
                        }`}>
                          {node.status === 'active' || node.status === 'connected' ? (
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          ) : node.status === 'pending' ? (
                            <Clock className="w-2.5 h-2.5 text-white" />
                          ) : (
                            <AlertCircle className="w-2.5 h-2.5 text-white" />
                          )}
                        </div>
                      </div>
                      
                      {/* Node label */}
                      <div className={`text-center mt-2 transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                        <div className={`font-semibold ${isHub ? 'text-sm' : 'text-xs'}`}>{node.name}</div>
                        <div className={`text-muted-foreground ${isHub ? 'text-xs' : 'text-xs'}`}>{node.subtitle}</div>
                      </div>
                      
                      {/* Hover tooltip */}
                      {isHovered && !isSelected && (
                        <div className="absolute top-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-2 min-w-40 z-30 pointer-events-none">
                          <div className="text-xs font-medium">{node.name}</div>
                          <div className="text-xs text-muted-foreground">{node.subtitle}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StatusIcon status={node.status} />
                            <span className="text-xs capitalize">{node.status}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Selected node details */}
                      {isSelected && (
                        <div className="absolute top-full mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl border p-4 min-w-56 z-30">
                          <div className="text-sm font-medium mb-1">{node.name}</div>
                          <div className="text-xs text-muted-foreground mb-3">{node.subtitle}</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <StatusIcon status={node.status} />
                              <span className="text-xs font-medium capitalize">{node.status}</span>
                            </div>
                            {node.status === 'connected' && (
                              <div className="text-xs text-green-600 dark:text-green-400">
                                ✓ Integration active and syncing
                              </div>
                            )}
                            {node.status === 'pending' && (
                              <div className="text-xs text-amber-600 dark:text-amber-400">
                                ⏳ Integration in development
                              </div>
                            )}
                            {node.status === 'planned' && (
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                📅 Scheduled for future release
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Compact Legend */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
                  <div className="text-xs font-medium mb-2">Guide</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Click nodes to explore</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <span>Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-gray-300" style={{borderTop: '1px dashed #9CA3AF'}}></div>
                      <span>Planned</span>
                    </div>
                  </div>
                </div>

                {/* Compact Status Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-3 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="font-medium text-sm">EduSoluce™ Privacy Education Hub</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Active Integration</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                      Social Media
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      COPPA Protection
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      Family Hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div>
          <div className="rounded-lg border bg-card shadow-sm h-full">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-semibold mb-2">Integration Status</h3>
              <p className="text-sm text-muted-foreground">Current status of your ERMITS ecosystem connections</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* System Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">System Status</p>
                    <p className="text-xs text-muted-foreground">Last synced: {lastSyncTime}</p>
                  </div>
                  <StatusBadge status="connected" text="Active" />
                </div>

                {/* Connections */}
                <div>
                  <p className="text-sm font-medium mb-3">Ecosystem Connections</p>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {connectionStatuses.map((connection) => (
                      <div key={connection.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <StatusIcon status={connection.status} />
                            <span className="font-medium ml-2">{connection.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{connection.description}</p>
                          {connection.lastSync && (
                            <p className="text-xs text-muted-foreground mt-1">Last sync: {connection.lastSync}</p>
                          )}
                        </div>
                        <StatusBadge status={connection.status} text={connection.statusText} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefreshConnections}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Sync Ecosystem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Opportunities */}
      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Educational Integration Opportunities</h2>
          <p className="text-muted-foreground">
            Seamlessly integrate SocialCaution, PandaGarde, and Family Hub into existing educational programs and curriculum
          </p>
        </div>

        {/* Curriculum Integration */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            Curriculum Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationOpportunities
              .filter(opp => opp.category === 'Curriculum Integration')
              .map((opportunity) => (
                <div key={opportunity.id} className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      {opportunity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{opportunity.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          opportunity.product === 'SocialCaution' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                          opportunity.product === 'PandaGarde' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                          {opportunity.product}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                      <p className="text-xs text-muted-foreground italic">{opportunity.implementation}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* School-Wide Programs */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            School-Wide Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationOpportunities
              .filter(opp => opp.category === 'School-Wide Programs')
              .map((opportunity) => (
                <div key={opportunity.id} className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      {opportunity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{opportunity.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          opportunity.product === 'SocialCaution' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                          opportunity.product === 'PandaGarde' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                          {opportunity.product}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                      <p className="text-xs text-muted-foreground italic">{opportunity.implementation}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Family Engagement */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Home className="w-5 h-5 mr-2 text-primary" />
            Family Engagement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationOpportunities
              .filter(opp => opp.category === 'Family Engagement')
              .map((opportunity) => (
                <div key={opportunity.id} className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      {opportunity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{opportunity.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          opportunity.product === 'SocialCaution' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                          opportunity.product === 'PandaGarde' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                          {opportunity.product}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                      <p className="text-xs text-muted-foreground italic">{opportunity.implementation}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Product Integration Flow */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Seamless Ecosystem Flow</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="text-2xl mb-2">🎓</div>
              <h4 className="font-medium mb-1">Learn</h4>
              <p className="text-xs text-muted-foreground">Students master privacy concepts through EduSoluce assessments</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-medium mb-1">Apply</h4>
              <p className="text-xs text-muted-foreground">Practice social media safety using SocialCaution monitoring</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="text-2xl mb-2">🐼</div>
              <h4 className="font-medium mb-1">Understand</h4>
              <p className="text-xs text-muted-foreground">See technical protections through PandaGarde systems</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <div className="text-2xl mb-2">🏠</div>
              <h4 className="font-medium mb-1">Extend</h4>
              <p className="text-xs text-muted-foreground">Reinforce at home via Family Hub engagement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits and Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Benefits */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-2xl font-semibold mb-2">ERMITS Integration Benefits</h3>
            <p className="text-sm text-muted-foreground">How connecting to the Resilience Operating System enhances educational cybersecurity</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Roadmap */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-2xl font-semibold mb-2">ERMITS Integration Roadmap</h3>
            <p className="text-sm text-muted-foreground">Planned ecosystem integrations and feature releases</p>
          </div>
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
              <div className="space-y-6">
                {roadmapItems.map((item) => (
                  <div key={item.id} className="relative pl-10">
                    <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      item.status === 'completed' ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-400' :
                      item.status === 'in-progress' ? 'bg-amber-100 text-amber-500 dark:bg-amber-900 dark:text-amber-400' :
                      'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{item.quarter}</span>
                        <StatusBadge 
                          status={item.status} 
                          text={item.status === 'completed' ? 'Complete' : 
                               item.status === 'in-progress' ? 'In Progress' : 'Planned'} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">About the ERMITS Resilience Operating System™</h2>
        <p className="mb-4 text-muted-foreground">
          <strong className="text-foreground">ERMITS</strong> (Enterprise Risk Management & Information Technology Security) is the world's first{' '}
          <strong className="text-foreground">Resilience Operating System™</strong> — an integrated framework that empowers organizations to{' '}
          <strong className="text-foreground">predict risks, protect assets, and prosper strategically</strong> in today's high-stakes digital landscape.
        </p>
        <p className="mb-4 text-muted-foreground">
          <strong className="text-foreground">EduSoluce™</strong> serves as the education-centric module within the ERMITS ecosystem, delivering{' '}
          <strong className="text-foreground">"Privacy and Security Education for All"</strong> through{' '}
          <strong className="text-foreground">gamified content, community engagement</strong>, and{' '}
          <strong className="text-foreground">measurable behavioral change</strong>. It equips educational institutions with the tools to embed{' '}
          <strong className="text-foreground">digital resilience</strong> across every layer — from{' '}
          <strong className="text-foreground">individual awareness to institutional governance</strong>.
        </p>
        <p className="text-muted-foreground">
          The ERMITS ecosystem operates as a <strong className="text-foreground">synergistic network</strong> — each module reinforces the others, driving{' '}
          <strong className="text-foreground">compounding value</strong> through{' '}
          <strong className="text-foreground">predictive intelligence, automated defenses</strong>, and{' '}
          <strong className="text-foreground">resilience-by-design</strong> strategies. This unified approach enables enterprises and educational systems alike to move beyond compliance and toward{' '}
          <strong className="text-foreground">proactive, adaptive security leadership</strong>.
        </p>
      </div>
    </div>
  );
};

export default ERMITSIntegrationHub;