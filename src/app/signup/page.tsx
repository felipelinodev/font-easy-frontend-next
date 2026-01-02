'use client'

import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUserRequest, loginUserRequest } from "@/lib/RequetsApiNode";

const signupSchema = z.object({
  name: z.string().min(1, "É necessário adicionar um nome.").min(2),
  email: z.email("Email inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  photo: z.url().optional()
})

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUp() {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)

    const { name, email, password } = data

    try {
      await registerUserRequest({ name, email, password })
      await loginUserRequest({ email, password })
      router.push('/profile');
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-3 text-black-default text-center">Criar conta</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <InputFE
              {...register('name')}
              className="min-h-10 p-0"
              label="Nome" type="name"
              isError={errors.name ? true : false}
              placeholder={errors.name ? errors.name.message : 'Seu nome'}
              id="email"
            />
            <InputFE
              {...register('email')}
              className="min-h-10 p-0"
              label="Email" type="email"
              isError={errors.email ? true : false}
              placeholder={errors.email ? errors.email.message : 'Digite seu email'}
              id="email"
            />
            <InputFE
              {...register('password')}
              className="min-h-10 p-0 "
              label="Senha"
              type="password"
              id="email"
              isError={errors.password ? true : false}
              placeholder={errors.password ? errors.password.message : 'Digite sua senha'}
            />
          </div>
          <div className="flex flex-col mt-5 items-center gap-1">
            <button
              className="bg-primary-orange font-medium min-h-10 cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px]"
            >
              {!loading ? <>Criar Conta</> : <>Criando conta...</>}

            </button>
            <span className="text-gray-muted-contrast">Já tem uma conta? <Link href="/login" className="underline text-black-default text-sm">
              Acesse sua conta.
            </Link> </span>
          </div>

        </form>
      </div>
    </div>
  );
}