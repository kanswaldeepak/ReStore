import { useState } from "react";
import agent from "../../app/api/agent";
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    //if (loading({true,''})) <LoadingComponent message="Loading Basket..." />

    function addBasketItemAsync(productId: number, name: string) {
        agent.Basket
            .addItem(productId, 1)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function removeBasketItemAsync(productId: number, quantity: number, name: string) {
        agent.Basket
            .removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }
    if (!basket) return <Typography variant='h3'>Your Basket is Empty</Typography>

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((basket) => (
                            <TableRow
                                key={basket.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img style={{ height: 50, marginRight: 20 }} src={basket.pictureUrl} alt={basket.name} />
                                        <span>{basket.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">₹{(basket.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'rem' + basket.productId}
                                        onClick={() => removeBasketItemAsync(
                                            basket.productId, 1, 'rem' + basket.productId
                                        )}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>
                                    {basket.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + basket.productId}
                                        onClick={() => addBasketItemAsync(
                                            basket.productId, 'add' + basket.productId
                                        )}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">₹{((basket.price / 100) * basket.quantity).toFixed(2)}</TableCell>

                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'rem' + basket.productId}
                                        onClick={() => removeBasketItemAsync(
                                            basket.productId, basket.quantity, 'rem' + basket.productId
                                        )}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button component={Link} to='/checkout'
                    variant="contained" size="large" fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}