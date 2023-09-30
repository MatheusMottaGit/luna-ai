import { Textarea } from "./components/ui/textarea";
import DownloadVideoDialog from "./components/download-video-dialog";
import VideoInputForm from "./components/video-input-form";
import { useState } from "react";

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-2 flex items-center justify-between border-b">
        <div className='flex items-center justify-center gap-1 font-sans'>
          <span className='text-zinc-100 font-semibold text-lg'>Luna</span>

          <span className='flex items-center justify-center uppercase text-zinc-100 bg-zinc-800/70 p-2 w-7 h-7 rounded-sm font-bold text-lg'>
            ai
          </span>
        </div>

        <DownloadVideoDialog />
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className='flex flex-col flex-1 gap-4'>
          <Textarea
            placeholder="Resposta da Luna..."
            className="resize-none p-4 leading-relaxed h-full"
          />
        </div>

        <aside className='flex flex-col space-y-4 w-96'>
          <VideoInputForm onVideoUploaded={setVideoId} />
        </aside>
      </main>
    </div>
  )
}
