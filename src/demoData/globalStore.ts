import { useSyncExternalStore } from 'react'

import globalData from './globalData'

export type InputEntityType = 'input' | 'dropdown' | 'textbox'

export type InputEntityRecord = {
  id: number
  name: string
  value?: string
  values?: string[]
}

type GlobalStore = {
  inputs: Record<InputEntityType, InputEntityRecord[]>
}

type InputEntityPayload = Omit<InputEntityRecord, 'id'>

let store: GlobalStore = structuredClone(globalData)
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return store
}

export function useGlobalStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function getInputEntities(type: InputEntityType) {
  return store.inputs[type]
}

export function getInputEntity(type: InputEntityType, id: number) {
  return store.inputs[type].find((item) => item.id === id)
}

export function addInputEntity(type: InputEntityType, payload: InputEntityPayload) {
  const nextId =
    Math.max(0, ...store.inputs[type].map((item) => item.id)) + 1

  store = {
    ...store,
    inputs: {
      ...store.inputs,
      [type]: [...store.inputs[type], { id: nextId, ...payload }],
    },
  }
  emitChange()

  return nextId
}

export function updateInputEntity(
  type: InputEntityType,
  id: number,
  payload: InputEntityPayload,
) {
  store = {
    ...store,
    inputs: {
      ...store.inputs,
      [type]: store.inputs[type].map((item) =>
        item.id === id ? { id, ...payload } : item,
      ),
    },
  }
  emitChange()
}

export function deleteInputEntity(type: InputEntityType, id: number) {
  store = {
    ...store,
    inputs: {
      ...store.inputs,
      [type]: store.inputs[type].filter((item) => item.id !== id),
    },
  }
  emitChange()
}

export default store
