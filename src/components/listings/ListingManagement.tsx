
import React, { useState } from 'react';
import { Search, Eye, Check, X, Filter } from 'lucide-react';
import { mockListings } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Listing {
  id: string;
  title: string;
  seller: string;
  category: string;
  status: string;
  price: string;
  date: string;
}

const ListingManagement = () => {
  const [listings, setListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);
  const { toast } = useToast();

  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(listings.map(listing => listing.category)));

  const handleViewListing = (listing: Listing) => {
    setCurrentListing(listing);
    setShowModal(true);
  };

  const handleApproveListing = (listingId: string) => {
    const updatedListings = listings.map(listing => 
      listing.id === listingId ? { ...listing, status: 'approved' } : listing
    );
    setListings(updatedListings);
    
    const listing = listings.find(l => l.id === listingId);
    toast({
      title: "Listing approved",
      description: `"${listing?.title}" has been approved and is now visible to users`,
    });
  };

  const handleRejectListing = (listingId: string) => {
    const updatedListings = listings.map(listing => 
      listing.id === listingId ? { ...listing, status: 'rejected' } : listing
    );
    setListings(updatedListings);
    
    const listing = listings.find(l => l.id === listingId);
    toast({
      title: "Listing rejected",
      description: `"${listing?.title}" has been rejected`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Listing Management</h1>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search listings..."
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-dark-100 border border-dark-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-dark-100 rounded-lg shadow-md overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-200">
          <thead className="bg-dark-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200">
            {filteredListings.length > 0 ? (
              filteredListings.map(listing => (
                <tr key={listing.id} className="hover:bg-dark-200/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{listing.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{listing.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{listing.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{listing.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "status-badge",
                      listing.status === 'approved' ? "status-approved" : 
                      listing.status === 'rejected' ? "status-rejected" : 
                      "status-pending"
                    )}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{listing.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewListing(listing)}
                        className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-white"
                        title="View Listing"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {listing.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveListing(listing.id)}
                            className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-green-500"
                            title="Approve Listing"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleRejectListing(listing.id)}
                            className="p-1 hover:bg-dark-200 rounded-md text-gray-300 hover:text-red-500"
                            title="Reject Listing"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                  No listings found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* View Listing Modal */}
      {showModal && currentListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Listing Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-dark-200 rounded-lg h-48 flex items-center justify-center mb-4">
                  <span className="text-gray-400">Product Image</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <span className={cn(
                      "status-badge",
                      currentListing.status === 'approved' ? "status-approved" : 
                      currentListing.status === 'rejected' ? "status-rejected" : 
                      "status-pending"
                    )}>
                      {currentListing.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Category:</span> {currentListing.category}
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span> {currentListing.price}
                  </div>
                  <div>
                    <span className="text-gray-400">Listed on:</span> {currentListing.date}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{currentListing.title}</h3>
                <p className="text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, 
                  quis aliquam nisl nunc quis nisl.
                </p>
                
                <div className="mb-4">
                  <span className="text-gray-400">Seller:</span> {currentListing.seller}
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Additional Details</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Condition:</div>
                    <div>New</div>
                    <div className="text-gray-400">Shipping:</div>
                    <div>Available</div>
                    <div className="text-gray-400">Location:</div>
                    <div>New York, NY</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Close
              </button>
              
              {currentListing.status === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      handleRejectListing(currentListing.id);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/30"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                      handleApproveListing(currentListing.id);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-green-500/20 text-green-500 rounded-md hover:bg-green-500/30"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingManagement;
