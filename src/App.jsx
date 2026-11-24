import { useState, useEffect } from 'react'
import { SettingsContext } from './SettingsContext.js'
import Notes from './components/Notes.jsx'
import Info from './components/Info.jsx'

function App() {
  const [largeText, setLargeText] = useState(() => {
    const saved = localStorage.getItem('largeText')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('largeText', JSON.stringify(largeText))
  }, [largeText])

  return (
    <SettingsContext value={{ largeText, setLargeText }}>
      <div className="min-h-screen bg-[#f1efee] p-5 font-light text-[#111]">
        <div className="flex min-h-[calc(100vh-40px)] overflow-hidden rounded-xl border border-[#e3dedc] bg-[#f4f4f4]">
          <Notes />
          <Info name="John Benedict Juson" />
        </div>
      </div>
    </SettingsContext>
  )
}

export default App