import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import image1 from '../assets/camisetas/1.png'
import image2 from '../assets/camisetas/2.png'
import image3 from '../assets/camisetas/3.png'
import image4 from '../assets/camisetas/4.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={image1} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={image2} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      {/* <Product>
        <Image src={image3} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={image4} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product> */}
    </HomeContainer>
  )
}
