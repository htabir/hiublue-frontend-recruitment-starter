"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

const OfferTable: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchOffers();
  }, [page, rowsPerPage]);

  const fetchOffers = async () => {
    try {
      const res = await fetch(
        `https://dummy-1.hiublue.com/api/offers?page=${page + 1}&per_page=${rowsPerPage}`,
        {
          headers: { Authorization: "Bearer fake-jwt-token" },
        }
      );
      const data = await res.json();
      setOffers(data.data || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value as string);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChipColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const filteredOffers = offers.filter((offer) =>
    offer.user_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === "all" || offer.type === filterType)
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Offer List</Typography>

        {/* Search and Filter */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <TextField
            label="Search..."
            variant="outlined"
            fullWidth
            onChange={handleSearch}
          />
          <FormControl variant="outlined" style={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={filterType} onChange={handleTypeChange} label="Type">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{offer.user_name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {offer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{offer.phone}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.jobTitle}</TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={offer.status}
                      color={getStatusChipColor(offer.status)}
                    />
                  </TableCell>
                  <TableCell style={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={40}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default OfferTable;
