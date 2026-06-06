import { Button } from '../../../components/ui/button'
function RegisterForm()
{
    return(
        
        <form className="mt-8 space-y-5">
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
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="password"
              name="password"
              placeholder="Create a password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirm-password">
              Confirm password
            </label>
            <input
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <Button className="h-11 w-full" type="submit">
            Create account
          </Button>
        </form>

    )
}
export default RegisterForm;