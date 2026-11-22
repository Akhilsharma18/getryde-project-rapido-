"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, ShieldAlert, Ban } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: "USR-001",
      name: "Akhil Sharma",
      phone: "+91 98765 43210",
      email: "aarav@example.com",
      role: "RIDER",
      trips: 28,
      status: "ACTIVE",
    },
    {
      id: "USR-002",
      name: "virat kohli",
      phone: "+91 98221 44556",
      email: "priya@example.com",
      role: "RIDER",
      trips: 42,
      status: "ACTIVE",
    },
    {
      id: "USR-003",
      name: "Devendra Patel",
      phone: "+91 97110 99887",
      email: "devendra@example.com",
      role: "RIDER",
      trips: 4,
      status: "ACTIVE",
    },
  ]);

  const handleToggleStatus = (id: string, current: string) => {
    const nextStatus = current === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setUsers(users.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));
    toast.info(`User ${id} status changed to ${nextStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Users Management</h1>
          <p className="text-xs text-gray-500">View and manage registered passenger accounts</p>
        </div>
      </div>

      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Total Trips</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {u.name}
                    <div className="text-[11px] font-normal text-gray-400 font-mono">{u.id}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {u.phone}
                    <div className="text-[11px] text-gray-400">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{u.trips}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={u.status === "ACTIVE" ? "success" : "danger"}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      onClick={() => handleToggleStatus(u.id, u.status)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
