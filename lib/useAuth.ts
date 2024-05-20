import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useAuth = () => {
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.get('http://localhost:5000/check-auth', { withCredentials: true });
				if (!response.data.authenticated) {
					router.push('/login');
				}
			} catch (error) {
				router.push('/login');
			}
		};

		checkAuth();
	}, [router]);
};

export default useAuth;
