
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

  // STEP 8: Search state
  const [search, setSearch] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  // STEP 5: Add a note
  function handleSubmit(event) {
    event.preventDefault()

    const title = formData.title.trim()
    const body = formData.body.trim()

    if (!title || !body) return

    const newNote = {
      id: Date.now(),
      title,
      body,
    }

    setNotes((previousNotes) => [...previousNotes, newNote])

    setFormData({
      title: '',
      body: '',
    })
  }

  // STEP 6: Delete a note
  function handleDelete(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    )
  }

  // STEP 8: Filter notes by title
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="grid min-h-screen grid-cols-[420px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col gap-5 bg-white px-8 py-9 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <h1 className="text-[72px] leading-none font-extralight text-[#b83f45]">
          notes
        </h1>

        <div>
          <p className="mb-2 text-[13px] font-normal tracking-wide text-[#949494]">
            SEARCH
          </p>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
        </div>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <p className="text-[13px] font-normal tracking-wide text-[#949494]">
            NEW NOTE
          </p>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />

          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your note"
            className="h-[120px] w-full resize-none border border-[#e6e6e6] px-4 py-3 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />

          <button
            type="submit"
            className="h-[50px] cursor-pointer bg-[#b83f45] text-[17px] font-normal text-white hover:bg-[#a33439]"
          >
            Add note
          </button>
        </form>

        <div className="mt-auto text-[12px] text-[#aaa]">
          
        </div>
      </aside>

      <section className="px-12 py-11">
        <h2 className="mb-6 text-3xl">All notes</h2>

        <ul className="grid grid-cols-3 items-start gap-5">
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              className="relative min-h-32 bg-white px-6 py-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
            >
              <NoteCard title={note.title} body={note.body} />

              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                className="absolute top-4 right-5 cursor-pointer text-[26px] leading-none text-[#949494] hover:text-[#c18585]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {/* STEP 7: Show empty message */}
        {filteredNotes.length === 0 && (
          <p className="text-lg text-[#949494]">No notes found</p>
        )}
      </section>
    </div>
  )
}

export default Notes
