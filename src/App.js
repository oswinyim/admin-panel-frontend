import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Layout from "layout";
import { themeSettings } from "theme";
import Products from "pages/products";
import Customers from "pages/customers";
import Transactions from "pages/transactions";
import Geography from "pages/geography";
import Overview from "pages/overview";
import Daily from "pages/daily";
import Monthly from "pages/monthly";
import Breakdown from "pages/breakdown";
import Admin from "pages/admin";
import Performance from "pages/performance";
import { setMode } from "state";

function App() {
  // Get the system display mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);

  useEffect(() => {
    if (prefersDarkMode && mode !== "dark") {
      dispatch(setMode());
    }
  }, [prefersDarkMode]); // eslint-disable-line

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
