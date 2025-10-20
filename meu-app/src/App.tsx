import { useEffect, useState } from 'react'
import SearchBar from './components/busca'
import PokemonList from './components/lista'
import Detalhes from './components/modal'
import FiltroTipo from './components/filtro'
import './app.css';
import ModalContent from './components/detalhes';



type NameUrl = { name: string; url: string }

const App: React.FC = () => {
  const [allNames, setAllNames] = useState<NameUrl[]>([])
  const [detailsCache, setDetailsCache] = useState<Record<string, any>>({})
  const [visiblePokemons, setVisiblePokemons] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null)
  const [error, setError] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(false)
  const [tipoSelecionado, setTipoSelecionado] = useState('all')

  useEffect(() => {
    const fetchAllNames = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const data = await res.json()
        setAllNames(data.results)
      } catch {
        setError('Erro ao carregar lista de Pokémon.')
      }
    }
    fetchAllNames()
  }, [])

  useEffect(() => {
    const loadVisibleDetails = async () => {
      setLoading(true)
      setError('')

      try {
        const filtered = allNames.filter(n =>
          n.name.toLowerCase().includes(search.toLowerCase())
        )

        const slice = filtered.slice(0, pageSize)
        const toFetch = slice.filter(s => !detailsCache[s.name])

        if (toFetch.length > 0) {
          const detailsArr = await Promise.all(
            toFetch.map(async s => {
              const r = await fetch(s.url)
              if (!r.ok) throw new Error('Erro ao buscar detalhe')
              const info = await r.json()
              return {
                name: info.name,
                image: info.sprites.front_default,
                types: info.types.map((t: any) => t.type.name),
                weight: info.weight,
                height: info.height,
                abilities: info.abilities,
                stats: info.stats
              }
            })
          )

          setDetailsCache(prev => {
            const next = { ...prev }
            detailsArr.forEach(d => { next[d.name] = d })
            return next
          })
        }

        const finalAssembled = slice
          .map(s => detailsCache[s.name])
          .filter(Boolean) as any[]

        const byType = tipoSelecionado === 'all'
          ? finalAssembled
          : finalAssembled.filter(p => p.types.includes(tipoSelecionado))

        setVisiblePokemons(byType)
      } catch {
        setError('Erro ao carregar detalhes dos Pokémon.')
      } finally {
        setLoading(false)
      }
    }

    if (allNames.length > 0) loadVisibleDetails()
  }, [allNames, search, pageSize, tipoSelecionado])

  const handleSelect = (name: string) => {
    setSelectedPokemon(detailsCache[name] ?? null)
  }

  const handleCloseModal = () => {
    setSelectedPokemon(null)
    setError('')
  }

  const handleLoadMore = () => setPageSize(prev => prev + 20)

  return (
    <div className="container" 
    style={{minHeight: '100vh',background: 'linear-gradient(135deg, #000000ff, #670ccfff)',color: '#ffffffff', 
      padding: '26px', textAlign: 'center' }}>


      <h1>Pokédex </h1>
     

      <SearchBar onSearch={setSearch} />
      <FiltroTipo tipoSelecionado={tipoSelecionado} onTipoChange={setTipoSelecionado} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <PokemonList pokemons={visiblePokemons} onSelect={handleSelect} loading={loading} />
      

      <button
        onClick={handleLoadMore} 
        disabled={loading}
        style={{
          marginTop: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Carregando...' : 'Carregar mais Pokémon'}
      </button>

      {selectedPokemon && (
        <ModalContent pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default App