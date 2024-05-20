'use client';

import axios from 'axios';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from '@/components/ui/button';
import {FileUpload} from "@/components/file-upload";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

axios.defaults.withCredentials = true;

const formSchema = z.object({
	email: z.string().email(),
	password: z.string()
		.min(6, "Password must be at least 6 characters long")
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{10,}$/, "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"),
	name: z.string().optional(),
	username: z.string().optional(),
	photo: z.string().optional(),
});
interface AuthFormProps {
	isLogin: boolean;

}
const AuthForm = ({isLogin}:AuthFormProps) => {
	const router = useRouter();
	const {toast} = useToast();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			photo: "",
			username: "",
		}
	});


	const onSubmit = async (data: any) => {
		const endpoint = isLogin ? '/login' : '/register';
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}

		try {
			const response = await axios.post(`http://localhost:5000${endpoint}`, formData, {withCredentials: true});
			if (response.status === 200 || response.status === 201) {
				const message = isLogin
					? `User ${response.data.username} has been logged in successfully!`
					: `User ${response.data.username} has been registered successfully!`;
				// alert(message);
				// if (isLogin) {
				// 	router.push('/dashboard');
				// }
				router.push('/dashboard');

			}
		} catch (error: any) {
			toast({
				title: "Uh oh! Something went wrong.",
				description: error.response.data.message,
			})
			console.error(`Error: ${error.response.data.message}`);
		}
	};

	return (
		<div className="mx-auto my-12 max-w-md space-y-6 px-4 sm:px-0">
			<div className="space-y-2 text-center">
				<h2 className="text-3xl font-bold">{isLogin ? 'Login' : 'Register'}</h2>
				<p className="text-gray-500 dark:text-gray-400">Enter your details to get started.</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div
						className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField name='email' control={form.control} render={({field}) => (
								<div className="space-y-2">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="mira@example.com" {...field}
										       className="w-full p-2 border rounded"/>
									</FormControl>
									<FormMessage>
										{form.formState.errors.email?.message}
									</FormMessage>
								</div>
							)}/>
							<FormField name='password' control={form.control} render={({field}) => (
								<div className="space-y-2">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" className="w-full p-2 border rounded"/>
									</FormControl>
									<FormMessage>
										{form.formState.errors.password?.message}
									</FormMessage>
								</div>
							)}/>
						</div>

						{!isLogin && (
							<>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<FormField name='name' control={form.control} render={({field}) => (
										<div className="space-y-2">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} className="w-full p-2 border rounded"/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.name?.message}
											</FormMessage>
										</div>
									)}/>
									<FormField name='username' control={form.control} render={({field}) => (
										<div className="space-y-2">
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input {...field} className="w-full p-2 border rounded"/>
											</FormControl>
											<FormMessage>
												{form.formState.errors.username?.message}
											</FormMessage>
										</div>
									)}/>
								</div>

								<FormField name='photo' control={form.control} render={({field}) => (
									<div className="col-span-2 space-y-2 w-full rounded-md">
										<FormLabel>Profile Picture</FormLabel>
										<FormControl>
											<FileUpload
												onChange={(url) => form.setValue('photo', url)}
												endpoint='profile'
												value={field.value}
											/>
										</FormControl>
										<FormMessage>
											{form.formState.errors.photo?.message}
										</FormMessage>
									</div>
								)}/>
							</>
						)}
						<Button type="submit"
						        className="w-full rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300">
							{isLogin ? 'Get In' : 'Create Account'}
						</Button>
					</div>
				</form>
			</Form>
			{isLogin ? (
				<p className="mt-4 text-center">
					Don't have an account? <Link href="/register" className="text-blue-500">Register here</Link>
				</p>
			) : (
				<p className="mt-4 text-center">
					Already have an account? <Link href="/login" className="text-blue-500">Login here</Link>
				</p>
			)}
		</div>
	)
		;
};

export default AuthForm;
