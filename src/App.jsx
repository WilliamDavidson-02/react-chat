import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

const Access = lazy(() => import("./access/Access"));
const Chat = lazy(() => import("./chat/Chat"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Access />
      </Suspense>
    ),
  },
  {
    path: "/chat",
    element: (
      <UserProvider>
        <Suspense fallback={<div>loading...</div>}>
          <Chat />
        </Suspense>
      </UserProvider>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
