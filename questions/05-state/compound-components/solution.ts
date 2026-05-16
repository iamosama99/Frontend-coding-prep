import { ReactNode } from 'react'

// TODO: implement solution

function Tabs(_props: { defaultTab: string; children: ReactNode; onChange?: (tabId: string) => void }) {
  throw new Error('Not implemented')
}

function Tab(_props: { id: string; children: ReactNode; disabled?: boolean }) {
  throw new Error('Not implemented')
}

function Panel(_props: { tabId: string; children: ReactNode }) {
  throw new Error('Not implemented')
}

Tabs.Tab = Tab
Tabs.Panel = Panel

export { Tabs }
