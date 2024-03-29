import { useCart } from "@/hooks/useCart"
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceNumber: number;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { addCart, checkIfAlreadyInCart } = useCart()
  const isProductAlreadyInCart = checkIfAlreadyInCart(product.id)

  function handleBuyProduct() {
    if (checkIfAlreadyInCart(product.id)) return

    addCart(product)
  }
  
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState<boolean>(false)
  
  /*
  async function handleBuyProduct() {
    try {

      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
      
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout.')
    }
  }
  */
  
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isProductAlreadyInCart} onClick={handleBuyProduct}>
            {isProductAlreadyInCart
              ? 'Produto no carrinho'
              : 'Colocar na sacola'
            }
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {id: 'prod_NYDZMk2jPduI6a'} }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format((price.unit_amount ?? 0) / 100),
        priceNumber: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}