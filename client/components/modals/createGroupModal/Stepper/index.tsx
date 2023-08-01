import { Stepper } from '@mantine/core'

import { useTranslate } from '@/hooks/useTranslate'

interface StepperProps {
  active: number
}

export const StepperComponent = ({ active }: StepperProps) => {
  const { t } = useTranslate()

  return (
    <div className="mt-3 mb-12">
      <Stepper size="sm" active={active} color="blue-300">
        <Stepper.Step
          label={`${t('group_modal.create_group_stepper.step')} 1`}
          description={t('group_modal.create_group_stepper.create_group')}
        />
        <Stepper.Step
          label={`${t('group_modal.create_group_stepper.step')} 2`}
          description={t('group_modal.create_group_stepper.invite_members')}
        />
      </Stepper>
    </div>
  )
}
