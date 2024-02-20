export type ResponseClone = {
  body: unknown;
  headers: Record<string, string | null>;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
};

export type ResponseHeaders = Record<string, string | null>;

export type RequestHeaders = Record<string, string | null>;
