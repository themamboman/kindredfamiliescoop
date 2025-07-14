"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function ApplyPage() {
  const [children, setChildren] = useState([0])

  const addChild = () => {
    setChildren([...children, children.length])
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-white text-gray-800">
      <h1 className="text-4xl font-heading text-brand mb-10">Family Application Form</h1>
      <p className="mb-10 text-gray-600 text-lg">
        Please complete the following form to apply for participation in the Kindred Families Homeschool Co-op.
      </p>

      <form className="space-y-16">
        {/* Family Information */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Family Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Parent/Guardian Name(s)
              <input type="text" className="input" name="parentNames" />
            </label>
            <label>
              Phone Number
              <input type="tel" className="input" name="phone" />
            </label>
            <label>
              Email Address
              <input type="email" className="input" name="email" />
            </label>
            <label>
              Home Address
              <input type="text" className="input" name="address" />
            </label>
            <label className="md:col-span-2">
              Emergency Contact (name, relationship, phone)
              <input type="text" className="input" name="emergencyContact" />
            </label>
          </div>
        </section>

        {/* Family Details */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Family Details</h2>
          <div className="space-y-4">
            <label>
              Marital Status
              <input type="text" className="input" name="maritalStatus" />
            </label>
            <label>
              Are you currently homeschooling?
              <input type="text" className="input" name="currentlyHomeschooling" />
            </label>
            <label>
              How long have you been homeschooling?
              <input type="text" className="input" name="homeschoolingDuration" />
            </label>
            <label>
              Have you been part of other homeschool co-ops?
              <input type="text" className="input" name="otherCoops" />
            </label>
            <label>
              Experience with other co-ops
              <textarea className="input" name="coopExperience"></textarea>
            </label>
            <label>
              Reasons for homeschooling
              <textarea className="input" name="reasons"></textarea>
            </label>
            <label>
              Church you currently attend
              <input type="text" className="input" name="church" />
            </label>
            <label>
              How did you hear about Kindred Families?
              <input type="text" className="input" name="referralSource" />
            </label>
          </div>
        </section>

        {/* Children Information */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Children's Information</h2>
          <p className="text-sm text-gray-500 mb-4">(Repeat this section for each child)</p>
          {children.map((index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border p-4 rounded-md">
              <label>
                Child's Full Name
                <input type="text" className="input" name={`childName_${index}`} />
              </label>
              <label>
                Date of Birth
                <input type="date" className="input" name={`dob_${index}`} />
              </label>
              <label>
                Current Grade Level or Learning Stage
                <input type="text" className="input" name={`grade_${index}`} />
              </label>
              <label>
                Allergies or Medical Concerns
                <textarea className="input" name={`allergies_${index}`}></textarea>
              </label>
              <label className="md:col-span-2">
                Special Learning Needs or Accommodations
                <textarea className="input" name={`learningNeeds_${index}`}></textarea>
              </label>
              <label className="md:col-span-2">
                Interests or Personality Notes
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

        {/* Faith and Agreement */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Faith & Agreement</h2>
          <label>
            Your personal testimony or faith background
            <textarea className="input" name="parentFaith"></textarea>
          </label>
          <label>
            Husband's faith background and involvement (if applicable)
            <textarea className="input" name="spouseFaith"></textarea>
          </label>
          <label>
            Do you agree with our Statement of Faith?
            <input type="text" className="input" name="statementAgreement" />
          </label>
          <label>
            Will you uphold our community standards?
            <input type="text" className="input" name="communityStandards" />
          </label>
        </section>

        {/* Co-op Participation */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Co-op Participation</h2>
          <label>
            Are you willing to volunteer?
            <input type="text" className="input" name="volunteerWilling" />
          </label>
          <label>
            Areas you'd like to serve in
            <textarea className="input" name="volunteerAreas"></textarea>
          </label>
          <label>
            Skills, hobbies, or experience
            <textarea className="input" name="skills"></textarea>
          </label>
          <label>
            Scheduling limitations or considerations
            <textarea className="input" name="scheduling"></textarea>
          </label>
        </section>

        {/* Final Questions */}
        <section>
          <h2 className="text-2xl font-bold text-brand mb-6">Final Questions</h2>
          <label>
            Can you commit to regular attendance?
            <input type="text" className="input" name="commitment" />
          </label>
          <label>
            Consent for photo use?
            <input type="text" className="input" name="photoConsent" />
          </label>
          <label>
            Anything else to share?
            <textarea className="input" name="otherInfo"></textarea>
          </label>
        </section>

        <div>
          <button
            type="submit"
            className="bg-brand text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800"
          >
            Submit Application
          </button>
        </div>
      </form>

      <div className="mt-12">
        <Link href="/" className="text-brand hover:underline">
          Back to Welcome Page
        </Link>
      </div>
    </main>
  )
}
