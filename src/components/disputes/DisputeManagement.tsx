
import React, { useState } from 'react';
import { Search, MessageSquare, Shield } from 'lucide-react';
import { mockDisputes } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Dispute {
  id: string;
  title: string;
  reporter: string;
  reported: string;
  date: string;
  status: string;
  priority: string;
}

const DisputeManagement = () => {
  const [disputes, setDisputes] = useState(mockDisputes);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentDispute, setCurrentDispute] = useState<Dispute | null>(null);
  const { toast } = useToast();

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = 
      dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.reported.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || dispute.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (dispute: Dispute) => {
    setCurrentDispute(dispute);
    setShowDetailsModal(true);
  };

  const handleViewChat = (dispute: Dispute) => {
    setCurrentDispute(dispute);
    setShowChatModal(true);
  };

  const handleResolveDispute = (disputeId: string, action: 'resolve' | 'warn' | 'suspend') => {
    const updatedDisputes = disputes.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: 'resolved' } : dispute
    );
    setDisputes(updatedDisputes);
    
    const dispute = disputes.find(d => d.id === disputeId);
    
    let title = "Dispute resolved";
    let description = `Dispute #${dispute?.id.split('-')[1]} has been marked as resolved`;
    
    if (action === 'warn') {
      description += ` and a warning has been issued to ${dispute?.reported}`;
    } else if (action === 'suspend') {
      description += ` and ${dispute?.reported} has been suspended`;
    }
    
    toast({ title, description });
    setShowDetailsModal(false);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500';
      case 'low': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dispute Management</h1>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-60"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
          </select>
          
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDisputes.length > 0 ? (
          filteredDisputes.map(dispute => (
            <div 
              key={dispute.id} 
              className="bg-dark-100 rounded-lg shadow-md p-4 hover:bg-dark-200/50 cursor-pointer"
              onClick={() => handleViewDetails(dispute)}
            >
              <div className="flex justify-between mb-2">
                <span className={cn(
                  "status-badge",
                  dispute.status === 'resolved' ? "status-approved" : 
                  dispute.status === 'under_review' ? "status-pending" : 
                  "status-rejected"
                )}>
                  {dispute.status.replace('_', ' ')}
                </span>
                <span className={cn(
                  "status-badge",
                  getPriorityClass(dispute.priority)
                )}>
                  {dispute.priority} priority
                </span>
              </div>
              
              <h3 className="font-medium text-lg mb-2 truncate">{dispute.title}</h3>
              
              <div className="text-sm text-gray-400">
                <div className="mb-1">
                  <span className="font-medium">Reporter:</span> {dispute.reporter}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Reported:</span> {dispute.reported}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {dispute.date}
                </div>
              </div>
              
              <div className="flex mt-4 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewChat(dispute);
                  }}
                  className="flex items-center text-sm text-gray-300 hover:text-primary"
                >
                  <MessageSquare size={16} className="mr-1" />
                  View Chat
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-400">
            No disputes found matching the current filters
          </div>
        )}
      </div>
      
      {/* Dispute Details Modal */}
      {showDetailsModal && currentDispute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Dispute Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className={cn(
                "status-badge",
                currentDispute.status === 'resolved' ? "status-approved" : 
                currentDispute.status === 'under_review' ? "status-pending" : 
                "status-rejected"
              )}>
                {currentDispute.status.replace('_', ' ')}
              </span>
              <span className={cn(
                "status-badge",
                getPriorityClass(currentDispute.priority)
              )}>
                {currentDispute.priority} priority
              </span>
              <span className="text-gray-400 text-sm">
                Filed on {currentDispute.date}
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{currentDispute.title}</h3>
              <p className="text-gray-400 mb-4">
                User {currentDispute.reporter} reported inappropriate behavior from {currentDispute.reported} 
                during a transaction for "Vintage Camera". The reporter claims that the seller was hostile 
                and used threatening language when asked about the product's condition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-2">Reporter Information</h4>
                <div className="bg-dark-200 p-4 rounded-md">
                  <div className="mb-1"><span className="text-gray-400">Username:</span> {currentDispute.reporter}</div>
                  <div className="mb-1"><span className="text-gray-400">Account Age:</span> 2 years</div>
                  <div><span className="text-gray-400">Previous Reports:</span> None</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Reported User Information</h4>
                <div className="bg-dark-200 p-4 rounded-md">
                  <div className="mb-1"><span className="text-gray-400">Username:</span> {currentDispute.reported}</div>
                  <div className="mb-1"><span className="text-gray-400">Account Age:</span> 6 months</div>
                  <div><span className="text-gray-400">Previous Warnings:</span> 1</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Evidence</h4>
              <div className="bg-dark-200 p-4 rounded-md flex items-center gap-2">
                <MessageSquare size={16} />
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowChatModal(true);
                  }}
                  className="text-primary hover:underline"
                >
                  View conversation history
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Close
              </button>
              
              {currentDispute.status !== 'resolved' && (
                <>
                  <button 
                    onClick={() => handleResolveDispute(currentDispute.id, 'resolve')}
                    className="px-4 py-2 bg-green-500/20 text-green-500 rounded-md hover:bg-green-500/30"
                  >
                    Resolve (No Action)
                  </button>
                  <button 
                    onClick={() => handleResolveDispute(currentDispute.id, 'warn')}
                    className="px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-md hover:bg-yellow-500/30"
                  >
                    Issue Warning
                  </button>
                  <button 
                    onClick={() => handleResolveDispute(currentDispute.id, 'suspend')}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/30"
                  >
                    Suspend User
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Chat History Modal */}
      {showChatModal && currentDispute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chat History</h2>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-dark-200 rounded-lg p-4 h-80 overflow-y-auto mb-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col items-start">
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reporter} - 2 days ago</div>
                    <div>Hi there, I'm interested in your vintage camera listing. Is it still available?</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reported} - 2 days ago</div>
                    <div>Yeah it's available. $200 firm.</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reporter} - 2 days ago</div>
                    <div>Great! Can you tell me more about its condition? Are there any issues with it?</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reported} - 2 days ago</div>
                    <div>It works fine. What's with all the questions? Are you going to buy it or not?</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reporter} - 2 days ago</div>
                    <div>I'm just trying to make sure it's in good condition before purchasing. That's a reasonable question.</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reported} - 2 days ago</div>
                    <div>Listen, I don't have time for tire kickers. Either buy it or get lost. Don't waste my time with stupid questions.</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="bg-dark-100 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reporter} - 2 days ago</div>
                    <div>Wow, there's no need to be rude. I'm asking normal questions that any buyer would ask.</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                    <div className="text-xs text-gray-400 mb-1">{currentDispute.reported} - 2 days ago</div>
                    <div>This is why I hate selling on this platform. People like you are the worst. You're probably going to try to scam me.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center text-red-500 mb-1">
                <Shield size={16} className="mr-1" />
                <span className="font-medium">Content Warning</span>
              </div>
              <p className="text-sm text-gray-300">
                This conversation contains hostile language and potential violation of community guidelines. 
                The reported user's behavior may warrant administrative action.
              </p>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setShowChatModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeManagement;
