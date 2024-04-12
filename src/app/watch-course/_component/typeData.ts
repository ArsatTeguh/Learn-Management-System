import Toast from '@/lib/toast';

export type ActionType = {
  id: number;
  like: Array<string>;
  dislike: Array<string>;
};

export type CallbackMessage = {
  name: string;
  message: string;
  currentVideo: string;
  data: ActionType;
};

export type MessageType = {
  currentVideo: string;
  name: string;
  message: string;
};

export type ProgressType = {
  count: number;
  chapter: Array<string>;
};

export type OnActionType = {
  index: number;
  like: Array<string>;
  dislike: Array<string>;
};

export type InputAction = {
  message: string;
  like: boolean;
  dislike: boolean;
  name: string;
};

export async function fetcher(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const result = await res.json();
  return result.data;
}

export async function updateProgress(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (response.status === 401) {
    Toast({
      status: 'error',
      message: 'Your Must Login',
    });
  }
  return response;
}
