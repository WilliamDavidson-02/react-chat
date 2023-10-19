import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Access = lazy(() => import("./access/Access"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Access />
      </Suspense>
    ),
    children: [],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
