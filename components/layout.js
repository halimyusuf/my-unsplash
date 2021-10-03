import Footer from "./footer";
import Navbar from "./navbar";
import { StoreProvider } from "../store";

export default function Layout({ children }) {
  return (
    <StoreProvider>
      <div>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </StoreProvider>
  );
}
