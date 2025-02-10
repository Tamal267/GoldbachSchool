import MarkdownRender from '@/components/markdownRenderer'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'

const customeCommands = [
  commands.bold,
  commands.italic,
  commands.hr,
  commands.divider,
  commands.link,
  commands.code,
  commands.codeBlock,
  commands.quote,
  commands.image,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
]

export default function Mdeditor({ description, setDescription, name }) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState(false)
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button className="bg-transparent rounded-lg w-full ring-0 border focus-visible:ring-offset-0 focus-visible:ring-0 text-black hover:text-white">
            {description ? 'Edit Description' : 'Add Description'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto w-full max-w-6xl">
          <DialogHeader>
            <DialogTitle>Edit Description</DialogTitle>
          </DialogHeader>
          <div
            className="mt-2 bg-white rounded-lg"
            data-color-mode="light"
          >
            {preview ? (
              // Custom markdown preview with equations, code highlighting and full-width videos
              <div className="p-4 border rounded">
                <MarkdownRender content={description} />
              </div>
            ) : (
              <MDEditor
                value={description}
                onChange={(val) => setDescription(val || '')}
                commands={customeCommands}
                extraCommands={[]}
                preview="edit"
              />
            )}
          </div>
          <DialogFooter className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => setPreview(!preview)}
            >
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Hidden input to include the markdown description in formData */}
      <input
        type="hidden"
        name={name}
        value={description}
      />
    </div>
  )
}
