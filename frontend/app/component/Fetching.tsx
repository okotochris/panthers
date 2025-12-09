import React from 'react'

function Fetching() {
  return (
    <div className="animate-pulse space-y-4 p-4 border rounded-xl bg-white shadow-sm">
  {/* Thumbnail */}
  <div className="w-full h-40 bg-gray-200 rounded-xl"></div>

  {/* Title */}
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>

  {/* Description lines */}
  <div className="space-y-2">
    <div className="h-3 bg-gray-200 rounded w-full"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
  </div>

  {/* Footer */}
  <div className="flex items-center gap-3 pt-2">
    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
</div>

  )
}

export default Fetching
