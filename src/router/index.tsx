import {createBrowserRouter, Navigate} from 'react-router-dom'
import React, { Suspense } from 'react'
import MainLayout from "@/layout/layout";
import TestPage from "@/views/test/test-page.tsx";
import LoaderExample from "@/views/test/loader-example.tsx";
import MdTest from "@/views/test/md-test.tsx";
import SpinnerExample from "@/components/loader/spinner-example.tsx";
import SkeletonExample from "@/components/loader/skeleton-example.tsx";
import ContentLoaderExample from "@/components/loader/content-loader-example.tsx";
import TagsLoaderExample from "@/components/loader/tags-loader-example.tsx";
import UserInfoExample from "@/test/UserInfoExample.tsx";
import {SubjectDemo} from "@/components/subject/subject-demo.tsx";
import {PracticePage} from "@/views/subject/answer-subject/practice-page.tsx";
import {SubjectManagePage} from "@/components/subject/subject-manage.tsx";

// 使用React.lazy进行组件懒加载
const Page = React.lazy(() => import('@/views/dashboard/page'))
const AnswerSubject = React.lazy(() => import('@/views/subject/answer-subject/page.tsx'))
const SettingsAccountPage = React.lazy(() => import("@/views/forms/data/page.tsx"))
const SettingsAppearancePage = React.lazy(() => import("@/views/forms/appearance/page.tsx"))
const SettingsDisplayPage = React.lazy(() => import("@/views/forms/display/page.tsx"))
const SettingsSocialContactPage = React.lazy(() => import("@/views/forms/social-contact/page.tsx"))
const SettingsProfilePage = React.lazy(() => import("@/views/forms/profile/page.tsx"))
const SettingsPage = React.lazy(() => import("@/views/forms/page.tsx"))
const SettingsLayout = React.lazy(() => import("@/views/forms/layout.tsx"))
const AuthenticationPage = React.lazy(() => import("@/views/authentication/page.tsx"))
const HomePage = React.lazy(() => import("@/views/home/page.tsx"))
const ExplorePage = React.lazy(() => import("@/views/explore/page.tsx"))
const JobPage = React.lazy(() => import("@/views/job/page.tsx"))
const RoadmapPage = React.lazy(() => import("@/views/roadmap/page.tsx"))
const CirclePage = React.lazy(() => import("@/views/circle/page.tsx"))
const EnhancedChatPage = React.lazy(() => import("@/views/chat/enhanced-page.tsx"))

// 加载状态组件
const LoadingFallback = () => (
  // <div className="flex items-center justify-center h-screen">
  //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  // </div>
  <></>
)

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
    element: 
      <Suspense fallback={<LoadingFallback />}>
        <HomePage></HomePage>
      </Suspense>
  },
  {
    path: '/dashboard',
    element: 
      <Suspense fallback={<LoadingFallback />}>
        <Page></Page>
      </Suspense>
  },
  {
    path: '/subject/:subjectId',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AnswerSubject></AnswerSubject>
        </Suspense>
      </MainLayout>

  },
  {
    path: '/settings',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsPage></SettingsPage>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/settings/data',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsLayout>
            <SettingsAccountPage></SettingsAccountPage>
          </SettingsLayout>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/settings/appearance',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsLayout>
            <SettingsAppearancePage></SettingsAppearancePage>
          </SettingsLayout>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/settings/display',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsLayout>
            <SettingsDisplayPage></SettingsDisplayPage>
          </SettingsLayout>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/settings/social-contact',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsLayout>
            <SettingsSocialContactPage></SettingsSocialContactPage>
          </SettingsLayout>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/settings/profile',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsLayout>
            <SettingsProfilePage></SettingsProfilePage>
          </SettingsLayout>
        </Suspense>
      </MainLayout>
  },
  {
    path: "/authentication",
    element: <Suspense fallback={<LoadingFallback />}>
      <AuthenticationPage></AuthenticationPage>
    </Suspense>
  },
  {
    path: '/explore',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <ExplorePage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/circle',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <CirclePage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/job',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <JobPage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/roadmap',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <RoadmapPage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/chat',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <EnhancedChatPage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/chat/enhanced',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <EnhancedChatPage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/subject-m',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <SubjectManagePage/>
        </Suspense>
      </MainLayout>
  },
  {
    path: '/test',
    element:
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <PracticePage/>
        </Suspense>
      </MainLayout>
  }

])

export default router