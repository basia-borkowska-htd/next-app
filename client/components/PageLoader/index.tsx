import { Loader } from '@mantine/core'

export const PageLoaderComponent = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Loader size="xl" color="blue-200" />
    <strong className="text-blue-200 mt-3 text-2xl">Loading</strong>
  </div>
)
