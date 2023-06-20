import { Pathnames } from '@/utils/pathnames'
import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { Container } from '@mantine/core'

import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { ButtonComponent } from '@/components/button'
import { PageLoaderComponent } from '@/components/pageLoader'
import { ErrorComponent } from '@/components/error'
import { HistoryTabComponent } from './historyTab'
import { ChartsTabComponent } from './chartsTab'
import { DashboardTabEnum } from '@/enums/DashboardTab.enum'

const DashboardPage = () => {
  const router = useRouter()
  const { userId } = router.query

  if (!router.isReady) return <PageLoaderComponent />
  if (!userId) return <ErrorComponent />

  return (
    <Container className="flex flex-col justify-between  py-8">
      <div className="basis-2/6 flex items-center justify-between">
        <AvatarComponent src={BasiaImg.src} name="Basia Test" />
        <ButtonComponent className="basis-2/6" variant="outline" onClick={() => alert('TODO not yet implemented')}>
          Add new measurement
        </ButtonComponent>
      </div>
      <Tabs
        value={router.query.activeTab as string}
        onTabChange={(value) =>
          router.push(
            Pathnames.dashboard
              .replace(':id', userId.toString())
              .replace(':activeTab', value || DashboardTabEnum.HISTORY),
          )
        }
        variant="outline"
        defaultValue={DashboardTabEnum.HISTORY}
        orientation="horizontal"
      >
        <Tabs.List grow>
          <Tabs.Tab value={DashboardTabEnum.HISTORY}>History</Tabs.Tab>
          <Tabs.Tab value={DashboardTabEnum.CHARTS}>Charts</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={DashboardTabEnum.HISTORY}>
          <HistoryTabComponent />
        </Tabs.Panel>
        <Tabs.Panel value={DashboardTabEnum.CHARTS}>
          <ChartsTabComponent />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default DashboardPage
