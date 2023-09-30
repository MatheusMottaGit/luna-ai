import { FileVideo } from "lucide-react"
import { Button } from "./ui/button"
import { DownloadVideoForm } from "./download-video-form"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog"

const DownloadVideoDialog = () => {
  return (
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
  )
}

export default DownloadVideoDialog