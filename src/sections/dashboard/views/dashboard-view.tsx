'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Grid,
} from '@mui/material';
import { fetchUsers, User } from '@/services/userService';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts for performance
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardView() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers(page, 5, search);
        setUsers(response.data);
        setTotalPages(Math.ceil(response.total / response.limit));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Prepare data for chart
  const userCountsByStatus = users.reduce(
    (acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: Object.keys(userCountsByStatus),
  };

  const chartSeries = Object.values(userCountsByStatus);

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {/* User Table */}
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </Box>
        </Grid>

        {/* User Status Chart */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            User Status Overview
          </Typography>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={300}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
