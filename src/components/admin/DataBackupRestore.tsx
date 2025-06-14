
import React from "react";
import { Database, Download, Upload, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DataBackupRestore: React.FC = () => {
  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Data Backup & Restore
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Backup Management</h3>
            <div className="space-y-3">
              <Button className="w-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                Create Manual Backup
              </Button>
              <div className="text-sm text-gray-600">
                <p>Last automatic backup: 2 hours ago</p>
                <p>Next scheduled backup: In 22 hours</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Restore Options</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Restore from File
              </Button>
              <div className="text-sm text-gray-600">
                <p>⚠️ Restore operations will overwrite current data</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Recent Backups</h3>
          <div className="space-y-2">
            {['2024-01-15 02:00:00', '2024-01-14 02:00:00', '2024-01-13 02:00:00'].map((date, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{date}</span>
                  <span className="text-xs text-gray-500">Size: 2.3 GB</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Download</Button>
                  <Button variant="outline" size="sm">Restore</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataBackupRestore;
