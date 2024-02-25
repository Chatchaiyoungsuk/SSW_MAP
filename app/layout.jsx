import localFont from 'next/font/local'
import "./globals.css";
import Nextload from './components/NextLoad';
import PositionProvider from './Provider/PositionProvider';

const lineSeedSansTH = localFont({
  src: [
    {
      path: '../public/fonts/line-seed-sans-th/LINESeedSansTH_W_Rg.woff',
      weight: '400'
    },
    {
      path: '../public/fonts/line-seed-sans-th/LINESeedSansTH_W_Bd.woff',
      weight: '700'
    }
  ],
  variable: '--font-line-seed'
})

export const metadata = {
  title: "3D Map Suansri",
  description: "แผนที่โรงเรียนสวนศรีวิทยาแบบ 3มิติ ที่จะทำให้ชีวิตในโรงเรียนของคุณดีขึ้น",
};

export default function RootLayout({ children }) {
  return (
    <PositionContext>
      <html lang="en">
        <body className={`${lineSeedSansTH.variable} font-sans bg-zinc-950 text-white`}>
        <Nextload />
          {children}
        </body>
      </html>
    </PositionContext>
  );
}
