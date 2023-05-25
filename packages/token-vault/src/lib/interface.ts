import type { ConfigOptions } from "@forgerock/javascript-sdk";

interface ForgeRockConfig extends ConfigOptions {
  serverConfig: {
    baseUrl: string;
    timeout?: number;
  };
}

export type BaseConfig = {
  app: {
    origin: string;
    url: string;
  },
  events?: {
    fetch?: string;
    has?: string;
    refresh?: string;
    remove?: string;
    set?: string;
  };
  forgerock: ForgeRockConfig;
  interceptor: {
    file: string;
    type?: "classic" | "module";
  };
  proxy: {
    id?: string;
    origin: string;
    url?: string;
  };
};
