'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { Search, Edit, MoreVert } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Card Component
const StyledCard = styled(Card)({
  padding: '24px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  marginTop: '20px',
});

// Styled Table Header Cell
const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  color: '#1C252E',
  backgroundColor: '#F9FAFB',
});

// Offer Status Colors
const getStatusChip = (status: string) => {
  switch (status) {
    case 'Accepted':
      return (
        <Chip
          label="Accepted"
          sx={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
        />
      );
    case 'Rejected':
      return (
        <Chip
          label="Rejected"
          sx={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}
        />
      );
    case 'Pending':
      return (
        <Chip
          label="Pending"
          sx={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
        />
      );
    default:
      return <Chip label={status} />;
  }
};

// Dummy Data
const offers = [
  {
    id: 1,
    name: 'Jayvion Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    company: 'Lueilwitz and Sons',
    jobTitle: 'CEO',
    type: 'Monthly',
    status: 'Accepted',
  },
  {
    id: 2,
    name: 'Jayvion Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    company: 'Lueilwitz and Sons',
    jobTitle: 'CEO',
    type: 'Yearly',
    status: 'Rejected',
  },
  {
    id: 3,
    name: 'Jayvion Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    company: 'Lueilwitz and Sons',
    jobTitle: 'CEO',
    type: 'Monthly',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Jayvion Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    company: 'Lueilwitz and Sons',
    jobTitle: 'CEO',
    type: 'Pay As You Go',
    status: 'Accepted',
  },
  {
    id: 5,
    name: 'Jayvion Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    company: 'Lueilwitz and Sons',
    jobTitle: 'CEO',
    type: 'Monthly',
    status: 'Accepted',
  },
];

const OfferList: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle Tab Change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  // Handle Pagination
  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered Offers
  const filteredOffers = offers.filter(
    (offer) =>
      (tab === 1 ? offer.status === 'Accepted' : true) &&
      (filterType === 'All' || offer.type === filterType) &&
      (offer.name.toLowerCase().includes(search.toLowerCase()) ||
        offer.email.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <StyledCard>
      {/* Header */}
      <Typography variant="h6" fontWeight="600" py={3}>
        Offer List
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{ borderBottom: '1px solid #E5E7EB', mb: 2 }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>

      {/* Search & Filter */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
          <MenuItem value="Pay As You Go">Pay As You Go</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone number</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Job Title</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOffers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <Typography fontWeight={600}>{offer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{offer.phone}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.jobTitle}</TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>{getStatusChip(offer.status)}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOffers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledCard>
  );
};

export default OfferList;
