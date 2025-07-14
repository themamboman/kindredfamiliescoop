'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase'; // Optional: if you're using types

const ApplyPage = () => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Top-level fields
  const [parentNames, setParentNames] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // JSON fields
  const [familyDetails, setFamilyDetails] = useState({
    maritalStatus: '',
    currentlyHomeschooling: false,
    homeschoolingDuration: '',
    otherCoops: '',
    coopExperience: '',
  });

  const [children, setChildren] = useState([
    { name: '', age: '', grade: '' },
  ]);

  const [faith, setFaith] = useState({
    parentFaith: '',
    spouseFaith: '',
    statementAgreement: false,
    communityStandards: false,
  });

  const [participations, setParticipations] = useState({
    volunteerWilling: false,
    volunteerAreas: '',
    skills: '',
  });

  const [finalQuestions, setFinalQuestions] = useState({
    scheduling: '',
    commitment: false,
    photoConsent: false,
    otherInfo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('applications').insert([
      {
        parent_names: parentNames,
        phone,
        email,
        address,
        emergency_contact: emergencyContact,
        family_details: familyDetails,
        children,
        faith,
        participations,
        final_questions: finalQuestions,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-heading text-brand mb-6">Homeschool Application</h1>

      {success ? (
        <div className="text-green-600 text-lg font-semibold">Application submitted successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-4">Applicant Info</h2>
                <input type="text" placeholder="Parent Names" value={parentNames} onChange={e => setParentNames(e.target.value)} required className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Emergency Contact" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} required className="w-full border px-3 py-2 mb-2 rounded" />
              </div>

              <fieldset className="bg-white p-6 rounded-2xl shadow">
                <legend className="text-xl font-bold mb-4">Family Details</legend>
                <input type="text" placeholder="Marital Status" value={familyDetails.maritalStatus} onChange={e => setFamilyDetails({ ...familyDetails, maritalStatus: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" checked={familyDetails.currentlyHomeschooling} onChange={e => setFamilyDetails({ ...familyDetails, currentlyHomeschooling: e.target.checked })} />
                  Currently Homeschooling
                </label>
                <input type="text" placeholder="Homeschooling Duration" value={familyDetails.homeschoolingDuration} onChange={e => setFamilyDetails({ ...familyDetails, homeschoolingDuration: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Other Co-ops" value={familyDetails.otherCoops} onChange={e => setFamilyDetails({ ...familyDetails, otherCoops: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Co-op Experience" value={familyDetails.coopExperience} onChange={e => setFamilyDetails({ ...familyDetails, coopExperience: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
              </fieldset>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <fieldset className="bg-white p-6 rounded-2xl shadow">
                <legend className="text-xl font-bold mb-4">Faith</legend>
                <input type="text" placeholder="Parent Faith" value={faith.parentFaith} onChange={e => setFaith({ ...faith, parentFaith: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Spouse Faith" value={faith.spouseFaith} onChange={e => setFaith({ ...faith, spouseFaith: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" checked={faith.statementAgreement} onChange={e => setFaith({ ...faith, statementAgreement: e.target.checked })} />
                  Agrees with Statement of Faith
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" checked={faith.communityStandards} onChange={e => setFaith({ ...faith, communityStandards: e.target.checked })} />
                  Agrees with Community Standards
                </label>
              </fieldset>

              <fieldset className="bg-white p-6 rounded-2xl shadow">
                <legend className="text-xl font-bold mb-4">Participation</legend>
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" checked={participations.volunteerWilling} onChange={e => setParticipations({ ...participations, volunteerWilling: e.target.checked })} />
                  Willing to Volunteer
                </label>
                <input type="text" placeholder="Volunteer Areas" value={participations.volunteerAreas} onChange={e => setParticipations({ ...participations, volunteerAreas: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <input type="text" placeholder="Skills" value={participations.skills} onChange={e => setParticipations({ ...participations, skills: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
              </fieldset>

              <fieldset className="bg-white p-6 rounded-2xl shadow">
                <legend className="text-xl font-bold mb-4">Final Questions</legend>
                <input type="text" placeholder="Scheduling Constraints" value={finalQuestions.scheduling} onChange={e => setFinalQuestions({ ...finalQuestions, scheduling: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" checked={finalQuestions.commitment} onChange={e => setFinalQuestions({ ...finalQuestions, commitment: e.target.checked })} />
                  Willing to Commit to Semester
                </label>
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" checked={finalQuestions.photoConsent} onChange={e => setFinalQuestions({ ...finalQuestions, photoConsent: e.target.checked })} />
                  Photo Consent
                </label>
                <textarea placeholder="Other Info" value={finalQuestions.otherInfo} onChange={e => setFinalQuestions({ ...finalQuestions, otherInfo: e.target.value })} className="w-full border px-3 py-2 mb-2 rounded" />
              </fieldset>
            </div>
          </div>

          {error && <div className="text-red-600 mt-4">{error}</div>}

          <div className="mt-8">
            <button type="submit" disabled={loading} className="bg-brand text-white font-bold px-6 py-3 rounded hover:bg-opacity-90 transition">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplyPage;
