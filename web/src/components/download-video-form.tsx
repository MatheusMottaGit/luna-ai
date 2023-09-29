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
  downloading: 'Baixando o vídeo...',
  success: 'Sucesso!'
}

export const DownloadVideoForm = () => {
  const [videoUrl, setVideoUrl] = useState('')
  const [status, setStatus] = useState<Status>('waiting')

  async function handleUrlForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const inputUrl = String(formData.get('url'))
    const { embedURL } = format(inputUrl)

    setVideoUrl(embedURL)

    setStatus('downloading')

    await axios.get('http://localhost:3333/audio', {
      params: {
        videoUrl: embedURL
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
              Fazer download
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

      <div className="flex-1">
        {
          videoUrl ? <iframe src={videoUrl} className='w-full h-full rounded-md'></iframe> : <EmptyVideo />
        }
      </div>
    </>
  )
}