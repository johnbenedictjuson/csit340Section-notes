import { useState, useEffect } from 'react'

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])