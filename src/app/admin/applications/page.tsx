// src/app/admin/applications/page.tsx
"use client";

import {  } from 'firebase/firestore';
import { JSX, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, where, collection, getDoc, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  parentNames: string;
  phone: string;
  email: string;
  address: string;
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
  commitment: boolean; 
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
  const router = useRouter();
  //const [authorized, setAuthorized] = useState<boolean | null>(null); // null = loading
  const [authorized, setAuthorized] = useState(true); // null = loading
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const currentUserEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("adminEmail") || "admin"
      : "admin";

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const q = query(
      collection(db, 'admins'),
      where('email', '==', user.email)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      router.push('/not-authorized');
      return;
    }

    // ✅ Fetch applications only if user is admin
    const querySnapshot = await getDocs(collection(db, "applications"));
    const apps: Application[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as Application;
      if (!data.demo) {
        const { id: _ignoreId, ...rest } = data;
        apps.push({ id: docSnap.id, ...rest });
      }
    });
    setApplications(apps);
  });

  return () => unsubscribe();
}, []);


/*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
        return;
      }

      // Email whitelist
      const allowedEmails = [
        'themamboman@protonmail.ccom',
        'caitrinw@me.com',
      ];
      if (!allowedEmails.includes(user.email ?? '')) {
        router.push('/not-authorized');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      const querySnapshot = await getDocs(collection(db, "applications"));
      const apps: Application[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Application;
        if (!data.demo) {
	    const { id: _ignoreId, ...rest } = data;
            apps.push({ id: docSnap.id, ...rest });
        }
      });
      setApplications(apps);
    };
    fetchApplications();
  }, []);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      console.log('checking email for admin rights: ' + user.email)
      const adminRef = doc(db, "admins", "admins_collection");
    //  const adminRef = doc(db, "admins", user.email || "");
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        console.log('found admins collection');
        const adminData = adminSnap.data();
        // ✅ User is authorized, fetch applications
        if (adminData.email === user.email && adminData.superadmin) {
          const querySnapshot = await getDocs(collection(db, "applications"));
          const apps: Application[] = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data() as Application;
            if (!data.demo) {
              const { id: _ignoreId, ...rest } = data;
              apps.push({ id: docSnap.id, ...rest });
            }
          });
          setApplications(apps);
          setAuthorized(true);
        }
      } else {
        console.log('did not find admins collection')
        // 🚫 Not an admin
        router.push("/unauthorized");
      }
    });

    return () => unsubscribe();
  }, []);
*/

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

Your application has been approved.

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

  function UnauthorizedPage() {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-700">You do not have permission to view this page.</p>
      </div>
    );
}

  // return page contents
  //if (authorized === null) {
  //  return <p className="text-center mt-10">Checking admin access...</p>;
  //} else if (!authorized) {
  //  UnauthorizedPage();
  //} else {
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
                  <p><strong>Commitment:</strong> {selectedApp.commitment ? "Yes" : "No"}</p>
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
//}
