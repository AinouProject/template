import { createFileRoute } from '@tanstack/react-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const handleClick = useCallback(() => {
    setLoading((loading) => !loading)
  }, [])

  return (
    <div className="max-w-screen-md mx-auto p-4 flex gap-2">
      <Button loading={loading} onClick={handleClick}>
        Hello world
      </Button>
      <Button variant="destructive" loading={loading} onClick={handleClick}>
        Hello world
      </Button>
      <Button variant="secondary" loading={loading} onClick={handleClick}>
        Hello world
      </Button>
      <Button variant="outline" loading={loading} onClick={handleClick}>
        Hello world
      </Button>
      <Button variant="ghost" loading={loading} onClick={handleClick}>
        Hello world
      </Button>
      <Button variant="link" loading={loading} onClick={handleClick}>
        Hello world
      </Button>
    </div>
  )
}
