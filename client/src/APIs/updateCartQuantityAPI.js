import Cookies from "js-cookie";

const updateCartQuantityAPI = async (productId, newQuantity) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/update_cart_quantity`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('token')}`
      },
      body: JSON.stringify({
        productId,
        newQuantity
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Cart quantity updated successfully:', data.user);
    } else {
      console.error('Failed to update cart quantity:', data.error);
    }
  } catch (error) {
    console.error('Error during updateCartQuantity:', error);
  }
};

export default updateCartQuantityAPI;
