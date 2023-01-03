import { Box, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "components/Header";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";
import Loading from "components/Loading";

const Daily = () => {
  const [startDate, setStartDate] = useState(dayjs("2021-01-06"));
  const [endDate, setEndDate] = useState(dayjs("2021-01-30"));
  const theme = useTheme();

  const { data } = useGetSalesQuery("2021");

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];
    const { dailyData } = data;

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary[100],

      data: [],
    };

    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const formattedDate = dayjs(date);
      // const displayDate = formattedDate.format
      if (formattedDate >= startDate && formattedDate <= endDate) {
        totalSalesLine.data.push({ x: date, y: totalSales });
        totalUnitsLine.data.push({ x: date, y: totalUnits });
      }
    });
    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate]); // eslint-disable-line

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              direction="row"
              divider={
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  to
                </Typography>
              }
              spacing={4}
            >
              <DatePicker
                disableFuture
                label="Responsive"
                openTo="year"
                views={["year", "month", "day"]}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                disableFuture
                label="Responsive"
                openTo="year"
                views={["year", "month", "day"]}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        {data ? (
          <ResponsiveLine
            data={[totalSalesLine, totalUnitsLine]}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Date",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default Daily;
