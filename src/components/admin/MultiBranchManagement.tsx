
import React from "react";
import { Building2, Plus, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MultiBranchManagement: React.FC = () => {
  const branches = [
    { id: 1, name: "Main Branch", address: "123 Main St, City Center", users: 25, rooms: 120, occupancy: 78 },
    { id: 2, name: "Airport Branch", address: "Airport Terminal 2", users: 18, rooms: 80, occupancy: 82 },
    { id: 3, name: "Downtown Branch", address: "456 Downtown Ave", users: 22, rooms: 100, occupancy: 75 }
  ];

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Multi-Branch Management
        </CardTitle>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Branch
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <Card key={branch.id} className="border border-gray-200 hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      branch.occupancy > 80 ? 'bg-green-100 text-green-800' :
                      branch.occupancy > 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {branch.occupancy}% occupied
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {branch.address}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span>{branch.users} staff</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span>{branch.rooms} rooms</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-3">
                    Manage Branch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiBranchManagement;
