"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

// Validation Schema
const schema = yup.object().shape({
  planType: yup.string().required("Plan type is required"),
  additions: yup.object().shape({
    refundable: yup.boolean(),
    onDemand: yup.boolean(),
    negotiable: yup.boolean(),
  }),
  user: yup.string().required("User is required"),
  expired: yup.mixed<Dayjs>().required("Expiration date is required").typeError("Invalid date"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
});

interface FormData {
  planType: string;
  additions: {
    refundable?: boolean;
    onDemand?: boolean;
    negotiable?: boolean;
  };
  user: string;
  expired: Dayjs;
  price: number;
}

const CreateOfferForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      planType: "monthly",
      additions: {
        refundable: false,
        onDemand: false,
        negotiable: false,
      },
      user: "",
      expired: dayjs(),
      price: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      plan_type: data.planType,
      additions: Object.keys(data.additions).filter(
        (key) => data.additions[key as keyof typeof data.additions]
      ),
      user_id: data.user,
      expired: dayjs(data.expired).format("YYYY-MM-DD"),
      price: data.price,
    };

    console.log("Final Data:", formattedData);
    const req: Response = await fetch(
      `https://dummy-1.hiublue.com/api/offers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-jwt-token",
        },
        body: JSON.stringify(formattedData),
      }
    );
    if (req.ok) {
      console.log(req);
      toast.success("Offer created successfully!");
    } else {
      toast.error("Failed to create offer");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: 720,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Create Offer
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Send onboarding offer to a new user
        </Typography>

        {/* Plan Type */}
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>Plan Type</FormLabel>
          <Controller
            name="planType"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
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
        <FormControl fullWidth margin="normal">
          <FormLabel>Additions</FormLabel>
          <Box display="flex" gap={2}>
            <Controller
              name="additions.refundable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Refundable"
                />
              )}
            />
            <Controller
              name="additions.onDemand"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="On Demand"
                />
              )}
            />
            <Controller
              name="additions.negotiable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Negotiable"
                />
              )}
            />
          </Box>
        </FormControl>

        {/* User Dropdown */}
        <FormControl fullWidth margin="normal">
          <FormLabel>User</FormLabel>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth>
                <MenuItem value="1">Jason Momoa</MenuItem>
                <MenuItem value="2">John Doe</MenuItem>
                <MenuItem value="3">Emma Watson</MenuItem>
              </Select>
            )}
          />
          {errors.user && (
            <Typography color="error">{errors.user.message}</Typography>
          )}
        </FormControl>

        {/* Expired Date Picker */}
        <FormControl fullWidth margin="normal">
          <FormLabel>Expired</FormLabel>
          <Controller
            name="expired"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value}
                onChange={(date) => field.onChange(date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            )}
          />
          {errors.expired && (
            <Typography color="error">{errors.expired.message}</Typography>
          )}
        </FormControl>

        {/* Price Input */}
        <FormControl fullWidth margin="normal">
          <FormLabel>Price</FormLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                placeholder="Price"
                fullWidth
              />
            )}
          />
          {errors.price && (
            <Typography color="error">{errors.price.message}</Typography>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          sx={{ mt: 2 }}
        >
          Send Offer
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateOfferForm;
