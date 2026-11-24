import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import NoteCard from './NoteCard.jsx'

const startingNotes = [
  {
    id: 1,
    title: 'Review map and filter',
    body: 'Redo the TodoMVC steps without looking at the guide.',
  },
  {
    id: 2,
    title: 'Prepare for the quiz',
    body: 'Practice writing one handler for many inputs.',
  },
]

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : startingNotes
  })
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('draft')
    return saved ? JSON.parse(saved) : { title: '', body: '' }
  })
  const [search, setSearch] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('draft', JSON.stringify(form))
    }, 1000)
    return () => clearTimeout(id)
  }, [form])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleAdd(e) {
    e.preventDefault()
    const title = form.title.trim()
    const body = form.body.trim()
    if (!title) return
    setNotes([...notes, { id: Date.now(), title, body }])
    setForm({ title: '', body: '' })
    titleRef.current.focus()
  }

  const handleDelete = useCallback(
    (id) => {
      setNotes(notes.filter((note) => note.id !== id))
    },
    [notes]
  )

  const visibleNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [notes, search])

  return (
    <div className="flex flex-1">
      <aside className="w-64 shrink-0 bg-white px-5 pt-5 shadow-[2px_0_6px_0_rgba(0,0,0,0.12)]">
        <h1 className="text-[56px] leading-none font-extralight text-[#b83f45]">
          notes
        </h1>

        <p className="mt-5 text-[10px] tracking-wide text-[#949494]">SEARCH</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title"
          className="mt-1 w-full border border-[#ededed] px-2 py-2 text-[13px] outline-none placeholder:italic focus:border-[#b83f45]"
        />

        <form onSubmit={handleAdd}>
          <p className="mt-5 text-[10px] tracking-wide text-[#949494]">NEW NOTE</p>
          <input
            ref={titleRef}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="mt-1 w-full border border-[#ededed] px-2 py-2 text-[13px] outline-none placeholder:italic focus:border-[#b83f45]"
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Write your note"
            className="mt-2 h-24 w-full resize-none border border-[#ededed] px-2 py-2 text-[13px] outline-none placeholder:italic focus:border-[#b83f45]"
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#b83f45] py-1.5 text-[12px] text-white hover:opacity-90"
          >
            Add note
          </button>
        </form>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="mb-4 text-[20px] font-normal">All notes</h2>
        <ul className="flex flex-wrap items-start gap-4">
          {visibleNotes.map((note) => (
            <li
              key={note.id}
              className="relative w-[300px] bg-white px-4 py-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
            >
              <NoteCard
                id={note.id}
                title={note.title}
                body={note.body}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Notes