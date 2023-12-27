import Cookies from "js-cookie";

const getCart = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            }
        });

        const data = await response.json();

        if (response.status === 200) {
            return { success: true, data };
        } else {
            console.error('Failed to add to cart:', data.error);
        }
    } catch (error) {
        console.error('Error during addToCart:', error);
    }
};

export default getCart;
