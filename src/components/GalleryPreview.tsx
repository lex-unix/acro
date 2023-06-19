import type { Asset } from '@/types'
import { useEffect } from 'react'
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid'
import { useStore } from '@nanostores/react'
import { openAtom, indexAtom } from '@/store/gallery'

interface Props {
  images: Asset[]
}

export default function GalleryPreview({ images }: Props) {
  const $open = useStore(openAtom)

  const previewImamges = images.slice(0, 6)

  const handleShowGallery = (i: number) => {
    openAtom.set(true)
    indexAtom.set(i)
  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if ($open) {
      body?.classList.add('overflow-hidden')
    } else {
      body?.classList.remove('overflow-hidden')
    }
  }, [$open])

  return (
    <div className="not-prose grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
      {previewImamges.map((image, i) => (
        <div key={image.filename} className="group relative">
          <img
            src={image.filename}
            alt={image.alt}
            className="aspect-square w-full object-cover"
          />
          <button
            className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex group-hover:cursor-zoom-in"
            onClick={() => handleShowGallery(i)}
          >
            <MagnifyingGlassPlusIcon className="h-8 w-8 text-white" />
          </button>
        </div>
      ))}
    </div>
  )
}
