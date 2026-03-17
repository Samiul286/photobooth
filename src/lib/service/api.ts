import { tokenStore } from "$lib/utils/tokenStorage"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = async (username: string, password:string) =>{
  const req = {
    username: username,
    password: password
  }
  try{
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method:"POST",
      body: JSON.stringify(req)
    })
    if (!response.ok){
      throw new Error("Failed to login!!!")
    }

    const data = await response.json()
    return data
  }catch(error){
    throw new Error('failed to login with error ' + error);
  }
}

export const getProfile = async () =>{
  try{
    const token = tokenStore.retrieveToken()
    const response = await fetch(`${BASE_URL}/api/v1/auth/profile`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok){
      throw new Error("Failed to get profile")
    }
    const data = await response.json()
    return data
  }catch(error){
    throw error
  }
}
