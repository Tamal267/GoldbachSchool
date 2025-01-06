function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e]
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r])
          }
          return n
        }),
    _extends.apply(null, arguments)
  )
}
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import * as React from 'react'
const FloatingInput = /*#__PURE__*/ React.forwardRef(
  ({ className, ...props }, ref) => {
    return /*#__PURE__*/ React.createElement(
      Input,
      _extends(
        {
          placeholder: ' ',
          className: cn('peer', className),
          ref: ref,
        },
        props,
      ),
    )
  },
)
FloatingInput.displayName = 'FloatingInput'
const FloatingLabel = /*#__PURE__*/ React.forwardRef(
  ({ className, ...props }, ref) => {
    return /*#__PURE__*/ React.createElement(
      Label,
      _extends(
        {
          className: cn(
            'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text',
            className,
          ),
          ref: ref,
        },
        props,
      ),
    )
  },
)
FloatingLabel.displayName = 'FloatingLabel'
const FloatingLabelInput = /*#__PURE__*/ React.forwardRef(
  ({ id, label, ...props }, ref) => {
    return /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'relative',
      },
      /*#__PURE__*/ React.createElement(
        FloatingInput,
        _extends(
          {
            ref: ref,
            id: id,
          },
          props,
        ),
      ),
      /*#__PURE__*/ React.createElement(
        FloatingLabel,
        {
          htmlFor: id,
        },
        label,
      ),
    )
  },
)
FloatingLabelInput.displayName = 'FloatingLabelInput'
export { FloatingInput, FloatingLabel, FloatingLabelInput }
