import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import Img1 from '../assets/portfolio-img3.png'
import Img2 from '../assets/portfolio-img2.png'
import Img3 from '../assets/portfolio-img1.png'
import Img4 from '../assets/portfolio-img4.png'

const Work = () => {
    return (
        <section className='section' id='work'>
            <div className='container mx-auto'>
                <div className='flex flex-col lg:flex-row gap-x-10  '>
                    <motion.div
                        variants={fadeIn('right', 0.3)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.3 }}
                    className='flex-1 flex flex-col gap-y-20 mb-10 lg:mb-0'>
                        {/*Text */}
                        <div>
                            <h2 className='h2 leading-tight text-accent'>Meus trabalhos<br />
                                mais recentes.
                            </h2>
                            <p className='max-w-sm mb-16 '>
                                Nesta aba vc vera todos os meus trabalhos feitos como Desenvolvedor e Ui/Ux Designer.
                            </p>
                            <button className='btn btn-sm'><a href='https://github.com/thiagoxporfirio' id=''> Ver todos os projetos</a></button>
                        </div>
                        {/* image*/}
                        <div className='group relative overflow-hidden border-2 border-white/50 rounded-md'>
                            {/*Overlay */}
                            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 cursor-pointer'></div>
                            {/* Img */}
                            <img className='group-hover:scale-125 transition-all duration-500'
                                src={Img1}
                                alt='' />
                            {/*Pretitulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 '>
                                <span className='text-gradient'>UI/UX Designer</span>
                            </div >
                            {/*Titulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
                                <span className=' text-3x1 text-white'>Layout Responsive photos</span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left', 0.3)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.3 }}
                    className='flex-1 flex flex-col gap-y-10'>
                        {/*image */}
                        <div className='group relative overflow-hidden border-2 border-white/50 rounded-md'>
                            {/*Overlay */}
                            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 cursor-pointer'></div>
                            {/* Img */}
                            <img className='group-hover:scale-125 transition-all duration-500'
                                src={Img2}
                                alt='' />
                            {/*Pretitulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 '>
                                <span className='text-gradient'>Desenvolvedor Front-End</span>
                            </div >
                            {/*Titulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
                                <span className=' text-3x1 text-white'>Search Films</span>
                            </div>
                        </div>
                        {/*image */}
                        <div className='group relative overflow-hidden border-2 border-white/50 rounded-md'>
                            {/*Overlay */}
                            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 cursor-pointer'></div>
                            {/* Img */}
                            <img className='group-hover:scale-125 transition-all duration-500'
                                src={Img3}
                                alt='' />
                            {/*Pretitulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 '>
                                <span className='text-gradient'>Desenvolvedor Front-end</span>
                            </div >
                            {/*Titulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
                                <span className=' text-3x1 text-white'>Pizza Controller</span>
                            </div>
                        </div>
                        {/*image */}
                        <div className='group relative overflow-hidden border-2 border-white/50 rounded-md'>
                            {/*Overlay */}
                            <div className='group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 cursor-pointer'></div>
                            {/* Img */}
                            <img className='group-hover:scale-125 transition-all duration-500'
                                src={Img4}
                                alt='' />
                            {/*Pretitulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 '>
                                <span className='text-gradient'>Desenvolvedor Front-End</span>
                            </div >
                            {/*Titulo */}
                            <div className='absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50'>
                                <span className=' text-3x1 text-white'>Busca Tesouro</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Work;
