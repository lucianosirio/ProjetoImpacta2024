import { useEffect, useState, useRef, FormEvent  } from 'react'
import { api } from './services/api'
import { FiTrash } from 'react-icons/fi'

interface CustomerProps{
  id: string; 
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef  = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect (() =>{
    loadCustomers();

  }, [])

  async function loadCustomers(){

    const response = await api.get("/customers")
    setCustomers(response.data);

  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer",{
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })
  
    setCustomers(allCustomers => [...allCustomers, response.data])

  }

  return(

    <div className="w-full min-h-screen justify-center px-4">
      <h1>Cadastro de Clientes</h1>
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium"> Novo Clientes </h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit} >
          <label>Nome:  </label>
          <input 
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded "
            ref={nameRef}
          />

          <label>Email:  </label>
          <input 
            type="text"
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded "
            ref={emailRef}
          />

          <input 
            type="submit" 
            value="Cadastrar"
            className="cursor-pointer w-full p-2 text-blue-800 bg-gray-300 rounded font-bold"            
          />
        </form>
        <br></br>

        <p>Usuários Cadastrados:</p>

        <section className="flex flex-col gap-4"> 

          {customers.map( (customer) => (

            <article 
              key={customer.id}
              className="w-full bg-white rounded p-2 text-blue-800 relative">
          
              <p className='font-mono'><span className='font-medium'>Nome:</span> {customer.name} </p>
              <p className='font-mono'><span className='font-medium'>Email:</span> {customer.email} </p>
              <p className='font-mono'><span className='font-medium'>Status:</span> {customer.status ? "Ativo" : "Inativo"} </p>
            
            </article>
          ))}       
        </section>


      </main>
    </div>

  )
}