import SettingsProfilePage from '@/views/forms/profile/page.tsx'
import SettingsLayout from "@/views/forms/layout.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function SettingsPage() {
  return (


      <SettingsLayout>
        <SettingsProfilePage></SettingsProfilePage>

      </SettingsLayout>
  )
}