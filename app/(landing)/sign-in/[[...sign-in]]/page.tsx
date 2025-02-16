import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <main className="flex-1 flex items-center justify-center px-6">
        {/* Left section with SignIn */}
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <nav className="flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
