"use client";
import React, { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/pages/sales-page/Location";
import { useRouter } from "next/navigation";
import Head from "next/head";
import useStaticSEO from "../../../hooks/useStaticSEO";

const assets = "/assets";

// Array of data center locations
const dataCenters = [
  { id: 1, image: "la.jpg", name: "Los Angeles", country: "United States" },
  { id: 2, image: "ny.jpg", name: "New York", country: "United States" },
  { id: 3, image: "Dallas.jpg", name: "Dallas", country: "United States" },
  {
    id: 4,
    image: "miami.jpg",
    name: "Miami, Florida",
    country: "United States",
  },
  { id: 5, image: "uk.jpg", name: "UK DC01", country: "United Kingdom" },
  { id: 6, image: "wheel.jpg", name: "UK DC02", country: "United Kingdom" },
  { id: 7, image: "sky.jpg", name: "UK DC03", country: "United Kingdom" },
  { id: 8, image: "dc04.jpg", name: "UK DC04", country: "United Kingdom" },
  {
    id: 9,
    image: "nl.jpg",
    name: "The Netherlands",
    country: "The Netherlands",
  },
  { id: 10, image: "Germany.jpg", name: "Germany", country: "Germany" },
  { id: 11, image: "sg.jpg", name: "Singapore", country: "Singapore" },
  { id: 12, image: "mumbai.jpg", name: "India Mumbai DC01", country: "India" },
  { id: 13, image: "Hyderabad.jpg", name: "India HYD DC02", country: "India" },
  { id: 14, image: "canada.jpg", name: "Canada Montreal", country: "Canada" },
  { id: 15, image: "fin.jpg", name: "Finland", country: "Finland" },
];

const DataCenter = () => {
  const router = useRouter();
  // Use the custom hook to set static SEO metadata
  useStaticSEO({
    title: "Our Global Data Center Locations",
    description:
      "Explore our data center locations and find the perfect fit for your business today!",
  });

  const handleClick = (path) => {
    router.push(path);
  };
  return (
    <Fragment>
      <Head>
        <title>Our Global Data Center Locations</title>
        <meta
          name="description"
          content=" Explore our data center locations and find the perfect fit
                    for your business today!"
        />
      </Head>
      <Header />
      <div className="main-content">
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h3 className="title h3">Our Global Data Center Locations</h3>
                  <p className="description b1">
                    Explore our data center locations and find the perfect fit
                    for your business today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container-fluid">
            <div className="rainbow-testimonial-area">
              <div className="container">
                <div className="testimonial-wrapper ">
                  <div className="has-show-more-inner-content">
                    <div className="row row--15">
                      {dataCenters.map((dataCenter, index) => (
                        <div
                          key={dataCenter.id || index}
                          className="cursor-pointer col-lg-4 col-md-6 col-12 mt--30 sal-animate"
                          data-sal="slide-up"
                          data-sal-duration="700"
                        >
                          <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                            <div
                              onClick={() =>
                                handleClick("/dedicated-datacenter")
                              }
                            >
                              <div className="inner-new-box">
                                <div className="content">
                                  <div className="bottom-content">
                                    <img
                                      src={`${assets}/images/added/${dataCenter.image}`}
                                      alt={dataCenter.name}
                                    />
                                  </div>
                                  <h5 className="pt-5">{dataCenter.name}</h5>
                                  <p className="m-0">{dataCenter.country}</p>
                                  <br />
                                  <span
                                    className="btn-new"
                                    onClick={() =>
                                      handleClick("/dedicated-datacenter")
                                    }
                                  >
                                    <span>
                                      View Datacenter{" "}
                                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                    </span>
                                  </span>
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
      <Location />
      <Footer />
    </Fragment>
  );
};

export default DataCenter;
