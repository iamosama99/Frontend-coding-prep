import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
}

interface TabsProps {
  defaultTab: string
  children: ReactNode
  onChange?: (tabId: string) => void
}

interface TabProps {
  id: string
  children: ReactNode
  disabled?: boolean
}

interface TabPanelProps {
  tabId: string
  children: ReactNode
}

/**
 * TODO 1: Create a TabsContext with createContext<TabsContextValue | null>(null).
 *
 * TODO 2: Implement Tabs:
 *   - useState for activeTab, initialised to defaultTab.
 *   - Store onChange in a useRef so setActiveTab always calls the latest version
 *     without adding onChange to the effect dependency array.
 *   - setActiveTab should update state AND call onChangeRef.current if defined.
 *   - Provide { activeTab, setActiveTab } via TabsContext.Provider.
 *
 * TODO 3: Implement Tabs.Tab:
 *   - Call useContext(TabsContext) — throw if null.
 *   - Render a <button> with:
 *       role="tab"
 *       aria-selected={ctx.activeTab === id}
 *       aria-disabled={disabled}
 *       onClick: if not disabled, call ctx.setActiveTab(id)
 *
 * TODO 4: Implement Tabs.Panel:
 *   - Call useContext(TabsContext) — throw if null.
 *   - Return children only if ctx.activeTab === tabId, otherwise return null.
 *
 * TODO 5: Attach Tab and Panel as static properties on Tabs before exporting.
 */

// TODO: create context

function Tabs({ defaultTab, children, onChange }: TabsProps) {
  // TODO: implement
  throw new Error('Not implemented')
}

function Tab({ id, children, disabled }: TabProps) {
  // TODO: implement
  throw new Error('Not implemented')
}

function Panel({ tabId, children }: TabPanelProps) {
  // TODO: implement
  throw new Error('Not implemented')
}

// Attach sub-components
Tabs.Tab = Tab
Tabs.Panel = Panel

export { Tabs }
