"use client"

import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { forgotPasswordRequest } from "@/lib/RequetsApiNode";

const forgotPasswordSchema = z.object({
  email: z.email("Email inválido."),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      await forgotPasswordRequest({ email: data.email })
      setSuccess(true)
    } catch (error) {
      setErrorMessage("Erro ao enviar o e-mail. Tente novamente.")
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        {!success ? (
          <>
            <h3 className="text-2xl font-bold mb-2 text-black-default">Esqueceu a senha?</h3>
            <p className="text-sm text-gray-muted-contrast mb-4">
              Digite seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <InputFE
                  {...register("email")}
                  className="min-h-10 p-0"
                  label="Email"
                  type="email"
                  isError={errors.email ? true : false}
                  placeholder={errors.email ? errors.email.message : 'Digite seu email'}
                  id="forgot-email"
                />
              </div>

              {errorMessage && (
                <p className="text-primary-orange-two text-sm mt-2 text-center">{errorMessage}</p>
              )}

              <div className="flex flex-col mt-5 items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-orange font-medium min-h-10 cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {!loading ? <>Enviar link</> : <>Enviando...</>}
                </button>
                <Link href="/login" className="underline text-black-default text-sm">
                  Voltar ao login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-orange/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black-default">E-mail enviado!</h3>
            <p className="text-sm text-gray-muted-contrast mb-4">
              Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha. Verifique sua caixa de entrada e spam.
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary-orange font-medium min-h-10 cursor-pointer text-center text-white-default rounded-full hover:bg-primary-orange-two px-8 py-2 text-[18px]"
            >
              Voltar ao login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
