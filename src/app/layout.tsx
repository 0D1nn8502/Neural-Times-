import "./globals.css";
import {Lora} from 'next/font/google'; 

const lora = Lora ({
  subsets: ['latin'] 
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        <main> 
          
          <div className={lora.className}>  
            <div className="heading-container"> 
              <h1> Neural Times </h1>
            </div> 
          </div>

            <div className="story-container">
              {children} 
            </div>
          </main>
     </body> 

    </html>  
  );
}
