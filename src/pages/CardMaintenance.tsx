
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CardMaintenance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Card Maintenance</h1>
      <Card className="bg-white border-none shadow-soft">
        <CardHeader>
          <CardTitle>Room Key Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            This page will contain room key card management functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardMaintenance;
