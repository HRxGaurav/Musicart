import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Inventory.module.css";
import searchIcon from "../assets/icons/searchIcon.svg";
import girdIconWhite from "../assets/icons/girdIconWhite.svg";
import gridIconBlack from "../assets/icons/gridIconBlack.svg";
import listIconBlack from "../assets/icons/listIconBlack.svg";
import listIconWhite from "../assets/icons/listIconWhite.png";
import addToCart from "../assets/icons/addToCart.svg";
import LogContext from '../Utilities/LogContext.js'
import getFilteredInventoryApi from '../APIs/getFilteredInventoryAPI.js';
import addToCartAPI from "../APIs/addToCartAPI.js";
import toast from 'react-hot-toast';
import saleBannerMobile from '../assets/images/saleBannerMobile.png'
import Loader from './Modals/Loader.js'


const Products = ({ gridView, response }) => {
    const [isUserLoggedin] = useContext(LogContext);
    const navigate = useNavigate();

    const handleAddToCart = async (event, productId) => {
        event.stopPropagation();

        try {
            const response = await addToCartAPI(productId);

            if (response.success) {
                toast.success("Added to cart successfully");
            } else if(response.limitExist){
                toast.error("Maximum limit reached for this product");
            }
             else {
                console.error('Failed to add to cart:', response.error);
            }
        } catch (error) {
            console.error('Error during addToCart:', error);
        }
    };


    const handleProductClick = (id) => {
        navigate(`/product/${id}`)
    }


    return (
        <>
            <div className={style.productMainDiv}>
                <div style={{ display: gridView ? '' : 'flex', width: gridView ? '' : '100%' }} >
                    <div className={gridView ? style.productMain : style.productMainList} onClick={() => (handleProductClick(response._id))}>
                        <img src={response.images[0]} alt="img" className={gridView ? style.productImage : style.productImageList} />

                        {isUserLoggedin && <img src={addToCart} alt="addToCart" onClick={(event) => (handleAddToCart(event, response._id))} className={gridView ? style.addToCart : style.addToCartList} />}


                    </div>
                    <div className={gridView ? style.productInfo : style.productInfoList} >
                        <div className={gridView ? style.productName : style.productNameList}>{response.name}</div>
                        <div className={gridView ? style.productPrice : style.productPriceList}>Price - ₹ {response.price}</div>
                        <div className={gridView ? style.productDetail : style.productDetailList}>{response.colour} | {response.type}</div>
                        <div className={gridView ? style.productDisc : style.productDiscList}>{response.fullname}</div>
                        <div className={gridView ? style.productDetailsButton : style.productDetailsButtonList} onClick={() => (handleProductClick(response._id))}>Details</div>
                    </div>
                </div>
            </div>

            {/* -----------------------------Mobile View------------------------------- */}

            <div className={style.productMainMobileDiv}>
                <div>
                    <div className={style.productMainMobile} onClick={() => (handleProductClick(response._id))}>
                        <img src={response.images[0]} alt="img" className={style.productImageMobile} />

                        {isUserLoggedin && <img src={addToCart} alt="addToCart" onClick={(event) => (handleAddToCart(event, response._id))} className={style.addToCartMobile} />}


                    </div>
                    <div className={style.productInfoMobile} onClick={() => (handleProductClick(response._id))}>
                        <div className={style.productNameMobileMobile }>{response.name}</div>
                        <div className={style.productPriceMobile }>Price - ₹ {response.price}</div>
                        <div className={style.productDetailMobile}>{response.colour} | {response.type}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Nodata = () => {
    return (
      <>
        <div className={style.noDataDiv}>
          Filters Not matched !
        </div>
      </>
    )
  }


const Inventory = () => {
    const [gridView, setGridView] = useState(true)
    const [filterData, setFilterData] = useState({ fullname: '', priceRange: '', type: '', colour: '', company: '', sortBy: '' });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchFilteredInventory = async () => {
        const response = await getFilteredInventoryApi(filterData);

        if (response.success) {
            setIsLoading(false)
            setFilteredInventory(response.data.inventoryItems);
        } else {
            setIsLoading(false)
            console.error('Error fetching filtered inventory:', response.error);
        }
    };


    useEffect(() => {

        fetchFilteredInventory();
    }, [filterData]);



    const handleSearch = () => {
        // You can perform any additional logic here before updating filterData
        setFilterData({ ...filterData, fullname: searchQuery });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData((prevData) => ({ ...prevData, [name]: value }));
        console.log(filterData);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }


    return (
        <>
            <div className={style.main}>
                <div className={style.searchMain}>
                    <input className={style.searchBox} placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                    <img src={searchIcon} alt="searchIcon" className={style.searchIcon} />
                </div>


                <div className={style.filterDiv}>
                    <div className={style.filterDivInside}>
                        <img src={gridView ? gridIconBlack : girdIconWhite} alt="searchIcon" className={style.grid} onClick={() => (setGridView(true))} />
                        <img src={gridView ? listIconWhite : listIconBlack} alt="searchIcon" className={style.list} onClick={() => (setGridView(false))} />



                        <select className={style.headphoneType} defaultValue="" required name="type" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Headphone type</option>
                            <option value="featured">Featured</option>
                            <option value="In-ear headphone">In-ear headphone</option>
                            <option value="On-ear headphone">On-ear headphone</option>
                            <option value="Over-ear headphone">Over-ear headphone</option>
                        </select>

                        <select className={style.company} defaultValue="" required name="company" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Company</option>
                            <option value="featured">Featured</option>
                            <option value="JBL">JBL</option>
                            <option value="Sony">Sony</option>
                            <option value="Boat">Boat</option>
                            <option value="Zebronics">Zebronics</option>
                            <option value="Marshall">Marshall</option>
                            <option value="Ptron">Ptron</option>
                        </select>

                        <select className={style.colour} defaultValue="" required name="colour" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Colour</option>
                            <option value="featured">Featured</option>
                            <option value="Blue">Blue</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Brown">Brown</option>
                        </select>


                        <select className={style.price} defaultValue="" required name="priceRange" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Price</option>
                            <option value="featured">Featured</option>
                            <option value='0-1000'>₹0 - ₹1,000</option>
                            <option value="1000-10000">₹1,000 - ₹10,000</option>
                            <option value="10000-20000">₹10,000 - ₹20,000</option>

                        </select>
                    </div>

                    <div className={style.sortByDiv}><select className={style.sortBy} defaultValue="" required name="sortBy" onChange={(e) => handleChange(e)}>
                        <option value="" disabled hidden>Sort by : Featured</option>
                        <option value="featured" >Featured</option>
                        <option value="priceLowestFirst">Price : Lowest</option>
                        <option value="priceHighestFirst">Price : Highest</option>
                        <option value="nameAtoZ">Name : (A-Z)</option>
                        <option value="nameZtoA">Name : (Z-A)</option>
                    </select></div>



                </div>

            </div>


            {filteredInventory.length>0 && <div className={style.itemsMain}>


                {filteredInventory.map((data) => {
                    return (
                        <Products key={data._id} response={data} gridView={gridView} />
                    )
                })}


            </div>}


            {/* -----------------------------Mobile View----------------------------------------- */}
            <div className={style.mainMobile}>
                <div className={style.searchMainMobile}>

                    <input className={style.searchBoxMobile} placeholder="Search Musicart" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                    <img src={searchIcon} alt="searchIcon" className={style.searchIconMobile} />
                </div>

                <img src={saleBannerMobile} alt="saleBannerMobile" className={style.saleBannerMobile} />


                <div className={style.filterDivMobile}>
                    <div className={style.filterDivInsideMobile}>

                        <div className={style.sortByDivMobile}><select className={style.sortByMobile} defaultValue="" required name="sortBy" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Sort by</option>
                            <option value="featured" >Featured</option>
                            <option value="priceLowestFirst">Price : Lowest</option>
                            <option value="priceHighestFirst">Price : Highest</option>
                            <option value="nameAtoZ">Name : (A-Z)</option>
                            <option value="nameZtoA">Name : (Z-A)</option>
                        </select></div>


                        <select className={style.headphoneTypeMobile} defaultValue="" required name="type" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Headphone type</option>
                            <option value="featured">Featured</option>
                            <option value="In-ear headphone">In-ear headphone</option>
                            <option value="On-ear headphone">On-ear headphone</option>
                            <option value="Over-ear headphone">Over-ear headphone</option>
                        </select>

                        <select className={style.companyMobile} defaultValue="" required name="company" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Company</option>
                            <option value="featured">Featured</option>
                            <option value="JBL">JBL</option>
                            <option value="Sony">Sony</option>
                            <option value="Boat">Boat</option>
                            <option value="Zebronics">Zebronics</option>
                            <option value="Marshall">Marshall</option>
                            <option value="Ptron">Ptron</option>
                        </select>

                        <select className={style.colourMobile} defaultValue="" required name="colour" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Colour</option>
                            <option value="featured">Featured</option>
                            <option value="Blue">Blue</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Brown">Brown</option>
                        </select>


                        <select className={style.priceMobile} defaultValue="" required name="priceRange" onChange={(e) => handleChange(e)}>
                            <option value="" disabled hidden>Price</option>
                            <option value="featured">Featured</option>
                            <option value='0-1000'>₹0 - ₹1,000</option>
                            <option value="1000-10000">₹1,000 - ₹10,000</option>
                            <option value="10000-20000">₹10,000 - ₹20,000</option>

                        </select>
                    </div>


                </div>

                <div className={style.horizontalLine}></div>
            </div>


            {filteredInventory.length>0 && <div className={style.itemsMainMobile}>


                {filteredInventory.map((data) => {
                    return (
                        <Products key={data._id} response={data} gridView={true} />
                    )
                })}


            </div>}

            {filteredInventory.length<1 && !isLoading &&  <Nodata/>}
            {isLoading && <Loader/>}

        </>
    );
};

export default Inventory;
