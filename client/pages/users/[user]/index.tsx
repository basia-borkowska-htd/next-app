import { ChartComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserType } from '@/types/User'
import { useDisclosure } from '@mantine/hooks'
import { UserModalComponent } from '@/components/userModal'
import { notifications } from '@mantine/notifications'
import { ConfirmationModalComponent } from '@/components/confirmationModal'
import { Pathnames } from '@/utils/pathnames'
import { PageLoaderComponent } from '@/components/pageLoader'

const UserProfilePage = () => {
  // const { getUser, updateUser, deleteUser, loading } = useUsers()
  const router = useRouter()
  const { user: userId } = router.query
  const [user, setUser] = useState<UserType | null>()
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false)

  useEffect(() => {
    ;(async () => {
      try {
        // const fetchedUser = await getUser(userId?.toString() || '')
        // setUser(fetchedUser)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [userId])

  const handleEdit = async (user: UserType) => {
    // const result = await updateUser(user)
    // if (result) {
    //   closeEditModal()
    //   setUser(result)
    //   notifications.show({
    //     title: 'Success',
    //     message: 'User updated successfully',
    //     color: 'green',
    //   })
    // } else {
    //   notifications.show({
    //     title: 'Error',
    //     message: 'Unable to update user',
    //     color: 'red',
    //   })
    // }
  }

  const handleDelete = async () => {
    const errorNotification = {
      title: 'Error',
      message: 'Unable to delete user',
      color: 'red',
    }
    if (!user?._id) notifications.show(errorNotification)
    else {
      // const result = await deleteUser(user?._id)
      // if (result) {
      //   close()
      //   notifications.show({
      //     title: 'Success',
      //     message: 'User deleted successfully',
      //     color: 'green',
      //   })
      //   router.push(Pathnames.home)
      // } else {
      //   notifications.show(errorNotification)
      // }
    }
  }

  if (!user) return <PageLoaderComponent />

  return (
    <>
      <HeaderComponent user={user} openModal={openEditModal} openConfirmationModal={openConfirmationModal} />
      <RangesComponent userId={user._id} userSex={user.sex} />
      <ChartComponent />

      <UserModalComponent
        opened={editModalOpened}
        user={user}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        loading={false}
      />
      <ConfirmationModalComponent
        opened={confirmationModalOpened}
        loading={false}
        title={`Delete ${user.name} User`}
        description="Are you sure you want to delete this user and all of their measurements? This action is irreversable."
        confirmButtonText="Delete"
        declineButtonText="Cancel"
        onClose={closeConfirmationModal}
        onSubmit={handleDelete}
      />
    </>
  )
}

export default UserProfilePage
