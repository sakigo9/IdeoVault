'use client'

import { UseSettings } from '@/hooks/use-setting'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { ModeToggle } from '../mode-toggle'

export const SettingModal = () => {
  const useSetting = UseSettings()
  return (
    <Dialog open={useSetting.isOpen} onOpenChange={useSetting.onClose}>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <h2 className='text-lg font-medium'>Settings</h2>
        </DialogHeader>
        <div className='flex justify-between align-center'>
          <div className='flex flex-col gap-y-1'>
            <Label> Appearance</Label>
            <span className='text-xs text-muted-foreground'>
              {' '}
              Manage app theme
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}
