import routes from '@/router/routes'
import AppProvider from '@/shared/providers/AppProvider'
import AuthProvider from '@/shared/providers/AuthProvider'
import { LoaderProvider } from '@/shared/providers/LoaderProvider'
import ToastProvider from '@/shared/providers/ToastProvider'
import { RouterProvider } from 'react-router-dom'



function App() {

  return (
    <AppProvider>
      <ToastProvider>
        <LoaderProvider>
          <AuthProvider>
            <RouterProvider router={routes}/>
          </AuthProvider>
        </LoaderProvider>
      </ToastProvider>
    </AppProvider>
  )
}

export default App
