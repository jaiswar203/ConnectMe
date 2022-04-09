import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '.'

const Layout = ({ title, children, description, navbar = true, edit, footer = false, setShare, ogImg = "", setShowRequesList, setSearchBar,share=false,name="" }) => {

    console.log({ogImg})
    return (
        <div>
            <Head>
                {share ? (
                    <title> {name} Profile</title>
                ): (
                    <title>{title ? `${title} - ConnectMe` : 'ConnectMe'}</title>
                )}
                {description && <meta name='description' content={description} />}
                <meta property="og:title" content="Create Awesome Film Debut Profile" />
                <meta property="og:image" content={ogImg} />
                <meta property="og:image:secure_url" content={ogImg !== "" ? ogImg : "/logo.png"} />
                <meta property="og:url" content="https://www.connectme.co.in" />
                <meta property="og:description" content={`Profile of ${name}`} />
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