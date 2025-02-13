import React, { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/pages/sales-page/Location";
import Link from "next/link";
import Head from "next/head";
// import $ from 'jquery';
// import Testimonial from "../slider/testimonial";
// import BlogSlider from "../slider/BlogSlider";
// import WhyUs from "../slider/WhyUs";
// const assets = '/assets';
export const metadata = {
  title: "Partner with Us and Earn Recurring Revenue!",
  description: `Step into the world of endless earning potential with
                    DigiRDP’s Affiliate Program. By referring customers to our
                    premium RDP and VPS services, you don’t just earn once—you
                    earn every time your customer renews their subscription.
                    With the opportunity to build a steady income stream, you’ll
                    also gain access to exclusive marketing tools and dedicated
                    support to help you succeed.`,
};
const Affiliate = () => {
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
                    Partner with Us and Earn Recurring Revenue!{" "}
                  </h3>
                  <p className="description b1">
                    Share, Refer, and Earn Big with Us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Breadcarumb area  -->
                <!-- Start Pricing Style-2  --> */}
        <div className="rainbow-pricing-area rainbow-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2 className="title w-600 mb--20">
                    Turn Referrals into Recurring Rewards!{" "}
                  </h2>
                  <p>
                    Step into the world of endless earning potential with
                    DigiRDP’s Affiliate Program. By referring customers to our
                    premium RDP and VPS services, you don’t just earn once—you
                    earn every time your customer renews their subscription.
                    With the opportunity to build a steady income stream, you’ll
                    also gain access to exclusive marketing tools and dedicated
                    support to help you succeed.
                  </p>
                  <p>
                    Promote secure, high-performance cloud solutions to a global
                    audience and watch your commissions grow with every
                    successful referral. Don’t just recommend a service—create a
                    passive income journey that keeps paying. Join DigiRDP’s
                    Affiliate Program today!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Pricing Style-2  --> */}

        {/* <!-- Start Advanced Tab area --> */}
        <div className="rainbow-advance-tab-area aiwave-bg-gradient rainbow-section-gap-big">
          <div className="container">
            <div className="html-tabs" data-tabs="true">
              <div className="row row--30 align-items-center">
                <div className="col-lg-12">
                  <div className="section-title text-center">
                    <h2 className="title w-600 mb--20">
                      Sign Up, Share, and Start Earning!{" "}
                    </h2>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div>
                    <h4>Sign Up : </h4>
                    <p>
                      Register for free and become an official DigiRDP affiliate
                      in just a few clicks.{" "}
                    </p>
                    <h4>Promote :</h4>
                    <p>
                      Share your unique referral link on websites, blogs, or
                      social media to reach a wide audience.{" "}
                    </p>
                    <h4>Earn :</h4>
                    <p>
                      Get paid every time a customer you refer makes a
                      purchase—it's that simple!{" "}
                    </p>
                    <h5>Have questions or need help getting started?</h5>
                    <p>
                      We’re here for you! Contact us anytime at{" "}
                      <Link href="/contact">
                        https://digirdp.chaipost.co.in/contact,
                      </Link>{" "}
                      and we’ll guide you every step of the way.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Start Pricing Area  --> */}

      <Location />
      <Footer />
    </Fragment>
  );
};

export default Affiliate;
