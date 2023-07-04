import './styles.scss'

import Aside from './components/Aside'
import Navbar from './components/Navbar'
import Register from './pages/register'
import Bookings from './components/Bookings'
import { FormValues, SortCriteria } from './interfaces/interface';

import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const setLocalStorage = (items: FormValues[]) => {
  localStorage.setItem('bookings', JSON.stringify(items));
}
const defaultList: FormValues[] = JSON.parse(localStorage.getItem('bookings') || '[]');

const App: React.FC = () => {

  const [data, setData] = useState<FormValues[]>(defaultList);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria | null>(null);

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
    const filteredData = data.filter((item) => {
      const searchTerm = searchItem.toLowerCase();
      const acomodacao = item.acomodacao.toLowerCase();
      const data = item.checkIn.toLowerCase();
      const nomeHospede = item.nome.toLowerCase();

      return acomodacao.includes(searchTerm) || data.includes(searchTerm) || nomeHospede.includes(searchTerm);
    });
    setData(filteredData);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Bookings
          sortData={sortData}
          handleSearch={handleSearch}
          deleteItem={deleteItem}
          data={data}
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
  ]);

  return (
    <>
      <Navbar />
      <main className='container'>
        <Aside />
        <RouterProvider router={router} />
      </main>
    </>
  )
}
export default App
