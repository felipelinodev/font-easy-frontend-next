import { InputFE } from "@/components/font-easy-ui/InputFE";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUserRequest } from "@/lib/RequetsApiNode";
import { useProfile } from "@/app/context/ProfileContext";

type ProfileBodyProps = {
    username?: string;
    email?: string;
}

const updateProfileSchema = z.object({
    email: z.email("Digite um email para alterar."),
    name: z.string().min(1, "Digite um nome para alterar."),
})

type UpdateFormValues = z.infer<typeof updateProfileSchema>

export default function ProfileBody({ username, email }: ProfileBodyProps) {
    const { setUser, user, token } = useProfile();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UpdateFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: username || '',
            email: email || ''
        }
    })

    const onSubmit = async (data: UpdateFormValues) => {
        const { name, email } = data

        try {

            await updateUserRequest({ name, email }, token!)

            if (user) {
                setUser({ ...user, ...data })
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-2 flex items-center flex-col rounded-2xl border-2 border-white shadow-xl bg-gray-surface">
            <div className="p-8 flex flex-col gap-4">
                <InputFE
                    {...register("name")}
                    isError={errors.name ? true : false}
                    placeholder={errors.name && errors.name.message}
                    className="min-h-10 p-0 min-w-80"
                    label="Name"
                    type="text"
                    id="name"
                />
                <InputFE
                    {...register("email")}
                    isError={errors.email ? true : false}
                    placeholder={errors.email && errors.email.message}
                    className="min-h-10 p-0"
                    label="Email"
                    type="email"
                    id="email"
                />

                <Link href="#" className="text-sm justify-end underline flex gap-1 items-center text-black-default font-medium">
                    Alterar senha <Pencil size={17} />
                </Link>
            </div>
            <div className="flex justify-between w-full rounded-[10px] p-5 bg-gray-muted-primary/30 items-center">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="h-8 hover:bg-gray-escure hover:cursor-pointer rounded-full px-8 justify-center flex items-center text-sm text-black-default"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-8 hover:bg-gray-escure hover:cursor-pointer rounded-full px-8 justify-center flex items-center text-sm border 
            border-gray-escure text-black-default disabled:opacity-50"
                >
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
        </form>
    )
}