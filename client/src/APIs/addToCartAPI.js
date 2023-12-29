import Cookies from "js-cookie";

const addToCartAPI = async (productId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/add_to_cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (response.status === 200) {
            return { success: true, data };
        }
        else if(response.status === 400) {
            return { success: false, data, limitExist:true };
        }
        else {
            console.error('Failed to add to cart:', data.error);
        }
    } catch (error) {
        console.error('Error during addToCart:', error);
    }
};

export default addToCartAPI;
