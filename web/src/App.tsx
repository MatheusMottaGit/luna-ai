import { Textarea } from "./components/ui/textarea";
import VideoInputForm from "./components/video-input-form";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { FileVideo, PencilRulerIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { DownloadVideoForm } from "./components/download-video-form";

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

        <Dialog>
          <DialogTrigger>
            <Button variant='outline'>
              Baixar vídeo do Youtube
              <FileVideo className="w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="">
            <DialogTitle>Download do vídeo</DialogTitle>
            <DialogDescription className="italic text-zinc-700">(O arquivo será salvo na Área de Trabalho do seu computador)</DialogDescription>

            <DownloadVideoForm />
          </DialogContent>
        </Dialog>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className='flex flex-col flex-1 gap-4'>
          <Textarea
            placeholder="Resposta da Luna..."
            className="resize-none p-4 leading-relaxed h-full"
          />
        </div>

        <aside className='flex flex-col space-y-4 w-96'>
          <div className="space-y-4">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <form className="space-y-2">
              <Textarea
                placeholder="Insira o que a Luna deve fazer com o seu conteúdo..."
                className="resize-none p-4 leading-relaxed"
              />

              <Button className="w-full gap-2">
                Executar
                <PencilRulerIcon className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  )
}
