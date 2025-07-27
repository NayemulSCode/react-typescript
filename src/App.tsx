import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import Layout from "./components/Layout";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ApiState, User } from "./types/api";
import { EnhancedRouteObject } from "./types/extensions";
import { UserFormData } from "./types/form";

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
  {
    id: "3",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
];

const routes: EnhancedRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    meta: { title: "Home", breadcrumb: "Home" },
  },
  {
    path: "/users",
    element: <UsersPage />,
    meta: { title: "Users", breadcrumb: "Users" },
  },
  {
    path: "/form",
    element: <FormPage />,
    meta: { title: "Form", breadcrumb: "Form" },
  },
];

function App() {
  return (
    <Router>
      <Layout routes={routes}>
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">
                <Button variant="secondary" size="sm" onClick={() => {}}>
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Button variant="secondary" size="sm" onClick={() => {}}>
                  User List
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/form">
                <Button variant="secondary" size="sm" onClick={() => {}}>
                  User Form
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        Advanced TypeScript Patterns in React
      </h1>
      <p className="text-lg text-gray-600">
        This application demonstrates several advanced TypeScript typing
        patterns.
      </p>
    </div>
  );
}

function UsersPage() {
  const [apiState, setApiState] = useState<ApiState>({
    status: "loading",
    message: "Fetching users...",
  });

  const fetchUsers = () => {
    setApiState({ status: "loading", message: "Fetching users..." });
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.7) {
        setApiState({
          status: "error",
          error: "Failed to fetch users. Please try again.",
          code: 500,
        });
      } else {
        setApiState({
          status: "success",
          data: mockUsers,
          timestamp: new Date(),
        });
      }
    }, 1500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <UserList apiState={apiState} onRetry={fetchUsers} />;
}

function FormPage() {
  const handleSubmit = async (data: UserFormData) => {
    console.log("Form submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      mode="create"
      initialData={{ firstName: "Test" }}
    />
  );
}

export default App;
