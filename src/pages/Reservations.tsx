
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reservations = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Reservations</h1>
      <Card className="bg-white border-none shadow-soft">
        <CardHeader>
          <CardTitle>Upcoming Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            This page will contain reservation management functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservations;
