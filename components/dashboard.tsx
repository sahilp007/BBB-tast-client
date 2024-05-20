
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import Popout from "@/components/popout";
import useAuth from '@/lib/useAuth';
import {useToast} from "@/components/ui/use-toast";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

axios.defaults.withCredentials = true;
const Dashboard = () => {
	useAuth();

	const router = useRouter();
	const {toast} = useToast();
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchUsername, setSearchUsername] = useState('');
	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:5000/users');
			setUsers(response.data);
		} catch (error) {
			console.error('Error fetching users', error);
		}
	};
	const logout = async () => {
		try {
			const response = await axios.post('http://localhost:5000/logout', {}, {withCredentials: true});
			if (response.status === 200) {
				// alert('Logged out successfully!');
				router.push('/login');
			}
		} catch (error) {
			console.error('Error logging out', error);
		}
	};
	const fetchUserByUsername = async (username: String) => {
		try {
			const response = username ? await axios.get(`http://localhost:5000/user/${username}`)
				: {data: null};
			setSelectedUser(response.data);

		} catch (error: any) {
			toast({
				title: "Uh oh! Something went wrong.",
				description: error.response.data.message,
			})
			setSearchUsername('');
			setSelectedUser(null);
			console.error('Error fetching user', error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (<>
			<>
				{/* Table View*/}
				{/*<Card className="max-w-4xl mx-auto mt-10 p-5">*/}
				{/*	<h2 className="text-xl font-bold mb-5">User Dashboard</h2>*/}
				{/*	<div className="mb-4">*/}
				{/*		<input*/}
				{/*			type="text"*/}
				{/*			placeholder="Search by username"*/}
				{/*			value={searchUsername}*/}
				{/*			onChange={(e) => setSearchUsername(e.target.value)}*/}
				{/*			className="p-2 border rounded w-full"*/}
				{/*		/>*/}
				{/*		<Button onClick={() => fetchUserByUsername(searchUsername)} className="mt-2">Search</Button>*/}
				{/*	</div>*/}
				{/*	<Table className="w-full border-collapse">*/}
				{/*		<thead>*/}
				{/*		<tr className="bg-gray-200">*/}
				{/*			<th className="border p-2">Email</th>*/}
				{/*			<th className="border p-2">Name</th>*/}
				{/*			<th className="border p-2">Photo</th>*/}
				{/*		</tr>*/}
				{/*		</thead>*/}
				{/*		<tbody>*/}
				{/*		{users && users.map((user, index) => (*/}
				{/*			<tr key={index} onClick={() => setSelectedUser(user)}*/}
				{/*			    className="cursor-pointer hover:bg-gray-100">*/}
				{/*				<td className="border p-2">{user.email}</td>*/}
				{/*				<td className="border p-2">{user.name}</td>*/}
				{/*				<td className="border p-2">*/}
				{/*					<img src={user.photo} alt="user photo" width="50"/>*/}
				{/*				</td>*/}
				{/*			</tr>*/}
				{/*		))}*/}
				{/*		</tbody>*/}
				{/*	</Table>*/}
				{/*	<Button onClick={fetchUsers} className="mt-4">Re-fetch</Button>*/}
				{/*	{selectedUser && <Popout user={selectedUser}/>}*/}
				{/*</Card>*/}
			</>


			<div className="flex flex-col w-full min-h-screen">
				<div
					className="bg-gray-900 flex justify-between text-white py-4 px-6 md:px-8 lg:px-10 items-center gap-4">
					<h1 className="text-2xl font-bold">User Dashboard</h1>
					<div className="flex  gap-4">
						<Input
							type="text"
							placeholder="Search by username"
							value={searchUsername}
							onChange={(e) => setSearchUsername(e.target.value)}
							className=" border rounded text-gray-950 dark:text-gray-50 w-fit "
						/>
						<Button onClick={() => fetchUserByUsername(searchUsername)} className="">Search</Button>
						{selectedUser && <Popout user={selectedUser}/>}
						<Button onClick={logout} variant='secondary'>Logout</Button>
					</div>
				</div>
				<div className="mx-20 flex flex-wrap justify-center p-4 md:p-8 lg:p-10 bg-gray-100 dark:bg-gray-800">
					{users.map((user, index) => (
						<Dialog>
							<DialogTrigger>
								<div
									key={index}
									onClick={() => setSelectedUser(user)}
									className="m-4 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden flex-shrink-0"
									style={{width: '14rem'}}
								>
									<div className="relative h-56 w-full overflow-hidden">
										<Image
											src={user.photo}
											alt="Profile pic"
											layout="fill"
											objectFit="cover"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="p-4">
										<h2 className="text-lg font-bold">{user.name}</h2>
										<p className="text-gray-500 dark:text-gray-400">{user.email}</p>
									</div>
								</div>
							</DialogTrigger>
							<DialogContent className="w-full max-w-[800px] sm:w-[800px]">
								<div
									className="items-center p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[40%_1fr] gap-8 md:gap-12">
									<div className="flex items-center gap-4 justify-center">
										<Image
											alt="User Avatar"
											height={400}
											src={user.photo}
											style={{objectFit: "cover"}}
											width={400}
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="flex flex-col">
											<span
												className="text-sm font-semibold text-gray-600 dark:text-gray-300">Name</span>
											<span className="text-lg font-semibold">{user.name}</span>
										</div>
										<div className="flex flex-col">
											<span
												className="text-sm font-semibold text-gray-600 dark:text-gray-300">Username</span>
											<span
												className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</span>
										</div>
										<div className="flex flex-col">
											<span
												className="text-sm font-semibold text-gray-600 dark:text-gray-300">Email</span>
											<span
												className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
										</div>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					))}
				</div>
			</div>
		</>
	)
		;
};

export default Dashboard;
