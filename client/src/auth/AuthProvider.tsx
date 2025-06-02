import { useCreateUser } from '@/api/user'
import { Auth0Provider, User, type AppState } from '@auth0/auth0-react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { createUser } = useCreateUser()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI

  if (!domain || !clientId || !redirectUri) {
    throw new Error('Missing Auth0 configuration')
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email && user?.name)
      createUser({
        auth0Id: user.sub,
        username: user.name,
        email: user.email,
      })
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
