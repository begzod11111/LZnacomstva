import React from "react";
import './header.css'
import SiteNameHeader from "./defaultHeadersComponents/siteName/siteNameHeader";
import LogoHeader from "./defaultHeadersComponents/logo/logoHeader";


function HeaderCt({children, ...props}){
    return (
        <header {...props}>
            <LogoHeader/>
            <SiteNameHeader/>
            {children}
        </header>
    )
}
export default HeaderCt