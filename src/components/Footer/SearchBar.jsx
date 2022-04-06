import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {GiCancel} from 'react-icons/gi'

const SearchBar = ({setSearchBar}) => {
    const [searchText, setsearchText] = useState("")
    const router=useRouter()
    
    useEffect(()=>{

    },[searchText])

    const url ="http://localhost:3000"
    const prod_url="https://connectme.co.in"
    const pushToSearch=()=>{
        router.push(`${url}/${searchText}`)
        setSearchBar(false)
    }
    const onKeyPress=(e)=>{
        if(e.keyCode===13){
            router.push(`${url}/${searchText}`)
            // pushToSearch()
        }
    }
    
    return (
        <div className="connectme__search">
            <div class="Card">
                <div className="close" onClick={()=>setSearchBar(false)}>
                    <GiCancel />
                </div>
                <div class="CardInner">
                    <label>Search For Profile</label>
                    <div class="container">
                        <div class="InputContainer">
                            <input placeholder="Username"  onChange={(e)=>setsearchText(e.target.value)} onKeyPress={(e)=>{e.key==="Enter" && pushToSearch()}} />
                        </div>
                        <div class="Icon" onClick={pushToSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar