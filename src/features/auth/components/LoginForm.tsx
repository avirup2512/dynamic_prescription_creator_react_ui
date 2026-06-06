
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'

type LoginCredentials = {
  email: string
  password: string
}

type LoginFormProps = {
  login: (credentials: LoginCredentials) => void
}

function LoginForm({ login }: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    login({
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    })
  }

    return(
        
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              // required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Link
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              // required
            />
          </div>

          <Button className="h-11 w-full" type="submit">
            Sign in
          </Button>
        </form>
    )
}
export default LoginForm
