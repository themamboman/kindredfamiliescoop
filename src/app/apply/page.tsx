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
  const [otherCoops, setOtherCoops] = useState("");
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
  const [commitment, setCommitment] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [otherInfo, setOtherInfo] = useState("");
  const [children, setChildren] = useState([{ name: "", age: "", grade: "" }]);
  const [showFaithModal, setShowFaithModal] = useState(false);
  const [showConductModal, setShowConductModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
        otherCoops,
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
      setShowSuccessModal(true);
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
           <input
            type="text"
            className="input w-full"
            placeholder="Have you been part of any other homeschool co-ops? (Yes / No)"
            value={otherCoops}
            onChange={(e) => setOtherCoops(e.target.value)}
          />
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

{/* Final Questions Section */}
          <h2 className="section-title">Final Questions</h2>
          
          <div className="space-y-6 md:flex md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-start">
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={statementAgreement} onChange={(e) => setStatementAgreement(e.target.checked)} />
                <span>I agree with the Statement of Faith</span>
              </label>
              <button type="button" onClick={() => setShowFaithModal(true)} className="text-blue-600 text-xs mt-1 self-center">View Statement of Faith</button>
            </div>

            <div className="flex flex-col items-start">
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={communityStandards} onChange={(e) => setCommunityStandards(e.target.checked)} />
                <span>I agree to the Community Standards</span>
              </label>
              <button type="button" onClick={() => setShowConductModal(true)} className="text-blue-600 text-xs mt-1 self-center">View Community Standards</button>
            </div>
          </div>
          
          <div className="space-y-4">
            

            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={commitment} onChange={(e) => setCommitment(e.target.checked)} />
              <span>Are you able to commit to regular attendance and active participation during the semester/year?</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={photoConsent} onChange={(e) => setPhotoConsent(e.target.checked)} />
              <span>Do you consent to photos of your child(ren) being used for internal or promotional purposes?</span>
            </label>
            <textarea
              placeholder="Anything else you'd like us to know about your family?"
              className="input w-full"
              value={otherInfo}
              onChange={(e) => setOtherInfo(e.target.value)}
            />
          </div>


          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-6">
            Submit Application
          </button>
          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>

{/* Statement of Faith Modal */}
      {showFaithModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Kindred Families Statement of Faith</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              We believe in one God, the Creator of heaven and earth, who is holy, just, merciful, and eternally existent.
              {"\n\n"}We believe the Scriptures of the Old and New Testaments are the inspired, authoritative, and true Word of God, sufficient for faith and life.
              {"\n\n"}We believe that Jesus of Nazareth is the promised Messiah, the Son of God, whose life, death, and resurrection fulfill the redemptive plan revealed in the Scriptures.
              {"\n\n"}We believe salvation is offered by the grace of God through faith in Jesus the Messiah, and that true faith is expressed through love, repentance, and obedience to God's commands.
              {"\n\n"}We believe in the work and presence of the Spirit of God, who empowers believers to live righteous and holy lives and to serve in love.
              {"\n\n"}We believe the followers of the Messiah are called to live according to God's Word, to love their neighbors, to pursue justice and mercy, and to walk humbly with God.
              {"\n\n"}We believe in the resurrection of the dead, the restoration of all things under God's rule, and the future return of the Messiah to establish His kingdom in fullness.
              {"\n\n"}We believe that family is a divine institution - parents are divinely entrusted with the care, education, and moral training of their children.
              {"\n\n"}We believe that community matters - we are called to live in peace, to practice kindness, and to bear responsibility for one another in love and truth.
              {"\n\n"}We believe in marriage between one man and one woman as designed by God, and we do not condone any form of sexual immorality.
            </p>
            <button onClick={() => setShowFaithModal(false)} className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Code of Conduct Modal */}
      {showConductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Kindred Families Co-op Code of Conduct</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              Our Heart
              {"\n\n"}As a Christ-centered community, Kindred Families exists to support one another in the sacred work of raising and educating our children. We desire to cultivate a culture of grace, respect, and unity, where love for God and neighbor is evident in our actions, attitudes, and words.
              {"\n\n"}This Code of Conduct outlines expectations for behavior within the co-op to help ensure a safe, joyful, and God-honoring environment for all.
              {"\n\n"}1. Christlike Character
              - Treat others with kindness, respect, and humility, regardless of differences.
              - Speak truthfully and in love, avoiding gossip, sarcasm, or divisive language.
              - Practice forgiveness and grace. Handle conflicts biblically (Matthew 18:15-17).
              {"\n\n"}2. Respect for Authority and Roles
              - Children are expected to honor and obey adult volunteers, teachers, and co-op leaders.
              - Parents are responsible for the behavior and supervision of their children at all times unless in a designated drop-off situation.
              - Adults should model servant leadership and communicate with respect and clarity.
              {"\n\n"}3. Personal Responsibility
              - Arrive on time and be prepared for co-op days and assigned duties.
              - Fulfill volunteer roles with integrity and diligence.
              - Use co-op property and host facilities with care; clean up after yourself and your family.
              {"\n\n"}4. Modesty and Moral Conduct
              - Dress should be modest, respectful, and appropriate for a family-friendly Christian environment.
              - We uphold a biblical standard of sexual ethics, including the belief in marriage between one man and one woman and the rejection of all forms of sexual immorality.
              - Public displays of affection should be modest and appropriate.
              {"\n\n"}5. Safety and Stewardship
              - No running or roughhousing indoors unless part of a supervised activity.
              - No illegal substances are permitted at any co-op function.
              - Report any accidents, concerns, or disciplinary issues promptly to leadership.
              {"\n\n"}6. Health and Wellness
              - Please keep children home if they show signs of contagious illness (fever, vomiting, persistent cough, etc.).
              - Notify leadership only if a serious illness has affected your family and may impact the group.
              {"\n\n"}7. Accountability and Discipline
              - Failure to adhere to this Code of Conduct may result in a private conversation, a written warning, or—if necessary—dismissal from the co-op.
              - All disciplinary measures will be handled with prayerful care, discretion, and fairness, and with the goal of restoration.
              {"\n\n"}Commitment
              All participating families are required to review and sign this Code of Conduct annually. By doing so, you affirm your commitment to honor the spirit and expectations of this community.
              {"\n\n"}"So then let us pursue what makes for peace and for mutual upbuilding." - Romans 14:19
            </p>
            <button onClick={() => setShowConductModal(false)} className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">
              Close
            </button>
          </div>
        </div>
      )}

       {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">Thank you for Applying</h2>
            <p className="mb-4">Kindred Families Homeschooling Cooperative will review your application soon and contact you.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
/*
<label className="flex items-start space-x-2">
              <input type="checkbox" checked={statementAgreement} onChange={(e) => setStatementAgreement(e.target.checked)} />
              <span className="flex flex-col">
                <span>I agree with the Statement of Faith</span>
                <button type="button" onClick={() => setShowFaithModal(true)} className="text-blue-600 text-sm self-start mt-1">View</button>
              </span>
            </label>

            <label className="flex items-start space-x-2">
              <input type="checkbox" checked={communityStandards} onChange={(e) => setCommunityStandards(e.target.checked)} />
              <span className="flex flex-col">
                <span>I agree to the Community Standards</span>
                <button type="button" onClick={() => setShowConductModal(true)} className="text-blue-600 text-sm self-start mt-1">View</button>
              </span>
            </label>
*/