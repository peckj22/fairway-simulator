export const metadata = {
  title: 'Fairway — What-If Simulator',
  description: 'PGA Tour player stat simulator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#09100d' }}>
        {children}
      </body>
    </html>
  );
}
