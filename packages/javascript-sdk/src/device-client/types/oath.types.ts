export type OathDevice = {
  _id: string;
  deviceManagementStatus: boolean;
  deviceName: string;
  uuid: string;
  createdDate: number;
  lastAccessDate: number;
  _rev: string;
};

export type DeleteOathQuery = {
  realm?: string;
  userId: string;
  uuid: string;
};

export type RetrieveOathQuery = {
  realm?: string;
  userId: string;
};

export type OAthResponse = {
  pagedResultsCookie: string | null;
  remainingPagedResults: number;
  resultCount: number;
  totalPagedResults: number;
  totalPagedResultsPolicy: string;
  result: OathDevice[];
};

export type DeletedOAthDevice = {
  _id: string;
  _rev: string;
  uuid: string;
  recoveryCodes: string[];
  createdDate: number;
  lastAccessDate: number;
  sharedSecret: string;
  deviceName: string;
  lastLogin: number;
  counter: number;
  checksumDigit: boolean;
  truncationOffset: number;
  clockDriftSeconds: number;
};
