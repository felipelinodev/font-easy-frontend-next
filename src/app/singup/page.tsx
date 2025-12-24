import { InputFE } from "@/components/font-easy-ui/InputFE";
import Link from "next/link";


export default function SingUp() {
  return (
    <div className="h-screen">
      <div className="max-w-80 w-full mt-70 m-auto bg-gray-surface border-2  shadow-2xl  border-white p-5 rounded-2xl">
        <h3 className="text-2xl font-bold mb-3 text-black-default text-center">Criar conta</h3>
        <form action="">
          <div className="flex flex-col gap-3">
            <InputFE className="min-h-10 p-0" label="Nome" type="email" placeholder="Seu nome" id="email" />
            <InputFE className="min-h-10 p-0" label="Email" type="email" placeholder="Digite seu email" id="email" />
            <InputFE className="min-h-10 p-0 " label="Senha" type="password" placeholder="Digite sua senha" id="email" />
          </div>
          <div className="flex flex-col mt-5 items-center gap-1">
            <button
              className="bg-primary-orange font-medium min-h-10 cursor-pointer w-full text-center text-white-default rounded-full hover:bg-primary-orange-two p-2 text-[18px]"
            >
              Entrar
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