import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from '@/components/tank/root'

import ErrorPage from './error-page.tsx'

import {GlobalProvider} from "@/components/tank/global-context"
import AuthLogin from "@/components/tank/authLogin"
import AuthRegister from '@/components/tank/authRegister';
import AuthConfirm from "@/components/tank/authConfirm"
import AuthInvite from "@/components/tank/authInvite"
import Account from "@/components/tank/account"
import ForgotPassword from '@/components/tank/authForgotPassword.tsx';
import ResetPassword from '@/components/tank/authResetPassword.tsx';

import Landing from './landing/Landing.tsx';

import ToolRouter from "@/router.tsx"

import AppSettings from "@/components/tank/app_settings"
import SettingsTeams from "@/components/tank/settings-teams"
import SettingsTools from "@/components/tank/settings-tools"
import SettingsOrgs from "@/components/tank/settings-orgs"
import SettingsHome from "@/components/tank/settings-home"
import UserHome from "@/components/tank/user-home"

import './index.css'


const isAuthenticated = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return !!accessToken;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" />,
  },
  {
    path: "/",
    element: isAuthenticated() ? <Root /> : <Navigate replace to="/login" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: isAuthenticated() ? <UserHome /> : <Navigate replace to="/login" />,
      },
      {
        path: "/account",
        element: isAuthenticated() ? <Account /> : <Navigate replace to="/login" />,
      },
      {
        path: ":portfolio/settings",
        element: isAuthenticated() ? <AppSettings /> : <Navigate replace to="/login" />,
        children: [
          {
            path: "",
            element: <SettingsTools />,
          },
          {
            path: "teams",
            element: <SettingsTeams />,
          },        
          {
            path: "orgs",
            element: <SettingsOrgs />,
          },
          {
            path: "tools",
            element: <SettingsTools />,
          },
          {
            path: "portfolios",
            element: <SettingsHome />,
          }
          // Add more nested routes as needed
        ],
      },
      {
        path: "/:portfolio/:org/:tool",
        element: isAuthenticated() ? <ToolRouter /> : <Navigate replace to="/login" />,
        //element: isAuthenticated() ? getComponentByTool(tool) : <Navigate replace to="/login" />,
      },
      {
        path: "/:portfolio/:org/:tool/:page",
        element: isAuthenticated() ? <ToolRouter /> : <Navigate replace to="/login" />,
        //element: isAuthenticated() ? getComponentByTool(tool) : <Navigate replace to="/login" />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLogin />,
  },
  {
    path: "/register",
    element: <AuthRegister />,
  },
  {
    path: "/confirm",
    element: <AuthConfirm />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/invite",
    element: <AuthInvite />,
  },
  {
    path: "/landing",
    element: <Landing />,
  }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>,
)
