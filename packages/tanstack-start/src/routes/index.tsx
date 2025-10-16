import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

  const handleClick = () => {
    setLoading((loading) => !loading)
  }

  const { t, i18n } = useTranslation()

  return (
    <div className="max-w-screen-md mx-auto p-4 flex flex-col gap-4">
      <div>{t('hello')}</div>
      <div className="flex gap-2">
        <Button loading={loading} onClick={() => void i18n.changeLanguage('zh_CN')}>
          Chinese
        </Button>
        <Button variant="destructive" loading={loading} onClick={() => void i18n.changeLanguage('en')}>
          English
        </Button>
        <Button variant="secondary" loading={loading} onClick={() => void i18n.changeLanguage('cimode')}>
          cimode
        </Button>
        <Button variant="outline" loading={loading} onClick={handleClick}>
          outline
        </Button>
        <Button variant="ghost" loading={loading} onClick={handleClick}>
          ghost
        </Button>
        <Button variant="link" loading={loading} onClick={handleClick}>
          link
        </Button>
      </div>
    </div>
  )
}
