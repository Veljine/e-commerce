import React, {createContext, useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'

export const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let  foundProduct
    let index

    const incQty = () => {
        setQty(qty + 1)
    }

    const decQty = () => {
        setQty( (prevQty) => {
            if(prevQty - 1 < 1) return 1

            return prevQty - 1
        })
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find( item => item._id === product._id)

        setTotalPrice( prev => prev + product.price * quantity)
        setTotalQuantities( prev => prev + quantity)

        if (checkProductInCart) {

            const updatedCart = cartItems.map( cart => {
                if (cart._id === product._id) return {
                    ...cart,
                    quantity: cart.quantity + quantity
                }
            })

            setCartItems(updatedCart)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        const newCartItem = cartItems.filter((item) => item._id !== id)

        if(value === 'inc') {
            setCartItems([...newCartItem, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice( prev => prev + foundProduct.price)
            setTotalQuantities( prev => prev + 1)
        } else if(value === 'dec') {

            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItem, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice( prev => prev - foundProduct.price)
                setTotalQuantities( prev => prev - 1)
            }
        }
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id)
        const newCartItem = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice( prev => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities( prev => prev - foundProduct.quantity)
        setCartItems(newCartItem)
    }

    return (
        <Context.Provider
          value={{
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setTotalPrice,
            setTotalQuantities
          }}
        >
          {children}
        </Context.Provider>
      )
    }