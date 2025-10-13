import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Shield,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  InfoIcon,
  FileText,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { 
  complianceCalendar2025,
  type ComplianceEvent
} from '../data/business_regulatory_calendar';
import { LoadingState } from '../common/LoadingState';
import { useUser } from '../hooks/useSupabase';

export function CalendarPage() {
  const { profile } = useUser();
  
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<ComplianceEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<ComplianceEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ComplianceEvent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    regulation: '',
    priority: '',
    role: ''
  });

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get events
      const allEvents = complianceCalendar2025;
      
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      setLoading(false);
    };
    
    loadEvents();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let filtered = events;
    
    if (filters.regulation) {
      filtered = filtered.filter(event => event.regulation === filters.regulation);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(event => event.priority === filters.priority);
    }
    
    if (filters.role && profile?.role) {
      const roleToFilter = filters.role === 'my-role' ? profile.role : filters.role;
      
      filtered = filtered.filter(event => 
        event.applicableToRoles.some(role => 
          role.toLowerCase().includes(roleToFilter.toLowerCase()) ||
          roleToFilter.toLowerCase().includes(role.toLowerCase())
        )
      );
    }
    
    setFilteredEvents(filtered);
  }, [filters, events, profile]);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      regulation: '',
      priority: '',
      role: ''
    });
  };

  // Date formatting utilities
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentMonthName = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRegulationBadgeVariant = (regulation: string) => {
    switch (regulation.toLowerCase()) {
      case 'ferpa':
        return 'ferpa';
      case 'coppa':
        return 'coppa';
      case 'gdpr':
        return 'gdpr';
      default:
        return 'general';
    }
  };

  // Calendar rendering helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const totalDays = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Calendar rows
    const calendar = [];
    
    // Add empty cells for previous month
    const firstRow = [];
    for (let i = 0; i < firstDay; i++) {
      firstRow.push(null);
    }
    
    // Add days for current month
    let currentRow = [...firstRow];
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      
      // Get events for this day
      const dayEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === currentMonth && 
               eventDate.getFullYear() === currentYear;
      });
      
      currentRow.push({
        day,
        events: dayEvents,
        date
      });
      
      if (currentRow.length === 7) {
        calendar.push(currentRow);
        currentRow = [];
      }
    }
    
    // Add remaining days
    if (currentRow.length > 0) {
      while (currentRow.length < 7) {
        currentRow.push(null);
      }
      calendar.push(currentRow);
    }
    
    return calendar;
  };

  // Current month calendar grid
  const calendarGrid = generateCalendar();

  // Event detail panel
  const renderEventDetail = () => {
    if (!selectedEvent) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="p-6 border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <span className="sr-only">Close</span>
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant={getRegulationBadgeVariant(selectedEvent.regulation)}>
                {selectedEvent.regulation}
              </Badge>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(selectedEvent.priority)} border`}>
                {selectedEvent.priority.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 border">
                {selectedEvent.frequency}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(new Date(selectedEvent.date))}</span>
              </div>
              <p className="text-muted-foreground">{selectedEvent.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-2">Legal Reference</h4>
                <p className="text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded border">
                  {selectedEvent.legalReference}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Consequences</h4>
                <p className="text-sm p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded border border-red-100 dark:border-red-800">
                  {selectedEvent.consequences}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Action Items</h4>
              <ul className="space-y-2">
                {selectedEvent.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Documentation Required</h4>
              <ul className="space-y-2">
                {selectedEvent.documentationRequired.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Applicable Roles</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.applicableToRoles.map((role, index) => (
                  <span key={index} className="px-2.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t bg-gray-50 dark:bg-gray-750">
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setSelectedEvent(null)}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compliance Calendar</h1>
        <p className="text-muted-foreground">
          Keep track of upcoming compliance deadlines and regulatory requirements
        </p>
      </div>
      
      <LoadingState loading={loading}>
        <div className="space-y-6">
          {/* Calendar Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="ml-2 font-medium">{getCurrentMonthName()}</span>
            </div>
            
            <div className="flex items-center ml-auto gap-2">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className="rounded-r-none"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Month
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleClearFilters()}
                className={filters.regulation || filters.priority || filters.role ? '' : 'hidden'}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-4 sticky top-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  {/* Regulation Filter */}
                  <div>
                    <label className="block text-sm mb-2">Regulation</label>
                    <select
                      className="w-full p-2 border border-input rounded-md bg-background text-sm"
                      value={filters.regulation}
                      onChange={(e) => handleFilterChange('regulation', e.target.value)}
                    >
                      <option value="">All Regulations</option>
                      <option value="FERPA">FERPA</option>
                      <option value="COPPA">COPPA</option>
                      <option value="GDPR">GDPR</option>
                      <option value="Federal">Federal</option>
                      <option value="State">State</option>
                    </select>
                  </div>
                  
                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm mb-2">Priority</label>
                    <select
                      className="w-full p-2 border border-input rounded-md bg-background text-sm"
                      value={filters.priority}
                      onChange={(e) => handleFilterChange('priority', e.target.value)}
                    >
                      <option value="">All Priorities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  {/* Role Filter */}
                  <div>
                    <label className="block text-sm mb-2">Role</label>
                    <select
                      className="w-full p-2 border border-input rounded-md bg-background text-sm"
                      value={filters.role}
                      onChange={(e) => handleFilterChange('role', e.target.value)}
                    >
                      <option value="">All Roles</option>
                      {profile?.role && (
                        <option value="my-role">My Role ({profile.role.replace('-', ' ')})</option>
                      )}
                      <option value="Administrator">Administrator</option>
                      <option value="Teacher">Teacher</option>
                      <option value="IT Staff">IT Staff</option>
                      <option value="Data">Data Personnel</option>
                    </select>
                  </div>
                </div>
                
                {/* Quick Filters */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-4">Quick Filters</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleFilterChange('priority', 'critical')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                      Critical Deadlines
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setFilters({
                          priority: '',
                          regulation: '',
                          role: profile?.role || ''
                        });
                      }}
                    >
                      <Shield className="h-4 w-4 mr-2 text-primary-500" />
                      My Responsibilities
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleFilterChange('regulation', 'FERPA')}
                    >
                      <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
                      FERPA Events
                    </Button>
                  </div>
                </div>
                
                {/* Calendar Legend */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-4">Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Calendar View */}
            <div className="flex-1">
              {viewMode === 'month' ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 border-b">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="p-2 text-center font-medium text-sm">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 divide-x divide-y">
                    {calendarGrid.flat().map((cell, index) => (
                      <div 
                        key={index}
                        className={`min-h-24 p-2 ${
                          !cell ? 'bg-gray-50 dark:bg-gray-750 text-muted-foreground' : ''
                        }`}
                      >
                        {cell && (
                          <>
                            <div className="font-medium text-sm mb-1">
                              {cell.day}
                            </div>
                            <div className="space-y-1">
                              {cell.events.slice(0, 3).map((event, eventIndex) => (
                                <div 
                                  key={eventIndex}
                                  className={`text-xs p-1 rounded truncate cursor-pointer ${
                                    event.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                                    event.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200' :
                                    event.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                  }`}
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {cell.events.length > 3 && (
                                <div className="text-xs text-center text-muted-foreground">
                                  + {cell.events.length - 3} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Upcoming Compliance Events</h3>
                  </div>
                  <div className="divide-y">
                    {filteredEvents.length === 0 ? (
                      <div className="p-8 text-center">
                        <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-2">No events found</h3>
                        <p className="text-muted-foreground mb-4">
                          There are no events matching your current filters.
                        </p>
                        <Button variant="outline" onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    ) : (
                      filteredEvents.map((event, index) => (
                        <div 
                          key={index}
                          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full flex-shrink-0 ${
                              event.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                              event.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30' :
                              event.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                              'bg-green-100 dark:bg-green-900/30'
                            }`}>
                              {event.priority === 'critical' ? (
                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                              ) : event.priority === 'high' ? (
                                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              ) : event.priority === 'medium' ? (
                                <InfoIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-medium">{event.title}</h3>
                                <Badge variant={getRegulationBadgeVariant(event.regulation)}>
                                  {event.regulation}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{formatDate(new Date(event.date))}</span>
                                </div>
                                <div className={`flex items-center gap-1 font-medium ${getPriorityClass(event.priority)}`}>
                                  <Clock className="h-4 w-4" />
                                  <span>{event.frequency}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Event Detail Modal */}
        {selectedEvent && renderEventDetail()}
        
        {/* Related Resources */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Compliance Resources</h2>
          <p className="text-muted-foreground mb-4">
            Use these resources to stay on top of your compliance calendar and deadlines.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link to="/privacy/obligations" title="Manage all compliance obligations">
              <Button variant="outline" size="sm" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Compliance Obligations
              </Button>
            </Link>
            <Link to="/privacy/automation" title="Automate compliance deadline reminders">
              <Button variant="outline" size="sm" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Automate Reminders
              </Button>
            </Link>
            <Link to="/training" title="Training on compliance management">
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Compliance Training
              </Button>
            </Link>
            <Link to="/resources/tools-templates" title="Download compliance planning templates">
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Planning Templates
              </Button>
            </Link>
          </div>
        </div>
      </LoadingState>
    </div>
  );
}