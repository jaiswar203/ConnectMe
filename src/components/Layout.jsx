import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '.'

const Layout = ({ title, children, description, navbar = true, edit, footer = false, setShare, ogImg = "", setShowRequesList, setSearchBar, view = false ,tab={}}) => {
    console.log({tab})
    return (
        <div>
            <Head>
                <title>{title ? `${title} - ConnectMe` : 'ConnectMe'}</title>
                {description && <meta name='description' content={description} />}
                <meta property="og:title" content="The Rock" />
                <meta property="og:type" content="video.movie" />
                <meta property="og:url" content={"https://connectme.co.in"} />
                <meta property="og:image" content={tab.img} />
                
            </Head>
            {navbar && (
                <Navbar />
            )}
            <main>
                {children}
            </main>
            {
                footer && (
                    <Footer edit={edit} setShare={setShare} setShowRequesList={setShowRequesList} setSearchBar={setSearchBar} view={view} />
                )
            }

        </div>
    )
}

export default Layout