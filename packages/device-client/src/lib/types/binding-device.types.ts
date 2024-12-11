export type BindingDeviceQuery = {
  userId: string;
  realm?: string;
} & Device;

export type DeviceResponse = {
  result: Device[];
  resultCount: number;
  pagedResultsCookie: null;
  totalPagedResultsPolicy: string;
  totalPagedResults: -1;
  remainingPagedResults: -1;
};

export type Device = {
  _id: string;
  _rev: string;
  createdDate: number;
  lastAccessDate: number;
  deviceId: string;
  deviceName: string;
  uuid: string;
  key: {
    kty: string;
    kid: string;
    use: string;
    alg: string;
    n: string;
    e: string;
  };
  deviceManagementStatus: boolean;
};
