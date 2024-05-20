// app/login/page.js
import AuthForm from '@/components/auth-form';

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<AuthForm isLogin={true} />
		</div>
	);
}
