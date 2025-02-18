
# sync-storage

**sync-storage** is a universal, synchronous storage solution for React web and desktop (Electron) applications. It provides a consistent API for managing web storage—whether you're using `localStorage`, `sessionStorage`, or a custom storage interface—while supporting core operations, bulk actions, JSON handling, TTL (time-to-live), and even React hooks for automated cleanup.

For more details on the underlying Web Storage API, please refer to the [MDN Web Storage API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

## Features

- **Core Storage Operations:** Get, set, update, and remove individual keys.
- **Bulk Operations:** Filter, update, and remove multiple keys based on a predicate.
- **JSON Support:** Seamlessly store and retrieve objects using automatic JSON serialization.
- **TTL (Time-To-Live) Support:** Set expiration times for stored items.
- **React Hooks:** Use built-in hooks for automatic storage cleanup in your React components.
- **Universal:** Works with any Web Storage API–compatible storage (localStorage, sessionStorage, or custom adapters).

## Installation

Install via npm:

```bash
npm install @aivron/sync-storage
```

Or via yarn:

```bash
yarn add @aivron/sync-storage
```

## Usage

### Importing the Library

You can import individual functions or the entire module:

```ts
// Import specific functions:
import { setStorageItem, getStorageItem } from '@aivron/sync-storage';

// Or import the entire module:
import * as storage from '@aivron/sync-storage';
```

### Basic Storage Operations

#### Store a Key-Value Pair

```ts
import { setStorageItem } from '@aivron/sync-storage';

setStorageItem('userToken', 'abc123');
```

#### Retrieve a Stored Item

```ts
import { getStorageItem } from '@aivron/sync-storage';

const token = getStorageItem('userToken');
console.log(token); // Output: "abc123"
```

#### Update a Stored Item

```ts
import { updateStorageItem } from '@aivron/sync-storage';

updateStorageItem('userToken', current =>
  current ? current + '_v2' : 'defaultToken'
);
```

#### Remove a Stored Item

```ts
import { removeStorageItem } from '@aivron/sync-storage';

removeStorageItem('userToken');
```

### Bulk Operations

#### Retrieve Multiple Items

For example, retrieve all keys that start with `"app:"`:

```ts
import { getStorageItems } from '@aivron/sync-storage';

const appItems = getStorageItems(key => key.startsWith('app:'));
console.log(appItems);
```

#### Update Multiple Items

```ts
import { updateStorageItems } from '@aivron/sync-storage';

updateStorageItems(
  key => key.startsWith('app:'),
  current => (current ? current.toUpperCase() : '')
);
```

#### Remove Multiple Items

```ts
import { removeStorageKeys } from '@aivron/sync-storage';

removeStorageKeys(key => key.includes('temp'));
```

### JSON Operations

#### Store a JSON Value

```ts
import { setJSONItem } from '@aivron/sync-storage';

setJSONItem('userData', { name: 'Alice', age: 30 });
```

#### Retrieve a JSON Value

```ts
import { getJSONItem } from '@aivron/sync-storage';

const userData = getJSONItem<{ name: string; age: number }>('userData');
console.log(userData);
```

#### Update a JSON Value

```ts
import { updateJSONItem } from '@aivron/sync-storage';

updateJSONItem<{ name: string; age: number }>('userData', current => ({
  ...current,
  age: (current?.age || 0) + 1,
}));
```

### TTL (Time-To-Live) Operations

#### Store an Item with TTL

Store an item that expires in 1 hour:

```ts
import { setStorageItemWithTTL } from '@aivron/sync-storage';

setStorageItemWithTTL('sessionData', 'sessionValue', 3600 * 1000);
```

#### Retrieve an Item with TTL

```ts
import { getStorageItemWithTTL } from '@aivron/sync-storage';

const sessionValue = getStorageItemWithTTL('sessionData');
console.log(sessionValue);
```

### React Hook for Storage Cleanup

Automatically remove storage keys that match a predicate when your component mounts:

```tsx
import React from 'react';
import { useStorageCleanup } from '@aivron/sync-storage';

function App() {
  // Automatically remove any keys that start with "old:" when the component mounts.
  useStorageCleanup(key => key.startsWith('old:'));

  return <div>Your React Web/Desktop App</div>;
}

export default App;
```

## MDN Documentation

This package is built in accordance with the [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) specification. For in-depth information on how the Web Storage API works, please review the MDN documentation linked above.

## API Reference

For a detailed API reference, please consult the source code or visit the repository's documentation site.

## Contributing

Contributions, bug reports, and feature requests are welcome!
Please see the [issues page](https://github.com/aivron/sync-storage/issues) for more details on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

For the full source code and further documentation, visit the [sync-storage GitHub repository](https://github.com/aivron/sync-storage).

---

Enjoy using **@aivron/sync-storage** as your go-to solution for synchronous web storage in React web and desktop projects! If you have any questions or need assistance, feel free to open an issue on GitHub.
