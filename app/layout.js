import '@/public/assets/css/all.min.css';
import '@/public/assets/bootstrap/css/bootstrap.min.css';
import '@/public/assets/css/owl.carousel.css';
import '@/public/assets/css/magnific-popup.css';
import '@/public/assets/css/animate.css';
import '@/public/assets/css/meanmenu.min.css';
import '@/public/assets/css/main.css';
import '@/public/assets/css/responsive.css';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}