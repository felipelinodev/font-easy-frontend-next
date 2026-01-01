const API_URL = "http://localhost:5000";

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

async function loginUserRequest(data: LoginUser){
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    credentials: "include",
    body: JSON.stringify(data)
    });

     if(!res.ok){
        console.log(res)
        throw new Error("Erro ao fazer login");
    }
    console.log(res)
    return res.json();
}


async function loginWithGoogleRequest(data :LoginGoogleUser) {
    const res = await fetch(`${API_URL}/auth/google/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    credentials: "include",
    body: JSON.stringify(data)
    });

     if(!res.ok){
        throw new Error("Erro ao fazer login com goole");
    }
    return res.json();
} 


async function registerUserRequest(data: UserRegister){
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

export{ 
    loginUserRequest,
    loginWithGoogleRequest,
    registerUserRequest,
    registerGoogleUserRequest
}