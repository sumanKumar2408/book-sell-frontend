import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css";
import { BASE_URL } from "../config";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel"

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      // const auth = JSON.parse(localStorage.getItem('auth'));
      // console.log("auth", auth);
      // const config = {
      //       headers: { Authorization: `Bearer ${auth? auth.user._id : ""}`}};
      const { data } = await axios.get(`${BASE_URL}/api/category/get-all-category`);
      console.log("data",data);
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/product/product-list/${page}`);
      console.log(data);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="carouselDiv" style={{ display: "block"}}>
          <Carousel>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 h-500"
                src="https://i.ibb.co/M6zScBb/202306201032.jpg"
                alt="Image One"
              />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 h-500"
                src="https://i.ibb.co/84ZJkh8/2023071497995.webp"
                alt="Image Two"
              />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 h-500"
                src="https://i.ibb.co/84ZJkh8/2023071497995.webp"
                alt="Image Two"
              />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100 h-500"
                src="https://i.ibb.co/84ZJkh8/2023071497995.webp"
                alt="Image Two"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      <div className="container-fluid row mt-3 home-page">
        <div className="col filters">
          {categories? <h4 className="text-center">Filter By Category</h4> : ""}
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger btn-reset"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 col-sm-12">
          <h1 className="text-center">All Books</h1>
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-start" >
            {products?.map((p) => (
              <div className="card" key={p._id} >
                <img
                  src={`${BASE_URL}/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <p className="card-text">Quantity <span style={{color:"black"}}>{p.quantity}</span></p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart", {
                          position: "top-center",
                          autoClose: 5000, // 3 seconds
                        });
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
