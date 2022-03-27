import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '.'

const Layout = ({ title, children, description ,navbar=true,icon,favicon="/favicon.ico"}) => {
    
    return (
        <div>
            <Head>
                <title>{title ? `${title} - ConnectMe` : 'ConnectMe'}</title>
                {description && <meta name='description' content={description} />}
            </Head>
            {navbar && (
                <Navbar />
            )}
            <main>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default Layout