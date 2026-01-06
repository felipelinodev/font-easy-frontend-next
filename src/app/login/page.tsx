"use client"
import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";
import { PiGoogleLogoBold } from "react-icons/pi";
import { signIn, signOut } from "next-auth/react"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUserRequest } from "@/lib/RequetsApiNode";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.email("Email obrigatório."),
  password: z.string().min(1, "Senha obrigatoria."),
})

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const handdleSingIn = () => {
    signIn('google', { callbackUrl: '/profile' })
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    const { email, password } = data;

    try {
      await loginUserRequest({ email, password });
      // await signOut({ redirect: false })
      // router.push('/profile');
      // router.refresh();
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }


  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-3 text-black-default">Entrar</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">

            <InputFE
              {...register("email")}
              className="min-h-10 p-0"
              label="Email"
              type="email"
              isError={errors.email ? true : false}
              placeholder={errors.email ? errors.email.message : 'Digite seu email'}
              id="email"
            />
            <InputFE
              {...register("password")}
              className='min-h-10 p-0'
              label="Senha"
              type="password"
              isError={errors.password ? true : false}
              placeholder={errors.password ? errors.password.message : 'Digite sua senha'}
              id="password"
            />
          </div>
          <Link href="#" className="flex justify-end underline text-black-default text-sm">
            Esqueceu a senha?
          </Link>
          <div className="flex flex-col mt-5 items-center gap-1">
            <button
              className="bg-primary-orange font-medium min-h-10 cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px]"
            >
              {!loading ? <>Entrar</> : <>Entrando...</>}

            </button>
            <span className="text-gray-muted-contrast">Não tem conta? <Link href="/signup" className="underline text-black-default text-sm">
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