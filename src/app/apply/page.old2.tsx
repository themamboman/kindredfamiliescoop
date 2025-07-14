"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function ApplyPage() {
  const [children, setChildren] = useState([0])

  const addChild = () => {
    setChildren([...children, children.length])
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-heading text-brand mb-2 text-center">Family Application Form</h1>
        <p className="text-center text-gray-600 mb-8">
          Please complete the form to apply for participation in the Kindred Families Homeschool Co-op.
        </p>

        <form className="space-y-12">
          {/* Section Template */}
          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Family Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block font-medium mb-1">Parent/Guardian Name(s)</span>
                <input type="text" className="input" name="parentNames" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Phone Number</span>
                <input type="tel" className="input" name="phone" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Email Address</span>
                <input type="email" className="input" name="email" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Home Address</span>
                <input type="text" className="input" name="address" />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Emergency Contact (name, relationship, phone)</span>
                <input type="text" className="input" name="emergencyContact" />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Family Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block font-medium mb-1">Marital Status</span>
                <input type="text" className="input" name="maritalStatus" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Are you currently homeschooling?</span>
                <input type="text" className="input" name="currentlyHomeschooling" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">How long have you been homeschooling?</span>
                <input type="text" className="input" name="homeschoolingDuration" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Have you been part of other homeschool co-ops?</span>
                <input type="text" className="input" name="otherCoops" />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Experience with other co-ops</span>
                <textarea className="input" name="coopExperience"></textarea>
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Reasons for homeschooling</span>
                <textarea className="input" name="reasons"></textarea>
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Church you currently attend</span>
                <input type="text" className="input" name="church" />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">How did you hear about Kindred Families?</span>
                <input type="text" className="input" name="referralSource" />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Children's Information</h2>
            <p className="text-sm text-gray-500 mb-4">(Repeat this section for each child)</p>
            {children.map((index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-md p-4 mb-6">
                <label className="block">
                  <span className="block font-medium mb-1">Child's Full Name</span>
                  <input type="text" className="input" name={`childName_${index}`} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Date of Birth</span>
                  <input type="date" className="input" name={`dob_${index}`} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Current Grade or Learning Stage</span>
                  <input type="text" className="input" name={`grade_${index}`} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Allergies or Medical Concerns</span>
                  <textarea className="input" name={`allergies_${index}`}></textarea>
                </label>
                <label className="block md:col-span-2">
                  <span className="block font-medium mb-1">Special Learning Needs or Accommodations</span>
                  <textarea className="input" name={`learningNeeds_${index}`}></textarea>
                </label>
                <label className="block md:col-span-2">
                  <span className="block font-medium mb-1">Interests or Personality Notes</span>
                  <textarea className="input" name={`personalityNotes_${index}`}></textarea>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={addChild}
              className="text-sm px-4 py-2 border border-brand text-brand rounded hover:bg-brand hover:text-white transition"
            >
              + Add Another Child
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Faith & Agreement</h2>
            <div className="space-y-4">
              <label>
                <span className="block font-medium mb-1">Your personal testimony or faith background</span>
                <textarea className="input" name="parentFaith"></textarea>
              </label>
              <label>
                <span className="block font-medium mb-1">Husband's faith background and involvement (if applicable)</span>
                <textarea className="input" name="spouseFaith"></textarea>
              </label>
              <label>
                <span className="block font-medium mb-1">Do you agree with our Statement of Faith?</span>
                <input type="text" className="input" name="statementAgreement" />
              </label>
              <label>
                <span className="block font-medium mb-1">Will you uphold our community standards?</span>
                <input type="text" className="input" name="communityStandards" />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Co-op Participation</h2>
            <div className="space-y-4">
              <label>
                <span className="block font-medium mb-1">Are you willing to volunteer?</span>
                <input type="text" className="input" name="volunteerWilling" />
              </label>
              <label>
                <span className="block font-medium mb-1">Areas you'd like to serve in</span>
                <textarea className="input" name="volunteerAreas"></textarea>
              </label>
              <label>
                <span className="block font-medium mb-1">Skills, hobbies, or experience</span>
                <textarea className="input" name="skills"></textarea>
              </label>
              <label>
                <span className="block font-medium mb-1">Scheduling limitations or considerations</span>
                <textarea className="input" name="scheduling"></textarea>
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand border-b pb-2 mb-6">Final Questions</h2>
            <div className="space-y-4">
              <label>
                <span className="block font-medium mb-1">Can you commit to regular attendance?</span>
                <input type="text" className="input" name="commitment" />
              </label>
              <label>
                <span className="block font-medium mb-1">Consent for photo use?</span>
                <input type="text" className="input" name="photoConsent" />
              </label>
              <label>
                <span className="block font-medium mb-1">Anything else to share?</span>
                <textarea className="input" name="otherInfo"></textarea>
              </label>
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              className="bg-brand text-white px-8 py-3 rounded-md font-semibold hover:bg-red-800"
            >
              Submit Application
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="text-brand hover:underline">
            Back to Welcome Page
          </Link>
        </div>
      </div>
    </main>
  )
}
