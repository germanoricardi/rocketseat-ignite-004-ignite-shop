import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()
  
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione amet facilis ullam unde temporibus, illum numquam, vitae rem ipsa veritatis sit quod consectetur! Voluptates culpa, libero nesciunt minus consequuntur corporis.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}