export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{"background" : "#F4F4F4", margin: 0, padding: 0, boxSizing:"border-box"}}>
        {children}
      </body>
    </html>
  )
}
