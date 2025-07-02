// src/components/Instructions.tsx
import React from 'react'
import '../css/Instructions.css'

interface InstructionsProps {
  onClose(): void
}

export default function Instructions({ onClose }: InstructionsProps) {
  return (
    <div className="instructions-overlay">
      <div className="instructions-modal">
        <button
          className="instructions-close-btn"
          onClick={onClose}
          aria-label="Close instructions"
        >
          ×
        </button>

        <h2>How to Play</h2>
        <p>You’re playing as <strong>White</strong>—defeat me by capturing all my pieces!</p>
        <ul>
            <li>Drag and drop your pieces to make legal chess moves.</li>
            <li>Capture the black pieces to find out my projects and more about me</li>
            <li>Each capture fills your progress bar a bit more.</li>
        </ul>
      </div>
    </div>
  )
}
