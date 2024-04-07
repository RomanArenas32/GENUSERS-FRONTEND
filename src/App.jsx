import { Navegacion } from "./componentes/Navegacion"
import { AuthProvider } from "./context/AuthProvider"
import { AppRoutes } from "./routes/AppRoutes"

export const App = () => {
  return (
    <AuthProvider>
      <Navegacion />
      <AppRoutes />
    </AuthProvider>
  )
}
