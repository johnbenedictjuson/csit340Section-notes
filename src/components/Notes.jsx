
import { useState } from 'react'
import NoteCard from './NoteCard.jsx'

function Notes() {
  const [notes, setNotes] = useState([
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
  ])

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  })

  const [search, setSearch] = useState('')

  function HandleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function HandleSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim() || !formData.body.trim()) {
      return
    }

    const newNote = {
      id: Date.now(),
      title: formData.title.trim(),
      body: formData.body.trim(),
    }

    setNotes([...notes, newNote])

    setFormData({
      title: '',
      body: '',
    })
  }

  function DeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="grid min-h-screen grid-cols-[22%_78%] bg-[#f5f5f5]">
      <aside className="relative min-h-screen border-r border-[#ddd] bg-white px-3 py-4">
        <h1 className="mb-3 text-[23px] font-extralight leading-none text-[#c9444b]">
          notes
        </h1>

        <div className="mb-3">
          <label className="mb-1 block text-[5px] uppercase text-[#999]">
            Search
          </label>

          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-[18px] w-full border border-[#e5e5e5] px-2 text-[7px] outline-none"
          />
        </div>

        <form onSubmit={HandleSubmit}>
          <label className="mb-1 block text-[5px] uppercase text-[#999]">
            New note
          </label>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={HandleChange}
            className="mb-1 h-[19px] w-full border border-[#e5e5e5] px-2 text-[7px] outline-none"
          />

          <textarea
            name="body"
            placeholder="Write your note"
            value={formData.body}
            onChange={HandleChange}
            className="mb-1 h-[40px] w-full resize-none border border-[#e5e5e5] px-2 py-1 text-[7px] outline-none"
          />

          <button
            type="submit"
            className="h-[17px] w-full cursor-pointer bg-[#c9444b] text-[7px] text-white hover:bg-[#ad343b]"
          >
            Add note
          </button>
        </form>

        <p className="absolute bottom-3 left-3 text-[5px] text-[#aaa]">
          Created by YOUR NAME
        </p>
      </aside>

      <main className="min-h-screen px-4 py-4">
        <h2 className="mb-2 text-[10px] font-normal text-[#444]">
          All notes
        </h2>

        <ul className="grid grid-cols-3 items-start gap-2">
          {filteredNotes.map((note, index) => (
            <li
              key={note.id}
              className="relative min-h-[44px] bg-white px-2 py-2 shadow-[0_5px_12px_rgba(0,0,0,0.12)]"
            >
              <NoteCard
                title={note.title}
                body={note.body}
                defaultExpanded={note.id === 1}
              />

              <button
                type="button"
                onClick={() => DeleteNote(note.id)}
                className="absolute right-2 top-1 cursor-pointer text-[10px] leading-none text-[#999]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {filteredNotes.length === 0 && (
          <p className="text-[9px] text-[#999]">
            No notes found
          </p>
        )}
      </main>
    </div>
  )
}

export default Notes
