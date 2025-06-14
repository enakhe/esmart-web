
import React from "react";
import { Shield, Plus, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RolePermissionManagement: React.FC = () => {
  const roles = [
    { id: 1, name: "Administrator", users: 3, permissions: ["All Access"] },
    { id: 2, name: "Manager", users: 5, permissions: ["User Management", "Reports", "Configuration"] },
    { id: 3, name: "Receptionist", users: 12, permissions: ["Reservations", "Check-in/out", "Guest Management"] },
    { id: 4, name: "Housekeeping", users: 8, permissions: ["Room Status", "Maintenance Requests"] }
  ];

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Role & Permission Management
        </CardTitle>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Role
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <Card key={role.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{role.users} users assigned</p>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded mr-1">
                      {permission}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RolePermissionManagement;
