import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (

        <
        div className = "footer"
        id = "footer" >
        <
        div className = "footer-content" >
        <
        div className = "footer-left" >
        <
        img className = 'logo'
        src = { assets.logo_bottom }
        alt = "" / >
        <
        p >
        FoodPrep brings your favorite meals right to your doorstep.Browse top - rated restaurants, explore new cuisines, and enjoy hassle - free ordering with secure payments and real - time delivery tracking.Freshness.Flavor.Fast. <
        /p> <
        div className = "footer-social-icons" >
        <
        img src = { assets.facebook_icon }
        alt = "Facebook" / >
        <
        img src = { assets.twitter_icon }
        alt = "Twitter" / >
        <
        img src = { assets.linkedin_icon }
        alt = "LinkedIn" / >
        <
        /div> < /
        div > <
        div className = "footer-center" >
        <
        h2 > Company < /h2> <
        ul >
        <
        li > Home < /li> <
        li > About us < /li> <
        li > Courses < /li> <
        li > Reviews < /li>  < /
        ul > <
        /div> <
        div className = "footer-right" >
        <
        h2 >
        Get in touch <
        /h2> <
        ul >
        <
        li > +91 93909 03859 < /li> <
        li > enquiry @foodprep.in < /li> < /
        ul > <
        /div> < /
        div >
        <
        hr / >
        <
        p className = 'footer-copyright' > Copyright 2025 @ FoodPrep.All rights reserved. < /p> < /
        div >
    );
};

export default Footer;