import './styles.scss'

import Aside from './components/Aside'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Register from './pages/register'

import { useState } from 'react'
import { FormValues } from './interfaces/interface';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const setLocalStorage = (items: FormValues[]) => {
  localStorage.setItem('bookings', JSON.stringify(items));
}
const defaultList: FormValues[] = JSON.parse(localStorage.getItem('bookings') || '[]');


const App: React.FC = () => {

  const [data, setData] = useState<FormValues[]>(defaultList);

  const addItem = (reservaData: FormValues) => {
    const newItem: FormValues = {
      ...reservaData
    };
    setData(prevData => [...prevData, newItem]);
    setLocalStorage([...data, newItem])
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main data={data} />,
    },
    {
      path: "cadastro",
      element: <Register addItem={addItem} />,
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
