import React, { InputHTMLAttributes, useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { usePostOrders } from "../queries/hooks/usePostOrders";
import { validationRules } from "../utils/constants";
import Papa from "papaparse";
import { Order, Orders } from "../types/DTOs";

const formFields = [
  "title",
  "areaName",
  "type",
  "units",
  "id",
  "date",
  "duration",
  "file",
] as const;
type FormFields = typeof formFields[number];

export const AddEntry = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Order & { file: File }>();
  const { mutate } = usePostOrders();
  const [uploadMode, setUploadMode] = useState<"form" | "file">("file");
  const [csvFile, setCsvFile] = useState<File>();

  const onSubmit = async () => {
    let values: Orders = [getValues()];
    if (uploadMode === "file") {
      await new Promise<void>((res) => {
        // TODO: handle case when CSV file doesn't exist
        csvFile &&
          Papa.parse<Order>(csvFile, {
            header: true,
            complete: (results) => {
              values = results.data;
              res();
            },
          });
      });
    }
    mutate(values, {
      onSuccess: () => {
        formFields.forEach((name) => setValue(name, ""));
        alert("Formularz został wysłany");
      },
      onError: () => alert("Nie udało się wysłać. Spróbuj ponownie."),
    });
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== "text/csv")
      return alert("Możesz dodawać tylko pliki CSV");
    setCsvFile(file);
    setUploadMode("file");
  };

  const generateInput = (
    name: FormFields,
    label: string,
    inputArgs?: Omit<InputHTMLAttributes<HTMLInputElement>, "id">,
    registerArgs?: Partial<RegisterOptions>
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...inputArgs}
        {...register(name, { ...registerArgs })}
      />
      {/* TODO: add invalid fields feedback */}
      <span>{errors[name]?.message as string}</span>
    </div>
  );

  return (
    <>
      <form data-testid="add-entry-form">
        <>
          {generateInput(
            "title",
            "Tytuł",
            { type: "text", placeholder: "Wpisz tytuł" },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "areaName",
            "Nazwa obszaru",
            { type: "text", placeholder: "Wpisz nazwę obszaru" },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "type",
            "Typ",
            { type: "text", placeholder: "Wpisz typ" },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "id",
            "ID",
            { type: "number", placeholder: "Wpisz ID" },
            { required: uploadMode === "form", pattern: validationRules.id }
          )}
          {generateInput(
            "date",
            "Data",
            { type: "text", placeholder: "Wpisz datę" },
            { required: uploadMode === "form", pattern: validationRules.date }
          )}
          {generateInput(
            "duration",
            "Czas trwania",
            { type: "number", placeholder: "Wpisz czas trwania" },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "units",
            "Liczba sztuk",
            { type: "number", placeholder: "Wpisz liczbę sztuk" },
            { required: uploadMode === "form" }
          )}
          {generateInput("file", "Plik", {
            type: "file",
            accept: ".csv",
            // TODO: get rid of ts-ignore
            // @ts-ignore
            onInput: (e) => handleFileUpload(e.target.files[0]),
          })}
        </>
      </form>
      <button onClick={() => handleSubmit(onSubmit)()} title="Wyślij formularz">
        Wyślij formularz
      </button>
    </>
  );
};
