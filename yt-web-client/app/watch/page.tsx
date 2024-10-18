'use client';
import { useSearchParams } from 'next/navigation';

export default function Watch() {
  const videoPrefix =
    'https://storage.googleapis.com/ajg-ytclone-processed-vids/';
  const videoSource = useSearchParams().get('v');
  return (
    <div className="">
      <h1>Watch Page</h1>
      <video controls src={videoPrefix + videoSource}></video>
    </div>
  );
}
