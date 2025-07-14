"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function ApplyPage() {
  const router = useRouter();

  const [parentNames, setParentNames] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [currentlyHomeschooling, setCurrentlyHomeschooling] = useState("");
  const [homeschoolingDuration, setHomeschoolingDuration] = useState("");
  const [coopExperience, setCoopExperience] = useState("");
  const [church, setChurch] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [parentFaith, setParentFaith] = useState("");
  const [spouseFaith, setSpouseFaith] = useState("");
  const [statementAgreement, setStatementAgreement] = useState(false);
  const [communityStandards, setCommunityStandards] = useState(false);
  const [volunteerWilling, setVolunteerWilling] = useState(false);
  const [volunteerAreas, setVolunteerAreas] = useState("");
  const [skills, setSkills] = useState("");
  const [scheduling, setScheduling] = useState("");
  const [commitment, setCommitment] = useState("");
  const [photoConsent, setPhotoConsent] = useState(false);
  const [otherInfo, setOtherInfo] = useState("");
  const [children, setChildren] = useState([{ name: "", age: "", grade: "" }]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await addDoc(collection(db, "applications"), {
        parentNames,
        phone,
        email,
        address,
        maritalStatus,
        currentlyHomeschooling,
        homeschoolingDuration,
        coopExperience,
        church,
        referralSource,
        parentFaith,
        spouseFaith,
        statementAgreement,
        communityStandards,
        volunteerWilling,
        volunteerAreas,
        skills,
        scheduling,
        commitment,
        photoConsent,
        otherInfo,
        children,
        submittedAt: Timestamp.now(),
      });
      setMessage("Application submitted successfully!");
    } catch (err: any) {
      setError(err.message || "Submission failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-red-700">
          Family Application Form
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please complete the form to apply for participation in the Kindred Families Homeschool Co-op.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="section-title">Family Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Parent/Guardian Name(s)" className="input" value={parentNames} onChange={(e) => setParentNames(e.target.value)} />
            <input type="text" placeholder="Phone Number" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="email" placeholder="Email Address" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Home Address" className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="Marital Status (Married/Single/Widowed/Other)" className="input col-span-2" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
          </div>

          <h2 className="section-title">Family Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Currently Homeschooling (Yes/No/Planning to start)" className="input" value={currentlyHomeschooling} onChange={(e) => setCurrentlyHomeschooling(e.target.value)} />
            <input type="text" placeholder="How long have you been homeschooling?" className="input" value={homeschoolingDuration} onChange={(e) => setHomeschoolingDuration(e.target.value)} />
          </div>
          <textarea placeholder="If yes, which ones and what was your experience like?" className="input w-full" value={coopExperience} onChange={(e) => setCoopExperience(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Church you currently attend" className="input" value={church} onChange={(e) => setChurch(e.target.value)} />
            <input type="text" placeholder="How did you hear about Kindred Families?" className="input" value={referralSource} onChange={(e) => setReferralSource(e.target.value)} />
          </div>

          <h2 className="section-title">Children’s Information</h2>
          {children.map((child, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="text" placeholder="Full Name" className="input" value={child.name} onChange={(e) => {
                const updated = [...children];
                updated[index].name = e.target.value;
                setChildren(updated);
              }} />
              <input type="text" placeholder="Date of Birth" className="input" value={child.age} onChange={(e) => {
                const updated = [...children];
                updated[index].age = e.target.value;
                setChildren(updated);
              }} />
              <input type="text" placeholder="Current Grade Level or Learning Stage" className="input" value={child.grade} onChange={(e) => {
                const updated = [...children];
                updated[index].grade = e.target.value;
                setChildren(updated);
              }} />
            </div>
          ))}
          <button type="button" onClick={() => setChildren([...children, { name: "", age: "", grade: "" }])} className="text-blue-600 hover:underline text-sm">
            + Add another child
          </button>

          <h2 className="section-title">Faith & Agreement</h2>
          <textarea placeholder="Please briefly share your personal testimony or faith background:" className="input w-full" value={parentFaith} onChange={(e) => setParentFaith(e.target.value)} />
          <textarea placeholder="Please share your husband's faith background and current involvement (if applicable):" className="input w-full" value={spouseFaith} onChange={(e) => setSpouseFaith(e.target.value)} />

          <h2 className="section-title">Co-op Participation</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={volunteerWilling} onChange={(e) => setVolunteerWilling(e.target.checked)} />
              <span>Are you willing to volunteer during co-op days (teaching, assisting, cleaning, setup, etc.)?</span>
            </label>
            <textarea placeholder="What areas are you most interested or comfortable serving in?" className="input w-full" value={volunteerAreas} onChange={(e) => setVolunteerAreas(e.target.value)} />
            <textarea placeholder="Do you have any skills, hobbies, or experience you'd be willing to share with the group?" className="input w-full" value={skills} onChange={(e) => setSkills(e.target.value)} />
            <textarea placeholder="Do you have any scheduling limitations or special considerations we should know about?" className="input w-full" value={scheduling} onChange={(e) => setScheduling(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-6">
            Submit Application
          </button>
          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </main>
  );
}
