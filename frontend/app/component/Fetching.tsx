import React from 'react'

function Fetching() {
  return (
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse p-4">
          <div className="rounded-2xl bg-gray-800/50 h-40" />
        </div>
      ))}
    </div>

  )
}

export default Fetching
