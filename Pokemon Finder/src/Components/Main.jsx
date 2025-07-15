import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import Modal from './Modal'
import "./style.css"

export default function Main() {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=1000"

  const [pokemonList, setPokemonList] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [searchedPokemon, setSearchedPokemon] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const fetchData = await fetch(API)
        const json = await fetchData.json()
        setPokemonList(json.results)
        setFilteredPokemon(json.results)
      } catch (err) {
        console.error(err)
        setError("Failed to load Pokémon data.")
      }
    }
    fetchAllPokemon()
  }, [])

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchedPokemon(query)
    const filtered = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query))
    setFilteredPokemon(filtered)
  }

  const handleCardClick = async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setSelectedPokemon(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch Pokemon details", err);
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPokemon(null)
  }

  return (
    <div>
      <div className='formDiv'>
        <input 
          type="text" 
          value={searchedPokemon} 
          onChange={handleInputChange} 
          placeholder="Search Pokemon"
        />
      </div>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className='pokemonContainer'>
          {filteredPokemon.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} onClick={() => handleCardClick(pokemon)} />
          ))}
        </div>
      )}

      {showModal && selectedPokemon && (
        <Modal
          show={showModal}
          pokemonDetails={selectedPokemon}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

