"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  Divider,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthContext";

// Validation Schema with all fields required
const schema = z.object({
  planType: z.enum(["pay_as_you_go", "monthly", "yearly"], {
    required_error: "Plan Type is required",
  }),
  additions: z.array(z.string()).min(1, "At least one addition is required"),
  user: z.string().min(1, "User is required"),
  expired: z.date({ required_error: "Expiration date is required" }),
  price: z.string().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

export default function OnbordingView() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { token } = useAuth();
  const [search, setSearch] = useState("");


  useEffect(() => {
      if (search.length < 3) return; // Avoid excessive API calls
      
      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            `https://dummy-1.hiublue.com/api/users?search=${search}`,
            API_HEADERS
          );
          setUsers(response.data.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
    }, [search]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const API_HEADERS = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        plan_type: data.planType,
        additions: data.additions,
        user_id: parseInt(data.user),
        expired: dayjs(data.expired).format("YYYY-MM-DD"),
        price: parseFloat(data.price),
      };

      const response = await axios.post(
        "https://dummy-1.hiublue.com/api/offers",
        payload,
        API_HEADERS
      );
      console.log("Offer Created Successfully:", response.data);
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ maxWidth: 720, margin: "auto", marginTop: 5 }}>
        <Box sx={{ padding: 2 }}>
          {" "}
          <Typography variant="h5" fontWeight="bold">
            Create Offer
          </Typography>
          <Typography variant="body2" color="gray" >
            Send onboarding offer to new user
          </Typography>
        </Box>
        <Divider />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Plan Type */}
          <FormControl component="fieldset" error={!!errors.planType}>
            <FormLabel sx={{paddingBottom:1}}>Plan Type</FormLabel>
            <Controller
              name="planType"
              control={control}
              defaultValue="monthly"
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="pay_as_you_go"
                    control={<Radio />}
                    label="Pay As You Go"
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio />}
                    label="Monthly"
                  />
                  <FormControlLabel
                    value="yearly"
                    control={<Radio />}
                    label="Yearly"
                  />
                </RadioGroup>
              )}
            />
            {errors.planType && (
              <Typography color="error">{errors.planType.message}</Typography>
            )}
          </FormControl>

          {/* Additions */}
          <FormControl component="fieldset" error={!!errors.additions}>
            <FormLabel sx={{paddingBottom:1}}>Additions</FormLabel>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox {...register("additions")} value="refundable" />
                }
                label="Refundable"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register("additions")} value="on_demand" />
                }
                label="On demand"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register("additions")} value="negotiable" />
                }
                label="Negotiable"
              />
            </Box>
            {errors.additions && (
              <Typography color="error">{errors.additions.message}</Typography>
            )}
          </FormControl>

          {/* User Selection */}
          <FormControl fullWidth error={!!errors.user}>
            <FormLabel sx={{paddingBottom:1}}>User</FormLabel>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={users}
                  getOptionLabel={(option) => option.name}
                  onInputChange={(_, value) => setSearch(value)}
                  onChange={(_, newValue) => field.onChange(newValue?.id.toString() || "")}
                  renderInput={(params) => (
                    <TextField {...params}  variant="outlined" />
                  )}
                />
              )}
            />
            {errors.user && (
              <Typography color="error">{errors.user.message}</Typography>
            )}
          </FormControl>


          {/* Expired Date Picker */}
          <FormControl fullWidth error={!!errors.expired}>
            <FormLabel sx={{paddingBottom:1}}>Expired</FormLabel>
            <Controller
              name="expired"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={(date) => {
                    setSelectedDate(date?.toDate() || null);
                    field.onChange(date?.toDate());
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
            {errors.expired && (
              <Typography color="error">{errors.expired.message}</Typography>
            )}
          </FormControl>

          {/* Price Field */}
          <FormControl fullWidth error={!!errors.price}>
            <FormLabel sx={{paddingBottom:1}}>Price</FormLabel>
            <TextField
              placeholder="Price"
              {...register("price")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            {errors.price && (
              <Typography color="error">{errors.price.message}</Typography>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#111827",
              color: "white",
            }}
          >
            Send Offer
          </Button>
        </Box>
      </Card>
    </LocalizationProvider>
  );
}
