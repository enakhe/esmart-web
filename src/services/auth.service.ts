
import { toast } from "@/components/ui/sonner";

interface LoginCredentials {
	email: string;
	password: string;
	role: string;
}

interface LoginResponse {
	success: boolean;
	token?: string;
	user?: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
	error?: string;
}

// This is a mock service that simulates authentication
// In a real app, this would make API calls to your backend
export const authService = {
	login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Mock authentication logic - in real app this would call your API
		// For this prototype, we'll accept only the specified credentials
		if (credentials.email === "administrator@localhost.com" && credentials.password === "Administrator1!") {
			const userData = {
				id: "user-1",
				name: "John Doe",
				email: credentials.email,
				role: credentials.role, // Use the selected role
			};

			// Store in localStorage - in real app you'd use more secure methods
			localStorage.setItem("user", JSON.stringify(userData));
			localStorage.setItem("token", "mock-jwt-token");

			return {
				success: true,
				token: "mock-jwt-token",
				user: userData,
			};
		}

		// Show error toast
		toast.error("Invalid email or password");

		return {
			success: false,
			error: "Invalid email or password",
		};
	},

	logout: () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		window.location.href = "/login";
	},

	getCurrentUser: () => {
		const userStr = localStorage.getItem("user");
		if (!userStr) return null;
		return JSON.parse(userStr);
	},

	isAuthenticated: () => {
		return !!localStorage.getItem("token");
	},
};
