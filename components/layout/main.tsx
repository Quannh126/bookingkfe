import * as React from 'react';
import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import logo2 from '../../public/logo2.png';
import Head from 'next/head'
const logoHeight = 30 ,
        logo2Height = 50,
        logoWidth = 150
import styles from '../../styles/Layout.module.css'
export default function MainLayout({children}: LayoutProps) {
    return (
        <>
        <Head>
            <title>BookingK App</title>
            <meta name="description" content="Book trip" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        </Head>
        <div  className={styles.container}>
        <header>
                <nav className={styles.nav}>
                    <Link href='/' className={styles.logo}>
                        <div>
                            <Image 
                            src={logo} 
                            alt = "picture" 
                            width={logoWidth}
                            height ={logoHeight}
                            >
                            </Image>
                        </div>
                    </Link>                 
                <div>
                    <Link href='/login' className='p-2 text-decoration-none'>Login</Link>
                    <Link href = '/register' className='p-2 text-decoration-none'>Register</Link>
                </div>
                </nav>
            </header>
            <main>
                {children}
            </main>   

            <footer>
            <section>
                    <div className={styles.footer}>
                        <div className="ft_main m-auto">
                            <div className="row title_ft align-items-center">
                                <div className="col-lg-4 col-6">
                                    <div className="logo_ft">
                                        <Link href="/">
                                            <Image
                                            width={logoWidth}
                                            height={logo2Height}
                                            className = 'w-150'
                                            src={logo2}
                                            alt="Đặt xe trực tuyến"
                                            
                                            ></Image>
                                           
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-2 title d-lg-block d-none">Chính sách</div>
                                <div className="col-lg-3 title  d-lg-block d-none pl-lg-4">Về chúng tôi</div>
                                <div className="col-lg-3 title d-lg-block d-none ">Facebook</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 flex-column">
                                    <div className="contact_ft">
                                        <div className="address item_contact_ft">
                                            <i className="fab fa-facebook-f" />
                                            <span>
                                                <Link target="_blank" href="https://www.facebook.com/profile.php?id=100088399691122" className="text-white">Fanpage</Link></span>
                                        </div>
                                        <div className="email item_contact_ft">
                                            <i className="far fa-envelope" />
                                            <span>Email: quannh1269@gmail.com</span>
                                        </div>
                                        <div className="phone item_contact_ft">
                                            <i className="fas fa-mobile-alt pl-1" />
                                            <span>Hotline: 0335150979</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 ">
                                    <div className="linking">
                                        <ul className="pl-0">
                                            <li><Link href="/chinh-sach-va-quy-dinh">Chính sách và quy định</Link></li>
                                            <li><Link href="/bao-mat-thong-tin">Bảo mật thông tin</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 pl-lg-4">
                                    <div className="linking">
                                        <ul className="pl-0">
                                            <li><Link href="/thong-tin-chung">Thông tin chung</Link></li>
                                            <li><Link href="/huong-dan-su-dung">Hướng dẫn đặt xe</Link></li>
                                            <li><Link href="/hinh-thuc-thanh-toan">Hình thức thanh toán</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="linking">
                                    <iframe 
                                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpeople%2FBookingK%2F100088399691122%2F&tabs=timeline&width=340&height=130&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" 
                                        width="340" 
                                        height="130" 
                                        scrolling="no" 
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </div>            
        </>
    );
}
