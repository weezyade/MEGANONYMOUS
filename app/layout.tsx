export default function RootLayout({
  children,
}: {
  children: React.NodeNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
