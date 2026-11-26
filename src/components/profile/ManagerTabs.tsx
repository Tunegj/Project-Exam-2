"use client";

import NextLink from "next/link";
import { useState } from "react";
import ProfileBookings from "../bookings/ProfileBookings";
import ManagerVenues from "./ManagerVenues";

const tabs = [
  { id: "venues", label: "My venues" },
  { id: "bookings", label: "My bookings" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/**
 * Tabs for a venue manager's profile: their venues and their own bookings.
 */
export default function ManagerTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("venues");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div role="tablist" aria-label="Profile sections" className="border-sand flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm ${
                activeTab === tab.id
                  ? "border-coastal text-navy font-medium"
                  : "text-muted border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <NextLink
          href="/venues/create"
          className="bg-coastal rounded-lg px-4 py-3 text-sm text-white"
        >
          Create venue
        </NextLink>
      </div>
      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === "venues" ? <ManagerVenues /> : <ProfileBookings />}
      </div>
    </div>
  );
}
