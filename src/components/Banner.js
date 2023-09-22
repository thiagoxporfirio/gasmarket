import React from "react";
import Image from "../assets/avatar.svg";
import Euimage from "../assets/euremovebg.png"
import { FaGithub, FaYoutube, FaDribbble, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link } from "react-scroll";

const Banner = () => {
  return (
    <section
      className="min-h-[85vh] lg:min-h-[78vh] flex items-center: "
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex felx-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          {/* txt */}
          <div className="flex-1 text-center font-secondary lg:text-left mt-8">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[55px] font-bold leading-[0.8] lg:text-[110px] "
            >
              THIAGO <span>PORFIRIO</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 text-[36px] lg:text-[60px] font-secondary 
              font-semibold uppercase leading-[1]"
            >
              <span className=" text-white mr-4">Eu sou um</span>
              <TypeAnimation
                sequence={[
                  "Desenvolvedor Front-end",
                  2000,
                  "UI/UX Designer",
                  2000,
                  "Streamer",
                  2000,
                ]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              className=" mb-8 max-w-lg mx-auto lg:mx-0"
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              Programador autodidata, futuro Engenheiro de Software. <br></br>
              Venho desenvolvendo projetos como Desenvolvedor Front-end e estou
              me especializando nesta área, com foco em tecnologias como
              JavaScript, ReactJS, NextJs, TypeScript e NodeJS nas horas vagas.
            </motion.p>
            <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
              className="flex max-w-max gap-x-6 items-center mb-12
            mx-auto lg:mx-0 "
            >
              <button className="btn btn-lg">
                <Link
                  to="contact"
                  activeClass="active"
                  smooth={true}
                  spy={true}
                >
                  Contato
                </Link>
              </button>
              <a href="#" className="text-gradient btn-link">
                Meu Portifolio
              </a>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex text-[2] gap-x-6 max-w-max mx-auto
                lg:mx-0"
            >
              <a href="https://github.com/thiagoxporfirio">
                <FaGithub />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
              <a href="https://www.linkedin.com/in/thiagoxporfirio/">
                <FaLinkedin />
              </a>
            </motion.div>
          </div>
          {/* image */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
           className="hidden lg:flex felx-1 max-w-[320px] lg:max-w-[482px] ">
            <img className="" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
