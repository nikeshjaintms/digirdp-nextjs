"use client";

import React, { Fragment, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonial from "@/pages/slider/testimonial";
import BlogSlider from "@/pages/slider/BlogSlider";
import WhyUs from "@/pages/slider/WhyUs";
import Link from "next/link";
import axios from "axios";
import Location from "@/pages/sales-page/Location";
import {
  convertCurrency,
  getClientLocation,
} from "../../../../utils/currencyUtils";
import currencies from "../../../../currency.json";

import { useParams } from "next/navigation";
import Head from "next/head";
const assets = "/assets";

const RDPPlan = () => {
  const [rdp, setRDP] = useState([]);
  const [rdpplans, setRDPplans] = useState([]);
  const [rdpfaqs, setRDPFAQS] = useState([]);
  const [buttonText, setButtonText] = useState("Copy");
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [currency, setCurrency] = useState(null);

  const params = useParams();
  const url_text = params.slug;
  console.log(url_text);

  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

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
    const fetchData = async () => {
      setLoading(true);
      try {
        const userCountryCode = await getClientLocation(ipinfoToken);
        const foundCurrency = currencies.find(
          (c) => c.isoAlpha2 === userCountryCode
        );

        if (foundCurrency) {
          setCurrency(foundCurrency.currency);

          const response = await axios.get(
            `https://admin.digirdp.chaipost.co.in/api/rdp_plans/${url_text}`
          );
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

          setRDP(response.data[0]);
          setRDPplans(convertedPlans);
          setRDPFAQS(response.data[2]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url_text) {
      fetchData();
    }
  }, [url_text, ipinfoToken]);

  const [btnTexts, setBtnTexts] = useState({});
  const [couponCode, setCouponCode] = useState(
    rdp?.couponCode || "STEALDEAL20"
  );

  // Update couponCode whenever cloudvps.couponCode changes, ensuring cloudvps is defined
  useEffect(() => {
    setCouponCode(rdp?.couponCode || "STEALDEAL20");
  }, [rdp?.couponCode]);

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
    document.title = rdp.name;

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
      rdp.description
    );
    console.log({ metaDescription });

    // Update or create the keywords meta tag
    const metaKeywords = updateOrCreateMetaTag("keywords", rdp.keywords);

    // Cleanup function to remove the meta tags when the component unmounts
    return () => {
      if (metaDescription) {
        document.head.removeChild(metaDescription);
      }
      if (metaKeywords) {
        document.head.removeChild(metaKeywords);
      }
    };
  }, [rdp]);

  return (
    <Fragment>
      <Head>
        {/* Google Analytics Script */}
        <title>{rdp.name}</title>
        <meta name="description" content={rdp.description} />
        {/* Meta description or keywords */}
        <meta name="keywords" content={rdp.keywords} />
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
                  <h3 className="title h3">{rdp.name}</h3>
                  <p className="description b1">{rdp.description}</p>
                  <ul className="page-list">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/rdp-plan">Windows RDP</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">
                      {rdp.name}
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
            {sliders.filter((slider) => slider.page_id === 1).length > 0 && (
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
                        .filter((slider) => slider.page_id === 1)
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
                    className="tab-content p-0 bg-transparent border-0 bg-light"
                    id="nav-tabContent"
                  >
                    <div
                      className="tab-pane fade active show"
                      id="nav-month"
                      role="tabpanel"
                      aria-labelledby="nav-month-tab"
                    >
                      <div
                        className="tab-content p-0 bg-transparent border-0 bg-light"
                        id="nav-tabContent"
                      >
                        <div
                          className="tab-pane fade active show"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div className="row row--15 mt_dec--40">
                            {rdpplans.map((rdpplan, index) => (
                              <div
                                key={index}
                                className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                              >
                                <div className="rainbow-pricing style-aiwave ">
                                  <div className="pricing-table-inner">
                                    <div className="pricing-top">
                                      <div className="pricing-header">
                                        <h4 className="title color-var-one">
                                          {rdpplan.name}
                                        </h4>
                                        <div className="pricing">
                                          <span className="price-text">
                                            {currency?.symbol || "$"}{" "}
                                            {rdpplan.offer_price}
                                          </span>
                                          <span className="text d-flex">
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {rdpplan.price}
                                            </span>
                                            /Per Month
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pricing-footer">
                                        <Link
                                          className="btn-default"
                                          href={rdpplan.plan_url}
                                        >
                                          Buy Now
                                        </Link>
                                      </div>
                                      {rdpplan.promocode ? (
                                        <div className="coupon-card">
                                          <div className="coupon-row">
                                            {/* Display the coupon code dynamically */}
                                            <span id="cpnCode">
                                              {rdpplan.promocode}
                                            </span>

                                            {/* The Copy button */}
                                            <span
                                              id="cpnBtn"
                                              onClick={() =>
                                                handleCopy(
                                                  rdpplan.promocode,
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
                                              {rdpplan.users} User
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.processor}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.cpu} CPU
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.traffic}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.os}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.ram} RAM
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              Bandwidth {rdpplan.bandwidth}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              IP Address {rdpplan.ip}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.drives}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.uptime} uptime
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.description}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.free}
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
                        className="tab-content p-0 bg-transparent border-0 bg-light"
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
                            {rdpplans.map((rdpplan, index) => (
                              <div
                                className="col-xl-4 col-lg-6 col-md-6 col-12 mt--30"
                                key={index}
                              >
                                <div className="rainbow-pricing style-aiwave ">
                                  <div className="pricing-table-inner">
                                    <div className="pricing-top">
                                      <div className="pricing-header">
                                        <h4 className="title color-var-one">
                                          {rdpplan.name}
                                        </h4>
                                        <div className="pricing">
                                          <span className="price-text">
                                            {currency?.symbol || "$"}{" "}
                                            {rdpplan.price_annually}
                                          </span>
                                          <span className="text d-flex">
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {rdpplan.price * 12}
                                            </span>
                                            /Per yr
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pricing-footer">
                                        <Link
                                          className="btn-default"
                                          href={rdpplan.plan_url}
                                        >
                                          Buy Now
                                        </Link>
                                      </div>
                                      {rdpplan.promocode_annually ? (
                                        <div className="coupon-card">
                                          <div className="coupon-row">
                                            {/* Display the coupon code dynamically */}
                                            <span id="cpnCode">
                                              {rdpplan.promocode_annually}
                                            </span>

                                            {/* The Copy button */}
                                            <span
                                              id="cpnBtn"
                                              onClick={() =>
                                                handleCopy(
                                                  rdpplan.promocode_annually,
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
                                              {rdpplan.users} User
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.processor}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.cpu} CPU
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.traffic}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.os}
                                            </li>
                                            <li>
                                              <i className="fa-regular fa-circle-check"></i>{" "}
                                              {rdpplan.ram} RAM
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              Bandwidth {rdpplan.bandwidth}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              IP Address {rdpplan.ip}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.drives}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.uptime} uptime
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.description}
                                            </li>
                                            <li>
                                              <i className="fa-sharp fa-regular fa-minus-circle"></i>{" "}
                                              {rdpplan.free}
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

            {/* <!-- Start Accordion Area --> */}
            {rdpfaqs && rdpfaqs.length > 0 ? (
              <div className="rainbow-accordion-area rainbow-section-gap">
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="col-lg-12 col-xl-4 col-12">
                      <div className="split-inner">
                        <h2
                          className="title sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="200"
                        >
                          Any question's? we have answers!
                        </h2>
                        <p
                          className="description sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="300"
                        >
                          Don’t find your answer here? just send us a message
                          for any query.
                        </p>
                        <div
                          className="contact-button mt--35 sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="400"
                          data-sal-delay="400"
                        >
                          <Link
                            className="rainbow-gradient-btn without-shape"
                            target="_blank"
                            href="/contact"
                          >
                            <span>Contact us</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-7 col-12">
                      <div className="rainbow-accordion-style rainbow-accordion-02 accordion">
                        <div className="accordion" id="accordionExampleb">
                          {rdpfaqs.map((rdpfaq, index) => (
                            <div key={index} className="accordion-item card">
                              <h2
                                className="accordion-header card-header"
                                id={`heading-${rdpfaq.id}`}
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${rdpfaq.id}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse-${rdpfaq.id}`}
                                >
                                  {rdpfaq.question}
                                </button>
                              </h2>
                              <div
                                id={`collapse-${rdpfaq.id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading-${rdpfaq.id}`}
                                data-bs-parent="#accordionExampleb"
                              >
                                <div className="accordion-body card-body">
                                  {rdpfaq.answer}
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* <div className="accordion-item card">
                                                    <h2 className="accordion-header card-header" id="headingSix">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                            What are the benefits of using Canada Admin RDP?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExampleb">
                                                        <div className="accordion-body card-body">
                                                            Some of the key benefits include: <br /> • High-speed connectivity and low latency for users in North America. <br /> • Enhanced security features to protect your data and operations. <br /> • Full administrative access to install software, manage settings, and configure the server as per your requirements. <br /> • 24/7 customer support to assist with any technical issues. <br /> • Scalable resources to meet your growing needs.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item card">
                                                    <h2 className="accordion-header card-header" id="headingSeven">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">Who can benefit from Canada Admin RDP?</button>
                                                    </h2>
                                                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExampleb">
                                                        <div className="accordion-body card-body">Canada Admin RDP is beneficial for: <br /> • Businesses looking to manage their IT infrastructure remotely. <br /> • Freelancers and remote workers need a secure and powerful server. <br /> • Developers and IT professionals require a robust environment for testing and deployment. <br /> • Companies need a reliable server for hosting applications and websites.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item card">
                                                    <h2 className="accordion-header card-header" id="headingEight">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">How do I get started with Canada Admin RDP?</button>
                                                    </h2>
                                                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExampleb">
                                                        <div className="accordion-body card-body">Getting started is easy. Visit the DigiRDP website, select the Canada Admin RDP plan that best suits your needs, complete the purchase process, and you will receive your login credentials via email. Our support team is available to assist you with the setup if needed.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item card">
                                                    <h2 className="accordion-header card-header" id="headingNine">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">What security measures are in place for Canada Admin RDP?</button>
                                                    </h2>
                                                    <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExampleb">
                                                        <div className="accordion-body card-body">DigiRDP implements several security measures, including: <br /> • Strong encryption protocols to protect data transmission. <br /> • Regular security updates and patches. • Firewall protection to prevent unauthorized access. <br /> • DDoS protection to ensure server availability. <br /> • Regular backups to safeguard your data.</div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item card">
                                                    <h2 className="accordion-header card-header" id="headingTen">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">Can I upgrade or downgrade my Canada Admin RDP plan?</button>
                                                    </h2>
                                                    <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExampleb">
                                                        <div className="accordion-body card-body">Yes, DigiRDP offers flexible plans that can be easily upgraded or downgraded based on your requirements. You can contact our support team to assist with the process.</div>
                                                    </div>
                                                </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

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

export default RDPPlan;
