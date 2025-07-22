import { useState, useEffect, useRef } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

function App() {
  const [dogData, setDogData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const originalDogData = useRef([]);

  const getBreedFromUrl = (url) => {
    const match = url.match(/breeds\/([^/]+)\//);
    return match ? match[1].replace('-', ' ') : 'Raza desconocida';
  };

  const fetchMultipleDogs = async (count = 0) => {
    try {
      const fetches = Array.from({ length: count }, () => fetch(BASE_URL));
      const responses = await Promise.all(fetches);

      const dogs = await Promise.all(
        responses.map(async (res) => {
          if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
          }
          const data = await res.json();
          return {
            url: data.message,
            breed: getBreedFromUrl(data.message),
          };
        })
      );

      setDogData((prev) => {
        const updatedList = [...prev, ...dogs];
        originalDogData.current = updatedList;
        return updatedList;
      });
    } catch (error) {
      console.error('❌ Error al obtener perros:', error.message);
    }
  };

  const fetchDog = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      const newDog = {
        url: data.message,
        breed: getBreedFromUrl(data.message),
      };

      setDogData((prev) => {
        const updatedList = [...prev, newDog];
        originalDogData.current = updatedList;
        return updatedList;
      });
    } catch (error) {
      console.error('❌ Error al obtener el perro:', error.message);
    }
  };

  useEffect(() => {
    console.log('🐶 Nuevo arreglo actualizado:', dogData);
  }, [dogData]);

  useEffect(() => {
    fetchMultipleDogs(1);
  }, []);

  const searchItems = (value) => {
    setSearchValue(value);

    if (value.trim().length < 4) {
      setDogData(originalDogData.current);
      return;
    }

    const filtered = originalDogData.current.filter((dog) =>
      dog.breed.toLowerCase().includes(value.toLowerCase())
    );

    setDogData(filtered);
  };

  return (
    <>
    <div className="container text-center mt-5">
      <h1 className="display-5 mb-4 title-responsive titulo-principal">
        ¡Conoce a estos hermosos perritos!
      </h1>

      <div className="mi-busqueda mb-4">
        <input
          type="search"
          className="form-control mi-busqueda input"
          placeholder="Buscar por raza (mínimo 3 letras)..."
          aria-label="Buscar por raza"
          aria-describedby="button-addon2"
          value={searchValue}
          onChange={(e) => searchItems(e.target.value)}
        />
        <button
          className="boton-buscar"
          type="button"
          onClick={() => searchItems(searchValue)}
        >
          Buscar
        </button>
      </div>

      <div className="row justify-content-center">
        {dogData.map((dog, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 mb-4 custom-card"
          >
            <img
              src={dog.url}
              alt={`Perro ${index + 1}`}
              className="img-arreglada"
              loading="lazy"
            />
            
            <p className="mt-2">
              <strong>Raza:</strong> {dog.breed}
            </p>
          </div>
        ))}
      </div>
        
      <div className="row">
        <div className="col-12">
          <button className="boton-personalizado mt-4" onClick={fetchDog}>
            Ver otro perrito...
          </button>
          <p className="mt-2">
            <span className="negrita">Total de perritos:</span> {dogData.length}
          </p><br></br>
          <p className="mt-2">
            <span className="negrita">¡Haz clic <span className="mano">👆🏼</span>
              en el botón para ver más!</span>
          </p>
          <p className="mt-2">
            <span className="negrita">Conoce a estos adorables perritos:</span>🐶
          </p>
          <p className="mt-2">
            <span className="negrita">¡Cada perro es único y especial <span className="huellitas">🐾</span>
                   porque cada uno tiene su propia historia!</span> 📖
          </p>
        </div>
      </div>
    </div>
          <footer className='footer'>
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <p>Vite + React</p>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src="/react-svgrepo-com.svg" className="logo react" alt="React logo" />
            </a>
            <p><span className='negrita'> Desarrollado por</span> 💻 <span className= "johanna"> Johanna González </span> <br></br> <span className='negrita'>Ramo: </span> Front End - <span className='negrita'>Profesor:</span> Nicolás Lira <br></br> Evaluación 3 - Vespertino</p>
            <a href="C:\Escritorio\Proyectos_2025\React\evaluacion-3-johanna-gonzalez-vespertino\public\inacap-seeklogo.png" target="_blank" rel="noopener noreferrer">
              <img src="/inacap-seeklogo.png" className="logo" alt="Inacap logo" /><br></br><p> <span className='negrita'> Apoquindo</span><span className='corazon'>❤️</span></p>
            </a>
          </footer>
  </>
  
  );
}

export default App;
