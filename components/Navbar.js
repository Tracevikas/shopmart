import React from "react";
import Image from 'next/image'
import styles from './Navbar.module.css'
import Link from "next/link";

import { FiShoppingCart } from 'react-icons/Fi';

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row  md:justify-start justify-center py-2 shadow-md items-center">
        <div className={` mx-5 ${styles.logo}`}>
           <Link href='/'><Image src='/footerlogo.png' width={200} height={40} alt=''/></Link></div>
        <div className="nav">
          <ul className="flex items-center space-x-12 font-semibold md:text-xl">
           <Link href='/'><a><li>Vegetables&Fruits</li></a></Link>
           <Link href='/'><a><li>Dairy Products</li></a></Link>
           <Link href='/'><a> <li>Munchies</li></a></Link>
            <Link href='/'><a><li>Sweet Tooth</li></a></Link>
          </ul>
        </div>
      </div>
          <div className="cart  absolute right-0 top-4 mx-5 my-3 ">
            <FiShoppingCart className="text-3xl"/>
          </div>
    </div>
  );
};

export default Navbar;