
import React from "react";
import Logo from "../atoms/Logo";
import LoginForm from "../molecules/LoginForm";

interface LoginCardProps {
	onSubmit: (email: string, password: string) => void;
	isLoading?: boolean;
	roles?: string[];
	selectedRole?: string;
	onRoleChange?: (role: string) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
	onSubmit,
	isLoading,
	roles,
	selectedRole,
	onRoleChange
}) => {
	return (
		<div className="w-full max-w-md bg-white rounded-lg shadow-soft animate-fadeIn">
			<div className="p-8">
				<div className="text-center mb-6">
					<Logo className="mx-auto mb-4 justify-center" />
					<h1 className="text-xl font-medium text-gray-800">
						Login to start your session
					</h1>
				</div>

				<LoginForm
					onSubmit={onSubmit}
					isLoading={isLoading}
					roles={roles}
					selectedRole={selectedRole}
					onRoleChange={onRoleChange}
				/>

				<div className="mt-6 text-center text-xs text-gray-500">
					<p>
						Powered by EIT TECH: Online Hotel Management Software
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginCard;
