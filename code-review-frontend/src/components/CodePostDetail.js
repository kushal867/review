import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container, Typography, Paper, TextField, Button, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Box, Avatar
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";

function CodePostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = () => {
    setLoading(true);
    axios.get(`/api/code-posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPost(); }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios.post("/api/reviews/", { code_post: id, suggestion })
      .then(() => {
        setSuggestion("");
        fetchPost();
      })
      .catch(() => setError("Failed to submit review"))
      .finally(() => setSubmitting(false));
  };

  if (loading) return <Container><CircularProgress sx={{ my: 8 }} /></Container>;
  if (error) return <Container><Alert severity="error">{error}</Alert></Container>;
  if (!post) return null;

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
        <Container maxWidth="md">
          <Paper sx={{ p: 4, mb: 4, borderRadius: 4, boxShadow: 6, background: "rgba(35, 39, 47, 0.98)", color: "#fff" }}>
            <Typography variant="h3" gutterBottom fontWeight={900} align="center" sx={{ letterSpacing: 2 }}>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="secondary" align="center" sx={{ mb: 2 }}>
              {post.language}
            </Typography>
            <SyntaxHighlighter language={post.language || "javascript"} style={atomDark} customStyle={{ borderRadius: 12, fontSize: 16, marginBottom: 16 }}>
              {post.code}
            </SyntaxHighlighter>
            <Typography variant="body1" sx={{ mt: 2, color: "#bdbdbd" }}>
              {post.description}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3, background: "rgba(35, 39, 47, 0.95)", color: "#fff" }}>
            <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 2 }}>
              Reviews
            </Typography>
            <List>
              {post.reviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start">
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      <PersonIcon />
                    </Avatar>
                    <ListItemText
                      primary={<Typography sx={{ color: "#fff" }}>{review.suggestion}</Typography>}
                      secondary={<Typography sx={{ color: "#bdbdbd" }}>{review.reviewer.username}</Typography>}
                    />
                  </ListItem>
                  <Divider sx={{ background: "#444" }} />
                </React.Fragment>
              ))}
            </List>
            <motion.form
              onSubmit={handleReviewSubmit}
              initial={false}
              animate={{ scale: submitting ? 0.98 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ marginTop: 24 }}
            >
              <TextField
                label="Write a review"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ my: 2, background: "#23272f", borderRadius: 2 }}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={submitting || !suggestion}
                  sx={{ fontWeight: 700, borderRadius: 2, boxShadow: 2, px: 4 }}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </motion.div>
            </motion.form>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
}

export default CodePostDetail;