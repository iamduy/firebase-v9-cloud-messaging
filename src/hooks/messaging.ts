import { getMessagingToken, onMessageListener } from '@/firebase';
import { useEffect } from 'react';

const useMessaging = () => {
  useEffect(() => {
    getMessagingToken();
    const channel = new BroadcastChannel('notifications');
    channel.addEventListener('message', (event) => {
      console.log('Receive background: ', event.data);
      playNotificationSound();
    });
  }, []);

  useEffect(() => {
    onMessageListener((value) => {
      console.log('Receive foreground: ', value);
      playNotificationSound();
    });
  });

  const playNotificationSound = async () => {
    try {
      const audioContext = new AudioContext();
      const response = await fetch('/sounds/noti-coming.wav');
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (_) {}
  };
};

export default useMessaging;
