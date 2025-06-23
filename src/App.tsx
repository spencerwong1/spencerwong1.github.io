// src/App.tsx
import React, { useState } from 'react'
import Profile from './components/Profile'
import NavBar from './components/NavBar'
import Board from './components/Board'
import Instructions from './components/Instructions'
import './App.css'

export default function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  
  return (
    <>
      <NavBar />
      <Board />

      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
    </>
  )
}
