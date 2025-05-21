
import React, { useState } from 'react';
import { Save, BarChart, PieChart, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlatformSettings = () => {
  const [policies, setPolicies] = useState({
    termsOfService: `# Terms of Service\n\nWelcome to GoodEx, a platform that facilitates the exchange of goods between users. By using our services, you agree to comply with these Terms of Service.\n\n## 1. User Accounts\n\nUsers must be at least 18 years old to create an account. Users are responsible for maintaining the security of their account credentials.\n\n## 2. Listing Policy\n\nAll listings must comply with local laws and regulations. Prohibited items include but are not limited to: firearms, illegal drugs, counterfeit goods, and stolen items.\n\n## 3. Conduct Policy\n\nUsers must treat each other with respect. Harassment, threats, or discriminatory behavior will not be tolerated.`,
    privacyPolicy: `# Privacy Policy\n\nThis privacy policy describes how GoodEx collects, uses, and shares your personal information.\n\n## 1. Information We Collect\n\nWe collect information you provide directly to us, such as when you create an account, list an item, or communicate with other users.\n\n## 2. How We Use Your Information\n\nWe use your information to provide and improve our services, communicate with you, and ensure platform safety.\n\n## 3. How We Share Your Information\n\nWe may share your information with other users as necessary for transactions, and with service providers who perform services on our behalf.`,
    communityGuidelines: `# Community Guidelines\n\nThese guidelines help ensure GoodEx remains a safe and positive platform for all users.\n\n## 1. Be Respectful\n\nTreat all users with respect. Do not engage in harassment, hate speech, or threatening behavior.\n\n## 2. Be Honest\n\nProvide accurate information about the items you list. Misrepresenting items is a violation of our guidelines.\n\n## 3. Be Safe\n\nTake precautions when meeting other users in person. Meet in public places and bring a companion if possible.`
  });
  
  const { toast } = useToast();
  
  const handlePolicyChange = (policy: keyof typeof policies, value: string) => {
    setPolicies(prev => ({
      ...prev,
      [policy]: value
    }));
  };
  
  const handleSavePolicies = () => {
    toast({
      title: "Policies updated",
      description: "Platform policies have been successfully updated",
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Platform Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-dark-100 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Total Users</h2>
            <Users className="text-primary h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-2">1,245</div>
          <div className="text-sm text-green-500">↑ 12% from last month</div>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-gray-400">Buyers</div>
                <div className="font-medium">742</div>
              </div>
              <div>
                <div className="text-gray-400">Sellers</div>
                <div className="font-medium">498</div>
              </div>
              <div>
                <div className="text-gray-400">Moderators</div>
                <div className="font-medium">5</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-100 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Active Listings</h2>
            <BarChart className="text-primary h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-2">876</div>
          <div className="text-sm text-green-500">↑ 8% from last month</div>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-gray-400">Pending</div>
                <div className="font-medium">124</div>
              </div>
              <div>
                <div className="text-gray-400">Approved</div>
                <div className="font-medium">698</div>
              </div>
              <div>
                <div className="text-gray-400">Rejected</div>
                <div className="font-medium">54</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-100 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Disputes</h2>
            <PieChart className="text-primary h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-2">42</div>
          <div className="text-sm text-red-500">↑ 5% from last month</div>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-gray-400">Open</div>
                <div className="font-medium">18</div>
              </div>
              <div>
                <div className="text-gray-400">Reviewing</div>
                <div className="font-medium">12</div>
              </div>
              <div>
                <div className="text-gray-400">Resolved</div>
                <div className="font-medium">12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-dark-100 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Monthly Registrations</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full h-full flex items-end justify-between space-x-2 px-4">
              {[35, 45, 62, 78, 90, 85, 95, 110, 102, 120, 115, 125].map((value, index) => (
                <div key={index} className="relative flex-1">
                  <div 
                    className="bg-primary/80 hover:bg-primary rounded-t-sm"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                    {new Date(2023, index).toLocaleString('default', { month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-dark-100 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Users size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium">New seller registered</div>
                <div className="text-sm text-gray-400">ArtisanCrafts joined the platform</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <BarChart size={16} className="text-green-500" />
              </div>
              <div>
                <div className="font-medium">20 new listings approved</div>
                <div className="text-sm text-gray-400">Batch approval by moderator_jane</div>
                <div className="text-xs text-gray-500">4 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-red-500/20 p-2 rounded-full">
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <div>
                <div className="font-medium">Dispute resolved</div>
                <div className="text-sm text-gray-400">Warning issued to VintageCollector</div>
                <div className="text-xs text-gray-500">6 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <Calendar size={16} className="text-yellow-500" />
              </div>
              <div>
                <div className="font-medium">Weekly report generated</div>
                <div className="text-sm text-gray-400">Platform analytics for May 10-16, 2023</div>
                <div className="text-xs text-gray-500">12 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Settings size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium">System maintenance completed</div>
                <div className="text-sm text-gray-400">Database optimization finished</div>
                <div className="text-xs text-gray-500">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-100 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Platform Policies</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Terms of Service</label>
            <textarea 
              value={policies.termsOfService} 
              onChange={(e) => handlePolicyChange('termsOfService', e.target.value)}
              rows={10}
              className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Privacy Policy</label>
            <textarea 
              value={policies.privacyPolicy} 
              onChange={(e) => handlePolicyChange('privacyPolicy', e.target.value)}
              rows={10}
              className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Community Guidelines</label>
            <textarea 
              value={policies.communityGuidelines} 
              onChange={(e) => handlePolicyChange('communityGuidelines', e.target.value)}
              rows={10}
              className="w-full px-4 py-2 bg-dark-200 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleSavePolicies}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;
