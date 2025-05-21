
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Legend, Area, Tooltip, ResponsiveContainer } from 'recharts';

const ChartsStatistics = () => {
  // Mock data for the charts
  const userGrowthData = [
    { month: 'Jan', users: 42 },
    { month: 'Feb', users: 63 },
    { month: 'Mar', users: 82 },
    { month: 'Apr', users: 107 },
    { month: 'May', users: 128 },
    { month: 'Jun', users: 151 },
    { month: 'Jul', users: 173 },
    { month: 'Aug', users: 196 },
    { month: 'Sep', users: 215 },
    { month: 'Oct', users: 238 },
    { month: 'Nov', users: 261 },
    { month: 'Dec', users: 285 },
  ];

  const listingCategoryData = [
    { name: 'Electronics', value: 125 },
    { name: 'Clothing', value: 87 },
    { name: 'Books', value: 63 },
    { name: 'Home & Garden', value: 51 },
    { name: 'Sports', value: 42 },
    { name: 'Toys', value: 34 },
  ];

  const disputesTimelineData = [
    { week: 'Week 1', resolved: 12, unresolved: 8 },
    { week: 'Week 2', resolved: 17, unresolved: 5 },
    { week: 'Week 3', resolved: 15, unresolved: 7 },
    { week: 'Week 4', resolved: 21, unresolved: 3 },
  ];

  const chartConfig = {
    users: { label: 'Users', theme: { light: '#3498db', dark: '#3498db' } },
    listings: { label: 'Listings', theme: { light: '#2ecc71', dark: '#2ecc71' } },
    disputes: { label: 'Disputes', theme: { light: '#e74c3c', dark: '#e74c3c' } },
    resolved: { label: 'Resolved', theme: { light: '#2ecc71', dark: '#2ecc71' } },
    unresolved: { label: 'Unresolved', theme: { light: '#e74c3c', dark: '#e74c3c' } },
    electronics: { label: 'Electronics', theme: { light: '#3498db', dark: '#3498db' } },
    clothing: { label: 'Clothing', theme: { light: '#9b59b6', dark: '#9b59b6' } },
    books: { label: 'Books', theme: { light: '#f1c40f', dark: '#f1c40f' } },
    home: { label: 'Home & Garden', theme: { light: '#2ecc71', dark: '#2ecc71' } },
    sports: { label: 'Sports', theme: { light: '#e67e22', dark: '#e67e22' } },
    toys: { label: 'Toys', theme: { light: '#e74c3c', dark: '#e74c3c' } },
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Charts & Statistics</h1>
      
      <Tabs defaultValue="user-growth" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="user-growth">User Growth</TabsTrigger>
          <TabsTrigger value="listing-categories">Listing Categories</TabsTrigger>
          <TabsTrigger value="dispute-resolution">Dispute Resolution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user-growth">
          <Card>
            <CardHeader>
              <CardTitle>Monthly User Growth</CardTitle>
              <CardDescription>
                New user registrations tracked monthly over the past year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3498db" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff11" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#3498db" strokeWidth={2} />
                    <Area type="monotone" dataKey="users" fill="url(#userGrowth)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listing-categories">
          <Card>
            <CardHeader>
              <CardTitle>Listings by Category</CardTitle>
              <CardDescription>
                Distribution of active listings across different product categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Pie 
                      data={listingCategoryData} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      fill="#8884d8" 
                      dataKey="value" 
                      nameKey="name"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dispute-resolution">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution Metrics</CardTitle>
              <CardDescription>
                Resolved vs unresolved disputes over the past month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={disputesTimelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff11" vertical={false} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="resolved" stackId="a" fill="#2ecc71" />
                    <Bar dataKey="unresolved" stackId="a" fill="#e74c3c" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="bg-dark-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,245</p>
            <p className="text-sm text-green-500">↑ 12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">876</p>
            <p className="text-sm text-green-500">↑ 8% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Open Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-red-500">↑ 5% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">68%</p>
            <p className="text-sm text-green-500">↑ 3% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartsStatistics;

