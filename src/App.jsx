import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import UserManagementPage from "@pages/admin/UserManagementPage.jsx";
import UserProfil from "@pages/user/UserProfil.jsx";
import NewsList from "@pages/news/NewsList.jsx";
import WorkShopList from "@pages/workshop/WorkShopList.jsx"
import NewsDetail from "@pages/news/NewsDetail.jsx";
import NewsAdd from "@pages/news/NewsAdd.jsx";
import LoginPage from "@pages/authentication/LoginPage.jsx";
import RegisterPage from "@pages/authentication/RegisterPage.jsx";
import HomePage from "@pages/home/HomePage.jsx";
import WorkShopDetail from "@pages/workshop/WorkShopDetail";
import WorkShopAdd from "@pages/workshop/WorkShopAdd";
import Calendar from "@pages/calendar/Calendar";

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
					{/*<ProtectedRoute> */}
					<Route path="/admin" element={<AdminDashboardPage />} />
					<Route
						path="/admin/users"
						element={<UserManagementPage />}
					/>

					{/* User Routes */}
					<Route path="/profile" element={<UserProfil />} />
					<Route path="/news/add" element={<NewsAdd />} />
					<Route path="/workshop/add" element={<WorkShopAdd />} />
					<Route path="/calendar" element={<Calendar />} />
					{/*</ ProtectedRoute>/*}


					{/* News Routes */}
					<Route path="/news/list" element={<NewsList />} />
					<Route path="/news/detail/:id" element={<NewsDetail />} />


					{/* Workshop Routes */}
					<Route path="/workshop/list" element={<WorkShopList />} />
					<Route path="/workshop/detail/:id" element={<WorkShopDetail />} />


					{/* Calendar  Routes */}
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
