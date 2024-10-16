// Minhas importações
import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixeira from '../../assets/Lixeira.svg'
import api from '../../services/api'

// Em cima os códigos JS e em baixo código HTML.
function Home() {
  // Criação de estado
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

    // Essa é uma função assincrona, ou seja, preciso pegar informações fora do meu código, então uso async
    async function getUsers(){
      const usersFromApi = await api.get('/usuarios')

      setUsers(usersFromApi.data)
    }

    async function createUsers(){

      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })

      getUsers()

    }

    async function deleteUsers(id){
      await api.delete(`/usuarios/${id}`)

      getUsers()
    }

    useEffect( () => {
      getUsers()
    }, [])
  
  // return é tudo que eu vou construir na minha estrutura HTML, posso colocar javascript também.
  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}></input>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}></input>
        <input placeholder='Email' name='email' type='email' ref={inputEmail}></input>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      { users.map( user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}><img src={Lixeira}/></button>
        </div>
      ))}

    </div>
    
  )
}

export default Home
