# Device Client API

The `deviceClient` API provides a structured interface for managing various types of devices, including Oath devices, Push devices, WebAuthn devices, and bound devices. This API leverages Redux Toolkit Query (RTK Query) for efficient data fetching and state management.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [API Methods](#api-methods)
   - [Oath Management](#oath-management)
   - [Push Management](#push-management)
   - [WebAuthn Management](#webauthn-management)
   - [Bound Devices Management](#bound-devices-management)
5. [Example Usage](#example-usage)
6. [Error Handling](#error-handling)
7. [Authentication](#authentication)
8. [Best Practices](#best-practices)
9. [License](#license)

## Overview

The `deviceClient` function initializes the API client with the provided configuration options and sets up the Redux store with the necessary middleware and reducers.

## Installation

To install the necessary dependencies for using the `deviceClient`, run:

```bash
npm install @reduxjs/toolkit @forgerock/device-client --save
```

## Configuration

To configure the `deviceClient`, you need to provide a `ConfigOptions` object that includes the base URL for the server and the realm path.

```typescript
import { deviceClient } from './path/to/deviceClient';
import { type ConfigOptions } from '@forgerock/javascript-sdk';

const config: ConfigOptions = {
  serverConfig: {
    baseUrl: 'https://api.example.com',
  },
  realmPath: '/your-realm-path',
};

If there is no realmPath or you wish to override the value, you can do so in the api call itself where you pass in the query.

const apiClient = deviceClient(config);
```

## API Methods

### Oath Management

#### Methods

- **get(query: RetrieveOathQuery): Promise<OAthResponse>**
- Retrieves Oath devices based on the specified query.

- **delete(query: DeleteOathQuery & OathDevice): Promise<DeletedOAthDevice>**
- Deletes an Oath device based on the provided query and device information.

### Push Management

#### Methods

- **get(query: PushDeviceQuery): Promise<PushDevicesResponse | undefined>**
- Retrieves Push devices based on the specified query.

- **delete(query: DeleteDeviceQuery): Promise<PushDevice>**
- Deletes a Push device based on the provided query.

### WebAuthn Management

#### Methods

- **get(query: WebAuthnQuery): Promise<WebAuthnDevicesResponse>**
- Retrieves WebAuthn devices based on the specified query.

- **update(query: WebAuthnQueryWithUUID & WebAuthnBody): Promise<UpdatedWebAuthnDevice | undefined>**
- Updates the name of a WebAuthn device based on the provided query and body.

- **delete(query: WebAuthnQueryWithUUID & WebAuthnBody): Promise<WebAuthnDevice | undefined>**
- Deletes a WebAuthn device based on the provided query and body.

### Bound Devices Management

#### Methods

- **get(query: BindingDeviceQuery): Promise<DeviceResponse | undefined>**
- Retrieves bound devices based on the specified query.

- **delete(query: BindingDeviceQuery): Promise<Device | undefined>**
- Deletes a bound device based on the provided query.

- **update(query: BindingDeviceQuery): Promise<Device | undefined>**
- Updates the name of a bound device based on the provided query.

## Example Usage

### Oath Management Example

```typescript
const oathQuery: RetrieveOathQuery = {
  /* your query parameters */
};

apiClient.oath
  .get(oathQuery)
  .then((response) => {
    console.log('Oath Devices:', response);
  })
  .catch((error) => {
    console.error('Error fetching Oath devices:', error);
  });

const deleteOathQuery: DeleteOathQuery & OathDevice = {
  /* your delete query */
};

apiClient.oath
  .delete(deleteOathQuery)
  .then((response) => {
    console.log('Deleted Oath Device:', response);
  })
  .catch((error) => {
    console.error('Error deleting Oath device:', error);
  });
```

### Push Management Example

```typescript
const pushQuery: PushDeviceQuery = {
  /* your query parameters */
};

apiClient.push
  .get(pushQuery)
  .then((response) => {
    console.log('Push Devices:', response);
  })
  .catch((error) => {
    console.error('Error fetching Push devices:', error);
  });

const deletePushQuery: DeleteDeviceQuery = {
  /* your delete query */
};

apiClient.push
  .delete(deletePushQuery)
  .then((response) => {
    console.log('Deleted Push Device:', response);
  })
  .catch((error) => {
    console.error('Error deleting Push device:', error);
  });
```

### WebAuthn Management Example

```typescript
const webAuthnQuery: WebAuthnQuery = {
  /* your query parameters */
};

apiClient.webauthn
  .get(webAuthnQuery)
  .then((response) => {
    console.log('WebAuthn Devices:', response);
  })
  .catch((error) => {
    console.error('Error fetching WebAuthn devices:', error);
  });

const updateWebAuthnQuery: WebAuthnQueryWithUUID & WebAuthnBody = {
  /* your update query */
};

apiClient.webauthn
  .update(updateWebAuthnQuery)
  .then((response) => {
    console.log('Updated WebAuthn Device:', response);
  })
  .catch((error) => {
    console.error('Error updating WebAuthn device:', error);
  });

const deleteWebAuthnQuery: WebAuthnQueryWithUUID & WebAuthnBody = {
  /* your delete query */
};

apiClient.webauthn
  .delete(deleteWebAuthnQuery)
  .then((response) => {
    console.log('Deleted WebAuthn Device:', response);
  })
  .catch((error) => {
    console.error('Error deleting WebAuthn device:', error);
  });
```

### Bound Devices Management Example

```typescript const bindingQuery: BindingDeviceQuery = { /* your query parameters */ };
apiClient.boundDevices
  .get(bindingQuery)
  .then((response) => {
    console.log('Bound Devices:', response);
  })
  .catch((error) => {
    console.error('Error fetching bound devices:', error);
  });

const deleteBindingQuery: BindingDeviceQuery = {
  /* your delete query */
};

apiClient.boundDevices
  .delete(deleteBindingQuery)
  .then((response) => {
    console.log('Deleted Bound Device:', response);
  })
  .catch((error) => {
    console.error('Error deleting bound device:', error);
  });

const updateBindingQuery: BindingDeviceQuery = {
  /* your update query */
};

apiClient.boundDevices
  .update(updateBindingQuery)
  .then((response) => {
    console.log('Updated Bound Device:', response);
  })
  .catch((error) => {
    console.error('Error updating bound device:', error);
  });
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
