import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/pricing"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/help"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-600 text-center">
            &copy; 2024 Kepsio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
