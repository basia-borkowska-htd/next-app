import { Loader } from '@mantine/core'

interface PageLoaderProps {
  compact?: boolean
}

export const PageLoaderComponent = ({ compact = false }: PageLoaderProps) => (
  <div className={`${compact ? 'my-8 py-8' : 'h-screen justify-center'} flex flex-col items-center `}>
    <Loader size={compact ? 'lg' : 'xl'} color="blue-200" />
    <strong className={`${compact ? 'text-xl' : 'text-2xl'} text-blue-200 mt-3`}>Loading</strong>
  </div>
)
