"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { User, Phone, Mail, ShieldAlert, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { VehicleCategory } from "@getryde/shared";

export default function RiderProfilePage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "Akhil Sharma");
  const [email, setEmail] = useState(user?.email || "kesarakhil123@gmail.com");
  const [phone] = useState(user?.phone || "+91 8082270967");
  const [prefVehicle, setPrefVehicle] = useState<VehicleCategory>(VehicleCategory.AUTO);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: "1", name: "virat kohli(xyz)", phone: "+91 98234 11223" },
    { id: "2", name: "atul sharma(Friend)", phone: "+91 97123 44556" },
  ]);

  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, name, email });
    }
    toast.success("Profile details updated successfully!");
  };

  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    setEmergencyContacts([
      ...emergencyContacts,
      { id: Date.now().toString(), name: newContactName, phone: newContactPhone },
    ]);
    setNewContactName("");
    setNewContactPhone("");
    toast.success("Emergency contact registered");
  };

  const handleDeleteContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter((c) => c.id !== id));
    toast.info("Emergency contact removed");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Profile & Safety Settings</h1>
        <p className="text-xs text-gray-500">Manage personal credentials, preferences, and emergency responders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Personal Details */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-5 bg-white">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <User className="w-5 h-5 text-[#B9F227] bg-black p-0.5 rounded-md" />
              Personal Details
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Verified Phone</label>
                <input
                  type="text"
                  disabled
                  value={phone}
                  className="w-full mt-1.5 p-2.5 text-sm rounded-xl border border-gray-200 bg-gray-100 text-gray-500 font-semibold cursor-not-allowed"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Preferred Daily Vehicle</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[
                    { id: VehicleCategory.BIKE, label: "Bike" },
                    { id: VehicleCategory.AUTO, label: "Auto" },
                    { id: VehicleCategory.CAR, label: "Car" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setPrefVehicle(v.id)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        prefVehicle === v.id
                          ? "border-black bg-[#111111] text-white"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="accent" size="md" className="w-full font-bold">
                Save Changes
              </Button>
            </form>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-5 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Emergency Contacts
              </h3>
              <Badge variant="accent">SOS Alerted</Badge>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              When you press the Safety Command SOS button, your live location and trip tracking link
              are instantly sent to these verified contacts.
            </p>

            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-2xl bg-[#F5F6F7] flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-[#111111]">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.phone}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddEmergencyContact} className="pt-3 border-t border-gray-100 space-y-3">
              <div className="text-xs font-bold text-gray-700 uppercase">Add New Contact</div>
              <input
                type="text"
                placeholder="Name & Relationship (e.g. Sister)"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full p-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-black"
              />
              <input
                type="tel"
                placeholder="Mobile (+91 98765 00000)"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full p-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-black"
              />
              <Button type="submit" variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-1" />
                Add Contact
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
