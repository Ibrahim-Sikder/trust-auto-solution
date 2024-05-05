/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Practice = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const handleShowModal = (course) => {
      setSelectedCourse(course);
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setSelectedCourse(null);
      setShowModal(false);
    };
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 840) {
          setIsMediumScreen(true);
        } else {
          setIsMediumScreen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, [isMediumScreen]);
    return (
        <div>
                <div className="min-h-screen max-w-[1500px] px-3 mx-auto lg:pt-12 xl:pt-20">
        <div className=" my-20 px-5 sm:px-0">
          <div className="">
            <div className="flex md:flex-row flex-col gap-10">
              {/* course details start left side*/}
              <div className="max-w-[1500px]  mx-auto w-full">
                <div className="mb-5">
                  <h1 className="text-3xl font-bold">
                    Introduction to Adobe Photoshop
                  </h1>
                  <p className="text-lg">
                    by <span className="font-semibold">Carles Marsal</span>,
                    Visual artist
                  </p>
                </div>
                <div className="bg-[#f2f2f2] p-5 space-y-3">
                  <div>
                    <ul className="flex flex-wrap gap-5 [&>li]:font-semibold [&>li]:px-3 [&>li]:py-px [&>li]:rounded-sm [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                      <li className="bg-[#f02d00] text-white  ">
                        Domestika Basics
                      </li>
                      <li className="bg rounded-sm bg-[#505050] text-white">
                        5 courses
                      </li>
                      <li className="bg-yellow-400">Best seller</li>
                      <li className="text-[#f02d00] bg-[#f02d00]/10">
                        <i className="fa-solid fa-volume-high"></i>Bangla,
                        English
                      </li>
                    </ul>
                    <div></div>
                  </div>
                  <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-2 text-xl">
                    <div>
                      <i className="fa-regular fa-thumbs-up"></i>
                      <span>100% positive reviews(9.8k)</span>
                    </div>
                    <div className="">
                      <i className="fa-regular fa-user"></i>
                      <span>304000k students</span>
                    </div>
                  </div>
                </div>
                {/* course details */}
                <div className="my-3">
                  <div>
                    <div className="space-x-3 text-2xl font-semibold hover:[&>button]:hover:underline hover:[&>button]:hover:decoration-[#f02d00] underline-offset-[17px]  hover:[&>button]:duration-4">
                      <button>Information</button>
                      <button>Content</button>
                      <button>Community</button>
                    </div>
                    <hr className="mt-[12px]" />
                    <div className="mt-5">
                      <div className="relative group cursor-pointer">
                        <img
                          className="group-hover:filter group-hover:brightness-90 group-hover:duration-300"
                          src="https://cdn.domestika.org/c_fill,f_auto,pg_1,w_auto,dpr_1,ar_16:9/c_fill,dpr_auto,f_auto,pg_1,t_base_params/v1563794713/course-covers/000/000/387/387-original.jpg"
                          alt=""
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 rounded-full bg-[#f2f2f2] group-hover:ring-[30px] group-hover:ring-[#f2f2f2]/50 duration-200">
                            <i className="fa-solid fa-play text-2xl flex justify-center h-full items-center"></i>
                          </div>
                        </div>
                      </div>
                      {!isMediumScreen && (
                        <div className=" flex justify-end">
                          <div className="flex gap-6 hover:[&>div]:hover:text-[#f02d00] hover:[&>div]:cursor-pointer hover:[&>div]:duration-300 [&>div]:flex [&>div]:items-center  my-3">
                            <div>
                              <i className="fa-solid fa-arrow-up-from-bracket"></i>
                              <span className="ml-3">Share</span>
                            </div>
                            <div>
                              <i className="fa-regular fa-plus"></i>
                              <span className="ml-3">Add to a list</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isMediumScreen && (
                        <div className="">
                          <div className="">
                            <h3 className="text-2xl font-semibold">
                              $19.99 usd
                            </h3>
                            <p className="my-2">
                              88% Disc.{" "}
                              <span className="line-through"> $59.99</span>
                            </p>
                            <button className=" rounded-md space-x-2 text-xl font-semibold bg-[#00b2bd] w-full text-white px-5 py-3">
                              <i className="fa-solid fa-cart-shopping"></i>
                              <span>Buy</span>
                            </button>
                            <span className="text-[#f02d00] text-xs">
                              This offer ends in 3 days
                            </span>
                          </div>
                        </div>
                      )}

                      {!isMediumScreen && (
                        <div>
                          <div className="flex justify-between items-center">
                            <div>
                              By{" "}
                              <span className="font-medium">Carles marsal</span>
                              <p>Visual artist</p>
                              <p>Barcelona,Spain</p>
                            </div>
                            <div></div>
                          </div>
                          <button className=" w-full border-4 border-[#00b2bd] text-[#00b2bd] px-4 py-2 rounded-lg mt-7">
                            Buy course as a gift
                          </button>
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            className="hover:text-[#f02d00] underline underline-offset-4 flex  justify-center mt-3"
                            to="#"
                          >
                            Redeem the course with a gift code
                          </Link>
                        </div>
                      )}
                      {!isMediumScreen && (
                        <div>
                          <div className="text-[#161616]/90">
                            <div className="text-xl space-x-3">
                              <i className="fa-regular fa-thumbs-up w-10 text-[#161616]/60"></i>
                              <span>100% positive reviews(9.8k)</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-regular fa-user w-10 text-[#161616]/60"></i>
                              <span>354614 students</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-person-chalkboard w-10 text-[#161616]/60"></i>
                              <span>50 lessons (6h 54m)</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-book-open-reader w-10 text-[#161616]/60"></i>
                              <span>5 courses</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-regular fa-file w-10"></i>
                              <span>62 downloads (46 files)</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-regular fa-face-smile w-10 text-[#161616]/60"></i>

                              <span>Online and at your own pace</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-mobile-screen w-10 text-[#161616]/60"></i>
                              <span>Available on the app</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-volume-high w-10 text-[#161616]/60"></i>
                              <span>Audio: English, Bangla</span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-signal w-10 text-[#161616]/60"></i>
                              <span>
                                Level:{" "}
                                <span className="text-[#f02d00]/70">
                                  Beginner
                                </span>
                              </span>
                            </div>
                            <div className="text-xl space-x-3">
                              <i className="fa-solid fa-person-walking-arrow-loop-left w-10"></i>
                              <span>Unlimited access forever</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {isMediumScreen && (
                        <div className=" flex justify-end">
                          <div className="flex gap-6 hover:[&>div]:hover:text-[#f02d00] hover:[&>div]:cursor-pointer hover:[&>div]:duration-300 [&>div]:flex [&>div]:items-center  my-3">
                            <div>
                              <i className="fa-solid fa-arrow-up-from-bracket"></i>
                              <span className="ml-3">Share</span>
                            </div>
                            <div>
                              <i className="fa-regular fa-plus"></i>
                              <span className="ml-3">Add to a list</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="my-8">
                    <h2 className="text-xl font-semibold my-10">
                      Learn Adobe Photoshop from scratch and master the best
                      software for treatment, retouching and creation of digital
                      images on the market
                    </h2>
                    <div className="bg-[#f2f2f2] p-5 md:p-7 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-xl my-5">
                          Domestika Basics · 5 courses included
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="bg-[#fff] rounded-lg">
                              <div className=""></div>
                              <div className="py-5 px-3">
                                <h3 className="text-xl font-semibold mb-3">
                                  Course 1 - First Contact
                                </h3>
                                <p className="text-sm font-medium mb-2">
                                  By <span>Karmen Loh</span>
                                </p>
                                <p className="text-sm">
                                  Learn to treat images in Adobe Photoshop:
                                  resolution, size and digital transformations
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* course description start */}
                    <div>
                      <div className="space-y-5">
                        <h3 className="font-semibold text-xl my-5">
                          Learn to master Adobe Photoshop, the most widely used
                          tool for image processing and digital retouching
                        </h3>
                        <p className="text-lg">
                          By taking these 5 courses, you'll learn to use Adobe
                          Photoshop even if you've never used the program
                          before. Through a series of practical lessons, you'll
                          learn everything you need to know to become a design
                          or digital publishing professional.
                        </p>
                        <p>
                          You'll start by getting to know Adobe Photoshop's
                          interface and its main tools. You'll learn to manage
                          and combine documents, work with layers and
                          selections. Plus, another thing that's essential for
                          this type of project: masks.
                        </p>
                        <p>
                          Then you'll dive into the world of photomontage and
                          learn image size and resolution fundamentals. Also,
                          you'll learn to use transformations so that you can
                          portray anything that you set your mind to.
                        </p>
                        <p>
                          Later, you'll discover the vast world of options that
                          Photoshop brushes offer.
                        </p>
                        <p>
                          You'll also learn how to use the retouching tools to
                          reconstruct, clean up and improve your photographs and
                          images with an impeccable and realistic finish.
                        </p>
                        <p>
                          Finally, Carles will explain how to properly apply
                          adjustment layers. Using these, you can do a detailed
                          light and shadow treatment and adjust the color to
                          your project's needs.
                        </p>
                      </div>
                      <div className="space-y-5">
                        <h3 className="font-semibold text-xl my-5">
                          Who is it for?
                        </h3>
                        <p className="text-lg">
                          These are introductory courses and no prior knowledge
                          of any kind is necessary. That said, it's aimed at
                          anyone interested in getting started with Adobe
                          Photoshop.
                        </p>
                      </div>
                      <div className="space-y-5">
                        <h3 className="font-semibold text-xl my-5">
                          Technical requirements
                        </h3>
                        <ul>
                          <li>
                            ⦁ Adobe Photoshop CC (not included in the price of
                            the course, but available on the Adobe website with
                            a license and 7-day trial period).
                          </li>
                          <li>
                            ⦁ Windows 7 operating system (or higher) or macOS El
                            Capitan (or higher).
                          </li>
                          <li>
                            ⦁ A graphic tablet is recommended, although it's not
                            essential.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr className="mt-16" />
                    {/* course description end */}

                    {/* course reviews start */}
                    <div className="my-16">
                      <div>
                        <h3 className="font-semibold text-3xl my-5">Reviews</h3>
                        <div className="flex justify-between max-w-[800px] shadow-xl shadow-teal-500/30 p-10 rounded-lg">
                          <div className="">
                            <div className="text-3xl font-semibold space-x-2">
                              <i className="fa-regular fa-user "></i>
                              <span className="">203948</span>
                            </div>
                            <p>Students</p>
                          </div>
                          <div>
                            <div className="text-3xl font-semibold space-x-2">
                              <i className="fa-regular fa-comment"></i>
                              <span>96890</span>
                            </div>
                            <p>Reviews</p>
                          </div>
                          <div className="text-[#00b2bd]">
                            <div className="text-3xl font-semibold space-x-2">
                              <i className="fa-regular fa-thumbs-up"></i>
                              <span>100%</span>
                            </div>
                            <p>Positive Rating</p>
                          </div>
                        </div>
                      </div>
                      {/* student reviews start */}
                      <div className="my-20">
                        <div>
                          {Array.from({ length: 5 }).map((review, index) => (
                            <div key={index}>
                              <div className="flex w-full gap-5">
                                <div className="min-w-[80px] flex justify-center  border-[#00b2bd]"></div>
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    John Doe
                                  </h3>
                                  <span>3 days ago</span>
                                  <p className="text-[#00b2bd]">5 stars</p>
                                  <p>
                                    Me siento muy feliz con lo que voy del
                                    curso, realmente uno interactúa con
                                    programas así todos los días frente al
                                    computador y no tiene ni idea de los
                                    nombres, funciones o alternativas, el
                                    detenido paso a paso alimenta muchísimo y
                                    hace destacar a un usuario de otro. Lo
                                    recomiendo totalmente incluso aunque ya
                                    hayas interactuado con programas de Adobe o
                                    parecidos, muchas veces uno se salta lo
                                    básico que termina siendo fundamental.
                                  </p>
                                </div>
                              </div>
                              <hr className="my-5 lg:my-10" />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* student reviews end */}
                    </div>
                    {/* course reviews end */}

                    {/* author details start */}
                    <div>
                      <div className="flex gap-5 [&>div]:space-y-3">
                        <div></div>
                        <div>
                          <h3 className="text-3xl font-semibold">
                            Carles Marsal
                          </h3>
                          <div>
                            <ul className="flex text-sm gap-3 [&>li>span]:rounded-lg [&>li>span]:px-2 [&>li>span]:py-1">
                              <li className="uppercase">
                                <span className="bg-[#00b2bd]  text-white">
                                  Teacher
                                </span>
                              </li>
                              <li className="uppercase">
                                <span className="bg-gradient-to-r from-[#ff4e10] via-[#ff1b17] to-[#f101e5]  text-white">
                                  Plus
                                </span>
                              </li>
                              <li className="">
                                <span className=" text-[#505050]">
                                  Visual Artist
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <p>
                          Carles Marsal is a graphic designer and visual artist.
                          As soon as he finished his degree in Audiovisual
                          Studies with a specialization in Graphic Design and
                          Retouching, he started working as a freelancer while
                          teaching classes. He currently works for a wide
                          variety of clients around the world; he also teaches
                          courses and gives conferences as an Adobe Influencer
                          sharing his Creative Retouching and Matte Painting
                          techniques.
                        </p>
                      </div>
                    </div>
                    {/* author details end */}
                    <hr className="my-20" />
                    {/* Content start */}
                    <div>
                      <div>
                        <h3 className="text-3xl font-semibold">
                          Course Content
                        </h3>
                        {Array.from({ length: 10 }).map((_, index) => (
                          <div key={index} className="">
                            <div className="my-5">
                              <h3 className="capitalize text-xl font-semibold my-5">
                                Course 1 - First course
                              </h3>
                              <div className="flex justify-between font-medium">
                                <div className="flex items-center gap-3 w-full">
                                  <button className="bg-[#e8e8e8] p-2 rounded-full text-sm">
                                    U1
                                  </button>
                                  <p>Welcome</p>
                                </div>
                                <div className="space-x-3 w-full">
                                  <i className="fa-solid fa-video"></i>
                                  <span>Welcome</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Content end */}
                  </div>
                </div>
                <hr className="my-20" />
                {/* course details end */}
                {/* About youth instructory start */}
                <div className="my-10">
                  <div className="space-y-5">
                    <h3 className="text-3xl font-semibold">
                      About Youth instructory
                    </h3>
                    <p>
                      Domestika Basics is a series of courses focused on
                      teaching the most commonly used software by creative
                      professionals worldwide.
                    </p>
                    <p>
                      The content has been meticulously curated and is intended
                      for both students going into a new creative field and more
                      experienced professionals who want to polish their skills.
                    </p>
                    <p>
                      Learn with the best Domestika teachers through practical
                      lessons, tons of resources, and a progressive difficulty
                      that'll allow you to see results from day one.
                    </p>
                    <p>
                      Domestika Basics will allow you to step up your
                      professional game and be prepared to score better
                      projects.
                    </p>
                  </div>
                  <div className="my-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index}>
                        <div className="flex gap-5">
                          <div className="flex items-center text-2xl font-medium gap-3 xl:w-3/5">
                            <i className="fa-regular fa-lightbulb"></i>
                            <h4>Without prior knowledge.</h4>
                          </div>
                          <div className="w-full">
                            <p>
                              Domestika Basics gives you everything you need to
                              get started in a new creative field and become an
                              expert in it.
                            </p>
                          </div>
                        </div>
                        <hr className="my-10" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* About youth instructory end */}
              </div>
              {/* course details end left side*/}
              {/* additional course details start rigth side */}
              <div className={` px-5 md:max-w-[350px] xl:max-w-[500px]`}>
                <div className="sticky top-0">
                  <div className="">
                    <div className="">
                      <h3 className="text-2xl font-semibold">$19.99 usd</h3>
                      <p className="my-2">
                        88% Disc. <span className="line-through"> $59.99</span>
                      </p>
                      <button className=" rounded-md space-x-2 text-xl font-semibold bg-[#00b2bd] w-full text-white px-5 py-3">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Buy</span>
                      </button>
                      <span className="text-[#f02d00] text-xs">
                        This offer ends in 3 days
                      </span>
                    </div>
                  </div>
                  {/* plus start */}
                  <div className="border-4 border-gray-600/10 rounded-md my-5 p-3">
                    <p className="relative rounded-lg overflow-hidden border-2 border-[#f02d00] w-56 text-center">
                      <span
                        className="block bg-gradient-to-r from-[#ff4e10] via-[#ff1b17] to-[#f101e5] text-white px-4 py-2 rounded-lg"
                        style={{
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        Youth Instructory Plus
                      </span>
                    </p>
                    <p className="my-3">
                      Get a Domestika Plus subscription for $9.99 USD/month.
                      Start this course now and watch 1000+ other courses for
                      free!
                    </p>
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      className=" hover:text-[#f02d00] duration-300"
                      to="#"
                    >
                      Learn more
                    </Link>
                    <button
                      className="mt-3 border-2 border-[#f02d00] block bg-gradient-to-r from-[#ff4e10] via-[#ff1b17] to-[#f101e5] text-white px-4 py-2 rounded-lg w-full"
                      style={{
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Subscribe now
                    </button>
                  </div>
                  {/* plus end */}

                  {/* course micro details */}
                  <div>
                    <div className="text-[#161616]/90">
                      <div className="text-xl space-x-3">
                        <i className="fa-regular fa-thumbs-up w-10 text-[#161616]/60"></i>
                        <span>100% positive reviews(9.8k)</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-regular fa-user w-10 text-[#161616]/60"></i>
                        <span>354614 students</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-person-chalkboard w-10 text-[#161616]/60"></i>
                        <span>50 lessons (6h 54m)</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-book-open-reader w-10 text-[#161616]/60"></i>
                        <span>5 courses</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-regular fa-file w-10"></i>
                        <span>62 downloads (46 files)</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-regular fa-face-smile w-10 text-[#161616]/60"></i>

                        <span>Online and at your own pace</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-mobile-screen w-10 text-[#161616]/60"></i>
                        <span>Available on the app</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-volume-high w-10 text-[#161616]/60"></i>
                        <span>Audio: English, Bangla</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-signal w-10 text-[#161616]/60"></i>
                        <span>
                          Level:{" "}
                          <span className="text-[#f02d00]/70">Beginner</span>
                        </span>
                      </div>
                      <div className="text-xl space-x-3">
                        <i className="fa-solid fa-person-walking-arrow-loop-left w-10"></i>
                        <span>Unlimited access forever</span>
                      </div>
                    </div>
                  </div>
                  {/* course micro details end */}
                  <hr className="my-10" />
                  {/* buy course as a gift start*/}
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        By <span className="font-medium">Carles marsal</span>
                        <p>Visual artist</p>
                        <p>Barcelona,Spain</p>
                      </div>
                      <div></div>
                    </div>
                    <button className=" w-full border-4 border-[#00b2bd] text-[#00b2bd] px-4 py-2 rounded-lg mt-7">
                      Buy course as a gift
                    </button>
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      className="hover:text-[#f02d00] underline underline-offset-4 flex  justify-center mt-3"
                      to="#"
                    >
                      Redeem the course with a gift code
                    </Link>
                  </div>
                  {/* buy course as a gift end */}
                  <hr className="my-10" />
                  <div>
                    <div>
                      <div>
                        <ul className="flex uppercase space-x-3 hover:[&>li]:text-[#f02d00] hover:[&>li]:duration-300 hover:[&>li]:cursor-pointer">
                          <li>category | </li>
                          <li>Design | </li>
                          <li>Photography & video </li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="uppercase font-semibold my-3 ">Areas</h6>
                        <ul className="flex space-x-3 [&>li]:px-3 [&>li]:py-px [&>li]:bg-gray-500/80 [&>li]:rounded-tl-lg [&>li]:rounded-br-lg  text-white">
                          <li>Graphic Design</li>
                          <li>Fine Arts</li>
                          <li>Photo Retouching</li>
                        </ul>
                        <p className="my-3 uppercase">
                          RECOMMENDED SOFTWARE FOR THIS COURSE
                        </p>
                        <div className="flex space-x-3">
                          <p>Adobe PhotoShop</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* additional course details end right side */}
            </div>
          </div>
          {/* Courses you might like start */}
          <div className="bg-[#f9f9f9] py-16 my-24">
            <div className="rounded-lg max-w-[1500px] mx-auto">
              <div>
                <div>
                  <h3 className="text-3xl font-semibold mb-10">
                    Courses you might like
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10"></div>
                </div>
              </div>
            </div>
            <div className="group text-center mt-20 bg-[#f02d00] hover:bg-red-700 duration-300 font-bold border border-[#f02d00] text-white px-5 py-3 w-[22rem] mx-auto rounded-lg cursor-pointer">
              <Link
                to="/courses"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <button className="relative">
                  See more Domestika Courses
                  <i className="fa-solid fa-arrow-right ml-3 transform translate-x-0 group-hover:translate-x-5 duration-300"></i>
                </button>
              </Link>
            </div>
          </div>
          {/* Courses you might like ends */}
        </div>
        <div></div>
      </div>
        </div>
    );
};

export default Practice;