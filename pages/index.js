
import Link from 'next/link';
import Head from 'next/head';

import Layout from "../components/layout";

import { useState, useEffect } from 'react';
export default function Home({pokemon}){
    const [searchResults, setSearchResults] = useState(pokemon)
    const [input,setInput]= useState("")
    const [filter,setFilter]= useState("All")
    const handleFilterChange=(e)=>{
        setFilter(e.target.value)
    }
    const handleInputChange=(e)=>{
        setInput(e.target.value)
    }
    console.log(input,filter)
    return(
        <Layout  title="POKEDEX">


            <img className="homepage-wrapper" src='https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png' ></img>
            <div className='search'>
               <input className='input' type="text" placeholder=' Search...' onChange={handleFilterChange} value={input}></input> 
            </div>
            <div className='filter'>
                <label className='label' htmlFor='types'>Type</label>
                <select className='option' name='types' id='types' defaultValue={'All'} onChange={handleFilterChange} value={filter}>
                
                    <option value="All" >
                    All
                    </option>
                    <option value="Normal">Normal</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Electric">Electric</option>
                    <option value="Grass">Grass</option>
                    <option value="Ice">Ice</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Poison">Poison</option>
                    <option value="Ground">Ground</option>
                    <option value="Flying">Flying</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Bug">Bug</option>
                    <option value="Rock">Rock</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Dark">Dark</option>
                    <option value="Steel">Steel</option>
                    <option value="Fairy">Fairy</option>
                </select>
            </div>
            <div className='main_div'>
                {pokemon.map((pokeman,index)=>(
                    
                    <div key={index} className="poke">
                        
                        <Link href={`/pokemon?id=${index+1}`}>
                            
                            <img className='poke_img' src={pokeman.image} alt={pokeman.name}/>
                            <h4 className='text'>
                                {index+1}.&nbsp;{pokeman.name}
                            </h4>
                            
                            
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
        
    )
}
export async function getStaticProps(context){
    try{
        const res=await fetch('https://pokeapi.co/api/v2/pokemon?limit=904')
        const {results}=await res.json()
        const pokemon=results.map((results,index)=>{
            const paddedIndex=("00"+(index+1)).slice(-3)
            const image=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`
            https: return{
                ...results,
                image
            }
        })
        return{
            props: {pokemon},
        }
    }catch(err){
        console.error(err)
    }
    
}
