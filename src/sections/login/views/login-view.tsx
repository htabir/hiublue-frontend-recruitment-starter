'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit =async (data:{email:string,password:string}) => {
        try {
            const response = await axios.post('https://dummy-1.hiublue.com/api/login', data);
            console.log('Login Success:', response.data);
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="center">
                <Card variant="outlined">
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                type="email"
                                {...register('email')}
                                placeholder="your@email.com"
                                autoComplete="email"
                                fullWidth
                                variant="outlined"
                                size="small"
                                error={!!errors.email}
                                helperText={typeof errors.email?.message === "string" ? errors.email.message : undefined}
                                sx={{ mt: 1 }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                type="password"
                                {...register('password')}
                                placeholder="••••••"
                                autoComplete="current-password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                error={!!errors.password}
                                helperText={typeof errors.password?.message === "string" ? errors.password.message : undefined}
                                sx={{ mt: 1 }}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained">
                            Sign in
                        </Button>
                        <Link component="button" type="button" variant="body2" sx={{ alignSelf: 'center' }}>
                            Forgot your password?
                        </Link>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}
