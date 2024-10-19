import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Router from "@/router";
import store from "@/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <BrowserRouter>
          <Router />
          <Toaster richColors toastOptions={{}} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
