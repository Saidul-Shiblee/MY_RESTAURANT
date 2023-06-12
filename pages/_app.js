import LayoutCustomer from "../components/LayoutCustomer";
import "../styles/globals.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import { SessionProvider } from "next-auth/react";
import AuthGuardCustomer from "./auth/AuthGuardCustomer";
import { store } from "../services/redux/app/store";
import { Provider } from "react-redux";
import NProgress from "nprogress";
import { Router } from "next/router";
import AuthGuardAdmin from "./auth/AuthGuardAdmin";
import { ToastContainer } from "react-toastify";
NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const handleRouteStart = () => NProgress.start();
  const handleRouteDone = () => NProgress.done();
  Router.events.on("routeChangeStart", handleRouteStart);
  Router.events.on("routeChangeComplete", handleRouteDone);
  Router.events.on("routeChangeError", handleRouteDone);
  const Layout = Component.layout || LayoutCustomer;
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {Component.requiredAuthCustomer ? (
          <AuthGuardCustomer>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuardCustomer>
        ) : Component.requiredAuthAdmin ? (
          <AuthGuardAdmin>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuardAdmin>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Provider>
  );
}

export default MyApp;
