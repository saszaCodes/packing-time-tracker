import { InputHTMLAttributes, useEffect, useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { usePostOrders } from "../queries/hooks/usePostOrders";
import { ordersValidationRules } from "../utils/constants";
import Papa from "papaparse";
import { Order, Orders } from "../types/DTOs";
import { validateOrders } from "../utils/functions/validateOrders";
import styled from "styled-components";
import { Button } from "../styledComponents/styledComponents";

const InputContainer = styled.div`
  margin: 8px;
  display: flex;
  align-items: center;
`;

const InputLabel = styled.label`
  margin-right: 16px;
`;

const InputFieldContainer = styled.div`
  flex: 1;
`;

const InputField = styled.input`
  border-radius: 15px;
  border: 1px solid lightgray;
  padding: 8px;
  width: 100%;
`;

const InputError = styled.span``;

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
    watch,
  } = useForm<Order & { file: File }>();
  const { mutate } = usePostOrders();
  const [uploadMode, setUploadMode] = useState<"form" | "file">("form");
  const [csvFile, setCsvFile] = useState<File>();

  const fileInput = watch("file");

  useEffect(() => {
    if (!fileInput) setUploadMode("form");
  }, [fileInput]);

  const onSubmit = async () => {
    let values: Orders = [getValues()];
    if (uploadMode === "file") {
      const extractedOrders = await new Promise<Orders>((res) => {
        // TODO: handle case when CSV file doesn't exist
        csvFile &&
          Papa.parse<Order>(csvFile, {
            header: true,
            complete: (results) => {
              values = results.data;
              res(values);
            },
          });
      });
      if (!validateOrders(extractedOrders)) {
        formFields.forEach((name) => setValue(name, ""));
        alert("Nieprawidłowe dane w pliku!");
        return;
      }
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
    <InputContainer>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputFieldContainer>
        <InputField
          id={name}
          {...inputArgs}
          {...register(name, {
            pattern:
              Object.keys(ordersValidationRules).includes(name) &&
              // TODO: get rid of ts-ignore
              // @ts-ignore
              ordersValidationRules[name],
            ...registerArgs,
          })}
        />
      </InputFieldContainer>
      {/* TODO: add invalid fields feedback */}
      <InputError>{errors[name]?.message as string}</InputError>
    </InputContainer>
  );

  return (
    <>
      <form data-testid="add-entry-form">
        <>
          {generateInput(
            "title",
            "Tytuł",
            {
              type: "text",
              placeholder: "Wpisz tytuł",
              disabled: uploadMode !== "form",
            },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "areaName",
            "Nazwa obszaru",
            {
              type: "text",
              placeholder: "Wpisz nazwę obszaru",
              disabled: uploadMode !== "form",
            },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "type",
            "Typ",
            {
              type: "text",
              placeholder: "Wpisz typ",
              disabled: uploadMode !== "form",
            },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "id",
            "ID",
            {
              type: "number",
              placeholder: "Wpisz ID",
              disabled: uploadMode !== "form",
            },
            {
              required: uploadMode === "form",
              pattern: ordersValidationRules.id,
            }
          )}
          {generateInput(
            "date",
            "Data",
            {
              type: "text",
              placeholder: "Wpisz datę",
              disabled: uploadMode !== "form",
            },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "duration",
            "Czas trwania",
            {
              type: "number",
              placeholder: "Wpisz czas trwania",
              disabled: uploadMode !== "form",
            },
            { required: uploadMode === "form" }
          )}
          {generateInput(
            "units",
            "Liczba sztuk",
            {
              type: "number",
              placeholder: "Wpisz liczbę sztuk",
              disabled: uploadMode !== "form",
            },
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
      <Button onClick={() => handleSubmit(onSubmit)()} title="Wyślij formularz">
        Wyślij formularz
      </Button>
    </>
  );
};
