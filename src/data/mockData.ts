
// Mock data for the admin dashboard

// Users
export const mockUsers = [
  {
    id: 'user-1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'buyer',
    status: 'active'
  },
  {
    id: 'user-2',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    role: 'seller',
    status: 'active'
  },
  {
    id: 'user-3',
    username: 'mikebrown',
    email: 'mike.brown@example.com',
    role: 'buyer',
    status: 'suspended'
  },
  {
    id: 'user-4',
    username: 'sarahsmith',
    email: 'sarah.smith@example.com',
    role: 'seller',
    status: 'active'
  },
  {
    id: 'user-5',
    username: 'robertjohnson',
    email: 'robert.johnson@example.com',
    role: 'buyer',
    status: 'active'
  },
  {
    id: 'user-6',
    username: 'emilywilliams',
    email: 'emily.williams@example.com',
    role: 'seller',
    status: 'active'
  },
  {
    id: 'user-7',
    username: 'davidmiller',
    email: 'david.miller@example.com',
    role: 'buyer',
    status: 'suspended'
  },
  {
    id: 'user-8',
    username: 'jennifertaylor',
    email: 'jennifer.taylor@example.com',
    role: 'seller',
    status: 'active'
  },
  {
    id: 'user-9',
    username: 'michaelwilson',
    email: 'michael.wilson@example.com',
    role: 'moderator',
    status: 'active'
  },
  {
    id: 'user-10',
    username: 'lisaanderson',
    email: 'lisa.anderson@example.com',
    role: 'moderator',
    status: 'active'
  }
];

// Listings
export const mockListings = [
  {
    id: 'listing-1',
    title: 'Vintage Camera',
    seller: 'janedoe',
    category: 'Electronics',
    status: 'approved',
    price: '$200',
    date: '2023-05-10'
  },
  {
    id: 'listing-2',
    title: 'Handmade Pottery Set',
    seller: 'sarahsmith',
    category: 'Home & Garden',
    status: 'pending',
    price: '$85',
    date: '2023-05-12'
  },
  {
    id: 'listing-3',
    title: 'Mountain Bike',
    seller: 'emilywilliams',
    category: 'Sports',
    status: 'approved',
    price: '$350',
    date: '2023-05-08'
  },
  {
    id: 'listing-4',
    title: 'Antique Desk',
    seller: 'jennifertaylor',
    category: 'Furniture',
    status: 'rejected',
    price: '$500',
    date: '2023-05-05'
  },
  {
    id: 'listing-5',
    title: 'Designer Handbag',
    seller: 'janedoe',
    category: 'Fashion',
    status: 'approved',
    price: '$175',
    date: '2023-05-11'
  },
  {
    id: 'listing-6',
    title: 'Smartphone (Like New)',
    seller: 'sarahsmith',
    category: 'Electronics',
    status: 'pending',
    price: '$400',
    date: '2023-05-13'
  },
  {
    id: 'listing-7',
    title: 'Camping Tent (4-Person)',
    seller: 'emilywilliams',
    category: 'Sports',
    status: 'approved',
    price: '$120',
    date: '2023-05-09'
  },
  {
    id: 'listing-8',
    title: 'Vintage Vinyl Records (Set of 10)',
    seller: 'jennifertaylor',
    category: 'Music',
    status: 'pending',
    price: '$150',
    date: '2023-05-14'
  },
  {
    id: 'listing-9',
    title: 'Professional Camera Lens',
    seller: 'janedoe',
    category: 'Electronics',
    status: 'approved',
    price: '$300',
    date: '2023-05-07'
  },
  {
    id: 'listing-10',
    title: 'Handcrafted Wooden Chess Set',
    seller: 'sarahsmith',
    category: 'Toys & Games',
    status: 'pending',
    price: '$95',
    date: '2023-05-15'
  }
];

// Disputes
export const mockDisputes = [
  {
    id: 'dispute-1',
    title: 'Inappropriate communication',
    reporter: 'johndoe',
    reported: 'janedoe',
    date: '2023-05-14',
    status: 'open',
    priority: 'high'
  },
  {
    id: 'dispute-2',
    title: 'Item not as described',
    reporter: 'robertjohnson',
    reported: 'sarahsmith',
    date: '2023-05-13',
    status: 'under_review',
    priority: 'medium'
  },
  {
    id: 'dispute-3',
    title: 'Seller never shipped item',
    reporter: 'johndoe',
    reported: 'emilywilliams',
    date: '2023-05-12',
    status: 'resolved',
    priority: 'high'
  },
  {
    id: 'dispute-4',
    title: 'Counterfeit product',
    reporter: 'davidmiller',
    reported: 'jennifertaylor',
    date: '2023-05-11',
    status: 'open',
    priority: 'high'
  },
  {
    id: 'dispute-5',
    title: 'Payment issue',
    reporter: 'robertjohnson',
    reported: 'janedoe',
    date: '2023-05-10',
    status: 'under_review',
    priority: 'medium'
  },
  {
    id: 'dispute-6',
    title: 'Misleading listing description',
    reporter: 'johndoe',
    reported: 'sarahsmith',
    date: '2023-05-09',
    status: 'open',
    priority: 'low'
  },
  {
    id: 'dispute-7',
    title: 'Harassment in messages',
    reporter: 'robertjohnson',
    reported: 'emilywilliams',
    date: '2023-05-08',
    status: 'resolved',
    priority: 'high'
  },
  {
    id: 'dispute-8',
    title: 'Broken item received',
    reporter: 'davidmiller',
    reported: 'janedoe',
    date: '2023-05-07',
    status: 'under_review',
    priority: 'medium'
  },
  {
    id: 'dispute-9',
    title: 'Listing violates terms of service',
    reporter: 'johndoe',
    reported: 'jennifertaylor',
    date: '2023-05-06',
    status: 'open',
    priority: 'high'
  }
];
