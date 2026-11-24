import { useState, useContext, memo } from 'react'
import { SettingsContext } from '../SettingsContext.js'

function NoteCard({ id, title, body, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)
  const { largeText } = useContext(SettingsContext)

  return (
    <div>
      <h3
        className={
          largeText
            ? 'pr-6 text-[22px] font-normal break-words'
            : 'pr-6 text-[17px] font-normal break-words'
        }
      >
        {title}
      </h3>
      {isOpen && (
        <p
          className={
            largeText
              ? 'mt-2 text-[18px] break-words whitespace-pre-wrap text-[#4d4d4d]'
              : 'mt-2 text-[14px] break-words whitespace-pre-wrap text-[#4d4d4d]'
          }
        >
          {body}
        </p>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 cursor-pointer text-[11px] text-[#b83f45] underline"
      >
        {isOpen ? 'Show less' : 'Show more'}
      </button>
      <button
        type="button"
        onClick={() => onDelete(id)}
        className="absolute top-2 right-3 cursor-pointer text-[20px] leading-none text-[#949494] hover:text-[#c18585]"
      >
        ×
      </button>
    </div>
  )
}

export default memo(NoteCard)