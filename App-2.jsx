///---------------------Excelente------------------//

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

  // ✅ Obtener varios perros de forma paralela
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

  // ✅ Obtener un solo perro
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

  // ✅ Mostrar el arreglo actualizado solo cuando cambia dogData
  useEffect(() => {
    console.log('🐶 Nuevo arreglo actualizado:', dogData);
  }, [dogData]);

  // ✅ Cargar 2 perros al inicio
  useEffect(() => {
    fetchMultipleDogs(1);
  }, []);

  // ✅ Buscar por raza (mínimo 3 letras)
  const searchItems = (value) => {
    setSearchValue(value);

    if (value.trim().length < 3) {
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
            Ver otro perrito
          </button>
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
            <p>Desarrollado por 💻 Johanna González</p>
            <p>Ramo: FrontEnd - Profesor: Nicolás Lira</p>
            <p>Evaluación 3 - Vespertino</p>
            <a href="C:\Escritorio\Proyectos_2025\React\evaluacion-3-johanna-gonzalez-vespertino\public\inacap-seeklogo.png" target="_blank" rel="noopener noreferrer">
              <img src="/inacap-seeklogo.png" className="logo" alt="Inacap logo" />
            </a>
            <p> Apoquindo ❤️</p>
          </footer>
  </>
  
  );
}

export default App;
///------------------------------Excellent------------------//







// // //--------BUENO----------------------------//

// // import { useState, useEffect, useRef } from 'react';
// // import './App.css';

// // const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

// // function App() {
// //   const [dogData, setDogData] = useState([]);
// //   const [searchValue, setSearchValue] = useState('');
// //   const originalDogData = useRef([]);

// //   const getBreedFromUrl = (url) => {
// //     const match = url.match(/breeds\/([^/]+)\//);
// //     return match ? match[1].replace('-', ' ') : 'Raza desconocida';
// //   };

// //   // ✅ Obtener varios perros de forma paralela
// //   const fetchMultipleDogs = async (count = 0) => {
// //     try {
// //       const fetches = Array.from({ length: count }, () => fetch(BASE_URL));
// //       const responses = await Promise.all(fetches);

// //       const dogs = await Promise.all(
// //         responses.map(async (res) => {
// //           if (!res.ok) {
// //             throw new Error(`Error del servidor: ${res.status}`);
// //           }
// //           const data = await res.json();
// //           return {
// //             url: data.message,
// //             breed: getBreedFromUrl(data.message),
// //           };
// //         })
// //       );

// //       setDogData((prev) => {
// //         const updatedList = [...prev, ...dogs];
// //         originalDogData.current = updatedList;
// //         return updatedList;
// //       });
// //     } catch (error) {
// //       console.error('❌ Error al obtener perros:', error.message);
// //     }
// //   };

// //   // ✅ Obtener un solo perro
// //   const fetchDog = async () => {
// //     try {
// //       const response = await fetch(BASE_URL);
// //       if (!response.ok) {
// //         throw new Error(`Error del servidor: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       const newDog = {
// //         url: data.message,
// //         breed: getBreedFromUrl(data.message),
// //       };

// //       setDogData((prev) => {
// //         const updatedList = [...prev, newDog];
// //         originalDogData.current = updatedList;
// //         return updatedList;
// //       });
// //     } catch (error) {
// //       console.error('❌ Error al obtener el perro:', error.message);
// //     }
// //   };

// //   // ✅ Mostrar el arreglo actualizado solo cuando cambia dogData
// //   useEffect(() => {
// //     console.log('🐶 Nuevo arreglo actualizado:', dogData);
// //   }, [dogData]);

// //   // ✅ Cargar 2 perros al inicio
// //   useEffect(() => {
// //     fetchMultipleDogs(1);
// //   }, []);

// //   // ✅ Buscar por raza (mínimo 3 letras)
// //   const searchItems = (value) => {
// //     setSearchValue(value);

// //     if (value.trim().length < 3) {
// //       setDogData(originalDogData.current);
// //       return;
// //     }

// //     const filtered = originalDogData.current.filter((dog) =>
// //       dog.breed.toLowerCase().includes(value.toLowerCase())
// //     );

// //     setDogData(filtered);
// //   };

// //   return (
// //     <>
// //     <div className="container text-center mt-5">
// //       <h1 className="display-5 mb-4 title-responsive titulo-principal">
// //         ¡Conoce a estos hermosos perritos!
// //       </h1>

// //       <div className="mi-busqueda mb-4">
// //         <input
// //           type="search"
// //           className="form-control mi-busqueda input"
// //           placeholder="Buscar por raza (mínimo 3 letras)..."
// //           aria-label="Buscar por raza"
// //           aria-describedby="button-addon2"
// //           value={searchValue}
// //           onChange={(e) => searchItems(e.target.value)}
// //         />
// //         <button
// //           className="boton-buscar"
// //           type="button"
// //           onClick={() => searchItems(searchValue)}
// //         >
// //           Buscar
// //         </button>
// //       </div>

// //       <div className="row justify-content-center">
// //         {dogData.map((dog, index) => (
// //           <div
// //             key={index}
// //             className="col-12 col-sm-6 col-md-4 mb-4 custom-card"
// //           >
// //             <img
// //               src={dog.url}
// //               alt={`Perro ${index + 1}`}
// //               className="img-arreglada"
// //               loading="lazy"
// //             />
// //             <p className="mt-2">
// //               <strong>Raza:</strong> {dog.breed}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="row">
// //         <div className="col-12">
// //           <button className="boton-personalizado mt-4" onClick={fetchDog}>
// //             Ver otro perrito
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //         <div></div>
// //      <footer className='footer'>
// //             <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
// //               <img src={viteLogo} className="logo" alt="Vite logo" />
// //             </a>
// //             <p>Vite + React</p>
// //             <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
// //               <img src="/react-svgrepo-com.svg" className="logo react" alt="React logo" />
// //             </a>
// //             <p>Desarrollado por 💻 Johanna Gonzalez</p>
// //             <p>Evaluación 3 - Vespertino</p>
// //             <p>Inacap Apoquindo ❤️</p>
// //           </footer>
// //     </div>
// //   );
// // }
// //  </>

// // export default App;
// // //--------BUENO----------------------------//

// // import { useState, useEffect, useRef } from 'react';
// // import './App.css';

// // const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

// // function App() {
// //   const [dogData, setDogData] = useState([]);
// //   const [searchValue, setSearchValue] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const originalDogData = useRef([]);
// //   const controller = useRef(new AbortController());

// //   // Extrae la raza de la URL
// //   const getBreedFromUrl = (url) => {
// //     const match = url.match(/breeds\/([^/]+)\//);
// //     return match ? match[1].replace('-', ' ') : 'raza desconocida';
// //   };

// //   // Obtener un nuevo perro con cancelación
// //   const fetchDog = async () => {
// //     if (isLoading) return;
    
// //     setIsLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await fetch(BASE_URL, {
// //         signal: controller.current.signal
// //       });
      
// //       if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      
// //       const data = await response.json();
      
// //       // Verificar si la URL de la imagen es válida
// //       const img = new Image();
// //       img.src = data.message;
      
// //       await new Promise((resolve, reject) => {
// //         img.onload = resolve;
// //         img.onerror = () => reject(new Error('Imagen no válida'));
// //       });

// //       const newDog = {
// //         url: data.message,
// //         breed: getBreedFromUrl(data.message),
// //         id: crypto.randomUUID() // ID único moderno
// //       };

// //       setDogData(prev => {
// //         const updatedList = [...prev, newDog];
// //         originalDogData.current = updatedList;
// //         console.log('Perro añadido:', newDog);
// //         return updatedList;
// //       });
      
// //     } catch (error) {
// //       if (error.name !== 'AbortError') {
// //         console.error('Error:', error);
// //         setError(`Error al cargar: ${error.message}`);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Cargar perros iniciales
// //   useEffect(() => {
// //     const loadInitialDogs = async () => {
// //       try {
// //         // Cargamos 3 perros en paralelo
// //         await Promise.all([
// //           fetchDog(),
// //           fetchDog(),
// //           fetchDog()
// //         ]);
// //       } catch (e) {
// //         console.error('Error en carga inicial:', e);
// //       }
// //     };
    
// //     loadInitialDogs();
    
// //     return () => {
// //       controller.current.abort();
// //       controller.current = new AbortController();
// //     };
// //   }, []);

// //   // Función de búsqueda optimizada
// //   const searchItems = (searchText) => {
// //     setSearchValue(searchText);
    
// //     if (searchText.length < 3) {
// //       setDogData(originalDogData.current);
// //       return;
// //     }

// //     const filtered = originalDogData.current.filter(dog =>
// //       dog.breed.toLowerCase().includes(searchText.toLowerCase())
// //     );
    
// //     setDogData(filtered);
// //   };

// //   return (
// //     <div className="container text-center mt-5">
// //       <h1 className="display-5 mb-4 title-responsive titulo-principal">
// //         ¡Conoce a estos hermosos perritos!
// //       </h1>
      
// //       {/* Buscador */}
// //       <div className="mi-busqueda mb-4">
// //         <input
// //           type="search"
// //           className="form-control mi-busqueda input"
// //           placeholder="Buscar por raza (mínimo 3 letras)..."
// //           aria-describedby="button-addon2"
// //           value={searchValue}
// //           onChange={(e) => searchItems(e.target.value)}
// //         />
// //         <button
// //           className="boton-buscar"
// //           type="button"
// //           onClick={() => searchItems(searchValue)}
// //         >
// //           Buscar
// //         </button>
// //       </div>

// //       {/* Mensajes de estado */}
// //       {error && (
// //         <div className="alert alert-danger">
// //           {error} 
// //           <button 
// //             className="btn btn-sm btn-link" 
// //             onClick={() => setError(null)}
// //           >
// //             ×
// //           </button>
// //         </div>
// //       )}

// //       {/* Lista de perros */}
// //       <div className="row justify-content-center">
// //         {isLoading && dogData.length === 0 ? (
// //           <div className="text-center my-5">
// //             <div className="spinner-border text-primary" role="status">
// //               <span className="visually-hidden">Cargando...</span>
// //             </div>
// //             <p>Cargando perritos...</p>
// //           </div>
// //         ) : dogData.length === 0 ? (
// //           <div className="alert alert-warning">
// //             No se encontraron perros {searchValue.length >= 3 && `con la raza "${searchValue}"`}
// //             <button 
// //               className="btn btn-sm btn-primary ms-2"
// //               onClick={() => fetchDog()}
// //             >
// //               Cargar perros
// //             </button>
// //           </div>
// //         ) : (
// //           dogData.map((dog) => (
// //             <div key={dog.id} className="col-12 col-sm-6 col-md-4 mb-4 custom-card">
// //               <img
// //                 src={dog.url}
// //                 alt={`Perro ${dog.breed}`}
// //                 className="img-arreglada"
// //                 loading="lazy"
// //                 onError={(e) => {
// //                   e.target.src = 'https://via.placeholder.com/300?text=Imagen+no+cargada';
// //                   e.target.alt = 'Imagen no disponible';
// //                 }}
// //               />
// //               <p className="mt-2">
// //                 <strong>Raza:</strong> {dog.breed}
// //               </p>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Botón para más perros */}
// //       <div className="row">
// //         <div className="col-12">
// //           <button 
// //             className="boton-personalizado mt-4" 
// //             onClick={fetchDog}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? (
// //               <>
// //                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
// //                 Cargando...
// //               </>
// //             ) : 'Ver otro perrito'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// // {/* 
// //       <div className="mb-4">
// //         <input
// //           type="search"
// //           className="form-control"
// //           placeholder="Buscar por raza (mínimo 3 letras)..."
// //           value={searchValue}
// //           onChange={(e) => handleSearch(e.target.value)}
// //         />
// //       </div> */}
// // // const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

// // // function App() {
// // //   const [dogData, setDogData] = useState([]);
// // //   const [searchValue, setSearchValue] = useState('');
// // //   const originalDogData = useRef([]);

// // //   const getBreedFromUrl = (url) => {
// // //     const match = url.match(/breeds\/([^/]+)\//);
// // //     return match ? match[1].replace('-', ' ') : 'Raza desconocida';
// // //   };

// // //   // ✅ Obtener varios perros de forma paralela
// // //   const fetchMultipleDogs = async (count = 0) => {
// // //     try {
// // //       const fetches = Array.from({ length: count }, () => fetch(BASE_URL));
// // //       const responses = await Promise.all(fetches);

// // //       const dogs = await Promise.all(
// // //         responses.map(async (res) => {
// // //           if (!res.ok) {
// // //             throw new Error(`Error del servidor: ${res.status}`);
// // //           }
// // //           const data = await res.json();
// // //           return {
// // //             url: data.message,
// // //             breed: getBreedFromUrl(data.message),
// // //           };
// // //         })
// // //       );

// // //       setDogData((prev) => {
// // //         const updatedList = [...prev, ...dogs];
// // //         originalDogData.current = updatedList;
// // //         return updatedList;
// // //       });
// // //     } catch (error) {
// // //       console.error('❌ Error al obtener perros:', error.message);
// // //     }
// // //   };

// // //   // ✅ Obtener un solo perro
// // //   const fetchDog = async () => {
// // //     try {
// // //       const response = await fetch(BASE_URL);
// // //       if (!response.ok) {
// // //         throw new Error(`Error del servidor: ${response.status}`);
// // //       }

// // //       const data = await response.json();
// // //       const newDog = {
// // //         url: data.message,
// // //         breed: getBreedFromUrl(data.message),
// // //       };

// // //       setDogData((prev) => {
// // //         const updatedList = [...prev, newDog];
// // //         originalDogData.current = updatedList;
// // //         return updatedList;
// // //       });
// // //     } catch (error) {
// // //       console.error('❌ Error al obtener el perro:', error.message);
// // //     }
// // //   };

// // //   // ✅ Mostrar el arreglo actualizado solo cuando cambia dogData
// // //   useEffect(() => {
// // //     console.log('🐶 Nuevo arreglo actualizado:', dogData);
// // //   }, [dogData]);

// // //   // ✅ Cargar 2 perros al inicio
// // //   useEffect(() => {
// // //     fetchMultipleDogs(1);
// // //   }, []);

// // //   // ✅ Buscar por raza (mínimo 3 letras)
// // //   const searchItems = (value) => {
// // //     setSearchValue(value);

// // //     if (value.trim().length < 3) {
// // //       setDogData(originalDogData.current);
// // //       return;
// // //     }

// // //     const filtered = originalDogData.current.filter((dog) =>
// // //       dog.breed.toLowerCase().includes(value.toLowerCase())
// // //     );

// // //     setDogData(filtered);
// // //   };

// // //   return (  
// // //     <>
// // //       <div className="container text-center mt-5">
// // //         <h1 className="display-5 mb-4 title-responsive titulo-principal">
// // //           ¡Conoce a estos hermosos perritos!
// // //         </h1>
// // //         <div className="mi-busqueda mb-4">
// // //           <input
// // //             type="search"
// // //             className="form-control mi-busqueda input"
// // //             placeholder="Buscar por raza (mínimo 3 letras)..."
// // //             aria-label="Buscar por raza"
// // //             aria-describedby="button-addon2"
// // //             value={searchValue}
// // //             onChange={(e) => searchItems(e.target.value)}
// // //           />
// // //           <button
// // //             className="boton-buscar"
// // //             type="button"
// // //             onClick={() => searchItems(searchValue)}
// // //           >
// // //             Buscar
// // //           </button>
// // //         </div>

// // //         <div className="row justify-content-center">
// // //           {dogData.map((dog, index) => (
// // //             <div
// // //               key={index}
// // //               className="col-12 col-sm-6 col-md-4 mb-4 custom-card"
// // //             >
// // //               <img
// // //                 src={dog.url}
// // //                 alt={`Perro ${index + 1}`}
// // //                 className="img-arreglada"
// // //                 loading="lazy"
// // //               />
// // //               <p className="mt-2">
// // //                 <strong>Raza:</strong> {dog.breed}
// // //               </p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="row">
// // //           <div className="col-12">
// // //             <button className="boton-personalizado mt-4" onClick={fetchDog}>
// // //               Ver otro perrito
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <div>
// // //         <footer className='footer'>
// // //         <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
// // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // //         </a>
// // //         <p>Vite + React</p>
// // //         <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
// // //           <img src="/react-svgrepo-com.svg" className="logo react" alt="React logo" />
// // //         </a>
// // //         <p>Desarrollado por 💻 Johanna Gonzalez</p>
// // //         <p>Evaluación 3 - Vespertino</p>
// // //         <p>Inacap Apoquindo ❤️</p>
// // //       </footer>
// // //      </div>
// // //     </>
// // //   );
// // // } 
// // // export default App;
// // //-----------------------------


// // import { useState, useEffect } from 'react';
// // import './App.css';

// // const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

// // function App() {
// //   const [dogData, setDogData] = useState([]);
// //   const [originalDogData, setOriginalDogData] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   // Función para extraer la raza desde la URL
// //   const getBreedFromUrl = (url) => {
// //     const match = url.match(/breeds\/([^/]+)\//);
// //     return match ? match[1].replace('-', ' ') : 'raza desconocida';
// //   };

// //   // Obtener un perro y agregarlo al array acumulativo
// //   const fetchDog = async () => {
// //     try {
// //       const response = await fetch(BASE_URL);
// //       if (!response.ok) {
// //         throw new Error('La respuesta de la red no fue correcta');
// //       }
// //       const data = await response.json();

// //       const breed = getBreedFromUrl(data.message).toLowerCase();

// //       const newDog = {
// //         url: data.message,
// //         breed
// //       };

// //       // Actualiza ambos arrays
// //       setDogData(prev => [...prev, newDog]);
// //       setOriginalDogData(prev => [...prev, newDog]);
// //     } catch (error) {
// //       console.error('Error al obtener la raza del perrito 😢:', error);
// //     }
// //   };

// //   // Obtener varios perros al cargar
// //   const fetchAllDogs = () => {
// //     for (let i = 0; i < 10; i++) {
// //       fetchDog();
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllDogs();
// //   }, []);

// //   // Filtrar los datos mientras escribes
// //   useEffect(() => {
// //     if (searchTerm.trim() === '') {
// //       setDogData(originalDogData); // restaura si está vacío
// //     } else {
// //       const filtered = originalDogData.filter(dog =>
// //         dog.breed.includes(searchTerm.toLowerCase())
// //       );
// //       setDogData(filtered);
// //     }
// //   }, [searchTerm, originalDogData]);

// //   return (
// //     <>
// //       <div className="container text-center mt-5">
// //         <h1 className="display-5 mb-4 title-responsive titulo-principal">
// //           ¡Conoce a estos hermosos perritos!
// //         </h1>

// //         {/* Barra de búsqueda */}
// //         <div className="mi-busqueda mb-4 d-flex justify-content-center">
// //           <input
// //             type="search"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="form-control w-50"
// //             placeholder="Buscar por raza..."
// //           />
// //         </div>

// //         {/* Galería de perros */}
// //         <div className="row justify-content-center">
// //           {dogData.length > 0 ? (
// //             dogData.map((dog, index) => (
// //               <div key={index} className="col-12 col-sm-6 col-md-4 mb-4 custom-card">
// //                 <img
// //                   src={dog.url}
// //                   alt={`Perro ${index + 1}`}
// //                   className="img-arreglada"
// //                   loading="lazy"
// //                 />
// //                 <p className="mt-2"><strong>Raza:</strong> {dog.breed}</p>
// //               </div>
// //             ))
// //           ) : (
// //             <p className='texto-error texto-error p'>Error al obtener la raza del perrito 😢</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Botón para agregar más perros */}
// //       <div className="row">
// //         <div className="col-12 text-center">
// //           <button className="boton-personalizado mt-4" onClick={fetchDog}>
// //             Ver otro perrito
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default App;










// // //----------------------------------------//

// // import { useState, useEffect } from 'react'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // const BASE_URL = 'https://dog.ceo/api/breeds/image/random'


// // function App() {
// //   const [dogData, setDogData] = useState([]);

// //   const fetchDog = async () => {
// //     try {
// //       const response = await fetch(BASE_URL);
// //       if (!response.ok) {
// //         throw new Error('La respuesta de la red no fue correcta');
// //       }
// //       const data = await response.json();

// //       const breed = getBreedFromUrl(data.message);

// //       const newDog = {
// //         url: data.message,
// //         breed
// //       };

// //        setDogData(prev => [...prev, newDog]);
// //       setOriginalDogData(prev => [...prev, newDog]); // <-- mantener copia
// //     } catch (error) {
// //       console.error('Error al obtener la raza del perrito 😢:', error);
// //     }
// //   };
 

// //   function getBreedFromUrl(url) {
// //     const match = url.match(/breeds\/([^/]+)\//);
// //     return match ? match[1].replace('-', ' ') : 'Raza desconocida';
// //   }

// //   const fetchAllDogs = () => {
// //     for (let i = 0; i < 1; i++) {
// //       fetchDog();
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAllDogs();
// //   }, []);

// //   useEffect(() => {
// //     console.log('🐕 Lista de perros actualizados:', dogData);
// //   }, [dogData]);

// //  const searchItems = (searchValue) => {
// //     if (searchValue.trim() === '') {
// //       setDogData(originalDogData); // si el input está vacío, muestra todo
// //       return;
// //     }

// //     const filteredItems = originalDogData.filter(dog =>
// //       dog.breed.toLowerCase().includes(searchValue.toLowerCase())
// //     );
// //     setDogData(filteredItems);
// //   };


// //   return (
// //     <>
// //       <div className='container text-center mt-5'>
// //         <h1 className="display-5 mb-4 title-responsive titulo-principal">
// //           ¡Conoce a estos hermosos perritos!
// //         </h1>

// //         <div className='mi-busqueda mb-4'>
// //           <input
// //             onChange={(e) => searchItems(e.target.value)}
// //             type="search"
// //             className="form-control mi-busqueda input"
// //             placeholder="Buscar por raza..."
// //             aria-label="Buscar por raza"
// //             aria-describedby="button-addon2"
// //           />
// //           <button className="boton-buscar" type="button" id="boton-buscar">
// //             Buscar
// //           </button>
// //         </div>

// //         <div className='row justify-content-center'>
// //           {dogData.map((dog, index) => (
// //             <div key={index} className="col-12 col-sm-6 col-md-4 mb-4 custom-card">
// //               <img
// //                 src={dog.url}
// //                 alt={`Perro ${index + 1}`}
// //                 className="img-arreglada"
// //                 loading="lazy"
// //               />
// //               <p className="mt-2"><strong>Raza:</strong> {dog.breed}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className='row'>
// //         <div className='col-12'>
// //           <button className='boton-personalizado mt-4' onClick={fetchDog}>
// //             Ver otro perrito
// //           </button>
// //         </div>
// //       </div>
// //       <footer className='footer'>
// //         <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <p>Vite + React</p>
// //         <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
// //           <img src="/react-svgrepo-com.svg" className="logo react" alt="React logo" />
// //         </a>
// //         <p>Desarrollado por 💻 Johanna Gonzalez</p>
// //         <p>Evaluación 3 - Vespertino</p>
// //         <p>Inacap Apoquindo ❤️</p>
// //       </footer>
// //     </>
// //   )
// // }
// // export default App;


// // //----------------------------------------

// // import { useState, useEffect } from 'react'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // const BASE_URL = 'https://dog.ceo/api/breeds/image/random'

// // function App() {

// //   const [dogData, setDogData] = useState([]);

// //   // // // // const fetchAllDogs = async () => {
// //   // // // //   try {
// //   // // // //     const requests = Array.from({ length: 19 }, () =>
// //   // // // //       fetch(BASE_URL).then(res => res.json())
// //   // // // //     );

// //   // // // //     const results = await Promise.all(requests);
// //   // // // //     const images = results.map(d => d.message);

// //   // // // //     setDogData(images);
// //   // // // //   } catch (error) {
// //   // // // //     console.error('Error fetching dog images:', error);
// //   // // // //   }
// //   // // // // };

// //   // // // // useEffect(() => {
// //   // // // //   fetchAllDogs();
// //   // // // // }, []); // Se ejecuta solo una vez

// //   // // // useEffect(() => {
// //   // // //   console.log('🐶 dogData.length:', dogData.length);
// //   // // // }, [dogData]);






// //   // // const [dogData, setDogData] = useState([])

// //   // // const fetchDog = async () => {
// //   // //   try {
// //   // //     const response = await fetch(BASE_URL);
// //   // //     if (!response.ok) {
// //   // //       throw new Error('La respuesta de la red no fue correcta');
// //   // //     }
// //   // //     const data = await response.json();
// //   // //     setDogData(prevdogData => [...prevdogData, data.message]);
// //   // //     } catch (error) {
// //   // //     console.error('ERROR CONEL FETCH DE PERROS:', error);
// //   // //   }
// //   // // }

// //   const fetchDog = async () => {
// //     try {
// //       const response = await fetch(BASE_URL);
// //       if (!response.ok) {
// //         throw new Error('La respuesta de la red no fue correcta');
// //       }
// //       const data = await response.json();
// //       setDogData(prevdogData => [...prevdogData, data.message]);
// //     } catch (error) {
// //       console.error('ERROR CONEL FETCH DE PERROS:', error);
// //     }
// //   }

// //   const fetchAllDogs = () => {
// //     for (let i = 0; i < 2; i++) {
// //       fetchDog();
// //     }
// //   }

// //   useEffect(() => {
// //     fetchAllDogs();
// //   }, []);

// //   useEffect(() => {
// //     console.log('🐕 Lista de perros actualizados:', dogData);
// //   }, [fetchAllDogs]);

// //   return (
// //     <>
// //       <div className='container text-center mt-5'>
// //         <h1 className="display-5 mb-4 title-responsive titulo-principal">¡Conoce a estos hermosos perros!</h1>
// //         <div className='grird grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
// //           <div className="row justify-content-center">
// //             {dogData.map((imgUrl, index) => (
// //             <div key={index} className=" col-12 col-sm-6 col-md-4 mb-4 custom-card">
// //               <img src={imgUrl} alt={Perro ${index + 1}} className="img-arreglada"
// //               loading="lazy" />
// //             <div className={custom-card ${isShiny ? 'shiny-effect' : ''}}>
// //               <img src={url} alt="Perrito" className="img-arreglada" />
// //             </div>
// //             </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div className='row '>
// //         <div className='col-12'>
// //           {/*<div className="boton-personalizado">*/}
// //           <button className='boton-personalizado' onClick={fetchDog}>
// //             Ver otro perro
// //           </button>
// //         </div>
// //       </div>