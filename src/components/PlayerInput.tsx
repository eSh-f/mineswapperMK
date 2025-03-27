import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setNamePlayer } from "../store/gameSlice";
import { Box, TextField, Typography } from "@mui/material";

type FormValues = {
  name: string;
};

export type PlayerInputHandle = {
  submit: () => Promise<boolean>;
};

const PlayerInput = forwardRef<PlayerInputHandle>((_, ref) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setNamePlayer(data.name));
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await trigger();
      if (isValid) {
        handleSubmit(onSubmit)();
        return true;
      }
      return false;
    },
  }));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        {...register("name", { required: "Имя обязательно!" })}
        placeholder="Введите имя"
        variant="outlined"
        sx={{
          input: {
            fontFamily: "'Press Start 2P', sans-serif",
            color: "yellow",
            backgroundColor: "#222",
            padding: "12px",
            borderRadius: "4px",
            textShadow: "1px 1px 3px red",
            border: "2px solid red",
          },
          fieldset: {
            borderColor: "red",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "orange",
            },
            "&.Mui-focused fieldset": {
              borderColor: "yellow",
            },
          },
        }}
      />

      {errors.name && (
        <Typography
          sx={{
            color: "red",
            fontFamily: "'Press Start 2P', sans-serif",
            fontSize: "10px",
            textShadow: "1px 1px 2px black",
          }}
        >
          {errors.name.message}
        </Typography>
      )}
    </Box>
  );
});

export default PlayerInput;
