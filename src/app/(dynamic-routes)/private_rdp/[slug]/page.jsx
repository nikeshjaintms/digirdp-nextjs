"use client";

import React, { Fragment, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonial from "@/pages/slider/testimonial";
import BlogSlider from "@/pages/slider/BlogSlider";
import WhyUs from "@/pages/slider/WhyUs";
import axios from "axios";
import Location from "@/pages/sales-page/Location";
import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import {
  convertCurrency,
  getClientLocation,
} from "../../../../utils/currencyUtils";
import currencies from "../../../../currency.json";
const assets = "/assets";

const PrivateRDP = () => {
  const [rdplocation, setRDPLocation] = useState([]);
  const [rdplocationplans, setRDPLocationplans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Copy");
  const [sliders, setSliders] = useState([]);
  const [currency, setCurrency] = useState(null);
  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

  const params = useParams();
  const url_text = params.slug;
  console.log(url_text);

  useEffect(() => {
    const fetchslider = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://admin.digirdp.chaipost.co.in/api/slider`
        );
        console.log("Slider API Response:", response.data[0]);
        setSliders(response.data);
      } catch (error) {
        console.error("Error fetching cloud vps plan data:", error);
        //   setCloudVpsPlan(null);
        //   setCloudVps(null);
      } finally {
        setLoading(false);
      }
    };

    fetchslider();
    // console.log("cloudvpsplan",cloudvpsplans);
    // console.log("cloudvps",cloudvps);
  }, []);
  const handleCopyCoupon = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setButtonText("Copied!");
      setTimeout(() => setButtonText("Copy"), 3000);
    } catch (error) {
      console.error("Failed to copy the coupon code:", error);
    }
  };
  console.log(url_text);

  useEffect(() => {
    const rdplocation_plan = async () => {
      setLoading(true);
      try {
        const userCountryCode = await getClientLocation(ipinfoToken);
        const foundCurrency = currencies.find(
          (c) => c.isoAlpha2 === userCountryCode
        );
        if (foundCurrency) {
          setCurrency(foundCurrency.currency);
          const response = await axios.get(
            `https://admin.digirdp.chaipost.co.in/api/rdplocation_plan/${url_text}`
          );
          console.log("rdplocation API Response:", response.data[0]);
          console.log("rdplocation plan API Response:", response.data[1]);
          const plans = response.data[1];
          const convertedPlans = await Promise.all(
            plans.map(async (plan) => {
              const convertedOfferPrice = await convertCurrency(
                plan.offer_price,
                "USD",
                foundCurrency.currency.code
              );
              const convertedPrice = await convertCurrency(
                plan.price,
                "USD",
                foundCurrency.currency.code
              );
              const annuallyPrice = await convertCurrency(
                plan.price_annually,
                "USD",
                foundCurrency.currency.code
              );
              return {
                ...plan,
                offer_price: convertedOfferPrice.toFixed(0),
                price: convertedPrice.toFixed(0),
                price_annually: annuallyPrice.toFixed(0),
              };
            })
          );
          setRDPLocation(response.data[0]);
          setRDPLocationplans(convertedPlans);
        }
      } catch (error) {
        console.error("Error fetching rdplocation plan data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (url_text) {
      rdplocation_plan();
    }
  }, [url_text, ipinfoToken]);

  const [btnTexts, setBtnTexts] = useState({});
  // const [couponCode, setCouponCode] = useState(rdplocation?.couponCode || "STEALDEAL20");

  // Update couponCode whenever cloudvps.couponCode changes, ensuring cloudvps is defined
  // useEffect(() => {
  //     setCouponCode(rdplocation?.couponCode || "STEALDEAL20");
  // }, [rdplocation?.couponCode]);

  // Handle copying of coupon code
  const handleCopy = async (promocode, index) => {
    try {
      await navigator.clipboard.writeText(promocode); // Copy the coupon code
      setBtnTexts((prev) => ({ ...prev, [index]: "COPIED!" }));

      setTimeout(() => {
        setBtnTexts((prev) => ({ ...prev, [index]: "Copy Code" }));
      }, 3000);
    } catch (error) {
      console.error("Failed to copy the code", error);
    }
  };

  useEffect(() => {
    // Update the document title
    document.title = rdplocation.name;

    // Function to update or create a meta tag
    const updateOrCreateMetaTag = (name, content) => {
      // Find the existing meta tag
      let metaTag = document.querySelector(`meta[name="${name}"]`);

      if (metaTag) {
        // If the meta tag exists, update its content
        metaTag.setAttribute("content", content);
      } else {
        // If the meta tag doesn't exist, create a new one
        metaTag = document.createElement("meta");
        metaTag.name = name;
        metaTag.content = content;
        document.head.appendChild(metaTag);
      }

      // Return the meta tag for cleanup
      return metaTag;
    };

    // Update or create the description meta tag
    const metaDescription = updateOrCreateMetaTag(
      "description",
      rdplocation.description
    );
    console.log({ metaDescription });

    // Update or create the keywords meta tag
    const metaKeywords = updateOrCreateMetaTag("keywords", rdplocation.keyword);

    // Cleanup function to remove the meta tags when the component unmounts
    return () => {
      if (metaDescription) {
        document.head.removeChild(metaDescription);
      }
      if (metaKeywords) {
        document.head.removeChild(metaKeywords);
      }
    };
  }, [rdplocation]);

  return (
    <Fragment>
      <Head>
        {/* Google Analytics Script */}

        {/* Meta description or keywords */}
        <meta name="keywords" content={rdplocation.keyword} />
        <title>{rdplocation.name}</title>
        <meta name="description" content={rdplocation.description} />
      </Head>
      <Header />
      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">{rdplocation.name}</h3>
                  <p className="description b1">{rdplocation.description}</p>
                  <ul className="page-list">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/private_rdp">Private RDP</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">
                      {rdplocation.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            {sliders.filter((slider) => slider.page_id === 4).length > 0 && (
              <div className="rainbow-blog-area">
                <div className="container-fluid">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Our Offers</span>
                      </h4>
                    </div>
                  </div>
                  <div className="burger-slider">
                    <div className="slider-wrapper row">
                      {sliders
                        .filter((slider) => slider.page_id === 4)
                        .map((slider) => (
                          <div
                            className="slide col-lg-3 col-md-6 col-sm-12"
                            key={slider.id}
                          >
                            <div className="img-container">
                              <img
                                src={`${slider.slider_image}`}
                                alt=""
                                className="burger-image"
                              />
                              <div className="burger-info">
                                <div className="burger-title" title="">
                                  {slider.slider_details}
                                </div>
                                <div
                                  className="burger-description"
                                  offer_code=""
                                >
                                  {slider.slider_heading}
                                </div>
                                <button
                                  className="add-to-cart"
                                  onClick={handleCopyCoupon("#SAVE20")}
                                >
                                  {buttonText}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <!-- Pricing Part --> */}
            <div className="wrapper rainbow-section-gap">
              <div className="container">
                <div className="row mb-4">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Pricing</span>
                      </h4>
                      <h2 className="title w-600 mb--20">Our product</h2>
                      <p className="description b1">
                        Priced to fit your specific needs
                      </p>
                    </div>

                    <nav className="aiwave-tab">
                      <div
                        className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link active"
                          id="nav-month-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-month"
                          type="button"
                          role="tab"
                          aria-controls="nav-month"
                          aria-selected="false"
                        >
                          Monthly
                        </button>
                        <button
                          className="nav-link with-badge "
                          id="nav-year-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-year"
                          type="button"
                          role="tab"
                          aria-controls="nav-year"
                          aria-selected="true"
                        >
                          Yearly
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="row row--15 mt-5">
                  <div
                    className="tab-content p-0 bg-transparent border-0 border bg-light"
                    id="nav-tabContent"
                  >
                    <div
                      className="tab-pane fade active show"
                      id="nav-month"
                      role="tabpanel"
                      aria-labelledby="nav-month-tab"
                    >
                      <div
                        className="tab-content p-0 bg-transparent border-0 border bg-light"
                        id="nav-tabContent"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div className="row row--15 mt_dec--40">
                            {rdplocationplans.map((rdplocationplan, index) => (
                              <div
                                key={index}
                                className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                              >
                                <div className="rainbow-pricing style-aiwave ">
                                  <div className="pricing-table-inner">
                                    <div className="pricing-top">
                                      <div className="pricing-header">
                                        <h4 className="title color-var-one">
                                          {rdplocationplan.name}
                                        </h4>
                                        <div className="pricing">
                                          <span className="price-text">
                                            {currency?.symbol || "$"}{" "}
                                            {rdplocationplan.offer_price}{" "}
                                          </span>
                                          <span className="text d-flex">
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {rdplocationplan.price}
                                            </span>
                                            /Per Month
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pricing-footer">
                                        <Link
                                          className="btn-default"
                                          href={rdplocationplan.plan_url}
                                        >
                                          Order Now
                                        </Link>
                                      </div>
                                      {rdplocationplan.promocode ? (
                                        <div className="coupon-card">
                                          <div className="coupon-row">
                                            {/* Display the coupon code dynamically */}
                                            <span id="cpnCode">
                                              {rdplocationplan.promocode}
                                            </span>

                                            {/* The Copy button */}
                                            <span
                                              id="cpnBtn"
                                              onClick={() =>
                                                handleCopy(
                                                  rdplocationplan.promocode,
                                                  index
                                                )
                                              }
                                            >
                                              {btnTexts[index] || "Copy Code"}
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <div className="pricing-body">
                                        <div className="features-section has-show-more">
                                          <h6>Features</h6>
                                          <ul className="list-style--1 has-show-more-inner-content">
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.users} User
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.processor}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.cpu} CPU
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.traffic}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.os}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.ram} RAM
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              Bandwidth{" "}
                                              {rdplocationplan.bandwidth}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              IP Address {rdplocationplan.ip}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.drives}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.uptime} uptime
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.description}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.free}
                                            </li>
                                          </ul>
                                          <div className="rbt-show-more-btn">
                                            Show More
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade "
                      id="nav-year"
                      role="tabpanel"
                      aria-labelledby="nav-year-tab"
                    >
                      <div
                        className="tab-content p-0 bg-transparent border-0 border bg-light"
                        id="nav-tabContent"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="nav-home1"
                          role="tabpanel"
                          aria-labelledby="nav-home1-tab"
                        >
                          {/* <h4 className="title w-600 mb--40 text-center">Explore to our smart Cloud VPS plans</h4> */}
                          <div className="row row--15 mt_dec--40">
                            {rdplocationplans.map((rdplocationplan, index) => (
                              <div
                                key={index}
                                className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                              >
                                <div className="rainbow-pricing style-aiwave ">
                                  <div className="pricing-table-inner">
                                    <div className="pricing-top">
                                      <div className="pricing-header">
                                        <h4 className="title color-var-one">
                                          {rdplocationplan.name}
                                        </h4>
                                        <div className="pricing">
                                          <span className="price-text">
                                            {currency?.symbol || "$"}{" "}
                                            {rdplocationplan.price_annually}{" "}
                                          </span>
                                          <span className="text d-flex">
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {rdplocationplan.price * 12}
                                            </span>
                                            /Per Year
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pricing-footer">
                                        <Link
                                          className="btn-default"
                                          href={rdplocationplan.plan_url}
                                        >
                                          Order Now
                                        </Link>
                                      </div>
                                      {rdplocationplan.promocode_annually ? (
                                        <div className="coupon-card">
                                          <div className="coupon-row">
                                            {/* Display the coupon code dynamically */}
                                            <span id="cpnCode">
                                              {
                                                rdplocationplan.promocode_annually
                                              }
                                            </span>

                                            {/* The Copy button */}
                                            <span
                                              id="cpnBtn"
                                              onClick={() =>
                                                handleCopy(
                                                  rdplocationplan.promocode_annually,
                                                  index
                                                )
                                              }
                                            >
                                              {btnTexts[index] || "Copy Code"}
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <div className="pricing-body">
                                        <div className="features-section has-show-more">
                                          <h6>Features</h6>
                                          <ul className="list-style--1 has-show-more-inner-content">
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.users} User
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.processor}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.cpu} CPU
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.traffic}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.os}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdplocationplan.ram} RAM
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              Bandwidth{" "}
                                              {rdplocationplan.bandwidth}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              IP Address {rdplocationplan.ip}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.drives}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.uptime} uptime
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.description}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdplocationplan.free}
                                            </li>
                                          </ul>
                                          <div className="rbt-show-more-btn">
                                            Show More
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Start blog Area  --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center pb--60 sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="700"
                    data-sal-delay="100"
                  >
                    <h4 className="subtitle">
                      <span className="theme-gradient">
                        We always try to maintain quality
                      </span>
                    </h4>
                    <h2 className="title mb--0"> Why Choose Us</h2>
                    <h5>
                      Pricing , focusing on speed, security, and guaranteed
                      uptime.
                    </h5>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                      <WhyUs />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End blog Area  --> */}

            {/* <!-- Start CTA Style-one Area  --> */}
            <div className="rainbow-rn-cta mt-5">
              <div className="container">
                <div className="row row--0 align-items-center content-wrapper">
                  <div className="col-lg-8">
                    <div className="inner">
                      <div className="content text-left">
                        <h4
                          className="title sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="200"
                        >
                          Become a Reseller Today{" "}
                        </h4>
                        <p
                          className="sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="300"
                        >
                          Partner with us and transform the way you do business.
                          As a reseller, you’ll gain access to top-tier
                          products, tailored support, and a platform to maximize
                          your success.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="right-content">
                      <div
                        className="call-to-btn text-start text-lg-end sal-animate"
                        data-sal="slide-up"
                        data-sal-duration="400"
                        data-sal-delay="400"
                      >
                        <div className="team-image">
                          <img
                            src={`${assets}/images/cta-img/team-01.png`}
                            alt="Group"
                          />
                        </div>
                        <Link className="btn-default" href="/reseller-program">
                          Grow with DigiRDP{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-shape">
                    <img
                      src={`${assets}/images/cta-img/bg-shape-01.png`}
                      alt="BG Shape"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* testimonial */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-left sal-animate"
                      data-sal="slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Testimonials</span>
                      </h4>
                      <h2 className="title mb--60">
                        The opinions of the community
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Testimonial />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Testimonial Area  --> */}

            {/* <!-- Start blog Area  --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="section-title text-center sal-animate"
                      data-sal="slide-up"
                      data-sal-duration="400"
                      data-sal-delay="150"
                    >
                      <h4 className="subtitle">
                        <span className="theme-gradient">Blogs</span>
                      </h4>
                      <h2 className="title mb--60">Explore Our Insights</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows">
                      <BlogSlider />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End blog Area  --> */}
          </div>
        </div>
        {/* <!-- End Pricing Style-2  --> */}
      </div>
      {/* <!-- Start Pricing Area  --> */}

      <Location />
      <Footer />
    </Fragment>
  );
};

export default PrivateRDP;
