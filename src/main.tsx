import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
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
import Token from "@/components/tank/token"

import './index.css'


const isAuthenticated = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return !!accessToken;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route 
            path="/" 
            element={isAuthenticated() ? <Root /> : <Navigate replace to="/login" />}
            errorElement={<ErrorPage />}
          >
            <Route path="/home" element={isAuthenticated() ? <UserHome /> : <Navigate replace to="/login" />} />
            <Route path="/account" element={isAuthenticated() ? <Account /> : <Navigate replace to="/login" />} />
            <Route path=":portfolio/settings" element={isAuthenticated() ? <AppSettings /> : <Navigate replace to="/login" />}>
              <Route index element={<SettingsTools />} />
              <Route path="teams" element={<SettingsTeams />} />
              <Route path="orgs" element={<SettingsOrgs />} />
              <Route path="tools" element={<SettingsTools />} />
              <Route path="portfolios" element={<SettingsHome />} />
            </Route>
            <Route path=":portfolio/:org/:tool" element={isAuthenticated() ? <ToolRouter /> : <Navigate replace to="/login" />} />
            <Route path=":portfolio/:org/:tool/:section" element={isAuthenticated() ? <ToolRouter /> : <Navigate replace to="/login" />} />
          </Route>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/confirm" element={<AuthConfirm />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/invite" element={<AuthInvite />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/token" element={<Token />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
)
