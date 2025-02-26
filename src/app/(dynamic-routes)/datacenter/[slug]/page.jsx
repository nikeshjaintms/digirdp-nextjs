"use client";
import React, { Fragment, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Location from "@/pages/sales-page/Location";
import Head from "next/head";
const assets = "/assets";
import {
  convertCurrency,
  getClientLocation,
} from "@/utils/currencyUtils";
import currencies from "@/currency.json";
import useStaticSEO from "@/hooks/useStaticSEO";
import { useParams } from "next/navigation";

async function getDatacenterDetails(url_text) {

  try {
    const res = await fetch(
      `https://admin.digirdp.chaipost.co.in/api/data-center/${url_text}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const DedicatedCenter = () => {
    const params = useParams();
  const url_text = params.slug;
  const [datacenter, setDatacenter] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [convertedPrices, setConvertedPrices] = useState({
    dedicatedServer: 24.99,
    colocation: 99.0,
  });
  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      if (!url_text) return;

      try {
        const details = await getDatacenterDetails(url_text);
        setDatacenter(details);

        const userCountryCode = await getClientLocation(ipinfoToken);
        const foundCurrency = currencies.find(
          (c) => c.isoAlpha2 === userCountryCode
        );

        if (foundCurrency) {
          setCurrency(foundCurrency.currency);

          const convertedDedicatedServer = await convertCurrency(
            details?.server_price || 24.99,
            "USD",
            foundCurrency.currency.code
          );
          const convertedColocation = await convertCurrency(
            details?.colocation_price || 99.0,
            "USD",
            foundCurrency.currency.code
          );

          setConvertedPrices({
            dedicatedServer: convertedDedicatedServer,
            colocation: convertedColocation,
          });
        }
      } catch (error) {
        console.error("Error fetching details or currency conversion:", error);
      }
    };

    fetchData();
  }, [url_text, ipinfoToken]);

  useStaticSEO({
    title: datacenter ? datacenter.city : "Secure Datacenter Services",
    description: datacenter
      ? datacenter.description
      : "Explore our state-of-the-art datacenters offering secure and high-speed connectivity.",
  });

  return (
    <Fragment>
      <Header />
      <div className="main-content">
         {/* <!-- Start Breadcarumb area  --> */}
         <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">
                    Secure {datacenter?.city} Datacenter Services
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
         {/* <!-- End Breadcarumb area  --> */}

        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center pb--60">
                      {/* <h4 className="subtitle">
                                                <span className="theme-gradient">Los Angeles Datacenter</span>
                                            </h4> */}
                      <h2 className="title mb--0">{datacenter?.city} Datacenter</h2>
                    </div>
                  </div>
                </div>
            <div className="row">
              <div className="col-lg-6">
                <p>{datacenter?.description || "Loading details..."}</p>
                <h5>Services available at this location:</h5>
                <div className="dedicated-box">
                  <img src={`${assets}/images/added/d-one.svg`} alt="Brand" />
                  <p>
                    Dedicated Servers <br />
                    <span>
                      Starting at {currency?.symbol || "$"} {Number(convertedPrices?.dedicatedServer || 0).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="dedicated-box">
                  <img src={`${assets}/images/added/d-two.svg`} alt="Brand" />
                  <p>
                    Colocation <br />
                    <span>
                      1U rack space starting at {currency?.symbol || "$"} {Number(convertedPrices?.colocation || 0).toFixed(2)}
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
              {datacenter?.maps ? (
                  <div dangerouslySetInnerHTML={{ __html: datacenter.maps }} />
                ) : (
                  <p>Loading map...</p>
                )}
                </div>
                
                <div className="dedicated-box-new">
                  <div>
                    <p>Test IP <br /> <span>{datacenter?.test_ip || "N/A"}</span></p>
                  </div>
                  <div>
                    <Link className="btn-new" href="/dedicated-datacenter">
                      <span>Test Network <i className="fa-arrow-right"></i></span>
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
      <Location />
      <Footer />
    </Fragment>
  );
};

export default DedicatedCenter;