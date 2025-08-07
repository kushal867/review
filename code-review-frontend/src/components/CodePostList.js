import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography, Card, CardContent, CardActions, Button, Grid, CircularProgress, Alert, Avatar, Box, Chip
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";

function CodePostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/code-posts/")
      .then((res) => setPosts(res.data.results || []))
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 8 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{
      minHeight: "100vh",
      py: 6,
      px: 2,
      background: "linear-gradient(135deg, #23272f 0%, #2b5876 100%)"
    }}>
      <Typography variant="h3" gutterBottom fontWeight={900} align="center" sx={{ color: "#fff", letterSpacing: 2, mb: 6 }}>
        Latest Code Posts
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {posts.map((post, idx) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
              style={{ borderRadius: 18 }}
            >
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: 3,
                  background: "rgba(35, 39, 47, 0.98)",
                  color: "#fff",
                  minHeight: 260,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      {post.author.username}
                    </Typography>
                  </Box>
                  <Chip label={post.language} color="secondary" size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "Fira Mono, monospace", color: "#fff" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "#bdbdbd" }}>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }} style={{ width: "100%" }}>
                    <Button
                      size="large"
                      fullWidth
                      component={Link}
                      to={`/post/${post.id}`}
                      variant="contained"
                      color="secondary"
                      sx={{ fontWeight: 700, borderRadius: 2, boxShadow: 2 }}
                    >
                      View Details
                    </Button>
                  </motion.div>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CodePostList;