// components/Popup.js
import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import {Button} from "@/components/ui/button";
import Image from "next/image";


const Popout = ({ user }) => {
	if (!user) return null;

	return (
		<Dialog>
			<DialogTrigger>
				<Button>View Details</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-[400px] sm:w-[400px]">
				<div className="flex flex-col items-center gap-6 p-6 sm:p-8">
					<div className="flex items-center gap-4">
						<Image
							alt="User Avatar"
							className="rounded-full"
							height={96}
							src={user.photo}
							style={{
								aspectRatio: "96/96",
								objectFit: "cover",
							}}
							width={96}
						/>
						<div className="space-y-1 text-center">
							<div className="text-lg font-semibold">{user.name}</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</div>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center">
						<div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Popout;
