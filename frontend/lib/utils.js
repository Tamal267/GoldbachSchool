import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getBlur() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHHRFWHRDcmVhdGlvbgAyMDI0OjA3OjI1IDEyOjAxOjE5Dzs59QAAAE9JREFUeJwBRAC7/wATEwwkUU9KnNLSzbb7+/NCAEJBPaZ/f3n/m5uV/728uLAANTMxzTw8OP9DQj//hoWAzAAuLidoBAIAw1xcWbulpaFuMJEevgmlsqEAAAAASUVORK5CYII='
}
