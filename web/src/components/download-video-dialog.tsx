import { FileVideo } from "lucide-react"
import { Button } from "./ui/button"
import { DownloadVideoForm } from "./download-video-form"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

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
        <DownloadVideoForm />
      </DialogContent>
    </Dialog>
  )
}

export default DownloadVideoDialog