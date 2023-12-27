const getFilteredInventoryApi = async (filterData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/get_filtered_inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        return { success: true, data };
      } else {
        return { success: false, error: data ? data.error : 'Invalid Details' };
      }
    } catch (error) {
      console.error('Error during inventory fetch:', error);
      return { success: false, error: 'Server error' };
    }
  };
  
  export default getFilteredInventoryApi;
  