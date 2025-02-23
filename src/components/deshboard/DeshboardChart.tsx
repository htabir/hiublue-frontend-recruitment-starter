"use client";

import EjectIcon from "@mui/icons-material/Eject";
import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type DashboardData = {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  website_visits: {
    labels: string[];
    desktop: number[];
    mobile: number[];
  };
  offers_sent: number[];
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [filter, setFilter] = useState("this-week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/summary?filter=${filter}`,
          {
            headers: { Authorization: "Bearer fake-jwt-token" },
          }
        );
        const summaryData = await summaryRes.json();

        const statsRes = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/stat?filter=${filter}`,
          {
            headers: { Authorization: "Bearer fake-jwt-token" },
          }
        );
        const statsData = await statsRes.json();

        setData({
          current: summaryData.current,
          previous: summaryData.previous,
          website_visits: {
            labels: Object.keys(statsData.website_visits),
            desktop: Object.values(statsData.website_visits).map(
              (v: any) => v.desktop
            ),
            mobile: Object.values(statsData.website_visits).map(
              (v: any) => v.mobile
            ),
          },
          offers_sent: Object.values(statsData.offers_sent),
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [filter]);

  // Handle loading state
  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const websiteVisitsOptions = {
    chart: { type: "bar" as const },
    xaxis: { categories: data.website_visits.labels },
    colors: ["#007867", "#FFAB00"],
  };

  const websiteVisitsSeries = [
    { name: "Desktop Visits", data: data.website_visits.desktop },
    { name: "Mobile Visits", data: data.website_visits.mobile },
  ];

  const offersSentOptions = {
    chart: { type: "line" as const },
    xaxis: { categories: data.website_visits.labels },
    stroke: { curve: "smooth" as const },
  };

  const offersSentSeries = [{ name: "Offers Sent", data: data.offers_sent }];

  return (
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
        className=""
      >
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Data"
        >
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week"> Prev Week</MenuItem>
        </Select>
      </div>
      <Grid container spacing={3} marginBottom={3}>
        {["active_users", "clicks", "appearance"].map((key) => (
          <Grid item xs={12} sm={4} key={key}>
            <Card>
              <CardContent>
                <Typography color="black" variant="h4" gutterBottom>
                  {key.replace("_", " ")}
                </Typography>
                <Typography variant="h4">
                  {parseFloat(
                    data.current[key as keyof typeof data.current].toString()
                  ) / 1000}
                  K
                </Typography>
                <Typography color="textSecondary">
                  <EjectIcon />
                  {"Previous " + key.replace("_", " ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Website Visits</Typography>
              <Chart
                options={websiteVisitsOptions}
                series={websiteVisitsSeries}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Offers Sent</Typography>
              <Chart
                options={offersSentOptions}
                series={offersSentSeries}
                type="line"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
