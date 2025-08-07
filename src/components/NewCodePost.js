import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, TextField, Button, Alert, Container, Box } from "@mui/material";
import { motion } from "framer-motion";

function NewCodePost() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("/api/code-posts/", { title, code, language, description })
      .then(() => navigate("/"))
      .catch(() => setError("Failed to create post"))
      .finally(() => setSubmitting(false));
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      py: 6,
      px: 2,
      background: "linear-gradient(135deg, #23272f 0%, #2b5876 100%)"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, mt: 4, borderRadius: 4, boxShadow: 6, background: "rgba(35, 39, 47, 0.98)", color: "#fff" }}>
            <Typography variant="h4" gutterBottom fontWeight={900} align="center" sx={{ letterSpacing: 2 }}>
              New Code Post
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <motion.form
              onSubmit={handleSubmit}
              initial={false}
              animate={{ scale: submitting ? 0.98 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2, background: "#23272f", borderRadius: 2 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
              />
              <TextField
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2, background: "#23272f", borderRadius: 2 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
              />
              <TextField
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                required
                multiline
                rows={6}
                sx={{ mb: 2, background: "#23272f", borderRadius: 2 }}
                InputProps={{ style: { color: "#fff", fontFamily: "Fira Mono, monospace" } }}
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 3, background: "#23272f", borderRadius: 2 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={submitting || !title || !code || !language}
                  sx={{ fontWeight: 700, borderRadius: 2, boxShadow: 2, px: 4 }}
                  fullWidth
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </motion.form>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
}

export default NewCodePost;