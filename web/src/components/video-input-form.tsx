import { api } from '@/lib/api'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Upload, PencilRulerIcon, Download } from 'lucide-react'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface VideoInputProps {
  onVideoUploaded: (videoId: string) => void
}

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo áudio...',
  generating: 'Transcrevendo vídeo...',
  uploading: 'Fazendo upload...',
  success: 'Vídeo transcrito!'
}

const VideoInputForm = (props: VideoInputProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')

  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className='space-y-2'>
      <label
        htmlFor='video'
        className='border border-dashed flex flex-col gap-2 items-center rounded-md'
      >
        {previewURL ? (
          <video src={previewURL} controls={false} className='absolute inset-0' />
        ) : (
          <>
            <Upload className='h-4 w-4' />
            Clique e insira o vídeo baixado
          </>
        )}
      </label>

      <input type="file" id="video" accept='video/mp4' onChange={selectFile} />

      <Button className='w-full gap-2'>
        Carregar vídeo
        <Download className='w-4 h-4' />
      </Button>
    </form>
  )
}

export default VideoInputForm