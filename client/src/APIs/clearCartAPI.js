import Cookies from "js-cookie";


const clearCartAPI = async () => {
    try {
      // Make a request to your backend API endpoint to clear the cart
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/clear_cart`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Failed to clear cart' };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, error: 'Server error' };
    }
  };
  
  export default clearCartAPI;
  