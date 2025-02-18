// src/bulk.ts

import { getStorageKeys, updateStorageItem, removeStorageItem, StorageType, getDefaultStorage } from "./core";

export function filterStorageKeys(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): string[] {
    return getStorageKeys(storage).filter(predicate);
}

export function getStorageItems(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): { [key: string]: string; } {
    return getStorageKeys(storage).reduce((acc, key) => {
        if (predicate(key)) {
            const value = storage.getItem(key);
            if (value !== null) {
                acc[key] = value;
            }
        }
        return acc;
    }, {} as { [key: string]: string; });
}

export function removeStorageKeys(
    predicate: (key: string) => boolean,
    storage: StorageType = getDefaultStorage()
): void {
    const keys = filterStorageKeys(predicate, storage);
    keys.forEach((key) => removeStorageItem(key, storage));
}

export function updateStorageItems(
    predicate: (key: string) => boolean,
    updateFn: (currentValue: string | null) => string,
    storage: StorageType = getDefaultStorage()
): void {
    getStorageKeys(storage).forEach((key) => {
        if (predicate(key)) {
            updateStorageItem(key, updateFn, storage);
        }
    });
}
export { getDefaultStorage, StorageType };
