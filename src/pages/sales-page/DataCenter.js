import React, { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Location from "../sales-page/Location";
// import $ from 'jquery';
// import Testimonial from "../slider/testimonial";
// import BlogSlider from "../slider/BlogSlider";
// import WhyUs from "../slider/WhyUs";
const assets = '/assets';

const DataCenter = () => {



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
                                    <h3 className="title h3">Our Global Data Center Locations</h3>
                                    <p className="description b1">Explore our data center locations and find the perfect fit for your business today!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
                <div className="rainbow-pricing-area rainbow-section-gap">
                    <div className="container-fluid">

                        <div className="rainbow-testimonial-area">
                            <div className="container">
                                <div className="testimonial-wrapper ">
                                    <div className="has-show-more-inner-content">
                                        <div className="row row--15">
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/la.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Los Angeles</h5>
                                                                <p className="m-0">United States</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/ny.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">New York</h5>
                                                                <p className="m-0">United States</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/Dallas.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Dallas</h5>
                                                                <p className="m-0">United States</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>  
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/miami.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Miami, Florida</h5>
                                                                <p className="m-0">United States</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/uk.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">UK DC01</h5>
                                                                <p className="m-0">United Kingdom</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/wheel.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">UK DC02</h5>
                                                                <p className="m-0">United Kingdom</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/sky.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">UK DC03</h5>
                                                                <p className="m-0">United Kingdom</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/dc04.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">UK DC04</h5>
                                                                <p className="m-0">United Kingdom</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/nl.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">The Netherlands</h5>
                                                                <p className="m-0">The Netherlands</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/Germany.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Germany</h5>
                                                                <p className="m-0">Germany</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/sg.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Singapore</h5>
                                                                <p className="m-0">Singapore</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/mumbai.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">India Mumbai DC01</h5>
                                                                <p className="m-0">India</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/Hyderabad.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">India HYD DC02</h5>
                                                                <p className="m-0">India</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/canada.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Canada Montreal</h5>
                                                                <p className="m-0">Canada</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12 mt--30 sal-animate" data-sal="slide-up" data-sal-duration="700">
                                                <div className="rainbow-box-card active card-style-default testimonial-style-defalt has-bg-shaped">
                                                    <Link href="/dedicated-datacenter">
                                                        <div className="inner-new-box">
                                                            <div className="content">
                                                                <div className="bottom-content">
                                                                    <img src={`${assets}/images/added/fin.jpg`} alt="" />
                                                                </div>
                                                                <h5 className="pt-5">Finland</h5>
                                                                <p className="m-0">Finland</p>
                                                                <br />
                                                                <Link className="btn-new" href="/dedicated-datacenter">
                                                                        <span>View Datacenter <i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
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
}

export default DataCenter;