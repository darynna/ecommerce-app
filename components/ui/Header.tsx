'use client'

import React from 'react'
import { useUser, ClerkLoaded , UserButton, SignInButton, SignedIn} from '@clerk/nextjs'
import Link from 'next/link';
import Form from "next/form";
import { TrolleyIcon, PackageIcon } from '@sanity/icons';

export default function Header() {
    const { user } = useUser();

    const createClerkPasskey = () => {
     try {
         const response = user?.createPasskey();
         console.log(response)
     } catch (error) {
        console.error("Error", JSON.stringify(error, null, 2))
     }
    }

    console.log(user)
  return (
      <header className='flex flex-wrap justify-between items-center px-4 py-2'>
          {/* Top row */}
          <div className='flex w-full flex-wrap justify-between items-center'>
              <Link href="/" className='text-2xl font-bold text-blue-500 cursor-pointer mx-auto sm:mx-0'>Shopr</Link>

              <Form action="/search" className='w-full sm:w-auto sm:mx-4 mt-2 sm:mt-0'>
                  <input type="text" name="query" placeholder='Search for products'
                      className='
                      bg-gray-100
                      text-gray-800
                      px-4
                      py-2
                      rounded
                      focus:outline-none
                      focus:ring-blue-500
                      focus:ring-opacity-50
                      border
                      w-full
                      max-w-4xl
                      ' />
              </Form>

              <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 md:flex-none'>
                  <Link
                      href="/basket"
                      className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                      <TrolleyIcon className="w-6 h-6" />
                      {/* Span item count once global state is implemented */}
                      <span>My Basket</span>
                  </Link>

                  {/*User area */}
                  <ClerkLoaded>
                      {
                          <SignedIn>
                              <Link href="/orders"
                              className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                  <PackageIcon />
                                  <span>My orders</span>
                              </Link>
                          </SignedIn>
                      }
                      
                      {
                          user ? (
                              <div className='flex items-center space-x-2'>
                                  <UserButton />
                                  
                                  <div className='hidden sm:block text-xs'>
                                      <p className='text-gray-400'>Welcome Back</p>
                                      <p className='font-bold'>{user.fullName}</p>
                                  </div>
                          </div>
                          ) : (
                                   <SignInButton mode='modal'/>
                          )
                      }
                      {user?.passkeys.length === 0 && (
                          <button
                              onClick={createClerkPasskey}
                              type="button"
                          className='bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border'>
                              Create passkey
                          </button>
                      )
                          
                      }
                  </ClerkLoaded>
              </div>
          </div>
    </header>
  )
}
