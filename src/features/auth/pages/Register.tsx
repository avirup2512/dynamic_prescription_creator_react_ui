import { Link } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import RegisterForm from '../components/RegisterForm'

function Register() {
  return (
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Create your account
          </p>
          <h1 className="text-2xl font-semibold tracking-normal">
            Start with My Prescription
          </h1>
          <p className="text-sm text-muted-foreground">
            Set up your profile to manage prescriptions and reminders.
          </p>
        </div>
        <RegisterForm/>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Button asChild variant="link" className="h-auto p-0">
            <Link to="/auth/">Sign in</Link>
          </Button>
        </div>
      </section>
  )
}

export default Register
