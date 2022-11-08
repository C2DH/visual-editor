import { Navigate, useLocation } from 'react-router-dom'
import App from '../App'
import { LoginRoute } from '../constants'
import { useStore } from '../store'

// Always provide language code to match App.js routing mechanism
const RequireAuth = ({ children, languageCode = '' }) => {
  let location = useLocation()
  const user = useStore((state) => state.user)

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to={`/${languageCode}/${LoginRoute.path}`} state={{ from: location }} replace />
    )
  }
  return children
}

export default RequireAuth
