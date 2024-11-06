import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const Chat = lazy(() => import("../pages/ChatPage"))
const Preference = lazy(() => import("../pages/PreferencePage"))
const History = lazy(() => import("../pages/HistoryPage"))
// const About = lazy(() => import("../pages/AboutPage"))
// const TodoIndex = lazy(() => import("../pages/todo/indexPage"))
// const ProductIndex = lazy(() => import("../pages/products/IndexPage"))

const root = createBrowserRouter([
    {
        path: ""
        ,
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "chat"
        ,
        element: <Suspense fallback={Loading}><Chat/></Suspense>
    },
    {
        path: "preference"
        ,
        element: <Suspense fallback={Loading}><Preference/></Suspense>
    },
    {
        path: "history"
        ,
        element: <Suspense fallback={Loading}><History/></Suspense>
    }
    // {
    //     path: "about",
    //     element: <Suspense fallback={Loading}><About/></Suspense>
    // },
    // {
    //     path: "todo",
    //     element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
    //     children: todoRouter()
    // },
    // {
    //     path: "products",
    //     element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    //     children: productsRouter()
    // }
])
export default root;