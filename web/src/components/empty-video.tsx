import { FileVideo } from 'lucide-react'

export const EmptyVideo = () => {
  return (
    <div className='flex flex-col h-[550px] items-center justify-center gap-2 bg-zinc-900 text-zinc-700 text-sm border border-dashed border-zinc-600 rounded-sm'>
      <FileVideo className='h-4 w-4' />

      Video preview
    </div>
  )
}