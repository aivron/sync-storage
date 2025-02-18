// src/json.ts

import { setStorageItem, getStorageItem, updateStorageItem, StorageType, getDefaultStorage } from "./core";

export function setJSONItem<T>(key: string, value: T, storage: StorageType = getDefaultStorage()): void {
    setStorageItem(key, JSON.stringify(value), storage);
}

export function getJSONItem<T>(key: string, storage: StorageType = getDefaultStorage()): T | null {
    const item = getStorageItem(key, storage);
    if (item === null) return null;
    try {
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`Error parsing JSON for key "${key}":`, error);
        return null;
    }
}

export function updateJSONItem<T>(
    key: string,
    updateFn: (currentValue: T | null) => T,
    storage: StorageType = getDefaultStorage()
): void {
    const current = getJSONItem<T>(key, storage);
    const updated = updateFn(current);
    setJSONItem(key, updated, storage);
}
