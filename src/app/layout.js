import './globals.css'

export const metadata = {
  title: 'مجدي عاطف - المطور Full Stack',
  description: 'الموقع الشخصي لمجدي عاطف، مطور Full Stack',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}