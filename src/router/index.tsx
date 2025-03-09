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
import MainLayout from "@/layout/layout";
import ExplorePage from "@/views/explore/page.tsx";
import GroupPage from "@/views/group/page.tsx";
import JobPage from "@/views/job/page.tsx";
import RoadmapPage from "@/views/roadmap/page.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <MainLayout>
        <Navigate to="/home" replace/>
      </MainLayout>
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
      <MainLayout>
        <AnswerSubject></AnswerSubject>
      </MainLayout>

  },
  {
    path: '/settings',
    element:
      <MainLayout>
        <SettingsPage></SettingsPage>
      </MainLayout>
  },
  {
    path: '/settings/account',
    element:
      <MainLayout>
        <SettingsLayout>
          <SettingsAccountPage></SettingsAccountPage>
        </SettingsLayout>
      </MainLayout>
  },
  {
    path: '/settings/appearance',
    element:
      <MainLayout>
        <SettingsLayout>
          <SettingsAppearancePage></SettingsAppearancePage>
        </SettingsLayout>
      </MainLayout>
  },
  {
    path: '/settings/display',
    element:
      <MainLayout>
        <SettingsLayout>
          <SettingsDisplayPage></SettingsDisplayPage>
        </SettingsLayout>
      </MainLayout>
  },
  {
    path: '/settings/notifications',
    element:
      <MainLayout>
        <SettingsLayout>
          <SettingsNotificationsPage></SettingsNotificationsPage>
        </SettingsLayout>
      </MainLayout>
  },
  {
    path: '/settings/profile',
    element:
      <MainLayout>
        <SettingsLayout>
          <SettingsProfilePage></SettingsProfilePage>
        </SettingsLayout>
      </MainLayout>
  },
  {
    path: "/authentication",
    element: <AuthenticationPage></AuthenticationPage>
  },
  {
    path: '/explore',
    element:
      <MainLayout>
        <ExplorePage/>
      </MainLayout>
  },
  {
    path: '/group',
    element:
      <MainLayout>
        <GroupPage/>
      </MainLayout>
  },
  {
    path: '/job',
    element:
      <MainLayout>
        <JobPage/>
      </MainLayout>
  },
  {
    path: '/roadmap',
    element:
      <MainLayout>
        <RoadmapPage/>
      </MainLayout>
  }

])

export default router