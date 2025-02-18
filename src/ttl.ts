// src/ttl.ts

import { setStorageItem, getStorageItem, removeStorageItem, StorageType, getDefaultStorage } from "./core";

interface TTLStoredValue {
    value: string;
    expires: number; // Timestamp in milliseconds
}

export function setStorageItemWithTTL(
    key: string,
    value: string,
    ttl: number,
    storage: StorageType = getDefaultStorage()
): void {
    const ttlValue: TTLStoredValue = { value, expires: Date.now() + ttl };
    setStorageItem(key, JSON.stringify(ttlValue), storage);
}

export function getStorageItemWithTTL(
    key: string,
    storage: StorageType = getDefaultStorage()
): string | null {
    const item = getStorageItem(key, storage);
    if (!item) return null;
    try {
        const parsed: TTLStoredValue = JSON.parse(item);
        if (Date.now() > parsed.expires) {
            removeStorageItem(key, storage);
            return null;
        }
        return parsed.value;
    } catch (error) {
        console.error(`Error parsing TTL value for key "${key}":`, error);
        return null;
    }
}
