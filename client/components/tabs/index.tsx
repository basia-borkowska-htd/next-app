import { Pathnames } from '@/utils/pathnames'
import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'

type TabsType = {
  value: string
  label: string
}

interface TabsProps {
  tabs: TabsType[]
  defaultValue: string
}

export const TabsComponent = ({ tabs, defaultValue }: TabsProps) => {
  const router = useRouter()

  console.log({ router })

  if (!router.isReady) return null

  return (
    <Tabs
      value={router.query.activeTab as string}
      onTabChange={(value) => router.push(Pathnames.dashboard.replace(':id', userId).replace(':activeTab', value))}
      variant="outline"
      defaultValue={defaultValue}
      orientation="horizontal"
    >
      <Tabs.List grow>
        {tabs.map(({ value, label }) => (
          <Tabs.Tab value={value}>{label}</Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}
