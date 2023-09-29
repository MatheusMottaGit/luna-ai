import { Separator } from "./ui/separator"
import { CheckCircle, LucideDownload } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { FormEvent, useState } from "react"
import { format } from "@/utils/urlFormater"
import { EmptyVideo } from "./empty-video"
import axios from "axios"
import Loading from "./loading-component"

type Status = 'downloading' | 'success' | 'waiting'

const statusMessages = {
  downloading: 'Baixando o vídeo e gerando transcrição...',
  success: 'Sucesso!'
}

export const UrlForm = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [status, setStatus] = useState<Status>('waiting')

  async function handleUrlForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const inputUrl = String(formData.get('url'))
    const { embedURL, videoID } = format(inputUrl)

    setVideoUrl(embedURL)

    setStatus('downloading')

    await axios.get('http://localhost:3333/audio', {
      params: {
        youtubeVideoId: videoID
      }
    })

    setStatus('success')
  }

  return (
    <>
      <form onSubmit={handleUrlForm} className='space-y-2'>
        <Input name='url' className='valid:no-underline' placeholder='Enter your Youtube url video...' />

        <Button
          data-success={status === 'success'}
          disabled={status === 'downloading'}
          type='submit'
          className='w-full data-[success=true]:bg-emerald-700 font-bold'
        >
          {status === 'waiting' ? (
            <>
              Start download
              <LucideDownload className='h-4 w-4' />
            </>
          ) : status === 'downloading' ? (
            <>
              {statusMessages.downloading}
              <Loading />
            </>
          ) : status === 'success' && (
            <>
              {statusMessages.success}
              <CheckCircle className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <Separator />

      {
        videoUrl ? <iframe src={videoUrl} className='h-[410px] w-full rounded-md'></iframe> : <EmptyVideo />
      }
    </>
  )
}