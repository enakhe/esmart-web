
import React from "react";
import { FileText, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuditLogs: React.FC = () => {
  const logs = [
    { id: 1, user: "john.doe", action: "User Created", entity: "User", timestamp: "2024-01-15 10:30:00", ip: "192.168.1.100" },
    { id: 2, user: "jane.smith", action: "Reservation Modified", entity: "Reservation", timestamp: "2024-01-15 10:25:00", ip: "192.168.1.101" },
    { id: 3, user: "mike.wilson", action: "Room Status Updated", entity: "Room", timestamp: "2024-01-15 10:20:00", ip: "192.168.1.102" }
  ];

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Audit Logs
        </CardTitle>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Entity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{log.user}</td>
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4">{log.entity}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.timestamp}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditLogs;
