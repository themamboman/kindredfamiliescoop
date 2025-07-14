"use client"

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function ApplyPage() {
  const [children, setChildren] = useState([{ name: '', dob: '', grade: '', allergies: '', needs: '', notes: '' }])

  const [formData, setFormData] = useState({
    parentNames: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    maritalStatus: '',
    currentlyHomeschooling: '',
    homeschoolingDuration: '',
    otherCoops: '',
    coopExperience: '',
    reasons: '',
    church: '',
    referralSource: '',
    parentFaith: '',
    spouseFaith: '',
    statementAgreement: '',
    communityStandards: '',
    volunteerWilling: '',
    volunteerAreas: '',
    skills: '',
    scheduling: '',
    commitment: '',
    photoConsent: '',
    otherInfo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children]
    updatedChildren[index][field] = value
    setChildren(updatedChildren)
  }

  const addChild = () => {
    setChildren([...children, { name: '', dob: '', grade: '', allergies: '', needs: '', notes: '' }])
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  const { error } = await supabase.from('applications').insert([
    {
      parent_names: formData.parentNames,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      emergency_contact: formData.emergencyContact,
      children,

      family_details: {
        maritalStatus: formData.maritalStatus,
        currentlyHomeschooling: formData.currentlyHomeschooling,
        homeschoolingDuration: formData.homeschoolingDuration,
        otherCoops: formData.otherCoops,
        coopExperience: formData.coopExperience,
        reasons: formData.reasons,
        church: formData.church,
        referralSource: formData.referralSource
      },

      faith: {
        parentFaith: formData.parentFaith,
        spouseFaith: formData.spouseFaith,
        statementAgreement: formData.statementAgreement,
        communityStandards: formData.communityStandards
      },

      participations: {
        volunteerWilling: formData.volunteerWilling,
        volunteerAreas: formData.volunteerAreas,
        skills: formData.skills,
        scheduling: formData.scheduling
      },

      final_questions: {
        commitment: formData.commitment,
        photoConsent: formData.photoConsent,
        otherInfo: formData.otherInfo
      }
    }
  ])

  if (error) {
    console.error(error)
    alert('There was an error submitting the form.')
  } else {
    alert('Application submitted successfully!')
  }
}

/*
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('a  pplications').insert([
      {
        ...formData,
        children
      }
    ])
    if (error) {
      alert('There was an error submitting the form.')
    } else {
      alert('Application submitted successfully!')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-md transition-all duration-300">
        <h1 className="text-4xl font-heading text-brand mb-2 text-center">Family Application Form</h1>
        <p className="text-center text-gray-600 mb-8">
          Please complete the form to apply for participation in the Kindred Families Homeschool Co-op.
        </p>

        <form onSubmit={handleSubmit} className="space-y-16">
          <section className="pt-4">
            <h2 className="text-2xl font-semibold text-brand border-b pb-2 mb-8">Family Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block font-medium mb-1">Parent/Guardian Name(s)</span>
                <input type="text" className="input" name="parentNames" value={formData.parentNames} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Phone Number</span>
                <input type="tel" className="input" name="phone" value={formData.phone} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Email Address</span>
                <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Home Address</span>
                <input type="text" className="input" name="address" value={formData.address} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Emergency Contact</span>
                <input type="text" className="input" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
              </label>
            </div>
          </section>

          <section className="pt-4">
            <h2 className="text-2xl font-semibold text-brand border-b pb-2 mb-8">Children's Information</h2>
            <p className="text-sm text-gray-500 mb-4">(Repeat this section for each child)</p>
            {children.map((child, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-md p-4 mb-6 transition duration-300"
              >
                <label className="block">
                  <span className="block font-medium mb-1">Child's Full Name</span>
                  <input type="text" className="input" value={child.name} onChange={(e) => handleChildChange(index, 'name', e.target.value)} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Date of Birth</span>
                  <input type="date" className="input" value={child.dob} onChange={(e) => handleChildChange(index, 'dob', e.target.value)} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Grade Level</span>
                  <input type="text" className="input" value={child.grade} onChange={(e) => handleChildChange(index, 'grade', e.target.value)} />
                </label>
                <label className="block">
                  <span className="block font-medium mb-1">Allergies</span>
                  <input type="text" className="input" value={child.allergies} onChange={(e) => handleChildChange(index, 'allergies', e.target.value)} />
                </label>
                <label className="block md:col-span-2">
                  <span className="block font-medium mb-1">Special Needs</span>
                  <textarea className="input" value={child.needs} onChange={(e) => handleChildChange(index, 'needs', e.target.value)} />
                </label>
                <label className="block md:col-span-2">
                  <span className="block font-medium mb-1">Personality Notes</span>
                  <textarea className="input" value={child.notes} onChange={(e) => handleChildChange(index, 'notes', e.target.value)} />
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

          <section className="pt-4">
            <h2 className="text-2xl font-semibold text-brand border-b pb-2 mb-8">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block font-medium mb-1">Marital Status</span>
                <input type="text" className="input" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Currently Homeschooling</span>
                <input type="text" className="input" name="currentlyHomeschooling" value={formData.currentlyHomeschooling} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">How long homeschooling?</span>
                <input type="text" className="input" name="homeschoolingDuration" value={formData.homeschoolingDuration} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Other Co-ops</span>
                <input type="text" className="input" name="otherCoops" value={formData.otherCoops} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Experience in Co-ops</span>
                <textarea className="input" name="coopExperience" value={formData.coopExperience} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Reasons for Homeschooling</span>
                <textarea className="input" name="reasons" value={formData.reasons} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Church</span>
                <input type="text" className="input" name="church" value={formData.church} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">How did you hear about us?</span>
                <input type="text" className="input" name="referralSource" value={formData.referralSource} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Your Faith Background</span>
                <textarea className="input" name="parentFaith" value={formData.parentFaith} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Spouse's Faith Background</span>
                <textarea className="input" name="spouseFaith" value={formData.spouseFaith} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Do you agree with our Statement of Faith?</span>
                <input type="text" className="input" name="statementAgreement" value={formData.statementAgreement} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Willing to uphold community standards?</span>
                <input type="text" className="input" name="communityStandards" value={formData.communityStandards} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Willing to volunteer?</span>
                <input type="text" className="input" name="volunteerWilling" value={formData.volunteerWilling} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Preferred Volunteer Areas</span>
                <input type="text" className="input" name="volunteerAreas" value={formData.volunteerAreas} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Skills or Hobbies</span>
                <input type="text" className="input" name="skills" value={formData.skills} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Scheduling Considerations</span>
                <input type="text" className="input" name="scheduling" value={formData.scheduling} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Can you commit for the semester?</span>
                <input type="text" className="input" name="commitment" value={formData.commitment} onChange={handleChange} />
              </label>
              <label className="block">
                <span className="block font-medium mb-1">Photo Consent</span>
                <input type="text" className="input" name="photoConsent" value={formData.photoConsent} onChange={handleChange} />
              </label>
              <label className="block md:col-span-2">
                <span className="block font-medium mb-1">Anything else you'd like to share?</span>
                <textarea className="input" name="otherInfo" value={formData.otherInfo} onChange={handleChange} />
              </label>
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              className="bg-brand text-white px-10 py-3 rounded-md font-semibold hover:bg-red-800 transition"
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
*/