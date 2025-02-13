"use client";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";
import Location from "../../../pages/sales-page/Location";
import Head from "next/head";
const assets = "/assets";
import {
  convertCurrency,
  getClientLocation,
} from "../../../utils/currencyUtils";
import currencies from "../../../currency.json";
import useStaticSEO from "../../../hooks/useStaticSEO";

const DedicatedCenter = () => {
  const [currency, setCurrency] = useState(null);
  const [convertedDedicatedSeverPrice, setConvertedDedicatedSeverPrice] =
    useState(24.99);
  const [convertedColocationPrice, setConvertedColocationPrice] =
    useState(99.0);
  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCountryCode = await getClientLocation(ipinfoToken);
        const foundCurrency = currencies.find(
          (c) => c.isoAlpha2 === userCountryCode
        );

        if (foundCurrency) {
          setCurrency(foundCurrency.currency);

          // Convert prices
          const convertedDedicatedSever = await convertCurrency(
            24.99,
            "USD",
            foundCurrency.currency.code
          );
          const convertedColocation = await convertCurrency(
            99.0,
            "USD",
            foundCurrency.currency.code
          );

          setConvertedDedicatedSeverPrice(convertedDedicatedSever);
          setConvertedColocationPrice(convertedColocation);
        }
      } catch (error) {
        console.error("Error fetching location or converting currency:", error);
      }
    };

    fetchData();
  }, [ipinfoToken]);

  // Use the custom hook to set static SEO metadata
  useStaticSEO({
    title: "Secure Los Angeles Datacenter Services",
    description: `Our Los Angeles Datacenter delivers state-of-the-art
                      infrastructure designed for speed, security, and seamless
                      connectivity. Located in a strategic tech hub, this
                      facility ensures optimal performance for businesses,
                      developers, and individuals.High-Speed Connectivity:
                      Benefit from ultra-fast and low-latency networks.`,
  });
  return (
    <Fragment>
      <Header />

      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">
                    Secure Los Angeles Datacenter Services
                  </h3>
                  <p className="description b1">
                    Explore our data center locations and find the perfect fit
                    for your business today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            {/* <!-- Start Tab__Style--one Area  --> */}
            <div className="rainbow-service-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center pb--60">
                      {/* <h4 className="subtitle">
                                                <span className="theme-gradient">Los Angeles Datacenter</span>
                                            </h4> */}
                      <h2 className="title mb--0">Los Angeles Datacenter</h2>
                    </div>
                  </div>
                </div>

                <div className="row row--30 align-items-center">
                  <div className="col-lg-6">
                    <p>
                      Our Los Angeles Datacenter delivers state-of-the-art
                      infrastructure designed for speed, security, and seamless
                      connectivity. Located in a strategic tech hub, this
                      facility ensures optimal performance for businesses,
                      developers, and individuals.High-Speed Connectivity:
                      Benefit from ultra-fast and low-latency networks.
                    </p>
                    <h5>Services available at this location :</h5>
                    <div className="dedicated-box">
                      <img
                        src={`${assets}/images/added/d-one.svg`}
                        alt="Brand"
                      />
                      <p className="mb-0">
                        Dedicated Servers <br />
                        <span>
                          Starting at {currency?.symbol || "$"}{" "}
                          {convertedDedicatedSeverPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="dedicated-box">
                      <img
                        src={`${assets}/images/added/d-two.svg`}
                        alt="Brand"
                      />
                      <p className="mb-0">
                        Colocation <br />
                        <span>
                          1U rack space starting at {currency?.symbol || "$"}{" "}
                          {convertedColocationPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="dedicated-box">
                      <img
                        src={`${assets}/images/added/d-three.svg`}
                        alt="Brand"
                      />
                      <p className="mb-0">
                        Private Cabinet Colocation <br />
                        <span>Contact Us for pricing</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423284.6897532054!2d-118.41173249999999!3d34.020479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1734933390582!5m2!1sen!2sin"
                        width="400"
                        height="300"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="map"
                      ></iframe>
                    </div>
                    <div className="dedicated-box-new">
                      <div>
                        <p className="mb-0">
                          LA Test IP <br />
                          <span>103.214.111.228</span>
                        </p>
                      </div>
                      <div>
                        <Link className="btn-new" href="/dedicated-datacenter">
                          <span>
                            Test Network{" "}
                            <i className="fa-sharp fa-regular fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="dedicated-box-new">
                      <div>
                        <p className="mb-0">
                          In depth look at our datacenter
                          <br />
                          <span>LA Datasheet</span>
                        </p>
                      </div>
                      <div>
                        <Link className="btn-new" href="/dedicated-datacenter">
                          <span>
                            LA Datasheet{" "}
                            <i className="fa-sharp fa-regular fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default DedicatedCenter;
