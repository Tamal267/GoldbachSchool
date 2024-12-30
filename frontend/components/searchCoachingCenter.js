'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { bottomToTopVarient } from '@/lib/animation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function SearchCoachingCenter({ coachingCenters }) {
  const searchBoxRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        searchBoxRef.current?.click()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Dialog>
      <div
        
        className="relative rounded-full max-w-md h-full w-full border border-darkb"
      >
        <DialogTrigger className="w-full outline-none">
          {/* <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-700" /> */}
          <Image
            src="/Assets/search_icon.svg"
            alt="Search"
            width={40}
            height={40}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full aspect-square"
          />
          <Input
            type="text"
            ref={searchBoxRef}
            id="coaching_center"
            name="coaching_center"
            placeholder="⌘ + k to find coaching centers"
            className="bg-transparent rounded-full pl-4 pr-4 py-2 w-full ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for coaching centeres</DialogTitle>
          <div>
            <Command>
              <CommandInput placeholder="search coaching centeres..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {coachingCenters.map((coachingCenter, index) => (
                    <CommandItem key={index}>{coachingCenter.name}</CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
