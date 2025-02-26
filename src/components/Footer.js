'use client'
import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Link from 'next/link';
const assets = '/assets';

function Footer() {
    const [v_p_s, set_Vps] = useState([]);
    const [rdps, set_Rdps] = useState([]);
    const [rdp_location, set_Rdp_location] = useState([]);
    const [dedicated, set_Dedicated] = useState([]);
    const [config, set_config] = useState([]);
    const [logo, set_logo] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/logo`)
            .then((response) => {
                set_logo(response.data)
            })
            .catch((error) => {
                console.error("Error logo data:", error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/configurations`)
            .then((response) => {
                set_config(response.data)
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/windows_rdps`)
            .then((response) => {
                set_Rdps(response.data[1])
            })
            .catch((error) => {
                console.error("Error fetching RDP data:", error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cloud_vps`)
            .then((response) => {
                set_Vps(response.data)
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dedicated_server`)
            .then((response) => {
                set_Dedicated(response.data)
            })
            .catch((error) => {
                console.error("Error fetching Dedicated data:", error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/r_d_p_by_locations`)
            .then((response) => {
                set_Rdp_location(response.data)
            })
            .catch((error) => {
                console.error("Error fetching VPS data:", error);
            });
    }, [])


    useEffect(() => {
        // backToTopInit functionality
        const backToTopInit = () => {
            const scrollTop = $('.rainbow-back-top');

            // Show or hide the back-to-top button based on scroll position
            $(window).scroll(function () {
                const topPos = $(this).scrollTop();
                if (topPos > 150) {
                    $(scrollTop).css('opacity', '1');
                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });

            // Smooth scroll to the top when the button is clicked
            $(scrollTop).on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    300 // Adjust duration for smooth scrolling
                );
                return false;
            });
        };

        // Initialize back-to-top functionality
        backToTopInit();
    }, []); // Run only once on component mount

    useEffect(() => {
        const initProgressIndicator = () => {
            // Select the SVG path element
            const path = document.querySelector('.rbt-progress-parent path');
            const pathLength = path.getTotalLength();

            // Set up initial styles for the path
            path.style.transition = path.style.WebkitTransition = 'none';
            path.style.strokeDasharray = `${pathLength} ${pathLength}`;
            path.style.strokeDashoffset = pathLength;
            path.getBoundingClientRect(); // Trigger layout
            path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            // Function to update the stroke-dashoffset on scroll
            const updateProgress = () => {
                const scrollTop = $(window).scrollTop();
                const docHeight = $(document).height();
                const winHeight = $(window).height();
                const scrollPercent = scrollTop / (docHeight - winHeight);
                path.style.strokeDashoffset = pathLength * (1 - scrollPercent);
            };

            // Initial call to set up the progress
            updateProgress();
            $(window).on('scroll', updateProgress);

            // Toggle back-to-top button visibility on scroll
            $(window).on('scroll', () => {
                if ($(window).scrollTop() > 50) {
                    $('.rbt-progress-parent').addClass('rbt-backto-top-active');
                } else {
                    $('.rbt-progress-parent').removeClass('rbt-backto-top-active');
                }
            });

            // Scroll to top on button click
            $('.rbt-progress-parent').on('click', (event) => {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 550);
            });
        };

        // Initialize the progress indicator
        initProgressIndicator();
    }, []); // Empty dependency array ensures the effect runs only once



    return (
        <div>
            {/* <!-- Start Footer Area  --> */}
            <footer className="rainbow-footer footer-style-default footer-style-3 position-relative">
                <div className="footer-top">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="logo">
                                        <Link href="/">
                                            <img className="logo-light" src={`${logo.light_logo}`} alt="ChatBot Logo" />
                                            <img className="logo-dark" src={`${logo.logo_name}`} alt="ChatBot Logo" />
                                        </Link>
                                    </div>
                                    <p className="b1 desc-text">Your Ultimate Destination for Hosting Solutions</p>
                                    <div className="rainbow-footer-widget">
                                        <div className="widget-menu-bottom">
                                            <h4 className="title mb-0">Follow Us!</h4>
                                            <div className="inner mt-0">
                                                <ul className="footer-link link-hover d-flex">
                                                    <li className="li-icon"><Link href="https://www.instagram.com/digirdp/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></Link></li>
                                                    <li className="li-icon"><Link href="https://www.facebook.com/digirdpcom" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook" ></i></Link></li>
                                                    <li className="li-icon"><Link href="https://github.com/digirdpllc/" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></Link></li>
                                                    <li className="li-icon"><Link href="https://x.com/digirdp" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-bottom">
                                        <h4 className="title">Windows RDP</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {rdps
                                                    .filter((rdp) => rdp.show_in_header === 1)
                                                    .map((rdp, index) => (
                                                        <li key={index}><Link href={`/rdp-plan/${rdp.url_text}`}>{rdp.name}</Link></li>
                                                    ))}
                                                {/* <li><Link href="/">Canada Admin RD</Link></li>
                                                <li><Link href="/">AMD EPYC Storage RDP</Link></li>
                                                <li><Link href="/">Indian AMD EPYC RDP</Link></li>
                                                <li><Link href="/">Singapore Private RDP</Link></li>
                                                <li><Link href="/">Ryzen Private RDP</Link></li>
                                                <li><Link href="/">Buy Bluestacks RDP</Link></li>
                                                <li><Link href="/">Indian Admin RDP</Link></li>
                                                <li><Link href="/">USA Admin RD</Link></li>
                                                <li><Link href="/">Budget/Europe Admin RDP</Link></li>
                                                <li><Link href="/">Streaming RD</Link></li>
                                                <li><Link href="/">Encoding RDP</Link></li>
                                                <li><Link href="/">USA Shared RDP</Link></li>
                                                <li><Link href="/">India Residential RDP (Static)</Link></li>
                                                <li><Link href="/">UK Real Residential RDP</Link></li>
                                                <li><Link href="/">US Real Residential RDP</Link></li>
                                                <li><Link href="/">US Residential/Dating RDP (Static)</Link></li>
                                                <li><Link href="/">UK Residential RDP (Static)</Link></li> */}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Dedicated Server</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {dedicated
                                                    .filter((dedicate) => dedicate.show_in_header === 1)
                                                    .map((dedicate, index) => (
                                                        <li key={index}><Link href={`/dedicated-server/${dedicate.url_text}`}>{dedicate.name}</Link></li>
                                                    ))}
                                                {/* <li><Link href="/">Australia Dedicated Server</Link></li>
                                                <li><Link href="/">Storage Dedicated Server</Link></li>
                                                <li><Link href="/">Dallas Budget Servers</Link></li>
                                                <li><Link href="/">Instant Dedicated Server</Link></li>
                                                <li><Link href="/">Los Angeles Dedicated Server</Link></li>
                                                <li><Link href="/">Cheap Germany Dedicated Server</Link></li>
                                                <li><Link href="/">Cheap France Dedicated server</Link></li>
                                                <li><Link href="/">USA Dedicated Server</Link></li>
                                                <li><Link href="/">Indian Dedicated Server</Link></li> */}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Cloud VPS</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {v_p_s
                                                    .filter((vps) => vps.show_in_header === 1)
                                                    .map((vps, index) => (
                                                        <li key={index}><Link href={`/cloud-vps/${vps.url_text}`}>{vps.name}</Link></li>
                                                    ))}
                                                {/* <li><Link href="/">Netherlands Cloud VPS</Link></li>
                                                <li><Link href="/">Canada Cloud VPS</Link></li>
                                                <li><Link href="/">AMD EPYC Storage VPS</Link></li>
                                                <li><Link href="/">UK Cloud VPS</Link></li>
                                                <li><Link href="/">Indian AMD EPYC VPS Hosting</Link></li>
                                                <li><Link href="/">Miami Cloud VPS</Link></li>
                                                <li><Link href="/">US NVMe VPS</Link></li>
                                                <li><Link href="/">New York Cloud VPS</Link></li>
                                                <li><Link href="/">Dallas Cloud VPS</Link></li>
                                                <li><Link href="/">Indian Cloud VPS</Link></li>
                                                <li><Link href="/">Singapore Cloud VPS</Link></li>
                                                <li><Link href="/">SSD VPS Hosting</Link></li>
                                                <li><Link href="/">Linux VPS Hosting</Link></li> */}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                <div className="rainbow-footer-widget">
                                    <div className="widget-menu-top">
                                        <h4 className="title">Private RDP</h4>
                                        <div className="inner has-show-more">
                                            <ul className="footer-link link-hover list-style--1 has-show-more-inner-content">
                                                {rdp_location
                                                    .filter((rdp_loc) => rdp_loc.show_in_header === 1)
                                                    .map((rdp_loc, index) => (
                                                        <li key={index}><Link href={`/private_rdp/${rdp_loc.url_text}`}>{rdp_loc.name}</Link></li>

                                                    ))}
                                                {/* <li><Link href="/">Miami Private RDP</Link></li>
                                                <li><Link href="/">Amazon Mturk RDP</Link></li>
                                                <li><Link href="/">New York Ryzen RDP</Link></li>
                                                <li><Link href="/">Dallas Ryzen RDP</Link></li>
                                                <li><Link href="/">Singapore Ryzen RDP</Link></li>
                                                <li><Link href="/">Germany Ryzen RDP</Link></li>
                                                <li><Link href="/">Netherlands Ryzen RDP</Link></li>
                                                <li><Link href="/">UK Ryzen RDP</Link></li>
                                                <li><Link href="/">Cheap UK RDP</Link></li>
                                                <li><Link href="/">Netherlands RDP</Link></li>
                                                <li><Link href="/">Residential RDP</Link></li>
                                                <li><Link href="/">Dating RDP</Link></li>
                                                <li><Link href="/">Buy USA RDP</Link></li> */}
                                            </ul>
                                            <div className="rbt-show-more-btn">Show More</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- End Footer Area  -->
            <!-- Start Copy Right Area  --> */}
            <div className="copyright-area copyright-style-one">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="copyright-left">
                                <ul className="ft-menu link-hover">
                                    <li>
                                        <Link href="/legal">Legal</Link>
                                    </li>
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/career">Career</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" rel="noreferrer" href="https://manage.digirdp.com/index.php?m=abusemanagerpro">Report Abuse</Link>
                                    </li>
                                    <li className='d-xxl-none d-xl-block d-lg-block d-block'>
                                        <p className="copyright-text">Copyright © 2019-2024 <Link href="/" className="btn-read-more"><span> DigiRDP </span></Link></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 col-sm-12 col-12 d-xxl-block d-xl-none d-lg-none d-none">
                            <div className="copyright-right text-center text-lg-end">
                                <p className="copyright-text">Copyright © 2019-2024 <Link href="/" className="btn-read-more"><span>DigiRDP </span></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Copy Right Area  --> */}
            <div className="rbt-progress-parent rainbow-back-top" style={{ opacity: 0 }}>
                <svg className="rbt-back-circle svg-inner" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
        </div>
    )
}

export default Footer
