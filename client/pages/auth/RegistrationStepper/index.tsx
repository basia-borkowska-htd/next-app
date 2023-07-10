import { Stepper } from '@mantine/core'

import { useTranslate } from '@/hooks/useTranslate'

interface RegistrationStepperProps {
  active: number
}

export const RegistrationStepperComponent = ({ active }: RegistrationStepperProps) => {
  const { t } = useTranslate()
  return (
    <div className="my-4 pb-4">
      <Stepper size="sm" active={active} color="green-100">
        <Stepper.Step
          label={`${t('auth.registration_stepper.step')} 1`}
          description={t('auth.registration_stepper.create_account')}
        />
        <Stepper.Step
          label={`${t('auth.registration_stepper.step')} 2`}
          description={t('auth.registration_stepper.verify_email')}
        />
        <Stepper.Step
          label={`${t('auth.registration_stepper.step')} 3`}
          description={t('auth.registration_stepper.complete_profile')}
        />
      </Stepper>
    </div>
  )
}
