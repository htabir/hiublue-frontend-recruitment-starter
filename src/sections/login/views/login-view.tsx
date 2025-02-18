"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { login, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://dummy-1.hiublue.com/api/login",
        data
      );
      login({ user: response.data.user, token: response.data.token });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };
  return (
    <Card sx={{ maxWidth: 400, padding: 3, margin: "auto", marginTop: 5 }}>
      <Typography variant="h4">Sign In</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            {...register("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            {...register("password")}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Box>
    </Card>
  );
}
