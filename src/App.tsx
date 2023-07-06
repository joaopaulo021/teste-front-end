import './styles.scss'
import { ToastContainer } from 'react-toastify';
import Aside from './components/Aside'
import Navbar from './components/Navbar'
import Register from './pages/register'
import Bookings from './components/Bookings'
import { FormValues, SortCriteria } from './interfaces/interface';

import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Logout from './pages/logout';


const setLocalStorage = (items: FormValues[]) => {
  localStorage.setItem('bookings', JSON.stringify(items));
}

const App: React.FC = () => {

  const [noResults, setNoResults] = useState(false);
  const [data, setData] = useState<FormValues[]>([]);
  const [originalData, setOriginalData] = useState(data);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria | null>(null);
  const [isAsideEnabled, setIsAsideEnabled] = useState(true);


  useEffect(() => {
    const defaultList: FormValues[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    setData(defaultList)
    setOriginalData(defaultList)
  }, []);

  console.log(sortCriteria)

  const sortData = (criteria: SortCriteria) => {
    setSortCriteria(criteria);
    const sortedData = [...data].sort((a, b) =>
      a[criteria].localeCompare(b[criteria])
    );
    setData(sortedData);
  };

  const addItem = (reservaData: FormValues) => {
    const newItem: FormValues = {
      ...reservaData
    };
    setData(prevData => [...prevData, newItem]);
    setLocalStorage([...data, newItem])
  }

  const editItem = (updatedItem: FormValues) => {
    const updatedData = data.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setData(updatedData);
    setLocalStorage(updatedData);
  };

  const deleteItem = (id: string) => {
    const newItems = data.filter((item) => item.id !== id)
    setData(newItems)
    setLocalStorage(newItems)
  }

  const handleSearch = (searchItem: string) => {

    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const searchTerm = removeAccents(searchItem.toLowerCase())

    const filteredData = originalData.filter((item) => {
      const acomodacao = removeAccents(item.acomodacao.toLowerCase())
      const data = removeAccents(item.checkIn.toLowerCase())
      const nomeHospede = removeAccents(item.nome.toLowerCase())

      return (
        acomodacao.includes(searchTerm) ||
        data.includes(searchTerm) ||
        nomeHospede.includes(searchTerm)
      );
    });
    setData(filteredData);
    setNoResults(filteredData.length === 0)
  }


  const handleLogout = () => {
    setIsAsideEnabled(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Bookings
          noResults={noResults}
          data={data}
          sortData={sortData}
          handleSearch={handleSearch}
          deleteItem={deleteItem}
        />,
    },
    {
      path: "cadastro",
      element:
        <Register
          editItem={editItem}
          addItem={addItem}
        />,
    },
    {
      path: "logout",
      element:
        <Logout handleLogout={handleLogout} />,
    },
  ]);

  return (
    <>
      <Navbar />
      <main className='container'>
        {isAsideEnabled && <Aside />}
        <ToastContainer position='top-center' />
        <RouterProvider router={router} />
      </main>
    </>
  )
}
export default App
