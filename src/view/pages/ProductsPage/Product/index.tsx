import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// components
import { IProduct } from "..";

interface IProductProps {
  product: IProduct
  cart: IProduct[]
  setCart:  (cart: IProduct[]) => void
}

const QuantityWrapper = styled.div.attrs({className:'QuantityWrapper'})`
    margin: auto;
    height: 40px;
    width: 40%;
`

const Product = ({ product, cart, setCart }: IProductProps) => {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        product.quantity = quantity
        if (quantity === 0) {
            let newCart = cart.filter(products => products.id !== product.id)
            setCart(newCart)
        }
    }, [quantity])

    return (
        <Card sx={{ height: '600px', width: '80%', margin: 'auto' }}>
            <CardHeader
                sx={{
                    height: '100px'
                }}
                title={product.title}
            />
            <CardMedia
                sx={{
                    height: '200px',
                    width: '80%',
                    margin: 'auto'
                }}
                component="img"
                image={product.image}
                alt={product.title}
            />
            <CardContent sx={{
                margin: 'auto'
            }}>
                <Typography sx={{
                    height: '100%',
                    margin: 'auto'
                }} variant="body2" color="text.secondary">
                    {product.description.substring(0, 200)}
                </Typography>
            </CardContent>
            <CardActions>
                <RenderCardActions quantity={quantity} setQuantity={setQuantity} product={product} cart={cart} setCart={setCart} />
            </CardActions>
        </Card>
    )
}

interface IRenderCardActionsProps {
    quantity: number
    setQuantity: (arg: any) => void
    product: IProduct
    cart: IProduct[]
    setCart: (cart: IProduct[]) => void
}

const RenderCardActions = ({ quantity, setQuantity, product, cart, setCart }: IRenderCardActionsProps) => {

    const incrementQuantityByOne = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantityByOne = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const addToCart = () => {
        setQuantity(quantity + 1);
        setCart([...cart, product])
    }

    if (quantity === 0) {
        return (
            <Button sx={{ width: '80%', margin: 'auto' }} variant="contained" onClick={addToCart}>Add to cart</Button>
        )
    } else {
        return (
            <QuantityWrapper>
                <Button size="small" sx={{
                    height: '100%',
                    minWidth: '30%',
                    width: '30%',
                    borderRadius: '0px',
                    boxShadow: 'none'
                }} 
                className="quantity-increment" 
                variant="contained" 
                onClick={incrementQuantityByOne}>+</Button>
                <TextField size="small" sx={{
                    height: '100%',
                    minWidth: '40%',
                    width: '40%',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                }} 
                value={quantity} />
                <Button size="small" sx={{
                    height: '100%',
                    minWidth: '30%',
                    width: '30%',
                    borderRadius: '0px',
                    boxShadow: 'none'
                }} 
                className="quantity-decrement" 
                variant="contained" 
                onClick={decrementQuantityByOne}>-</Button>
            </QuantityWrapper>
        )
    }
}

export default Product;
