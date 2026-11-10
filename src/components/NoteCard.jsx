
import { useState } from 'react'

function NoteCard({ title, body, defaultExpanded = false }) {
  const [showMore, setShowMore] = useState(defaultExpanded)

  return (
    <div>
      <h3 className="pr-4 text-[9px] font-medium text-[#333]">
        {title}
      </h3>

      {showMore && (
        <p className="mt-2 text-[8px] leading-[11px] text-[#666]">
          {body}
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="mt-2 cursor-pointer text-[8px] text-[#b83f45] underline"
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
    </div>
  )
}

export default NoteCard
