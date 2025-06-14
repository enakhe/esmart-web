
import React, { useState } from "react";
import { 
  Users, 
  Shield, 
  FileText, 
  Settings, 
  Database, 
  BarChart3,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Clock,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import RolePermissionManagement from "@/components/admin/RolePermissionManagement";
import AuditLogs from "@/components/admin/AuditLogs";
import SystemConfiguration from "@/components/admin/SystemConfiguration";
import DataBackupRestore from "@/components/admin/DataBackupRestore";
import AdminReports from "@/components/admin/AdminReports";
import MultiBranchManagement from "@/components/admin/MultiBranchManagement";
import AdminMetrics from "@/components/admin/AdminMetrics";

// Mock data for admin metrics
const adminMetrics = {
  totalUsers: 45,
  activeUsers: 42,
  totalBranches: 3,
  systemUptime: "99.8%",
  todayRevenue: 125000,
  monthlyRevenue: 3250000,
  occupancyRate: 78,
  recentBackup: "2 hours ago",
  auditEvents: 1247,
  systemAlerts: 3
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
          <p className="text-gray-600">Manage your hotel system and operations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-6">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="users" className="text-xs">Users</TabsTrigger>
          <TabsTrigger value="roles" className="text-xs">Roles</TabsTrigger>
          <TabsTrigger value="audit" className="text-xs">Audit</TabsTrigger>
          <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
          <TabsTrigger value="backup" className="text-xs">Backup</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs">Reports</TabsTrigger>
          <TabsTrigger value="branches" className="text-xs">Branches</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AdminMetrics metrics={adminMetrics} />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="roles">
          <RolePermissionManagement />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogs />
        </TabsContent>

        <TabsContent value="config">
          <SystemConfiguration />
        </TabsContent>

        <TabsContent value="backup">
          <DataBackupRestore />
        </TabsContent>

        <TabsContent value="reports">
          <AdminReports />
        </TabsContent>

        <TabsContent value="branches">
          <MultiBranchManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
