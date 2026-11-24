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
    <main className="mx-auto max-w-[550px] px-4 pt-10 pb-24">
      <h1 className="mb-6 text-center text-[80px] font-extralight text-[#b83f45]">
        notes
      </h1>

      <form
        onSubmit={handleAdd}
        className="mb-6 bg-white px-6 py-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
      >
        <p className="text-[13px] font-normal tracking-wide text-[#949494]">NEW NOTE</p>
        <input
          ref={titleRef}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="mt-2 w-full border-b border-[#ededed] py-2 text-[19px] outline-none focus:border-[#b83f45]"
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Write your note..."
          rows={3}
          className="mt-3 w-full border border-[#ededed] p-2 text-[16px] outline-none focus:border-[#b83f45]"
        />
        <button
          type="submit"
          className="mt-3 cursor-pointer bg-[#b83f45] px-4 py-2 text-[15px] text-white hover:opacity-90"
        >
          Add note
        </button>
      </form>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title"
        className="mb-6 w-full bg-white px-4 py-3 text-[17px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] outline-none"
      />

      <ul className="space-y-4">
        {visibleNotes.map((note) => (
          <li
            key={note.id}
            className="relative min-h-32 bg-white px-6 py-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
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
  )
}

export default Notes