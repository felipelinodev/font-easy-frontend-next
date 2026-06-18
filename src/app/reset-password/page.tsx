"use client"

import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { resetPasswordRequest } from "@/lib/RequetsApiNode";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  confirmPassword: z.string().min(6, "Confirme sua senha."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setErrorMessage("Token de redefinição não encontrado.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      await resetPasswordRequest({ token, password: data.password })
      setSuccess(true)
    } catch (error) {
      setErrorMessage("Token inválido ou expirado. Solicite um novo link.")
      console.log(error)
    }
    setIsLoading(false)
  }

  if (!token) {
    return (
      <div className="h-screen">
        <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-orange-two/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-orange-two" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-black-default">Link inválido</h3>
          <p className="text-sm text-gray-muted-contrast mb-4">
            O link de redefinição de senha é inválido ou está incompleto.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block bg-primary-orange font-medium min-h-10 cursor-pointer text-center text-white-default rounded-full hover:bg-primary-orange-two px-8 py-2 text-[18px]"
          >
            Solicitar novo link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        {!success ? (
          <>
            <h3 className="text-2xl font-bold mb-2 text-black-default">Nova senha</h3>
            <p className="text-sm text-gray-muted-contrast mb-4">
              Digite sua nova senha abaixo.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <InputFE
                  {...register("password")}
                  className="min-h-10 p-0"
                  label="Nova senha"
                  type="password"
                  isError={errors.password ? true : false}
                  placeholder={errors.password ? errors.password.message : 'Digite sua nova senha'}
                  id="reset-password"
                />
                <InputFE
                  {...register("confirmPassword")}
                  className="min-h-10 p-0"
                  label="Confirmar senha"
                  type="password"
                  isError={errors.confirmPassword ? true : false}
                  placeholder={errors.confirmPassword ? errors.confirmPassword.message : 'Confirme sua nova senha'}
                  id="reset-confirm-password"
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
                  {!loading ? <>Redefinir senha</> : <>Redefinindo...</>}
                </button>
                <Link href="/login" className="underline text-black-default text-sm">
                  Voltar ao login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tertiary-orange flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black-default">Senha redefinida!</h3>
            <p className="text-sm text-gray-muted-contrast mb-4">
              Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary-orange font-medium min-h-10 cursor-pointer text-center text-white-default rounded-full hover:bg-primary-orange-two px-8 py-2 text-[18px]"
            >
              Ir para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-muted-contrast">Carregando...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
