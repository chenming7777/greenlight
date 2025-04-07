// components/laboratory/PredictionForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import * as z from "zod";

const schema = z.object({
  GHI: z.number().min(0),
  temp: z.number(),
  pressure: z.number().min(900).max(1100),
  humidity: z.number().min(0).max(100),
  wind_speed: z.number().min(0),
  rain_1h: z.number().min(0),
  clouds_all: z.number().min(0).max(100),
  Year: z.number().int().min(2000),
  Month_num: z.number().int().min(1).max(12),
  DayOfYear: z.number().int().min(1).max(366),
  Minute: z.number().int().min(0).max(59),
  Hour: z.number().int().min(0).max(23),
  Season: z.number().int().min(1).max(4),
  Day: z.number().int().min(1).max(7),
  Week_cos: z.number().min(-1).max(1),
  Energy_lag_1: z.number(),
  Energy_lag_2: z.number(),
});

type FormValues = z.infer<typeof schema>;

export default function PredictionForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      GHI: 500,
      temp: 25,
      pressure: 1013,
      humidity: 60,
      wind_speed: 10,
      rain_1h: 0,
      clouds_all: 20,
      Year: 2023,
      Month_num: 6,
      DayOfYear: 150,
      Minute: 0,
      Hour: 12,
      Season: 2,
      Day: 3,
      Week_cos: 0.99,
      Energy_lag_1: 0,
      Energy_lag_2: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Example Input Fields */}
        <Input
          label="GHI (W/m²)"
          type="number"
          {...register("GHI", { valueAsNumber: true })}
          error={errors.GHI?.message}
        />
        <Input
          label="Temperature (°C)"
          type="number"
          {...register("temp", { valueAsNumber: true })}
          error={errors.temp?.message}
        />
        <Input
          label="Pressure (hPa)"
          type="number"
          {...register("pressure", { valueAsNumber: true })}
          error={errors.pressure?.message}
        />
        <Input
          label="Humidity (%)"
          type="number"
          {...register("humidity", { valueAsNumber: true })}
          error={errors.humidity?.message}
        />
        <Input
          label="Wind Speed (km/h)"
          type="number"
          {...register("wind_speed", { valueAsNumber: true })}
          error={errors.wind_speed?.message}
        />
        <Input
          label="Rainfall (mm)"
          type="number"
          {...register("rain_1h", { valueAsNumber: true })}
          error={errors.rain_1h?.message}
        />
        <Input
          label="Cloud Cover (%)"
          type="number"
          {...register("clouds_all", { valueAsNumber: true })}
          error={errors.clouds_all?.message}
        />
        <Input
          label="Year"
          type="number"
          {...register("Year", { valueAsNumber: true })}
          error={errors.Year?.message}
        />
        <Input
          label="Month"
          type="number"
          {...register("Month_num", { valueAsNumber: true })}
          error={errors.Month_num?.message}
        />
        <Input
          label="Day of Year"
          type="number"
          {...register("DayOfYear", { valueAsNumber: true })}
          error={errors.DayOfYear?.message}
        />
        <Input
          label="Minute"
          type="number"
          {...register("Minute", { valueAsNumber: true })}
          error={errors.Minute?.message}
        />
        <Input
          label="Hour"
          type="number"
          {...register("Hour", { valueAsNumber: true })}
          error={errors.Hour?.message}
        />
        <Input
          label="Season"
          type="number"
          {...register("Season", { valueAsNumber: true })}
          error={errors.Season?.message}
        />
        <Input
          label="Day of Week"
          type="number"
          {...register("Day", { valueAsNumber: true })}
          error={errors.Day?.message}
        />
        <Input
          label="Week Cos"
          type="number"
          step="0.01"
          {...register("Week_cos", { valueAsNumber: true })}
          error={errors.Week_cos?.message}
        />
        <Input
          label="Energy Lag 1"
          type="number"
          {...register("Energy_lag_1", { valueAsNumber: true })}
          error={errors.Energy_lag_1?.message}
        />
        <Input
          label="Energy Lag 2"
          type="number"
          {...register("Energy_lag_2", { valueAsNumber: true })}
          error={errors.Energy_lag_2?.message}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full mt-4">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Prediction
      </Button>
    </form>
  );
}