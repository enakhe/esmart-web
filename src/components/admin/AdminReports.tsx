
import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  DollarSign, 
  Users, 
  Building2,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const adminReports = [
  {
    category: "Financial Reports",
    reports: [
      { name: "Revenue Summary Report", description: "Comprehensive revenue analysis across all branches", icon: DollarSign },
      { name: "Profit & Loss Statement", description: "Monthly and quarterly P&L statements", icon: TrendingUp },
      { name: "Tax Report", description: "Tax calculations and compliance reports", icon: FileText },
      { name: "Payment Gateway Report", description: "Transaction analysis by payment method", icon: BarChart3 },
      { name: "Branch Revenue Comparison", description: "Revenue comparison across hotel branches", icon: Building2 }
    ]
  },
  {
    category: "Operational Reports",
    reports: [
      { name: "Overall Occupancy Report", description: "System-wide occupancy rates and trends", icon: BarChart3 },
      { name: "User Activity Report", description: "Staff productivity and system usage analytics", icon: Users },
      { name: "System Performance Report", description: "System uptime, response times, and performance metrics", icon: TrendingUp },
      { name: "Audit Trail Report", description: "Comprehensive audit logs and security events", icon: FileText },
      { name: "Branch Performance Report", description: "Individual branch performance metrics", icon: Building2 }
    ]
  },
  {
    category: "Management Reports",
    reports: [
      { name: "Staff Performance Report", description: "Employee productivity and performance metrics", icon: Users },
      { name: "Department Efficiency Report", description: "Analysis of different department performances", icon: BarChart3 },
      { name: "Cost Analysis Report", description: "Operational costs and budget analysis", icon: DollarSign },
      { name: "Strategic Dashboard", description: "Executive summary and KPI dashboard", icon: TrendingUp },
      { name: "Compliance Report", description: "Regulatory compliance and policy adherence", icon: FileText }
    ]
  },
  {
    category: "System Reports",
    reports: [
      { name: "Database Performance Report", description: "Database optimization and performance metrics", icon: BarChart3 },
      { name: "Backup & Recovery Report", description: "Backup status and recovery procedures", icon: FileText },
      { name: "Security Analysis Report", description: "Security events and threat analysis", icon: Users },
      { name: "System Configuration Report", description: "Current system settings and configurations", icon: TrendingUp },
      { name: "Multi-Branch Sync Report", description: "Data synchronization across branches", icon: Building2 }
    ]
  }
];

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const generateReport = (reportName: string) => {
    console.log(`Generating report: ${reportName}`);
    // Here you would implement the actual report generation logic
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Administrator Reports
          </CardTitle>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Report Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            {adminReports.map((category, categoryIndex) => (
              <TabsContent 
                key={category.category} 
                value={category.category.toLowerCase().split(' ')[0]} 
                className="mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.reports.map((report, index) => (
                    <Card key={index} className="border border-gray-200 hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <report.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 mb-1">{report.name}</h3>
                              <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => generateReport(report.name)}
                                  className="flex items-center gap-1"
                                >
                                  <BarChart3 className="w-3 h-3" />
                                  Generate
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" />
                                  Export
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Scheduled Reports</h3>
                <p className="text-sm opacity-90">Manage automated report generation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Export Data</h3>
                <p className="text-sm opacity-90">Bulk data export and backup</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm opacity-90">Advanced data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
