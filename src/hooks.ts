// src/hooks.ts

import { useEffect, useCallback } from "react";
import { removeStorageKeys, StorageType, getDefaultStorage } from "./bulk";

/**
 * A React hook that performs storage cleanup based on a predicate.
 * This hook is intended for React web and desktop (Electron) projects.
 *
 * @param predicate - A function that returns true for keys to remove.
 * @param storage - Optional custom storage adapter (defaults to localStorage).
 */
export function useStorageCleanup(
    predicate: (key: string) => boolean,
    storage?: StorageType
): void {
    const storageInstance = storage || getDefaultStorage();
    const cleanup = useCallback(() => {
        removeStorageKeys(predicate, storageInstance);
    }, [predicate, storageInstance]);

    useEffect(() => {
        cleanup();
    }, [cleanup]);
}
