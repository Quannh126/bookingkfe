import * as React from 'react'
import { LayoutProps } from '@/models/index'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Layout.module.css'
import logo from '../../public/logo.png'
const logoHeight = 30 ,
        logoWidth = 150
export default function Admin({children}: LayoutProps) {
    return (
        <div>
             <Head>
                <title>BookingK Manage</title>
                <meta name="description" content="Book trip" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
            </Head>
            <header>
                 <nav className={styles.nav}>
                    <Link href='/admin' className={styles.logo}>
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
                    {/* <Link href = '/register' className='p-2 text-decoration-none'>Register</Link> */}
                </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}
