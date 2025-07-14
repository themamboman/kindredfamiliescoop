// src/app/admin/applications/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

interface Application {
  id: string;
  parentNames: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  maritalStatus: string;
  currentlyHomeschooling: string;
  homeschoolingDuration: string;
  otherCoops: string;
  coopExperience: string;
  reasons: string;
  church: string;
  referralSource: string;
  parentFaith: string;
  spouseFaith: string;
  statementAgreement: boolean;
  communityStandards: boolean;
  volunteerWilling: boolean;
  volunteerAreas: string;
  skills: string;
  scheduling: string;
  commitment: string;
  photoConsent: boolean;
  otherInfo: string;
  children: { name: string; age: string; grade: string }[];
  submittedAt: any;
  seen?: boolean;
  seenBy?: string;
  seenAt?: Timestamp;
  approved?: boolean;
  approvedBy?: string;
  approvedAt?: Timestamp;
  invited?: boolean;
  invitedBy?: string;
  invitedAt?: Timestamp;
  demo?: boolean;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const currentUserEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("adminEmail") || "admin"
      : "admin";

  useEffect(() => {
    const fetchApplications = async () => {
      const querySnapshot = await getDocs(collection(db, "applications"));
      const apps: Application[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Application;
        if (!data.demo) {
          apps.push({ id: docSnap.id, ...data });
        }
      });
      setApplications(apps);
    };
    fetchApplications();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedId(id);
    setCollapsedSections({});
  };

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const closeExpanded = () => {
    setExpandedId(null);
  };

  const updateStatus = async (
    id: string,
    field: "seen" | "approved" | "invited",
    value: boolean
  ) => {
    const docRef = doc(db, "applications", id);
    const timestamp = Timestamp.now();
    const updateData: any = { [field]: value };
    if (field === "seen") {
      updateData.seenBy = currentUserEmail;
      updateData.seenAt = timestamp;
    } else if (field === "approved") {
      updateData.approvedBy = currentUserEmail;
      updateData.approvedAt = timestamp;
    } else if (field === "invited") {
      updateData.invitedBy = currentUserEmail;
      updateData.invitedAt = timestamp;
    }
    await updateDoc(docRef, updateData);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updateData } : app))
    );
  };

  const sendEnrollmentEmail = async (app: Application) => {
    const subject = encodeURIComponent(
      "You're Approved - Next Steps for Enrollment"
    );
    const body = encodeURIComponent(`Thank you for filling out the application to join Kindred Families.

Congratulations! Your application has been approved.

Please visit the following secure link to complete your enrollment:

https://yourdomain.com/enroll?token=UNIQUE_TOKEN

Thank you,\nKindred Families`);
    window.location.href = `mailto:${app.email}?subject=${subject}&body=${body}`;
    await updateStatus(app.id, "invited", true);
  };

  const selectedApp = applications.find((app) => app.id === expandedId);

  const renderSection = (title: string, content: JSX.Element) => (
    <div className="mb-4">
      <button
        className="w-full text-left font-semibold text-lg bg-gray-100 px-4 py-2 rounded"
        onClick={() => toggleSection(title)}
      >
        {title} {collapsedSections[title] ? "▸" : "▾"}
      </button>
      {!collapsedSections[title] && <div className="p-4 border rounded mt-2">{content}</div>}
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-red-800 mb-8">
        Submitted Applications
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border">
          <thead className="text-xs uppercase bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">Parent Name(s)</th>
              <th className="px-4 py-2">Seen</th>
              <th className="px-4 py-2">Approved</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b">
                <td className="px-4 py-2">{app.parentNames}</td>
                <td className="px-4 py-2">
                  <span
                    title={
                      app.seen && app.seenBy && app.seenAt
                        ? `Seen by ${app.seenBy} on ${new Date(
                            app.seenAt.toDate()
                          ).toLocaleString()}`
                        : "Not yet seen"
                    }
                  >
                    {app.seen ? "✅" : "❌"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    title={
                      app.approved && app.approvedBy && app.approvedAt
                        ? `Approved by ${app.approvedBy} on ${new Date(
                            app.approvedAt.toDate()
                          ).toLocaleString()}`
                        : "Not yet approved"
                    }
                  >
                    {app.approved ? "✅" : "❌"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => toggleExpanded(app.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  {app.approved && app.seen && (
                    <button
                      onClick={() => sendEnrollmentEmail(app)}
                      className="text-green-600 hover:underline"
                    >
                      Email Invite
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeExpanded}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            <p className="text-sm text-gray-500 mb-4">
              Submitted by: {selectedApp.parentNames} ({selectedApp.email})
            </p>

            {renderSection("Family Information", (
              <>
                <p><strong>Phone:</strong> {selectedApp.phone}</p>
                <p><strong>Address:</strong> {selectedApp.address}</p>
                <p><strong>Emergency Contact:</strong> {selectedApp.emergencyContact}</p>
              </>
            ))}

            {renderSection("Family Details", (
              <>
                <p><strong>Marital Status:</strong> {selectedApp.maritalStatus}</p>
                <p><strong>Currently Homeschooling:</strong> {selectedApp.currentlyHomeschooling}</p>
                <p><strong>Homeschooling Duration:</strong> {selectedApp.homeschoolingDuration}</p>
                <p><strong>Other Co-ops:</strong> {selectedApp.otherCoops}</p>
                <p><strong>Co-op Experience:</strong> {selectedApp.coopExperience}</p>
                <p><strong>Reasons:</strong> {selectedApp.reasons}</p>
                <p><strong>Church:</strong> {selectedApp.church}</p>
                <p><strong>Referral Source:</strong> {selectedApp.referralSource}</p>
              </>
            ))}

            {renderSection("Children", (
              <>
                {selectedApp.children.map((child, i) => (
                  <div key={i} className="mb-2">
                    <p><strong>Name:</strong> {child.name}</p>
                    <p><strong>Age:</strong> {child.age}</p>
                    <p><strong>Grade:</strong> {child.grade}</p>
                  </div>
                ))}
              </>
            ))}

            {renderSection("Faith and Agreement", (
              <>
                <p><strong>Parent Faith:</strong> {selectedApp.parentFaith}</p>
                <p><strong>Spouse Faith:</strong> {selectedApp.spouseFaith}</p>
                <p><strong>Statement Agreement:</strong> {selectedApp.statementAgreement ? "Yes" : "No"}</p>
                <p><strong>Community Standards:</strong> {selectedApp.communityStandards ? "Yes" : "No"}</p>
              </>
            ))}

            {renderSection("Co-op Participation", (
              <>
                <p><strong>Willing to Volunteer:</strong> {selectedApp.volunteerWilling ? "Yes" : "No"}</p>
                <p><strong>Volunteer Areas:</strong> {selectedApp.volunteerAreas}</p>
                <p><strong>Skills:</strong> {selectedApp.skills}</p>
                <p><strong>Scheduling:</strong> {selectedApp.scheduling}</p>
              </>
            ))}

            {renderSection("Final Questions", (
              <>
                <p><strong>Commitment:</strong> {selectedApp.commitment}</p>
                <p><strong>Photo Consent:</strong> {selectedApp.photoConsent ? "Yes" : "No"}</p>
                <p><strong>Other Info:</strong> {selectedApp.otherInfo}</p>
              </>
            ))}

            <div className="flex justify-between border-t pt-4 mt-4">
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => updateStatus(selectedApp.id, "seen", true)}
                >
                  Mark Seen
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => updateStatus(selectedApp.id, "approved", true)}
                >
                  Mark Approved
                </button>
              </div>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                onClick={closeExpanded}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
