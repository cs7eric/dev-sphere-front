import {createBrowserRouter, Navigate} from 'react-router-dom'
import LoginView from '@/views/login'
import Layout from '@/layout/layout'
import Page from '@/views/dashboard/page'
import AnswerSubject from '@/views/subject/answer-subject'
import SettingsAccountPage from "@/views/forms/account/page.tsx";
import SettingsAppearancePage from "@/views/forms/appearance/page.tsx";
import SettingsDisplayPage from "@/views/forms/display/page.tsx";
import SettingsNotificationsPage from "@/views/forms/notifications/page.tsx";
import SettingsProfilePage from "@/views/forms/profile/page.tsx";
import SettingsPage from "@/views/forms/page.tsx";
import SettingsLayout from "@/views/forms/layout.tsx";
import AuthenticationPage from "@/views/authentication/page.tsx";
import HomePage from "@/views/home/page.tsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Layout>
      <LoginView/>
    </Layout>
  },
  {
    path: '/',
    element: <Layout>
      <Navigate to="/home" replace/>
    </Layout>
  },
  {
    path: '/home',
    element: <HomePage></HomePage>
  },
  {
    path: '/dashboard',
    element: <Page></Page>
  },
  {
    path: '/subject',
    element:
      <Layout>
        <AnswerSubject></AnswerSubject>

      </Layout>
  },
  {
    path: '/settings',
    element: <SettingsPage></SettingsPage>
  },
  {
    path: '/settings/account',
    element: <SettingsLayout>
                <SettingsAccountPage></SettingsAccountPage>
    </SettingsLayout>
  },
  {
    path: '/settings/appearance',
    element: <SettingsLayout>
      <SettingsAppearancePage></SettingsAppearancePage>
    </SettingsLayout>
  },
  {
    path: '/settings/display',
    element:<SettingsLayout>
      <SettingsDisplayPage></SettingsDisplayPage>
    </SettingsLayout>
  },
  {
    path: '/settings/notifications',
    element: <SettingsLayout>
      <SettingsNotificationsPage></SettingsNotificationsPage>
    </SettingsLayout>
  },
  {
    path: '/settings/profile',
    element: <SettingsLayout>
      <SettingsProfilePage></SettingsProfilePage>
    </SettingsLayout>
  },
  {
    path: "/authentication",
    element: <AuthenticationPage></AuthenticationPage>
  }

])

export default router