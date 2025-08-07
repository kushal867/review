import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CodePostList from "./components/CodePostList";
import CodePostDetail from "./components/CodePostDetail";
import NewCodePost from "./components/NewCodePost";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: { default: "#f4f6f8" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h6: { fontWeight: 700 }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar>
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit", mr: 2 }}>
              <img src="/logo192.png" alt="Logo" style={{ width: 36, marginRight: 8 }} />
              <Typography variant="h6" noWrap>
                Code Review Pro
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/new">New Post</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<CodePostList />} />
            <Route path="/post/:id" element={<CodePostDetail />} />
            <Route path="/new" element={<NewCodePost />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
