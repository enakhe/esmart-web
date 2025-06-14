
import React from "react";
import { Settings, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SystemConfiguration: React.FC = () => {
  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">General Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                <input type="text" defaultValue="Grand Hotel Chain" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                <input type="number" defaultValue="8.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Payment Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Payment Gateway</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Stripe</option>
                  <option>PayPal</option>
                  <option>Square</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Payment Gateway</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>PayPal</option>
                  <option>Square</option>
                  <option>None</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemConfiguration;
