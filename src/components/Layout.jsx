import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '.'

const Layout = ({ title, children, description ,navbar=true,edit,footer=false,setShare,ogImg="",setShowRequesList,setSearchBar}) => {
    
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
            {
                footer && (
                    <Footer edit={edit} setShare={setShare} setShowRequesList={setShowRequesList} setSearchBar={setSearchBar} />
                )
            }
            
        </div>
    )
}

export default Layout