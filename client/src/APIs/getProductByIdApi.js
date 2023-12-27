
const getProductByIdAPI = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/get_product_by_id/${id}`);
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      console.error('Error getting product by ID:', error);
      return { success: false, error: 'Server error' };
    }
  };
  
  export default getProductByIdAPI;
  