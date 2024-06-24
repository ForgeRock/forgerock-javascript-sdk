/**
 * Define the DaVinci API for Redux Toolkit
 */
export interface DaVinciField {
  type: string;
  key: string;
  label: string;
}

export interface DaVinciAction {
  action: string;
}

export interface DaVinciRequest {
  id: string;
  eventName: string;
  interactionId: string;
  parameters: {
    eventType: 'submit' | 'action';
    data: {
      actionKey: string;
      formData?: Record<string, any>;
    };
  };
}

export interface DaVinciResponse {
  data: {
    authorizeResponse?: {
      code: string;
      state: string;
    };
    code?: string;
    eventName?: string;
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    _links?: {
      next: {
        href: string;
      };
    };
    formData?: {
      value: {
        [key: string]: string;
      };
    };
    form?: {
      name: string;
      description: string;
      components: {
        fields: DaVinciField[];
      };
    };
    httpResponseCode?: number;
    message?: string;
    session?: {
      id: string;
    };
    status?: string;
    success?: boolean;
  };
  requestId: string;
}
