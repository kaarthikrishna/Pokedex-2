import React from 'react'
import Head from 'next/head';
export default function layout({title,children}) {
  return (
    <div>
      <Head className="bg-gray-300">
        <title>{title}</title>
        
      </Head>
      <main className='container mx-auto max-w-xl pt-8 min-h-screen'>
            {children}
      </main>
    </div>
  )
}
