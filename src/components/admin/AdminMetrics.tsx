
import React from "react";
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Shield, 
  AlertTriangle, 
  Database,
  UserCheck,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

interface AdminMetricsProps {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    totalBranches: number;
    systemUptime: string;
    todayRevenue: number;
    monthlyRevenue: number;
    occupancyRate: number;
    recentBackup: string;
    auditEvents: number;
    systemAlerts: number;
  };
}

const mockRevenueData = [
  { month: "Jan", revenue: 2800000, users: 38 },
  { month: "Feb", revenue: 3100000, users: 41 },
  { month: "Mar", revenue: 2950000, users: 43 },
  { month: "Apr", revenue: 3250000, users: 45 },
];

const mockSystemActivity = [
  { time: "00:00", activity: 12 },
  { time: "04:00", activity: 8 },
  { time: "08:00", activity: 35 },
  { time: "12:00", activity: 58 },
  { time: "16:00", activity: 45 },
  { time: "20:00", activity: 28 },
];

const AdminMetrics: React.FC<AdminMetricsProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.totalUsers}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {metrics.activeUsers} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Branches</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.totalBranches}</div>
            <p className="text-xs text-purple-600">Locations</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${(metrics.monthlyRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.systemUptime}</div>
            <p className="text-xs text-green-600">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.systemAlerts}</div>
            <p className="text-xs text-orange-600">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="bg-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Revenue & User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} tick={{ fill: '#666' }} />
                <YAxis fontSize={12} tick={{ fill: '#666' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card className="bg-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              System Activity (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSystemActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" fontSize={12} tick={{ fill: '#666' }} />
                <YAxis fontSize={12} tick={{ fill: '#666' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="activity" 
                  fill="hsl(var(--secondary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Last Backup</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{metrics.recentBackup}</div>
            <p className="text-xs text-blue-600">Automatic backup</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Audit Events</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{metrics.auditEvents.toLocaleString()}</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{metrics.occupancyRate}%</div>
            <p className="text-xs text-purple-600">Current average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMetrics;
