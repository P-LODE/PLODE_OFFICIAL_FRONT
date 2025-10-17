import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google'
import { MainProvider } from '@plode-front/core/app'
import '../../global.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-noto-sans',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Plode',
    template: '%s | Plode',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const metadata = {
    ko: {
      description: 'Plode',
      keywords: 'Plode',
    },
    en: {
      description: 'Plode',
      keywords: 'Plode',
    },
  }

  return (
    <html
      lang="ko"
      className="light"
      data-be-installed="true"
      style={{ width: '100%' }}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Basic SEO meta tags */}
        <meta name="description" content={metadata.ko.description} />
        <meta name="keywords" content={metadata.ko.keywords} />

        {/* Open Graph */}
        <meta property="og:title" content="Plode" />

        {/* PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Other SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Plode" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="Plode" />
        <link rel="canonical" href="https://www.plode.kr" />
      </head>
      <body
        className={`${notoSans.className} ${notoSansKR.className} antialiased`}
        data-liner-extension-version="7.16.5"
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  )
}
