export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Kepsio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered caption generation for social media
        </p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/pricing"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
