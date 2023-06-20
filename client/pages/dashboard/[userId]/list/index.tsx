import React from 'react'
import { Container } from '@mantine/core'

import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { ButtonComponent } from '@/components/button'
import { TabsComponent } from '@/components/tabs'
import { tabs, listTab } from '../helpers'

const ListPage = () => {
  const name = 'trsfr'
  return (
    <Container className="flex flex-col justify-between  py-8">
      <div className="basis-2/6 flex items-center justify-between">
        <AvatarComponent src={BasiaImg.src} name={name} />
        <ButtonComponent className="basis-2/6" variant="outline" onClick={() => alert('TODO not yet implemented')}>
          Add new measurement
        </ButtonComponent>
      </div>
      <TabsComponent defaultValue={listTab.value} tabs={tabs} />
    </Container>
  )
}

export default ListPage
