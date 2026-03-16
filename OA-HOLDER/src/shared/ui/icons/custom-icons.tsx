import React from 'react'
import type { LucideProps } from 'lucide-react'

const createIcon = (
  name: string,
  path: React.ReactNode
): React.FC<LucideProps> => {
  const Icon: React.FC<LucideProps> = ({
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    className,
    ...props
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {path}
    </svg>
  )
  Icon.displayName = name
  return Icon
}

export const CustomIcons = {
  TaskTagTarget: createIcon('TaskTagTarget', (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </>
  )),

  TaskTagTemp: createIcon('TaskTagTemp', (
    <path d="M12 2L22 22H2L12 2Z" />
  )),

  WinMinimize: createIcon('WinMinimize', (
    <line x1="5" y1="12" x2="19" y2="12" />
  )),

  WinMaximize: createIcon('WinMaximize', (
    <rect x="4" y="4" width="16" height="16" rx="1" />
  )),

  WinClose: createIcon('WinClose', (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </>
  )),

  WinRestore: createIcon('WinRestore', (
    <>
      <rect x="3" y="7" width="14" height="14" rx="1" />
      <path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
    </>
  )),
}
