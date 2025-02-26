// app/blog/[slug]/page.js
import React from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import BlogSlider from "../../../../pages/slider/BlogSlider";
import Testimonial from "../../../../pages/slider/testimonial";
import Promo from "../../../../pages/slider/Promo";
import Location from "../../../../pages/sales-page/Location";
import Head from "next/head";

const assets = '/assets';

// Fetch blog data on the server
async function getBlogData(slug) {
  try {
    // If you want to use Static Generation (SSG) instead of SSR, you can replace cache: 'no-store' with next: { revalidate: 3600 } to revalidate the data every hour.
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${slug}`, {
      // cache: 'no-store', // Ensure fresh data on every request (SSR)
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const data = await response.json();
    return data[0]; // Return the first blog object
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

// Generate SEO metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params; // Access the dynamic route parameter
  const blog = await getBlogData(slug); // Fetch blog data

  if (!blog) {
    return {
      title: "Blog Not Found - DigiRDP",
      description: "The blog you are looking for does not exist.",
    };
  }

  return {
    title: `${blog.title} | DigiRDP - Secure & Fast RDP and Cloud VPS Solutions` || "DigiRDP - Blog",
    description: blog.meta_descriptions || "Read our latest blog posts on DigiRDP.",
    keywords: blog.meta_keywords || "RDP, VPS, Cloud",
    openGraph: {
      title: blog.meta_title,
      description: blog.meta_descriptions,
      images: [
        {
          url: blog.feature_image || `${assets}/images/added/big-one.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}


// BlogDetails Page Component
export default async function BlogDetails({ params }) {
  const { slug } = await params; // Access the dynamic route parameter
  const blog = await getBlogData(slug); // Fetch blog data on the server

  if (!blog) {
    return <div>Blog not found.</div>; // Handle case where blog data is not available
  }

  return (
    <>
      <Header />
      {/* <!-- Start Pricing Area  --> */}
      <div className="main-content">
        {/* <!-- Start Breadcarumb area  --> */}
        <div className="breadcrumb-area breadcarumb-style-1 pt--180 pb--100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title h3">{blog.title} <br /> Here’s How</h1>
                  <ul className="page-list my-4">
                    <li className="rainbow-breadcrumb-item"><a href="/">Home</a></li>
                    <li className="rainbow-breadcrumb-item"><a href="/blog">Blog</a></li>
                    <li className="rainbow-breadcrumb-item active">Blog Details</li>
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

            <Promo />

            {/* <!-- Start Blog Area  --> */}
            <div className="rainbow-blog-section bg-color-1 ">
              <div className="container container-new">
                <div className="row row--30">
                  <div className="col-lg-8">
                    <div className="rainbow-blog-details-area">
                      <div className="post-page-banner">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="content text-center">
                                <div className="thumbnail"><img className="w-100 radius" src={`${blog.feature_image}` ? `${blog.feature_image}` : `${assets}/images/added/big-one.png`} alt="Blog Images" /></div>
                                <ul className="rainbow-meta-list">
                                  <li>
                                    <i className="feather-user"></i>
                                    <a href="/"> {blog.user_name}</a>
                                  </li>
                                  <li>
                                    <i className="feather-calendar"></i>
                                    Nov-12-24
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="blog-details-content pt--40">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="content">
                                <h2 className="title">{blog.title} Here’s How</h2>
                                <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                <h5 className="title">Author Description</h5>
                                <div dangerouslySetInnerHTML={{ __html: blog.author_description }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mt_md--40 mt_sm--40">
                    <aside className="rainbow-sidebar">
                      <div className="rbt-single-widget widget_search mt--40">
                        <div className="inner">
                          <form className="blog-search" action="#"><input type="text" placeholder="Search ..." />
                            <button className="search-button">
                              <i className="feather-search"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="rbt-single-widget widget_recent_entries mt--40">
                        <h3 className="title">Post</h3>
                        <div className="inner">
                          <ul>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-1.jpg`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/how-to-login-to-windows">How to Login to Windows RDP: A Comprehensive Guide for All Operating Systems</a>
                                </div>
                              </div>

                            </li>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-2.png`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/">
                                    Using Amazon MTurk with RDP: Boost Your Productivity with DigiRDP's USA Plans</a>
                                </div>
                              </div>

                            </li>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-3.png`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/">How to Add Windows Templates to Virtualizor</a>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-4.png`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/">Fixing 'Storage Permission Denied' Error in Virtualizor VPS: Adjusting User and Group Settings</a>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-5.png`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/">How to Install Ubuntu 22.04 Using IPMI on a Server</a>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="list-blog-sm">
                                <div className="img">
                                  <img src={`${assets}/images/added/bd-6.png`} alt="Blog" />
                                </div>
                                <div className="content">
                                  <a className="d-block" href="/">Want to Host Multiple Website on One Server? Here’s How</a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Start Features Area --> */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center sal-animate" data-sal-duration="400" data-sal-delay="150">
                      <h4 className="subtitle">
                        <span className="theme-gradient"></span>
                      </h4>
                      <h2 className="title w-600 mb--20">Our Hosting Solutions </h2>
                      <p>Explore our tailored solutions with Windows RDP, Cloud VPS, and Dedicated servers to find <br /> the perfect fit for your application deployment needs. <br /> Get the performance, reliability, and ease you deserve with our expertly crafted plans </p>
                    </div>
                  </div>
                  <div className="col-lg-12 mt--60">
                    <div className="advance-tab-button advance-tab-button-1 right-top">
                      <ul className="nav nav-tabs tab-button-list">

                        <li className="col-lg-3 nav-item" role="presentation">
                          <a href="/rdp-plan" className="nav-link tab-button ">
                            <div className="tab">
                              <h2 className="title">240 + </h2>
                              <p className="description sal-animate">Windows RDP Plans</p>
                            </div>
                          </a>
                        </li>

                        <li className="col-lg-3 nav-item" role="presentation">
                          <a href="/cloud-vps" className="nav-link tab-button">
                            <div className="tab">
                              <h2 className="title">110 +</h2>
                              <p className="description sal-animate">Cloud VPS Plans</p>
                            </div>
                          </a>
                        </li>

                        <li className="col-lg-3 nav-item" role="presentation">
                          <a href="/dedicated-server" className="nav-link tab-button">
                            <div className="tab">
                              <h2 className="title">59 +</h2>
                              <p className="description sal-animate">Dedicated Server Plans</p>
                            </div>
                          </a>
                        </li>
                        <li className="col-lg-3 nav-item" role="presentation">
                          <a href="/private_rdp" className="nav-link tab-button">
                            <div className="tab">
                              <h2 className="title">114 +</h2>
                              <p className="description sal-animate">Private RDP Plans</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="view-more-button text-center mt--35 sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="400">
                                      <a className="btn-default color-blacked" href="/contact">View Plans <i className="fa-sharp fa-light fa-arrow-right ml--5"></i></a>
                                  </div> */}
                </div>
              </div>
            </div>

            {/* <!-- Start CTA Style-one Area  --> */}
            <div className="rainbow-rn-cta mt-5">
              <div className="container">
                <div className="row row--0 align-items-center content-wrapper">
                  <div className="col-lg-8">
                    <div className="inner">
                      <div className="content text-left">
                        <h4 className="title sal-animate" data-sal="slide-up" data-sal-duration="400"
                          data-sal-delay="200">Become a Reseller Today  </h4>
                        <p className="sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="300">Partner with us and transform the way you do business. As a reseller, you’ll gain access to top-tier products, tailored support, and a platform to maximize your success. </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="right-content">
                      <div className="call-to-btn text-start text-lg-end sal-animate" data-sal="slide-up"
                        data-sal-duration="400" data-sal-delay="400">
                        <div className="team-image">
                          <img src={`${assets}/images/cta-img/team-01.png`} alt="Group" />
                        </div>
                        <a className="btn-default" href="/reseller-program">Grow with DigiRDP </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-shape">
                    <img src={`${assets}/images/cta-img/bg-shape-01.png`} alt="BG Shape" />
                  </div> */}
                </div>
              </div>
            </div>

            {/* testimonial */}
            <div className="rainbow-testimonial-area rainbow-section-gap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-left sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="150">
                      <h4 className="subtitle">
                        <span className="theme-gradient">Customer Reviews</span>
                      </h4>
                      <h2 className="title mb--60">What our users are saying</h2>
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
                    <div className="section-title text-center sal-animate" data-sal="slide-up" data-sal-duration="400"
                      data-sal-delay="150">
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
              <br />
              <div className="view-more-button text-center mt--45 sal-animate" data-sal="slide-up" data-sal-duration="400" data-sal-delay="400">
                <a className="btn-default color-blacked" href="/blog">View Blogs <i className="fa-sharp fa-light fa-arrow-right ml--5"></i></a>
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
    </>
  );
}