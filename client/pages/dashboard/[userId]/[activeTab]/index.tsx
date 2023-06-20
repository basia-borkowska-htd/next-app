import { Pathnames } from '@/utils/pathnames'
import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { Container } from '@mantine/core'
import BasiaImg from '@/assets/images/basia.jpeg'

import { PageLoaderComponent } from '@/components/pageLoader'
import { ErrorComponent } from '@/components/error'
import { HistoryTabComponent } from './historyTab'
import { ChartsTabComponent } from './chartsTab'
import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { useDisclosure } from '@mantine/hooks'
import HeaderComponent from './header'
import { AddMeasurementModalComponent } from '@/components/addMeasurementModal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MeasurementType } from '@/types/Measurement'
import { api } from '@/api'
import { notify } from '@/utils/notifications'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

const DashboardPage = () => {
  const router = useRouter()
  const { userId } = router.query

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUser(userId?.toString() || ''),
    enabled: router.isReady,
  })
  const queryClient = useQueryClient()

  const [opened, { open, close }] = useDisclosure(false)
  const addMeasurementMutation = useMutation({
    mutationFn: (measurement: MeasurementType) => api.measurement.addMeasurement(measurement),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.MEASUREMENTS] })
      notify({ type: 'success', message: 'Measurement added successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to add measurement' })
    },
  })

  if (!router.isReady || isLoading) return <PageLoaderComponent />
  if (!userId || error || !user) return <ErrorComponent />

  return (
    <Container className="flex flex-col justify-between py-8" size="xl">
      <HeaderComponent userName={user.name} userAvatar={BasiaImg.src} openModal={open} />
      <AddMeasurementModalComponent
        opened={opened}
        userId={userId.toString()}
        onClose={close}
        onSubmit={addMeasurementMutation.mutate}
        loading={addMeasurementMutation.isLoading}
      />

      <Tabs
        value={router.query.activeTab as string}
        onTabChange={(value) =>
          router.push(
            Pathnames.dashboard
              .replace(':id', userId.toString())
              .replace(':activeTab', value || DashboardTabEnum.HISTORY),
          )
        }
        defaultValue={DashboardTabEnum.HISTORY}
        orientation="horizontal"
        color="blue-100"
      >
        <Tabs.List grow>
          <Tabs.Tab value={DashboardTabEnum.HISTORY}>History</Tabs.Tab>
          <Tabs.Tab value={DashboardTabEnum.CHARTS}>Charts</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={DashboardTabEnum.HISTORY}>
          <HistoryTabComponent userId={userId.toString()} />
        </Tabs.Panel>
        <Tabs.Panel value={DashboardTabEnum.CHARTS}>
          <ChartsTabComponent />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default DashboardPage
