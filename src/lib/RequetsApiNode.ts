
import { getBackendUrl } from "@/app/actions/get-env";
import { json } from "zod";

type LoginUser = {
    email: string, 
    password: string
}

type LoginGoogleUser = {
    google_id: string
}

type UserRegister = {
  name?: string | null;
  email?: string;
  password: string;
  photo?: string | null;
}

type UserRegisterGoogle = {
  name?: string | null;
  email?: string;
  google_id: string;
  photo?: string | null;
}



type UserUpdate = {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
}


type FavoriteFont = {
    font_name: string,
    font_variations?: number,
    font_type?: string,
    fontlinks?: { fontLink: string }[]
}

async function loginUserRequest(data: LoginUser){
    const API_URL = await getBackendUrl();
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
    });

     if(!res.ok){
        throw new Error("Erro ao fazer login");
    }
    return res.json();
}


async function loginWithGoogleRequest(data :LoginGoogleUser) {
    const API_URL = await getBackendUrl();
    const res = await fetch(`${API_URL}/auth/google/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
    });

     if(!res.ok){
        throw new Error("Erro ao fazer login com goole");
    }
    return res.json();
} 


async function registerUserRequest(data: UserRegister){
    const API_URL = await getBackendUrl();

    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
    });

     if(!res.ok){
        throw new Error("Erro ao criar usuário");
    }
    return res.json();
}

async function registerGoogleUserRequest(data: UserRegisterGoogle){
    const API_URL = await getBackendUrl();
    const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(data)
    });

     if(!res.ok){
        throw new Error("Erro ao criar usuário");
    }
    return res.json();
}

async function updateUserRequest(data: UserUpdate, token: string){
  const API_URL = await getBackendUrl();
  const res = await fetch(`${API_URL}/users`,{
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if(!res.ok){
    throw new Error("Erro ao atualizar usuário");
  }

  return res.json()
}

async function createFavoriteFont(data: FavoriteFont, token: string){
    const API_URL = await getBackendUrl();
    const res = await fetch(`${API_URL}/favoritefonts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(!res.ok){
        throw new Error("Erro ao criar fonte favorita.");
    }

    return res.json()
}


async function getFavoriteFont(token: string){
    const API_URL = await getBackendUrl();
    const res = await fetch(`${API_URL}/favoritefonts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!res.ok){
        throw new Error("Erro ao encontrar fontes.");
    }

    return res.json()
}
async function deleteFavoriteFont(font_id: number, token: string) {
  const API_URL = await getBackendUrl();
  const res = await fetch(`${API_URL}/favoritefonts/${font_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    console.log(res)
    if(!res.ok){
        throw new Error("Erro ao deletar fonte.");
    }

    return res.json()  
}


export{ 
    loginUserRequest,
    loginWithGoogleRequest,
    registerUserRequest,
    registerGoogleUserRequest,
    updateUserRequest,
    createFavoriteFont,
    getFavoriteFont,
    deleteFavoriteFont,
}