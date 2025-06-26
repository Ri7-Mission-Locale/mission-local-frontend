import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import UserManagementPage from "@pages/admin/UserManagementPage.jsx";
import UserProfil from "@pages/user/UserProfil.jsx";
import NewsList from "@pages/news/NewsList.jsx";
import NewsDetail from "@pages/news/NewsDetail.jsx";
import NewsAdd from "@pages/news/NewsAdd.jsx";
import LoginPage from "@pages/authentication/LoginPage.jsx";
import RegisterPage from "@pages/authentication/RegisterPage.jsx";
import HomePage from "@pages/home/HomePage.jsx";

const client = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<Routes>
					{/* Default Route TODO home */}
					<Route path="/" element={<HomePage />} />

					{/* Authentication routes */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />


					{/* Admin Routes */}
					<Route path="/admin" element={<AdminDashboardPage />} />
					<Route
						path="/admin/users"
						element={<UserManagementPage />}
					/>

					{/* User Routes */}
					<Route path="/user/profil" element={<UserProfil />} />

					{/* News Routes */}
					<Route path="/news/list" element={<NewsList />} />
					<Route path="/news/detail/:id" element={<NewsDetail />} />
					<Route path="/news/add" element={<NewsAdd />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
