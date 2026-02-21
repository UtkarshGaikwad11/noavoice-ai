import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="bg-purple-700 text-white flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NoaVoice
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative hidden lg:block bg-muted">
        <img
          src="/login-illustration.svg"
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}