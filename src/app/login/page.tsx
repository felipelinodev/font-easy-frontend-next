"use client"
import { useForm } from "react-hook-form";
import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";
import { PiGoogleLogoBold } from "react-icons/pi";
import { signIn } from "next-auth/react"
import { useState } from "react";

type LoginFormValues = {
  email: string;
  password: string;
}



export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();


  const handdleSingIn = () => {
    signIn('google', { callbackUrl: '/profile' })
  }

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)

    try {
      const request = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!request.ok) {
        setIsLoading(false)
        throw new Error('Erro ao fazer login')

      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)

    }
  }


  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-3 text-black-default">Entrar</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <InputFE className="min-h-10 p-0" label="Email" type="email" placeholder="Digite seu email" id="email" />
            <InputFE className="min-h-10 p-0 " label="Senha" type="password" placeholder="Digite sua senha" id="email" />
          </div>
          <Link href="#" className="flex justify-end underline text-black-default text-sm">
            Esqueceu a senha?
          </Link>
          <div className="flex flex-col mt-5 items-center gap-1">
            <button
              className="bg-primary-orange font-medium min-h-10 cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px]"
            >
              Entrar
            </button>
            <span className="text-gray-muted-contrast">Não tem conta? <Link href="/singup" className="underline text-black-default text-sm">
              Crie uma conta
            </Link> </span>
          </div>
          <button
            type="button"
            onClick={handdleSingIn}
            className="font-medium min-h-10 border mt-5 border-gray-escure cursor-pointer w-full flex gap-3 justify-center text-black-default rounded-full hover:bg-gray-escure p-2 text-[18px]"
          >
            <div className="p-[2px] rounded-full w-fit border-2 border-black-default">
              <PiGoogleLogoBold size={18} />
            </div>
            Entrar com Google
          </button>
        </form>
      </div>
    </div>
  );
}