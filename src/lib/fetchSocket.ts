import Pusher from 'pusher-js';

export async function FetchSocket({ url, body }: { url: string; body: any }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json', // Tambahkan baris ini
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function pusherClient() {
  const pusherClinet = new Pusher('3006004164fdcfb53231', {
    cluster: 'ap1',
    forceTLS: true,
  });
  return pusherClinet;
}
