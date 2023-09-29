import { Github, PencilRulerIcon, Upload } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { DownloadVideoForm } from "./components/download-video-form";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-2 flex items-center justify-between border-b">
        <div className='flex items-center justify-center gap-1 font-sans'>
          <span className='text-zinc-100 font-semibold text-lg'>Luna</span>

          <span className='flex items-center justify-center uppercase text-zinc-100 bg-zinc-800/70 p-2 w-7 h-7 rounded-sm font-bold text-lg'>
            ai
          </span>
        </div>

        <Button variant="outline" className="gap-0">
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      </div>
      <main className="flex-1 p-6 flex gap-6">
        <div className='flex flex-col flex-1 gap-4'>
          <Textarea
            placeholder="Resposta da Luna..."
            className="resize-none p-4 leading-relaxed h-full"
          />
        </div>

        <aside className='flex flex-col space-y-4 w-96'>
          <DownloadVideoForm />

          <Separator />

          <label htmlFor="video"
            className="relative border flex rounded-md aspect-video cursor-pointer border-dashed flex-col items-center justify-center gap-2 text-zinc-600 text-sm"
          >
            <Upload className="w-4 h-4" />
            Clique e insira o vídeo baixado aqui
          </label>
          <input type="file" id="video" accept="video/mp4" className="sr-only" />

          <form className='flex flex-col flex-1 gap-2'>
            <Textarea
              className='h-full resize-none leading-relaxed'
              placeholder='Diga à Luna o que ela deve fazer com o seu conteúdo...'
            />

            <Button className='w-full font-bold'>
              Executar
              <PencilRulerIcon className='w-4 h-4' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
