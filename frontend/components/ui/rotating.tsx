import React from 'react'

function Rotating() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-24 h-24 rounded-full border-4 border-amber-100 border-t-transparent animate-spin"></div>
</div>

  )
}

export default Rotating
