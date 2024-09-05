import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/app/store.jsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { RouterProvider } from 'react-router-dom'
import { routes } from '../Routes.jsx'
import '@fontsource/amiri/400.css'; 
import '@fontsource/amiri/700.css'; 






ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

      <RouterProvider router={routes} >
          <React.StrictMode>
         
              <App />
           
          </React.StrictMode>
      </RouterProvider>
  </Provider>
 
)
