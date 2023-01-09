import React from 'react'
import layout from '../components/layout'
import Link from 'next/link'
export default function pokemon({pokeman}) {
  console.log(pokeman)
  return (
    <layout title={pokeman.name}>
        <img className="logo" src='https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png' ></img>
        <div className='main'>

            <div className='name'>
                    <h1 >
                        {pokeman.name}
                    </h1>
            </div>

            <div className='image'>
                <img  src={pokeman.image} alt={pokeman.name} />
            </div>

            <div className='details'>

                <p>
                    <span>Weight:</span> {pokeman.weight}
                </p>
                <p>
                    <span>Height:</span>
                    {pokeman.height}
                </p>
                <h2>Types</h2>
                {pokeman.types.map((type, index) => (
                    <p key="index">{type.type.name}</p>
                ))}
                
            </div>
            <div className='home'>
                    
                <p className="home">
                        <Link href="/">
                            Go back
                        </Link>
                </p>
            </div>
        </div>

        
        
        
    </layout>
);
    

}
export async function getServerSideProps({query}){
    const id=query.id;
    try{
        const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex=("00"+(id)).slice(-3)
        const image=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`
        pokeman.image=image;
        return{
            props:{pokeman},
        }
    }catch(err){
        console.error(err)
    }
}