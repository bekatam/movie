'use client'    
import Image from 'next/image'
import {Griffy, Montserrat} from 'next/font/google'
import React, { memo, useState } from 'react'
import './Nav.css';
import Link from 'next/link';
import {v4 as uuid} from 'uuid';
import {BsSearch} from 'react-icons/bs'
import {FiGift} from 'react-icons/fi'
import {IoMdNotificationsOutline} from 'react-icons/io'

const griffy = Griffy({ subsets: ['latin'], weight: "400" });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });

const links = [
    {
        name: 'Home',
        href: '/',
        isActive: true, 
        id: uuid()
    },
    {
        name: 'TV Shows',
        href: '/tv_shows',
        isActive: false,
        id: uuid()
    },
    {
        name: 'Movies',
        href: '/movies',
        isActive: false,
        id: uuid()
    },
    {
        name: 'New',
        href: '/new',
        isActive: false,
        id: uuid()
    }
]


const Nav:React.FC = memo(() => {
    const [active_link, setActiveLink] = useState([...links]);
    const handleActiveLink = (id: string) => {
        const newLinks = links.map((link) => {
            if (id === link.id) {
              return {
                ...link,
                isActive: true
              };
            } else {
              return {
                ...link,
                isActive: false
              };
            }
          });
        setActiveLink(newLinks);
    };

    const handleLogoClick = () => {
        setActiveLink([...links]);
    }
    return (
        <nav className='absolute z-10 w-full flex navbar justify-between items-center'>
            <div className="navbar__left flex items-center">
                <Link href='/' className={griffy.className + ' uppercase text-4xl text-logo mr-10'} onClick={handleLogoClick}>Dramatic</Link>
                {active_link.map((link, index) => (
                    <Link key={index} href={link.href} className={monsterrat.className + ' uppercase text-lg text-white mr-7'} onClick={()=>{handleActiveLink(link.id)}}>
                        <div className="relative">
                            {link.name}
                            {link.isActive && 
                                <div className='absolute bg-active_link rounded-full w-2 h-2 top-8 left-[50%] translate-x-[-50%]'/>
                            }
                        </div>
                    </Link>
                ))}
            </div>
            <div className="navbar__right flex items-center">
                <div className="searchbar flex items-center">
                    <input type="text" className="search text-white" />
                    <BsSearch className='text-white ml-3'/>
                </div>
                <FiGift size={33} className='cursor-pointer text-white ml-20'/>
                <IoMdNotificationsOutline size={35} className='cursor-pointer text-white ml-20'/>
                <button className='ml-20'><Image src='/images/profile_photo.png' alt='profile_photo' width={55} height={60}/></button>
            </div>
        </nav>
    )
})

Nav.displayName = 'Nav';

export default Nav