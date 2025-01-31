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

import AppADR from "@/components/tank/app_adr"
import ToolRouter from "@/tools/router"

import AppADRDashboard from "@/components/tank/app_adr_dashboard"
import AppSettings from "@/components/tank/app_settings"
import SettingsTeams from "@/components/tank/settings-teams"
import SettingsTools from "@/components/tank/settings-tools"
import SettingsOrgs from "@/components/tank/settings-orgs"
import UserHome from "@/components/tank/user-home"

import './index.css'


const isAuthenticated = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return !!accessToken;
};



// BASEURL/<PORTFOLIO_ID>/<ORG_ID>/<APP_ID>/<RING_ID>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
      /*{
        path: ":portfolio",
        element: isAuthenticated() ? <PortfolioHome /> : <Navigate replace to="/login" />,
      },*/
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
          }
          // Add more nested routes as needed
        ],
      },
      /*{
        path: ":portfolio/:org",
        element: isAuthenticated() ? <OrgHome /> : <Navigate replace to="/login" />,
      },
      {
        path: ":portfolio/:org/data",
        element: isAuthenticated() ? <HomeDashboard /> : <Navigate replace to="/login" />,
      },
      {
        path: ":portfolio/:org/data/:ring",
        element: isAuthenticated() ? <AppData /> : <Navigate replace to="/login" />,
      },
      */
      {
        path: ":portfolio/:org/adr",
        element: isAuthenticated() ? <AppADRDashboard /> : <Navigate replace to="/login" />,
      },
      {
        path: ":portfolio/:org/adr/:ring",
        element: isAuthenticated() ? <AppADR /> : <Navigate replace to="/login" />,
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
