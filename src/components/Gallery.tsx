import type { Asset } from '@/types'
import { useEffect, useRef } from 'react'
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import { useStore } from '@nanostores/react'
import { openAtom, indexAtom } from '@/store/gallery'

interface Props {
  images: Asset[]
}

export default function Gallery({ images }: Props) {
  const $selectedIndex = useStore(indexAtom)
  const $isOpen = useStore(openAtom)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mousedown = (e: MouseEvent) => {
      const container = ref.current
      if (container && !container.contains(e.target as Node)) {
        openAtom.set(false)
      }
    }

    document.addEventListener('mousedown', mousedown)

    return () => document.removeEventListener('mousedown', mousedown)
  }, [])

  return $isOpen ? (
    <div className="not-prose fixed inset-0 flex items-center justify-center bg-black md:bg-black/70 md:p-20">
      <div ref={ref}>
        <div className="absolute right-4 top-4 z-10 md:hidden">
          <button
            onClick={() => openAtom.set(false)}
            className="inline-flex items-center justify-center text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <img
          src={images[$selectedIndex].filename}
          alt={images[$selectedIndex].alt}
        />
        <div className="absolute inset-y-0 right-2 flex w-8 items-center justify-center">
          {$selectedIndex < images.length - 1 && (
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
              onClick={() => indexAtom.set($selectedIndex + 1)}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="absolute inset-y-0 left-2 flex w-8 items-center justify-center">
          {$selectedIndex > 0 && (
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
              onClick={() => indexAtom.set($selectedIndex - 1)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}
