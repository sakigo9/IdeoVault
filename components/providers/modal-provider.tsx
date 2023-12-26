'use client'

import { useEffect, useState } from 'react'
import { SettingModal } from '../modal/settingModal'

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  return <SettingModal />
}
