import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import LoginForm from '../components/LoginForm'

function Login() {
  const navigate = useNavigate()

  function login() {
    navigate('/dashboard')
  }

  return (
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold tracking-normal">
            Sign in to My Prescription
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage prescriptions, refills, and reminders from one place.
          </p>
        </div>
        <LoginForm login={login} />
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>New here?</span>
          <Button asChild variant="link" className="h-auto p-0">
            <Link to="create-account">Create account</Link>
          </Button>
        </div>
      </section>
  )
}

export default Login
