import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-2xl text-center bg-white shadow-lg rounded-xl p-10 border border-gray-200">
        <h1 className="text-5xl font-heading text-brand mb-4">
          Kindred Families
        </h1>
        <h2 className="text-2xl font-heading text-gray-700 mb-6">
          Homeschool Co-op
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          We are a cooperative of homeschooling families working together
          to enrich the educational and social lives of our children through shared classes, events, and fellowship.
        </p>
        <Link href="/apply">
          <button className="mt-8 px-6 py-3 bg-brand text-white text-lg font-semibold rounded-md hover:bg-red-800 transition">
            Apply to Join
          </button>
        </Link>
      </div>
    </main>
  )
}
